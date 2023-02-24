
/*
架设版 
需配合内部群柠檬专用软件架设微信服务器
免除每天一进的烦恼
变量 如
export xjurl='http://127.0.0.1:8805/'
*/
//定时 0 */2 * * * 吧
const $ = new Env('习酒架设版');
var request = require("request");
let status;
status = (status = ($.getval("xjstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let xjhdArr = [],
    xjcount = ''
const notify = $.isNode() ? require('./sendNotify') : '';
//let xjhd = $.isNode() ? (process.env.xjhd ? process.env.xjhd : "") : ($.getdata('xjhd') ? $.getdata('xjhd') : "")

let xjurl = $.isNode() ? (process.env.xjurl ? process.env.xjurl : "") : ($.getdata('xjurl') ? $.getdata('xjurl') : "")
let allMessage = '';
let xjhds = ""
const logs = 0;
const host = 'https://xcx.exijiu.com/'
const host1 = 'https://apimallwm.exijiu.com/'
var hours = new Date().getHours();
var s = new Date().getMinutes();

var timestamp = Math.round(new Date().getTime() / 1000).toString();
!(async () => {
    if (typeof $request !== "undefined") {

    } else {
        if (!$.isNode()) {
            xjhdArr.push($.getdata('xjhd'))
            let xjcount = ($.getval('xjcount') || '1');
            for (let i = 2; i <= xjcount; i++) {
                xjhdArr.push($.getdata(`xjhd${i}`))
            }
            console.log(`------------- 共${xjhdArr.length}个账号-------------\n`)
            for (let i = 0; i < xjhdArr.length; i++) {
                if (xjhdArr[i]) {
                    xjhd = xjhdArr[i];
                    $.index = i + 1;

                }
            }
        } else {
            if (process.env.xjurl && process.env.xjurl.indexOf('@') > -1) {
                xjhdArr = process.env.xjurl.split('@');
                console.log(`您选择的是用"@"隔开\n`)
            } else {
                xjhds = [process.env.xjurl]
            };
            Object.keys(xjhds).forEach((item) => {
                if (xjhds[item]) {
                    xjhdArr.push(xjhds[item])
                }
            })
            console.log(`共${xjhdArr.length}个cookie`)
            for (let k = 0; k < xjhdArr.length; k++) {
                $.message = ""
                xjurl = xjhdArr[k]
                $.index = k + 1;

                console.log(`\n开始【习酒${$.index}】`)
                 await loginurl()
                await hasDataMsCenterUser(xjhd)
                await getJifenShopMemberInfo()

                await getJwt()


            }


        }
    }
    if ($.isNode() && allMessage) {
        await notify.sendNotify(`${$.name}`, `${allMessage}`)
    }
})()
.catch((e) => $.logErr(e))
    .finally(() => $.done())
function loginurl() {
    return new Promise((resolve) => {

        $.get(login(xjurl), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                code = data
                $.log(code)
                await auth()
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function auth() {
    return new Promise((resolve) => {

        $.get(indexapi2(`anti-channeling/public/index.php/api/v2/auth/session?code=${code}`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.code == 0) {
                    xjhd = data.data.login_code
                    console.log(xjhd)

                    

                    } else if (data.code == -1) {
                        console.log(data.msg)

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
function hasDataMsCenterUser() {
    return new Promise((resolve) => {

        $.get(indexapi1(`anti-channeling/public/index.php/api/v2/Member/hasDataMsCenterUser`, xjhd), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.code == 0) {

                        console.log(`刷新:${data.msg}`)



                    } else if (data.code == -1) {
                        console.log(data.msg)

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

function getJifenShopMemberInfo() {
    return new Promise((resolve) => {

        $.get(indexapi(`anti-channeling/public/index.php/api/v2/Member/getJifenShopMemberInfo`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.code == 0) {

                        console.log(`id:${data.data.id}\nintegration:${data.data.integration}\n${data.data['level_name']}`)



                    } else if (data.code == -1) {
                        console.log(data.msg)

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

function getJwt() {
    return new Promise((resolve) => {

        $.get(indexapi(`anti-channeling/public/index.php/api/v2/Member/getJwt`), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.code == 0) {
                        token = data.data.jwt
                        id = data.data.member_id
                        console.log(id)
                        await hasDataMsCenterUser()
                        await makeWineYeast()
                        await gardenmemberwine()
                        await info()
                        await member()
                        await signin()
                        await dailySign()
                        await Gardenquestiontask()
                        await dailyShare()
                        await $.wait(1000)
                        await dailyShare()
                        await $.wait(1000)
                        await dailyShare()

                        await realscene()
                        //await sorghum()
                        for (let i = 0; i < 1; i++) {
                            await watering()
                            await manuring()
                        }
                        await sorghumindex()


                        //await extend(2)
                    } else if (data.code == -1) {
                        console.log(data.msg)

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

function signin() {
    return new Promise((resolve) => {

        $.post(xjpost(`member/signin/sign`, 'from=miniprogram_index', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("signin：" + data.msg)



                    } else if (data.err !== 0) {
                        console.log("signin：" + data.msg)

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

function dailySign() {
    return new Promise((resolve) => {

        $.post(xjpost(`garden/sign/dailySign`, '', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("dailySign：" + data.data.tips + data.msg)



                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function Gardenquestiontask() {
    return new Promise((resolve) => {

        $.get(xjget(`garden/Gardenquestiontask/index`, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {
                        ansid = data.data[0].id
                        answer = data.data[0].answer

                        console.log(data.data[0].title)
                        console.log("答案为：" + answer)
                        await answerResults(ansid, answer)

                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function answerResults(a, b) {
    return new Promise((resolve) => {

        $.get(xjget(`garden/Gardenquestiontask/answerResults?answer=%5B%7B%22itemid%22%3A${a}%2C%22selected%22%3A%22${b}%22%7D%5D`, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("答题：" + data.msg)


                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function dailyShare() {
    return new Promise((resolve) => {

        $.post(xjpost(`garden/gardenmemberinfo/dailyShare`, '', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("分享：" + data.msg)


                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function realscene() {
    return new Promise((resolve) => {

        $.get(xjget(`garden/realscene/reward`, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("查看：" + data.msg)


                    } else if (data.err !== 0) {
                        console.log("查看：" + data.msg)

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

function sorghum(id, type) {
    return new Promise((resolve) => {

        $.post(xjpost(`garden/sorghum/seed`, '{"id":' + id + ',"type":' + type + '}', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {
                        console.log("种植：" + data.msg)
                        console.log("施肥次数:" + data.data['manure_num'])
                        console.log("浇水次数：" + data.data['water_num'])
                        //type = data.data[0].type
                        //if(type == 1){
                        // await harvest()  
                        //}
                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function watering() {
    return new Promise((resolve) => {

        $.post(xjpost(`garden/sorghum/watering`, '{"id":772352}', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {
                        console.log(data.msg)
                        console.log("施肥次数:" + data.data['manure_num'])
                        console.log("浇水次数：" + data.data['water_num'])
                        type = data.data.type
                        if (type == 1) {
                            await harvest()
                        }
                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function manuring() {
    return new Promise((resolve) => {

        $.post(xjpost(`garden/sorghum/manuring`, '{"id":772352}', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {
                        console.log(data.msg)
                        console.log("施肥次数:" + data.data['manure_num'])
                        console.log("浇水次数：" + data.data['water_num'])
                        type = data.data.type
                        if (type == 1) {
                            await harvest()
                        }
                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function harvest(id) {
    return new Promise((resolve) => {

        $.post(xjpost(`garden/sorghum/harvest`, '{"id":' + id + '}', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {
                        console.log(data.msg)


                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function sorghumindex() {
    return new Promise((resolve) => {

        $.get(xjget(`garden/sorghum/index`, token), async (err, resp, data) => {
            // $.log(data)  
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {
                        list = data.data
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].status != -1) {
                                $.log(list[i].serial_number + "号田下次成熟时间：" + list[i]['crop_time'])
                                typeid = list[i].id
                                // await harvest(typeid)
                                if (xiaomai < 0) {
                                    await sorghum(list[0].id, 2)
                                    await sorghum(typeid, 1)
                                } else
                                    await sorghum(typeid, 1)
                                await all()
                                //await $.wait(3000)
                                // await sorghum(typeid,2)
                                // await sorghum(typeid,3)
                            }
                            //else 
                            //if(list[i].status == -1){
                            //await sorghum(typeid,1)
                            //await $.wait(3000)
                            //await sorghum(typeid,2)  

                            //}
                        }


                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function extend(id) {
    return new Promise((resolve) => {

        $.post(xjpost(`garden/sorghum/extend`, '{"serial_number":' + id + '}', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {
                        console.log(data.msg)


                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function gardenmemberwine() {
    return new Promise((resolve) => {

        $.get(xjget(`garden/gardenmemberwine/index `, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {
                        if (data.total == 1) {
                            console.log("酿酒成熟时间：" + data.data[0].crop_time)
                            console.log('ID: ' + data.data[0].id)
                            if (data.data[0].status == 4) {
                                console.log('已成熟 可以收取')
                                status = data.data[0].status
                                await harvestWine(data.data[0].id)
                            }
                        } else console.log('还未酿酒')
                        await makeWine()
                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function harvestWine(a) {
    return new Promise((resolve) => {

        $.get(xjget(`garden/gardenmemberwine/harvestWine?id=${a}`, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("收取：" + data.msg)
                        await makeWine()

                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function harvestWine(a) {
    return new Promise((resolve) => {

        $.get(xjget(`garden/gardenmemberwine/harvestWine?id=${a}`, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("收取：" + data.msg)
                        await makeWine()

                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function member() {
    return new Promise((resolve) => {

        $.get(xjget(`member/recommend/personal_center?phone_no=17683989907`, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {


                    } else if (data.err !== 0) {


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

function all() {
    return new Promise((resolve) => {

        $.get(xjget(`garden/Sorghum/harvestAll`, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("收取：" + data.msg)


                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function makeWineYeast() {
    return new Promise((resolve) => {

        $.post(xjpost1(`garden/wheat/makeWineYeast`, 'volumn=100', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("收取：" + data.msg)


                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function makeWine() {
    return new Promise((resolve) => {

        $.post(xjpost1(`garden/gardenmemberwine/makeWine`, 'volumn=200', token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log("收取：" + data.msg)


                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function info() {
    return new Promise((resolve) => {

        $.get(xjget(`garden/Gardenmemberinfo/getMemberInfo`, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {
                        jiuqu = data.data['wine_yeast']
                        xiaomai = data.data.wheat
                        gaoliang = data.data.sorghum
                        console.log('积分:' + data.data.integration)
                        console.log('高粱:' + data.data.sorghum)
                        console.log('小麦:' + data.data.wheat)
                        console.log('酒曲:' + data.data['wine_yeast'])
                        console.log('酒:' + data.data.wine)
                        if (data.data.wine > 0) {
                            await exchange(data.data.wine)
                        }


                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function exchange(a) {
    return new Promise((resolve) => {

        $.get(xjget(`garden/Gardenjifenshop/exchange?wine=${a}`, token), async (err, resp, data) => {

            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data);
                    if (data.err == 0) {

                        console.log('积分:' + data.msg)

                    } else if (data.err !== 0) {
                        console.log(data.msg)

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

function indexapi1(a, token) {
    return {

        url: `${host}${a}`,

        headers: {
            'Host': 'xcx.exijiu.com',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat',
            'content-type': 'application/json',
            'login_code': xjhd,
            'Authorization': token,
            'Referer': 'https://servicewechat.com/wx489f950decfeb93e/195/page-frame.html',
            'Accept-Encoding': 'gzip, deflate',

        }
    }
}

function indexapi(a, body) {
    return {

        url: `${host}${a}`,

        headers: {
            'Host': 'xcx.exijiu.com',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat',
            'content-type': 'application/json',
            'login_code': xjhd,
            'Referer': 'https://servicewechat.com/wx489f950decfeb93e/195/page-frame.html',
            'Accept-Encoding': 'gzip, deflate',

        }
    }
}
function indexapi2(a) {
    return {

        url: `${host}${a}`,

        headers: {
            'Host': 'xcx.exijiu.com',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat',
            'content-type': 'application/json',
            'Referer': 'https://servicewechat.com/wx489f950decfeb93e/195/page-frame.html',
            'Accept-Encoding': 'gzip, deflate',

        }
    }
}
function xjget(a, token) {
    return {

        url: `${host1}${a}`,
        headers: {
            'Host': 'apimallwm.exijiu.com',
            'Connection': 'keep-alive',
            'Authorization': token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://mallwm.exijiu.com/',
            'Accept-Language': 'en-us,en',
            'Accept-Encoding': ' gzip, deflate',
            'login_code': xjhd,
        }
    }
}
function login(a) {
    return {

        url: `${a}wx489f950decfeb93e`,
        headers: {

            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat',

        }
    }
}
function xjpost(a, b, token) {
    return {

        url: `${host1}${a}`,
        body: `${b}`,
        headers: {
            'Host': 'apimallwm.exijiu.com',
            'Connection': 'keep-alive',
            'Authorization': token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat',
            'Content-Type': 'application/json, text/plain, */*',
            'Accept': '*/*',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://mallwm.exijiu.com/',
            'Accept-Language': 'en-us,en',
            'Accept-Encoding': ' gzip, deflate',
            'login_code': xjhd,
        }
    }
}

function xjpost1(a, b, token) {
    return {

        url: `${host1}${a}`,
        body: `${b}`,
        headers: {
            'Host': 'apimallwm.exijiu.com',
            'Connection': 'keep-alive',
            'Authorization': token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://mallwm.exijiu.com/',
            'Accept-Language': 'en-us,en',
            'Accept-Encoding': ' gzip, deflate',
            'login_code': xjhd,
        }
    }
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

function Env(t, e) {
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
                const [o, h] = i.split("@"), a = {
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
                this.post(a, (t, e, i) => s(i))
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
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
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
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
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