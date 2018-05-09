var ev = {
 	a:function(){
		$("#himg").css('display','block');
		$("body").removeClass("whilebody");
	}
}

window.onload=function(){
	v = document.getElementById("musics");
	v.oncanplay=ev.a();
}