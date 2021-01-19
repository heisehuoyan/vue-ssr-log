import Vue from "vue";
import App from "./App.vue";

// 入口改装成函数，目的是服务端渲染时，每次访问都可以通过整个工厂函数生成一个全新的实例，保证每个访问的都可以拿到一个自己的实例
export default () => {
  const app = new Vue({
    render: (h) => h(App), // h用来渲染组件 createElment _c
  });
  return { app };
};

// new Vue({
//   render: (h) => h(App), // h用来渲染组件 createElment _c
// }).$mount("#app");//服务端不需要$mount
