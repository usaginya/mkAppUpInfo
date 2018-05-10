var ev = {
 	a:function(){
		$("#himg").css('display','block');
		$("body").removeClass("whilebody");
	}
}

window.onload=function(){
	v = document.getElementById("musics");
	v.oncanplay=ev.a();
	lrclib.showLrc('lrcbox','lrc/ジェニーはご机嫌ななめ-やくしまるえつこ.lrc');
	lrclib.showLrc('lrcbox2','lrc/ジェニーはご机嫌ななめ-やくしまるえつこCN.lrc');
}