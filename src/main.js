import Vue from 'vue'
import App from './App'
import {createRouter} from './router'
Vue.config.productionTip = false
var router = createRouter();
export function createApp(){
    const app = new Vue({ 
        router,
        render:h=>h(App)      
    });
    return {app,router}
}