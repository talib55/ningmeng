


const $ = new Env('宝山会任务');
//var request = require("request");
let status;
status = (status = ($.getval("xbstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
let xbcodeArr = [],xbcount = ''
//let xbcode= $.isNode() ? (process.env.xbcode ? process.env.xbcode : "") : ($.getdata('xbcode') ? $.getdata('xbcode') : "")
let xbcode= $.isNode() ? (process.env.xbcode ? process.env.xbcode : "") : ($.getdata('xbcode') ? $.getdata('xbcode') : "")
let jmname= $.isNode() ? (process.env.jmname ? process.env.jmname : "") : ($.getdata('jmname') ? $.getdata('jmname') : "")
let jmpass= $.isNode() ? (process.env.jmpass ? process.env.jmpass : "") : ($.getdata('jmpass') ? $.getdata('jmpass') : "")
let jmtwopass= $.isNode() ? (process.env.jmtwopass ? process.env.jmtwopass : "") : ($.getdata('jmtwopass') ? $.getdata('jmtwopass') : "")
let xbcodes = ""
const logs =0;
const host='https://bsapi.shmedia.tech/'
var hours = new Date().getHours();
var ssss = new Date().getMinutes();

var timestamp = Math.round(new Date().getTime()/1000).toString();
!(async () => {
  if (typeof $request !== "undefined") {
        await xbck()
  } else {
      if(!$.isNode()){
          xbcodeArr.push($.getdata('xbcode'))
          let xbcount = ($.getval('xbcount') || '1');
          for (let i = 2; i <= xbcount; i++) {
            xbcodeArr.push($.getdata(`xbcode${i}`))
            }
    console.log(`------------- 共${xbcodeArr.length}个账号-------------\n`)
      for (let i = 0; i < xbcodeArr.length; i++) {
        if (xbcodeArr[i]) {
          xbcode = xbcodeArr[i];
          $.index = i + 1;
 
 
  }
}
      }else  {
          if (process.env.xbcode && process.env.xbcode.indexOf('@') > -1) {
            xbcodeArr = process.env.xbcode.split('@');
            console.log(`CK您选择的是用"@"隔开\n`)
        } else {
            xbcodes = [process.env.xbcode]
        };
        Object.keys(xbcodes).forEach((item) => {
        if (xbcodes[item]) {
            xbcodeArr.push(xbcodes[item])
        }
    })
          console.log(`共${xbcodeArr.length}个CK`)
          console.log(`${xbcode}\n`)
	        for (let k = 0; k < xbcodeArr.length; k++) {
                $.message = ""
                xbcode = xbcodeArr[k]
                $.index = k + 1;
await sign()
await read()
await $.wait(3000)
await read()
await $.wait(3000)
await read()
await $.wait(3000)
await read()
await $.wait(3000)
await read()
await $.wait(3000)
await share()
await $.wait(3000)
await share()
await $.wait(3000)
await share()
await $.wait(3000)
await share()
await $.wait(3000)
await share()
await $.wait(3000)
await favor('1225580de8a74b409efc29da81a8f613')
await $.wait(3000)
await disfavor('1225580de8a74b409efc29da81a8f613')
await $.wait(3000)
await favor('818a646e99444ae596ff06b032b2a35f')
await $.wait(3000)
await disfavor('818a646e99444ae596ff06b032b2a35f')
await $.wait(3000)
await favor('db1621d62331430c9cee5e5558da7933')
await $.wait(3000)
await disfavor('db1621d62331430c9cee5e5558da7933')
await $.wait(3000)
await favor('3ec2e624caf84dbaabb78e86f1faeb8f')
await $.wait(3000)
await disfavor('3ec2e624caf84dbaabb78e86f1faeb8f')
await $.wait(3000)
await favor('8e24ffc83d7042eeb53d854a725bb762')
await $.wait(3000)
await disfavor('8e24ffc83d7042eeb53d854a725bb762')
await $.wait(3000)
await pinglun('祝愿祖国越来越好','1225580de8a74b409efc29da81a8f613')
await $.wait(3000)
await pinglun('日子越来越好了越来越好','818a646e99444ae596ff06b032b2a35f')
await $.wait(3000)
await pinglun('我爱祖国','db1621d62331430c9cee5e5558da7933')
await $.wait(3000)
await pinglun('加油','3ec2e624caf84dbaabb78e86f1faeb8f')
await $.wait(3000)
await pinglun('我爱祖国 每天开开心心的','8e24ffc83d7042eeb53d854a725bb762')
await $.wait(3000)
await fatie('祝愿祖国越来越好')
await $.wait(10000)
await fatie('日子越来越好了越来越好')
await $.wait(10000)
await fatie('我爱祖国')
await $.wait(10000)
await fatie('加油')
await $.wait(10000)
await fatie('每天开开心心的')
}


      }
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function xbck() {
   if ($request.url.indexOf("user") > -1) {
  const xbcode = $request.url

if(xbcode)    $.setdata(xbcode,`xbcode${status}`)


$.log(xbcode)
xbcode = xbcode.match(/loginToken=(.*?)&/)[1] 
$.log(xbcode)
   $.msg($.name,"",'宝山会'+`${status}` +'数据获取成功！')
 
}
}
function disfavor(id) {
 return new Promise((resolve) => {
  body = `{"id":"${id}","orderBy":"release_desc","requestType":"2","siteId":"310113"}`,
$.post(xb('media-basic-port/api/app/news/content/disfavor',body), async (err, resp, data) => {
    
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.code==0){
               console.log(data.msg)  

             }
             }else if(data.code!=0){
             console.log(data.msg)
                 
             }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function pinglun(content,id) {
 return new Promise((resolve) => {
  body = `{"content":"${content}","displayResources":[],"targetId":"${id}","targetType":"content","pageNo":0,"pageSize":10,"orderBy":"create_desc","requestType":"1","siteId":"310113"}`,
$.post(xb('media-basic-port/api/app/common/comment/add',body), async (err, resp, data) => {
    
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.code==0){
               console.log(data.msg)  

             }
             }else if(data.code!=0){
             console.log(data.msg)
                 
             }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function fatie(content) {
 return new Promise((resolve) => {
  body = `{"content":"${content}","resources":[],"orderBy":"release_desc","requestType":"1","siteId":"310113"}`,
$.post(xb('media-basic-port/api/app/moment/status/add',body), async (err, resp, data) => {
    
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.code==0){
               console.log(data.msg)  

             }
             }else if(data.code!=0){
             console.log(data.msg)
                 
             }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function favor(id) {
 return new Promise((resolve) => {
  body = `{"id":"${id}","orderBy":"release_desc","requestType":"2","siteId":"310113"}`,
$.post(xb('media-basic-port/api/app/news/content/favor',body), async (err, resp, data) => {
    
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.code==0){
               console.log(data.msg)  

             }
             }else if(data.code!=0){
             console.log(data.msg)
                 
             }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function share() {
 return new Promise((resolve) => {
  body = ``,
$.post(xb('media-basic-port/api/app/points/share/add',body), async (err, resp, data) => {
    
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.code==0){
               console.log(data.msg)  

             }
             }else if(data.code!=0){
             console.log(data.msg)
                 
             }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function read() {
 return new Promise((resolve) => {
  body = `{"orderBy":"release_desc","requestType":"1","siteId":"310113"}`,
$.post(xb('media-basic-port/api/app/points/read/add',body), async (err, resp, data) => {
    
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.code==0){
               console.log(data.msg)  

             }
             }else if(data.code!=0){
             console.log(data.msg)
                 
             }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}


function sign() {
 return new Promise((resolve) => {
  body = `{"orderBy":"release_desc","requestType":"2","siteId":"310113"}`,
$.post(xb('/media-basic-port/api/app/personal/score/sign',body), async (err, resp, data) => {
    
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.code==0){
               console.log(data.data.title)  

             }
             }else if(data.code!=0){
             console.log(data.msg)
                 
             }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function xb(a,body) {
  return {

    url: `${host}${a}`,
    body:`${body}`,
    headers: {


'log-header': 'I am the log request header.',
'deviceId': randomString(32),
'siteId': '310113',
'token': xbcode,
'Content-Type': 'application/json; charset=UTF-8',

'Host':' bsapi.shmedia.tech',
'Connection': 'Keep-Alive',
'Accept-Encoding': 'gzip',
'User-Agent': 'okhttp/3.14.2',

    }
  }
}



function randomString(e) {  
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
  a = t.length,
  n = "";
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}















function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
