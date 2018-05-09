window.onload=function(){
	v = document.getElementById("musics");
	v.oncanplay=eve();
}

function eve(){
	$("#himg").css('display','block');
	$("body").removeClass("whilebody");
}