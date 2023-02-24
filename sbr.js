/*
�ղ�����Ա����  С���� 
cron 10 7 * * *  sbr.js

7.13   		��� ǩ��, ͵����, ������� ����
10.11		���³齱
12.24		���� yml2213-utils ����

------------------------  ����--�����ļ�-���ĸ�������  ---------------------- 
# �ղ���
export sbr=" token & cookie @ token & cookie "

ץ  api/login/auto-login  �еĲ���   token   ��cookie
���˺��� ���� �� @ �ָ�

������Լ����� utils.js  ���ڽű�ͬ��Ŀ¼��
������Լ����� utils.js  ���ڽű�ͬ��Ŀ¼��
������Լ����� utils.js  ���ڽű�ͬ��Ŀ¼��

tgƵ��: https://t.me/yml2213_tg  

*/

const $ = new Env("�ղ���");
const alias_name = "sbr";
const utils = require("yml2213-utils");

const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			//0Ϊ�ر�֪ͨ,1Ϊ��֪ͨ,Ĭ��Ϊ1
//---------------------------------------------------------------------------------------------------------
let ckStr = process.env[alias_name];
let msg, ck;
let ck_status = 1;
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.4";
let Change = "\n������Լ����� yml2213-utils ����";
let thank = `\n��л ������нű�\n`;
//---------------------------------------------------------------------------------------------------------

async function tips(ckArr) {
	// let Version_latest = await Version_Check(alias_name, '1');
	let Version = `\n?? ���ؽű�: V ${VersionCheck}`;
	DoubleLog(`${Version}\n?? ?? ��������: ${Change}`);
	// DoubleLog(`${thank}`);
	await utils.yiyan()
	DoubleLog(`\n========== ���ҵ� ${ckArr.length} ���˺� ==========`);
}

async function start() {
	const sbr = new Sbr(ck[0], ck[1]);
	await sbr.init("��ʼ��");
	await sbr.login("��¼ˢ��");
	await sbr.user_info("�û���Ϣ");
	if (ck_status) {
		await sbr.sign_info("ǩ����ѯ");
		await sbr.task_list("�����б�");
		await sbr.prize_Info("�齱��Ϣ");
		await sbr.get_index_info("��ȡ����ȡ������Ϣ");
		await sbr.rice_num("��ѯ��������");
	}
}

let host, hostname, apiname, sbr_hd, _id, _list, _id_list, num, collect_name;
class Sbr {
	constructor(token, cookie) {
		this.token = token;
		this.cookie = cookie;
	}
	// ��ʼ��
	async init(name) {
		if (!name) {
			name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
		}
		DoubleLog(`\n��ʼ ${name}`);
		host = "growrice.supor.com";
		hostname = "https://" + host;
		apiname = `${hostname}/rice/backend/public/index.php/api`
		sbr_hd = {
			"Content-Type": "application/x-www-form-urlencoded",
			'Host': this.host,
			'Cookie': this.cookie,
		}
	}

	// ��¼    post
	async login(name) {
		let options = {
			method: "get",
			url: `${apiname}/login/auto-login?token=${this.token}`,
			headers: sbr_hd,
		};
		let result = await httpResult(name, options);
	}

