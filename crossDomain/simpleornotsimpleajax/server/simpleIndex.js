/*
 * @Description: 简单请求
 * @Author: wangyi
 * @Date: 2019-09-01 09:51:40
 * @LastEditTime: 2019-09-02 09:55:01
 * @LastEditors: Please set LastEditors
 */
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
app.use(async (ctx, next) => {
  // 设置传送cookie时，Access-Control-Allow-Origin不能设置为*，必须设置域名
  ctx.set("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  ctx.set("Access-Control-Allow-Credentials", "true");
  next();
});
router.get("/simpleGet", async ctx => {
  console.log(ctx.header.cookie);
  ctx.response.body = { data: 123, code: 200 };
});
app.use(router.routes());
app.listen(3000, () => {
  console.log("服务器在3000端口启动了");
});
