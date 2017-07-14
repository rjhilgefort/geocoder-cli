/**
 * TODO: Doesn't handle the following
 * - `isObject({ constructor: 'foo' })`
 * - `isObject(this)`
 */
// isObject :: a -> Boolean
const isObject = x =>
  typeof x === 'object' && x.constructor === Object;

module.exports = isObject;
