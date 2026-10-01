/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import {
  describe, expect, it, vi,
} from 'vitest';
import { lintScripts } from './scriptLinter';

vi.mock('CoreHome', () => ({
  translate: (key: string, ...values: string[]) => `${key}: ${values.join(', ')}`,
}));

describe('lintScripts', () => {
  it('accepts valid JavaScript and plain HTML', () => {
    const html = '<div class="a">Hello</div>\n<script>\n  var a = 1;\n  window.dataLayer = [];\n</script>';
    expect(lintScripts(html)).toEqual([]);
  });

  it('reports a JavaScript syntax error at its position in the document', () => {
    const html = '<p>x</p><script>var a = ;</script>';
    const diagnostics = lintScripts(html);

    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].message).toContain('TagManagerExtended_JavaScriptSyntaxError');
    expect(diagnostics[0].message).not.toMatch(/\(\d+:\d+\)$/);
    expect(html.substring(diagnostics[0].from, diagnostics[0].from + 1)).toBe(';');
  });

  it('does not report Matomo variables as errors', () => {
    const html = `<script>
      var id = {{ContainerId}};
      var url = '{{PageUrl}}';
      window.{{Name}} = {{Value}}.trim();
    </script>`;
    expect(lintScripts(html)).toEqual([]);
  });

  it('keeps error positions right after a masked variable', () => {
    const html = '<script>var a = {{PageUrl}}; var = 2;</script>';
    const [diagnostic] = lintScripts(html);

    expect(html.substring(diagnostic.from, diagnostic.from + 1)).toBe('=');
  });

  it('checks each script block independently', () => {
    const html = '<script>ok();</script><script>broken(</script><script>fine();</script>';
    expect(lintScripts(html)).toHaveLength(1);
  });

  it('supports ES modules', () => {
    expect(lintScripts('<script type="module">import x from "./x.js"; export default x;</script>')).toEqual([]);
    expect(lintScripts('<script>import x from "./x.js";</script>')).toHaveLength(1);
  });

  it('validates JSON-LD, including variables', () => {
    expect(lintScripts('<script type="application/ld+json">{"name": "{{PageTitle}}", "id": {{Id}}}</script>')).toEqual([]);

    const [diagnostic] = lintScripts('<script type="application/ld+json">{"name": }</script>');
    expect(diagnostic.message).toContain('TagManagerExtended_JsonSyntaxError');
  });

  it('only checks real script elements', () => {
    expect(lintScripts('<!-- <script> -->\n<script>var a = 1;</script>')).toEqual([]);
    expect(lintScripts('<!-- disabled: <script>old(</script> -->')).toEqual([]);
    expect(lintScripts('<style>.a::after { content: "<script>"; }</style><script>ok();</script>')).toEqual([]);
  });

  it('reads the script content after an opening tag containing ">"', () => {
    expect(lintScripts('<script src="a.js" onload="if (a > b) run()">var ok = 1;</script>')).toEqual([]);

    const html = '<script data-a="x>y">var a = ;</script>';
    const [diagnostic] = lintScripts(html);
    expect(html.substring(diagnostic.from, diagnostic.from + 1)).toBe(';');
  });

  it('reads the type attribute only, whatever the case of the tags', () => {
    expect(lintScripts('<script data-type="text/plain">var a = ;</script>')).toHaveLength(1);
    expect(lintScripts('<SCRIPT TYPE=text/template>{{ not js </SCRIPT>')).toEqual([]);
    expect(lintScripts('<SCRIPT>var a = ;</SCRIPT>')).toHaveLength(1);
  });

  it('ignores non JavaScript script types', () => {
    expect(lintScripts('<script type="text/template"><div>{{ broken( </div></script>')).toEqual([]);
  });
});
