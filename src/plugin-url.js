main.url = newSmtpl(function(_asName, _aoParams, _asTotal, _asTag, _aoReplaceArgs)
{
	var _sVal = _aoParams[_aoReplaceArgs[3]];

	if (_sVal)
	{
		return _aoReplaceArgs[2] == '#' ? _sVal : encodeURIComponent(_sVal);
	}

	return '';
}, '(#?)(\\w+?)');

