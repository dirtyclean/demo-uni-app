import Vue from 'vue'
import App from './App'
import customTabbar from "components/custom-tabbar.vue"
 
// 注册全局组件
Vue.component('custom-tabbar', customTabbar)
 
Vue.config.productionTip = false
 
App.mpType = 'app'
 
const app = new Vue({
	...App
})
app.$mount()