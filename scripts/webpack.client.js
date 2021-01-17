const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge"); //打包的时候我们用webpack.base.js进行打包，所以需要当前配置和base的配置合并（merge）一下
const base = require("./webpack.base");

module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, "../src/client-entry.js"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      // html默认的名字是index.html
      filename: "client.html",
    }),
  ],
});
