// ==UserScript==
// @name         绅士之庭透明文章
// @namespace    moe.moekai.gmgardtransparentpost
// @version      1.1
// @description  让绅士之庭的文章底色透明
// @author       YIU
// @match        http*://gmgard.com/*
// @icon         http://gmgard.com/favicon.ico
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
	//---------- Modify the style ----------//
	$("hr").css("border-top-color","#eee8");
	$("hr").css("border-bottom-color","#eee8");
	$("#body").css("background-color","#ffffffaa");
	$(".categories").css("background","#ffffff99");
	$("#blog").css("background-color","#fff0");
	$(".well").css("background-color","#f5f5f5b8");

	$(".reply-section").css("background","#efeeef90");
	$(".home-list").css("background-color","#f7f7de50");
	$(".home-settings").css("background","#dddddd50");
	$("#rankContent").css("background-color","#daebf470");
	$(".author-info").css("background","#f3f3f380");
	$(".author-sign").css("background","#ffffff80");
	$(".spoiler-content").css("background","none repeat scroll 0 0 #f5f5f590");
	$(".spoiler-content span[style*='background-color']").css("background-color","#000000cc");
	$("#main[style]").css("background","linear-gradient(135deg,#cebe29a6 0,#9b1f50a8 33%,#2989d8a8 71%,#89b4ffa8 91%)");
	$(".navbar-inner").css({"background-color":"#fff0","background-image":"linear-gradient(to bottom,#ffffffa0,#f2f2f280)"});

	$("#rankContent").append("<style>.rankflag::after{background:linear-gradient(150deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}</style>");
	$("#rankContent").append("<style>.rankflag::before{background:linear-gradient(210deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}</style>");

	$("footer").css("background-color","#e2e2e2e0");

	function changeCommentStyle()
	{
		$(".bubble").css("background","#ffffff90");
	}
	//--------------------------------------------------//

	$(window).scroll(function(){
		if(!window.bubbleok)
		{
			if(getScrollPercent()>60 && $(".bubble").length>0 || $(".bubble").length>0)
			{
				changeCommentStyle();
				AddPostFlipListener();
				window.bubbleok = true;
			}
		}
	});

	function AddPostFlipListener(){
		$(".post-nav li a").each(function(){
			this.addEventListener('click',FlipEvent);
		});
	}

	function FlipEvent(e)
	{
		var limit = 0;
		var oldp = $(".bubble")[0];
		var si = setInterval(okcheck, 500);

		function okcheck(){
			if($(".bubble").length>0 && !$(".bubble")[0].isEqualNode(oldp))
			{
				clearInterval(si);
				changeCommentStyle();
				AddPostFlipListener();
			}
			else if(limit > 18)
			{
				clearInterval(si);
				AddPostFlipListener();
			}
			limit++;
		}
	}

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
