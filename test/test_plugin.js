var smtpl = require('../dist/smtpl-plugin-debug.js');

exports.url = function(test)
{
	test.equal(smtpl.url('http://www.qq.com/$#cgi$?t=$#t$&s=$s$&key=$key$&blank=$blank$',
		{
			cgi	: 'index',
			t	: 'sim&v=<',
			key	: 'key&d=>'
		}),
		'http://www.qq.com/index?t=sim&v=<&s=&key=key%26d%3D%3E&blank=', 'generate url');

	test.equal(smtpl.url('$value$', {value:1}), '1', 'param is number');
	test.equal(smtpl.url('$value$', {value:0}), '0', 'param is 0');
	test.equal(smtpl.url('$value$', {value:null}), 'null', 'param is null');

	test.done();
};


