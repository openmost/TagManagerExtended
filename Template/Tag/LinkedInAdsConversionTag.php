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

class LinkedInAdsConversionTag extends BaseTag
{
    public function getCategory()
    {
        return self::CATEGORY_ADS;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/tag/linkedin.svg';
    }

    public function getParameters()
    {
        return array(

            $this->makeSetting('conversionId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_LinkedInAdsConversionIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_LinkedInAdsConversionIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

            $this->makeSetting('partnerId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_LinkedInAdsConversionPartnerIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_LinkedInAdsConversionPartnerIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

        );
    }

}
