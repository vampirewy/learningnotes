# zepto 源码之 init 方法

```javascript
var document = window.document，
//判断是不是html标签
fragmentRE = /^\s*<(\w+|!)[^>]*>/,
//判断是否是单一的html标签 --> <p></p>
singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
containers = {
  'tr': document.createElement('tbody'),
  'tbody': table,
  'thead': table,
  'tfoot': table,
  'td': tableRow,
  'th': tableRow,
  '*': document.createElement('div')
},
methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset']
emptyArray = [],
slice = emptyArray.slice,
//校验选择器是否为单一选择器 a-z,A-Z,0-9,_,-
simpleSelectorRE = /^[\w-]*$/；
zepto.init = function (selector, context) {
  var dom;
  //如果只输入$()时，直接返回Z的实例--> 对应$()
  if (!selector) return zepto.Z();
  //如果选择器类型为string,如 $('.div')形式-->对应
  else if (typeof selector == "string") {
    selector = selector.trim(); //过滤空格
    //$('<p>124</p>'),如果是标签元素，返回dom集合-->$(htmlString)和$(htmlString, attributes)
    if (selector[0] == "<" && fragmentRE.test(selector))
      (dom = zepto.fragment(selector, RegExp.$1, context)), (selector = null);
    //$('.div',{text:'hello'})-->根据内容找选择器,find方法是在$.fn.find上，对应$(selector, [context])
    else if (context !== undefined) return $(context).find(selector);
    /** 选择器===string，同时context === undefined的情况,如$('.div'),$('#div')，对应$(selector, [context])
     * document为全局ducument对象，--> zepto.qsa(document,'.div');
     */ else dom = zepto.qsa(document, selector);
     //$(fucntion(){}) 直接调$.fn.ready方法，把$注入-->对应Zepto(function($){ ... })
  } else if (isFunction(selector)) return $(document).ready(selector);
  else if (zepto.isZ(selector)) return selector; //判断是否为他的实例，然后直接返回，对应$(<Zepto collection>)
  else {
    //如果以数组形式$([dom节点])传入，经compact函数处理返回数组集合，对应$(<DOM nodes>)
    //let span = document.createElement('span');$([span])
    if (isArray(selector)) dom = compact(selector);
    //如果是以对象形式$({dom节点})，let span = {a:document.createElement('span')} --> $(span.a)，对应$(<DOM nodes>)
    else if (isObject(selector)) (dom = [selector]), (selector = null);
    //下面的1~3步与上面重合， 不再多说
    else if (fragmentRE.test(selector))
      (dom = zepto.fragment(selector.trim(), RegExp.$1, context)),
        (selector = null);
    else if (context !== undefined) return $(context).find(selector);
    else dom = zepto.qsa(document, selector);
  }
  //最终调Z函数返回Z的实例
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
4. 第一个三目:如果是单一选择器且不是 ID 选择器且浏览器存在 document.getElementsByClassName 方法，如果是类选择器，则直接将类名装成数组返回[div.div],否则返 tag 数组[div,p],如果都不是，返回所有相符的选择器[div.div,div.div1,div#div];

```javascript
/**将html片段以dom集合形式返回
 * html为标签元素<p>124</p>，name为标签元素提取出来的那个值p,properties为{text:'hello'}
 */
zepto.fragment = function (html, name, properties) {
  var dom, nodes, container;
  //如果是单一标签元素<p></p>，直接创建该元素并返回
  if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));
  //如果dom不存在
  if (!dom) {
    //修复html元素，如果是<p />1234</p>则替换成<p></p>1212</p>
    if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
    //如果name标签名不存在，则赋值上标签名 <p>123</p> --> name = p;
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
    //如果标签名不在containers变量里对应的，则赋值成*,*的话是创建div元素
    if (!(name in containers)) name = "*";
    //container = 这个div元素
    container = containers[name];
    //装载 <div><p>124</p></div>
    container.innerHTML = "" + html;
    //返回子节点数组,如<div><p>124</p></div> --> [p]
    dom = $.each(slice.call(container.childNodes), function () {
      container.removeChild(this);
    });
  }
  //设置属性，如果properties不存在于methodAttributes中，直接调$.fn上的方法，否则调attr()
  if (isPlainObject(properties)) {
    nodes = $(dom);
    $.each(properties, function (key, value) {
      if (methodAttributes.indexOf(key) > -1) nodes[key](value);
      else nodes.attr(key, value);
    });
  }
  return dom;
};
```
