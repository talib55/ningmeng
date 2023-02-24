/*
美团外卖领红包
环境变量，名称：MT_TOKEN，值：xxxxx
关于MT_TOKEN获取方法，手机浏览器打开http://i.meituan.com 登录后，抓包查看请求头Cookie 找到http://i.meituan.com  然后找到token的值
定时规则0 11,14,17,21,0,1,2,3 * * *
[task_local]
#美团外卖领红包
0 11,14,17,21,0,1,2,3 * * *

[Script]
cron "0 11,14,17,21,0,1,2,3 * * *" script-path=mt.js, tag=美团外卖领红包
*/

const $ = new Env('美团领红包');
let parActivityId="Gh1tkq-wvFU2xEP_ZPzHPQ"
let wm_ctype="mtandroid"
let propIdforuse =2
let portraitId=498
let mt_token = process.env.MT_TOKEN;
let wm_latitude = process.env.wm_latitude;
let wm_longitude = process.env.wm_longitude;
if (!mt_token) {
    console.log('请先添加美团Token,环境变量MT_TOKEN')
    return
}

!(async () => {
    if (mt_token.indexOf('@') >= 0){
        let mt_tokens = mt_token.split('@')
        console.log('发现' + mt_tokens.length + '个美团账号')
        for (let i = 0; i < mt_tokens.length; i++) {
            console.log('====账号' + ( i + 1 ) + '====' )
            await getCoupons(mt_tokens[i])
            console.log('====End====')
        }
        
    }else{
        await getCoupons(mt_token)
        await corepage(mt_token)
        await sendTaskRedBean(mt_token)
        await doAction(mt_token)
        await myRedBeanRecords(mt_token)
    }
    
})()
.catch((e) => {
  $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
})
.finally(() => {
  $.done();
})

