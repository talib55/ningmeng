const $ = new Env('悦看点');
let status;
status = (status = ($.getval("ykdstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
let ykdhdArr = [],ykdckArr = [],jzreadcount = ''
let ykdhd= $.isNode() ? (process.env.ykdhd ? process.env.ykdhd : "") : ($.getdata('ykdhd') ? $.getdata('ykdhd') : "")
let ykdck= $.isNode() ? (process.env.ykdck ? process.env.ykdck : "") : ($.getdata('ykdck') ? $.getdata('ykdck') : "")
let ykdcks = ""
let ykdhds = ""
const logs =0;

var hours = new Date().getHours();
var s = new Date().getMinutes();

var timestamp = Math.round(new Date().getTime()/1000).toString();
!(async () => {
  if (typeof $request !== "undefined") {
        await getck()
  } else {
      if(!$.isNode()){
          ykdhdArr.push($.getdata('ykdhd'))
          ykdckArr.push($.getdata('ykdck'))
          let jzreadcount = ($.getval('ykdcount') || '1');
          for (let i = 2; i <= jzreadcount; i++) {
            ykdhdArr.push($.getdata(`ykdhd${i}`))
            ykdckArr.push($.getdata(`ykdck${i}`))
            }
    console.log(`------------- 共${ykdhdArr.length}个账号-------------\n`)
      for (let i = 0; i < ykdhdArr.length; i++) {
        if (ykdhdArr[i]) {
          ykdhd = ykdhdArr[i];
          ykdck = ykdckArr[i]
          $.index = i + 1;
        
          console.log(`\n开始【悦看点${$.index}】`)

//await qx()

    

  }
}
      }else  {
          if (process.env.ykdhd && process.env.ykdhd.indexOf('@') > -1) {
            ykdhdArr = process.env.ykdhd.split('@');
            ykdckArr = process.env.ykdck.split('@');
            console.log(`您选择的是用"@"隔开\n`)
        } else {
            ykdhds = [process.env.ykdhd]
            ykdcks = [process.env.ykdck]
        };
        Object.keys(ykdhds).forEach((item) => {
        if (ykdhds[item]) {
            ykdhdArr.push(ykdhds[item])
        }
    })
            Object.keys(ykdcks).forEach((item) => {
        if (ykdcks[item]) {
            ykdckArr.push(ykdcks[item])
        }
    })
    
    ck = JSON.parse(ykdck)
          console.log(`共${ykdckArr.length}个cookie`)
	        for (let k = 0; k < ykdckArr.length; k++) {
                $.message = ""
                ykdhd = ykdhdArr[k]
                ykdck = ykdckArr[k]
                $.index = k + 1;
          console.log(`\n开始【悦看点${$.index}】`)
          //$.log(ykdhd)
await member()
await rain()
for(let i=1;i<7;i++){
    await barrier(i)
}
await getlottery()
if(lottery_count>0){
 for(let i=0;i<lottery_count;i++){
    await getlottery()
}   
}
	        }
      }
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function getck() {
   if ($request.url.indexOf("userlive") > -1) {
  const ykdhd = $request.body
if(ykdhd)    $.setdata(ykdhd,`ykdhd${status}`)
  const ykdck = JSON.stringify($request.headers)
if(ykdck)    $.setdata(ykdck,`ykdck${status}`)

$.log(ykdhd)
$.log(ykdck)

   $.msg($.name,"",'悦看点'+`${status}` +'数据获取成功！')
 
}
}

async function member(){
 return new Promise((resolve) => {

   $.get(taskget('https://yuekandian.yichengw.cn/api/v1/member/profile?debug=0&'),async(error, response, data) =>{
try{
        const result = JSON.parse(data)

 if(result.code==0){
     $.log(`point:${result.result.point}\nbalance:${result.result.balance}\nticket:${result.result.ticket}\ntotal_point:${result.result['total_point']}`)
 }
      }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })}
   
   async function rain(){
 return new Promise((resolve) => {

   $.post(taskpost('https://yuekandian.yichengw.cn/api/v1/reward/rain?',''),async(error, response, data) =>{
try{
        const result = JSON.parse(data)

 if(result.code==0){
     $.log(`coin:${result.result.coin}\nmessage:${result.result.message}\nred_e_count:${result.result['red_e_count']}\nred_e_time:${result.result['red_e_time']}`)
 }else  $.log(result.message)
      }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })}
   
      async function barrier(no){
 return new Promise((resolve) => {

   $.post(taskpost('https://yuekandian.yichengw.cn/api/v1/reward/barrier/index?',`no=${no}&`),async(error, response, data) =>{
try{
        const result = JSON.parse(data)

 if(result.code==0){
     $.log(`coin:${result.result.coin}`)
 }else  $.log(result.message)
      }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })}
   
  async function getlottery(){
 return new Promise((resolve) => {

   $.get(taskget('https://yuekandian.yichengw.cn/api/v1/reward/lottery/index?',''),async(error, response, data) =>{
try{
        const result = JSON.parse(data)

 if(result.code==0){
     if(result.result.ticket){
ticket = result.result.ticket
 await  lottery(ticket)       
     }
 }else  $.log(result.message)
      }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })} 
async function lottery(a){
 return new Promise((resolve) => {

   $.post(taskpost('https://yuekandian.yichengw.cn/api/v1/reward/lottery/index?',`ticket=${a}`),async(error, response, data) =>{
try{
        const result = JSON.parse(data)

 if(result.code==0){
     if(result.result['lottery_count']){
lottery_count = result.result['lottery_count']
         
     }
     $.log('coin:'+result.result.num)
 }else  $.log(result.message)
      }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })}    
   
   
   
   
   
   
   
   
   
   
   
  function taskget(a) {


  return {
    url: `${a}`,

headers:{'Authorization': ck.Authorization,
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
        
    }
  }
} 
    function taskpost(a,b) {
  return {
    url: `${a}`,
    body:`${b}`,
headers:{'Authorization': ck.Authorization,
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
        
    }
  }
} 
   
   
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
