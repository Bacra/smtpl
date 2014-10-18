smtpl   [![Build Status](https://travis-ci.org/Bacra/smtpl.svg?branch=master)](https://travis-ci.org/Bacra/smtpl)
=====

Simple string tpl replace


## Installation

use in nodejs:

	$ npm install smtpl

use in browser：

	$ bower install smtpl


## Usage

#### render directly

	smtpl('$value$', {value: 1})  // out: 1
	smtpl('%value%', {value: 1}, '%')   // out: 1
	smtpl('$value$$p.child$', {value: 1, p: {child: 2}})   // out: '1$p.child$'


#### generate render function

	var nostr_render = smtpl(null, {value: 1, value2:2});
	nostr_render('$value$')   // out: 1
	nostr_render('$value2$')  // out: 2

	var noparam_render = smtpl('$value$$value2$');
	noparam_render({value:1})    // out: 1
	noparam_render({value2:2})   // out: 2


### custom value method

	var render = smtpl.newSmtpl(function(_asName, _aoParams)
	{
		return _aoParams[_asName] || _asName;
	});

	render('$value$$value2$', {value: 1})    // out: 1value2
	
	// support child value
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

	child_render('$p.child$', {p:{child: 1}})      // out: 1


## Render Plugin

### render url

	smtpl.url('http://www.qq.com/$#cgi$?t=$#t$&s=$s$&key=$key$&blank=',
		{
			cgi	: 'index',
			t	: 'sim&v=<',
			key	: 'key&d=>'
		});
	// out: http://www.qq.com/index?t=sim&v=<&s=&key=key%26d%3D%3E&blank=


