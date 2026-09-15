/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// The TagManagerExtended Vue library is loaded on demand (it bundles the code editor),
// so only request it on Tag Manager pages.
(function () {
  var params = new URLSearchParams(window.location.search);
  if (params.get('module') !== 'TagManager') {
    return;
  }

  $(function () {
    if (window.CoreHome && window.CoreHome.importPluginUmd) {
      window.CoreHome.importPluginUmd('TagManagerExtended');
    }
  });
})();
