#nodebb-widget-sunsetbrew-sandbox

This plugin for NodeBB allows people to put a configurable widget on their website which shows their GameVox server's details.

## Installation
 
Two options:

 1.  Install the plugin through the ACP (if it ever gets added to the list *cough cough*)
 2.  Run `npm install nodebb-widget-sunsetbrew-sandbox` in the root directory of the NodeBB install

Don't forget to restart after installing the plugin. After installing, a new GameVox widget should appear next to the rest

## Configuration
All one must do is, in the NodeBB Admin area, go to Themes > Widgets, drag the widget wherever you want, and configure the options for the widget.  You will need to provide the GameVox authoization token.

## Get a GameVox token and server id

In GameVox

1. Go to Manager Server, record the **token**
2. Enter the following URL in the web browser and record the server id from it.

>  https://api.gamevox.com/v1/servers?access_token=`token`

## Features
* Show how many users are online in the Teamspeak server
* Can be themed easily

## Tips
* Enable scrolling in the widget container by setting style to something lile `max-height:400px;overflow-y:auto`.
* Add a link to you GameVox by adding it to the container.  Example below.
```html
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">
      <a href="http://my.gamevox.com/">{{title}}</a>
    </h3>
  </div>
  <div class="panel-body" style="max-height:400px;overflow-y:auto">{{body}}</div>
 </div>
```

## Suggestions? Encountered a Bug?
Please submit all feature requests and bugs with the [Issue tracker at Github.](https://github.com/sunsetbrew/nodebb-widget-sunsetbrew-sandbox/issues) Thanks
