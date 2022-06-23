# The Super Tiny Compiler

学习 [The Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

编译器的四个步骤：

|-| 阶段名  | 方法名         | 产物 | 
|-|-|-|-|
|1| 词法分析 | tokenizer     | 词法单元数组 tokens |
|2| 语法分析 | parser        | 源代码 AST 语法树   |
|3| 转换    | transformer   | 新代码 AST 语法树   |
|4| 代码生成 | codeGenerator | 新代码             |


😈