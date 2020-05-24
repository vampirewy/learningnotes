<!--
 * @Author: your name
 * @Date: 2020-05-24 08:43:39
 * @LastEditTime: 2020-05-24 10:09:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learningnotes/整理/AST及JS编译原理.md
-->

### AST 抽象语法树(abstract syntax tree)

1. 概念：AST 是源代码语法结构的一种抽象表示，以树状形式表现的语法结构，树上每一个节点都表示源代码中的一种结构。与之相对的，是具体语法树。
2. 作用：
   - 编辑器的错误提示、代码格式化、代码高亮、代码自动补全
   - eslint 对代码的检查
   - webpack 通过 babel 转换成 javascript 语法

### AST 如何生成

在执行一段代码前，会先将字符组成的字符串通过词法分析分解成词法单元即 token，然后将 token 通过语法分析转成换 AST，最后将 AST 转换成机器码执行

解析过程主要分为两个部分：

1. 分词/词法分析：将字符分解成词法单元(token)
2. 解析/语法分析：将词法单元流(数组)转换成一个由元素逐级嵌套所组成的代码程序语法的结构树(AST),简单点讲就是分析单元之间的关系

常用的 JS 语法分析器有 esprima、traceur、acorn、shift 等

### 词法分析

> 词法分析，简单点说就是调用 next()方法，一个一个字母的来读取字符，然后与定义好的 JavaScript 关键字符做比较，生成对应的 Token。Token 是一个不可分割的最小单无。
> 词法分析器里，每个关键字是一个 Token，每一个标识符是一个 Token，每一个操作符是一个 Token，每一个标点也是一个 Token。过滤掉注释、空白字符(换行符、空格、制表符等)
> 最终整个代码被分割成一个 tokens 数组

```javascript
//代码会被程序分解成如下的词法单元(token)：var、a、=、2、;
var a = 2;
```

### 语法分析

> 语法分析会将词法单元数组转换成抽象语法树结构。同时验证语法，语法如果有错的话，抛出语法错误

```javascript
//AST如下方json
const fn = (x) => x * x;
```

```json
{
  "type": "Program",
  "start": 0,
  "end": 25,
  "body": [
    {
      "type": "VariableDeclaration", //第1步：变量声明
      "start": 0,
      "end": 20,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 19,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 8,
            "name": "fn" //第2步变量名为fn
          },
          "init": {
            "type": "ArrowFunctionExpression", //第4步箭头函数表达式
            "start": 11,
            "end": 19,
            "id": null,
            "expression": true, //第4步表达式
            "generator": false,
            "async": false,
            //第3步参数名：x
            "params": [
              {
                "type": "Identifier",
                "start": 12,
                "end": 13,
                "name": "x" //第3步参数名：x
              }
            ],
            //第5步x
            "body": {
              "type": "Identifier",
              "start": 18,
              "end": 19,
              "name": "x"
            }
          }
        }
      ],
      "kind": "const" //第1步变量声明，类型为const
    }
  ],
  "sourceType": "module"
}
```

上面这 AST 的意思是一个类型为 const fn 的变量指向一个箭头函数表达式，参数为 x，函数体也为 x

更多信息:

1. [关于 AST 节点介绍](http://www.goyth.com/2018/12/23/AST/#Expressions)
2. [在线转 AST](https://astexplorer.net/)
