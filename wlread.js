/*
下载地址：
http://wlqkrda.ccdy.cn/a69359bfdecc0bacc039d37e56fb2103
邀请码：10015380
==========
青龙变量
==========
export wlhd='{"token":"token","userid":"userid","smid":"smid"}'    
多账号@隔开
export wlhd='{"token":"token","userid":"userid","smid":"smid"}'@'{"token":"token","userid":"userid","smid":"smid"}'
==========


[task_local]
0 7,12,20,21 * * * wlread.js, tag=文旅看点, img-url=circles.hexagongrid.fill.system, enabled=true
[Script]
cron "0 7,12,20,21 * * *" script-path=wlread.js,tag=文旅看点
*/


const $ = new Env('文旅看点');
var request = require("request");
var crypto = require("crypto");
let status;
status = (status = ($.getval("wlstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
let wlhdArr = [],wlcount = ''
let wlhd= $.isNode() ? (process.env.wlhd ? process.env.wlhd : "") : ($.getdata('wlhd') ? $.getdata('wlhd') : "")
//let md5=$.isNode() ? require('./md5') : '';
let wlhds = ""
let Brand ='OPPO'
let Model = 'PCAM00'
let allMessage = '';

const notify = $.isNode() ? require('./sendNotify') : '';
const logs =0;
const host='https://wlkdapi.zhongchuanjukan.com/'
var hours = new Date().getHours();
var s = new Date().getMinutes();

var timestamp = Math.round(new Date().getTime()/1000).toString();
!(async () => {
  if (typeof $request !== "undefined") {
        await wlck()
  } else {
      if(!$.isNode()){
          wlhdArr.push($.getdata('wlhd'))
          let wlcount = ($.getval('wlcount') || '1');
          for (let i = 2; i <= wlcount; i++) {
            wlhdArr.push($.getdata(`wlhd${i}`))
            }
    console.log(`------------- 共${wlhdArr.length}个账号-------------\n`)
      for (let i = 0; i < wlhdArr.length; i++) {
        if (wlhdArr[i]) {
          wlhd = wlhdArr[i];
          $.index = i + 1;
        
          console.log(`\n开始【文旅看点${$.index}】`)

  }
}
      }else  {
          if (process.env.wlhd && process.env.wlhd.indexOf('@') > -1) {
            wlhdArr = process.env.wlhd.split('@');
            console.log(`您选择的是用"@"隔开\n`)
        } else {
            wlhds = [process.env.wlhd]
        };
        Object.keys(wlhds).forEach((item) => {
        if (wlhds[item]) {
            wlhdArr.push(wlhds[item])
        }
    })
          console.log(`共${wlhdArr.length}个cookie`)
	        for (let k = 0; k < wlhdArr.length; k++) {
                $.message = ""
                wlhd = wlhdArr[k]
                $.index = k + 1;
 
          console.log(`\n开始【文旅看点${$.index}】`)
          await sign()
          await signinfo()
await my()
await redpacket()
await receiveRedPacket()
await box()

await share()

await taskinfo()
await videolist()
await articlelist()
await hotinfo()
}

if ($.isNode() && allMessage) {
        await notify.sendNotify(`文旅看点`, `${allMessage}` )
    }
      }
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function wlck() {
   if ($request.url.indexOf("getTodayDetail") > -1) {
  const wlhd = $request.url

if(wlhd)    $.setdata(wlhd,`wlhd${status}`)


$.log(wlhd)
//wlhd = wlhd.match(/loginToken=(.*?)&/)[1] 
//$.log(wlhd)
   $.msg($.name,"",'文旅看点'+`${status}` +'数据获取成功！')
 
}
}

function my() {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"token":"${token}","userid":"${userid}","sysname":"wlkd"}`
$.post(wl('account/getTodayDetail',hd), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
               console.log(`balance_m: ${data.balance_m}`)  
                console.log(`balance: ${data.balance}`) 
                console.log(`todayReward: ${data.todayReward}`) 
                console.log(`total_account: ${data.total_account}`) 
            allMessage += `\nbalance_m: ${data.balance_m}\n`
            allMessage += `\nbalance: ${data.balance}\n`
            allMessage += `\ntodayReward: ${data.todayReward}\n`
            allMessage += `\ntotal_account: ${data.total_account}\n`
               }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function redpacket() {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"token":"${token}","userid":"${userid}","sysname":"wlkd"}`
$.post(wl('activity/redpacket/activityRedPacketData',hd), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
            redPacksStatusList = data.redPacksStatusList
            for(let i= 0;i<redPacksStatusList.length;i++){
             status = redPacksStatusList[i].status
             if(status == 1){
              console.log('新手福利已领：'+redPacksStatusList[i].money)   
             }else 
             if(status == 0){
              console.log('新手福利未领：'+redPacksStatusList[i].money)   
             }
            }
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function receiveRedPacket() {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"token":"${token}","userid":"${userid}","sysname":"wlkd"}`
$.post(wl('activity/redpacket/receiveRedPacket',hd), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
           console.log(data.profit)
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function read(artId) {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"artClassify":0,"artId":"${artId}","sensorX":"-0.030284943","sensorY":"-0.01947778","sensorZ":"-0.038542245","appversion":"2.0.6","appversioncode":"206","brand":"OPPO","channel":"SC_OPPO_A","darkmode":1,"device_userid":"","imei":"","model":"PCAM00","oaid":"-1","optime":${timestamp},"os":"android","osversion":"10","osversioncode":"29","smid":"${smid}","sysname":"wlkd","token":"${token}","userid":"${userid}"}`
$.post(wlread('article/read',hd,md5('bKZ7WjF370'+token+Brand+Model+timestamp+'bKZ7WjF370')), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
           console.log('获得: '+data.profit+' 红豆')
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function video(artId) {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
 
   hd =`{"artClassify":1,"artId":"${artId}","sensorX":"-0.019769112","sensorY":"-0.006024654","sensorZ":"-0.0070554875","appversion":"2.0.6","appversioncode":"206","brand":"OPPO","channel":"SC_OPPO_A","darkmode":1,"device_userid":"","imei":"","model":"PCAM00","oaid":"","optime":${timestamp},"os":"android","osversion":"10","osversioncode":"29","smid":"${smid}","sysname":"wlkd","token":"${token}","userid":"${userid}"}`,
  
  
$.post(wlread('article/read',hd,md5('bKZ7WjF370'+token+Brand+Model+timestamp+'bKZ7WjF370')), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
           console.log('video获得: '+data.profit+' 红豆')
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function box() {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"userid":"${userid}","device_userid":null,"sysname":"wlkd","appversioncode":"206","appversion":"2.0.6","brand":null,"model":null,"token":"${token}","channel":"SC_OPPO_A","optime":${timestamp},"skey":"${randomString(32)}","adv_provider":null,"os":"android","osversion":"10","darkmode":1,"threadid":null,"spread":null,"from":null,"remarks":null,"ip":null,"province":null,"city":null,"hour":null,"date":null,"time":null,"requestid":null,"event":"click","postion":"in","logtype":"inmobile","scene":"任务中心_新手福利红包","evtvalue":0}`
$.post(wl('task/box/init',hd), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
                 
                 console.log(data.taskbox_desc) 
                 console.log(data.taskbox_progress_desc) 
                 
            taskboxs = data.taskboxs
            for(let i= 0;i<taskboxs.length;i++){
             status = taskboxs[i].box_status
             if(status == 2){
              console.log('新手宝箱已领：'+taskboxs[i]['box_profit'])   
             }else 
             if(status == 0){
              console.log('新手宝箱未领：'+taskboxs[i]['box_profit'])   
             }
             if(status == 1){
              await boxprofit('taskbox_one') 
             }
            }
            if(data.timebox['box_status']==1){
             await boxprofit('timebox')   
            }
            console.log(data.timebox['box_code']+' next time: '+data.timebox['count_down']) 
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function boxprofit(box_code) {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"userid":"${userid}","device_userid":null,"sysname":"wlkd","appversioncode":"206","appversion":"2.0.6","brand":null,"model":null,"token":"${token}","channel":"SC_OPPO_A","optime":${timestamp},"skey":"1","adv_provider":null,"os":"android","osversion":"10","darkmode":1,"threadid":null,"spread":null,"from":null,"remarks":null,"ip":null,"province":null,"city":null,"hour":null,"date":null,"time":null,"requestid":null,"event":null,"box_code":"${box_code}"}`
$.post(wl('task/box/profit',hd), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
              
               
               console.log('box：'+data.profit) 
              
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
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
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"token":"${token}","userid":"${userid}","sysname":"wlkd"}`
$.post(wl('usersign/sign',hd), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
              if(data.signstatus==1) {
               
               console.log('签到：'+data.profit) 
              }
             }
             //}
             else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function signinfo() {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"token":"${token}","userid":"${userid}","sysname":"wlkd"}`
$.post(wl('usersign/info',hd), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
              if(data.signstatus==1) {
               console.log(data.signbutton) 
               console.log('明日签到：'+data.signmoney) 
              }
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function taskinfo() {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"token":"${token}","sysname":"wlkd"}`
$.post(wl('task/inread/info',hd), async (err, resp, data) => {
      //console.log(data)  
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
              readTaskData=data.readTaskData
              for(let i=0;i<readTaskData.length;i++){
                  
                  if(readTaskData[i].taskStatus==1){
                      await task(readTaskData[i].taskid)
                  }
              }
               //console.log(data.profit) 
               
              
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function task(taskid) {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
  hd = `{"token":"${token}","taskid":"${taskid}","sysname":"wlkd"}`
$.post(wl('task/inread/account',hd), async (err, resp, data) => {
       //console.log(data)
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
              
               console.log(data.profit) 
               
              
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function articlelist() {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
   oaid = hds.oaid
   smid = hds.smid
  hd = `{"classify":0,"pageNo":1,"pullAction":"footer","sceneType":"taskshare","typeid":"36","appversion":"2.0.6","appversioncode":"206","brand":"OPPO","channel":"SC_OPPO_A","darkmode":1,"device_userid":"","imei":"","model":"PCAM00","oaid":"-1","optime":${timestamp},"os":"android","osversion":"10","osversioncode":"29","smid":"${smid}","sysname":"wlkd","token":"${token}","userid":"${userid}"}`
$.post(wlread('article/list',hd,md5('bKZ7WjF370'+token+Brand+Model+timestamp+'bKZ7WjF370')), async (err, resp, data) => {
       //console.log(data)
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
              //if(data.signstatus==1) {
               artlist = data.artlist
               for(let i= 0;i<artlist.length;i++){
             artId = artlist[i].artId
             ctxData = artlist[i].ctxData
             await share(artId,ctxData)
             await $.wait(40000)
             await read(artId)
            //}
              }
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function videolist() {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
   oaid = hds.oaid
   smid = hds.smid
   
  hd = `{"classify":1,"pageNo":1,"pullAction":"footer","sceneType":"list","typeid":"56","appversion":"2.0.6","appversioncode":"206","brand":"OPPO","channel":"SC_OPPO_A","darkmode":1,"device_userid":"","imei":"","model":"PCAM00","oaid":"","optime":${timestamp},"os":"android","osversion":"10","osversioncode":"29","smid":"${smid}","sysname":"wlkd","token":"${token}","userid":"${userid}"}`
$.post(wlread('article/list',hd,md5('bKZ7WjF370'+token+Brand+Model+timestamp+'bKZ7WjF370')), async (err, resp, data) => {
      // console.log(data)
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
              //if(data.signstatus==1) {
               artlist = data.artlist
               for(let i= 0;i<artlist.length;i++){
             artId = artlist[i].artId
            
             await video(artId)
             await $.wait(40000)
             
            //}
              }
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function share(shareArtId,shareExtra) {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
   oaid = hds.oaid
   smid = hds.smid
  hd = `{"artClassify":0,"artTypeId":"36","shareArtId":"${shareArtId}","shareEntry":"list","shareExtra":"${shareExtra}","sharePackage":"","shareTarget":"timeline","shareType":"article","appversion":"2.0.6","appversioncode":"206","brand":"OPPO","channel":"SC_OPPO_A","darkmode":1,"device_userid":"","imei":"","model":"PCAM00","oaid":"-1","optime":${timestamp},"os":"android","osversion":"10","osversioncode":"29","smid":"${smid}","sysname":"wlkd","token":"${token}","userid":"${userid}"}`
$.post(wlread('share/info',hd,md5('bKZ7WjF370'+token+Brand+Model+timestamp+'bKZ7WjF370')), async (err, resp, data) => {
      //console.log(data)  
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.ret_code==1){
            console.log(data.profitPopUps[0].popTitle)
            console.log(data.profitPopUps[0].profit+data.profitPopUps[0].profitUnit)
             }
             }else if(data.ret_code==0){
             console.log(data.msg_desc)
                 
             }
          //}
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function hotinfo() {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
   oaid = hds.oaid
   smid = hds.smid
   
  hd = `{"appversion":"2.0.6","appversioncode":"206","brand":"OPPO","channel":"SC_OPPO_A","darkmode":1,"device_userid":"","imei":"","model":"PCAM00","oaid":"","optime":${timestamp},"os":"android","osversion":"10","osversioncode":"29","smid":"${smid}","sysname":"wlkd","token":"${token}","userid":"${userid}"}`
$.post(wlread('hottask/info',hd,md5('bKZ7WjF370'+token+Brand+Model+timestamp+'bKZ7WjF370')), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data['ret_code']==1){
           hottasklist = data.taskList
           for(let i =0;i<hottasklist.length;i++){
               if(hottasklist[i].task_btn_onclick=='toProfit'){
                 await hottask(hottasklist[i].task_type)  
               }
           }
             
             }else if(data['ret_code']==0){
             console.log(data['msg_desc'])
                 
             }
          }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function hottask(act_type) {
 return new Promise((resolve) => {
   hds =  JSON.parse(wlhd)
   token =  hds.token
   userid = hds.userid
   oaid = hds.oaid
   smid = hds.smid
   
  hd = `{"act_type":"${act_type}","appversion":"2.0.6","appversioncode":"206","brand":"OPPO","channel":"SC_OPPO_A","darkmode":1,"device_userid":"","imei":"","model":"PCAM00","oaid":"-1","optime":${timestamp},"os":"android","osversion":"10","osversioncode":"29","smid":"${smid}","sysname":"wlkd","token":"${token}","userid":"${userid}"}`
$.post(wlread('hottask/profit',hd,md5('bKZ7WjF370'+token+Brand+Model+timestamp+'bKZ7WjF370')), async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        }// else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data['ret_code']==1){
           console.log(data.profit) 
           
             }else if(data['ret_code']==0){
             console.log(data['msg_desc'])
                 
             }
          }
        
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}



function wl(a,body) {
  return {

    url: `${host}${a}`,
    body:`${body}`,
    headers: {
'Content-Type': 'application/json;charset=UTF-8',
'Host': 'wlkdapi.zhongchuanjukan.com',
'Origin': 'https://wlkdapi.zhongchuanjukan.com',
'Sec-Fetch-Dest': 'empty',
'Sec-Fetch-Mode': 'cors',
'Sec-Fetch-Site': 'same-origin',
'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Mobile Safari/537.36',
'X-Requested-With': 'XMLHttpRequest',

    }
  }
}

function wlread(a,body,sppid) {
    hds =  JSON.parse(wlhd)
    //sppid = hds.sppid
  return {

    url: `${host}${a}`,
    body:`${body}`,
    headers: {
'sppid': sppid,
'Content-Type': 'application/json; charset=UTF-8',
'Host': 'wlkdapi.zhongchuanjukan.com',
'Connection': 'Keep-Alive',
'Accept-Encoding': 'gzip',
'User-Agent': 'okhttp/4.9.0',

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

function md5(s) {
        
         return crypto.createHash('md5').update(String(s)).digest('hex');
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
