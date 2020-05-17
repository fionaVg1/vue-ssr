const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer();
const fs = require('fs');
function createApp(url){
    if(url == '/'){
        url = '/index';
    }
    var json = fs.readFileSync(`json${url}.json`,'utf-8');
    var template = fs.readFileSync(`template${url}.html`,'utf-8');
    return new Vue({
        template:template,
        data:JSON.parse(json).data
    })
}
server.get('*',function(req,res){
    var url = req.url;
    if(url !== '/favicon.ico'){
        const app = createApp(url);
        renderer.renderer(app,(err,html)=>{
            if(err){
                res.status(500).end('server error');
                return;
            }
            res.end(html);
        });        
    }
});
server.listen(7070);