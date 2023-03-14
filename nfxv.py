# 微信阅读
# 需要青龙环境或者python3环境
#入口微信打开-->https://api.shanghaiqiye.top:10262/yunonline/v1/auth/5f31c1c01403a360293b8f90986e8df6?codeurl=shanghaiqiye.top:10262&codeuserid=2&time=1678608022
#入口为邀请链接，目前没有找到不是邀请的入口
# 抓包首页 找到 https://erd.z7m.top:10254/yunonline/v74636/redirect/5f31c1c01403a360293b8f90986e8df6?openid=xxxx&unionid=xxxxx 中的openid(第一个xxxx)和 unionid(第二个xxxx)
# 或者电脑微信打开入口，点击转浏览器或者复制链接按钮，找到链接中的中openid和unionid
#157行nurl=’xxxx‘ xxxx就是你主页的域名比如：https://erd.z7m.top:10254  ，因为经常发生变化请根据你的实际情况填写
# 填写unionid在脚本60行的ucg内 ,填写方式 ucg=[{'unionid': 'xxxx','openid':'xxxx'},],多账户填写--> ucg=[{'unionid': 'xxxx','openid':'xxxx'},{'unionid': 'xxxx','openid':'xxxx'},]
#提现时间145行代码改默认22点
# 目前无验证文章，不清楚之后有没有，运行脚本之前建议先手动看两三篇，建议不要凌晨跑 建议每两小时一次 0 8-22/2 * * *
import requests
import time
import random
from urllib import parse
import re

class WXYD:
    def __init__(self, cg):
        self.cg = cg
        self.unionid = cg.get('unionid')
        self.openid=cg.get('openid')
        self.myIndexUrl=f'{nurl}/yunonline/v{random.randint(10000,99999)}/redirect/{self.openid}?unionid={self.unionid}'
        self.Host=nurl.replace('https://','')
        self.headers = {
            'Host': self.Host,
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309001c) XWEB/6500',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': nurl,
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': self.myIndexUrl,
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh',
        }
        self.get_request_id_secret()
        print('初始化完成')
    def get_request_id_secret(self):
        r = requests.get(self.myIndexUrl, headers=self.headers)
        html = r.text
        res = re.sub('\s', '', html)
        request_id_list = re.findall('&request_id=(.*?)&', res)
        if request_id_list == []:
            self.request_id = '90466bea6e1716352e751e49f11279aa'
        else:
            self.request_id = request_id_list[0]
        secret_list = re.findall('varsecret="(.*?)"', res)
        if secret_list == []:
            print('初始化失败，获取secret参数异常')
            print('请检查unionid和mycode参数是否填写正确')
            exit(0)
        else:
            self.secret =secret_list[0]
        #print(self.request_id,self.secret)
    def do_read(self):
        u = f'{nurl}/yunonline/v1/task'
        p = f'secret={self.secret}&type=read'
        r = requests.post(u, headers=self.headers, data=p)
        print(r.text)
        rj = r.json()
        errcode = rj.get('errcode')
        msg = rj.get('msg')
        if errcode == 0:
            print(msg)
            zturl = rj.get('data').get('link')
            parsed_result = parse.urlparse(str(zturl))
            self.query_dic = parse.parse_qs(parsed_result.query)
            print(self.query_dic)
            redirect_uri = self.query_dic.get('redirect_uri')
            if redirect_uri == None:
                print('遇到了验证文章')
                
                return True
            parsed_result = parse.urlparse(redirect_uri[0])
            query_dic = parse.parse_qs(parsed_result.query)
            key = query_dic.get('key')
            state = self.query_dic.get('state')
            self.jump(key[0], state[0])
            ts = random.randint(7, 15)
            print(f'本次模拟读{ts}秒')
            time.sleep(ts)
            self.add_gold(ts)
        elif errcode == 409:
            print('本轮已经读完')
            t = round(int(msg) / 60, 2)
            print('下次阅读时间：', t)
            return True
        else:
            print(r.json())
            return True

    def jump(self, key, state):
        u = 'https://yapi.cdn918.com/yunonline/v1/jump'
        h = {
            'Host': 'yapi.cdn918.com',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309001c) XWEB/6500',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh',
        }
        p = f'key={key}&unionid={self.unionid}&code=081oLwFa1L24WE0bvOIa1Z6Bk20oLwF0&state={state}'
        r = requests.get(u, headers=h, params=p)

    def add_gold(self, ts):
        u = f'https://erd.n3w.top:10266/yunonline/v1/add_gold'
        p = f'unionid={self.unionid}&time={ts}'
        r = requests.post(u, headers=self.headers, data=p)
        print(r.text)

    def gold(self):
        u = f'{nurl}/yunonline/v1/gold?'
        p = f'unionid={self.unionid}&time={int(time.time())}000'
        r = requests.get(u, headers=self.headers, params=p)
        time.sleep(random.randint(2, 5))
        print(r.text)
        rj = r.json()
        data = rj.get('data')
        remain_read = data.get('remain_read')
        day_gold = data.get('day_gold')
        self.last_gold = data.get('last_gold')
        print(f'今日剩余阅读{remain_read},当前收益{day_gold}金币')
        if remain_read == 0: return True
    def tx(self):
        if int(self.last_gold)<3000:
            print('提现金币必须大于3000')
            return False
        gold=int(int(self.last_gold)/1000)*1000
        u1 = f'{nurl}/yunonline/v1/user_gold'
        p1 = f'unionid={self.unionid}&request_id={self.request_id}&gold={gold}'
        r1 = requests.post(u1, headers=self.headers, data=p1)
        #print(r1.text)
        print(r1.json())
        u2 = f'{nurl}/yunonline/v1/withdraw'
        p2 = f'unionid={self.unionid}&request_id={self.request_id}&ua=2'
        r2 = requests.post(u2, headers=self.headers, data=p2)
        # print(r2.text)
        print(r2.json())

    def run(self):
        g = self.gold()
        if time.localtime().tm_hour == 22:#提现时间
            self.tx()
        if g == True: return True
        time.sleep(random.randint(5, 7))
        for i in range(1, 40):
            if self.do_read() == True:
                print(f'第{i}次')
                print('-' * 40)
                return True
            print(f'第{i}次')
            print('-' * 40)

if __name__ == '__main__':
    nurl='https://erd.z7m.top:10254'#根据你抓到的实际url填写
    ucg = [
        {'unionid': 'xxxx','openid':'xxxx'},
    ]
    for cg in ucg:
        api = WXYD(cg)
        api.run()