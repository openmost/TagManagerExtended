<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManagerExtended\Template\Variable;

use Piwik\Piwik;
use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;
use Piwik\Plugins\TagManager\Template\Variable\BaseVariable;

class DateVariable extends BaseVariable
{
    public function getCategory()
    {
        return self::CATEGORY_DATE;
    }

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

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/variable/date.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('format', 'Y-m-d', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_DateFormatTitle');
                $field->description = Piwik::translate('TagManagerExtended_DateFormatDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->validators[] = new NotEmpty();
            }),
        );
    }
}
