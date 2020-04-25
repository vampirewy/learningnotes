<!--
 * @Author: wangyi
 * @Date: 2020-04-24 16:14:12
 * @LastEditTime: 2020-04-25 14:55:00
 * @LastEditors: Please set LastEditors
 * @Description: init里涉及的工具函数
 * @FilePath: /learningnotes/zepto/zepto init里的工具函数.md
 -->

# zepto.init 相关工具函数

一开局\$.each 方法

```javascript
/**
 * [object Boolean] = 'boolean',
 * [object Number] = 'number',
 * [object String] = 'string',
 * [object Function] = 'function',
 * [object Array] = 'array',
 * [onject Date] = 'date',
 * [object RegExp] = 'regexp',
 * [object Object] = 'object',
 * [object Error] = 'error'
 */
var class2type = {};
$.each(
  "Boolean Number String Function Array Date RegExp Object Error".split(" "),
  function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  }
);
```

1. 上面先将'Boolean Number String Function Array Date RegExp Object Error'转换成数组['Boolean','Number',....];
2. 将数组和回调传入\$.each 方法的第 1 分支，特别注意 if (callback.call(elements[i], i, elements[i]) === false)这个判断语句，它会先执行 callback.call()这个函数，然后再判断是否符合这个条件语句;
3. 执行完 callback.call()时，class2type 的值 = {[object Boolean]:'boolean',....};

```javascript
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
```

zepto.fragment 方法中有两处地方使用到了\$.each 方法

```javascript
var containers = {
  'tr': document.createElement('tbody'),
  'thead': table,
  'tbody': table,
  'td': tableRow,
  'tfoot': table,
  '*': document.createElement('div')
  'th': tableRow,
},
emptyArray = [],
slice = emptyArray.slice;
//container是被赋值的，如创建div元素，那么container.childNodes，即为包裹在div元素里的子节点--><p>123</p><span>456</span>
dom = $.each(slice.call(container.childNodes), function () {
  container.removeChild(this);
});
```

1. 先执行 slice.call 转换成数组，然后执行\$.each 方法;
2. 进行后 each 方法后，进行第 1 分支，然后执行 callback.call(elements[i])方法,elements[i]等于 childNodes 里的值，然后 container.removeChild(container.childNodes[i])进行判断，最终返回 dom 数组集合;

```javascript
var methodAttributes = [
  "val",
  "css",
  "html",
  "text",
  "data",
  "width",
  "height",
  "offset",
];
//properties == {text:'hello'}
$.each(properties, function (key, value) {
  //如果methodAttributes中不存在'hello'属性,nodes['text']('hello')-->调$.fn.text('hello')方法-->返回textContent ==> 'hello'
  if (methodAttributes.indexOf(key) > -1) nodes[key](value);
  //如果是methodAttributes中的属性，直接添加属性
  else nodes.attr(key, value);
});
```

1. 上面进行\$.each 方法分支 2 中,遍历整个对象，将该对象的 key,value 传入，如果在 methodAttributes 数组中找不到值，直接调用\$.fn 上的方法，nodes\['text']('hello');
2. 如果找到直接调用\$.fn.attr 方法;

zepto.fragment 中还有一个 isPlainObject 函数

```javascript
if (isPlainObject(properties)){...}
function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}
function isWindow(obj) {
  return obj != null && obj == obj.window
}
function isObject(obj) {
  return type(obj) == "object"
}
function type(obj) {
  return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
}
```

1. 上面 isPlainObject 函数先判断是否为 object 且不为 window 对象且原型 == Object.prototype,返回 boolean 值;
2. type 函数判断这个 object 是什么类型 class2type 里的那些值:number,string,error,boolean,function,object 等;

```javascript
//判断是否为function
function isFunction(value) {
  return type(value) == "function";
}
```

```javascript
//为了判断这个对象是否为zepto.Z的实例
zepto.isZ = function (object) {
  return object instanceof zepto.Z;
};
```
