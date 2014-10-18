main.url = newSmtpl(function(_asName, _aoParams, _asTotal, _asTag, _aoReplaceArgs)
{
	var _sName = _aoReplaceArgs[3];

	if (_sName in _aoParams)
	{
		var _sVal = ''+_aoParams[_sName];
		return _aoReplaceArgs[2] == '#' ? _sVal : encodeURIComponent(_sVal);
	}

	return '';

}, '(#?)(\\w+?)');

