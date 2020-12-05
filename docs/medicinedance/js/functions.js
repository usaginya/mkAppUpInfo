var state = 0;

var ev = {
	a: function () {
		$("#himg").removeAttr("style");
		$("#cloud").removeAttr("style");
		$("body").removeAttr("class");
		audioAutoPlay();
	}
}

function audioAutoPlay() {
	var audio = document.getElementById('musics');
	if (audio == null || state == 1) { return; }
	state = 0;
	audio.play();
	lrclib.showLrc('lrcbox', 'lrc/ジェニーはご机嫌ななめ-やくしまるえつこ.lrc', 'YIU', 'https://github.com/usaginya');
	lrclib.showLrc('lrcbox2', 'lrc/ジェニーはご机嫌ななめ-やくしまるえつこCN.lrc', 'YIU', 'https://github.com/usaginya');
}

window.onload = function () {
	document.getElementById("play").onclick = function () {
		document.getElementById("play-mask").remove();
		document.getElementById("musics").oncanplay = ev.a();
	}
}

//--兼容手机--
document.addEventListener("WeixinJSBridgeReady", function () {
	audioAutoPlay();
}, false);
//--监听触摸 进行播放
document.addEventListener('touchstart', function () {
	audioAutoPlay();
}, false);