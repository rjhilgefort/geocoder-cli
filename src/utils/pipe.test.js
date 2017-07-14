const pipe = require('./pipe');
const identity = require('./identity');

describe('pipe', () => {
  test('passes data through functions', () => {
    const expected = 'bar';
    expect(
      pipe(
        identity,
        identity,
        () => expected,
        identity,
      )('foo')
    ).toEqual(expected);
  });
});
