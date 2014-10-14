
// RequireJS && SeaJS
if (typeof define === 'function')
{
    define(function()
    {
        return smtpl;
    });
}
// NodeJS
else if (typeof exports !== 'undefined')
{
    module.exports = smtpl;
}
else
{
    this.smtpl = smtpl;
}

})();