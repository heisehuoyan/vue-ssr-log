const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();
const fs = require("fs"); // 读取文件
const path = require("path"); //处理路径
//vue-server-renderer 将前端代码渲染成字符串
const Vue = require("vue");
const VueSeverRenderer = require("vue-server-renderer"); // vm转成一个字符串给浏览器渲染，类似于模版编译

const vm = new Vue({
  data() {
    return {
      name: "zf",
    };
  },
  template: "<div>{{name}}</div>",
});
const template = fs.readFileSync(
  path.resolve(__dirname, "template.html"),
  "utf8"
); //同步的读取文件
router.get("/", async (ctx) => {
  //createRenderer创建一个渲染器
  // 当用户访问/路径的时候需要将渲染的字符串插到模版中
  ctx.body = await VueSeverRenderer.createRenderer({ template }).renderToString(
    vm
  );
});

/// 讲路由注册到应用上
app.use(router.routes());
app.listen(3001, function () {
  console.log("llll");
});

// 服务端每次更改后都需要重新启动服务
//npm install nodemon -g   当代码发生变化的时候自动重启
// nodemon sever.js   使用

//真正开发时候，我们还是希望用.vue文件
