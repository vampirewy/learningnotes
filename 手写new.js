/*
 * @Author: your name
 * @Date: 2020-05-18 15:56:16
 * @LastEditTime: 2020-05-18 16:05:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learningnotes/手写new.js
 */
/** new的4个步骤
 * 1. 创建新对象 var obj = {}
 * 2. 绑定该对象的__proto__ === 原型(xxx.prototype)
 * 3. 绑定this
 * 4. 返回创建的新对象 retur obj; 如果有return 对象，则直接返回这个对象
 */
function createNew(obj, ...args) {
  if (typeof obj !== "function") return new Error("对不起");
  let newObj = Object.create(obj.prototype);
  let result = obj.call(newObj, ...args);
  return result === "object" ? result : newObj;
}
function Father(name, age) {
  this.name = name;
  this.age = age;
}
Father.prototype.say = function () {
  //hi, mick,I'm 22 years old
  console.log(`hi, ${this.name},I'm ${this.age} years old`);
};
let son = createNew(Father, "mick", 22);
son.say();
