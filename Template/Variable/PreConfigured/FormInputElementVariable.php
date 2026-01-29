<?php
namespace Piwik\Plugins\TagManagerExtended\Template\Variable\PreConfigured;

use Piwik\Plugins\TagManager\Template\Variable\PreConfigured\BaseDataLayerVariable;

class FormInputElementVariable extends BaseDataLayerVariable
{
    public function getCategory()
    {
        return self::CATEGORY_FORMS;
    }

    protected function getDataLayerVariableName()
    {
        return 'mtm.formInputElement';
    }
}
