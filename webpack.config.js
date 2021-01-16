// webpack打包的入口文件，需要导出配置
// webpack webpack-cli 默认需要
// @balbel/core 是babel的核心模块 ，编译es6语法
// babel-loader webpack和babel是没有关联的。babel-loader是webpack和babel的一个桥梁
// @babel/preset-env  把es6+高级语法转换成低级语法
// vue-loader  vue-template-complier 解析.vue文件并且编辑模版
// vue-style-loader css-loader 解析css样式并插入到style标签中，vue-style-loader支持服务端渲染

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //将打包后的js文件插到html中
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/main.js"),
  output: {
    filename: "[name].bundle.js", // 默认是main.js,默认是dist目录
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false, //为了配套使用vue-style-loader
            },
          },
        ], // 从右向左执行，先走css-loader
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader", //@babel/core要配置预设
          options: {
            presets: ["@babel/preset-env"], // 预设就是插件的集合，比如箭头函数的转化
          },
        },
        exclude: /node_modules/, //排除整个文件下的js文件，不需要查找
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      // html默认的名字是index.html
    }),
    new VueLoaderPlugin(),
  ],
};
