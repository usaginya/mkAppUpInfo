// ==UserScript==
// @name         百度贴吧首页精简修改
// @namespace    moe.moekai.tiebaindexpure
// @version      0.5
// @description  样式 精简
// @author       YIU
// @match        http*://tieba.baidu.com/index.html*
// @match        http*://tieba.baidu.com/
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function() {
	var $ = unsafeWindow.$;

	//---------------------- 精简首页 --------------------------------------------
	$('#moreforum a').mouseenter();
	$('#moreforum a').mouseout();

	$(".left-cont-wraper").css({"bottom":"300px","position":"fixed"});
	$(".pop-up-frame").css({"position":"fixed"});
	$(".page-container .r-left-sec").css({"width":"100%"});
	$(".n_right").removeClass("n_right");
	$(".r-left-sec").bind('DOMNodeInserted', ()=>{
		$(".n_right").removeClass("n_right");
	});

	let removes = ['#fixed_bar','#spage_liveshow_slide','.forum_recommend',
				   '#right_wrap', '.clearfix.top-sec', '#spage_game_tab_wrapper',
				   '.aggregate_entrance_wrap', '#f-d-w', '.ufw-gap.u-f-t',
				   '.tbshare_popup_enter', '#spage-tbshare-container', '.r-top-sec'];

	$.each(removes,(i,o)=>{
		$(o).remove();
	});
	//-------------------- 去广告 -----------------------------------------------
	$(".new_list").bind('DOMNodeInserted', ()=>{
		$('.forum-list-tag:contains(广告)').parents('li').remove();
	});
	//-------------------- 重定义继续加载标签 -------------------------------------
	$(".more-triangle").attr('id','carousel_wrap');

})();