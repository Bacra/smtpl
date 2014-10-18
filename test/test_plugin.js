var smtpl = require('../dist/smtpl-plugin-debug.js');

exports.blank = function(test)
{
	test.equal(smtpl.blank('$value$$value2$', {value: 1}), '1', 'no value');
	test.done();
};

exports.newSmtpl = function(test)
{
	var render = smtpl.newSmtpl(function(_asName, _aoParams, _asTotal)
	{
		return _aoParams[_asName] || _asName;
	});

	test.equal(render('$value$$value2$', {value: 1}), '1value2', 'no value');
	test.done();
};

