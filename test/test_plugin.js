var smtpl = require('../dist/smtpl-plugin-debug.js');

exports.blank = function(test)
{
	test.equal(smtpl.blank('$value$$value2$', {value: 1}), '1', 'no value');
	test.done();
};

