// replace :: RegExp => String => String -> String
const replace = reg => subString => data => data.replace(reg, subString);

module.exports = replace;
