module.exports = function(object){
    const f = function(...args){
        const name = args.shift();

        if(typeof name !== 'string') throw new Error('name must be a string');

        const ad = {
            get(){ throw new Error(`unable to get property: ${name}`); },
            set(v){ throw new Error(`unable to set property: ${name}`); },
        };

        if(args.length === 0) throw new Error('need getter or setter function');

        let f = args.shift();

        if(typeof f === 'object'){
            ad.get = f.get || ad.get;
            ad.set = f.set || ad.set;
            if(args.length > 0) throw new Error('too many arguments');
        }

        while(typeof f === 'function'){
            ad[f.length === 0 ? 'get' : 'set'] = f;
            f = args.shift();
        }

        if(typeof f !== 'undefined') throw new Error('bad argument');

        Object.defineProperty(this, name, ad);
    };

    return f.bind(object);
};
