// 服务端入口
//每个用户访问服务器都要产生一个实例，不能所有用户使用同一个实例

import createApp from "./app";
// 服务端渲染可以返回一个函数
export default () => {
  let { app } = createApp();
  return app; // 每次都能产生一个新的应用
};
