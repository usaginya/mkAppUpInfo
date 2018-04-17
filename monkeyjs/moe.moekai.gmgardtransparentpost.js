// ==UserScript==
// @name         绅士之庭透明文章
// @namespace    moe.moekai.gmgardtransparentpost
// @version      1.92
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
	$("span[style='background-color:#000000']").css("background","#000000a5");
	$("hr").css({"border-top-color":"#eee8","border-bottom-color":"#eee8"});

	$(".reply-section").css("background","#efeeef90");
	$(".home-list").css("background-color","#f7f7de50");
	$(".home-settings").css("background","#dddddd50");
	$("#rankContent").css("background-color","#daebf470");
	$(".author-info").css("background","#f3f3f380");
	$(".author-sign").css("background","#ffffff80");
	$(".spoiler-content").css("background","none repeat scroll 0 0 #f5f5f590");
	$(".spoiler-content span[style*='background-color']").css("background-color","#000000a5");
	$("#main:contains('DailyRankings')").css("background","linear-gradient(135deg,#cebe29a6 0,#9b1f50a8 33%,#2989d8a8 71%,#89b4ffa8 91%);");
	$(".navbar-inner").css({"background-color":"#fff0","background-image":"linear-gradient(to bottom,#ffffffa0,#f2f2f280)"});
	$(".btn-info").css({"background":"transparent linear-gradient(to bottom,#5bc0dea0,#2f96b480)"});

	var strs = "<style>";
	strs += "pre{background-color:#f5f5f599}";
	strs +=".user-bg h2,.user-bg .user-stats,.user-bg .user-numbers-div,.userinfo h3{background-color:transparent!important}";
	strs += ".rankflag::after{background:linear-gradient(150deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}";
	strs += ".rankflag::before{background:linear-gradient(210deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}";
	strs += ".nav-tabs .active a,.nav-tabs .active a:hover,.nav-tabs .active a:focus,.user-comment{background-color:#fffa}";
	strs += ".feed-item{background-color:#fff9}";
	strs += ".feed-footer{background:#f7f6f980}";
	strs += "</style>";
	$("head").append(strs);

	//--- footer ---
	$("footer").css("background-color","#e2e2e2e0");

	//--- btn style ---
	var st_btn = function(){
		$(".btn-toolbar .btn,.searchbtn,.favbtn,#blog a[onclick*='rptBlog'],#newtag .btn,.author-info .btn:not(.disabled)").css({"background":"#f5f5f5b0","background-image":"none"});
	};
	st_btn();

	//--- pager style ---
	var st_pager = function(){
		$("#jumppage,#postjumppage").css("background-color","#fffc");
		$(".pager .btn,.ajax-pager .btn").css({"background":"#fffc","background-image":"none"});
	};
	st_pager();

	//---- main change ----
	$("#main .content-wrapper").bind("DOMSubtreeModified",function(e){
		var bg_set = $(".bubble").css("background");
		if(bg_set && bg_set.indexOf('0.')<1){
			$(".bubble").css("background","#ffffff90");
			$(e.target).append("<style>.bubble::after{border-right-width:15px;border-color:transparent #fffffff0}</style>");
		}
		//-- btn-toolbar --
		bg_set = $(".HGworks .btn-toolbar .btn").css("background");
		if(bg_set && bg_set.indexOf('0.')<1) st_btn();
		//-- pager --
		bg_set = $(".pager .btn,.ajax-pager .btn").not(".disabled").css("background");
		if(bg_set && bg_set.indexOf('0.')<1) st_pager();
		//-- HG --
		bg_set = $(".well").css("background-color");
		if(bg_set && bg_set.indexOf("0.")<1) {$(".well").css("background-color","#f5f5f5b8"); st_btn();}
	});

	//----- edit tag ----
	$("#edit-tag").bind("DOMSubtreeModified",function(){
		var bg_taginfo = $(".tag-info").css("background");
		if(bg_taginfo && bg_taginfo.indexOf('0.')<1){
			$("#tag-input").css("background-color","#fffc");
			$(".tag-info").css("background","#f3f3f3a0");
		}
		$(".tm-tag-info").css({"color":"#4594b5","background-color":"#c5eefaa0"});
		$(".tm-tag").not(".tm-tag-info").css({"color":"#368000","background-color":"#b1ff6b80"});
	});

	//---- comment edit box ----
	$("#AddReplyForm").bind("DOMSubtreeModified",function(){
		var bg_cke_inner = $(".cke_inner").css("background");
		if(bg_cke_inner && bg_cke_inner.indexOf("0.")<1){
			$(".cke_toolgroup").css("background","transparent");
			$(".cke_top,.cke_bottom").css({"background":"transparent linear-gradient(rgba(229,245,250,.3), rgba(1,158,213,.3))"});
			$(".cke_inner").css({"background":"transparent linear-gradient(to right, rgba(255,255,255,.5),rgba(255,255,255,.5),rgba(255,255,255,.5),rgba(255,255,255,1),rgba(255,255,255,1))"});
		}
	});

})();
