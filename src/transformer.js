
/**
 * 转换器
 * 将 lisp 的 AST 语法树 转换为 JavaScript 的 AST 语法树
 * @param { Object } ast lisp的AST语法树
 */
function transformer(ast) {

  let newAst = {
    type: 'Program',
    body: [],
  }

  // 因为只能够遍历 ast 的节点，所以需要把 newAst.body 的指针绑在 ast 的节点上，
  // 当遍历 ast 的节点时，通过给 _context 赋值来更新 newAst 的 body
  ast._context = newAst.body;

  traverser(ast, {

    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        }

        node._context = expression.arguments;

        // 如果一个方法的父节点不是方法，那么它再 JavaScript 里面就是个语句了
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          }
        }

        parent._context.push(expression);
      },
    },

    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },
  })

  return newAst;
}

/**
 * 遍历器
 * 会递归的遍历语法树中的每个节点，并调用 visitor 访问者对象中对应节点的方法，来达到处理节点的目的
 * @param { Object } ast lisp的AST语法树
 * @param { Object } visitor 访问者对象，挂载处理所有节点的方法
 */
function traverser(ast, visitor) {

  function traverseNode(node, parent) {

    let methods = visitor[node.type];

    // 进入节点时，对节点的处理
    // 先序
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case 'Program':
        node.body.forEach(child => traverseNode(child, node));
        break;

      case 'CallExpression':
        node.params.forEach(child => traverseNode(child, node));
        break;

      case 'NumberLiteral':
      case 'StringLiteral':
        break;
    
      default:
        throw new TypeError(node.type);
    }

    // 离开节点时，对接点的二次处理
    // 后序
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}

module.exports = transformer;
