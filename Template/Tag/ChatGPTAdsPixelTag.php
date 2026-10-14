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

class ChatGPTAdsPixelTag extends BaseTag
{
    /**
     * Standard events of the ChatGPT Ads Measurement Pixel, grouped by the data
     * "type" they require. "app_installed" and "app_opened" are Conversions API
     * only and are therefore not listed.
     *
     * @see https://developers.openai.com/ads/measurement-pixel
     */
    public const CONTENTS_EVENTS = array(
        'page_viewed',
        'contents_viewed',
        'items_added',
        'checkout_started',
        'order_created',
    );

    public const CUSTOMER_ACTION_EVENTS = array(
        'lead_created',
        'registration_completed',
        'appointment_scheduled',
    );

    public const PLAN_ENROLLMENT_EVENTS = array(
        'subscription_created',
        'trial_started',
    );

    // Events whose data shape has no amount nor currency.
    public const EVENTS_WITHOUT_AMOUNT = array(
        'lead_created',
        'registration_completed',
        'trial_started',
    );

    public function getCategory()
    {
        return self::CATEGORY_ADS;
    }

    public function getIcon()
    {
        return 'plugins/TagManagerExtended/images/icons/tag/chatgpt.svg';
    }

    public function getParameters()
    {
        $standardEvents = array_merge(self::CONTENTS_EVENTS, self::CUSTOMER_ACTION_EVENTS, self::PLAN_ENROLLMENT_EVENTS);
        $events = array_combine($standardEvents, $standardEvents);
        $events['custom'] = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelEventNameCustom');

        $hasAmount = self::conditionNotIn('eventName', self::EVENTS_WITHOUT_AMOUNT);
        $hasContents = self::conditionIn('eventName', array_merge(self::CONTENTS_EVENTS, array('custom')));
        $hasPlan = self::conditionIn('eventName', array_merge(self::PLAN_ENROLLMENT_EVENTS, array('custom')));
        $hasSingleContent = '(' . $hasContents . ') && contentsSource == "single"';
        $hasContentsVariable = '(' . $hasContents . ') && contentsSource == "variable"';

        return array(

            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

            $this->makeSetting('eventName', 'page_viewed', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($events) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelEventNameDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = $events;
                $field->validators[] = new NotEmpty();
            }),

            $this->makeSetting('customEventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelCustomEventNameTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelCustomEventNameDescription');
                $field->uiControlAttributes = ['placeholder' => 'quote_requested'];
                $field->condition = 'eventName == "custom"';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('amount', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasAmount) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelAmountTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelAmountDescription');
                $field->condition = $hasAmount;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('amountFormat', 'decimal', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasAmount) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelAmountFormatTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelAmountFormatDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                    'decimal' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelAmountFormatDecimal'),
                    'minor' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelAmountFormatMinor'),
                );
                $field->condition = $hasAmount;
            }),

            $this->makeSetting('currency', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasAmount) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelCurrencyTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelCurrencyDescription');
                $field->uiControlAttributes = ['placeholder' => 'EUR'];
                $field->condition = $hasAmount;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('planId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasPlan) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelPlanIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelPlanIdDescription');
                $field->uiControlAttributes = ['placeholder' => 'pro_monthly'];
                $field->condition = $hasPlan;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('contentsSource', 'none', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasContents) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsSourceTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsSourceDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                    'none' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsSourceNone'),
                    'single' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsSourceSingle'),
                    'variable' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsSourceVariable'),
                );
                $field->condition = $hasContents;
            }),

            $this->makeSetting('contentId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasSingleContent) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentIdDescription');
                $field->condition = $hasSingleContent;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('contentName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasSingleContent) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentNameTitle');
                $field->condition = $hasSingleContent;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('contentType', 'product', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasSingleContent) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentTypeTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentTypeDescription');
                $field->condition = $hasSingleContent;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('contentQuantity', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasSingleContent) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentQuantityTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentQuantityDescription');
                $field->condition = $hasSingleContent;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('contentAmount', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasSingleContent) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentAmountTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentAmountDescription');
                $field->condition = $hasSingleContent;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('contentsVariable', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasContentsVariable) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsVariableTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsVariableDescription');
                $field->condition = $hasContentsVariable;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('contentsFormat', 'ga4', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($hasContentsVariable) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsFormatTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsFormatDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                    'ga4' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsFormatGa4'),
                    'matomo' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsFormatMatomo'),
                    'openai' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelContentsFormatOpenai'),
                );
                $field->condition = $hasContentsVariable;
            }),

            $this->makeSetting('eventId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelEventIdTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelEventIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('optOut', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelOptOutTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelOptOutDescription');
            }),

            $this->makeSetting('consentMode', 'default', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelConsentModeTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelConsentModeDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                    'default' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelConsentModeDefault'),
                    'granted' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelConsentModeGranted'),
                    'denied' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelConsentModeDenied'),
                    'variable' => Piwik::translate('TagManagerExtended_ChatGPTAdsPixelConsentModeVariable'),
                );
            }),

            $this->makeSetting('consentValue', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelConsentValueTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelConsentValueDescription');
                $field->condition = 'consentMode == "variable"';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),

            $this->makeSetting('sendUserData', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelSendUserDataTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelSendUserDataDescription');
            }),

            $this->makeUserDataSetting('userEmail', 'Email'),
            $this->makeUserDataSetting('userPhone', 'Phone'),
            $this->makeUserDataSetting('userExternalId', 'ExternalId'),
            $this->makeUserDataSetting('userFirstName', 'FirstName'),
            $this->makeUserDataSetting('userLastName', 'LastName'),
            $this->makeUserDataSetting('userCountry', 'Country'),
            $this->makeUserDataSetting('userCity', 'City'),
            $this->makeUserDataSetting('userRegion', 'Region'),
            $this->makeUserDataSetting('userPostalCode', 'PostalCode'),

            $this->makeSetting('debug', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelDebugTitle');
                $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelDebugDescription');
            }),

        );
    }

    private function makeUserDataSetting($name, $translationSuffix)
    {
        return $this->makeSetting($name, '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($translationSuffix) {
            $field->title = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelUser' . $translationSuffix . 'Title');
            $field->description = Piwik::translate('TagManagerExtended_ChatGPTAdsPixelUser' . $translationSuffix . 'Description');
            $field->condition = 'sendUserData';
            $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
        });
    }

    private static function conditionIn($fieldName, array $values)
    {
        return implode(' || ', array_map(function ($value) use ($fieldName) {
            return $fieldName . ' == "' . $value . '"';
        }, $values));
    }

    private static function conditionNotIn($fieldName, array $values)
    {
        return implode(' && ', array_map(function ($value) use ($fieldName) {
            return $fieldName . ' != "' . $value . '"';
        }, $values));
    }

}
