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

class MetaPixelTag extends BaseTag
{
    /**
     * Events supported by the Meta Pixel. "PageView" is the base event, the
     * others are the standard conversion events.
     *
     * @see https://www.facebook.com/business/help/402791146561655
     */
    public const EVENTS = array(
        'PageView',
        'ViewContent',
        'Search',
        'AddToCart',
        'AddToWishlist',
        'InitiateCheckout',
        'AddPaymentInfo',
        'Purchase',
        'Lead',
        'CompleteRegistration',
        'Contact',
        'CustomizeProduct',
        'Donate',
        'FindLocation',
        'Schedule',
        'StartTrial',
        'SubmitApplication',
        'Subscribe',
    );

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/tag/meta.svg';
    }

    public function getParameters()
    {
        $events = array_combine(self::EVENTS, self::EVENTS);
        $events['custom'] = Piwik::translate('TagManagerExtended_MetaPixelEventNameCustom');

        return array(

            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_MetaPixelIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_MetaPixelIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManagerExtended_MetaPixelIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

            $this->makeSetting('eventName', 'PageView', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($events) {
                $field->title = Piwik::translate('TagManagerExtended_MetaPixelEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_MetaPixelEventNameDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = $events;
                $field->validators[] = new NotEmpty();
            }),

            $this->makeSetting('customEventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_MetaPixelCustomEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_MetaPixelCustomEventNameDescription');
                $field->condition = 'eventName == "custom"';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('eventParameters', '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field->title = Piwik::translate('TagManagerExtended_MetaPixelParametersTitle');
                $field->description = Piwik::translate('TagManagerExtended_MetaPixelParametersDescription');

                $field1 = new FieldConfig\MultiPair(Piwik::translate('Parameter'), 'parameter', FieldConfig::UI_CONTROL_TEXT);
                $field1->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field2 = new FieldConfig\MultiPair(Piwik::translate('Value'), 'value', FieldConfig::UI_CONTROL_TEXT);
                $field2->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
            }),

            $this->makeSetting('eventId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_MetaPixelEventIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_MetaPixelEventIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

        );
    }

}
