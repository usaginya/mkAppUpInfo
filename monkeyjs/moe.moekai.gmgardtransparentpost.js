// ==UserScript==
// @name         绅士之庭透明文章
// @namespace    moe.moekai.gmgardtransparentpost
// @version      1.6
// @description  让绅士之庭的文章底色透明
// @author       YIU
// @match        http*://gmgard.com/*
// @icon         http://gmgard.com/favicon.ico
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {
	var $ = unsafeWindow.jQuery;

	$("#body").css("background-color","#ffffffaa");
	$(".categories").css("background","#ffffff99");
	$("#blog").css("background-color","#fff0");
	$("#blog .uimg").css("background","#fff9");
	$(".well").css("background-color","#f5f5f5b8");
	$("input.tagsearch").css("background-color","#f5f5f599");
	$("hr").css({"border-top-color":"#eee8","border-bottom-color":"#eee8"});
	$(".btn-toolbar .btn,.searchbtn,.favbtn,#blog a[onclick*='rptBlog'],#newtag .btn,.author-info .btn:not(.disabled)").css({"background":"#f5f5f5b0","background-image":"none"});

	$(".reply-section").css("background","#efeeef90");
	$(".home-list").css("background-color","#f7f7de50");
	$(".home-settings").css("background","#dddddd50");
	$("#rankContent").css("background-color","#daebf470");
	$(".author-info").css("background","#f3f3f380");
	$(".author-sign").css("background","#ffffff80");
	$(".nav-tabs .active a").css("background-color","#fffa");
	$(".spoiler-content").css("background","none repeat scroll 0 0 #f5f5f590");
	$(".spoiler-content span[style*='background-color']").css("background-color","#000000cc");
	$("#main:contains('DailyRankings')").css("background","linear-gradient(135deg,#cebe29a6 0,#9b1f50a8 33%,#2989d8a8 71%,#89b4ffa8 91%)");
	$(".navbar-inner").css({"background-color":"#fff0","background-image":"linear-gradient(to bottom,#ffffffa0,#f2f2f280)"});

	var strs = "<style>.rankflag::after{background:linear-gradient(150deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}";
	strs += ".rankflag::before{background:linear-gradient(210deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}</style>";
	$("#rankContent").append(strs);

	//--- footer ---
	$("footer").css("background-color","#e2e2e2e0");

	//--- pager style ---
	var st_pager = function(){
		$("#jumppage,#postjumppage").css("background-color","#fffc");
		$(".pager .btn:not(.disabled)").css({"background":"#fffc","background-image":"none"});
	};
	st_pager();

	//---- comments ----
	$("#main .content-wrapper").bind("DOMSubtreeModified",function(e){
		var bg_bubble = $(".bubble").css("background");
		if(bg_bubble && bg_bubble.indexOf('0.')<1){
			$(".bubble").css("background","#ffffff90");
			$(e.target).append("<style>.bubble::after{border-right-width:15px;border-color:transparent #fffffff0}</style>");
		}

		//-- pager --
		var bg_pager = $(".pager .btn:not(.disabled)").css("background");
		if(bg_pager && bg_pager.indexOf('0.')<1) st_pager();
	});

	//----- edit tag ----
	$("#edit-tag").bind("DOMSubtreeModified",function(){
		var bg_taginfo = $(".tag-info").css("background");
		if(bg_taginfo && bg_taginfo.indexOf('0.')<1){
			$("#tag-input").css("background-color","#fffc");
			$(".tag-info").css("background","#f3f3f3a0");
		}
		$(".tm-tag-info").css("background-color","#c5eefaa0");
	});

	// ---- comment edit box ----
	$("#AddReplyForm").bind("DOMSubtreeModified",function(){
		var bg_cke_inner = $(".cke_inner").css("background");
		if(bg_cke_inner && bg_cke_inner.indexOf("0.")<1){
			$(".cke_top,.cke_bottom").css({"background":"transparent linear-gradient(rgba(229,245,250,.3), rgba(1,158,213,.3))"});
			$(".cke_inner").css({"background":"transparent linear-gradient(to right, rgba(255,255,255,.5),rgba(255,255,255,.5),rgba(255,255,255,.5),rgba(255,255,255,1),rgba(255,255,255,1))"});
		}
	});

})();
