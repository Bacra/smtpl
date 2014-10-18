var smtpl = require('../dist/smtpl-debug.js');

exports.child_value = function(test)
{
	var child_render = smtpl.newSmtpl(function(_asName, _aoParams)
	{
		var _oNames = _asName.split('.');
		var _oParams = _aoParams;
		for(var i = 0, len = _oNames.length; i < len; i++)
		{
			if (_oNames[i] in _oParams)
			{
				_oParams = _oParams[_oNames[i]];
			}
			else
			{
				return '';
			}
		}

		return _oParams;

	}, '[\\w.]+?');


	test.equal(child_render('$p.child$', {p:{child: 1}}), '1', 'child value');

	test.done();
};

