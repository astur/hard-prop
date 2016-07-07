module.exports = function(object){

    var f = function(){
        var args = Array.prototype.slice.call(arguments);

        var name = args.shift();

        if (typeof name !== 'string') {throw new Error('name must be a string');}

        var ad = {
            get: function(){throw new Error('unable to get property: ' + name);},
            set: function(v){throw new Error('unable to set property: ' + name);}
        };

        if (args.length === 0) {throw new Error('need getter or setter function');}

        var f = args.shift();

        if (typeof f === 'object') {
            ad.get = f.get || ad.get;
            ad.set = f.set || ad.set;
            if (args.length > 0) {throw new Error('too many arguments');}
        }

        while (typeof f === 'function') {
            ad[f.length === 0 ? 'get' : 'set'] = f;
            f = args.shift();
        }

        if (typeof f !== 'undefined') {throw new Error('bad argument');}

        Object.defineProperty(this, name, ad);
    };

    return f.bind(object);

};