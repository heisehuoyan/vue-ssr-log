const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();
const fs = require("fs"); // 读取文件
const path = require("path"); //处理路径
//vue-server-renderer 将前端代码渲染成字符串
const Vue = require("vue");
const VueSeverRenderer = require("vue-server-renderer"); // vm转成一个字符串给浏览器渲染，类似于模版编译
const static = require("koa-static");

// const vm = new Vue({
//   data() {
//     return {
//       name: "zf",
//     };
//   },
//   template: "<div>{{name}}</div>",
// });

// const template = fs.readFileSync(
//   path.resolve(__dirname, "template.html"),
//   "utf8"
// ); //同步的读取文件
console.log(9);
//dist/sever.bundle.js 生成一个实例
const severBundle = fs.readFileSync(
  path.resolve(__dirname, "dist/sever.bundle.js"),
  "utf8"
);
const template = fs.readFileSync(
  path.resolve(__dirname, "dist/sever.html"),
  "utf8"
);
const render = VueSeverRenderer.createBundleRenderer(severBundle, {
  template,
});

router.get("/", async (ctx) => {
  //createRenderer创建一个渲染器
  // 当用户访问/路径的时候需要将渲染的字符串插到模版中
  //createBundleRenderer打包后的渲染器,把打包后的代码插入到模版（template）中
  //ctx.body = await render.renderToString(); //生成字符串 ///有个bug，不能用promise，否则样式不生效
  ctx.body = new Promise((resolve, reject) => {
    render.renderToString((err, html) => {
      // 如果想让css生效，只能用回调的方式
      if (err) reject(err);
      resolve(html);
    });
  });
});
// 当客户端发送请求的时候会先去dist目录上查找
app.use(static(path.resolve(__dirname, "dist")));
/// 讲路由注册到应用上
app.use(router.routes());
app.listen(3009, function () {
  console.log("llll");
});

// 服务端每次更改后都需要重新启动服务
//npm install nodemon -g   当代码发生变化的时候自动重启
// nodemon sever.js   使用

//真正开发时候，我们还是希望用.vue文件
