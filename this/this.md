<!--
 * @Description:about this
 * @Author: wangyi
 * @Date: 2019-09-13 08:57:58
 * @LastEditTime: 2019-09-13 20:26:18
 * @LastEditors: Please set LastEditors
 -->

# 关于 this 那些事

## this 是个老生长谈的东西，直接切入正题

### this 使用的 4 个场景，这里不包含箭头函数

1. 默认规则 **全局调用**，即独立函数调用。

   ```javascript
   var a = 2;
   function foo() {
     console.log(this.a); //2
   }
   foo();
   ```

   上面的 this 在非严格模式下，指向 window；在严格模式下，直接报错：`TypeError: Cannot read property 'a' of undefined`(在最新 Chrome 76 版本，不管`use strict`放在函数体外还是内)；当将`var a = 2`改成`let a = 2`时，
   结果为`undefined`;

2. **隐式绑定** -- 函数调用的位置是否有上下文对象，即**谁在调用这个函数**, 对象属性引用链中只有上一层或者最后一层在调用位置中起作用

   ```javascript
   var obj = { a: 1 };
   function foo() {
     console.log(this.a); //1
   }
   obj.foo = foo;
   obj.foo(); //这里的上下文对象是obj，即obj在调用函数
   ```

   ```javascript
   var obj = { a: 1, foo: foo };
   var obj1 = { a: 2, obj: obj };
   function foo() {
     console.log(this.a);
   }
   obj.foo(); //1
   obj1.obj.foo(); //1 对象属性引用链中只有上一层或者最后一层在调用位置中起作用，这里是obj在调用
   ```

   ```javascript
   var obj = { a: 1, foo: foo };
   function foo() {
     console.log(this.a);
   }
   var obj1 = obj.foo; // obj1 = function foo(){console.log(this.a)};
   obj1(); //undefined
   ```

   上面的代码变量`obj1`实际等于`function foo(){console.log(this.a)};`，`obj1`为全局变量，当被调用时，`this`被指向了 window，而在 window 中没有 a 这个属性，所以是`undefined`

3. **显式绑定** -- **call,apply,bind**

   1. 上面隐式绑定是将函数引用在了对象的属性上，但有一定的局限性，不灵活。**无论是直接在对象是定义还是先定义再添加为引用属性，严格来说它都不属性这个对象。**从上面的隐式绑定最后一段代码可以看出来;
   2. **call,apply,bind**都是显式的绑定`this`，不用向隐式绑定一样定义在对象属性上，方便，在调用的时候绑定`this`;
   3. **call、apply**的区别是第二个参数 apply 为数组形式`[arg1,arg2...]`，call 为 `arg1,arg2...` 形式;
   4. **bind**会返回一个新函数，并不会直接执行，第二个参数为`arg1,arg2...`;

   ```javascript
   function foo(x) {
     console.log(this.a + x);
   }
   var obj = {
     a: 1
   };
   foo.call(obj, 1); //2
   ```

   ```javascript
   function foo(x, y) {
     console.log(this.a + x + y);
   }
   var obj = { a: 1 };
   var obj1 = function() {
     return foo.apply(obj, arguments);
   };
   var obj2 = obj1(1, 2); //4
   ```

   ```javascript
   function foo() {
     console.log(this.a);
   }
   var obj = { a: 1 };
   var obj1 = foo.bind(obj);
   obj1(); //1
   ```

4. **new 的 this 绑定**

   ```javascript
   function Person() {
     this.a = 10;
     console.log(this.a);
   }
   var obj1 = new Person(); //10
   ```

   **注意：用 new 来调用函数，会发生下面 4 步：**

   1. 创建一个全新的对象；
   2. this 会绑定到这个新对象上；
   3. 这个新对象会被执行`prototype`连接；
   4. **如果函数没有返回其他对象，new 的表达式中的函数调用会自动返回这个新对象；**

   ```javascript
   function Person() {
     this.b = 10;
     var obj = { a: 2 };
     return obj;
   }
   var a = new Person();
   console.log(a); //{a:2} 返回对象
   console.log(a.b); //undefined
   ```

### 4 个规则的优先级

`new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定`

### 小结一下

1. 默认绑定，非严格模式下，指向 window；例：`function foo(){...}; foo();`
2. 隐式绑定，即将函数直接定义到对象上或通过引用定义到对象属性上；例：`var obj = {a:2,foo:foo}; obj.foo();`
3. 显示绑定，通过 call、apply、bind
4. new 绑定，如果函数里返回对象，那就不返回新对象，直接返回对象
