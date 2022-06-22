// 
// const input = '(add 2 (subtract 4 2))';
// 
// const tokens = [
//   { type: 'paren', value: '(' },
//   { type: 'name', value: 'add' },
//   { type: 'number', value: '2' },
//   { type: 'paren', value: '(' },
//   { type: 'name', value: 'subtract' },
//   { type: 'number', value: '4' },
//   { type: 'number', value: '2' },
//   { type: 'paren', value: ')' },
//   { type: 'paren', value: ')' }
// ];
// 

/**
 * 词法分析器
 * 
 * 将输入的 input 字符串，解析成词法单元数组 tokens
 * 
 * @param { String } input 源码字符串
 * @returns { Array } 词法单元数组
 */
function tokenizer(input) {
  let cur = 0;
  let tokens = [];

  while(cur < input.length) {
    let char = input[cur];

    // 跳过空格
    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      cur++;
      continue;
    }

    // 解析括号
    if (char === '(' || char === ')') {
      tokens.push({
        type: 'paren',
        value: char,
      });

      cur++;
      continue;
    }

    // 解析数字
    let NUMBER = /[0-9]/
    if (NUMBER.test(char)) {
      let value = '';

      while(NUMBER.test(char)) {
        value += char;
        char = input[++cur];
      }

      tokens.push({
        type: 'number',
        value,
      });

      continue;
    }

    // 解析字符串
    if (char === '"' || char === "'") {
      let quotes = char;
      let value = '';

      // 跳过左引号
      char = input[++cur];

      while(char !== quotes) {
        value += char;
        char = input[++cur];
      }

      // 跳过右引号
      char = input[++cur]

      tokens.push({
        type: 'string',
        value,
      })

      continue;
    }

    // 解析变量名
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';

      while(LETTERS.test(char)) {
        value += char;
        char = input[++cur];
      }

      tokens.push({
        type: 'name',
        value,
      })

      continue;
    }

    // 解析到非法输入时报错
    throw new TypeError('Wrong character: ' + char);

  }

  return tokens;
}

module.exports = tokenizer;
