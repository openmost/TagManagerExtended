## Changelog

## v5.6.0

- Support native CSS variables for Matomo 5.10+

## v5.5.1

- Security fixes

## v5.5.0

### New Feature: Bulk Actions

Manage multiple tags, triggers, and variables at once with the new bulk actions feature:

- **Select multiple items**: Checkbox on each row to select individual items
- **Select All**: Quick selection of all items in the list
- **Bulk Delete**: Delete multiple tags, triggers, or variables at once
- **Bulk Pause/Resume** (tags only): Pause or resume multiple tags simultaneously

This feature is only available for users with write access to the container.

### Improvements

- Refactored LESS stylesheets into modular components for better maintainability
- Added branding badge for TagManagerExtended items in the list

## v5.4.0

### New Triggers

- **Custom Event** (enhanced): Added regex support with a "Use Regular Expression" checkbox option to match event names using patterns
- **Custom Event Group**: Fires only when ALL specified custom events have been pushed to the data layer. Useful for multi-condition scenarios
- **Form Input**: Fires when a form element (input, select, checkbox, radio, textarea) value changes. Supports "Change", "Input", or "Both" listen modes

### New Variables

- **LocalStorage**: Get a value from the browser's localStorage
- **SessionStorage**: Get a value from the browser's sessionStorage
- **Date**: Returns the current date/time in a custom format (PHP-style tokens: Y, m, d, H, i, s, etc.)

### New Pre-configured Variables (Forms category)

- **Form Input - Value**: Returns the value of the form element that triggered the Form Input event
- **Form Input - Name**: Returns the name attribute of the form element
- **Form Input - ID**: Returns the id attribute of the form element
- **Form Input - Type**: Returns the type of the form element (text, email, checkbox, select, etc.)
- **Form Input - Element**: Returns the DOM element that triggered the event
- **Form Input - Checked**: Returns true/false for checkbox and radio elements
- **Form Input - Classes**: Returns the CSS classes of the form element
- **Form Input - Selected Text**: Returns the displayed text of the selected option (for select elements)

## v5.3.0

update: Input with variable design
update: Move Add entity button a the top

## v5.2.3

update: Add wait_for_update parameter in Google Consent Mode v2
add: Microsoft Consent Mode tag

## v5.2.2

fix: Fixing conflict with core and custom tags name.
Thanks to [@AltamashShaikh](https://github.com/AltamashShaikh)

## v5.2.1

update: Tag differencitation from Core imported tags

## v5.1.3

fix: Google Ads Conversion init gtag.js itself

## v5.1.2

Update CustomHTML with overflow auto

## v5.1.1

Update CustomHTML native tag to enhance textarea

## v5.1.0

Add tag to Tag Manager

- Google Consent Mode (v2)

Update tags :

- Google Analytics 4 : Event
- Axeptio (support Google Consent Mode v2)

## v5.0.9

Add tag to Tag Manager

- Matomo Analytics : Search
- Intercom

### v5.0.8

Update documentation url

### v5.0.6

Update tags

- GAds Conversion support with and without "AW-" syntax for conversion ID

### v5.0.5

Update tags

- GAds Conversion support transaction ID

### v5.0.4

Add tag to Tag Manager

- Google Tag

Fix existing tag

- Google Analytics 4 tag

### v5.0.3

Add tag to Tag Manager

- Simple Analytics
- Alert
- Console

### v5.0.2

Add tag to Tag Manager

- OneTrust

### v5.0.1

Add tag to Tag Manager

- Slack

### v5.0.0

Support Matomo v5

### v4.3.3

Update documentation

### v4.3.1

Update screenshots

### v4.3.0

Add tags to Tag Manager

- Affilae
- ListenLayer

### v4.2.0

Add tags to Tag Manager

- Matomo Analytics : Ecommerce

### v4.1.0

Add tags to Tag Manager

- Google Ads : Conversion
- CookieYes
- Cookiebot
- Brevo
- Klaviyo
- DataLayer Synchronisation

Update Axeptio tag to send events to _mtm

### v4.0.3

Fix Axeptio tag compatibility with Matomo Tag Manager

### v4.0.2

Update doc for Markdown readers

### v4.0.1

Add custom variable template to Tag Manager

- Click data-attribute

### v4.0.0

Add tags to Tag Manager

- Axeptio
- Google Analytics 4
- Google Analytics 4 : Event
- Hotjar
- Microsoft Clarity
