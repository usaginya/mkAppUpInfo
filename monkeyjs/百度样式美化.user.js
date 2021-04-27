// ==UserScript==
// @name         百度样式美化
// @namespace    https://github.com/usaginya/mkAppUpInfo/blob/master/monkeyjs/%E7%99%BE%E5%BA%A6%E6%A0%B7%E5%BC%8F%E7%BE%8E%E5%8C%96.user.js
// @version      0.6
// @description  美化百度
// @author       YIU
// @icon         https://www.baidu.com/favicon.ico
// @match        *://www.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
	//--------------- STYLE -----------------------------------------
	let st = `<style>
#s_lg_img{filter:drop-shadow(0 0 3px #56acda9a);mix-blend-mode:color}
#su{background:#0072ffa8!important}
#su:hover{background:#0072ffcc!important}
#kw{border-color:#0072ffa8!important;background:#fffa!important}
#kw:focus{border-color:#0072ffdd!important}
#kw:focus,.bdsug{background:#fffc!important}
.soutu-btn{background-color:#fff0!important}
.s-bottom-space{height:20px!important}
.s-top-wrap{height:30px}
.s-skin-hasbg .s-top-wrap{background:rgba(0,0,0,.15)}
.s-top-left .mnav,.s-top-right .s-top-right-text,.s-weather-wrapper{margin-top:5px}
.s-top-right .s-top-username{margin-top:2px}
.s-top-right .s-top-username .s-top-img-wrapper{width:20px;height:20px;top:2px}
.s-top-right .s-top-username img{padding:0;width:20px;height:20px}
.s-top-userset-menu,.s-mod-setweather{top:30px}
.s-skin-hasbg #s_main{background:rgba(255,255,255,.3)}
.s-code-blocks{box-shadow:none}
#bottom_layer{display:none}
</style>`;

	let ru = `<style>
	body{background:linear-gradient(#fffc,#fffc),url(https://random.52ecy.cn/randbg.php) center center / cover no-repeat fixed!important;
	background-attachment:fixed!important;background-repeat:no-repeat;background-position:center center}
	.wrapper_new .sam_newgrid~#page a,.c-tabs-nav .c-tabs-nav-selected,.c-tabs-nav,.c-tabs-item{background:#fff8!important}
	#head,.selected-search-box,.bdpfmenu,.usermenu{background:#fff8!important;backdrop-filter:blur(3px)}
	.wrapper_new #u .bdpfmenu a:hover,.wrapper_new #u .usermenu a:hover{background-color:#fffe!important;transition-duration:.3s}
	.wrapper_new #s_tab{padding-top:72px!important}
	.wrapper_new .s_ipt_wr{background:#fff7!important;transition-duration:.3s}
	.wrapper_new .s_ipt_wr:hover{background:#fffa!important;transition-duration:.3s}
	.bdsug{background:#fffc!important;backdrop-filter:blur(3px)}
	#container.sam_newgrid .c-container .t a,#container.sam_newgrid .c-container .c-title a{text-decoration:none!important}
	#container.sam_newgrid .c-container .t a:hover{text-decoration:underline!important}
	#container.sam_newgrid .c-container .c-title a:hover{text-decoration:underline!important}
	#container.sam_newgrid #content_left .result-op,#container.sam_newgrid #content_left .result,
	#rs,.video_list{margin-bottom:8px!important;background:#fff5!important;border-radius:8px!important;padding:10px!important;transition-duration:.5s}
	#container.sam_newgrid #content_left .result-op:hover,#container.sam_newgrid #content_left .result:hover,
	.video_list:hover{background:#fffb!important;box-shadow:#0003 0 2px 9px;transition-duration:.5s}
	.new-pmd .c-border,.c-group-wrapper{background:#fff5!important;transition-duration:.5s}
	.new-pmd .c-border:hover{background:#fffb!important;transition-duration:.5s}
	#content_right{opacity:.5;transition-duration:1s}#content_right:hover{opacity:1;transition-duration:.5s}
	#foot,.wrapper_new .sam_newgrid~#page{background-color:#f5f5f666!important}
	#foot #help,.c-tip-con .c-tip-menu li a,.bdpfmenu a:link,.bdpfmenu a:visited,#u .usermenu a:link,#u .usermenu a:visited,#wrapper #rs .tt,
	#wrapper #content_left .result[tpl='soft'] .op-soft-title,#wrapper #content_left .result h3,#wrapper #content_left .c-container h3,
	.op_express_delivery_hidemore,.op_express_delivery_showmore{background-color:#fff0!important}
	.c-tip-con .c-tip-menu li a:hover{background-color:#ccc6!important;transition-duration:.3s}
	.c-tip-con,#c-tip-custom-calenderCont,#c-tip-custom-calenderCont .op_cal{background:#fffb!important;backdrop-filter:blur(3px)}
	.soutu-hover-tip,.soutu-env-new .soutu-layer .soutu-state-normal,.soutu-env-new .soutu-layer .soutu-error,.soutu-env-new .soutu-layer .soutu-waiting{background:#fffd}
	.wrapper_new .sam_newgrid~#page strong,.wrapper_new .sam_newgrid~#page a:hover,
	.wrapper_new .sam_newgrid~#page a:hover .pc,.wrapper_new .sam_newgrid~#page .n:hover{background:#0089ffab!important;color:#fff!important}
	.new-pmd .c-tabs.c-sub-tabs .c-tabs-nav,.new-pmd .c-tabs-content,.op_express_delivery_more{background-color:#fff6!important}
	#wrapper #s_tab,.op_new_cal_screen{background-color:#fff2!important}
	.c-tabs-item .c-btn:hover{background:#ccc6!important}
	</style>`;

	if(window.location.href.indexOf('.com/s')<0)
	{
		$("body").append(st);
		return;
	}

	if(window.location.href.indexOf('.com/s')>0) {
		$("body").append(ru);

		let interval_count = 0;
		let interval_clearad = setInterval(()=>{
			if(interval_count>15){
				clearInterval(interval_clearad);
				return;
			}
			if($('.result-op[tpl="right_game_recommend"]').length>0){
				$('.result-op[tpl="right_game_recommend"]').remove();
				clearInterval(interval_clearad);
			}
		},200);

		return;
	}

})();