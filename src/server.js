import {createApp} from './main'
import { resolve } from 'dns'
import { url } from 'inspector';
export default context=>{
    return new Promise((resolve,reject)=>{
        const {app,router} = createApp();
        router.push(context,url);
        router.onReady(()=>{
            const matchComponents = router.getMatchedComponents();
            if(!matchComponents){
                return reject({code:404})
            }
            resolve(app)
        },reject)
    })
}