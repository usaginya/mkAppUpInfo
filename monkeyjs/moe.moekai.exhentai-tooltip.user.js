// ==UserScript==
// @name         ExHentai列表标题悬浮提示
// @namespace    moe.moekai.exhentai-tooltip
// @version      0.4
// @description  给ExHentai缩略图列表标题添加悬浮提示来显示完整标题
// @author       YIU
// @icon         https://exhentai.org/favicon.ico
// @match        *://exhentai.org/
// @match        *://exhentai.org/?*
// @match        *://e-hentai.org/
// @match        *://e-hentai.org/?*
// @require      https://cdn.bootcss.com/jquery/2.2.0/jquery.min.js
// @require      https://cdn.bootcss.com/jqueryui/1.10.4/jquery-ui.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {

	var headlabel = '<link rel="stylesheet" href="https://cdn.bootcss.com/jqueryui/1.11.0/jquery-ui.min.css">';
	headlabel += '<style>.ui-tooltip,.arrow:after{background:#001b;border:1px solid #446}.ui-tooltip{padding:8px 10px;color:white;font:14px"Microsoft yahei",Sans-Serif;box-shadow:0 0 7px #446}</style>';

	$('head').append(headlabel);

	$('.itg').tooltip({
		position:{
			using:function(position){
				$(this).css(position);
				$("<div>").addClass("arrow").appendTo(this);
			}
		},
		track:true
	});

	$(".id2 a").each(function(){
		$(this).attr({
			"title" : $(this).text()
		});
	});

})();
