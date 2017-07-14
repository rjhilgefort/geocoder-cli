// Given any number of functions, applies the data through the pipeline
// pipe :: ...Functions => a -> b
const pipe = (...funcs) => data =>
  funcs.reduce((acc, func) => func(acc), data);

module.exports = pipe;
