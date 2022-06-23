/**
 * 代码生成器
 * Personal
 * @param { Object } ast 转换后的新 AST 语法树
 * @returns { String } 生成的新代码
 */
function codeGenerator(ast) {

  let code = '';

  function process(node) {

    if (node.type === 'ExpressionStatement') {
      process(node.expression);
      code += ';';
    }

    if (node.type === 'CallExpression') {
      code += process(node.callee) + '(';
      node.arguments.forEach((child, index) => {
        process(child);
        if (index < node.arguments.length - 1) {
          code += ', ';
        }
      });
      code += ')';
    }

    if (node.type === 'Identifier') {
      code += node.name;
    }

    if (node.type === 'NumberLiteral') {
      code += node.value;
    }

    if (node.type === 'StringLiteral') {
      code += `"node.value"`;
    }

    throw new TypeError(node.type);
  }

  ast.body.forEach(process);

  return code;
}

/**
 * 代码生成器
 * Original
 * @param { Object } node 转换后的新 AST 语法树（根节点）
 * @returns { String } 生成的新代码
 */
function codeGenerator(node) {

  switch (node.type) {
    
    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');

    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) +
        ';'
      );
  
    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator)
          .join(', ') +
        ')'
      );
  
    case 'Identifier':
      return node.name;
  
    case 'NumberLiteral':
      return node.value;
  
    case 'StringLiteral':
      return node.value;
  
    default:
      throw new TypeError(node.type);
  }
}

module.exports = codeGenerator;
