# stack-displayName [![Build Status](https://travis-ci.org/RReverser/stack-displayname.svg?branch=master)](https://travis-ci.org/RReverser/stack-displayname)

> Show custom function names in error stack traces

## Firstly there was idea...

[Chromium](https://code.google.com/p/chromium/issues/detail?id=17356), [Firefox](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName) and [Safari](https://bugs.webkit.org/show_bug.cgi?id=25171) agreed and implemented ability to set custom string as function name via non-standard property `displayName` on function instance.

You can see those custom names in debugger stack and so easier track source of error in long traces of anonymous functions.

Compare informativeness of error stack traces without and with `displayName` on example of [jBinary](https://github.com/jDataView/jBinary):

![Before vs After](https://cloud.githubusercontent.com/assets/557590/2842369/ca53bed6-d073-11e3-85d9-34c18a53a5e3.png)

### And it's usage was simple

```javascript
var f = function () {
  throw new Error();
};

f.displayName = "super puper function";

f(); // enjoy descriptive stack trace!
```

### But not in Node.js

Since this property was implemented not in JS core but on level of developer tools, in Node.js you still get something like:
![before](https://cloud.githubusercontent.com/assets/557590/2879612/77316904-d46c-11e3-806f-4d2ae1d442df.png)
which isn't too descriptive about what, where and why happened.

This drop-in library stringifies error stack traces in V8 both in browser and Node.js, simulating standard formatting but respecting `displayName` property, so when error occurs, you get stylish stack trace with custom function names (in case of jBinary those are type descriptors and field names being processed):

![after](https://cloud.githubusercontent.com/assets/557590/2879614/7936866c-d46c-11e3-817d-9fd2898a8e51.png)

### More crazy ideas to use this for?

You can even implement own micro BDD testing framework (example taken from http://mochajs.org/#bdd):

```javascript
require('stack-displayname');
var assert = require('assert');

var describe = it = function (name, callback) {
  callback.displayName = name;
  callback();
};

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when not present', function () {
      assert.equal([1,2,3].indexOf(4), -2); // wrong!
    });
  });
});
```

![bdd error](https://cloud.githubusercontent.com/assets/557590/2881238/cb00f0ea-d480-11e3-9d3a-63a3cd56bb53.png)

And it's pretty easy to compose stack trace capture with other transformations.

For example, in order to filter out non-`displayName` functions:

```javascript
require('stack-displayname');

var prepareStackTrace = Error.prepareStackTrace;

Error.prepareStackTrace = function (err, stack) {
	return prepareStackTrace(err, stack.filter(function (item) {
		return item.fun.displayName;
	}));
};

// ... your code ... //
```

![bdd error only](https://cloud.githubusercontent.com/assets/557590/5085573/e03b60a4-6f1b-11e4-8a0a-70a6dc75c414.png)

## Installation - boring as usual

### In Node.js

Simply install with npm as:

```bash
npm install stack-displayname
```

and require it:

```javascript
require('stack-displayname');
```

### In Browser

This script might be useful only in Chromium, where DevTools already respect `displayName`, but in the case you want to have custom function names in `err.stack` property of any `Error` instances (that's not natively supported), it's possible - just include script on the page via regular tag:

```html
<script src="stack-displayname/displayName.js"></script>
```

Non-supported browsers will just ignore it and show stack traces as usual.

## License

Copyright 2014 Ingvar Stepanyan

Copyright 2006-2011, the V8 project authors. All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
      copyright notice, this list of conditions and the following
      disclaimer in the documentation and/or other materials provided
      with the distribution.
    * Neither the name of Google Inc. nor the names of its
      contributors may be used to endorse or promote products derived
      from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

