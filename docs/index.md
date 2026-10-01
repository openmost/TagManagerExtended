## Documentation

### 1 - Install the plugin from the marketplace or via GitHub

Install this plugin from the Marketplace as super user or download the plugin and install it on your server from FTP in
the `/plugins` folder. 

As a super user, enable the plugin in **Administration > Platform > Plugins**.

### 2 - Use the new tags, triggers and variables

This plugin adds tags, triggers and variables to the Tag Manager to let you deploy other solutions in seconds. They are listed with the built-in templates when you create a tag, a trigger or a variable. Each tag and variable template comes with a help text explaining what it does and how to set it up, for example which tag must be loaded first or when to fire it.

### 3 - Write Custom HTML with syntax highlighting and a JavaScript validator

The **Custom HTML** tag comes with a real code editor:

- **Syntax highlighting** for HTML, JavaScript and CSS, in a light or dark palette that follows the Matomo theme, with line numbers, auto-indentation, auto-closing tags and autocompletion.
- **JavaScript syntax validator**: the code of your `<script>` blocks is checked while you type. Errors are underlined in the editor and marked in the margin, hover them to read the message.
- **JSON-LD validation**: `<script type="application/ld+json">` blocks are checked too.
- A **"Valid syntax" / "Code may contain errors"** indicator is displayed next to the field. Click it to open the list of errors.
- Matomo **variables** (`{{PageUrl}}`...) are supported by the validator, and the variable picker inserts them at the cursor position.

The validator only reports syntax errors and never prevents you from saving your tag.

### 4 - Manage your container with bulk actions

On the tags, triggers and variables lists, select several items to delete them in one action. Tags can also be paused or resumed in bulk. Bulk actions are available to every user with write access to the container.

<hr>  

### List of available tags :

**[Ads]**

- Google Ads : Conversion
- LinkedIn Ads : Conversion
- Microsoft Ads : Conversion

**[Affiliates]**

- Affilae

**[Analytics]**

- Matomo Analytics : Ecommerce
- Matomo Analytics : Search
- Google Analytics 4 : Event
- Google Tag (gtag.js)
- Google User-Provided Data
- Hotjar
- ListenLayer
- Microsoft Clarity
- Simple Analytics

**[Consent Management]**

- Google Consent Mode (v2)
- Microsoft Consent Mode

**[Consent Management Platform]**

- Axeptio (support Google Consent Mode v2)
- CookieYes
- Cookiebot
- OneTrust

**[Email]**

- Brevo
- Klaviyo

**[Openmost]**

- DataLayer Synchronisation (deprecated since Matomo 5.2)

**[Remarketing]**

- Criteo OneTag
- Crisp
- Intercom

**[Social]**

- Meta Pixel
- Pinterest Tag
- Reddit Pixel
- Snapchat Pixel
- TikTok Pixel
- X (Twitter) Pixel

**[Others]**

- Alert
- Console
- HubSpot
- Slack

<hr>

### List of available triggers :

**[Others]**

- Custom Event (enhanced with regex support)
- Custom Event Group

**[User Engagement]**

- Form Input

<hr>

### List of available variables :

**[Page Variables]**

- LocalStorage
- SessionStorage

**[Date]**

- Date (custom format)

**[Clicks]**

- Click data-attribute

**[Forms]**

- Form Input - Value
- Form Input - Name
- Form Input - ID
- Form Input - Type
- Form Input - Element
- Form Input - Checked
- Form Input - Classes
- Form Input - Selected Text
