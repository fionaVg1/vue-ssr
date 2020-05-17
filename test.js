//1. vue对象变成html字符串
const Vue = require('vue');
const render = require('vue-server-renderer').createRenderer();
const app = new Vue({
    template:'<div>Hello World<span>{{num}}</span></div>',
    data:{
        num:'123'
    }
});
render.renderToString(app).then(html=>{
    console.log(html);
});
//2.怎么将已有vue项目改造成ssr
//2.1 客户端和服务器端分开打包
//3.写webpack配置