$(document).ready(function(e){
	v = document.getElementById("musics");
	v.oncanplay=eve();
});

function eve(){
setTimeout(function(){
  $("body").append('<a href="http://music.163.com/song?id=672671" target="_blank"><img class="aimg" src="medicine_dance.gif"/></a>');
  $("body").removeClass("whilebody");
  },1195);
}