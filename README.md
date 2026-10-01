# Matomo TagManagerExtended Plugin

Extend the Matomo Tag Manager with 35 ready-to-use tag templates, extra triggers and variables, bulk actions and a Custom HTML code editor with syntax validation.

## Features

### Tag templates

Each advertising and social pixel is a complete tag: it loads the base library, initialises the pixel and sends the selected event (page view by default, standard conversion events or a custom event). Where the platform supports it, an event ID can be sent for server-side (Conversions API) deduplication. Every field accepts Matomo variables (`{{...}}`). Each tag and variable template comes with a help text explaining what it does and how to set it up, in the 12 languages of the interface.

- **Ads**: Google Ads : Conversion, LinkedIn Ads : Conversion, Microsoft Ads : Conversion
- **Social**: Meta Pixel, TikTok Pixel, Pinterest Tag, Snapchat Pixel, X (Twitter) Pixel, Reddit Pixel
- **Analytics**: Google Tag (gtag.js), Google Analytics 4 : Event, Google User-Provided Data, Matomo Analytics : Ecommerce, Matomo Analytics : Search, Hotjar, Microsoft Clarity, Simple Analytics, ListenLayer
- **Consent management**: Google Consent Mode (v2), Microsoft Consent Mode, Axeptio (with Google Consent Mode v2 support), Cookiebot, CookieYes, OneTrust
- **Remarketing and support**: Criteo OneTag, Crisp, Intercom
- **Email**: Brevo, Klaviyo
- **Affiliates**: Affilae
- **Others**: HubSpot, Slack, Alert, Console, DataLayer Synchronisation (deprecated since Matomo 5.2)

When a template replaces a built-in Tag Manager template (Google Tag, Google Ads, Google Analytics 4 event, Google Consent Mode, Hotjar and some consent platforms), the built-in one is hidden so only one version is listed.

### Triggers

- **Custom Event**, with regular expression matching
- **Custom Event Group**: fires only when all the required events have occurred
- **Form Input**: fires when a form field changes (input, select, checkbox, radio, textarea)

### Variables

- **LocalStorage** and **SessionStorage** values
- **Date** with a custom format
- **Click data-attribute**: any `data-*` attribute of the clicked element
- **Form Input** values: Value, Name, ID, Type, Element, Checked, Classes, Selected Text

### Custom HTML code editor

The Custom HTML tag gets a code editor:

- HTML, JavaScript and CSS syntax highlighting, in a light or dark palette that follows the Matomo theme, with line numbers, auto-indentation, auto-closing tags and autocompletion
- Live validation of the JavaScript and JSON-LD (`<script type="application/ld+json">`) blocks: errors are underlined as you type, and a "Valid syntax" / "Code may contain errors" indicator lists them
- Matomo variables (`{{...}}`) are supported by the validator and the variable picker still inserts them at the cursor position
- The validator never blocks saving

### Bulk actions

- Select several tags, triggers or variables in a container
- Delete them in one action, or pause and resume several tags at once
- Available to every user with write access to the container

### Safer lists

Tags, triggers and variables whose type is no longer available (for example after a plugin was removed) are shown as "Unavailable type (...)" instead of breaking the Tag Manager list, so they can be edited or deleted.

This protection only works while TagManagerExtended is active. Before you deactivate or uninstall it, delete the tags, triggers and variables created from its templates: Matomo Tag Manager cannot display an entity whose template is not available, its list then stays on "Loading data".

The interface is translated into 12 languages.

## Requirements

- Matomo 5.10.0 or higher, below 6.0.0
- The Matomo **TagManager** plugin, activated

## Installation / Configuration

1. Install and activate the plugin from the Matomo Marketplace (**Administration > Platform > Marketplace**).
2. Open **Tag Manager** for a website: the new templates are listed when you create a tag, trigger or variable, and the bulk actions are available on the tags, triggers and variables lists.

There is nothing else to configure. The plugin is available to every Tag Manager user of the instance.

## Privacy and data

The plugin does not send any data by itself. The tags you publish load the scripts of the third-party platforms you choose (Meta, TikTok, Google, LinkedIn...) in your visitors' browsers, and those platforms receive the data you configure in each tag. Use a consent management tag and triggers to respect your visitors' consent.

## Need help with Matomo?

Openmost is an official Matomo Implementation Partner. We design [Matomo tracking plans](https://openmost.com/matomo/services/tracking-architecture?utm_source=matomo_marketplace&utm_medium=referral&utm_campaign=services&utm_content=tagmanagerextended) and implement them in Matomo Tag Manager, with tags, triggers, variables and a data layer where needed, documented so your team can maintain them.

## Support

- Documentation: https://openmost.com/matomo/extensions/tag-manager-extended
- Email: ronan@openmost.com
- Issues: https://github.com/openmost/TagManagerExtended/issues

## Screenshots

See the `screenshots/` folder for the tag, trigger and variable templates, the bulk actions and the Custom HTML code editor.
