/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { parse } from 'acorn';
import { EditorState } from '@codemirror/state';
import { ensureSyntaxTree } from '@codemirror/language';
import { html } from '@codemirror/lang-html';
import { Diagnostic, linter } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { translate } from 'CoreHome';

// Syntax check of the <script> blocks of a Custom HTML tag: JavaScript with acorn, JSON
// (eg JSON-LD) with JSON.parse. Only syntax errors are reported, in the editor: saving is not
// blocked.
//
// <script> elements are located with the HTML syntax tree, not with regular expressions: a tag
// written in a comment, a string or a stylesheet is not an element, and an attribute value may
// contain ">".

const VARIABLE_PATTERN = /\{\{[^{}\n]+\}\}/g;
const JSON_POSITION_PATTERN = /position (\d+)/;
const QUOTES_PATTERN = /^(["'])([\s\S]*)\1$/;
const RAW_TEXT_CLOSING_TAG_PATTERN = /<\/(?:script|style)(?=[\s/>])/gi;

const JAVASCRIPT_TYPES = [
  '',
  'text/javascript',
  'application/javascript',
  'text/ecmascript',
  'application/ecmascript',
  'module',
];
const JSON_TYPES = ['application/json', 'application/ld+json'];

const SYNTAX_TREE_TIMEOUT = 1000;

const htmlSupport = html();

interface AcornSyntaxError extends SyntaxError {
  pos?: number;
  raisedAt?: number;
}

interface TreeNode {
  from: number;
  to: number;
  getChild(type: string): TreeNode | null;
  getChildren(type: string): TreeNode[];
}

interface ScriptElement {
  type: string;
  from: number;
  to: number;
}

// Matomo variables ({{PageUrl}}) are replaced at runtime, mask them with text of the same length so
// the code stays valid and error positions still match the document
function maskVariables(code: string, replacement: (length: number) => string): string {
  return code.replace(VARIABLE_PATTERN, (variable) => replacement(variable.length));
}

// browsers close <script> and <style> elements whatever the case of the closing tag, the syntax
// tree only with a lowercase one (same length, positions are kept)
function lowercaseClosingTags(code: string): string {
  return code.replace(RAW_TEXT_CLOSING_TAG_PATTERN, (tag) => tag.toLowerCase());
}

function getTypeAttribute(code: string, openTag: TreeNode): string {
  const typeAttribute = openTag.getChildren('Attribute').find((attribute) => {
    const name = attribute.getChild('AttributeName');
    return name && code.slice(name.from, name.to).toLowerCase() === 'type';
  });
  const value = typeAttribute && (
    typeAttribute.getChild('AttributeValue') || typeAttribute.getChild('UnquotedAttributeValue')
  );
  if (!value) {
    return '';
  }
  return code.slice(value.from, value.to).replace(QUOTES_PATTERN, '$2').trim().toLowerCase();
}

// the closed <script> elements, with the range of their content
function findScriptElements(code: string): ScriptElement[] {
  const state = EditorState.create({ doc: lowercaseClosingTags(code), extensions: [htmlSupport] });
  const tree = ensureSyntaxTree(state, code.length, SYNTAX_TREE_TIMEOUT);
  if (!tree) {
    return [];
  }

  const scripts: ScriptElement[] = [];
  tree.iterate({
    enter: (nodeRef) => {
      if (nodeRef.name !== 'Element') {
        return undefined;
      }
      const element: TreeNode = nodeRef.node;
      const openTag = element.getChild('OpenTag');
      const tagName = openTag && openTag.getChild('TagName');
      if (!openTag || !tagName) {
        return undefined;
      }

      const name = code.slice(tagName.from, tagName.to).toLowerCase();
      if (name !== 'script' && name !== 'style') {
        return undefined;
      }

      const closeTag = element.getChild('CloseTag');
      if (name === 'script' && closeTag) {
        scripts.push({
          type: getTypeAttribute(code, openTag),
          from: openTag.to,
          to: closeTag.from,
        });
      }

      // the content is raw text (or a nested JavaScript / CSS tree), it holds no element
      return false;
    },
  });

  return scripts;
}

function makeDiagnostic(from: number, to: number, message: string): Diagnostic {
  return {
    from,
    to: Math.max(to, from),
    severity: 'error',
    message,
  };
}

function lintJavaScript(code: string, offset: number, isModule: boolean): Diagnostic | null {
  try {
    parse(maskVariables(code, (length) => '_'.repeat(length)), {
      ecmaVersion: 'latest',
      sourceType: isModule ? 'module' : 'script',
    });
    return null;
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      return null;
    }
    const error = e as AcornSyntaxError;
    const position = Math.min(error.pos ?? 0, code.length);
    const end = Math.min(Math.max(error.raisedAt ?? position, position + 1), code.length);
    // acorn appends "(line:column)", the editor already shows the position
    const message = error.message.replace(/\s*\(\d+:\d+\)$/, '');
    return makeDiagnostic(
      offset + position,
      offset + end,
      translate('TagManagerExtended_JavaScriptSyntaxError', message),
    );
  }
}

function lintJson(code: string, offset: number): Diagnostic | null {
  const masked = maskVariables(code, (length) => `null${' '.repeat(Math.max(length - 4, 0))}`);
  if (!masked.trim()) {
    return null;
  }
  try {
    JSON.parse(masked);
    return null;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const positionMatch = message.match(JSON_POSITION_PATTERN);
    const position = positionMatch ? Math.min(parseInt(positionMatch[1], 10), code.length) : 0;
    return makeDiagnostic(
      offset + position,
      offset + Math.min(position + 1, code.length),
      translate('TagManagerExtended_JsonSyntaxError', message),
    );
  }
}

export function lintScripts(source: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  findScriptElements(source).forEach(({ type, from, to }) => {
    const code = source.slice(from, to);

    let diagnostic: Diagnostic | null = null;
    if (JAVASCRIPT_TYPES.includes(type)) {
      diagnostic = lintJavaScript(code, from, type === 'module');
    } else if (JSON_TYPES.includes(type)) {
      diagnostic = lintJson(code, from);
    }

    if (diagnostic) {
      diagnostics.push(diagnostic);
    }
  });

  return diagnostics;
}

export function createScriptLinter(onResult: (diagnostics: Diagnostic[]) => void) {
  return linter(
    (view: EditorView) => {
      const diagnostics = lintScripts(view.state.doc.toString());
      onResult(diagnostics);
      return diagnostics;
    },
    { delay: 500 },
  );
}
