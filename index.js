module.exports = function(object){

    var f = function(){
        var args = Array.prototype.slice.call(arguments);

        var name = args.shift();

        var ad = {
            get: function(){throw new Error('error');},
            set: function(v){throw new Error('error');}
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