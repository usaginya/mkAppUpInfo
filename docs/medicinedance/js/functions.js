$(window).on("load",function(){
	v = document.getElementById("musics");
	v.oncanplay=function(){
		$("#himg").css('display','block');
		$("body").removeClass("whilebody");
	};
});

