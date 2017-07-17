const geocodeFile = require('./geocode-file');

describe('geocodeFile', () => {
  test('respects interface defenition', () => {
    expect(
      geocodeFile('../data/few.csv')
    ).toBeDefined();
  });
});
