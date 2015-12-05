var smtpl = require('../dist/smtpl-debug.js');

exports.baseTest = function(test)
{
	test.equal(smtpl('$value$', {value: 1}), '1', 'base');
	test.equal(smtpl.render('$value$', {value: 1}), '1', 'base width render func');
	test.equal(smtpl('%value%', {value: 1}, '%'), '1', 'tag: %');
	test.equal(smtpl('$value$$value2$', {value: 1}), '1', 'no value');
	test.equal(smtpl('$value$value2$', {value: 1}), '1value2$', 'no open tag');
	test.equal(smtpl('$value$$p.child$', {value: 1, p: {child: 2}}), '1$p.child$', 'child value');
	test.equal(typeof smtpl('', {}), 'string', 'string output string');

	test.done();
};

exports.generateFuncTest = {
	nostr: function(test)
	{
		var nostr = smtpl(null, {value: 1, value2:2});
		test.equal(nostr('$value$'), '1', 'nostr:1');
		test.equal(nostr('$value2$'), '2', 'nostr:2');
		test.equal(nostr(), 'undefined', 'nostr:undefined');
		test.equal(nostr(null), 'null', 'nostr:null');

		test.done();
	},
	noparam: function(test)
	{
		var noparam = smtpl('$value$$value2$');

		test.equal(noparam({value:1}), '1', 'noparam:1');
		test.equal(noparam({value2:2}), '2', 'noparam:2');
		test.equal(noparam({value:1, value2:2}), '12', 'noparam:3');
		test.equal(noparam(undefined), '', 'noparam:undefined');
		test.equal(noparam(null), '', 'noparam:null');

		test.done();
	}
}


exports.newSmtpl = function(test)
{
	var render = smtpl.newSmtpl(function(_asName, _aoParams, _asTotal)
	{
		return _aoParams[_asName] || _asName;
	});

	test.equal(render('$value$$value2$', {value: 1}), '1value2', 'no value');

	var _oTplArgs = ['$p.child$', {p:{child:'child'}}];
	var _nRenderGetRunTimes2 = 0;
	var render2 = smtpl.newSmtpl(function(_asName)
		{
			_nRenderGetRunTimes2++;
			return _asName;	
		})
		.render.apply(null, _oTplArgs);
	test.equal(_nRenderGetRunTimes2, 0, 'no support child value');

	var _nRenderGetRunTimes3 = 0;
	smtpl.newSmtpl(function(_asName)
		{
			_nRenderGetRunTimes3++;
			return _asName;	
		}, '[\\w.]+?')
		.render.apply(null, _oTplArgs);
	test.equal(_nRenderGetRunTimes3, 1, 'support child value');

	test.done();
};
