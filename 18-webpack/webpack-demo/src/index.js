import $ from "jquery";
import "./css/1.css";
import "./css/1.less";
import "./css/1.scss";

$(function () {
  $("li:odd").css("backgroundColor", "skyblue");
  $("li:even").css("backgroundColor", "orange");
});

class Person {
  static info = "aaa";
}

console.log(Person.info);

// ----------------------------------

import Vue from "vue";

import App from "./components/App.vue";

const vm = new Vue({
  el: "#app",
  // 将vue单组件渲染到#app中
  render: (h) => h(App),
});
