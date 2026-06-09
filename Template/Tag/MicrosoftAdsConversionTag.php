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

class MicrosoftAdsConversionTag extends BaseTag
{
    public function getCategory()
    {
        return self::CATEGORY_ADS;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/tag/microsoft-advertising.png';
    }

    public function getParameters()
    {
        return array(

            $this->makeSetting('eventAction', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionActionTitle');
                $field->description = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionActionDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('eventCategory', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionCategoryTitle');
                $field->description = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionCategoryDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('eventLabel', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionLabelTitle');
                $field->description = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionLabelDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('eventValue', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionValueTitle');
                $field->description = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionValueDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('revenueValue', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionRevenueTitle');
                $field->description = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionRevenueDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('currency', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionCurrencyTitle');
                $field->description = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionCurrencyDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('eventParameters', '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field->title = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionParametersTitle');
                $field->description = Piwik::translate('TagManagerExtended_MicrosoftAdsConversionParametersDescription');

                $field1 = new FieldConfig\MultiPair(Piwik::translate('Parameter'), 'parameter', FieldConfig::UI_CONTROL_TEXT);
                $field1->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field2 = new FieldConfig\MultiPair(Piwik::translate('Value'), 'value', FieldConfig::UI_CONTROL_TEXT);
                $field2->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
            }),

        );
    }

}
