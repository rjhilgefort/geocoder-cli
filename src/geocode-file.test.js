const { isArray } = require('./lib');
const geocodeFile = require('./geocode-file');

describe('geocodeFile', () => {
  test('respects interface defenition', () => {
    expect(
      isArray(
        geocodeFile('sometoken')('path-to-file.csv')
      )
    ).toBe(true);
  });
});
