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
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;

class CustomEventTrigger extends BaseTrigger
{
    public const ID = 'CustomEvent';

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        return Piwik::translate('TagManager_CustomEventTriggerName');
    }

    public function getDescription()
    {
        return Piwik::translate('TagManager_CustomEventTriggerDescription');
    }

    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/code.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('eventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('Events_EventName');
                $field->description = Piwik::translate('TagManagerExtended_CustomEventTriggerEventNameDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength($min = 1, $max = 300);
            }),
            $this->makeSetting('useRegex', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_CustomEventTriggerUseRegexTitle');
                $field->description = Piwik::translate('TagManagerExtended_CustomEventTriggerUseRegexDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_CHECKBOX;
            }),
        );
    }
}
