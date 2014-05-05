# stack-displayName [![Build Status](https://travis-ci.org/RReverser/stack-displayname.svg?branch=master)](https://travis-ci.org/RReverser/stack-displayname)

> Show custom function names in error stack traces

## Description

[Safari](https://bugs.webkit.org/show_bug.cgi?id=25171), [Chromium](https://code.google.com/p/chromium/issues/detail?id=17356) and [Firefox](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName) implemented ability to set custom string as function name via non-standard property `displayName`.

You can see those custom names in debugger stack and so easier track source of error in long traces of anonymous functions.

Compare stack traces of error before and after using this ability in [jBinary](https://github.com/jDataView/jBinary):

![Before vs After](https://cloud.githubusercontent.com/assets/557590/2842369/ca53bed6-d073-11e3-85d9-34c18a53a5e3.png)

However, since this property was implemented on level of developer tools and not JS core itself, in Node.js for analogical code you still get:

![before](https://cloud.githubusercontent.com/assets/557590/2878366/1265b79c-d45c-11e3-824e-fa58e5e09959.png)

This drop-in library stringifies error stack traces in V8 both in browser and Node.js that simulates core formatting but respects `displayName` property, so when error occurs, you get stylish stack trace:

![after](https://cloud.githubusercontent.com/assets/557590/2878369/1db3f2f8-d45c-11e3-8aaa-2204104e2408.png)

## Installation and usage

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

This script would work only in Chromium, where DevTools already respect `displayName`, but in the case you want to have custom function names in `err.stack` property of any `Error` instances (which is not natively supported), that's possible via simple script tag:

```html
<script src="stack-displayname/displayName.js"></script>
```

Other browsers will just ignore instructions and show stack traces as usual.

### Usage

```javascript
var f = function () {
  throw new Error();
};

f.displayName = "super puper function";

f(); // enjoy descriptive stack trace!
```

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

