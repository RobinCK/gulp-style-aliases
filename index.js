'use strict';

var through = require('through2');
var cssAliasses = require('css-aliases');

module.exports = function(aliases){
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            return;
        }

        if (file.isStream()){
            return this.emit('error', PluginError('gulp-style-aliases', 'Streaming not supported'));
        }

        file.contents = new Buffer(cssAliasses(file.contents.toString(), file.path, aliases));
        cb(null, file);
    });
};
