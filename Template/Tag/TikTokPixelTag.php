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

class TikTokPixelTag extends BaseTag
{
    /**
     * Events supported by the TikTok Pixel. "PageView" is the base event
     * (ttq.page()), the others are the standard conversion events.
     *
     * @see https://business-api.tiktok.com/portal/docs?id=1739585696926209
     */
    public const EVENTS = array(
        'PageView',
        'ViewContent',
        'Search',
        'AddToWishlist',
        'AddToCart',
        'InitiateCheckout',
        'AddPaymentInfo',
        'Purchase',
        'CompleteRegistration',
        'Contact',
        'Download',
        'SubmitForm',
        'SubmitApplication',
        'Subscribe',
        'CustomizeProduct',
        'FindLocation',
        'Schedule',
        'StartTrial',
    );

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/tag/tiktok.svg';
    }

    public function getParameters()
    {
        $events = array_combine(self::EVENTS, self::EVENTS);
        $events['custom'] = Piwik::translate('TagManagerExtended_TikTokPixelEventNameCustom');

        return array(

            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_TikTokPixelIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_TikTokPixelIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManagerExtended_TikTokPixelIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

            $this->makeSetting('eventName', 'PageView', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($events) {
                $field->title = Piwik::translate('TagManagerExtended_TikTokPixelEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_TikTokPixelEventNameDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = $events;
                $field->validators[] = new NotEmpty();
            }),

            $this->makeSetting('customEventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_TikTokPixelCustomEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_TikTokPixelCustomEventNameDescription');
                $field->condition = 'eventName == "custom"';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('eventParameters', '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field->title = Piwik::translate('TagManagerExtended_TikTokPixelParametersTitle');
                $field->description = Piwik::translate('TagManagerExtended_TikTokPixelParametersDescription');

                $field1 = new FieldConfig\MultiPair(Piwik::translate('Parameter'), 'parameter', FieldConfig::UI_CONTROL_TEXT);
                $field1->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field2 = new FieldConfig\MultiPair(Piwik::translate('Value'), 'value', FieldConfig::UI_CONTROL_TEXT);
                $field2->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
            }),

            $this->makeSetting('eventId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_TikTokPixelEventIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_TikTokPixelEventIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

        );
    }

}
