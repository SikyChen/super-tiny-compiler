// 
// const tokens = [
//   { type: 'paren',  value: '('        },
//   { type: 'name',   value: 'add'      },
//   { type: 'number', value: '2'        },
//   { type: 'paren',  value: '('        },
//   { type: 'name',   value: 'subtract' },
//   { type: 'number', value: '4'        },
//   { type: 'number', value: '2'        },
//   { type: 'paren',  value: ')'        },
//   { type: 'paren',  value: ')'        }
// ];
// 
// const ast = {
//   type: 'Program',
//   body: [{
//     type: 'CallExpression',
//     name: 'add',
//     params: [{
//       type: 'NumberLiteral',
//       value: '2'
//     }, {
//       type: 'CallExpression',
//       name: 'subtract',
//       params: [{
//         type: 'NumberLiteral',
//         value: '4'
//       }, {
//         type: 'NumberLiteral',
//         value: '2'
//       }]
//     }]
//   }]
// };
// 

/**
 * 语法分析器，将词法单元数组转化为AST语法树
 * @param { Array } tokens 词法单元数组
 * @returns { Object }
 */
function parser(tokens) {
  let cur = 0;

  // 递归的遍历tokens，将词法单元转成 lisp 的 ast 节点
  function walk() {
    let token = tokens[cur];

    // 当走到左括号
    // 在 lisp 的语法中，左括号的后面，跟的一定是函数名，函数名后面由空格跟着的是参数
    if (token.type === 'paren' && token.value === '(') {

      // 得到函数名token
      token = tokens[++cur];

      // 创建一个函数的节点
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      }

      // 跳过方法名，走到第一个参数处
      token = tokens[++cur];

      // 当未走到右括号时，说明一直都是当前函数的参数
      while(token.type !== 'paren' || token.value !== ')') {
        // 该参数可能是数字、字符串、也可能是另一个作为参数的函数
        // 由递归的 walk 去处理后得到了节点，push 到当前函数的参数数组中
        node.params.push(walk());

        // walk 中的每一步都会 cur++ ，所以这里直接去 cur 位置的 token，就已经是下一个了
        token = tokens[cur];
      }

      // 跳过右括号
      cur++;

      // 将当前节点返回
      return node;
    }

    // 当走到数字
    if (token.type === 'number') {
      cur++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      }
    }

    // 当走到字符串
    if (token.type === 'string') {
      cur++;
      return {
        type: 'StringLiteral',
        value: token.value
      }
    }

    // 当无法识别
    throw new TypeError('Unkonw type: ' + token.type);
  }

  const ast = {
    type: 'Program',
    body: [],
  }

  while(cur < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

module.exports = parser;
