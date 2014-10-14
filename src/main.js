function newSmtpl(_afValue)
{
	var mySmtpl = new Smtpl();
	if (typeof _afValue == 'function')
	{
		mySmtpl.value = _afValue;
	}

	return function()
	{
		return mySmtpl.render.apply(mySmtpl, arguments);
	};
}

var main = newSmtpl();

main.blank = newSmtpl(function(_asName, _aoParams, _asTotal)
{
	return _aoParams[_asName] || '';
});

main.Smtpl = Smtpl;
main.newSmtpl = newSmtpl;