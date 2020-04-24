<!--
 * @Author: wangyi
 * @Date: 2020-04-24 10:23:06
 * @LastEditTime: 2020-04-24 11:26:10
 * @LastEditors: Please set LastEditors
 * @Description: init方法
 * @FilePath: /learningnotes/zepto/zepto init方法.md
 -->

# zepto 源码之 init 方法

```javascript
var document = window.document，
emptyArray = [],
slice = emptyArray.slice,
//校验选择器是否为单一选择器 a-z,A-Z,0-9,_,-
simpleSelectorRE = /^[\w-]*$/；
zepto.init = function (selector, context) {
  var dom;
  //如果只输入$()时，直接返回Z的实例
  if (!selector) return zepto.Z();
  //如果选择器类型为string,如 $('.div')形式
  else if (typeof selector == "string") {
    selector = selector.trim(); //过滤空格
    if (selector[0] == "<" && fragmentRE.test(selector))
      (dom = zepto.fragment(selector, RegExp.$1, context)), (selector = null);
    else if (context !== undefined) return $(context).find(selector);
    /** 选择器===string，同时context === undefined的情况,如$('.div'),$('#div')
     * document为全局ducument对象，--> zepto.qsa(document,'.div');
     */ else dom = zepto.qsa(document, selector);
  } else if (isFunction(selector)) return $(document).ready(selector);
  else if (zepto.isZ(selector)) return selector;
  else {
    if (isArray(selector)) dom = compact(selector);
    else if (isObject(selector)) (dom = [selector]), (selector = null);
    else if (fragmentRE.test(selector))
      (dom = zepto.fragment(selector.trim(), RegExp.$1, context)),
        (selector = null);
    else if (context !== undefined) return $(context).find(selector);
    else dom = zepto.qsa(document, selector);
  }
  return zepto.Z(dom, selector);
};
zepto.Z = function (dom, selector) {
  return new Z(dom, selector);
};
function Z(dom, selector) {
  var i,
    len = dom ? dom.length : 0;
  for (i = 0; i < len; i++) this[i] = dom[i];
  this.length = len; //dom元素的长度
  this.selector = selector || ""; //css选择器
}

```

```javascript
/** 返回dom元素数组
 * 这里的element变量为document
 * maybeID确定是否为id选择器，是为true,反之为false
 * maybeClass确定是否为类选择器，是为true,反之为false
 * nameOnly确定选择器名字，如果是id选择器或者类选择器，刚截取除标识符外的余下部分.div--> div,反之就是直接赋值
 * isSimple确定选择器是否单一，是为true,反之为false 如.div > p为false
 */
zepto.qsa = function (element, selector) {
  var found,
    maybeID = selector[0] == "#", //如果是id选择器为true,反之为false
    maybeClass = !maybeID && selector[0] == ".", //如果不是id选择器且是类选择器为true,反之为false
    nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
    isSimple = simpleSelectorRE.test(nameOnly);
  return element.getElementById && isSimple && maybeID
    ? (found = element.getElementById(nameOnly))
      ? [found]
      : []
    : //nodeType === 1 表示元素 === 9表示document节点 === 11表示文档片段
    element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11
    ? []
    : slice.call(
        isSimple && !maybeID && element.getElementsByClassName
          ? maybeClass
            ? element.getElementsByClassName(nameOnly)
            : element.getElementsByTagName(selector)
          : element.querySelectorAll(selector)
      );
};
```

上面的三目花了一点时间拆分:

1. 首先确认 document.getElementById 方法是否存在(兼容浏览器版本)且是单一选择器且是 ID 选择器，那么先将 found 赋值变成 div#div,再装入数组返回[div#div]；如果没有搜索到,则返回空数组;
2. 如果 document.getElementById 方法是否存在(兼容浏览器版本)且是单一选择器且是 ID 选择器存在一个为 false 的，则判断节点类型是否不等于 1 且不等于 9 且不等于 11，说明不合法，直接返回空数组；否则又是个三目；
3. slice 为变量，其实在这也可以修改成 Array.prototype.slice.call();
4. 第一个三目:如果是单一选择器且不是 ID 选择器且浏览器存在 document.getElementsByClassName 方法，如果是类选择器，则直接将类名装成数组返回[div.div],否则返 tag 数组[div,p],如果都不是，返回所有相符的类选择器[div.div,div.div1];
