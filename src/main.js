import Vue from "vue";
import App from "./App.vue";

new Vue({
  render: (h) => h(App), // h用来渲染组件 createElment _c
}).$mount("#app");
