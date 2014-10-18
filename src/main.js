function newSmtpl(_afValue, _asWordReg)
{
	var mySmtpl = new Smtpl(_asWordReg);
	if (typeof _afValue === 'function')
	{
		mySmtpl.value = _afValue;
	}

	var _render = function()
	{
		return mySmtpl.render.apply(mySmtpl, arguments);
	};
	_render.render = _render;
	return _render; 
}

var main = newSmtpl();

main.Smtpl = Smtpl;
main.newSmtpl = newSmtpl;
