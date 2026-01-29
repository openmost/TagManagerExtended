<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManagerExtended\Template\Trigger;

use Piwik\Piwik;
use Piwik\Settings\FieldConfig;
use Piwik\Plugins\TagManager\Template\Trigger\BaseTrigger;

class RegexEventTrigger extends BaseTrigger
{
    public function getName()
    {
        return parent::getName();
    }

    public function getDescription()
    {
        return parent::getDescription();
    }

    public function getHelp()
    {
        return parent::getHelp();
    }

    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/RegexEventTrigger.svg';
    }

    public function getParameters()
    {
        return [
            $this->makeSetting('eventNamePattern', '.*', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_RegexEventTriggerPatternTitle');
                $field->description = Piwik::translate('TagManagerExtended_RegexEventTriggerPatternDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->inlineHelp = Piwik::translate('TagManagerExtended_RegexEventTriggerPatternHelp');
            }),
        ];
    }

    public function getOrder()
    {
        return 50;
    }
}
