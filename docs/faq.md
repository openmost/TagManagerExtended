## FAQ

__How to install this plugin__

This plugin is available in the official marketplace of Matomo. You have to install the same way as other plugins

- Go to the administration panel
- Look for the Marketplace section and select "Plugins" in the dropdown
- Then search for "**Tag Manager Extended**", install and activate the plugin.

__Is the plugin active for all Matomo users in my instance ?__

Yes, if you choose this plugin for your Matomo instance, all users will be able to use it.

__How can I contribute to this plugin ?__

You can help me develop this plugin by contacting me. You can also create the project and request an integration. Any way you consider legitimate to contribute is welcome.

__How long this plugin will be maintained ?__

As long as possible, I have many project to maintain, I'm the first user of this plugin and I use Matomo on many project, if I see errors, I'll patch this plugin faster as possible !

__Why do I see "Unavailable type (...)" on some of my tags, triggers or variables ?__

This label appears when an entity in your container references a type that is no longer registered on your Matomo instance. It typically happens when:

- a plugin that used to provide this type has been uninstalled or disabled,
- a built-in Tag Manager type has been replaced or removed by another plugin,
- a custom template has been deleted.

Without this fallback the Tag Manager list page would not render at all (Vue would crash with `Cannot read properties of null (reading 'description')`). The placeholder lets you keep the entity visible so you can edit it to use a still-available type, or delete it.

__What does "Code may contain errors" mean in the Custom HTML tag ?__

The Custom HTML editor checks the syntax of your `<script>` blocks (JavaScript and JSON-LD) while you type. When an error is found, it is underlined in the code and a red marker is displayed in the margin: hover it to read the message, or click on "Code may contain errors" to list all the errors. Fix them and the indicator switches to "Valid syntax".

__Can I use Matomo variables in my JavaScript code ?__

Yes. Variables such as `{{PageUrl}}` are replaced by their value when the tag is executed, so the validator ignores them and does not report them as errors.

__Does the validator prevent me from saving my tag ?__

No. The validator only helps you spot syntax errors, you can always save your tag. Only the syntax is checked: a valid code can still fail at runtime (for example when an external library is not loaded).