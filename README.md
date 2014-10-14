smtpl   [![Build Status](https://travis-ci.org/Bacra/smtpl.svg?branch=master)](https://travis-ci.org/Bacra/smtpl)
=====

Simple string tpl replace

## Use

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