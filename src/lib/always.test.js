const always = require('./always.js');

describe('always', () => {
  test('returns passed in value', () => {
    const harness = (x) => {
      expect(always(x)).toEqual(x);
    };
    harness({ foo: 'foo' });
    harness(['foo', 'bar']);
    harness([2]);
    harness('foo');
    harness(false);
  });
});
