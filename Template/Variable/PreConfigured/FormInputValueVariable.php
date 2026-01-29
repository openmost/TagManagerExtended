<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManagerExtended\Template\Variable\PreConfigured;

use Piwik\Plugins\TagManager\Template\Variable\PreConfigured\BaseDataLayerVariable;

class FormInputValueVariable extends BaseDataLayerVariable
{
    public function getCategory()
    {
        return self::CATEGORY_FORMS;
    }

    protected function getDataLayerVariableName()
    {
        return 'mtm.formInputValue';
    }
}
