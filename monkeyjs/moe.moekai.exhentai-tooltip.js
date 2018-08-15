// ==UserScript==
// @name         ExHentai列表标题悬浮提示
// @namespace    moe.moekai.exhentai-tooltip
// @version      0.6
// @description  给ExHentai缩略图列表标题添加悬浮提示来显示完整标题
// @author       YIU
// @icon         https://exhentai.org/favicon.ico
// @match        *://exhentai.org/
// @match        *://exhentai.org/?*
// @require      https://cdn.bootcss.com/jquery/2.2.0/jquery.min.js
// @require      http://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {

	var headlabel = '<link rel="stylesheet" href="//apps.bdimg.com/libs/jqueryui/1.10.4/css/jquery-ui.min.css">';
	headlabel += '<script>$(function(){$(document).tooltip({position:{using:function(position){$(this).css(position);$("<div>").addClass("arrow").appendTo(this);}},track:true});});</script>';
	headlabel += '<style>.ui-tooltip,.arrow:after{background:#001b;border:1px solid #446}.ui-tooltip{padding:8px 10px;color:white;font:14px"Microsoft yahei",Sans-Serif;box-shadow:0 0 7px #446}</style>';

	$('head').append(headlabel);

	$(".id2 a").each(function(){
		$(this).attr({
			"title" : $(this).text()
		});
	});

})();
