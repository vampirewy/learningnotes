# runtime-compiler 和 runtime-only 的区别

> runtime-only 只包含运行时代码，体积较小
>
> runtime-compiler 包含运行时代码和编译器，体积较大

两者在 main.js 里的区别：

```javascript
// 需要编译器
new Vue({
  template: "<div>{{ hi }}</div>",
});

// 不需要编译器 -- 无法使用 template
new Vue({
  render(h) {
    return h("div", this.hi);
  },
});
```

runtime-compiler 版本最终也是被编译成 render 函数，不过是在运行时进行编译，在编译过程中会造成性能损耗

runtime-only 版本可以搭配 webpack 的 vue-loader 将.vue 文件内部的模板预编译成 javascript，所以不需要在运行时编译了，所以代码的体积会比较轻量

[掘金 runtime-compiler 和 runtime-only 的区别](https://juejin.cn/post/6907848991761760263)

[Vue.js官网](https://cn.vuejs.org/v2/guide/installation.html#%E5%BC%80%E5%8F%91%E7%89%88%E6%9C%AC)
