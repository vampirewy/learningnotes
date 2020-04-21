<!--
 * @Author: wangyi
 * @Date: 2020-04-21 16:19:27
 * @LastEditTime: 2020-04-21 17:00:32
 * @LastEditors: Please set LastEditors
 * @Description: Zepto源码
 * @FilePath: /learningnotes/zepto/zepto.md
 -->

# Zepto(version:1.2)源码起步结构

```javascript
var Zepto = (function(){
  var $,zepto = {};
  //Z函数私有函数，不向外暴露
  function Z(dom,selector){
    var i, len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) this[i] = dom[i];
    this.length = len;
    this.selector = selector || "";
  };
  /*
  * 1.instanceof作用是验证等式左侧是否为右侧的实例，这里涉及到原型链
  * 2.这里是为了判断object是否为zepto.Z的实例,其实这边可以直接return object instanceof Z
  * 3.这个传进来的object.__proto__其实应该为Z.prototype,为了验证object.__proto__ === zepto.Z.prototype,将zepto.Z.prototype = $.fn
  */
  zepto.isZ = function(object){
    return object instanceof zepto.Z;
  };
  zepto.Z = function(dom,selector){
    return new Z(dom,selector);
  };
  zepto.init = function(selector, context){
    var dom;
    //省略中间部分
    return zepto.Z(dom,selector);
  }
  //$是个函数
  $ = function (selector, context) {
    return zepto.init(selector, context);
  };
  //$.fn为$函数的属性，挂载了很多方法
  $.fn = {
    constructor:zepto.Z,
    concat:function(){......},
    map:function(){......}
  };
  /*
  * 1.原本Z.prototype指向其constructor，即Z.prototype.constructor === Z;
  * 2.现将Z.prototype重写为$.fn是为了使用$.fn上定义的方法，同时Z.prototype.constructor = $.fn.constructor = zepto.Z
  */
  zepto.Z.prototype = Z.prototype = $.fn;
  //返回$给全局Zepto
  return $;
})();
//这个是为了将变量 Zepto 赋值给全局$和 Zepto
window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto);
```
