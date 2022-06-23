
const tokenizer = require('./src/tokenizer');
const parser = require('./src/parser');
const transformer = require('./src/transformer');
const codeGenerator = require('./src/codeGenerator');

function compiler(input) {
  let tokens = tokenizer(input);
  let ast = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  return output;
}

module.exports = {
  tokenizer,
  parser,
  transformer,
  codeGenerator,
  compiler,
}
