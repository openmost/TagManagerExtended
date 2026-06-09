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

class CrispTag extends BaseTag
{
    public function getCategory()
    {
        return self::CATEGORY_REMARKETING;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/tag/crisp.png';
    }

    public function getParameters()
    {
        return array(

            $this->makeSetting('websiteId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_CrispWebsiteIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_CrispWebsiteIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManagerExtended_CrispWebsiteIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

            $this->makeSetting('userEmail', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_CrispUserEmailTitle');
                $field->description = Piwik::translate('TagManagerExtended_CrispUserEmailDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('userNickname', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_CrispUserNicknameTitle');
                $field->description = Piwik::translate('TagManagerExtended_CrispUserNicknameDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

        );
    }

}
