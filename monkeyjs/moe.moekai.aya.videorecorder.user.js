// ==UserScript==
// @name         文文录影机
// @namespace    https://cdn.jsdelivr.net/gh/usaginya/mkAppUpInfo@master/monkeyjs/moe.moekai.aya.videorecorder.user.js
// @version      1.1
// @description  支持各种网页视频/直播录像、录像时不能静音、保存格式都是webm、可以使用ffmpeg转换格式、录制高分辨率需要更高性能。
// @author       YIU
// @include      *
// @icon         https://moest.top/favicon.ico
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @license      GPL-3.0 License
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
	let selectedMimeTypeId;
	let supportedMimeTypes;

	//## 注册脚本菜单 --
	function registerMenuCommand() {
		//重新注册菜单
		if (gmMenuMimeTypeId) {
			GM_unregisterMenuCommand(gmMenuMimeTypeId);
		}
		gmMenuMimeTypeId = GM_registerMenuCommand(`切换编码类型`, menuEventMimeType);
	}
	registerMenuCommand();

	//## 脚本菜单事件 - 切换编码类型
	function menuEventMimeType() {
		createMimeTypeUI();
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
		return `${selectedMimeType}\;codecs=${supportedMimeTypes[selectedMimeTypeId]}`;
	}

	//## 创建支持的编码类型 --
	function createSupportedMimeType() {
		let types = [
			{ id: 1, type: 'vp9' },{ id: 2, type: 'vp8' },
			{ id: 3, type: 'h265' },{ id: 4, type: 'h264' },
			{ id: 5, type: 'avc1' },{ id: 6, type: 'av1' },
			{ id: 7, type: 'opus' },{ id: 8, type: 'daala' },
			{ id: 0, type: 'Default' }
		];
		supportedMimeTypes = {};
		types.forEach(function(v){
			let type = v.id < 1 ? '/webm' : `/webm\;codecs=${v.type}`;
			if (MediaRecorder.isTypeSupported(`video${type}`)) {
				supportedMimeTypes[v.id] = v.type;
			}
		});
	}

	//## 创建菜单切换编码界面
	function createMimeTypeUI() {
		if ($('#gmayavrmimetypeui').length > 0) { return; }
		let uiDom = $(`<div id="gmayavrmimetypeui">
		<style>
        #gmayavrmimetypeui{position:fixed;box-shadow:0 0 5px 3px #707C74;height:280px;width:30%;background-color:#fffc;display:none;
		border-radius:5px;top:0;left:0;right:0;bottom:0;margin:auto;z-index:998;backdrop-filter:blur(2px);padding:12px 5px 0 5px}
		#gmayavrmimetypeui .flex{height:85%;width:100%;display:flex;flex-wrap:wrap;flex-direction:row}
		#gmayavrmimetypeui .wrap{position:relative;margin:5px;flex:1 0 40%}
		#gmayavrmimetypeui .item{color:#fff;background-color:#91989F77;position:relative;box-shadow:0 0 0 5px #0000;padding:5px 8px;
		border-radius:5px;transition:.5s;cursor:pointer}
		#gmayavrmimetypeui input[type="radio"]{display:none}
		#gmayavrmimetypeui input:checked+label .item{box-shadow:0 0 3px 1px #88ceff;background-color:#08a5ef}
		#gmayavrmimetypeui .content{font-size:14pt;text-align:center;user-select:none;-webkit-user-select:none;-moz-user-select:none}
		#gmayavrmimetypeui .close-box{position:relative;display:inline-block;width:100%;height:20px;overflow:hidden}
		#gmayavrmimetypeui .close{position:absolute;display:inline-block;width:18px;height:18px;right:10px;overflow:hidden}
		#gmayavrmimetypeui .close::before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);transform:rotate(45deg)}
		#gmayavrmimetypeui .close::after{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);transform:rotate(-45deg)}
		#gmayavrmimetypeui .close::before,.close::after{content:'';position:absolute;height:6px;width:100%;top:50%;left:0;
		margin-top:-3px;background:#91989FCC;border-radius:4px 0;transition:background .5s}
		#gmayavrmimetypeui .close:hover::before,.close:hover::after{background:#08a5ef;transition:background .5s}
		</style>
		<div class="close-box"><span class="close"></span></div>
		<div class="flex"></div>
		</div>`);
		uiDom.find('.close').click(() => removeMimeTypeUI());
		if (!supportedMimeTypes) {
			createSupportedMimeType();
		}
		let mimeTypeListDom;
		let defaultMimeTypeDom;
		for (let key in supportedMimeTypes) {
			mimeTypeListDom = $(`<div class="wrap"></div>`);
			let listBtn = $(`<input type="radio" name="gmayavrmtr" id="gmayavrmt${key}" />`);
			listBtn.click(() => {
				selectedMimeTypeId = key;
				GM_setValue('MimeTypeId', key);
			});
			let listBtnContent = $(`<label for="gmayavrmt${key}"><div class="item content">${supportedMimeTypes[key]}</div></label>`);
			if (selectedMimeTypeId && selectedMimeTypeId == key) { listBtn.attr('checked', 1); }
			mimeTypeListDom.append(listBtn).append(listBtnContent);
			if (key < 1) {
				defaultMimeTypeDom = mimeTypeListDom;
				continue;
			}
			uiDom.find('.flex').append(mimeTypeListDom);
		}
		if (!selectedMimeTypeId || uiDom.find('input:checked').length < 1) {
			defaultMimeTypeDom.find('input').attr('checked', 1);
		}

		uiDom.find('.flex').append(defaultMimeTypeDom);
		$('body').append(uiDom);
		uiDom.fadeIn('fast');
	}

	//## 关闭菜单切换编码界面
	function removeMimeTypeUI() {
		$('#gmayavrmimetypeui').fadeOut('fast', function(){
			$(this).remove();
		});
	}

	//## Video recording extension method
	function ExtensionVideoRecorder() {
		unsafeWindow.HTMLVideoElement.prototype.record = async function (duration_seconds = 60, btnObj = null) {
			const video = this instanceof unsafeWindow.HTMLVideoElement ? this : document.querySelector('video');
			video.captureStream = video.captureStream || video.mozCaptureStream;
			const stream = video.captureStream();

			const mimeType = getSelectedMimeType();
			const recOption = {
				mimeType: mimeType
			};
			const recorder = new MediaRecorder(stream, recOption);

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

			const blobs = [];
			await new Promise((resolve, reject) => {
				recorder.onstop = resolve;
				recorder.onerror = reject;
				recorder.ondataavailable = (event) => blobs.push(event.data);
				recorder.start();
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
		}
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
		//5s内尝试初始化
		let tryCount = 0;
		let timerInit = setInterval(() => {
			let testInit = $('style:contains(gmAyaRecBtn)').length > 0;
			if (tryCount > 5 || testInit) {
				clearInterval(timerInit);
				tryCount = timerInit = undefined;
				if (testInit) {
					selectedMimeTypeId = GM_getValue('MimeTypeId');
					ExtensionVideoRecorder();
				}
				return;
			}
			initialization();
			tryCount++;
		}, 1000);
	});

	//## 退出全屏时重新绑定 --------------
	$(window).resize(function () {
		let isFull = document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen;
		if (isFull === undefined || !isFull) {
			bindVideoEvent();
		}
	});

	//## 初始化过程 --------------
	function initialization() {
		if ($('video').length < 1) {
			return;
		}

		if ($('style:contains(gmAyaRecBtn)').length < 1) {
			$('head').append($(`<style>
.gmAyaRecBtn{position:absolute;left:0;top:0;display:inline-block;border-radius:4px;background-color:#ff7728bb;border:none;color:#fff;
text-align:center;font-size:12pt;padding:5px 10px;cursor:pointer;margin:5px;font-family:'Microsoft Yahei';z-index:9999!important;transition:.5s}
.gmAyaRecBtn:hover{background-color:#ff5520;transition:.5s}
.gmAyaRecBtn.dl.hide{display:none;transition:.5s}
.gmAyaRecBtn.dl{background-color:#56bb2cbb;padding-right:18px;transition:.5s}
.gmAyaRecBtn.dl:hover{background-color:#2cbb80;transition:.5s}
.gmAyaRecBtn span{display:inline-block;cursor:pointer;position:relative;color:#fff;transition:.5s}
.gmAyaRecBtn span.rec{padding-right:18px;transition:.5s}
.gmAyaRecBtn span.dl{padding-right:12px;transition:.5s}
.gmAyaRecBtn span:after{content:attr(data-content-after);font-size:18pt;position:absolute;opacity:0;top:-5px;margin-left:5px;color:#fff;transition:.5s}
.gmAyaRecBtn span.rec:after{animation:twinkle .5s infinite alternate;transition:.5s}
.gmAyaRecBtn span.dl:after{opacity:1;font-size:12pt;top:0;animation:none;transition:.5s}
@keyframes twinkle{0%{opacity:.5}100%{opacity:1}}
</style>`));
		}

		bindVideoEvent();
	}

//## 绑定video事件
function bindVideoEvent() {
	if ($('video').length < 1) {
		return;
	}
	$('video').unbind().hover(function () {
		let gmbtn = $(this).next();
		if (gmbtn.hasClass('gmAyaRecBtn')) {
			return;
		}
		buttonAddOrDel(0, $(this));

	}, function () {
		let gmbtn = $(this).next();
		if (!gmbtn.hasClass('gmAyaRecBtn')) {
			return;
		}
		setTimeout(() => buttonAddOrDel(gmbtn), 100);
	});
}

//## 添加或删除按钮
function buttonAddOrDel(btnDom, videoDom, toDelete) {
	//删除
	if (!videoDom || toDelete) {
		if ((!btnDom || btnDom[0].hovered || btnDom[0].isRec || btnDom[0].dlurl) && !toDelete) {
			return false;
		}
		btnDom.remove();
		btnDom = undefined;
		if (toDelete) {
			buttonAddOrDel(0, videoDom)
		}
		return false;
	}

	//添加
	if (videoDom.siblings().length > 0 && videoDom.next().hasClass('gmAyaRecBtn')) {
		return false;
	}

	let newBtn = $(`<a class="gmAyaRecBtn" href="javascript:;"><span>录像</span></a>`);

	newBtn.hover(function () {
		this.hovered = 1;
	}, function () {
		this.hovered = 0;
	});

	newBtn.click(function () {
		//---- 下载
		if (this.dlurl) {
			if (confirm('要下载录像吗？')) {
				createDownload(this.dlurl);
				return false;
			}
			if (!confirm('要重新开始录像吗？')) {
				return false;
			}
			window.URL.revokeObjectURL(this.dlurl);
			buttonAddOrDel($(this), videoDom, 1);
			return false;
		}
		//---- 录像
		let videoObj = videoDom[0];
		if (this.isRec) {
			//停止录像
			videoObj.pause();
			this.recStop();
			return false;
		}
		//开始录像
		let durs = videoObj.duration;
		if (!durs) {
			alert('无法取得视频长度');
			return false;
		}
		let videoIsPaused = videoObj.paused;
		videoObj.pause();
		if (!confirm('要开始录像吗？')) {
			if (!videoIsPaused) {
				videoObj.play();
			}
			return false;
		}
		if (videoObj.duration != Infinity) {
			if (videoObj.currentTime >= videoObj.duration || confirm('要从头开始录像吗？')) {
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
	//录像状态
	if (isRecording) {
		btnDom[0].isRec = 1;
		btnDom.children(':first').text('录像已开始');
		btnDom.children(':first').attr('data-content-after', '●');
		btnDom.children(':first').addClass('rec');
		return;
	}
	//停止录像状态
	btnDom[0].isRec = 0;
	btnDom.children(':first').removeClass('rec');
	if (btnDom[0].dlurl) {
		btnDom.children(':first').text('下载录像');
		btnDom.children(':first').attr('data-content-after', '▼');
		btnDom.addClass('dl').children(':first').addClass('dl');
		return;
	}
}

})();