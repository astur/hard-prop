# hard-prop

Easy way to create properties with getter and/or setter.

## Install

```bash
npm install hard-prop
```

## Usage

```js
var prop = require('hard-prop')(object);

prop(name, {get: getter, set: setter});
prop(name, {get: getter});
prop(name, {set: setter});
prop(name, getter, setter);
prop(name, setter, getter);
prop(name, getter);
prop(name, setter);
```

Creates function, that defines properties for given object.

First parameter `name` must be string.

Second parameter can be object with properties `get` and/or `set` for getter and/or setter. In other way one or more functions can be given as parameters. Function with no arguments will be getter, and function with arguments will be setter (only first argument counts).

If only getter given - property will be read-only (error will thrown on write). If only setter given - property will be write-only (error will thrown on read). At least one getter or setter must be given.


## License

MIT