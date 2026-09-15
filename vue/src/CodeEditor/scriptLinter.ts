/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { parse } from 'acorn';
import { Diagnostic, linter } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { translate } from 'CoreHome';

// Syntax check of the <script> blocks of a Custom HTML tag: JavaScript with acorn, JSON
// (eg JSON-LD) with JSON.parse. Only syntax errors are reported, in the editor: saving is not
// blocked.

const SCRIPT_PATTERN = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
const TYPE_ATTRIBUTE_PATTERN = /\btype\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i;
const VARIABLE_PATTERN = /\{\{[^{}\n]+\}\}/g;
const JSON_POSITION_PATTERN = /position (\d+)/;

const JAVASCRIPT_TYPES = [
  '',
  'text/javascript',
  'application/javascript',
  'text/ecmascript',
  'application/ecmascript',
  'module',
];
const JSON_TYPES = ['application/json', 'application/ld+json'];

interface AcornSyntaxError extends SyntaxError {
  pos?: number;
  raisedAt?: number;
}

// Matomo variables ({{PageUrl}}) are replaced at runtime, mask them with text of the same length so
// the code stays valid and error positions still match the document
function maskVariables(code: string, replacement: (length: number) => string): string {
  return code.replace(VARIABLE_PATTERN, (variable) => replacement(variable.length));
}

function getScriptType(attributes: string): string {
  const match = attributes.match(TYPE_ATTRIBUTE_PATTERN);
  const type = match ? (match[1] ?? match[2] ?? match[3] ?? '') : '';
  return type.trim().toLowerCase();
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

export function lintScripts(html: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  SCRIPT_PATTERN.lastIndex = 0;
  let match = SCRIPT_PATTERN.exec(html);
  while (match) {
    const [whole, attributes, code] = match;
    const codeOffset = match.index + whole.indexOf('>') + 1;
    const type = getScriptType(attributes);

    let diagnostic: Diagnostic | null = null;
    if (JAVASCRIPT_TYPES.includes(type)) {
      diagnostic = lintJavaScript(code, codeOffset, type === 'module');
    } else if (JSON_TYPES.includes(type)) {
      diagnostic = lintJson(code, codeOffset);
    }

    if (diagnostic) {
      diagnostics.push(diagnostic);
    }
    match = SCRIPT_PATTERN.exec(html);
  }

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
