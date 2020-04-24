<!--
 * @Author: wangyi
 * @Date: 2020-04-24 16:14:12
 * @LastEditTime: 2020-04-24 17:58:13
 * @LastEditors: Please set LastEditors
 * @Description: init里涉及的工具函数
 * @FilePath: /learningnotes/zepto/zepto init里的工具函数.md
 -->

# 工具函数

1. 一开局\$.each 方法

```javascript
var class2type = {};
$.each(
  "Boolean Number String Function Array Date RegExp Object Error".split(" "),
  function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  }
);
```

1. 上面先将'Boolean Number String Function Array Date RegExp Object Error'转换成数组['Boolean','Number',....]；
2. 将数组和回调传入\$.each 方法的第 1 分支，

```javascript
$.each = function (elements, callback) {
  var i, key;
  if (likeArray(elements)) {
    for (i = 0; i < elements.length; i++) {
      if (callback.call(elements[i], i, elements[i]) === false) return elements;
    }
  } else {
    for (key in elements)
      if (callback.call(elements[key], key, elements[key]) === false)
        return elements;
  }
  return elements;
};
```
