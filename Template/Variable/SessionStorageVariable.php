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

class SessionStorageVariable extends BaseVariable
{
    public function getCategory()
    {
        return self::CATEGORY_PAGE_VARIABLES;
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
        return 'plugins/TagManagerExtended/images/icons/variable/storage.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('key', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_SessionStorageKeyTitle');
                $field->description = Piwik::translate('TagManagerExtended_SessionStorageKeyDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->validators[] = new NotEmpty();
            }),
        );
    }
}
