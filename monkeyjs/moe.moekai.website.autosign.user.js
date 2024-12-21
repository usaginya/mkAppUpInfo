// ==UserScript==
// @name         常用网站自动签到
// @namespace    moe.moekai.website.autosign
// @version      0.9
// @description  每天打开常用的网站时自动签到特定的网站
// @author       YIU
// @icon         https://www.hfday.com/favicon.ico
// @match        *://www.baidu.com/s?*
// @match        *://bbs.ikfol.com/index.php*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {

	const getDomain = (url) => new URL(url).hostname.split('.').slice(-2).join('.');

	const logInfo = (siteName, color = '#555') => {
		console.log(`%c[常用网站自动签到] - ${siteName}`, `font-family:"Microsoft yahei";font-size:13pt;color:${color}`);
	};

	const warnInfo = (siteName) => {
		console.warn(`[${siteName}签到失败] 登录${siteName}失败！快去${siteName}登录吧！`);
	};

	const signWebsite = {};


	//-- 绅士之庭 --
	signWebsite.gmgard = {

		siteName: '绅士之庭',

		signResult: {},
		signResultTable: [],

		setSignResult: function (state, day = 0, lollipop = 0) {
			this.signResult.签到状态 = state;
			this.signResult.连续签到天数 = day;
			this.signResult.现有棒棒糖数 = lollipop;
		},

		printSignResult: function () {
			this.signResultTable.push(this.signResult);
			console.table(this.signResultTable);
		},

		checkUrl: [{
			url: 'https://gmgard.moe/Rank'
		},
				   {
					   url: 'https://hggard.com/Rank'
				   },
				   {
					   url: 'https://gmgard.com/Rank'
				   }
				  ],

		signUrl: [{
			url: 'https://gmgard.moe/api/PunchIn/Do',
			method: 'POST',
			data: '{}',
			headers: {
				'Content-Type': 'application/json'
			}
		},
				  {
					  url: 'https://hggard.com/api/PunchIn/Do',
					  method: 'POST',
					  data: '{}',
					  headers: {
						  'Content-Type': 'application/json'
					  }
				  },
				  {
					  url: 'https://gmgard.com/api/PunchIn/Do',
					  method: 'POST',
					  data: '{}',
					  headers: {
						  'Content-Type': 'application/json'
					  }
				  }
				 ],

		checkAction: function (response) {
			return response.responseText.indexOf('logusername') > -1;
		},

		signAction: function (response, results) {
			try{
				let that = results.site;
				let jobj = JSON.parse(response.responseText);
				let day = jobj.ConsecutiveDays != undefined ? jobj.ConsecutiveDays : 0;
				let lollipop = jobj.Points != undefined ? jobj.Points : 0;

				if (response.responseText.indexOf('success":true') > -1) {
					that.setSignResult('签到成功', day, lollipop);
				} else {
					let errMsg = jobj.ErrorMessage != undefined ? jobj.ErrorMessage : (jobj.title != undefined ? jobj.title : '未知错误');
					that.setSignResult('签到失败：' + errMsg, day, lollipop);
				}
			} catch(err){
				console.error('签到过程失败：', response.responseText, err);
			}
		}
	};

	//--- Fantia ---
	signWebsite.fantia = {};

	//=== 下面 uid= 后面的数字改为要支持的作者ID ===
	signWebsite.fantia.uid = 3123; //24531;
	//=========================================================

	Object.assign(signWebsite.fantia, {
		siteName: 'Fantia',
		logInfoColor: '#8b5',

		signResult: {},
		signResultTable: [],

		setSignResult: function (state, fId = 0, point = 0) {
			this.signResult.加支持点状态 = state ? state : this.signResult.加支持点状态;
			this.signResult.支持的作者ID = fId;
			this.signResult.总共加点数 = point;
		},

		printSignResult: function () {
			this.signResultTable.push(this.signResult);
			console.table(this.signResultTable);
		},

		checkUrl: [{
			url: 'https://fantia.jp/posts/likes'
		}],

		signUrl: [{
			url: `https://fantia.jp/api/v1/fanclub/${signWebsite.fantia.uid}/give_login_bonus`,
			headers: {
				"Referer": `https://fantia.jp/fanclubs/${signWebsite.fantia.uid}`
            }
		},
				  {
					  url: `https://fantia.jp/api/v1/me/fanclub_support_status/${signWebsite.fantia.uid}`
        }
				 ],

		checkAction: function (response) {
			return response.responseText.indexOf('sessions/signin') < 0;
		},

		signAction: function (response, results) {
			const that = results.site;
			const mapAction = new Map([
				[0, function () {
					that.setSignResult(response.status == 200 ? "加支持点成功" : "加点失败：今日支持点已用完");
					return true;
				}],
				[1, function () {
					let point = 0;
					if (response.status == 200) {
						let jobj = JSON.parse(response.responseText);
						point = jobj.support_point != undefined ? jobj.support_point : point;
					}
					that.setSignResult(null, that.uid, point);
				}]
			]);

			return mapAction.get(results.index)();
		}
	});


	//------------------------- 不需要修改下面的代码 ----------------------------

	async function StartSign() {

		for (let i in signWebsite) {
			new Promise(async resolve => {
				let site = signWebsite[i];

				let checked = true;
				let checkedSiteUrl;

				// check
				for (let i in site.checkUrl) {
					let checkSite = site.checkUrl[i];

					if (!checked || !checkSite.url) {
						checked = true;
						continue;
					}

					await RequestSign(site, checkSite, site.checkAction, i)
						.then(function (result) {
						checked &= result;
					});

					if (checked) {
						checkedSiteUrl = checkSite.url;
						break;
					}
				}

				// sign
				if (!checked) {
					logInfo(site.siteName, site.logInfoColor);
					warnInfo(site.siteName);
					resolve();
				}

				for (let i in site.signUrl) {
					let signSite = site.signUrl[i];

					if (!signSite.url || getDomain(signSite.url) != getDomain(checkedSiteUrl)) {
						continue;
					}

					await RequestSign(site, signSite, site.signAction, i)
						.then(function (result) {
						if (result) {
							return;
						}
						logInfo(site.siteName, site.logInfoColor);
						site.printSignResult();
					});
				}
			});
		}

	}


	function RequestSign(site, urlItem, action, index) {
		let requestArgs = {
			method: 'GET'
		};

		let headers = urlItem.headers ? urlItem.headers : {};
		Object.assign(headers, {
			'Cookie': `name=value;domain=.${getDomain(urlItem.url)}`
        });

		return new Promise(resolve => {
			Object.assign(
				requestArgs,
				urlItem, {
					headers: headers,
					timeout: 8000,
					onload: function (response) {
						resolve(action(response, {
							site: site,
							index: parseInt(index)
						}));
					},
					ontimeout: function () {
						console.warn(site, 'sign failed - timeout');
						resolve(()=> false);
					},
					onabort: function () {
						console.warn(site, 'sign failed - abort');
						resolve(()=> false);
					},
					onerror: function (e) {
						console.error ('sign failed - error ', e);
						resolve(()=> false);
					}
				});

			GM_xmlhttpRequest(requestArgs);
		});
	}

	StartSign();

})();