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

class FormInputTrigger extends BaseTrigger
{
    public const ID = 'FormInput';

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        return Piwik::translate('TagManagerExtended_FormInputTriggerName');
    }

    public function getDescription()
    {
        return Piwik::translate('TagManagerExtended_FormInputTriggerDescription');
    }

    public function getCategory()
    {
        return self::CATEGORY_USER_ENGAGEMENT;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/variable/form.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('selector', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_FormInputSelectorTitle');
                $field->description = Piwik::translate('TagManagerExtended_FormInputSelectorDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
            }),
            $this->makeSetting('listenType', 'change', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_FormInputListenTypeTitle');
                $field->description = Piwik::translate('TagManagerExtended_FormInputListenTypeDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                    'change' => 'Change (on blur / selection)',
                    'input' => 'Input (real-time typing)',
                    'both' => 'Both (change + input)',
                );
            }),
        );
    }
}
