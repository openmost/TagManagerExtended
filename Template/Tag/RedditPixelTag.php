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

class RedditPixelTag extends BaseTag
{
    /**
     * Events supported by the Reddit Pixel. "PageVisit" is the base event, the
     * others are conversion events.
     *
     * @see https://business.reddithelp.com/s/article/installing-the-reddit-pixel
     */
    public const EVENTS = array(
        'PageVisit',
        'ViewContent',
        'Search',
        'AddToCart',
        'AddToWishlist',
        'Purchase',
        'Lead',
        'SignUp',
    );

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/tag/reddit.svg';
    }

    public function getParameters()
    {
        $events = array_combine(self::EVENTS, self::EVENTS);
        $events['custom'] = Piwik::translate('TagManagerExtended_RedditPixelEventNameCustom');

        return array(

            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_RedditPixelIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_RedditPixelIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManagerExtended_RedditPixelIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

            $this->makeSetting('eventName', 'PageVisit', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($events) {
                $field->title = Piwik::translate('TagManagerExtended_RedditPixelEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_RedditPixelEventNameDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = $events;
                $field->validators[] = new NotEmpty();
            }),

            $this->makeSetting('customEventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_RedditPixelCustomEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_RedditPixelCustomEventNameDescription');
                $field->condition = 'eventName == "custom"';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('eventParameters', '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field->title = Piwik::translate('TagManagerExtended_RedditPixelParametersTitle');
                $field->description = Piwik::translate('TagManagerExtended_RedditPixelParametersDescription');

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
