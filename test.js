require("./"); // inject stack-displayname

exports.test = function (test) {
	var f = function () {
		throw new Error();
	};

	f.displayName = "super puper function";

	try {
		f();
	} catch (e) {
		test.ok(e.stack.indexOf(f.displayName) >= 0);
	} finally {
		test.done();
	}
};