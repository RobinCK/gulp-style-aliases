'use strict';

var path = require('path');
var rework = require('rework');
var url = require('rework-plugin-url');
var reworkCss = require('css');
var through = require('through2');

module.exports = function(aliases){
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            return;
        }

        if (file.isStream()){
            return this.emit('error', PluginError('gulp-style-aliases', 'Streaming not supported'));
        }

        var adjusted = adjust(file);
        file.contents = new Buffer(adjusted);
        cb(null, file);
    });

    function adjust(file){
        var css = file.contents.toString();
        var obj = reworkCss.parse(css);

        for (var style in obj.stylesheet.rules) {
            if (obj.stylesheet.rules[style].type === 'import') {
                obj.stylesheet.rules[style].import = '"' + resolveAlias(obj.stylesheet.rules[style].import.toString().replace (/(^")|("$)/g, ''), file.path) + '"';
            }
        }

        css = reworkCss.stringify(obj);

        return rework(css)
            .use(url(function(url) {
                return resolveAlias(url, file.path);
            }))
            .toString()
        ;
    }

    function resolveAlias(url, currentPath) {
        if(!/^@.*/.test(url)) {
            return url;
        }

        for (var aliasName in aliases) {
            var regExp = new RegExp('^' + aliasName + '(.*)')

            if (regExp.test(url)) {
                return path.relative(path.dirname(currentPath), path.resolve(aliases[aliasName] + url.replace(regExp, '$1')));
            }
        }

        return url;
    }
};
