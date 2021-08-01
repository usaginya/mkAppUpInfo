// ==UserScript==
// @name         文文錄影机
// @namespace    https://cdn.jsdelivr.net/gh/usaginya/mkAppUpInfo@master/monkeyjs/moe.moekai.aya.videorecorder.user.js
// @version      1.3
// @description  支持各种网页视频/直播錄影，跨域视频不能錄影，錄影时不能静音、保存格式仅有webm、錄高分辨率需要更高性能。
// @author       YIU
// @include      *
// @icon         https://moest.top/favicon.ico
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @license      GPL-3.0 License
// @compatible   chrome OK
// @compatible   firefox OK
// @supportURL   https://github.com/usaginya/mkAppUpInfo/tree/master/monkeyjs
// @homepageURL  https://github.com/usaginya/mkAppUpInfo/tree/master/monkeyjs
// ==/UserScript==

//- 可以使用下面的ffmpeg命令直接转换格式为mp4（非标准mp4）
//ffmpeg -i downloadedVideo.webm -strict -2 -c copy output.mp4

//- 转为一般恒定mp4（二次转换，crf数值越小，视频体积越大质量越好，一般为21左右）
//ffmpeg -i downloadedVideo.webm -crf 16 output.mp4

(function () {
	'use strict';

	//VV 全局变量定义 ---
	let gmMenuMimeTypeId;
	let gmMenuButtonShowMode;
	let selectedMimeTypeId;
	let supportedMimeTypes;
	let buttonShowMode;

	//## 注册脚本菜单 --
	function registerMenuCommand() {
		if (!gmMenuMimeTypeId) {
			gmMenuMimeTypeId = GM_registerMenuCommand('切换编码类型', menuEventMimeType);
		}
		// 重新注册菜单錄影按钮显示方式
		if (!gmMenuButtonShowMode){
			gmMenuButtonShowMode = GM_registerMenuCommand('錄影显示方式', menuEventButtonShowMode);
		}
	}
	registerMenuCommand();

	//## 脚本菜单事件 - 切换编码类型
	function menuEventMimeType() {
		if (!supportedMimeTypes) {
			createSupportedMimeType();
		}
		let menu = {
			title: '切换编码类型',
			height: 260,
			cfgName: 'MimeTypeId'
		};
		let items = [];
		for (let id in supportedMimeTypes) {
			let item = {
				id: id,
				title: supportedMimeTypes[id],
				selected: (selectedMimeTypeId && selectedMimeTypeId == id || !selectedMimeTypeId && id < 1),
				isLast: id < 1,
				callSelect: () => { selectedMimeTypeId = id; }
			};
			items.push(item);
		}
		createMenuUIRadio(menu, items);
	}

	//## 脚本菜单事件 - 錄影按钮显示方式
	function menuEventButtonShowMode() {
		let menu = {
			title: '当前网站錄影显示方式',
			height: 86,
			itemWidth: 30
		};
		let modes = [
			{id: 0 , title: '悬停显示'},
			{id: 1 , title: '总是显示'},
			{id: 2 , title: '不显示'}
		];
		let items = [];
		loadSiteButtonShowMode();
		modes.forEach((mode) => {
			let item = {
				id: mode.id,
				title: mode.title,
				selected: (buttonShowMode.mode && buttonShowMode.mode == mode.id || !buttonShowMode.mode && mode.id < 1),
				callSelect: () => {
					buttonShowMode = {
						host: location.host,
						mode: mode.id
					};
					saveSiteButtonShowMode();
					bindVideoEvent(0, changeButtonShowMode);
				}
			};
			items.push(item);
		});
		createMenuUIRadio(menu, items);
	}

	//## 载入当前网站錄影按钮显示方式
	function loadSiteButtonShowMode() {
		if (!buttonShowMode) { buttonShowMode = { host: location.host, mode: 0 }; }
		let siteButtonShowMode = GM_getValue('siteButtonShowMode');
		siteButtonShowMode = !siteButtonShowMode ? [] : siteButtonShowMode;
		siteButtonShowMode = siteButtonShowMode.filter((btnsm) => btnsm.host == buttonShowMode.host);
		buttonShowMode = siteButtonShowMode.length > 0 ? siteButtonShowMode[0] : buttonShowMode;
	}

	//## 保存当前网站錄影按钮显示方式
	function saveSiteButtonShowMode() {
		if (!buttonShowMode || !buttonShowMode.host) { return; }
		let siteButtonShowMode = GM_getValue('siteButtonShowMode');
		siteButtonShowMode = !siteButtonShowMode ? [] : siteButtonShowMode;
		if (siteButtonShowMode == []) {
			siteButtonShowMode.push(buttonShowMode);
			GM_setValue('siteButtonShowMode', siteButtonShowMode);
			return;
		}
		siteButtonShowMode = siteButtonShowMode.filter((btnsm) => btnsm.host != buttonShowMode.host);
		if (buttonShowMode.mode > 0){
			siteButtonShowMode.push(buttonShowMode);
		}
		GM_setValue('siteButtonShowMode', siteButtonShowMode);
	}

	//## 获取当前的编码类型
	function getSelectedMimeType() {
		let selectedMimeType = 'video/webm';
		if (!selectedMimeTypeId || selectedMimeTypeId < 1) {
			return selectedMimeType;
		}
		if (!supportedMimeTypes) {
			createSupportedMimeType();
		}
		if (!supportedMimeTypes[selectedMimeTypeId]) {
			return selectedMimeType;
		}
		return `${selectedMimeType}\;codecs=${supportedMimeTypes[selectedMimeTypeId]},opus`;
	}

	//## 创建支持的编码类型 --
	function createSupportedMimeType() {
		let types = [
			{ id: 0, type: 'Default' },
			{ id: 1, type: 'vp9' },{ id: 2, type: 'vp8' },
			{ id: 3, type: 'h265' },{ id: 4, type: 'h264' },
			{ id: 5, type: 'av1' },{ id: 6, type: 'avc1' },
		];
		supportedMimeTypes = {};
		types.forEach(function(v){
			let type = v.id < 1 ? '/webm' : `/webm\;codecs=${v.type},opus`;
			if (MediaRecorder.isTypeSupported(`video${type}`)) {
				supportedMimeTypes[v.id] = v.type;
			}
		});
	}

	/** 创建菜单界面单选窗口
	* @param {string} menu.title 窗口标题
	* @param {int} menu.height 窗口高度px
	* @param {string} menu.cfgName 选项对应存储设置名
	* @param {int} menu.itemWidth 选项列宽度(10,20,30,40,50)越小列数越多
	* ---------------------------------
	* @param {int} items[i].id 选项索引
	* @param {string} items[i].title 选项标题
	* @param {bool} items[i].selected 选项是否被选中
	* @param {bool} items[i].isLast 选项是否为最后一个(只能有一个)
	* @param {function} items[i].callSelect 选项被选中时执行的方法
	*/
	function createMenuUIRadio(menu, items) {
		if ($('#gmayavruiradio').length > 0) {
			removeMenuUIRadio(() => createMenuUIRadio(menu, items));
			return;
		}
		if(!menu || !items || items.length < 1) { return; }
		let uiDom = $(`<div id="gmayavruiradio"><style>
        #gmayavruiradio{position:fixed;box-shadow:0 0 5px 3px #707C74;height:${menu.height}px;width:30%;background-color:#fffc;display:none;
		border-radius:5px;top:0;left:0;right:0;bottom:0;margin:auto;z-index:666666;backdrop-filter:blur(2px);padding:12px 5px 0 5px;
		user-select:none;-webkit-user-select:none;-moz-user-select:none;overflow:hidden;font-family:'Microsoft Yahei';text-align:center;
		box-sizing:unset;-moz-box-sizing:unset}
		#gmayavruiradio .head{position:relative;display:inline-block;width:100%;height:20px}
		#gmayavruiradio .title {color:#666;margin-left:6px;font-size:12pt}
		#gmayavruiradio .close{position:absolute;display:inline-block;width:18px;height:18px;right:10px;overflow:hidden}
		#gmayavruiradio .close::before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);transform:rotate(45deg)}
		#gmayavruiradio .close::after{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);transform:rotate(-45deg)}
		#gmayavruiradio .close::before,.close::after{content:'';position:absolute;height:6px;width:100%;top:50%;left:0;
		margin-top:-3px;background:#91989FCC;border-radius:4px 0;transition:background .5s}
		#gmayavruiradio .close:hover::before,.close:hover::after{background:#08a5ef;transition:background .5s}
		#gmayavruiradio .body{margin-top:10px;display:flex;flex-wrap:wrap;flex-direction:row}
		#gmayavruiradio .wrap{position:relative;margin:5px;flex:1 0 ${!menu.itemWidth ? 40 : menu.itemWidth}%}
		#gmayavruiradio .item{color:#fff;background-color:#91989F77;position:relative;box-shadow:0 0 0 5px #0000;padding:5px 8px;
		border-radius:5px;transition:.5s;cursor:pointer}
		#gmayavruiradio .item:hover{background-color:#30547777}
		#gmayavruiradio label{display:unset;margin:unset;padding:unset;}
		#gmayavruiradio input[type="radio"]{display:none}
		#gmayavruiradio input:checked+label .item{box-shadow:0 0 3px 1px #88ceff;background-color:#08a5ef}
		#gmayavruiradio .content{font-size:14pt}
		</style>
		<div class="head"><sapn class="title">文文錄影机 - ${menu.title}</span><span class="close"></span></div>
		<div class="body"></div>
		</div>`);
		uiDom.find('.close').click(() => removeMenuUIRadio());
		let itemDom;
		let itemLastDom;
		for (let i in items) {
			let item = items[i];
			itemDom = $(`<div class="wrap"></div>`);
			let itemBtn = $(`<input type="radio" name="gmayavrmtr" id="gmayavrmt${i}" />`);
			itemBtn.click(function () {
				if (item.callSelect) { item.callSelect(); }
				if (menu.cfgName) { GM_setValue(menu.cfgName, item.id); }
			});
			let itemBtnContent = $(`<label for="gmayavrmt${i}"><div class="item content">${item.title}</div></label>`);
			if (item.selected) { itemBtn.prop('checked', 1); }
			itemDom.append(itemBtn).append(itemBtnContent);
			if (item.isLast) {
				itemLastDom = itemDom;
				continue;
			}
			uiDom.find('.body').append(itemDom);
		}
		uiDom.find('.body').append(itemLastDom);
		$('body').append(uiDom);
		uiDom.fadeIn('fast');
	}

	/** 关闭菜单界面单选窗口
	* @param {function} callback 关闭窗口后执行的回调方法
	*/
	function removeMenuUIRadio(callback) {
		$('#gmayavruiradio').fadeOut('fast', function(){
			$(this).remove();
			if (callback) { callback(); }
		});
	}

	//## Catch error event
	function catchErrorEvent(err, videoObj){
		if (/NotSupportedError/gi.test(err.toString())) {
			alert('文文錄影机 - 錄影格式不支持\n请在脚本菜单下「切换编码类型」');
			return;
		}
		if (/SecurityError/gi.test(err.toString())) {
			alert('文文錄影机 - 錄影权限不足\n无法对跨域的视频进行錄影');

			if (!videoObj) { return; }

			let testVideoUri = videoObj.src;
			let testVideoSourceDom = $(videoObj).find('source:first')[0];

			if (!testVideoUri && testVideoSourceDom) {
				testVideoUri = testVideoSourceDom.src;
			}
			if (!testVideoUri || /^blob:/gi.test(testVideoUri)) { return; }

			if (confirm('文文錄影机\n发现视频源地址\n要尝试在新页面打开吗？')) {
				let openUri = /\.m3u8$/gi.test(testVideoUri) ? `https://any.moest.top/m3u8get/?source=${testVideoUri}` : testVideoUri;
				openUrl(openUri);
			}

			setTimeout(() => videoObj.pause(), 100);
			return;
		}

		console.error('Aya Video Recorder', err);
		alert(`文文錄影机 - 发生意外错误\n${err}`);
	}

	//## Video recording extension method
	function ExtensionVideoRecorder() {
		unsafeWindow.HTMLVideoElement.prototype.record = async function (duration_seconds = 60, btnObj = null) {
			let video;
			try {
				video = this instanceof unsafeWindow.HTMLVideoElement ? this : document.querySelector('video');
				video.captureStream = video.captureStream || video.mozCaptureStream;

				let stream = video.captureStream();

				let mimeType = getSelectedMimeType();
				const recOption = {
					mimeType: mimeType
				};
				let recorder = new MediaRecorder(stream, recOption);

				let stopRecord = () => {
					recorder.state === "recording";
					recorder.stop();
				};

				let recTimerEnd;
				if (duration_seconds != Infinity) {
					recTimerEnd = setTimeout(() => stopRecord(), duration_seconds * 1000);
				}

				let formatSeconds = (second) => {
					let h = Math.floor(second / 3600)
					let m = Math.floor(second / 60 % 60);
					let s = Math.floor(second % 60);
					return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
				}

				if (btnObj) {
					btnObj[0].recS = 0;
					btnChangeState(btnObj, 1);
					btnObj[0].recTimeCalc = setInterval(
						() => btnObj[0].recS++ && btnObj.children(':first').text(`停止 ${formatSeconds(btnObj[0].recS)}`),
						1000
					);
					btnObj[0].recStop = () => {
						stopRecord();
					}
				}

				let blobs = [];
				await new Promise((resolve, reject) => {
					recorder.onstop = resolve;
					recorder.onerror = reject;
					recorder.ondataavailable = (event) => blobs.push(event.data);
					try {
						recorder.start();
					} catch(err) {
						// In FireFox
						if (btnObj) {
							clearInterval(btnObj[0].recTimeCalc);
							buttonAddOrDel(btnObj, btnObj[0].video, 1);
						}
						if (recTimerEnd) { clearInterval(recTimerEnd); }
						recTimerEnd = blobs = stream = recorder = undefined;
						catchErrorEvent(err, video);
					}
				});

				if (btnObj) {
					btnObj[0].vblob = new Blob(blobs, {
						type: 'video/webm'
					});
					btnObj[0].dlurl = URL.createObjectURL(btnObj[0].vblob);
					clearInterval(btnObj[0].recTimeCalc);
					btnChangeState(btnObj);
					return;
				}

				// The URL lifetime is tied to the document in the window on which it was created
				// const webm = new Blob(blobs, { type: 'video/webm' });
				// createDownload(URL.createObjectURL(webm), 1);

				recTimerEnd = blobs = stream = recorder = undefined;
				//return webm;
			} catch(err) {
				catchErrorEvent(err, video);
				return;
			}
		}
	}

	//## 新页面打开链接
	function openUrl(url){
		GM_openInTab(url, { active: true, insert: true, setParent :true });
	}

	//## 创建下载(blob链接, 下载后是否释放)
	function createDownload(dlurl, revoke) {
		let filename = ($('title').length > 0 ? $('title').text() : `WebVideo${new Date().toLocaleDateString().replace(/\//ig, '')}`) + '.webm';
		let a = document.createElement('a');
		a.href = dlurl;
		a.download = filename;
		a.click();
		if (revoke) {
			window.URL.revokeObjectURL(dlurl);
		}
	}

	//-- 初始化 -------------------------------
	$(function () {
		// 5s内尝试初始化
		let tryCount = 0;
		let timerInit = setInterval(() => {
			let testInit = $('style:contains(gmAyaRecBtn)').length > 0;
			if (tryCount > 5 || testInit) {
				clearInterval(timerInit);
				tryCount = timerInit = undefined;
				if (testInit) {
					ExtensionVideoRecorder();
				}
				return;
			}
			initialization();
			tryCount++;
		}, 1000);

		// 载入设置
		selectedMimeTypeId = parseInt(GM_getValue('MimeTypeId'));
	});

	//## 退出全屏时重新绑定 --------------
	$(window).resize(function () {
		let isFull = document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen;
		if (isFull === undefined || !isFull) {
			initialization();
		}
	});

	//## 初始化过程 --------------
	function initialization() {
		if ($('video').length < 1) { return; }

		if ($('style:contains(gmAyaRecBtn)').length < 1) {
			$('head').append($(`<style>
			.gmAyaRecBtn{position:absolute;left:0;top:0;display:inline-block;border-radius:4px;background-color:#ff7728bb;border:none;
			color:#fff;text-align:center;font-size:12pt;padding:5px 10px;cursor:pointer;margin:5px;font-family:'Microsoft Yahei';
			 z-index:66666!important;transition:.5s}
			.gmAyaRecBtn:hover{background-color:#ff5520;transition:.5s}
			.gmAyaRecBtn.dl.hide{display:none;transition:.5s}
			.gmAyaRecBtn.dl{background-color:#56bb2cbb;padding-right:18px;transition:.5s}
			.gmAyaRecBtn.dl:hover{background-color:#2cbb80;transition:.5s}
			.gmAyaRecBtn span{display:inline-block;cursor:pointer;position:relative;color:#fff;transition:.5s}
			.gmAyaRecBtn span.rec{padding-right:18px;transition:.5s}
			.gmAyaRecBtn span.dl{padding-right:12px;transition:.5s}
			.gmAyaRecBtn span:after{content:attr(data-content-after);font-size:18pt;position:absolute;opacity:0;
			 top:-6px;margin-left:5px;color:#fff;transition:.5s}
			.gmAyaRecBtn span.rec:after{animation:twinkle .5s infinite alternate;transition:.5s}
			.gmAyaRecBtn span.dl:after{opacity:1;font-size:12pt;top:0;animation:none;transition:.5s}
			@keyframes twinkle{0%{opacity:.5}100%{opacity:1}}
			</style>`));
		}


		loadSiteButtonShowMode();
		if (buttonShowMode.mode > 0) {
			bindVideoEvent(0, changeButtonShowMode);
			return;
		}
		bindVideoEvent();
	}

	//## 解除绑定video hover事件
	function unBindVideoEventHover(videoDom) {
		videoDom.each(function () {
			if (this.gmayavrhover) {
				this.removeEventListener('mouseenter', this.gmayavrhover);
				this.gmayavrhover = undefined;
			}
			if (this.gmayavrunhover) {
				this.removeEventListener('mouseleave', this.gmayavrunhover);
				this.gmayavrunhover = undefined;
			}
		});
	}

	//## 绑定video事件(每绑定一个video都会传递video jQuery dom)
	function bindVideoEvent(page, callback) {
		if (!page) { page = $('body'); }
		let video = page.find('video');

		if (video.length > 0) {

			loadSiteButtonShowMode();
			unBindVideoEventHover($(video));

			if (buttonShowMode.mode < 1) {
				video.each(function () {
					this.gmayavrhover = function () {
						switchButton($(this));
					}
					this.gmayavrunhover = function () {
						switchButton($(this), 1);
					}
					this.addEventListener('mouseenter', this.gmayavrhover)
					this.addEventListener('mouseleave', this.gmayavrunhover);
					switchButton($(this), 1);
				});
			}

			if (buttonShowMode.mode > 0 && callback) { callback(video); }
		}

		let iframe = page.find('iframe');
		iframe.each(function(){
			let subPage = $(this).contents().find('body');
			if (subPage.length > 0) { bindVideoEvent(subPage, callback); }
		});
	}

	//## 显示或隐藏按钮
	function switchButton(videoDom, hide) {
		if (!videoDom) { return; }
		let gmbtn = videoDom.next();
		if (hide && !gmbtn.hasClass('gmAyaRecBtn')) {
			return;
		}
		if (hide) {
			setTimeout(() => buttonAddOrDel(gmbtn), 100);
			return;
		}
		buttonAddOrDel(0, videoDom);
	}

	//## 改变按钮显示方式
	function changeButtonShowMode(videoDom) {
		switch(buttonShowMode.mode) {
			case 1:
				videoDom.each(function(){
					switchButton($(this));
				});
				break;

			case 2:
				videoDom.each(function(){
					switchButton($(this), 1);
				});
				break;

			default:
				initialization();
				videoDom.each(function(){
					switchButton($(this), 1);
				});
		}
	}

	//## 添加或删除按钮(添加:无btnDom 有videoDom, 删除:有btnDom 无videoDom, 强制删除)
	function buttonAddOrDel(btnDom, videoDom, toDelete) {
		if (!toDelete) {
			loadSiteButtonShowMode();
		}
		// 删除
		if (!videoDom || toDelete) {
			if ((!btnDom || btnDom[0].hovered || btnDom[0].isRec || btnDom[0].dlurl || buttonShowMode.mode == 1) && !toDelete) {
				return false;
			}
			btnDom.remove();
			btnDom = undefined;
			// 删除后再添加
			if (toDelete) {
				buttonAddOrDel(0, videoDom)
			}
			return false;
		}

		// 添加
		if (videoDom.siblings().length > 0 && videoDom.next().hasClass('gmAyaRecBtn') || buttonShowMode.mode > 1) {
			return false;
		}

		let newBtn = $(`<a class="gmAyaRecBtn" href="javascript:;"><span>錄影</span></a>`);

		newBtn[0].video = videoDom;

		newBtn.hover(function () {
			this.hovered = 1;
		}, function () {
			this.hovered = 0;
		});

		newBtn.click(function () {
			//---- 下载
			if (this.dlurl) {
				if (confirm('要下载錄影吗？')) {
					createDownload(this.dlurl);
					return false;
				}
				if (!confirm('要重新开始錄影吗？')) {
					return false;
				}
				window.URL.revokeObjectURL(this.dlurl);
				buttonAddOrDel($(this), videoDom, 1);
				return false;
			}
			//---- 錄影
			let videoObj = videoDom[0];
			if (this.isRec) {
				//停止錄影
				videoObj.pause();
				this.recStop();
				return false;
			}
			//开始錄影
			let durs = videoObj.duration;
			if (!durs) {
				alert('无法取得视频长度');
				return false;
			}
			let videoIsPaused = videoObj.paused;
			videoObj.pause();
			if (!confirm('要开始錄影吗？')) {
				if (!videoIsPaused) {
					//延迟播放避免某些网站播放器逻辑冲突
					setTimeout(() => videoObj.play(), 800);
				}
				return false;
			}
			if (videoObj.duration != Infinity) {
				if (videoObj.currentTime >= videoObj.duration || confirm('要从头开始錄影吗？')) {
					videoObj.currentTime = 0;
				} else {
					durs -= videoObj.currentTime;
				}
			}
			setTimeout(() => {
				videoObj.record(durs, newBtn);
				videoObj.volume = videoObj.volume > 0 ? videoObj.volume : 0.0001;
				videoObj.muted = false;
				videoObj.play();
			}, 300);

			return false;
		});
		videoDom.after(newBtn);
		return false;
	}

	//## 改变按钮状态(showDownload: >1显示)
	function btnChangeState(btnDom, isRecording) {
		if (!btnDom) {
			return;
		}
		//錄影状态
		if (isRecording) {
			btnDom[0].isRec = 1;
			btnDom.children(':first').text('錄影已开始');
			btnDom.children(':first').attr('data-content-after', '●');
			btnDom.children(':first').addClass('rec');
			return;
		}
		//停止錄影状态
		btnDom[0].isRec = 0;
		btnDom.children(':first').removeClass('rec');
		if (btnDom[0].dlurl) {
			btnDom.children(':first').text('下载錄影');
			btnDom.children(':first').attr('data-content-after', '▼');
			btnDom.addClass('dl').children(':first').addClass('dl');
			return;
		}
	}

})();