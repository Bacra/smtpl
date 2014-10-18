var smtpl = require('../dist/smtpl-debug.js');

exports.baseTest = function(test)
{
	test.equal(smtpl('$value$', {value: 1}), '1', 'base');
	test.equal(smtpl('%value%', {value: 1}, '%'), '1', 'tag: %');
	test.equal(smtpl('$value$$value2$', {value: 1}), '1$value2$', 'no value');
	test.equal(smtpl('$value$value2$', {value: 1}), '1value2$', 'no open tag');
	test.equal(smtpl('$value$$p.child$', {value: 1, p: {child: 2}}), '1$p.child$', 'child value');

	test.done();
};

exports.generateFuncTest = {
	nostr: function(test)
	{
		var nostr = smtpl(null, {value: 1, value2:2});
		test.equal(nostr('$value$'), '1', 'nostr:1');
		test.equal(nostr('$value2$'), '2', 'nostr:2');
		test.equal(nostr(), ''+undefined, 'nostr:undefined');
		test.equal(nostr(null), ''+null, 'nostr:null');

		test.done();
	},
	noparam: function(test)
	{
		var noparam = smtpl('$value$$value2$');

		test.equal(noparam({value:1}), '1$value2$', 'noparam:1');
		test.equal(noparam({value2:2}), '$value$2', 'noparam:2');
		test.equal(noparam({value:1, value2:2}), '12', 'noparam:3');
		test.equal(noparam(undefined), '$value$$value2$', 'noparam:undefined');
		test.equal(noparam(null), '$value$$value2$', 'noparam:null');

		test.done();
	}
}

