/* eslint max-statements-per-line: "off" */
const test = require('ava');
const hp = require('.');

test('base', t => {
    const obj = {};
    const p = hp(obj);
    p('x', () => obj.a, x => { obj.a = x; });
    t.deepEqual(obj, {});
    t.is(obj.x, undefined);
    obj.x = 1;
    t.is(obj.x, 1);
    t.deepEqual(obj, {a: 1});
});

test('descriptor', t => {
    const obj = {};
    const p = hp(obj);
    p('x', () => 1, x => {});
    const d = Reflect.getOwnPropertyDescriptor(obj, 'x');
    t.is(typeof d.get, 'function');
    t.is(typeof d.set, 'function');
    t.is(d.enumerable, false);
    t.is(d.configurable, false);
});
