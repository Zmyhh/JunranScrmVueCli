import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuecookies from 'vue-cookies'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Pagination} from 'element-ui';
import './assets/font/iconfont.css'
import axios from 'axios'
import md5 from 'js-md5'
import {store} from "./store/store";
import echarts from 'echarts'


Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
//
//

// axios.defaults.headers.common['token'] =`${store.state.token}`;
//请求拦截器
axios.interceptors.request.use(
    config=>{
        let token=vuecookies.get('token')
        if (token!=null){
            console.log(config)
            config.headers['token']=token
        }
        return config
    }
)



//响应拦截器
axios.interceptors.response.use(
    response => {

        if (response.data.code == 103) {
            alert('身份验证过期，请重新登录');
            sessionStorage.clear()//清空所有选项卡信息
            router.push('./');
        } else {
            return response
        }
    }),
    error => {
        // if (error.response) {
        //     if (error.response.data.code==103){
        //         alert()
        //     }
        // }

        return Promise.reject(error)

    }


Vue.config.productionTip = false
Vue.use(vuecookies)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(Pagination)


new Vue({
    store: store,
    router,
    render: h => h(App)
}).$mount('#app')
