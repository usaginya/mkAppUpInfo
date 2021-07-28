// ==UserScript==
// @name         文文录影机
// @namespace    https://cdn.jsdelivr.net/gh/usaginya/mkAppUpInfo@master/monkeyjs/moe.moekai.aya.videorecorder.user.js
// @version      1.0
// @description  支持各种html5网页视频录像、保存格式固定为webm、可使用ffmpeg转换格式、录像时不能静音
// @author       YIU
// @include      *
// @icon         https://moest.top/favicon.ico
// @grant        unsafeWindow
// @run-at       document-start
// @require      https://cdn.bootcss.com/jquery/2.2.0/jquery.min.js
// ==/UserScript==

(function() {
	//- 可以使用下面的ffmpeg命令直接转换格式为mp4（非标准mp4）
	//ffmpeg -i downloadedVideo.webm -strict -2 -c copy output.mp4

	//- 转为一般恒定mp4（二次转换，crf数值越小，视频体积越大质量越好，一般为21左右）
	//ffmpeg -i downloadedVideo.webm -crf 16 output.mp4

	//## Video recording extension method
	const record = (unsafeWindow.HTMLVideoElement.prototype.record = async function (duration_seconds = 60, btnObj = null) {
		const video = this instanceof unsafeWindow.HTMLVideoElement ? this : document.querySelector("video");
		video.captureStream = video.captureStream || video.mozCaptureStream;
		const stream = video.captureStream();
		// stream.removeTrack(stream.getAudioTracks()[0]);
		const recorder = new MediaRecorder(stream, {mimeType : 'video/webm\;codecs=vp9'});

		let stopRecord = () => {
			recorder.state === "recording";
			recorder.stop();
		};

		let recTimeEnd;
		if (duration_seconds != Infinity) {
			recTimeEnd = setTimeout(() => stopRecord(), duration_seconds * 1000);
		}

		let prefixInteger = (num, n) => {
			return (Array(n).join(0) + num).slice(-n);
		}

		let formatSeconds = (second) => {
			let h = Math.floor(second / 3600) < 10 ? prefixInteger(Math.floor(second / 3600), 2) : Math.floor(second / 3600);
			let m = Math.floor(second / 60 % 60) < 10 ? prefixInteger(Math.floor(second / 60 % 60), 2) : Math.floor(second / 60 % 60);
			let s = Math.floor(second % 60) < 10 ? prefixInteger(Math.floor(second % 60), 2) : Math.floor(second % 60);
			return `${h}:${m}:${s}`;
		}

		if(btnObj){
			btnObj[0].recS = 0;
			btnChangeState(btnObj, 1);
			btnObj[0].recTimeCalc = setInterval(
				()=> btnObj[0].recS++ && btnObj.children(':first').text(`停止 ${formatSeconds(btnObj[0].recS)}`),
				1000
			);
			btnObj[0].recStop = () => {
				stopRecord();
			}
		}

		const blobs = [];
		await new Promise((resolve, reject) => {
			// The stop event is thrown either as a result of the MediaRecorder.stop() method being invoked, or when the media stream being captured ends.
			// In each case, the stop event is preceded by a dataavailable event, making the Blob captured up to that point available for you to use in your application.
			recorder.onstop = resolve;
			recorder.onerror = reject;
			recorder.ondataavailable = (event) => blobs.push(event.data);
			recorder.start();
		});

		// recorder.stream.getTracks().forEach((track) => track.stop());

		if (recTimeEnd) { clearTimeout(recTimeEnd); }

		if(btnObj) {
			btnObj[0].vblob = new Blob(blobs, { type: "video/webm" });
			btnObj[0].dlurl = URL.createObjectURL(btnObj[0].vblob);
			clearInterval(btnObj[0].recTimeCalc);
			btnChangeState(btnObj);
			return;
		}

		// The URL lifetime is tied to the document in the window on which it was created
		// const webm = new Blob(blobs, { type: "video/webm\;codecs=vp9" });
		// createDownload(URL.createObjectURL(webm), 1);

		blobs = stream = recorder = undefined;
		//return webm;
	});

	//## 创建下载(blob链接, 下载后是否释放)
	function createDownload(dlurl, revoke) {
		let filename = ($('title').length > 0 ? $('title').text() : `WebVideo${ new Date().toLocaleDateString().replace(/\//ig,'') }`) + '.webm';
		let a = document.createElement('a');
		a.href = dlurl;
		a.download = filename;
		a.click();
		if (revoke) {
			window.URL.revokeObjectURL(dlurl);
		}
	}

	//-- 初始化 -------------------------------
	$(function(){
		//5s内尝试初始化
		let tryCount = 0;
		let timerInit = setInterval(() => {
			if(tryCount>5 || $('style:contains(gmvrRecBtn)').length > 0){
				clearInterval(timerInit);
				tryCount = timerInit = undefined;
				return;
			}
			initialization();
			tryCount++;
		},1000);
	});

	//## 退出全屏时重新初始化绑定 --------------
	$(window).resize(function () {
		let isFull = document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen;
		if (isFull === undefined || !isFull) {
			initialization();
		}
	});

	//## 初始化实际 --------------
	function initialization() {
		if ($('video').length < 1) {
			return;
		}

		if($('style:contains(gmvrRecBtn)').length < 1){
			$('head').append($(`<style>
.gmvrRecBtn{position:absolute;left:0;top:0;display:inline-block;border-radius:4px;background-color:#ff7728bb;border:none;color:#fff;
text-align:center;font-size:12pt;padding:5px 10px;cursor:pointer;margin:5px;font-family:'Microsoft Yahei';z-index:9999!important;transition:.5s}
.gmvrRecBtn:hover{background-color:#ff5520;transition:.5s}
.gmvrRecBtn.dl.hide{display:none;transition:.5s}
.gmvrRecBtn.dl{background-color:#56bb2cbb;padding-right:18px;transition:.5s}
.gmvrRecBtn.dl:hover{background-color:#2cbb80;transition:.5s}
.gmvrRecBtn span{display:inline-block;cursor:pointer;position:relative;color:#fff;transition:.5s}
.gmvrRecBtn span.rec{padding-right:18px;transition:.5s}
.gmvrRecBtn span.dl{padding-right:12px;transition:.5s}
.gmvrRecBtn span:after{content:attr(data-content-after);font-size:18pt;position:absolute;opacity:0;top:-5px;margin-left:5px;color:#fff;transition:.5s}
.gmvrRecBtn span.rec:after{animation:twinkle .5s infinite alternate;transition:.5s}
.gmvrRecBtn span.dl:after{opacity:1;font-size:12pt;top:0;animation:none;transition:.5s}
@keyframes twinkle{0%{opacity:.5}100%{opacity:1}}
</style>`));
		}

		$('video').unbind().hover(function(){
			let gmbtn = $(this).next();
			if (gmbtn.hasClass('gmvrRecBtn')) {
				if (gmbtn[0].dlurl) {
					btnChangeState(gmbtn, 0, 2);
					return;
				}
				return;
			}
			buttonAddOrDel(0, $(this));

		}, function(){
			let gmbtn = $(this).next();
			if (!gmbtn.hasClass('gmvrRecBtn')) {
				return;
			}
			if (gmbtn[0].dlurl) {
				setTimeout(() => btnChangeState(gmbtn, 0, gmbtn[0].hovered + 1), 100);
				return;
			}
			setTimeout(() => buttonAddOrDel(gmbtn), 100);
		});
	}

	//## 添加或删除按钮
	function buttonAddOrDel(btnDom, videoDom, toDelete) {
		//删除
		if (!videoDom || toDelete) {
			if ((!btnDom || btnDom[0].hovered || btnDom[0].isRec) && !toDelete) { return false; }
			btnDom.remove();
			btnDom = undefined;
			if (toDelete) {
				buttonAddOrDel(0, videoDom)
			}
			return false;
		}

		//添加
		if (videoDom.siblings().length > 0 && videoDom.next().hasClass('gmvrRecBtn')) {
			return false;
		}

		let newBtn = $(`<a class="gmvrRecBtn" href="javascript:;"><span>录像</span></a>`);

		newBtn.hover (function() {
			this.hovered = 1;
		}, function() {
			this.hovered = 0;
		});

		newBtn.click (function() {
			//---- 下载
			if (this.dlurl) {
				if (confirm('要下载录像吗？')) {
					createDownload(this.dlurl);
					return false;
				}
				if (!confirm('要重新开始录像吗？')) { return false; }
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
				if(!videoIsPaused) {
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
			},300);

			return false;
		});
		videoDom.after(newBtn);
		return false;
	}

	//## 改变按钮状态(showDownload: >1显示)
	function btnChangeState(btnDom, isRecording, showDownload){
		if (!btnDom) { return; }
		//录像状态
		if (isRecording){
			btnDom[0].isRec = 1;
			btnDom.children(':first').text('录像已开始');
			btnDom.children(':first').attr('data-content-after', '●');
			btnDom.children(':first').addClass('rec');
			return;
		}
		//显示或隐藏下载
		if (showDownload > 0 && btnDom[0].dlurl) {
			showDownload > 1 ? btnDom.removeClass('hide') : btnDom.addClass('hide');
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
		btnDom.removeClass('dl').children(':first').removeClass('dl');
		btnDom.children(':first').attr('data-content-after', '●');
		btnDom.children(':first').text('录像');
	}

})();