function getCoupons(token){
    return new Promise(resolve => {
        let cookie = "token=" + token
        const options = {
            "url": `https://mediacps.meituan.com/gundam/gundamGrabV3`,
            "headers": {
              "Accept": "application/json,text/plain, */*",
              "Content-Type": "application/json;charset=UTF-8",
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "zh-cn",
              "Connection": "keep-alive",
              "Cookie": cookie,
              "Referer": "https://market.waimai.meituan.com/",
              "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
            },
            "body":'{"gundamId":20625,"grabKey":"4E35567E5DAB45E5B7CC2B3BDE2E67B7,AA41950DF11D44AA8324A7E0E32CE806,211BCD47900F43D1AAC3864049DB1400,0084BF0333F844A2846DA0827C21EBF7,34BCA492BAEA4D2E8CD0394B31D5CB26,AD317E383B064F84ACE3A8DCDC8C2572,DFEAE6C5C7664DBBB5A64E5F52297B5C,CF56C7F89ADF4933990684F91F88E4A0,5B4653A4388947249D9DEFBE53BC22E7,30941E32462A42AB9B3D741B77A96A6E","defaultGrabKey":"E28198A627324F85B4FF89FA10D093EC","actualLongitude":"","actualLatitude":"","needTj":true,"couponConfigIdOrderCommaString":"464617074,464617087,464617110,464617124,464573157,464573265,464574741,464577259,458043537,459036220,459956075,458056972,458056406,458047734,392417289,452275501,452275388,452275365,452275482,452447814,452446826,452446582,452447692,392417317,412809091,446694745,418776149,277807308,431529548","couponAllConfigIdOrderString":"","rubikCouponKey":""}'
          }
          $.post(options, (err, resp, data) => {
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
                        if (d.code != 0){
                          console.log(d.msg)
                          return
                        }
                        let str = ''
                        str += d.msg + '\n'
                        d.data.coupons.forEach(el => {
                            str += '======' + el.couponName + '=====\n'
                            str += '' + el.amountLimit + '减' + el.couponAmount + '\n'
                        });
                        
                        console.log(str)
                    }
                  }
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}
async function corepage(token){
    return new Promise(resolve => {
        
        const options = {
            "url": `https://i.waimai.meituan.com/cfeplay/playcenter/batchgrabred/corepage`,
            "headers": {
"Host": "i.waimai.meituan.com",
"User-Agent":"MeituanGroup/11.9.208",
"x-requested-with": "XMLHttpRequest",
"content-type":"application/x-www-form-urlencoded"
            },
            "body":'parActivityId='+parActivityId+'&wm_ctype=mtandroid&wm_latitude='+wm_latitude+'&wm_longitude='+wm_longitude+'&token='+token
          }
          $.post(options, async(err, resp, data) => {
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
                        if (d.code == 0){
                          console.log('获取batchId:'+d.data.batchId)
                          batchId = d.data.batchId
                          await signForBeans(mt_token)
                          await drawlottery(mt_token)
                          await acceptRed(mt_token)
                          await redtobean(mt_token)
                        }else 

                        
                        console.log("获取batchId失败👀，当前非限时抢红包时间段,无法进行下一步，但已为您签到完毕🙏!\n")
                        
                    }
                  }
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}
function signForBeans(token){
    console.log("**开始执行签到领豆脚本:** \n")
    return new Promise(resolve => {
        
        const options = {
            "url": `https://i.waimai.meituan.com/cfeplay/playcenter/batchgrabred/drawPoints/v2`,
            "headers": {
"Host": "i.waimai.meituan.com",
"User-Agent":"MeituanGroup/11.9.208",
"x-requested-with": "XMLHttpRequest",
"content-type":"application/x-www-form-urlencoded"
            },
            "body":'token='+token
          }
          $.post(options, (err, resp, data) => {
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
                        if (d["code"]==0)
       
            console.log("👴%s\n"%(d["msg"]))
        if (d["code"]==1)
            console.log("👴未到领取时间或已经领取完了(每天可领7次,每次间隔需半小时\n)！")
        if (d["code"]==7)
            console.log("token已失效，，请手动🙏更新token\n")

                        }else 

                        
                        console.log(d.msg)
                    }
                  
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}

function drawlottery(token){
    console.log("**开始执行限时抢天天神券脚本🧧:**\n")
    return new Promise(resolve => {
        
        const options = {
            "url": `https://i.waimai.meituan.com//cfeplay/playcenter/batchgrabred/drawlottery`,
            "headers": {
"Host": "i.waimai.meituan.com",
"User-Agent":"MeituanGroup/11.9.208",
"x-requested-with": "XMLHttpRequest",
"content-type":"application/x-www-form-urlencoded"
            },
            "body":"parActivityId="+parActivityId+"&wm_latitude="+"&wm_longitude="+"&token="+token+"&batchId="+batchId+"&isShareLink=true"+"&propType=1"+"&propId="+propIdforuse
          }
          $.post(options, (err, resp, data) => {
              $.log(data)
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
        if(d["code"]==0)
           // console.log("领取成功!\n提示信息:%s\n红包属性:%s\n使用限制:%s\n红包价值:%s\n红包立即生效时间:%s\n红包剩余有效期:%s分钟\n"%(d["msg"]+d["data"]["name"]+d["data"]["priceLimitdesc"]+d["data"]["showTitle"]+d["data"]["endTimeDesc"]+d["data"]["leftTime"]/60000))
            console.log(d["msg"]+d["data"]["name"]+d["data"]["priceLimitdesc"]+d["data"]["showTitle"]+d["data"]["endTimeDesc"]+d["data"]["leftTime"]/60000)
            showPriceNumber = d["data"]["showPriceNumber"]
            if (showPriceNumber<500)
                console.log("**当前红包面值为%d元，小于5元，👴将自动执行小额红包转红包豆脚本!!**\n"+showPriceNumber/100)
            else
                console.log("**当前红包面值为%d元，大于等于5元，👴将不会执行小额红包转红包豆脚本!!**\n"+showPriceNumber/100)
        if(d["code"]==1 && d["subcode"]==3)
            console.log("%s😅\n"(d["msg"]))
        if(d["code"]==1 && d["subcode"]==-1)
            console.log("token错误或已失效,%s\n"(d["msg"]))
        if (d["code"]==7)
            console.log("token已失效，请手动🙏更新环境变量\n")

                        }else 

                        
                        console.log(d.msg)
                    }
                  
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}


function acceptRed(token){
    console.log("**开始执行发放天天神券🧧到红包库脚本:**\n")
    return new Promise(resolve => {
        
        const options = {
            "url": `https://i.waimai.meituan.com/cfeplay/playcenter/batchgrabred/acceptRed`,
            "headers": {
"Host": "i.waimai.meituan.com",
"User-Agent":"MeituanGroup/11.9.208",
"x-requested-with": "XMLHttpRequest",
"content-type":"application/x-www-form-urlencoded"
            },
            "body": "parActivityId="+parActivityId+"&wm_latitude="+"&wm_longitude="+"&token="+token+"&batchId="+batchId
          }
          $.post(options, (err, resp, data) => {
              $.log(data)
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
        if(d["code"]==0)
            console.log("*👴抢到的红包已经领取成功啦，快去使用吧!*\n")
        if (d["code"]==1)
            console.log("%s\n"(d["msg"]))
        if (d["code"]==7)
            console.log("token已失效，请手动🙏更新环境变量\n")

                        }else 

                        
                        console.log(d.msg)
                    }
                  
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}
function redtobean(token){
    console.log("**默认尝试执行面值小于5元🧧自动转红包豆脚本:**\n")
    return new Promise(resolve => {
        
        const options = {
            "url": `https://i.waimai.meituan.com/cfeplay/playcenter/batchgrabred/redToBean`,
            "headers": {
"Host": "i.waimai.meituan.com",
"User-Agent":"MeituanGroup/11.9.208",
"x-requested-with": "XMLHttpRequest",
"content-type":"application/x-www-form-urlencoded"
            },
            "body": "parActivityId="+parActivityId+"&wm_latitude="+"&wm_longitude="+"&token="+token+"&batchId="+batchId
          }
          $.post(options, (err, resp, data) => {
              $.log(data)
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
       if(d["code"]==0)
            console.log("👴小额红包转红包豆成功!\n")
        if (d["code"]==1 && d["subcode"]==12)
            console.log("%s😅\n"(d["msg"]))
            console.log("没有待转换的红包😅\n")
        if (d["code"]==7)
            console.log("token已失效，请手动🙏更新环境变量\n")

                        }else 

                        
                        console.log(d.msg)
                    }
                  
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}
function querymyreward(token){
    console.log("**开始执行查询已领天天神券🧧脚本:**\n")
    return new Promise(resolve => {
        
        const options = {
            "url": `https://i.waimai.meituan.com/cfeplay/playcenter/batchgrabred/myreward`,
            "headers": {
"Host": "i.waimai.meituan.com",
"User-Agent":"MeituanGroup/11.9.208",
"x-requested-with": "XMLHttpRequest",
"content-type":"application/x-www-form-urlencoded"
            },
            "body": "parActivityId="+parActivityId+"&token="+token
          }
          $.post(options, (err, resp, data) => {
              
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
if(d["code"]==0 && d["data"]["myawardInfos"])
            console.log("👴开始遍历红包库:\n")
            console.log("红包库详细信息:\n")
            console.log("红包库中共有%d个红包\n"%(d["data"]["myawardInfos"]))
            cent=0
            count = 0
            isover15=0
           
            for(let k=0;k<d["data"]["myawardInfos"];k++){
                if (k["status"].length!=0)
                    console.log(cent+1+k["name"]+k["priceLimitdesc"]+k["showPriceNumberYuan"]+k["leftTime"]/60000)
                    if(k["showPriceNumberYuan"]>15){
                        isover15 =1
                    console.log("\n")}
                    else
                    count=count+1
                    if (cent == 0)
                        console.log("**过期红包详情:**\n")
                    
                cent=cent+1
                    
                
            }
                
            if(propIdforuse!=5)
                console.log("总计已领取%d个红包,其中已过期%d个😅,有效%d个\n"%(cent+count+cent-count))
            else
                if (isover15==1)
                    console.log("恭喜你领取大额限时红包,具体价值如上所示!!总计已领取%d个红包,其中已过期%d个😅,有效%d个\n"%(cent+count+cent-count))
            console.log("\n")
        if (d["code"]==1)
            console.log("%s\n"%(d["msg"]))
        if (d["code"]==7)
            console.log("token已失效，请手动🙏更新环境变量\n")

                        }else 

                        
                        console.log(d.msg)
                    }
                  
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}

function sendTaskRedBean(token){
    console.log("**开始执行领取每日30豆的脚本:**\n")
    return new Promise(resolve => {
        
        const options = {
            "url": `https://i.waimai.meituan.com/cfeplay/playcenter/batchgrabred/sendTaskRedBean`,
            "headers": {
"Host": "i.waimai.meituan.com",
"User-Agent":"MeituanGroup/11.9.208",
"x-requested-with": "XMLHttpRequest",
"content-type":"application/x-www-form-urlencoded"
            },
            "body": "parActivityId="+parActivityId+"&wm_ctype=mtandroid&wm_latitude="+"&wm_longitude="+"&token="+token+"&portraitId="+portraitId
          }
          $.post(options, (err, resp, data) => {
              
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
if(d["status"]==0)
            console.log("%s\n今天领取成功%d个红包豆，请明日再来！\n"(d["msg"]+d["sendBeanCount"]))
        if (d["status"]==1)
            
            console.log(d["msg"])
        if (d["status"]==-1)
            console.log("portraitId已失效,%s\n"(d["msg"]))

                        }else 

                        
                        console.log(d.msg)
                    }
                  
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}
function doAction(token){
    console.log("**开始执行每日签到领必中符🧧的脚本:**\n")
    return new Promise(resolve => {
        
        const options = {
            "url": `https://i.waimai.meituan.com/cfeplay/playcenter/batchgrabred/doAction`,
            "headers": {
"Host": "i.waimai.meituan.com",
"User-Agent":"MeituanGroup/11.9.208",
"x-requested-with": "XMLHttpRequest",
"content-type":"application/x-www-form-urlencoded"
            },
            "body": 'parActivityId='+parActivityId+'&wm_ctype=mtandroid&wm_latitude=&wm_longitude=&token='+token+'&action=SiginInGetProp'
          }
          $.post(options, (err, resp, data) => {
             
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
 if(d["code"]==0 &&d["data"]["signDays"]!=0)
            console.log("签到%s\n,截止今日这周已签到%d天"+d["msg"]+d["data"]["signDays"])
        if (d["code"]==0 && d["data"]["signDays"]==0)
            console.log("您今日已签到，请明天再来!")
        if (d["code"]==7)
            console.log("参数异常或接口已失效")

                        }else 

                        
                        console.log(d.msg)
                    }
                  
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}
function myRedBeanRecords(token){
    console.log("**开始执行查询豆子变化详情参数脚本**:\n")
    return new Promise(resolve => {
        
        const options = {
            "url": `https://i.waimai.meituan.com/cfeplay/playcenter/batchgrabred/myRedBeanRecords`,
            "headers": {
"Host": "i.waimai.meituan.com",
"User-Agent":"MeituanGroup/11.9.208",
"x-requested-with": "XMLHttpRequest",
"content-type":"application/x-www-form-urlencoded"
            },
            "body": 'parActivityId='+parActivityId+'&wm_ctype=mtandroid&wm_latitude=&wm_longitude=&token='+token+'&userPortraitId=498&pageNum=1'
          }
          $.post(options, (err, resp, data) => {
             
              try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                  }else{
                    if (resp.statusCode == 200){
                        let d = JSON.parse(data);
 if(d["code"]==0 )
 console.log("豆子："+d.data.totalObtainAmount)
 redBeanRecordInfos = d.data.redBeanRecordInfos
 for(let i=0;i<redBeanRecordInfos.length;i++){
 console.log(redBeanRecordInfos[i].exchangeMessage+': '+redBeanRecordInfos[i].exchangeNumber)    
 }
 
        if (d["code"]==7)
            console.log("参数异常或接口已失效")

                        }else 

                        
                        console.log(d.msg)
                    }
                  
                
              } catch (e) {
                $.logErr(e, resp)
              } finally {
                resolve()
              }
              
          })
    })
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}