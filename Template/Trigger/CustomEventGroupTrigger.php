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
use Piwik\Settings\FieldConfig\MultiPair;
use Piwik\Plugins\TagManager\Template\Trigger\BaseTrigger;

class CustomEventGroupTrigger extends BaseTrigger
{
    public const ID = 'CustomEventGroup';

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        return Piwik::translate('TagManagerExtended_CustomEventGroupTriggerName');
    }

    public function getDescription()
    {
        return Piwik::translate('TagManagerExtended_CustomEventGroupTriggerDescription');
    }

    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/trigger/group.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('eventNames', array(), FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_CustomEventGroupEventNamesTitle');
                $field->description = Piwik::translate('TagManagerExtended_CustomEventGroupEventNamesDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;

                $eventNameField = new MultiPair(Piwik::translate('Events_EventName'), 'eventName', FieldConfig::UI_CONTROL_TEXT);
                $eventNameField->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field->uiControlAttributes['field1'] = $eventNameField->toArray();
            }),
            $this->makeSetting('fireOnce', true, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_CustomEventGroupFireOnceTitle');
                $field->description = Piwik::translate('TagManagerExtended_CustomEventGroupFireOnceDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_CHECKBOX;
            }),
        );
    }
}
