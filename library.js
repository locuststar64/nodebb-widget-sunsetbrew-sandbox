(function(module, realModule) {

    "use strict";

    var fs = require("fs");
    var path = require("path");
    var http = require("https");
    var handlebars = require('handlebars');
    var translator = require.main.require('./public/src/modules/translator');

    var errorTemplate = handlebars.compile("" + fs.readFileSync("./public/templates/errors.tpl"));
    var nousersTemplate = handlebars.compile("" + fs.readFileSync("./public/templates/nousers.tpl"));
    var listTemplate = handlebars.compile("" + fs.readFileSync("./public/templates/list.tpl"));

    module.renderGameVoxUsersWidget = function(widget, callback) {
        var token = widget.data.token;
        var serverid = widget.data.serverid;
        var cb = callback;

        if (!token) {
            translator.translate('[[gamevoxusers:notoken]]', function(translated) {
                cb(null, errorTemplate({
                    message: translated
                }));
            });
            return;
        }

        if (!serverid) {
            translator.translate('[[gamevoxusers:noserverid]]', function(translated) {
                cb(null, errorTemplate({
                    message: translated
                }));
            });
            return;
        }

        // Options to be used by request
        var options = {
            host: 'api.gamevox.com',
            port: 443,
            path: '/v1/servers/' + serverid + '?access_token=' + token
        };

        var requestCallback = function(response) {

            // Continuously update stream with data
            var body = '';
            var online = [];

            response.on('data', function(data) {
                body += data;
            });

            response.on('end', function() {
                var data = JSON.parse(body);

                if (data.error) {
                    translator.translate('[[gamevoxusers:requestfailed]]', function(translated) {
                        cb(null, errorTemplate({
                            message: translated + ' ' + data.message
                        }));
                    });
                    return;
                }
                data.online_users.forEach(member => {
                        online.push({
                            name: (member.display_name && member.display_name != null) ? member.display_name :  member.username
                        });
                });

                if (online.length == 0) {
                    translator.translate('[[gamevoxusers:nousers]]', function(translated) {
                        cb(null, nousersTemplate({
                            message: translated
                        }));
                    });
                    return;
                }

                cb(null, listTemplate({
                    users: online
                }));

            });
        };

        // Make a request to the server
        var req = http.request(options, requestCallback);
        req.on('error', (e) => {
            translator.translate('[[gamevoxusers:requesterror]]', function(translated) {
                cb(null, errorTemplate({
                    message: translated + ' ' + e.message
                }));
            });
        });
        req.end();
    };

    module.defineWidget = function(widgets, callback) {
        translator.translate('[[gamevoxusers:name]]', function(name) {
            translator.translate('[[gamevoxusers:description]]', function(description) {
                widgets.push({
                    widget: "gamevoxusers",
                    name: name,
                    description: description,
                    content: fs.readFileSync(path.resolve(__dirname, './public/templates/widget.tpl')),
                });
                callback(null, widgets);
            });
        });
    };

}(module.exports, module));
