/*
 * @Author: your name
 * @Date: 2020-05-18 16:07:33
 * @LastEditTime: 2020-05-18 16:18:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learningnotes/手写instanceof.js
 */
function createInstanOf(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
createInstanOf(function a() {}, Object);
createInstanOf(Object, Object);

console.log("Object", Object instanceof Object); //true
console.log("Function", Function instanceof Function); //true
Object.constructor.prototype === Function.prototype; //true
Function.constructor.prototype === Function.prototype; //true
Array.constructor.prototype === Function.prototype; //true
