const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");

module.exports = merge(base, {
  target: "node",
  entry: { sever: path.resolve(__dirname, "../src/sever-entry.js") },
  output: {
    libraryTarget: "commonjs2", //因为sever打包出来的是一个自执行函数，服务端没法使用,因此需要加上这个配置，是的打包后的内容export出去
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.ssr.html"),
      filename: "sever.html",
      excludeChunks: ["sever"], //html内不需要引入打包后的js
      minify: false, // 不需要压缩，提示 <!--vue-ssr-output-->不是注释
      client: "/client.bundle.js", // 模块引入客户端打包后代码
    }),
  ],
});
