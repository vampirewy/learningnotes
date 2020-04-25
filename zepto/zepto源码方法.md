<!--
 * @Author: wangyi
 * @Date: 2020-04-25 15:02:45
 * @LastEditTime: 2020-04-25 15:43:14
 * @LastEditors: Please set LastEditors
 * @Description: 方法
 * @FilePath: /learningnotes/zepto/zepto源码方法.md
 -->

# zepto 源码相关方法

## type 函数，返回数据类型(zepto init 工具函数里有提及)

```javascript
var class2type = {};
$.each(
  "Boolean Number String Function Array Date RegExp Object Error".split(" "),
  function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  }
);
$.each = function (elements, callback) {
  var i, key;
  if (likeArray(elements)) {
    //第1分支
    for (i = 0; i < elements.length; i++) {
      if (callback.call(elements[i], i, elements[i]) === false) return elements;
    }
  } else {
    //第2分支
    for (key in elements)
      if (callback.call(elements[key], key, elements[key]) === false)
        return elements;
  }
  return elements;
};
function type(obj) {
  return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
}
```

## isFunction 和 isObject 函数，返回 boolean 类型(zepto init 工具函数里有提及)

```javascript
function isFunction(value) {
  return type(value) == "function";
}
function isObject(obj) {
  return type(obj) == "object";
}
```

## isWindow 函数，是否为 window 对象，返回 boolean 值

```javascript
//是否是对自身的引用
function isWindow(obj) {
  return obj != null && obj == obj.window;
}
```

## isDocument 函数，判断是否为 document 对象，返回 boolean

```javascript
function isDocument(obj) {
  return obj != null && obj.nodeType == obj.DOCUMENT_NODE; //值为9表示document对象
}
```

## compact 函数，返回没有空值的数组

```javascript
var emptyArray = [],
  filter = emptyArray.filter;
function compact(array) {
  return filter.call(array, function (item) {
    return item != null;
  });
}
```

## isPlainObject 函数，判断是否为对象(zepto init 工具函数里有提及)

```javascript
function isPlainObject(obj) {
  return (
    isObject(obj) &&
    !isWindow(obj) &&
    Object.getPrototypeOf(obj) == Object.prototype
  );
}
```

## isArray，判断是否为数组

```javascript
var isArray =
  Array.isArray ||
  function (object) {
    return object instanceof Array;
  };
```

## likeArray 函数,判断入参是否为数组，返回 boolean

```javascript
//入参可以为{text:'hello'}/ ['Boolean','Number',...]
//对象没有length属性
function likeArray(obj) {
  var length = !!obj && "length" in obj && obj.length,
    type = $.type(obj);
  return (
    "function" != type &&
    !isWindow(obj) &&
    ("array" == type ||
      length === 0 ||
      (typeof length == "number" && length > 0 && length - 1 in obj))
  );
}
```

1. 如果为对象，length = false;如果是数组,length = 数组长度;
2. 判断入参的数据类型，赋值给 type;
3. 短路逻辑，返回 false 或者 true
