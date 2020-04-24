<!--
 * @Author: wangyi
 * @Date: 2020-04-24 09:46:37
 * @LastEditTime: 2020-04-24 10:18:51
 * @LastEditors: Please set LastEditors
 * @Description: typeof和instanceof的区别
 * @FilePath: /learningnotes/typeofAndInstanceof/typeof和instanceof的区别.md
 -->

# typeof 和 instanceof 的区别

## typeof

1. typeof 是用来判断数据类型，比如下面

```javascipt
  let num = 1;
  let string = '124';
  let isBoolean = false;
  let isFunction = function(){};
  let isObj = {};
  let isArray = [];
  let isNull = null;
  typeof num; //number
  typeof string; //string
  typeof isBoolean; // boolean
  typeof isFunction; //function
  typeof isObj; //object
  typeof isArray; //object
  typeof isNull; //object
  typeof undefined //undefined
```

从上面可以看出 typeof 没有办法区分对象、数组、null

## instanceof

1. 看如下代码:

```javascript
let obj = {};
let array = [];
let fun = function () {};
obj instanceof Object; // true
array instanceof Array; //true
array instanceof Object; //true
fun instanceof Function; //true
fun instanceof Object; //true
```

instanceof 其实是跟原型链有关,constructor.prototype 指向的是哪个，左值是否为右值的实例，如果改变右值的状态(从数组改为对象),那它的 instanceof Array 就会为 false
