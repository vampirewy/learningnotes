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
//这些都是字面量定义
let obj = {}; // obj.__proto__ --> Object.prototype
let array = []; // array.__proto__ --> Array.prototype --> Object.prototype
let fun = function () {}; //fun.__proto__ --> Function.prototype --> Object.prototype
obj instanceof Object; // true
array instanceof Array; //true
array instanceof Object; //true
fun instanceof Function; //true
fun instanceof Object; //true
```

1. instanceof 其实是跟原型链有关,左值是否为右值的实例，如果改变右值的状态(从数组改为对象),那它的 instanceof Array 就会为 false，但是 instanceof 有一个缺点无法判断到底属于哪个实例
2. 使用 Object.prototype.toString 可以判断对象属于哪个基本类型,返回[object class],class 为对象皆有的私有属性，值分别有:Number,String,Function,Object,Array,比 instanceof 更准确;

## Object.getPrototypeOf

```javascript
let array = [];
Object.getPrototypeOf(array) === Array.prototype; //true
Object.getPrototypeOf(array) === Object.prototype; //false
```
