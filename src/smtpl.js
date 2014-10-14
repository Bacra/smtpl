var oTagRegs = {};
var oStrReg = /([()\\|$\^*?.+\[\]\{\}\/])/g;

function smtpl(_asStr, _aoParams, _asTag)
{
	if (!_asStr && !_aoParams) return '';

	var _oReg = replaceRegExp(_asTag || '$');

	if (!_asStr)
	{
		return function(_asStr)
		{
			return render(_asStr, _aoParams, _oReg);
		};
	}
	else if (!_aoParams)
	{
		return function(_aoParams)
		{
			return render(_asStr, _aoParams || {}, _oReg);
		};
	}

	return render(_asStr, _aoParams, _oReg);
}

function render(_asStr, _aoParams, _aoReg)
{
	return (''+_asStr).replace(_aoReg, function(_asTotal, _asName)
		{
			return _aoParams[_asName] || _asTotal;
		});
}

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
}
