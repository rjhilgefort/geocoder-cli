const isObject = require('./is-object');

describe('isObject', () => {
  test('true for objects', () => {
    const harness = (x) => {
      expect(isObject(x)).toBe(true);
    };
    harness({});
    harness({ foo: 'foo' });
  });

  test('false for non-objects', () => {
    const harness = (x) => {
      expect(isObject(x)).toBe(false);
    };
    harness('foo');
    harness(23);
    harness(true);
    harness(['foo', 'bar', 'baz']);
  });
});
