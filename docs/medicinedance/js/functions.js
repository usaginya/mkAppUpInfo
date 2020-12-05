var ev = {
	a: function () {
		$("#himg").removeAttr("style");
		$("#cloud").removeAttr("style");
		$("body").removeAttr("class");
		audioAutoPlay();
		lrclib.showLrc('lrcbox', 'lrc/ジェニーはご机嫌ななめ-やくしまるえつこ.lrc', 'YIU', 'https://github.com/usaginya');
		lrclib.showLrc('lrcbox2', 'lrc/ジェニーはご机嫌ななめ-やくしまるえつこCN.lrc', 'YIU', 'https://github.com/usaginya');
	}
}

function audioAutoPlay() {
	var audio = document.getElementById('musics');
	if (audio == null) { return; }
	audio.parentElement.click();
	if (audio.paused) { //判读是否播放  
		audio.paused = false;
		audio.play(); //没有就播放
		audio.muted = false;
	}
	document.addEventListener("WeixinJSBridgeReady", function () {
		if (audio.paused) {
			audio.paused = false;
			audio.play();
			audio.muted = false;
		}
	}, false);
}

window.onload = function () {
	var v = document.getElementById("musics");
	v.oncanplay = ev.a();
}

//--兼容手机--
document.addEventListener('DOMContentLoaded', function () {
	audioAutoPlay();
});
//--监听触摸 进行播放
document.addEventListener('touchstart', function () {
	audioAutoPlay();
});