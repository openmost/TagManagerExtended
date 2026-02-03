<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManagerExtended;

class TagManagerExtended extends \Piwik\Plugin
{
    public function registerEvents()
    {
        return array(
            'AssetManager.getStylesheetFiles' => 'getStylesheetFiles',
            'AssetManager.getJavaScriptFiles' => 'getJavaScriptFiles',
            'TagManager.filterTags' => 'filterTags',
            'TagManager.filterVariables' => 'filterVariables',
            'TagManager.filterTriggers' => 'filterTriggers',
            'Translate.getClientSideTranslationKeys' => 'getClientSideTranslationKeys',
        );
    }

    public function getClientSideTranslationKeys(&$translationKeys)
    {
        $translationKeys[] = 'TagManagerExtended_BulkActions';
        $translationKeys[] = 'TagManagerExtended_SelectAll';
        $translationKeys[] = 'TagManagerExtended_DeselectAll';
        $translationKeys[] = 'TagManagerExtended_Selected';
        $translationKeys[] = 'TagManagerExtended_BulkDelete';
        $translationKeys[] = 'TagManagerExtended_BulkPause';
        $translationKeys[] = 'TagManagerExtended_BulkResume';
        $translationKeys[] = 'TagManagerExtended_ConfirmBulkDelete';
        $translationKeys[] = 'TagManagerExtended_ConfirmBulkPause';
        $translationKeys[] = 'TagManagerExtended_ConfirmBulkResume';
        $translationKeys[] = 'TagManagerExtended_BulkSuccess';
        $translationKeys[] = 'TagManagerExtended_BulkPartialSuccess';
    }

    public function getStylesheetFiles(&$files)
    {
        $files[] = "plugins/TagManagerExtended/stylesheets/style.less";
    }

    public function getJavaScriptFiles(&$files)
    {
        $files[] = "plugins/TagManagerExtended/javascripts/script.js";
    }

    public function filterTags(&$tags)
    {
        $found = false;
        foreach ($tags as $key => &$tag) {
            if (in_array($tag->getId(), ['Axeptio', 'CookieYes', 'Cookiebot', 'OneTrust', 'Hotjar', 'GoogleAdsConversion', 'GoogleAnalytics4Event', 'GoogleTag']) && $this->isPartOfTagManagerPlugin($tag)) {
                $found = true;
                unset($tags[$key]);
            }
        }

        if ($found) {
            $tags = array_values($tags);
        }
    }

    public function filterVariables(&$variables)
    {
        $found = false;
        foreach ($variables as $key => &$variable) {
            if (in_array($variable->getId(), ['ClickDataAttribute']) && $this->isPartOfTagManagerPlugin($variable)) {
                $found = true;
                unset($variables[$key]);
            }
        }

        if ($found) {
            $variables = array_values($variables);
        }
    }

    public function filterTriggers(&$triggers)
    {
        $found = false;
        foreach ($triggers as $key => &$trigger) {
            if (in_array($trigger->getId(), ['CustomEvent']) && $this->isPartOfTagManagerPlugin($trigger)) {
                $found = true;
                unset($triggers[$key]);
            }
        }

        if ($found) {
            $triggers = array_values($triggers);
        }
    }

    private function isPartOfTagManagerPlugin($object): bool
    {
        $classname = get_class($object);
        $parts = explode('\\', $classname);
        $pluginName = 'TagManager';

        if (count($parts) >= 4 && $parts[1] === 'Plugins') {
            $pluginName = $parts[2];
        }

        return $pluginName === 'TagManager';
    }
}
