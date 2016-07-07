module.exports = function(object){

    var f = function(){
        var args = Array.prototype.slice.call(arguments);

        var name = args.shift();

        var ad = {
            get: function(){throw new Error('unable to get property: ' + name);},
            set: function(v){throw new Error('unable to set property: ' + name);}
        };

        var f = args.shift();

        if (typeof f === 'object') {
            ad.get = f.get || ad.get;
            ad.set = f.set || ad.set;
        }

        while (typeof f === 'function') {
            ad[f.length === 0 ? 'get' : 'set'] = f;
            f = args.shift();
        }

        Object.defineProperty(this, name, ad);
    };

    return f.bind(object);

};