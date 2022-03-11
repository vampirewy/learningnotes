<!--
 * @Author: your name
 * @Date: 2020-05-18 15:55:27
 * @LastEditTime: 2022-03-11 10:45:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learningnotes/整理/Event Loop.md
-->

### JavaScript Event Loop

1. 首先 JavaScript 是单线程，因为运行在浏览器中，它需要操作 DOM 等，如果设计成多线程，会造成问题
2. 因为它是单线程，分为同步任务和异步任务。同步任务为主线程上排队的任务，异步任务为不进入主线程，进入任务列队，等主线程任务都结束了，通知任务列队，进入主线程执行任务。一旦主线程上的同步任务执行完毕，去任务列队里将异步任务压入执行栈，执行，一直反复,即 Event Loop(事件循环)![事件循环](event-loop.png)
3. 主线程运行时，产生堆和栈，栈中代码调用各种 API,它们在任务列队中加入各种事件。当栈中代码执行完毕，主线程会去任务列队中依次执行相对应的回调
4. 异步任务又可以分为宏观任务(macrotask)和微观任务(microtask)

### 宏观任务(macrotask)--宿主发起

主要有鼠标事件、键盘事件、ajax、定时器等，宿主相关

### 微观任务(microtask)--JS 引擎发起

主要是 promise

```javascript
console.log("start");
setTimeout(() => {
  console.log("c");
}, 0);
console.log("end");
//打印顺序 start--> end ---> c
```

```javascript
console.log("start");
setTimeout(() => {
  console.log("a");
}, 0);
let r = new Promise((resolve) => {
  console.log("b");
  resolve();
});
r.then(() => {
  console.log("c");
});
console.log("end");
//打印结果 start--> b --> end --> c --> a
```

```javascript
let r = new Promise(function (resolve, reject) {
  console.log("a");
  resolve();
});
r.then(() => console.log("c"));
console.log("b");
//打印结果 a--> b --> c
```

```javascript
let r = new Promise(function (resolve, reject) {
  console.log("a");
  resolve();
});
setTimeout(() => console.log("d"), 0);
r.then(() => console.log("c"));
console.log("b");
//打印结果 a--> b--> c--> d
```

```javascript
setTimeout(() => console.log("d"), 0);
var r = new Promise(function (resolve, reject) {
  resolve();
});
r.then(() => {
  var begin = Date.now();
  while (Date.now() - begin < 1000);
  console.log("c1");
  new Promise(function (resolve, reject) {
    resolve();
  }).then(() => console.log("c2"));
});
//打印结果 c1--> c2--> d
```
