/*
 微信公众号：柠檬玩机交流
 日期：2023-1-11
 软件：口味王小程序
 功能：所有功能
 依赖：依赖需要：@babel/parser  xpath  xmldom  jsdom node-jsencrypt	axios@v0.27.2
 抓包：开着抓包软件打开小程序，抓包链接里面的memberId https://member.kwwblcj.com/member/api/info/?userKeys=v1.0&pageName=member-info-index-search&formName=searchForm&kwwMember.memberId=xxxx
 变量格式：export kwwUid='xxxx@xxxx2'  多个账号用 @ 或者 换行 分割
 定时：一天一次
 cron: 12 0,22 * * *
 */


const $ = new Env('口臭王抽签');
const axios = require('axios');
const uglifyjs = require("uglify-js");
let request = require("request");
request = request.defaults({
    jar: true
});
const {
    log
} = console;
const parser = require("@babel/parser");
const fs = require('fs');
const path = require('path');
const xpath = require('xpath')
const os = require('os')
    , XmldomParser = require('xmldom').DOMParser;

const domParser = new XmldomParser({
    errorHandler: {}
})
const {JSDOM} = require('jsdom');
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
let kwwUid = ($.isNode() ? process.env.kwwUid : $.getdata("kwwUid")) || ""
let kwwUidArr = [];
let data = '';
let msg = '';
window={}
var hours = new Date().getMonth();
let cjurl = 'https://89420.activity-20.m.duiba.com.cn/aaw/drawLot/index?id=219673007891821&dbnewopen'
var timestamp = Math.round(new Date().getTime()).toString();
!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite();
    } else {
        if (!(await Envs()))
            return;
        else {

            log(`\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000).toLocaleString()} \n=============================================\n`);



            log(`\n============ 微信公众号：柠檬玩机交流 ============`)
            log(`\n=================== 共找到 ${kwwUidArr.length} 个账号 ===================`)
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${kwwUidArr}`);
            }
            for (let index = 0; index < kwwUidArr.length; index++) {

                let num = index + 1
                addNotifyStr(`\n==== 开始【第 ${num} 个账号】====\n`, true)

                kwwUid = kwwUidArr[index];            
await loginFreePlugin(encodeURIComponent(cjurl))
await getBaseConfig()
if(freeTimes == 1){
await login(cjurl)
}else log('免费次数干完了')
}
            //await SendMsg(msg);
        }
    }
})()
.catch((e) => log(e))
    .finally(() => $.done())
// login
async function loginFreePlugin(url) {
 t = Math.round(new Date().getTime()).toString(); 
 random = getRandom(1,32)
 sign = getUserSign(kwwUid,t,random)
    return new Promise((resolve) => {
  var options = {
  method: 'GET',
  url: 'https://member.kwwblcj.com/member/api/info/?userKeys=v1.0&pageName=loginFreePlugin&formName=searchForm&uid='+kwwUid+'&levelCode=1&redirect='+url+'&actionType=%E6%8A%BD%E7%A6%8F%E7%AD%BE&actionDesc='+url+'&objId=C05&memberId='+kwwUid,
  headers: {
'Host': 'member.kwwblcj.com',
'Connection': 'keep-alive',
'user-sign': sign,
'user-timestamp': t,
'user-random': random,
'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF',
'Content-Type': 'application/json',
'xweb_xhr': 1,
'user-paramname': 'memberId',
'Accept': '*/*',
'Sec-Fetch-Site': 'cross-site',
'Sec-Fetch-Mode': 'cors',
'Sec-Fetch-Dest': 'empty',
'Referer': 'https://servicewechat.com/wxfb0905b0787971ad/47/page-frame.html',
'Accept-Language': 'en-us,en',
'Accept-Encoding': 'gzip, deflate',
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                 result = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if (result.hasOwnProperty('flag') && result.flag == "T") {
                 loginUrl = result.result
                 
                 await getck()
                } else 
                    log(data)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

} 
async function getck() {
const options = {
  method: 'GET',
  url: loginUrl,
  headers: {
    Host: '87838.activity-43.m.duiba.com.cn',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63060012)',
}
};
 if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        request(options, async (error, response, data) =>{
            try {
                 //let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
               cookies = response.request.headers.cookie;
              

            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function getBaseConfig() {
const options = {
  method: 'GET',
  url: 'https://89420.activity-20.m.duiba.com.cn/aaw/drawLot/getBaseConfig?_='+timestamp+'&id=219673007891821',
  headers: {
'Host': '89420.activity-20.m.duiba.com.cn',
'Connection': 'keep-alive',
'Upgrade-Insecure-Requests': 1,
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
'Sec-Fetch-Site': 'none',
'Sec-Fetch-Mode': 'navigate',
'Sec-Fetch-User': '?1',
'Sec-Fetch-Dest': 'document',
'Accept-Language': 'en-us,en',
'Cookie': cookies,
'Origin': 'https://89420.activity-20.m.duiba.com.cn',
'Referer': 'https://89420.activity-20.m.duiba.com.cn/aaw/drawLot/index?id=219673007891821&dbnewopen&from=login&spm=89420.1.1.1'
},

};
 if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        request(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
               if(result.success == true){
                 log(result.data.title)
                 freeTimes = result.data.freeTimes
                 log('freeTimes:'+freeTimes)
               }else log(result.message)

            
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function login(url) {
const options = {
  method: 'GET',
  url: url+'&from=login&spm=89420.1.1.1',
  headers: {
'Host': '89420.activity-20.m.duiba.com.cn',
'Connection': 'keep-alive',
'Upgrade-Insecure-Requests': 1,
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
'Sec-Fetch-Site': 'none',
'Sec-Fetch-Mode': 'navigate',
'Sec-Fetch-User': '?1',
'Sec-Fetch-Dest': 'document',
'Accept-Language': 'en-us,en',
'Cookie': cookies,

}
};
 if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        request(options, async (error, response, data) =>{
            try {
                 //let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
               key = ParseHtml(data).defaultToken
                log('key:'+key)
              await gettoken()
            
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function gettoken() {
const options = {
  method: 'POST',
  url: 'https://89420.activity-20.m.duiba.com.cn/ctoken/getToken?_='+timestamp,
  headers: {
'Host': '89420.activity-20.m.duiba.com.cn',
'Connection': 'keep-alive',
'Upgrade-Insecure-Requests': 1,
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
'Sec-Fetch-Site': 'none',
'Sec-Fetch-Mode': 'navigate',
'Sec-Fetch-User': '?1',
'Sec-Fetch-Dest': 'document',
'Accept-Language': 'en-us,en',
'Cookie': cookies,
'Origin': 'https://89420.activity-20.m.duiba.com.cn',
'Referer': cjurl+'&from=login&spm=89420.1.1.1'
},
body:'timestamp='+timestamp
};
 if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        request(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
               if(result.success == true){
                   token = uglifyjs.minify(result.token).code
                  
                   token = eval(uglifyjs.minify('window={};'+token).code)
                   token = eval(key) 
                   log('token:'+token)
                   await doJoin()
               }else log(result.message)

            
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function doJoin() {
const options = {
  method: 'GET',
  url: 'https://89420.activity-20.m.duiba.com.cn/hdtool/doJoin?_='+timestamp+'&activityId=219673007891821&activityType=hdtool&token='+token,
  headers: {
'Host': '89420.activity-20.m.duiba.com.cn',
'Connection': 'keep-alive',
'Upgrade-Insecure-Requests': 1,
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
'Sec-Fetch-Site': 'none',
'Sec-Fetch-Mode': 'navigate',
'Sec-Fetch-User': '?1',
'Sec-Fetch-Dest': 'document',
'Accept-Language': 'en-us,en',
'Cookie': cookies,
'Origin': 'https://89420.activity-20.m.duiba.com.cn',
'Referer': cjurl+'&from=login&spm=89420.1.1.1'
},

};
 if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        request(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
               if(result.success == true){
                   orderId = result.orderId
                   log('orderId:'+orderId)
                   await $.wait(10000)
                   await getOrderStatus()
               }else log(result.message)

            
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function getOrderStatus() {
const options = {
  method: 'POST',
  url: 'https://89420.activity-20.m.duiba.com.cn/hdtool/getOrderStatus?_='+timestamp,
  headers: {
'Host': '89420.activity-20.m.duiba.com.cn',
'Connection': 'keep-alive',
'sec-ch-ua': '',
'Accept': 'application/json',
'sec-ch-ua-mobile': '?1',
'User-Agent': 'jdltapp;android;4.5.0;',
'Content-Type': 'application/x-www-form-urlencoded',
'Origin': 'https://89420.activity-20.m.duiba.com.cn',
'Sec-Fetch-Site': 'same-origin',
'Sec-Fetch-Mode': 'cors',
'Sec-Fetch-Dest': 'empty',
'Referer': 'https://89420.activity-20.m.duiba.com.cn/aaw/drawLot/index?id=219673007891821&dbnewopen&from=login&spm=89420.1.1.1',
'Accept-Language': 'zh-CN,zh;q=0.9',
Cookie: cookies,
'Accept-Encoding': 'gzip, deflate',
},
body:'orderId='+orderId
};
 if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        request(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
               if(result.success == true){
                log(result.lottery.title)
               }else log(result.message)
               

            
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
function ParseHtml(html) {
    let doc = domParser.parseFromString(html);
    let nodes = xpath.select('//script', doc);
    let node = nodes[4].childNodes[0];
    let babelStr;
    let tdom = new JSDOM(`<script>${DealScriptStr(node.data)}</script>`, {
        runScripts: 'dangerously'
    })
    babelStr = tdom.window.getDuibaToken.toString();

    let tokenKey = babelStr.match(/var key = '(.*)?';/)[1];

    let defaultToken = 'window["'+tokenKey+'"]'

    tdom.window.close();
    return {
 

        defaultToken
    };
}
function DealScriptStr(str) {
    str = str.replace(/\/\*.*?\*\//g, ' ');
    str = str.replace(/\b0(\d+)/g, '0o$1');
    return str;
}

function dealToken(tokenStr) {
    let scriptToken;
    scriptToken = DealScriptStr(tokenStr);

    let tdom = new JSDOM(
        `<script>${scriptToken}</script>`,
        {
            runScripts: 'dangerously'
        }
    )
    let str = scriptToken;
    var babelStr;
    str = str.replaceAll(/eval/g, 'var babelStr=');
    str = str.replaceAll(/\\u0065\\u0076\\u0061\\u006c/g, 'var babelStr=')
    eval(str);
    eval(babelStr);
    log(str)
    log(babelStr)
    let ast = parser.parse(babelStr);
    log(babelStr)
    let funcStr = ast.program.body[0].id.name;
    
    let res = tdom.window[funcStr]();
    tdom.window.close();
    //console.log(window['pf8b6b']);
    return res;
}

async function Envs() {
    if (kwwUid) {
        if (kwwUid.indexOf("@") != -1) {
            kwwUid.split("@").forEach((item) => {

                kwwUidArr.push(item);
            });
        } else if (kwwUid.indexOf("\n") != -1) {
            kwwUid.split("\n").forEach((item) => {
                kwwUidArr.push(item);
            });
        } else {
            kwwUidArr.push(kwwUid);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 kwwUid`)
        return;
    }

    return true;
}
function addNotifyStr(str, is_log = true) {
    if (is_log) {
        log(`${str}\n`)
    }
    msg += `${str}\n`
}
var i,  l = ["A", "Z", "B", "Y", "C", "X", "D", "T", "E", "S", "F", "R", "G", "Q", "H", "P", "I", "O", "J", "N", "k", "M", "L", "a", "c", "d", "f", "h", "k", "p", "y", "n"];
var o = 8

