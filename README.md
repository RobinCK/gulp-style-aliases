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
		    "@aliasName": 'path/to/your/folder'
		}))
		.pipe(gulp.dest(outputPath))
);
```

###### Input
```less
@import "@aliasName/css/user.less";

body {
  background: #9e9e9e;
}
```

###### Output
```less
@import "path/to/your/folder";

body {
  background: #9e9e9e;
}
```
