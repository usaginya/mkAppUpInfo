// ==UserScript==
// @name         清理百度贴吧插入广告
// @icon         http://www.gzqiyi.cn/fximg/delicious.gif
// @namespace    moekai.moe.cleartiebaad
// @version      1.2.1
// @description  清理掉贴吧列表和贴子中插入的广告
// @author       YIU
// @match        *://tieba.baidu.com/f*
// @match        *://tieba.baidu.com/p/*
// @run-at       document-start
// @require      https://libs.baidu.com/jquery/2.0.3/jquery.min.js
// @compatible   chrome OK
// @compatible   firefox OK
// ==/UserScript==

//======== 你可以修改这下面的开关数值 (0不清理 1清理) ========
//清理楼层右下角成就图标
var delams = 1;



//======== 清理样式构建,不要修改 =========//
var kamikakushi = '<style id="kamikakushi">';

//----------- 神隐AD -----------//

//-- 贴吧贴子列表, 贴子中插入
kamikakushi += '.threadlist_bright>li:not([data-tid]), [ad-dom-img], .fengchao-wrap-feed, [class*=-ad-], .tbui_aside_float_bar + div';

//-- 贴子楼层成就图标
if(delams > 0){
	kamikakushi += ',.achievement_medal_section';
}

//-- 贴吧背景左右链接, 右边栏推荐应用
kamikakushi += ',body>.j_couplet, .aside_region.my_app';

//-- 贴子顶部banner, 右边栏图片
kamikakushi += ',#banner_pb_customize, #branding_ads, #aside-ad, #fc-wrap';
kamikakushi += ',.lu-search-box';

//-- 贴吧底部关注提示
kamikakushi += ',.xiu8_follow_warn';

//------! 神隐 !------
kamikakushi += '{display:none!important}';


//---- 神隐保护 (以ID选择来提高优先级) ----//

//-- 置顶贴列表
kamikakushi += '#thread_list>.thread_top_list_folder';

//------! 保护 !------
kamikakushi += '{display:block!important}';

//-----------------------------------//
kamikakushi += '</style>';

//======== 清理样式构建结束 =========//


//======== 执行区,不要修改 =======
(function(){

	$('head').append(kamikakushi);

	//等待到页面载入后再检查注入、没有注入则重新注入
	$(document).ready(function(){
		if ($('#kamikakushi').length > 0) return;
		$('head').append(kamikakushi);
	});

})();