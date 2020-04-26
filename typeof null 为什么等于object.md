# typeof null 为什么会等于 object

```javascript
typeof null === "object"; //true
```

1. 在 javascript 最初实现中，js 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0 由于 null 代表的是空指针(大多数平台下值为 0x00)，因些 null 的类型标签为 0，typeof null 返回'object'
2. js 的数据类型在底层都是以二进制的形式表示，二进制的前 3 位都是 0 会被判定为 object,而 null 的二进制是 0，所以会有这个结果