function s(e, t) {
    var a, n, r, i, o, l, s, u, p;
    for (e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t, a = 1732584193,
        n = -271733879, r = -1732584194, i = 271733878, o = 0; o < e.length; o += 16) l = a,
        s = n, u = r, p = i, a = d(a, n, r, i, e[o + 0], 7, -680876936), i = d(i, a, n, r, e[o + 1], 12, -389564586),
        r = d(r, i, a, n, e[o + 2], 17, 606105819), n = d(n, r, i, a, e[o + 3], 22, -1044525330),
        a = d(a, n, r, i, e[o + 4], 7, -176418897), i = d(i, a, n, r, e[o + 5], 12, 1200080426),
        r = d(r, i, a, n, e[o + 6], 17, -1473231341), n = d(n, r, i, a, e[o + 7], 22, -45705983),
        a = d(a, n, r, i, e[o + 8], 7, 1770035416), i = d(i, a, n, r, e[o + 9], 12, -1958414417),
        r = d(r, i, a, n, e[o + 10], 17, -42063), n = d(n, r, i, a, e[o + 11], 22, -1990404162),
        a = d(a, n, r, i, e[o + 12], 7, 1804603682), i = d(i, a, n, r, e[o + 13], 12, -40341101),
        r = d(r, i, a, n, e[o + 14], 17, -1502002290), n = d(n, r, i, a, e[o + 15], 22, 1236535329),
        a = c(a, n, r, i, e[o + 1], 5, -165796510), i = c(i, a, n, r, e[o + 6], 9, -1069501632),
        r = c(r, i, a, n, e[o + 11], 14, 643717713), n = c(n, r, i, a, e[o + 0], 20, -373897302),
        a = c(a, n, r, i, e[o + 5], 5, -701558691), i = c(i, a, n, r, e[o + 10], 9, 38016083),
        r = c(r, i, a, n, e[o + 15], 14, -660478335), n = c(n, r, i, a, e[o + 4], 20, -405537848),
        a = c(a, n, r, i, e[o + 9], 5, 568446438), i = c(i, a, n, r, e[o + 14], 9, -1019803690),
        r = c(r, i, a, n, e[o + 3], 14, -187363961), n = c(n, r, i, a, e[o + 8], 20, 1163531501),
        a = c(a, n, r, i, e[o + 13], 5, -1444681467), i = c(i, a, n, r, e[o + 2], 9, -51403784),
        r = c(r, i, a, n, e[o + 7], 14, 1735328473), n = c(n, r, i, a, e[o + 12], 20, -1926607734),
        a = f(a, n, r, i, e[o + 5], 4, -378558), i = f(i, a, n, r, e[o + 8], 11, -2022574463),
        r = f(r, i, a, n, e[o + 11], 16, 1839030562), n = f(n, r, i, a, e[o + 14], 23, -35309556),
        a = f(a, n, r, i, e[o + 1], 4, -1530992060), i = f(i, a, n, r, e[o + 4], 11, 1272893353),
        r = f(r, i, a, n, e[o + 7], 16, -155497632), n = f(n, r, i, a, e[o + 10], 23, -1094730640),
        a = f(a, n, r, i, e[o + 13], 4, 681279174), i = f(i, a, n, r, e[o + 0], 11, -358537222),
        r = f(r, i, a, n, e[o + 3], 16, -722521979), n = f(n, r, i, a, e[o + 6], 23, 76029189),
        a = f(a, n, r, i, e[o + 9], 4, -640364487), i = f(i, a, n, r, e[o + 12], 11, -421815835),
        r = f(r, i, a, n, e[o + 15], 16, 530742520), n = f(n, r, i, a, e[o + 2], 23, -995338651),
        a = h(a, n, r, i, e[o + 0], 6, -198630844), i = h(i, a, n, r, e[o + 7], 10, 1126891415),
        r = h(r, i, a, n, e[o + 14], 15, -1416354905), n = h(n, r, i, a, e[o + 5], 21, -57434055),
        a = h(a, n, r, i, e[o + 12], 6, 1700485571), i = h(i, a, n, r, e[o + 3], 10, -1894986606),
        r = h(r, i, a, n, e[o + 10], 15, -1051523), n = h(n, r, i, a, e[o + 1], 21, -2054922799),
        a = h(a, n, r, i, e[o + 8], 6, 1873313359), i = h(i, a, n, r, e[o + 15], 10, -30611744),
        r = h(r, i, a, n, e[o + 6], 15, -1560198380), n = h(n, r, i, a, e[o + 13], 21, 1309151649),
        a = h(a, n, r, i, e[o + 4], 6, -145523070), i = h(i, a, n, r, e[o + 11], 10, -1120210379),
        r = h(r, i, a, n, e[o + 2], 15, 718787259), n = h(n, r, i, a, e[o + 9], 21, -343485551),
        a = m(a, l), n = m(n, s), r = m(r, u), i = m(i, p);
    return Array(a, n, r, i);
}

