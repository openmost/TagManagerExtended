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

class SnapchatPixelTag extends BaseTag
{
    /**
     * Events supported by the Snap Pixel. "PAGE_VIEW" is the base event, the
     * others are conversion events.
     *
     * @see https://businesshelp.snapchat.com/s/article/pixel-direct-implementation
     */
    public const EVENTS = array(
        'PAGE_VIEW',
        'VIEW_CONTENT',
        'LIST_VIEW',
        'SEARCH',
        'ADD_CART',
        'ADD_TO_WISHLIST',
        'START_CHECKOUT',
        'ADD_BILLING',
        'PURCHASE',
        'SIGN_UP',
        'SUBSCRIBE',
        'AD_CLICK',
        'COMPLETE_TUTORIAL',
        'CUSTOM_EVENT_1',
        'CUSTOM_EVENT_2',
        'CUSTOM_EVENT_3',
        'CUSTOM_EVENT_4',
        'CUSTOM_EVENT_5',
    );

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/tag/snapchat.svg';
    }

    public function getParameters()
    {
        $events = array_combine(self::EVENTS, self::EVENTS);

        return array(

            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_SnapchatPixelIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_SnapchatPixelIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

            $this->makeSetting('eventName', 'PAGE_VIEW', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($events) {
                $field->title = Piwik::translate('TagManagerExtended_SnapchatPixelEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_SnapchatPixelEventNameDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = $events;
                $field->validators[] = new NotEmpty();
            }),

            $this->makeSetting('userEmail', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_SnapchatUserEmailTitle');
                $field->description = Piwik::translate('TagManagerExtended_SnapchatUserEmailDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('eventParameters', '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field->title = Piwik::translate('TagManagerExtended_SnapchatPixelParametersTitle');
                $field->description = Piwik::translate('TagManagerExtended_SnapchatPixelParametersDescription');

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
