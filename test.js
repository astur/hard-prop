const test = require('ava');
const hp = require('.');

test('base', t => {
    const obj = {};
    const p = hp(obj);
    p(
        'x',
        () => obj.a,
        x => { obj.a = x; }
    );
    t.deepEqual(obj, {});
    t.is(obj.x, undefined);
    obj.x = 1;
    t.is(obj.x, 1);
    t.deepEqual(obj, {a: 1});
    t.pass();
});
