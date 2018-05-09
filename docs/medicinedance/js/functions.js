$(window).on("load",function(){
	v = document.getElementById("musics");
	v.oncanplay=new eve();
});

function eve(){
setTimeout(function(){
  $("#himg").css('display','block'); 
  $("body").removeClass("whilebody");
  },1195);
}