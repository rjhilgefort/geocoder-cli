const geocodeFile = require('./geocode-file');

describe('geocodeFile', () => {
  test('respects interface defenition', () => {
    expect(
      geocodeFile('sometoken')('../data/few.csv')
    ).toBeUndefined();
  });
});
