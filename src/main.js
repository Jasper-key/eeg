import Vue from "vue";
import App from "./App.vue";
import echarts from "echarts";
// import axios from "axios";
// import datas from "./../public/config.json";
// Vue.prototype.$datas = datas;
Vue.prototype.$datas = window.globals;

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
// axios.defaults.baseURL = '/api'
// axios.get('./config.json').then((res) => {

//     Vue.prototype.$datas = res.data;


// });

new Vue({
    render: (h) => h(App),
}).$mount("#app");

// axios.get("/config.json").then((res) => {
//     console.log(res.data.name);
//   Vue.prototype.$name11 = res.data.name;
// });