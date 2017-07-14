const identity = require('./identity.js');

describe('identity', () => {
  test('returns passed in value', () => {
    const harness = (x) => {
      expect(identity(x)).toEqual(x);
    };
    harness({ foo: 'foo' });
    harness(['foo', 'bar']);
    harness([2]);
    harness('foo');
    harness(false);
  });
});
