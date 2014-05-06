var assert = require("assert");

require("./"); // inject stack-displayname

var f = function () {
	throw new Error();
};

f.displayName = "super puper function";

assert.throws(f, function (e) {
	return e.stack.indexOf(f.displayName) >= 0;
});

console.log("Test passed.");