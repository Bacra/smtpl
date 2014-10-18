function newSmtpl(_afValue)
{
	var mySmtpl = new Smtpl();
	if (typeof _afValue === 'function')
	{
		mySmtpl.value = _afValue;
	}

	return function()
	{
		return mySmtpl.render.apply(mySmtpl, arguments);
	};
}

var main = newSmtpl();

main.Smtpl = Smtpl;
main.newSmtpl = newSmtpl;
