var oStrReg = /([()\\|$\^*?.+\[\]\{\}\/])/g;
var oTagRegs = {};

function Smtpl(_asWordReg)
{
	this._msWordReg = _asWordReg || '\\w+?';
	this._moTagRegs = oTagRegs[this._msWordReg] || (oTagRegs[this._msWordReg] = {});
}
var proto = Smtpl.prototype;

proto.render = function(_asStr, _aoParams, _asTag)
{
	if (!_asStr && !_aoParams) return '';

	_asTag = _asTag || '$';
	var _oSelf = this;

	if (!_asStr)
	{
		return function(_asStr)
		{
			return _oSelf._replace(_asStr, _aoParams, _asTag);
		};
	}
	else if (!_aoParams)
	{
		return function(_aoParams)
		{
			return _oSelf._replace(_asStr, _aoParams || {}, _asTag);
		};
	}

	return _oSelf._replace(_asStr, _aoParams, _asTag);
};

proto._replace = function(_asStr, _aoParams, _asTag)
{
	var _oSelf = this;
	return (''+_asStr).replace(_oSelf._generateReplaceRegExp(_asTag), function(_asTotal, _asName)
	{
		return _oSelf.value(_asName, _aoParams, _asTotal, _asTag, arguments);
	});
};

/**
 * return param value
 * @param  {String} _asName          param name
 * @param  {Object} _aoParams        params
 * @param  {String} _asTotal         match string
 * @param  {String} _asTag           match tag
 * @param  {*Array} _asReplaceArgs   replace arguments
 * @return {String}                  replace value
 */
proto.value = function(_asName, _aoParams, _asTotal, _asTag, _aoReplaceArgs)
{
	return _asName in _aoParams ? _aoParams[_asName] : '';
};


proto._generateReplaceRegExp = function(_asTag)
{
	var _oReg = this._moTagRegs[_asTag];

	if (!_oReg)
	{
		var _sTempTag = _asTag.replace(oStrReg, '\\$1');
		_oReg = new RegExp(_sTempTag+'('+this._msWordReg+')'+_sTempTag, 'g');
		this._moTagRegs[_asTag] = _oReg;
	}

	return _oReg;
};

