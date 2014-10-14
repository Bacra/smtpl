
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