/*
 * @Description: 非简单请求
 * @Author: wangyi
 * @Date: 2019-09-01 15:00:33
 * @LastEditTime: 2019-09-02 10:15:04
 * @LastEditors: Please set LastEditors
 */
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
app.use(async (ctx, next) => {
  //允许所有域名通过
  ctx.set("Access-Control-Allow-Origin", "*");
  //允许通过的请求方式
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  //能够接受的请求头信息，我们这里只是举例
  ctx.set("Access-Control-Allow-Headers", "content-type");
  //可选字段，表示本次预检请求的有效期，单位为秒；在此期间，不用发出另一条预检请求
  //如果这项没有生效，要查看一下浏览器里是否设置了Disable cache
  ctx.set("Access-Control-Max-Age", "2");
  await next();
});
router.post("/simplePost", async ctx => {
  ctx.response.body = { data: 123, code: 200 };
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("服务器在3000端口启动了");
});
