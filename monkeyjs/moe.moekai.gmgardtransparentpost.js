// ==UserScript==
// @name         绅士之庭透明文章
// @namespace    moe.moekai.gmgardtransparentpost
// @version      0.3
// @description  让绅士之庭的文章底色透明
// @author       YIU
// @match        http*://gmgard.com/*
// @icon         http://gmgard.com/favicon.ico
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
	$("hr").css("border-top-color","#eee8");
	$("hr").css("border-bottom-color","#eee8");
	$("#body").css("background-color","#ffffffaa");
	$(".categories").css("background","#ffffff99");
	$("#blog").css("background-color","#fff0");

	$(".home-list").css("background-color","#f7f7de50");
	$("#rankContent").css("background-color","#daebf470");
	$(".author-info").css("background","#f3f3f380");
	$(".author-sign").css("background","#ffffff80");
	$(".spoiler-content").css("background","none repeat scroll 0 0 #f5f5f590");
	$(".spoiler-content span[style*='background-color']").css("background-color","#000000cc");

	$("#rankContent").append("<style>.rankflag::after{background:linear-gradient(150deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}</style>");
	$("#rankContent").append("<style>.rankflag::before{background:linear-gradient(210deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}</style>");

	$(window).scroll(function(){
		if(getScrollPercent() == 60)
		{
			$(".bubble").css("background","#ffffff90");
			$(".bubble").append("<style>.bubble::after{border-width:10px 15px 10px 0;border-color:transparent #ffffffe6;}</style>");
		}
	});

	function getScrollPercent()
	{
		var scrollTo = $(window).scrollTop(),
			docHeight = $(document).height(),
			windowHeight = $(window).height();
		scrollPercent = (scrollTo / (docHeight-windowHeight)) * 100;
		scrollPercent = scrollPercent.toFixed(1);
		return scrollPercent;
	}
})();
