/*
 * @Description: jsonp
 * @Author: wangyi
 * @Date: 2019-08-31 16:35:04
 * @LastEditTime: 2019-08-31 22:04:49
 * @LastEditors: Please set LastEditors
 */
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
//方法1
app.use(async ctx => {
  if (ctx.request.query.callback) {
    //前后端一起约定的回调方法
    let callback = ctx.request.query.callback;
    //直接返回字符串
    let jsonpStr = `${callback}(${JSON.stringify({ result: 123 })})`;
    ctx.body = jsonpStr;
  }
});
//方法2
router.get("/data", async ctx => {
  if (ctx.request.query) {
    let callback = ctx.request.query.callback;
    //直接返回字符串
    let jsonpStr = `${callback}(${JSON.stringify({ result: 123 })})`;
    ctx.response.body = jsonpStr;
  }
});
app.use(router.routes());
app.listen(3000, () => {
  console.log("服务在3000端口启动了");
});
