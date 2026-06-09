<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManagerExtended\Template\Tag;

use Piwik\Piwik;
use Piwik\Settings\FieldConfig;
use Piwik\Plugins\TagManager\Template\Tag\BaseTag;
use Piwik\Validators\NotEmpty;

class HubSpotTag extends BaseTag
{
    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/tag/hubspot.svg';
    }

    public function getParameters()
    {
        return array(

            $this->makeSetting('portalId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_HubSpotPortalIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_HubSpotPortalIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManagerExtended_HubSpotPortalIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

            $this->makeSetting('region', 'na1', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_HubSpotRegionTitle');
                $field->description = Piwik::translate('TagManagerExtended_HubSpotRegionDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                    'na1' => 'na1 (default)',
                    'eu1' => 'eu1 (Europe)',
                );
                $field->validators[] = new NotEmpty();
            }),

            $this->makeSetting('email', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_HubSpotEmailTitle');
                $field->description = Piwik::translate('TagManagerExtended_HubSpotEmailDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('eventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_HubSpotEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_HubSpotEventNameDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

        );
    }

}
