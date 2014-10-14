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
	noparam_render({value:1})    // out: 1$value2$
	noparam_render({value2:2})   // out: '$value$2


### render blank when value is undefined

	smtpl.blank('$value$$value2$', {value: 1})  // out: 1


### custom value method

	var render = smtpl.newSmtpl(function(_asName, _aoParams, _asTotal)
	{
		return _aoParams[_asName] || _asName;
	});

	render('$value$$value2$', {value: 1})    // out: 1value2

