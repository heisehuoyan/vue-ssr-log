// const Koa = require("koa");
// const Router = require("koa-router");

// const app = new Koa();
// const router = new Router();
// const fs = require("fs"); // 读取文件
// const path = require("path"); //处理路径
// //vue-server-renderer 将前端代码渲染成字符串
// const Vue = require("vue");
// const VueSeverRenderer = require("vue-server-renderer"); // vm转成一个字符串给浏览器渲染，类似于模版编译
// const static = require("koa-static");

// // const vm = new Vue({
// //   data() {
// //     return {
// //       name: "zf",
// //     };
// //   },
// //   template: "<div>{{name}}</div>",
// // });

// // const template = fs.readFileSync(
// //   path.resolve(__dirname, "template.html"),
// //   "utf8"
// // ); //同步的读取文件
// //dist/sever.bundle.js 生成一个实例
// const severBundle = fs.readFileSync(
//   path.resolve(__dirname, "dist/sever.bundle.js"),
//   "utf8"
// );
// const template = fs.readFileSync(
//   path.resolve(__dirname, "dist/sever.html"),
//   "utf8"
// );
// const render = VueSeverRenderer.createBundleRenderer(severBundle, {
//   template,
// });
// router.get("/", async (ctx) => {
//   //createRenderer创建一个渲染器
//   // 当用户访问/路径的时候需要将渲染的字符串插到模版中
//   //createBundleRenderer打包后的渲染器,把打包后的代码插入到模版（template）中
//   // ctx.body = await render.renderToString(); //生成字符串 ///有个bug，不能用promise，否则样式不生效

//   ctx.body = await new Promise((resolve, reject) => {
//     render.renderToString((err, html) => {
//       // 如果想让css生效，只能用回调的方式
//       if (err) {
//         reject(err);
//       } else {
//         resolve(html);
//       }
//     });
//   });
// });

// // 当客户端发送请求的时候会先去dist目录上查找
// app.use(static(path.resolve(__dirname, "dist")));
// /// 让路由注册到应用上
// app.use(router.routes());
// app.listen(3001);

// // 服务端每次更改后都需要重新启动服务
// //npm install nodemon -g   当代码发生变化的时候自动重启
// // nodemon sever.js   使用

// //真正开发时候，我们还是希望用.vue文件
const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const path = require("path");
const app = new Koa();
const router = new Router();
// const VueServerRenderer = require("vue-server-renderer");
const { createBundleRenderer } = require("vue-server-renderer");
const fs = require("fs");
// 服务端打包的结果
const serverBundle = fs.readFileSync("./dist/sever.bundle.js", "utf8");
const template = fs.readFileSync("./dist/sever.html", "utf8");
const render = createBundleRenderer(serverBundle, {
  template,
});

// router.get("/", async (ctx) => {
//   ctx.body = await new Promise((resolve, reject) => {
//     render.renderToString((err, html) => {
//       // 必须写成回调函数的方式否则样式不生效
//       resolve(html);
//     });
//   });
// });
router.get("/", async (ctx) => {
  // 此时打包之后的结果全是字符串，字符串没有任何的事件功能 所以js逻辑不生效(打包之后vue-server-render也会丢弃js逻辑，所以页面中只有css(vue-style-loader的功劳)和html逻辑)
  // 所以需要把客户端打包后的结果挂载到模板上，因为客户端代码包含事件逻辑
  // 此时需要三个个步骤 1.在模板(dist目录)中先手动引入客户端打包后的结果 <script src="./client.bundle.js"></script> (因为js中的事件逻辑不需要被怕成爬取)
  // 2.但此时服务器并没有读取此文件，所以需要koa-static静态服务中间件 去dist查找此文件
  // 3.需要在App.vue中指定id='app' ,客户端激活
  // 这种方法比较笨

  ctx.body = await new Promise((resolve, reject) => {
    // 必须写成回调函数的形式否则css样式不生效
    render.renderToString(
      {
        title: "服务",
        url: "/",
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  }); // 返回promise 结果为 '<h1 data-server-rendered="true">hello,ssr</h1>' 会把结果塞给template
});

app.use(router.routes());
app.use(static(path.resolve(__dirname, "dist")));
app.listen(3002);
