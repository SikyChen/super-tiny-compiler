
const tokenizer = require('./src/tokenizer');
const parser = require('./src/parser');
const transformer = require('./src/transformer');
const codeGenerator = require('./src/codeGenerator');

function compiler() {

}

module.exports = {
  tokenizer,
  parser,
  transformer,
  codeGenerator,
  compiler,
}