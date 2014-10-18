/*!smtpl - Template Engine | https://github.com/Bacra/stpl*/
;(function () {
var oTagRegs = {};
var oStrReg = /([()\\|$\^*?.+\[\]\{\}\/])/g;

function Smtpl(){}
var proto = Smtpl.prototype;

proto.render = function(_asStr, _aoParams, _asTag)
{
	if (!_asStr && !_aoParams) return '';

	var _oReg = replaceRegExp(_asTag || '$');
	var _oSelf = this;

	if (!_asStr)
	{
		return function(_asStr)
		{
			return _oSelf._replace(_asStr, _aoParams, _oReg);
		};
	}
	else if (!_aoParams)
	{
		return function(_aoParams)
		{
			return _oSelf._replace(_asStr, _aoParams || {}, _oReg);
		};
	}

	return _oSelf._replace(_asStr, _aoParams, _oReg);
};

proto._replace = function(_asStr, _aoParams, _aoReg)
{
	var _oSelf = this;
	return (''+_asStr).replace(_aoReg, function(_asTotal, _asName)
	{
		return _oSelf.value(_asName, _aoParams, _asTotal);
	});
};

/**
 * return param value
 * @param  {String} _asName   param name
 * @param  {Object} _aoParams params
 * @param  {String} _asTotal  match string
 * @return {String}           replace value
 */
proto.value = function(_asName, _aoParams, _asTotal)
{
	return _aoParams[_asName] || _asTotal;
};


function replaceRegExp(_asTag)
{
	var _oReg = oTagRegs[_asTag];

	if (!_oReg)
	{
		var _sTempTag = _asTag.replace(oStrReg, '\\$1');
		_oReg = new RegExp(_sTempTag+'(\\w+)'+_sTempTag, 'g');
		oTagRegs[_asTag] = _oReg;
	}

	return _oReg;
}function newSmtpl(_afValue)
{
	var mySmtpl = new Smtpl();
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

// RequireJS && SeaJS
if (typeof define === 'function')
{
    define(function()
    {
        return main;
    });
}
// NodeJS
else if (typeof exports !== 'undefined')
{
    module.exports = main;
}
else
{
    this.smtpl = main;
}

})();