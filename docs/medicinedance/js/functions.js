var ev = {
 	a:function(){
		$("#himg").css('display','block');
		$("body").removeAttr("class");
	}
}

window.onload=function(){
	v = document.getElementById("musics");
	v.oncanplay=ev.a();
	lrclib.showLrc('lrcbox','lrc/ジェニーはご机嫌ななめ-やくしまるえつこ.lrc','YIU','https://github.com/usaginya');
	lrclib.showLrc('lrcbox2','lrc/ジェニーはご机嫌ななめ-やくしまるえつこCN.lrc','YIU','https://github.com/usaginya');
}