function u(e, t, a, n, r, i) {
    return m(p(m(m(t, e), m(n, i)), r), a);
}

function d(e, t, a, n, r, i, o) {
    return u(t & a | ~t & n, e, t, r, i, o);
}

function c(e, t, a, n, r, i, o) {
    return u(t & n | a & ~n, e, t, r, i, o);
}

function f(e, t, a, n, r, i, o) {
    return u(t ^ a ^ n, e, t, r, i, o);
}

function h(e, t, a, n, r, i, o) {
    return u(a ^ (t | ~n), e, t, r, i, o);
}

function m(e, t) {
    var a = (65535 & e) + (65535 & t),
        n = (e >> 16) + (t >> 16) + (a >> 16);
    return n << 16 | 65535 & a;
}

function p(e, t) {
    return e << t | e >>> 32 - t;
}

function b(e) {
    var t, a = Array(),
        n = (1 << o) - 1;
    for (t = 0; t < e.length * o; t += o)
        a[t >> 5] |= (e.charCodeAt(t / o) & n) << t % 32;
    return a;
}

function _(e) {
    var t, a = i ? "0123456789ABCDEF" : "0123456789abcdef",
        n = "";
    for (t = 0; t < 4 * e.length; t++) n += a.charAt(15 & e[t >> 2] >> t % 4 * 8 + 4) + a.charAt(15 & e[t >> 2] >> t % 4 * 8);
    return n;
}

function v(e) {
    return _(s(b(_(s(b(e), e.length * o)) + "iussoft"), (_(s(b(e), e.length * o)) + "iussoft").length * o));
}

function y(e) {
    var t = e + '6b4ba4460e064dee87ccbe5652a01fdc';
    return _(s(b(t), t.length * o));
}

function g(e) {
    var t = e + "14YVeC0PToxklds";
    return _(s(b(t), t.length * o));
}

function w(e, t, a) {
    t || (t = "86109D696C9CC58A504EFE21662DF1B9");
    var n = e + t + l[a];
    return _(s(b(n), n.length * o));
}

function getRandom(e, t) {
    return Math.floor(Math.random() * (e - t)) + t;
}

function getUserSign(memberId, userTimestamp, userRandom) {
    return (0, w)(userTimestamp, memberId, userRandom)
}
// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        log(message);
    }
}
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}   