var ev = {
	a:function(){
		$("#himg").css('display','block');
		$("body").removeAttr("class");
	}
}

function audioAutoPlay() {
	var audio = document.getElementById('musics');
	audio.play();
	document.addEventListener("WeixinJSBridgeReady", function () {
		audio.play();
	}, false);
}

window.onload=function(){
	var v = document.getElementById("musics");
	v.oncanplay=ev.a();
	lrclib.showLrc('lrcbox','lrc/ジェニーはご机嫌ななめ-やくしまるえつこ.lrc','YIU','https://github.com/usaginya');
	lrclib.showLrc('lrcbox2','lrc/ジェニーはご机嫌ななめ-やくしまるえつこCN.lrc','YIU','https://github.com/usaginya');
}

//--兼容手机--
document.addEventListener('DOMContentLoaded', function () {
	audioAutoPlay();
});
//--监听触摸 进行播放
document.addEventListener('touchstart', function () {
	audioAutoPlay();
});