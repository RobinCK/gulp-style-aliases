<div align="center">

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)[![Build Status](https://img.shields.io/travis/RobinCK/gulp-style-aliases.svg?style=flat-square)](https://travis-ci.org/RobinCK/gulp-style-aliases)[![Code Climate](https://img.shields.io/codeclimate/github/RobinCK/gulp-style-aliases.svg?style=flat-square)](https://codeclimate.com/github/RobinCK/gulp-style-aliases)[![npm](https://img.shields.io/npm/dt/gulp-style-aliases.svg?style=flat-square)](https://github.com/RobinCK/gulp-style-aliases)[![Dependencies](https://david-dm.org/robinck/gulp-style-aliases.svg?style=flat-square)](https://david-dm.org/robinck/gulp-style-aliases)[![devDependencies](https://david-dm.org/robinck/gulp-style-aliases/dev-status.svg?style=flat-square)](https://david-dm.org/robinck/gulp-style-aliases#info=devDependencies&view=table)[![NPM version](https://img.shields.io/npm/v/gulp-style-aliases.svg?style=flat-square)](https://www.npmjs.com/package/gulp-style-aliases)
</div>

# gulp-style-aliases

[Gulp](http://gulpjs.com/) plugin that lets you create custom aliases for CSS,less and SASS properties with an `@alias` rule.
Supports @import '...' and url('...').

## Install

```
$ npm install --save-dev gulp-style-aliases
```

## Usage

```js
const gulp = require('gulp');
const aliases = require('gulp-style-aliases');

var webPath = '.', outputPath = 'dest';

gulp.task('default', () =>
	gulp.src('src/*.{css|less|scss}')
		.pipe(aliases({
		    "@aliasName": "path/to/your/folder"
		}))
		.pipe(gulp.dest(outputPath))
);
```

A javascript file before compilation
```less
@import "@aliasName/css/user.less";

body {
  background: #9e9e9e;
}
```

will become:
```less
@import "path/to/your/folder/css/user.less";

body {
  background: #9e9e9e;
}
```
