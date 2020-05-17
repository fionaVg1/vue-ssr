const express = require('express');
const server = express();
const {createBundleRenderer} = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');
const serverBundle = require(path.resolve(__dirname,'../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname,'../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname,'../dist/index.ssr.html'),'utf-8');
const renderer = createBundleRenderer(serverBundle,{
    runInNewContext:false,
    template:template,
    clientManifest:clientManifest
});
server.use(express.static(path.resolve(__dirname,'./dist')));
server.get('*',(req,res)=>{
    if(req.url != '/favicon.ico'){
        const context = {url:req.url};
        //html流，避免过大，所以不是一次性读
        const ssrStream = renderer.renderToString(context);
        let buffers = [];
        ssrStream.on('error',(err)=>{
           console.log(err)
        })
        ssrStream.on('data',(data)=>{
            buffers.push(data);
        })
        ssrStream.on('end',()=>{
            res.end(Buffer.concat(buffers));
        })
    }
})
server.listen(1000);