	// �û���Ϣ   httpGet
	async user_info(name) {

		let options = {
			method: "get",
			url: `${apiname}/users/get-user-info`,
			headers: sbr_hd,
		};
		let result = await httpResult(name, options);

		if (result.code == 1) {
			DoubleLog(`${name}: ${result.msg} , ��ӭ ${result.data.nickname}`);
			await utils.wait(2);
		} else if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}`);
			ck_status = 0
		} else {
			DoubleLog(`${name}: ʧ�� ? ����,ԭ��δ֪!`);
			console.log(result);
			ck_status = 0
		}
	}

	// ǩ����Ϣ   get
	async sign_info(name) {
		let options = {
			method: "get",
			url: `${apiname}/signIn/sign-list`,
			headers: sbr_hd,
		};
		let result = await httpResult(name, options);

		if (result.data.is_sign == false) {
			DoubleLog(`${name}: δǩ�� ,ȥǩ���!`);
			await this.do_sign("ǩ��")
		} else if (result.data.is_sign == true) {
			DoubleLog(`${name}: ��ǩ��, ����������!`);
		} else {
			DoubleLog(`${name}: ʧ�� ? ����,ԭ��δ֪!`);
			console.log(result);
		}
	}



	// ǩ��    post
	async do_sign(name) {
		let options = {
			method: "post",
			url: `${apiname}/signIn/sign`,
			headers: sbr_hd,
			body: `https://growrice.supor.com/rice/backend/public/index.php/api/signIn/sign`,
		};
		let result = await httpResult(name, options);

		if (result.code == 1) {
			DoubleLog(`${name}:${result.msg} ,��� ${result.data.get_rice_num} ����`);
			await utils.wait(3);

		} else if (result.code == 0) {
			DoubleLog(`${name}:${result.msg}`);
		} else {
			DoubleLog(`${name}: ʧ��?����`);
			console.log(result);
		}
	}


	// �����б�    get   
	async task_list(name) {
		let options = {
			method: "get",
			url: `${apiname}/task/index`,
			headers: sbr_hd,
		};
		let result = await httpResult(name, options);


		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}:${result.msg}`);
			let tasks = result.data
			for (let index = 0; index < tasks.length; index++) {
				let _id, name, is_finish
				[_id, name, is_finish] = [tasks[index].id, tasks[index].name, tasks[index].is_finish]

				if (_id == 6 && is_finish == false) {
					await this.get_rice("͵����")
				} else if (_id == 6 && is_finish == true) {
					DoubleLog(`�����޷�͵������, ����������!`)
				}
				if (_id == 8 && tasks[index].list[0].is_finish == false) {
					await this.browse_recipes("�������")
				} else if (_id == 8 && tasks[index].list[0].is_finish == true) {
					DoubleLog(`������� ������� ��, ����������!`)
				}


			}
		} else if (result.code == 0) {
			DoubleLog(`${name}:${result.msg}`);
		} else {
			DoubleLog(`${name}: ʧ��?����`);
			console.log(result);
		}
	}

	// ͵���Ѵ���
	async get_rice(name) {
		await this.get_id("��ȡ���Ѵ���id")
		for (let index = 0; index < _id_list.length; index++) {
			let _id = _id_list[index]
			let options = {
				method: "post",
				url: `${apiname}/users/get-rice`,
				headers: sbr_hd,
				body: `&friend_id=${_id}`,
			};
			let result = await httpResult(name, options);

			if (result.code == 1) {
				DoubleLog(`${name}:${result.msg} , ��ǰ���� ${result.data.sign_rice_num} ����`);
				await utils.wait(5);
			} else if (result.code == 0) {
				DoubleLog(`${name}:${result.msg}`);
			} else {
				DoubleLog(`${name}: ʧ��?����`);
				console.log(result);
			}

		}

	}


	// ��ȡ���Ѵ���id
	async get_id(name) {
		let options = {
			method: "get",
			url: `${apiname}/users/same-city-list`,
			headers: sbr_hd,
		};
		let result = await httpResult(name, options);

		// console.log(result);
		if (result.code == 1) {
			_list = result.data
			// console.log(_list);

			let arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			let out = [];
			for (let i = 0; i < 3; i++) {
				var index = parseInt(Math.random() * arr1.length);
				out = out.concat(arr1.splice(index, 1));
			}
			// console.log(out);
			_id_list = []
			for (let index = 0; index < out.length; index++) {
				let _id = _list[out[index]].id
				_id_list.push(_id)
			}
			// console.log(_id_list);

			return _id_list;
		} else {
			DoubleLog(`${name}: ʧ��?����`);
			console.log(result);
		}
	}

	// �������  https://growrice.supor.com/rice/backend/public/index.php/api/task/link-task
	async browse_recipes(name) {
		let options = {
			method: "post",
			url: `${apiname}/task/link-task`,
			headers: sbr_hd,
			body: `&id=8&other_id=3`,
		};
		let result = await httpResult(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}:${result.msg}`);
			await utils.wait(3)
		} else {
			DoubleLog(`${name}: ʧ��?����`);
			console.log(result);
		}
	}

	// ��ȡ����ȡ������Ϣ		get
	async get_index_info(name) {
		let options = {
			method: "get",
			url: `${apiname}/index/index`,
			headers: sbr_hd,
		};
		let result = await httpResult(name, options);

		// console.log(result);
		let rice_list = result.data.rice_list
		if (result.code == 1 && rice_list.length > 0) {
			for (let index = 0; index < rice_list.length; index++) {
				[_id, num, collect_name] = [rice_list[index].id, rice_list[index].num, rice_list[index].name]
				await this.collect_rice("�մ���", _id, num, collect_name)
			}
		} else if (result.code == 1 && rice_list.length == 0) {
			DoubleLog(`${name}, û�п����ջ�Ĵ���`)

		} else if (result.code == 2) {
			DoubleLog(`${result['msg']}, ���Լ��ȴ�һ��С����,�ִ��׺���ִ�нű�!`)
		} else {
			DoubleLog(`${name}: ʧ��?����`);
			console.log(result);
		}
	}

	// �մ���
	async collect_rice(name, _id, num, collect_name) {
		let options = {
			method: "post",
			url: `${apiname}/index/collect-rice`,
			headers: sbr_hd,
			body: `&id=${_id}`,
		};
		let result = await httpResult(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}: ��ȡ ${collect_name} ${num} ����, ${result.msg}`);
			await utils.wait(5)
		} else if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}`);
		} else {
			DoubleLog(`${name}: ʧ��?����`);
			console.log(result);
		}
	}

	// �齱��Ϣ		get
	async prize_Info(name) {
		let options = {
			method: "get",
			url: `${apiname}/prize/index`,
			headers: sbr_hd,
		};
		let result = await httpResult(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}, �齱ȯ${result.data.draw_num_1}��, �߼��齱ȯ${result.data.draw_num_2}��`)
			if (result.data.draw_num_1 > 0) {
				await this.prize('��ͨ�齱', '1')
			}
			if (result.data.draw_num_2 > 0) {
				await this.prize('�߼��齱', '2')
			}
			if (result.data.draw_num_1 == 0 && result.data.draw_num_2 == 0) {
				DoubleLog(`${name}����ʱ�޳齱������`)
			}

		} else {
			DoubleLog(`${name}: ʧ��?����`);
			console.log(result);
		}
	}

	// �齱  https://growrice.supor.com/rice/backend/public/index.php/api/prize/draw
	async prize(name, type) {
		let options = {
			method: "post",
			url: `${apiname}/prize/draw`,
			headers: sbr_hd,
			body: `cate=${type}`,
		};
		let result = await httpResult(name, options);

		// console.log(result);
		if (result.code == 1) {
			let prize_info = result.data.prize_info
			DoubleLog(`${name}: ��� ${prize_info.prize_name} , ��Ʒid: ${prize_info.prize_id}, ��Ʒ����: ${prize_info.prize_type}, ��Ʒ����: ${prize_info.prize_value}`);
			await utils.wait(5)
			await this.prize_Info('�齱��Ϣ')
		} else if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}`);
			await this.prize_Info('�齱��Ϣ')
		} else {
			DoubleLog(`${name}: ʧ��?����`);
			console.log(result);
		}
	}


	// ��ѯ��������		get   https://growrice.supor.com/rice/backend/public/index.php/api/index/granary?&page=1&pagesize=10
	async rice_num(name) {
		let options = {
			method: "get",
			url: `${apiname}/index/granary?&page=1&pagesize=10`,
			headers: sbr_hd,
		};
		let result = await httpResult(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}, ������${result.data.rice_num} ���� , �ۼƻ�ȡ ${result.data.total_num} ����`)
		} else {
			DoubleLog(`${name}: ʧ��?����`);
			console.log(result);
		}
	}


}















// #region ********************************************************  �̶�����  ********************************************************

/**
 * �˺Ŵ���
 */
!(async () => {
	let ckArr = await utils.checkEnv(ckStr, alias_name);
	await tips(ckArr);
	for (let index = 0; index < ckArr.length; index++) {
		let num = index + 1;
		DoubleLog(`\n-------- ��ʼ���� ${num} ���˺š�--------`);
		ck = ckArr[index].split("&");
		await start();
	}
	await SendMsg(msg);
})()
	.catch((e) => console.log(e))
	.finally(() => $.done());


	function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n??${this.name}, ��ʼ!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n??${this.name}, ����! ?? ${s} ��`); } })(name, e); } async function httpResult(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`δ֪����(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }
//#endregion