/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { basicSetup, EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { tooltips } from '@codemirror/view';
import { html } from '@codemirror/lang-html';
import { Diagnostic, lintGutter, openLintPanel } from '@codemirror/lint';
import { oneDark } from '@codemirror/theme-one-dark';
import { translate } from 'CoreHome';
import { createScriptLinter } from './scriptLinter';

// Replaces the Custom HTML textarea (rendered by the core Tag Manager Vue form) with a CodeMirror
// editor highlighting HTML, inline JS and CSS. The textarea stays in the DOM, hidden, as the source
// of truth for the core form: editor changes are written to it and announced with a change event,
// and values set on it (form load, variable insertion) are pushed back to the editor.

const TEXTAREA_SELECTOR = 'textarea#customHtml';

const valueProperty = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!;

interface AttachedEditor {
  view: EditorView;
  status: HTMLElement;
}

const editors = new Map<HTMLTextAreaElement, AttachedEditor>();

// syntax status next to the field label, updated with the linter results
function createStatus(textarea: HTMLTextAreaElement) {
  const status = document.createElement('span');
  status.className = 'tme-code-status';
  status.hidden = true;

  const update = (diagnostics: Diagnostic[]) => {
    if (!textarea.value.trim()) {
      status.hidden = true;
      return;
    }

    const hasErrors = diagnostics.length > 0;
    const icon = document.createElement('span');
    icon.className = hasErrors ? 'icon-warning' : 'icon-ok';

    status.hidden = false;
    status.className = `tme-code-status tme-code-status--${hasErrors ? 'invalid' : 'valid'}`;
    status.title = diagnostics.map((diagnostic) => diagnostic.message).join('\n');
    status.replaceChildren(
      icon,
      document.createTextNode(translate(hasErrors
        ? 'TagManagerExtended_SyntaxMayContainErrors'
        : 'TagManagerExtended_SyntaxValid')),
    );
  };

  return { status, update };
}

function attachEditor(textarea: HTMLTextAreaElement) {
  if (editors.has(textarea) || !textarea.parentNode) {
    return;
  }

  let isWritingToTextarea = false;
  const { status, update: updateStatus } = createStatus(textarea);

  const view = new EditorView({
    state: EditorState.create({
      doc: textarea.value,
      extensions: [
        basicSetup,
        html(),
        oneDark,
        createScriptLinter(updateStatus),
        lintGutter(),
        // the editor clips its overflow (rounded corners): render lint and autocomplete tooltips
        // in the body
        tooltips({ parent: document.body }),
        EditorView.lineWrapping,
        // CodeMirror owns the class attribute of its root element (focus state...), so the plugin
        // class must be declared as an editor attribute or it is dropped on the first update
        EditorView.editorAttributes.of({ class: 'tme-code-editor' }),
        EditorView.contentAttributes.of({ spellcheck: 'false' }),
        EditorView.updateListener.of((update) => {
          const { from, to } = update.state.selection.main;
          // keep the textarea caret in sync, the variable picker inserts at the textarea selection
          textarea.setSelectionRange(from, to);

          if (!update.docChanged) {
            return;
          }
          isWritingToTextarea = true;
          valueProperty.set!.call(textarea, update.state.doc.toString());
          isWritingToTextarea = false;
          textarea.setSelectionRange(from, to);
          textarea.dispatchEvent(new Event('change', { bubbles: true }));
        }),
      ],
    }),
  });

  textarea.parentNode.insertBefore(view.dom, textarea);
  textarea.classList.add('tme-code-editor-source');

  const label = textarea.parentNode.querySelector(`label[for="${textarea.id}"]`);
  (label || textarea).after(status);
  status.addEventListener('click', () => {
    if (status.classList.contains('tme-code-status--invalid')) {
      openLintPanel(view);
    }
  });

  Object.defineProperty(textarea, 'value', {
    configurable: true,
    get() {
      return valueProperty.get!.call(this);
    },
    set(newValue: string) {
      valueProperty.set!.call(this, newValue);
      if (isWritingToTextarea) {
        return;
      }
      const text = newValue === null || newValue === undefined ? '' : String(newValue);
      if (text !== view.state.doc.toString()) {
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
      }
    },
  });

  editors.set(textarea, { view, status });
}

function scan() {
  document.querySelectorAll<HTMLTextAreaElement>(TEXTAREA_SELECTOR).forEach(attachEditor);

  editors.forEach(({ view, status }, textarea) => {
    if (!textarea.isConnected) {
      view.destroy();
      status.remove();
      editors.delete(textarea);
    }
  });
}

let scanScheduled = false;
new MutationObserver(() => {
  if (scanScheduled) {
    return;
  }
  scanScheduled = true;
  window.requestAnimationFrame(() => {
    scanScheduled = false;
    scan();
  });
}).observe(document.body, { childList: true, subtree: true });

scan();
