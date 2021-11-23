// ==UserScript==
// @name         度娘搜索萌化ecchi
// @namespace    https://cdn.jsdelivr.net/gh/usaginya/mkAppUpInfo@master/monkeyjs/moe.moekai.moebaidu.ecchi.user.js
// @version      3.0.9
// @description  萌化度娘搜索18+限制级
// @author       YIU
// @icon         https://www.baidu.com/favicon.ico
// @match        *://www.baidu.com/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      moest.top
// @run-at       document-start
// @require      https://libs.baidu.com/jquery/2.0.3/jquery.min.js
// @require      https://cdn.jsdelivr.net/gh/matthias-vogt/legitRipple.js@gh-pages/js/ripple.js
// ==/UserScript==

(function(){
	//--------------- STYLE -----------------------------------------
	let st = `<style>
	#lg img{opacity:.2;transition:opacity 1s}
	#lg:hover img{opacity:.9}
	#head_wrapper.s-ps-islite #s_lg_img,#head_wrapper.s-ps-islite #s_lg_img_aging,
	 #head_wrapper.s-ps-islite #s_lg_img_new{filter:drop-shadow(0 0 3px #56acda9a);mix-blend-mode:color}
	#su{background:#0072ffa8!important}
	#su:hover{background:#0072ffcc!important}
	#kw,#soutu-url-kw{border-color:#0072ffa8!important;background:#fffa!important}
	#kw:focus{border-color:#0072ffdd!important}
	#kw:focus,.bdsug,.s-skin-layer{background:#fffc!important;backdrop-filter:blur(3px)}
	.s-skin-layer{backdrop-filter:blur(8px)!important}
	#wrapper #form .bdsug-new .bdsug-s{background-color:#fff5!important;backdrop-filter:blur(8px);box-shadow:0 0 5px 0px #fff5}
	.soutu-drop,.soutu-state-normal,.soutu-error,.soutu-waiting,#aging-tools-pc>div div[class|=float]{background:#fffb!important}
	.soutu-btn{background-color:#fff0!important}
	.soutu-url-btn-new{color:#eee!important;background-color:#e4e4e533!important}
	.soutu-url-btn-new:hover{background-color:#85d2ff80!important}
	.upload-wrap{background: #4e71f2b0!important}
	.s-bottom-space{height:20px!important}
	.s-top-wrap{height:30px}
	.s-top-right .s-top-login-btn{margin-top:2px;margin-left:18px}
	.s-skin-layer .s-skin-up{color:#b5b6bd!important}
	.s-skin-layer .s-skin-up:hover{color:#315efbf5!important}
	.s-skin-layer .subnav-tag,.s-skin-layer .defined-state-chooseimg,.s-skin-layer .skin-img-list .no-img{background:#f2f2f890!important}
	.s-top-more,.soutu-hover-tip,.s-mod-setweather,.c-floating-box{background:#fffb!important;backdrop-filter:blur(5px)!important}
	.setweather-content .warn-mod{background:#f2f2f850!important}
	.s-skin-hasbg .s-top-wrap{background:rgba(0,0,0,.15)}
	.s-top-left .mnav,.s-top-right .s-top-right-text,.s-weather-wrapper{margin-top:5px}
	.s-top-right .s-top-username{margin-top:2px}
	.s-top-right .s-top-username .s-top-img-wrapper{width:20px;height:20px;top:2px}
	.s-top-right .s-top-username img{padding:0;width:20px;height:20px}
	.s-top-userset-menu,.s-mod-setweather{top:30px}
	.s-skin-hasbg #s_main{background:#ffffff4d;transition:.3s}
	.s-skin-hasbg #s_main:hover{background:#ffffff99}
	.s-code-blocks{box-shadow:none}
	#bottom_layer{display:none}
	#aging-tools-pc>div{background:#eee9!important}
	#aging-tools-pc>div div[class|=item]>div[class|=icon]:not([class*=choosed]){background-color:#fff9}
	#aging-tools-pc>div div[class|=item]:hover>div[class|=icon],
	 #aging-tools-pc>div div[class|=item][class*=checked]>div[class|=icon]{background-color:#6d87f2!important}
	#aging-tools-pc>div div[class|=pop]{background:#fffc;backdrop-filter:blur(10px)}
	.darkmode.dark input:not(#kw){background-color:#2228}
	.darkmode.dark [class*=input_]{color:#eee}
	.darkmode.dark{background-color:#1f1f25cc!important}
	.darkmode.dark #bottom_layer,.darkmode.dark #head,.darkmode.dark #s_menu_gurd.s-down,
	 .darkmode.dark #s_wrap{background-color:#0000}
	.darkmode.dark #s_top_wrap,.darkmode.dark #s_top_wrap.s-down .s-center-box{background-color:#3338}
	.darkmode.dark #aging-tools-pc>div{background:#000b!important}
	.darkmode.dark #aging-tools-pc>div div[class|=item]>div[class|=icon]:not([class*=choosed]){background-color:#3339}
	.darkmode.dark #aging-tools-pc>div div[class*=item-text]{color:#aaa}
	.darkmode.dark #aging-tools-pc>div div[class|=pop] div[class*=barBac]{background:#0006}
	.darkmode.dark #aging-tools-pc>div div[class|=pop]{background:#0006}
	.darkmode.dark #aging-tools-pc>div div[class|=pop]>div[class*=left]{color:#ddd}
	.darkmode.dark #aging-tools-pc>div div[class|=pop] button{background:#5555;color:#ddd}
	.darkmode.dark #aging-tools-pc>div div[class|=pop] button:hover{color:#7bf}
	.darkmode.dark #aging-tools-pc>div div[class|=float]{background:#222b!important}
	.darkmode.dark .s-skin-hasbg #s_main{background:#22222555}
	.darkmode.dark .s-skin-hasbg #s_main:hover{background:#22222599}
	.darkmode.dark .s-top-more,.darkmode.dark .soutu-hover-tip,.darkmode.dark .s-mod-setweather,
	 .darkmode.dark .c-floating-box{background:#333b!important}
	.darkmode.dark .soutu-hover-tip{color:#eee}
	.darkmode #s-user-name-menu a,.darkmode #s-user-name-menu a:visited,.darkmode #s-user-setting-menu a,
	 .darkmode #s-user-setting-menu a:visited{color:#b9a260}
	.darkmode #s-user-name-menu a:hover,.darkmode #s-user-setting-menu a:hover{color:#fff762}
	.darkmode.dark .setweather-content .warn-mod{background:#30303050!important}
	.darkmode.dark .title-content:hover,.darkmode.dark .hot-refresh:hover .c-icon,.darkmode.dark .hot-refresh:hover .hot-refresh-text{color:#5af}
	#s_side_wrapper{opacity:.3;transition:.3s}
	#s_side_wrapper:hover{opacity:.9}
	::-webkit-scrollbar{width:1rem;height:1rem}
	::-webkit-scrollbar-track-piece:vertical{background:#fff;box-shadow:inset 8px 0 8px #d3dbe0, inset -2px 0 8px #f5f5f5}
	::-webkit-scrollbar-track-piece:horizontal{background:#fff;box-shadow:inset 0 8px 8px #d3dbe0, inset 0 -2px 8px #f5f5f5}
	::-webkit-scrollbar-thumb{border-radius:1rem}
	::-webkit-scrollbar-thumb:vertical{background:linear-gradient(92deg,#fcffff,#ccd2d8);box-shadow:5px 7px 10px #959ca5, 5px -7px 10px #c8d0da}
    ::-webkit-scrollbar-thumb:horizontal{background:linear-gradient(180deg,#fcfdff,#ccd2d8);box-shadow:5px 7px 10px #959ca5, -5px 7px 10px #959ca5}
	</style>`;

	let ru = `<style>
	#result_logo{opacity:.6}
	#result_logo .index-logo-src{display:block!important}
	#result_logo .index-logo-srcnew,#result_logo .index-logo-peak{display:none!important}
	#aging-tools-wrapper{transition-duration:.3s}
	#wrapper.hideWrapper,#aging-tools-wrapper.hideWrapper{transition-duration:1s}
	#head,#wrapper #s_tab{background:#fff2!important;backdrop-filter:blur(3px);transition-duration:.3s}
	#head:hover,#wrapper #s_tab:hover{background:#fff6!important;transition-duration:.3s}
	#con-at .result-op{width:90%!important;border-radius:16px!important}
	[class*="bac-box_"]{background:#fff0!important}
	[class*="bac-img_"]{opacity:.7!important}
	[class^="view-right_"]{right:6%!important}
	.view-bac_PurEx{padding-right:12px!important}
	.c-container{width:100%!important}
	.dropdown-menu,.c-dropdown2 .c-dropdown2-menu{position: fixed!important;left:auto!important;top:auto!important;width:auto!important;}
	#s_tab .cur-tab,#s_tab .s-tab-item:hover,#u>a{color:#222!important}
	#s_tab .cur-tab:before,#s_tab a,#s_tab b,#s_tab .s-tab-item:hover:before{color:#626675!important}
	#s_tab a,#s_tab b{margin-right:auto!important;padding:0 13px 0 13px;text-align:center!important}
	#s_tab .cur-tab:after{background:#0095ff!important}#u>a:hover{color:#0095ff!important}#s_tab b{border-bottom:#0095ff!important}
	.s-tab-item{position:relative;transition:.2s all ease-in-out}
	.s-tab-item:after,#wrapper #content_left .op-soft-title a:after{content: '';position:absolute;left:100%;width:0;height:100%;
	 border-bottom:2px solid #5cf;transition:.2s all ease-in-out}
	.s-tab-item:hover:after,#wrapper #content_left .op-soft-title a:hover:after{width:100%;left:0;transition-delay:.1s}
	.s-tab-item:hover~.s-tab-item:after{left:0}
	#s_tab .s-tab-item:before{color:#c0c2c8!important}
	#wrapper #content_left .result h3 a:hover,#wrapper #content_left .result-op h3 a:hover,
	 .c-link:hover{background:-webkit-linear-gradient(left,#d50,#d00 6.25%,#dd5d00 12.5%,#dd0 18.75%,#0d0 25%,#0dd 31.25%,#00d 37.5%,
	 #d0d 43.75%,#dd0 50%,#d00 56.25%,#dd5d00 62.5%,#dd0 68.75%,#0d0 75%,#0dd 81.25%,#00d 87.5%,#d0d 93.75%,#dd0 100%);
	 -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 100%;animation:masked-animation 3s infinite linear}
	 @keyframes masked-animation{0%{background-position: 0 0}100%{background-position: -100%, 0}}
	#su{background-color:#4ea6f2aa!important;transition-duration:.5s}#su:hover{background-color:#4e88f2ee!important;transition-duration:.2s}
	.wrapper_new .iptfocus.s_ipt_wr,.wrapper_new #form .bdsug-new{border-color: #4e71f2bb!important;transition-duration:.2s}
	.sam_newgrid~#page a,.c-tabs-nav .c-tabs-nav-selected,.c-tabs-nav,.c-tabs-item,.c-input{background:#fff8!important}
	.selected-search-box{background:#fff8!important;backdrop-filter:blur(3px)}
	.bdsug,.bdpfmenu,.usermenu{background:#fffd!important;backdrop-filter:blur(3px)}
	#u .bdpfmenu a:hover,#u .usermenu a:hover{background-color:#5bf3!important;transition-duration:.3s}
	#s_tab{padding-top:72px!important}
	.s_ipt_wr{background:#fff7!important;transition-duration:.3s}
	.s_ipt_wr:hover{background:#fffa!important;transition-duration:.3s}
	#wrapper #content_left .op-soft-title a,#wrapper #content_left .result h3 a,#wrapper #content_left .result-op h3 a{position:relative}
	#container.sam_newgrid .c-container .t a,#container.sam_newgrid .c-container .c-title a,a em{text-decoration:none!important}
	#container.sam_newgrid #content_left .result-op,#container.sam_newgrid #content_left .result,
	#rs,.video_list{margin-bottom:8px!important;background:#fff8!important;border-radius:8px!important;padding:10px!important;transition-duration:.5s}
	#container.sam_newgrid #content_left .result-op:hover,#container.sam_newgrid #content_left .result:hover,
	.video_list:hover{background:#fffb!important;box-shadow:#0003 0 2px 9px;transition-duration:.5s}
	.new-pmd .c-border,.c-group-wrapper{background:#fff5!important;transition-duration:.5s}
	.new-pmd .c-border:hover{background:#fffb!important;transition-duration:.5s}
	#content_right{opacity:.01;transition-duration:.38s}#content_right:hover{opacity:1;transition-duration:.38s}
	#foot,.sam_newgrid~#page,.x-interact-publish-cont,#container.sam_newgrid div[class*=has-content_] textarea,
	.result-molecule>#page,.recommend-line-one .recommend-item-a{background-color:#f5f5f666!important}
	.result-molecule>#page strong{background-color:#4e90f2d4!important}
	.result-molecule>#page a:hover,.result-molecule>#page .n:hover,.darkmode.dark .result-molecule>#page a:hover,
	.darkmode.dark .result-op [class*=pag-item_]:not([class*=active]):hover{background:#4e90f2c0!important;color:#fff!important}
	#foot #help,.c-tip-con [class*=menu] li a,.bdpfmenu a:link,.bdpfmenu a:visited,#u .usermenu a:link,#u .usermenu a:visited,#wrapper #rs .tt,
	#wrapper #content_left .result[tpl='soft'] .op-soft-title,#wrapper #content_left .result h3,#wrapper #content_left .c-container h3,
	.op_express_delivery_hidemore,.op_express_delivery_showmore,#wrapper #content_left .c-container
	.ms-measures-content .op-unit-tabs-nav-container,.ms-measures-content .tabs-nav,[class*=dis_able],[class*=time_li_],
	 [class*=pop_over_] li{background-color:#fff0!important}
	[class*=pop_over_] li:hover{background-color:#5bf3!important}
	.c-tip-con [class*=menu] li a:hover{background-color:#ccc6!important;transition-duration:.3s}
	.c-tip-con,#c-tip-custom-calenderCont,#c-tip-custom-calenderCont .op_cal,#container.sam_newgrid div[class*=has-content_],
	 [class*=pop_over_]{background:#fffb!important;backdrop-filter:blur(3px)}
	[class*=normal_color_]{background:#fffb}
	[class*=input_]{background-color:#fffb}
	[class*=dis_able]:not([class*=file_li_]){color:#88a!important}
	[class*=calendar-wrapper_]{background:#fffe!important}
	.soutu-hover-tip,.soutu-env-new .soutu-layer .soutu-state-normal,.soutu-env-new .soutu-layer .soutu-error,.soutu-env-new .soutu-layer .soutu-waiting{background:#fffd}
	.sam_newgrid~#page strong,.sam_newgrid~#page a:hover,
	.sam_newgrid~#page a:hover .pc,.sam_newgrid~#page .n:hover{background:#0089ffab!important;color:#fff!important}
	.new-pmd .c-tabs.c-sub-tabs .c-tabs-nav,.new-pmd .c-tabs-content,.op_express_delivery_more,.result-molecule>#page a{background-color:#fff6!important}
	.op_express_delivery_input{background:#fafafa77!important}
	.op_new_cal_screen,[data-pmd] .c-container,.col-header .col-overview{background-color:#fff2!important}
	.c-tabs-item .c-btn:hover{background:#ccc6!important}
	.col-header-wrap::before{background:-webkit-linear-gradient(150deg,#00d3ea6b,#00cfa3b0)!important;background:linear-gradient(-60deg,#00d3ea6b,#00cfa3b0)!important}
	div .sp-separator{width:100%;background-color:#fffa!important;backdrop-filter:blur(6px);transition-duration:.3s}
	div .sp-separator:hover{transition-duration:.3s}
	.result-op [class*=card_]{background:#fffc;backdrop-filter:blur(8px)}
	::-webkit-scrollbar{width:.16rem;height:.17rem}
	::-webkit-scrollbar-track-piece:vertical{background:#fff;box-shadow:inset 8px 0 8px #d3dbe0, inset -2px 0 8px #f5f5f5}
	::-webkit-scrollbar-track-piece:horizontal{background:#fff;box-shadow:inset 0 8px 8px #d3dbe0, inset 0 -2px 8px #f5f5f5}
	::-webkit-scrollbar-thumb{border-radius:.1rem}
	::-webkit-scrollbar-thumb:vertical{background:linear-gradient(92deg,#fcffff,#ccd2d8);box-shadow:5px 7px 10px #959ca5, 5px -7px 10px #c8d0da}
    ::-webkit-scrollbar-thumb:horizontal{background:linear-gradient(180deg,#fcfdff,#ccd2d8);box-shadow:5px 7px 10px #959ca5, -5px 7px 10px #959ca5}
	[tpl^=right_game_recommend]{display:none}
	.op-qr{top:-100px!important;left:auto!important}
	.result-molecule[tpl*="app/rs"] td a{background:#f5f5f699!important}
	.result-molecule[tpl*="app/rs"] td a:hover{background:#f0f3fdbb!important}
	div[class*=button-list_] div[class*=item_] a{background:#eee9}
	div[class*=button-list_] div[class*=item_] a:hover{background:#5bf3}
	#aging-tools-pc>div{background:#eee9!important}
	#aging-tools-pc>div div[class|=item]>div[class|=icon]:not([class*=choosed]){background-color:#fff9}
	#aging-tools-pc>div div[class|=item]:hover>div[class|=icon],
	 #aging-tools-pc>div div[class|=item][class*=checked]>div[class|=icon]{background-color:#6d87f2!important}
	#aging-tools-pc>div div[class|=float]{background:#fffb!important}
	#aging-tools-pc>div div[class|=pop]{background:#fffc;backdrop-filter:blur(10px)}
	.xdp{overflow:overlay}.xdp::-webkit-scrollbar{width:.1rem;height:.1rem}
	.x-interact-publish .emoj-panel{margin:0 12px;width:96%;right:0!important}
	.xdp .no-margin-left{margin-right:10px}
	.darkmode.dark input:not(#kw){background-color:#2228}
	.darkmode.dark [class*=input_]{color:#eee}
	.darkmode.dark #aging-tools-pc>div{background:#0004!important}
	.darkmode.dark #aging-tools-pc>div div[class|=item]>div[class|=icon]:not([class*=choosed]){background-color:#3339}
	.darkmode.dark #aging-tools-pc>div div[class*=item-text]{color:#aaa}
	.darkmode.dark #aging-tools-pc>div div[class|=pop] div[class*=barBac]{background:#0006}
	.darkmode.dark #aging-tools-pc>div div[class|=pop]{background:#0006}
	.darkmode.dark #aging-tools-pc>div div[class|=pop]>div[class*=left]{color:#ddd}
	.darkmode.dark #aging-tools-pc>div div[class|=pop] button{background:#5555;color:#ddd}
	.darkmode.dark #aging-tools-pc>div div[class|=pop] button:hover{color:#7bf}
	.darkmode.dark #aging-tools-pc>div div[class|=float]{background:#222b!important}
	.darkmode.blue{background-color:#141e42cc!important}
	.darkmode em,.darkmode.dark div[class*=button-list_] span[class*=label_]{color:#f77!important}
	.darkmode.dark #su{background-color:#3f3dc780!important}
	.darkmode.dark #su:hover{background-color:#5545ddaa!important}
	.darkmode.dark a:not(span):not([class*=op_weather]):not(.OP_LOG_LINK),.darkmode.dark h3[class*=title_],
	 .darkmode.dark .result-op [class*=pag-item_]:not([class*=active]),
	 .darkmode.dark .a-se-st-single-video-zhanzhang-capsule,.darkmode.dark .translateContent,
	 .darkmode.dark .pftab .pftab_hd .cur,.darkmode.dark .advanced-setting .adv-input-prepend,
	 .darkmode.dark .col-header .overview-desc-wrap,.darkmode.dark .b2c-universal-card a .c-title .c-title-text,
	 .darkmode.dark [class*=time_li_]{color:#9db2ff!important}
	.darkmode.dark [class*=normal_color_]{color:#9db2ff}
	.darkmode.dark a:hover:not([class*=op_weather]),.darkmode.dark #u>a:hover:not([name*=login]),.darkmode.dark .b2c-universal-card a:hover .c-title .c-title-text,
	 .darkmode.dark #timeRlt:hover,.darkmode.dark [class*=hovering_]:hover,.darkmode.dark [class*=hovering_]:hover i,
	 .darkmode.dark [class*=time_li_]:hover{color:#b9f!important}
	.darkmode.dark [class*=active_color_],.darkmode.dark [class*=active_color_] span,.darkmode.dark [class*=pick_color]{color:#89f!important}
	.darkmode .s_ipt_wr{border:2px solid #556}
	.darkmode .s_ipt_wr:hover{border-color:#99a}
	.darkmode .s_ipt_wr{background:#3337!important}
	.darkmode .s_ipt_wr input,.darkmode [class*=input-color] input{color:#aaa}
	.darkmode .s_ipt_wr:hover{background:#2228!important}
	.darkmode .s_ipt_wr:hover input,.darkmode.dark .c-input{color:#eee}
	.darkmode.dark #u>a[name*=login]:hover{color:#eee!important}
	.darkmode .cr-content a,.darkmode.dark .search_tool,.darkmode.dark .securityplan .hint_right_content
	.darkmode.dark .search_tool_conter span,.darkmode.dark .new-pmd .cr-title{color:#909cb3!important}
	.darkmode .new-pmd .c-color-link,.darkmode.dark font[color*="0000cc"]{color:#6783f5!important}
	.darkmode .new-pmd .c-abstract,.darkmode #s_tab .cur-tab,.darkmode #s_tab .s-tab-item:hover,.darkmode #u>a:not([name*=login]),
	 .darkmode #content_left .result-op,.darkmode #content_left .result,.darkmode .c-tabs-nav-li,.darkmode .c-tabs-nav li{color:#aaa!important}
	.darkmode .new-pmd .c-color-gray,.darkmode .new-pmd .c-color-gray2,.darkmode .op_weather4_twoicon_wlink,.darkmode.dark .result-op [class*=source-name_],
	 .darkmode.dark .pfpanel-bd,.darkmode.dark #timeRlt{color:#888!important}
	.darkmode #s_tab .cur-tab:before,.darkmode #s_tab a,.darkmode #s_tab b,.darkmode #s_tab .s-tab-item:hover:before{color:#888!important}
	.darkmode.dark #container.sam_newgrid #content_left .result-op,.darkmode.dark #container.sam_newgrid #content_left .result,
	 .darkmode.dark #rs,.darkmode.dark .video_list{background:#3c3c3c88!important}
	.darkmode.dark #container.sam_newgrid #content_left .result-op:hover,
	 .darkmode.dark #container.sam_newgrid #content_left .result:hover,.darkmode.dark .video_list:hover{background:#1116!important}
	.darkmode.dark .result-molecule[tpl*="app/rs"] td a,.darkmode.dark .selected-search-box,.darkmode.dark .bdpfmenu,
	 .darkmode.dark .usermenu{background:#3339!important}
	.darkmode.dark div[class*=button-list_] div[class*=item_] a{background:#3339}
	.darkmode.dark .result-molecule[tpl*="app/rs"] td a:hover,
	 .darkmode.dark div[class*=button-list_] div[class*=item_] a:hover{background:#2229!important}
	.darkmode.dark #foot,.darkmode.dark .sam_newgrid~#page,.darkmode.dark .x-interact-publish-cont,
	 .darkmode.dark #container.sam_newgrid div[class*=has-content_] textarea,
	 .darkmode.dark .result-molecule>#page,.darkmode.dark .recommend-line-one .recommend-item-a,
	 .darkmode.dark .new-pmd .c-border:hover{background:#2225!important}
	.darkmode.dark .new-pmd .c-tabs.c-sub-tabs .c-tabs-nav,.darkmode.dark .new-pmd .c-tabs-content,
	 .darkmode.dark .op_express_delivery_more,.darkmode.dark .result-molecule>#page a,.darkmode.dark.new-pmd .c-border,
	 .darkmode.dark .c-group-wrapper,.darkmode.dark .new-pmd .c-border,.darkmode.dark .op_express_delivery_input,
	 .darkmode.dark .result-op [class*=pag-item_]:not([class*=active]){background:#3336!important}
	.darkmode.dark #head,.darkmode.dark #wrapper #s_tab{background:#3332!important}
	.darkmode.dark #head:hover,.darkmode.dark #wrapper #s_tab:hover{background:#22222833!important}
	.darkmode.dark .selected-search-box,.darkmode.dark .bdpfmenu,.darkmode.dark .usermenu,
	 .darkmode.dark .result-op [class*=tab-selected_]{background:#0008!important}
	.darkmode.dark .soutu-hover-tip,.darkmode.dark [class*=calendar-wrapper_]{background:#222e!important}
	.darkmode.dark [class*=calendar-table_] thead{background-color:#333a!important}
	.darkmode.dark [class*=calendar-table_] th:not([class*=danger_]){color:#aad}
	.darkmode.dark [class*=calendar-table_] tr td:not([class*=current_]){color:#557}
	.darkmode.dark [class*=calendar-table_] tr td[class*=current_]{color:#eee}
	.darkmode.dark [class*=calendar-table_] div:hover{background-color:#52f8!important}
	.darkmode.dark .c-tip-con,.darkmode.dark #c-tip-custom-calenderCont,.darkmode.dark #c-tip-custom-calenderCont .op_cal,
	 .darkmode.dark #container.sam_newgrid div[class*=has-content_],.darkmode.dark [class*=pop_over_]{background:#222b!important}
	.darkmode.dark .c-tip-con [class*=menu] li a:hover,.darkmode.dark [class*=time_li_]:hover{background-color:#0006!important}
	.darkmode.dark .new-pmd .c-tools-tip-con .c-tip-arrow em{border-bottom-color:#222b}
	.darkmode.dark .bdsug{background-color:#333e!important}
	.darkmode.dark #u .bdpfmenu a:hover,.darkmode.dark #u .usermenu a:hover{background-color:#000!important}
	.darkmode.dark .wrapper_new #form .bdsug-new ul li{color:#aab0c5}
	.darkmode.dark .wrapper_new #form .bdsug-new ul{border-top:2px solid #f5f5f630}
	.darkmode.dark .wrapper_new #form .bdsug-new .bdsug-s{background-color:#222!important}
	.darkmode.dark .wrapper_new #form .bdsug-new ul li b{color:#848797}
	.darkmode.dark .c-gap-bottom-small,.darkmode.dark .c-gap-top-large [class*=tag-item-selected],
	 .darkmode.dark .result-op [class*=list-num],.darkmode.dark .op_express_delivery_input span,
	 .darkmode.dark .op_exactqa_word_word_text,.darkmode.dark .op_exactqa_word_word_pronounce,
	 .darkmode.dark #c-tip-custom-calenderCont{color:#eee}
	.darkmode.dark .c-btn,.darkmode.dark .result-op [class*=episode-btn],
	 .darkmode.dark div[class*=gameinfo] [class*=item_]{background-color:#2228}
	.darkmode.dark .c-btn:active{-webkit-box-shadow:inset 1px 1px 0px #000,inset -1px -1px 0px #555}
	.darkmode.dark .sam_newgrid~#page a,.darkmode.dark c-tabs-item,.darkmode.dark .c-input{background-color:#2228!important}
	.darkmode.dark .c-tabs-nav .c-tabs-nav-selected,.darkmode.dark .xcp-list-loader.is-second{color:#2c99ff!important}
	.darkmode.dark .result-op [class*=tabs-],.darkmode.dark .c-gap-top-large [class*=tag-item],
	 .darkmode.dark .result-op [class*=tabs-] a{background-color:#2225}
	.darkmode.dark .result-op [class*=main-tabs_] [class*=tab-item-selected]{background-color:#777}
	.darkmode.dark div[class*=calendar-box] div[class*=select]:not([class*=selecting]),
	 .darkmode.dark div[class*=button-list_] div[class*=item_],.darkmode.dark .new-pmd .c-img,.darkmode.dark .op_cal table{background:#0000}
	.darkmode.dark div[class*=calendar-box] div[class*=back-today]{background:#f5f5f6a0!important}
	.darkmode.dark div[class*=calendar-box] div[class*=back-today]:hover{background:#f0f0f1db!important}
	.darkmode.dark div[class*=calendar-box] div[class*=content-thead]{color:#aaa!important}
	.darkmode.dark .cell-almanac,.darkmode.dark .result-molecule>#page a:hover{color:#ddd!important}
	.darkmode.dark .cell-inner-box:not(.cell-work):not(.cell-rest):not(.cell-weekend):not(.cell-festival) .cell-daynumber,
	 .darkmode.dark .result-op [class*=tab-selected_]{color:#eee}
	.darkmode.dark .cell-rest{background:#6e2d307d}
	.darkmode.dark .cell-work{background: #f5f5f680}
	.darkmode.dark div[class*=calendar-box] div[class*=calendar-box-right]{background:#4e6ef270}
	.darkmode.dark div[class*=calendar-box] div[class*=select-wrapper],
	 .darkmode.dark .result-op [class*=nav-select_]{background:#333c;backdrop-filter:blur(5px)}
	.darkmode.dark div[class*=calendar-box] div[class*=scroll-roll]{background:#000d}
	.darkmode.dark div[class*=calendar-box] div[class*=select-item]:hover,
	 .darkmode.dark div[class*=calendar-box] div[class*=select-color],.darkmode.dark .c-gap-top-large [class*=tag-item]:hover,
	 .darkmode.dark .result-op [class*=is-active]{color:#7292ff!important}
	.darkmode.dark .result-op [class*=tab-li][class*=is-active]::after{background-color:#7292ff!important}
	.darkmode.dark div .sp-separator{background-color:#5556!important}
	.darkmode.dark .op_express_delivery_hot li,.darkmode.dark .c-gap-top-large [class*=tag-item]:nor([class*=tag-item-selected]){color:#888}
	.darkmode.dark .op_express_delivery_more li i,.darkmode.dark .op_express_delivery_hidemore,
	 .darkmode.dark .op_express_delivery_showmore{color:#a7a7ff}
	.darkmode.dark .c-border{border:1px solid #5566;border-bottom-color:#5556;border-right-color:#5556}
	.darkmode.dark .op_express_delivery_hot li{border-color:#777 #777 #777 transparent}
	.darkmode.dark .new-pmd .se_st_icon_book,.darkmode.dark .new-pmd .se_st_icon_download,
	.darkmode.dark .search_tool:hover,.darkmode.dark .search_tool_conter span:hover,
	.darkmode.dark .c-tip-custom-input,.darkmode.dark .c-tip-si-input,.darkmode.dark .col-header .overview-display-text{color:#bbb}
	.darkmode.dark .result-op [class*=card_]{background:#333b;backdrop-filter:blur(8px)}
	.darkmode.dark .soutu-layer .soutu-url-wrap,.darkmode.dark .c-select-selection,.darkmode.dark .c-select-dropdown{background:#333}
	.darkmode.dark .soutu-env-new .soutu-layer .soutu-state-normal,
	 .darkmode.dark .soutu-env-new .soutu-layer .soutu-error,
	 .darkmode.dark .soutu-env-new .soutu-layer .soutu-waiting{background:#222d}
	.darkmode.dark .soutu-env-new .soutu-layer .soutu-drop{background:#2222}
	.darkmode.dark .bdlayer,.darkmode.dark .advanced-setting .adv-input-prepend{background:#112b;backdrop-filter:blur(5px)}
	.darkmode.dark .c-radio-inner,.darkmode.dark .c-checkbox-inner,.darkmode.dark [class*=dis_able],.darkmode.dark [class*=time_li_]{background-color:#0000}
	.darkmode.dark .op_new_cal_screen,.darkmode.dark [data-pmd] .c-container,
	 .darkmode.dark .col-header .col-overview{background-color:#2222!important;color:#aaa}
	.darkmode.dark [data-pmd] .c-img img,.darkmode.dark .x-interact-publish-opt>*:not(.send),.darkmode.dark .interact-bar-right,
	 .darkmode.dark .xcp-list-loader.is-second.icon,
	 .darkmode.dark [class*=icon_]:not([class*=clear_]):not([class*=_download]):not([class*=bear-icon_]):not([class*=live-label-icon_]):not([class*=op_weather]),
	 .darkmode.dark .c-icon[class*=img2_]{filter:invert(1)}
	.darkmode.dark .col-header .overview-display-wrap li,.darkmode.dark .new-pmd .recommend-none-border{border-color:#8887}
	.darkmode.dark .col-header .overview-display-wrap li:hover,.darkmode.dark .x-interact-publish-cont,
	 .darkmode.dark .x-interact-publish-cont-topic{background-color:#1115}
	.darkmode.dark .col-header .overview-display-wrap li::after,
	 .darkmode.dark .col-header .col-overview-desc::before,.darkmode.dark .col-header .col-overview-display::before{background:#999}
	.darkmode.dark .op_exactqa_word_how_read,.darkmode.dark .op_exactqa_word_mp3_play{mix-blend-mode:color-burn}
	.darkmode.dark .ask-doctor-card .ask-doctor-btn{background:#2228}
	.darkmode.dark .ask-doctor-card .ask-doctor-btn:hover{background:#1118;color:#a088ff!important}
	.darkmode.dark .sam_newgrid~#page a,.darkmode.dark .c-tabs-nav .c-tabs-nav-selected,
	 .darkmode.dark .c-tabs-nav,.darkmode.dark .c-tabs-item,.darkmode.dark .c-input,.darkmode.dark .c-dropdown2,
	 .darkmode.dark .c-dropdown2 .c-dropdown2-btn-icon,.darkmode.dark .c-dropdown2 .c-dropdown2-option{background:#2222!important}
	.darkmode.dark .c-dropdown2:hover .c-dropdown2-btn-icon-border,.darkmode.dark .c-dropdown2-hover .c-dropdown2-btn-icon-border,
	 .darkmode.dark .c-tabs-item .c-btn:hover{background:#222!important}
	.darkmode.dark .c-dropdown2 .c-dropdown2-menu,.darkmode.dark [class*=data-tip]{background:#222b;backdrop-filter:blur(5px)}
	.darkmode.dark .op-exrate-nav{border-bottom:1px solid #9db2ff}
	.darkmode.dark .op-exrate-li,.darkmode.dark .op-exrate-dropdown dl dd div,.darkmode.dark .nors li{color:#777}
	.darkmode.dark .op-exrate-nav li.op-exrate-li-sel{color:#9db2ff;background:#2222;border:1px solid #9db2ff}
	.darkmode.dark .c-dropdown2 .c-dropdown2-selected{color:#9db2ff;background:#9db2ff22!important}
	.darkmode.dark .opui-scroll-ctrl-scroll{border:none!important}
	.darkmode.dark .opui-scroll-ctrl-scroll .opui-scroll-axis{background:#0005}
	.darkmode.dark .opui-scroll-ctrl-scroll .opui-scroll-slider{background:#6665;border:1px solid #9db2ff1f}
	.darkmode.dark .opui-scroll-ctrl-scroll-touch .opui-scroll-slider{border:1px solid #9db2ff;margin-left:-2px}
	.darkmode.dark .c-color-text,.darkmode.dark [class*=opt-ctn],.darkmode.dark .xdp .title-area,
	 .darkmode.dark [class*=cc-title_],.darkmode.dark .wenda-abstract-leading-words h3,.darkmode.dark [class*=car-pc-series-color]{color:#909cb3}
	.darkmode.dark [class*=rich-text],.darkmode.dark .xcp-publish-title,.darkmode.dark .xcp-list-title,.darkmode.dark .nors p{color:#aaa}
	.darkmode.dark [class*=article_]>[class*=title_],.darkmode.dark .user-bar-uname{color:#909cb3!important}
	.darkmode.dark .x-interact-publish .textarea-topic,.darkmode.dark .x-interact-publish .text-area{background:#0000;color:#bbb}
	.darkmode.dark .x-interact-publish .emoj-panel,.darkmode.dark [class*=car-pc-series-table]{background:#1118}
	.darkmode.dark .new-pmd .c-line-clamp1[class*=source-name_],.darkmode.dark .op_weather4_xlzstit,
	 .darkmode.dark .op_weather4_jslul span{color:#fff!important}
	.darkmode.dark [srcid]:not([srcid=''])>[class*=root],.darkmode.dark .res-border-bottom,
	 .darkmode.dark .med-qa .c-line-bottom,.darkmode.dark .wa-zp-exact-new-bline,.darkmode.dark .c-tabs-nav,
	 .darkmode.dark [class*=nav_],.darkmode.dark [class*=table-thead_],.darkmode.dark [class*=car-pc-series-bline]{border-bottom:1px solid #556}
	.darkmode.dark .xcp-list-loader:not(.is-second){background:#2223}
	.darkmode.dark .xcp-list-loader:not(.is-second):hover{background:#2228}
	.darkmode .new-pmd .c-text-blue-border{color:#859dff!important}
	.darkmode.dark .new-pmd .c-text-blue-border{border:1px solid #859dff}
	.darkmode.dark .c-tip-con .c-tip-timerfilter ul,.darkmode.dark [class*=pop_over_]{color:#999}
	.darkmode.dark .c-tip-custom hr{border-top:1px solid #9db2ff66}
	.darkmode.dark .c-tip-custom-input,.darkmode.dark .c-tip-si-input,.darkmode.dark .c-tip-con .c-tip-timerfilter li .c-tip-custom-submit,
	 .darkmode.dark .c-tip-con .c-tip-timerfilter li .c-tip-timerfilter-si-submit,.darkmode.dark #c-tip-custom-calenderCont,
	 .darkmode.dark [class*=input_],.darkmode.dark [class*=car-pc-list]{border:1px solid #778}
	.darkmode.dark .op_mon h5{background:#0000;border-bottom:1px solid #448}
	.darkmode.dark .op_mon td,.darkmode.dark .op_mon th{background:#0000;border:1px solid #448}
	.darkmode.dark .op_mon th{background:#33a6}
	.darkmode.dark #c-tip-custom-calenderCont .op_mon td.op_mon_cur_month{color:#fff}
	.darkmode.dark .op_mon td.op_mon_day_disabled{color:#557!important}
	.darkmode.dark .op_mon td.op_mon_day_hover{color:#6af;border:1px solid #38f}
	.darkmode.dark .wa-zp-exact-new-aurl:not(.wa-zp-exact-new-current),.darkmode.dark .wa-zp-exact-new-gray-a{color:#6af}
	.darkmode.dark .wa-zp-exact-new-aurl:not(.wa-zp-exact-new-current):hover{color:#c8f}
	.darkmode.dark .wa-zp-exact-new-color{color:#99a}
	.darkmode.dark [class*=line_]:not([class*=timeline_]){background:#9db2ff66}
	.darkmode.dark [class*=inpt_disable_]{background:#1118!important;color:#aaa!important}
	.darkmode.dark [class*=pop_over_] li:hover{background-color:#0005!important;color:#b9f}
	</style>`;

	let rippleCss = `<style>
	.legitRipple{position:relative;overflow:hidden}
	.legitRipple-ripple{position:absolute;z-index:0;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);
	pointer-events:none!important;border-radius:50%;background:#fff4;will-change:transform,width,opacity;
	-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);width:0;opacity:1;
	-webkit-transition:width .5s linear,opacity 2s ease-out;transition:width .5s linear, opacity 2s ease-out}
	.legitRipple-ripple:before{content:"";padding-top:100%;display: block}
	img ~ .legitRipple-ripple{z-index:auto}
	</style>`;

	let acCenterPatch = `<style>#con-at .result-op{margin:0 auto;left:-2%}</style>`;

	let bgImageCss = `body{background:linear-gradient(#ffffffc6,#ffffffc6),#url center / cover no-repeat!important;
	 background-attachment:fixed!important;background-repeat:no-repeat;background-position:center}`;

	let bgCircleMaskSurface,bgCircleMaskInside = `{left:0;top:0;width:100%;height:100%;position:fixed;z-index:-3;
	background:linear-gradient(#ffffffc6,#ffffffc6),#url center / cover no-repeat;background-attachment:fixed;background-repeat:no-repeat;background-position:center}`;

	let darkmodeScrollbarCss = `<style id="gmdarkscrollbar">
	::-webkit-scrollbar-track-piece:vertical{background:#666!important;box-shadow:inset 8px 0 8px #222, inset -2px 0 8px #666!important}
	::-webkit-scrollbar-track-piece:horizontal{background:#666!important;box-shadow:inset 0 8px 8px #222, inset 0 -2px 8px #666!important}
	::-webkit-scrollbar-thumb:vertical{background:linear-gradient(92deg,#666,#222)!important;box-shadow:5px 7px 10px #111, 5px -7px 10px #111!important}
    ::-webkit-scrollbar-thumb:horizontal{background:linear-gradient(180deg,#666,#222)!important;box-shadow:5px 7px 10px #111, -5px 7px 10px #111!important}
	</style>`;

	let scrollbarCssFix = `<style id="gmscrollbarfix">
	::-webkit-scrollbar{width:1rem;height:1rem}
	::-webkit-scrollbar-thumb{border-radius:1rem}
	</style>`;

	//------------------------------------ Global -------------------------------------------
	function getRandom(min,max){
		return Math.floor(Math.random()*(max+1-min)+min)
	}

	const rippleObject = {
		'.result,.result-op,.video_list':{
			dragging: 0,
			allowDragging: 1,
			callback: ($container,$ripple)=>{
				if($ripple.hasSetColor) return;
				$ripple.hasSetColor = 1;
				$ripple.css('background',`rgba(${getRandom(180,255)},${getRandom(180,255)},${getRandom(180,255)},.26)`);
			}
		}
	};

	//------------------------------------ JS Run -------------------------------------------
	function ecchiOnHome()
	{
		let isDark = GM_getValue('openDark');
		$('head').append(st);
		$('#lg img').each(function(){
			$(this).attr('src','https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white-d0c9fe2af5.png');
		});

		//Add dark mode switch to upper right menu
		let darkModeMenu;
		let menuDarkModeId = 'gmbdecchi-menu-darkmode';
		if($('#s-user-setting-menu').length > 0 && $(`#s-user-setting-menu #${menuDarkModeId}`).length < 1){
			darkModeMenu = $(`<a id="${menuDarkModeId}" href="javascript:;">${isDark ? '关闭' : '开启'}黑暗</a>`);
			darkModeMenu.data('cssDarkMode', 'darkmode dark');
			darkModeMenu.click(function(){
				if(isDark){
					$('body').removeClass(darkModeMenu.data('cssDarkMode'));
					$('#gmdarkscrollbar').remove();
				}else{
					$('body').addClass(darkModeMenu.data('cssDarkMode'));
					if($('#gmdarkscrollbar').length < 1){
						$('head').append(darkmodeScrollbarCss);
					}
				}
				isDark = !isDark;
				$(this).text(`${isDark ? '关闭' : '开启'}黑暗`);
				GM_setValue('openDark',isDark);
			});
			$('#s-user-setting-menu').append(darkModeMenu);

			//open dark
			if(isDark){
				let intervalSetCss = setInterval(()=>{
					if($('body').hasClass(darkModeMenu.data('cssDarkMode')))
					{ return; }
					isDark = 0;
					darkModeMenu.click();
				},500);
				setTimeout(()=>clearInterval(intervalSetCss),1000);
			}
		}

	}

	//------ Search Page Dark Mode Init ------
	function ecchiOnSearchInit(){
		let isDark = GM_getValue('openDark');
		let bddkmode = $('body').hasClass('darkmode') && $('body').hasClass('dark');

		isDark = !isDark ? bddkmode : isDark;

		if(!isDark){
			//Used to initialize button automatic switching
			isDark = 1;
			return;
		}

		isDark = 0;
		$('head').append(`<style id="gm_ebdinitbg">html,body,#head{background:#334;color:#aaa}</style>`);
		let intervalInit = setInterval(()=>{
			let bddkmode = $('body').hasClass('darkmode') && $('body').hasClass('dark');
			if(!bddkmode){
				$('body').addClass('darkmode dark');
				if($('#gmdarkscrollbar').length < 1){
					$('head').append(darkmodeScrollbarCss);
				}
			}
		},300);
		setTimeout(()=>{clearInterval(intervalInit);},3000);
	}

	//------ Search Page ------
	function ecchiOnSearch() {
		let isDark = GM_getValue('openDark')

		$('head')
			.append(ru)
			.append(rippleCss);

		// Fix scorll bar css
		if(window.location.href.indexOf('.com/sf')>0){
			$('head').append(scrollbarCssFix)
		}

		$('meta[name="referrer"]').attr('content','no-referrer');

		// Recovery MutationObserver method
		let ifr = document.createElement('iframe');
		ifr.style.display = 'none';
		document.body.appendChild(ifr);
		unsafeWindow.MutationObserver = ifr.contentWindow.MutationObserver;
		document.body.removeChild(ifr);

		// listen body class change to dark mode
		let bgChanging;
		let observer = new unsafeWindow.MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				let bddkmode = $('body').hasClass('darkmode') && $('body').hasClass('dark');
				isDark = !isDark ? bddkmode : isDark;
				if(isDark && !bddkmode){
					$('body').addClass('darkmode dark');
				}
				if(bgChanging){ return; }
				ChangeBgColor(.8);
			});
		});

		//get random background url
		let isBgMaskCssOk;
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://rimg.moest.top',
			headers: {
				'token': '0191f2696816cf0b4cf88c6ab4e1e6103f71d938'
			},
			onload: function(response){
				let arrbgurl = $.parseJSON(response.responseText);
				if(arrbgurl && arrbgurl.length < 2) return;

				bgImageCss = bgImageCss.replaceAll('#url', `url(${arrbgurl[0]})`);
				let bgColor = '#ffffffc6';

				if(isDark){
					bgColor = '#1e1e28cc';
					bgImageCss = bgImageCss.replace(/#ffffffc6/ig, bgColor);
				}
				bgCircleMaskInside = bgCircleMaskInside.replace('#url', `url(${arrbgurl[1]})`);
				bgCircleMaskSurface = `.bgCircleMaskSurface${bgCircleMaskInside}`
					+ `.darkmode.dark .bgCircleMaskSurface${bgCircleMaskInside.replace(/#ffffffc6/ig, '#1e1e28cc')}`;
				bgCircleMaskInside = bgCircleMaskSurface.replaceAll('Surface','Inside').replace(/#ffffffc6|#1e1e28cc/ig, '#fff0');
				$('head').append(`<style>${bgImageCss}${bgCircleMaskSurface}${bgCircleMaskInside}.darkmode.dark{color:#aaa;background-color:#0000!important}</style>`);

				//imgload
				let imgPerfect = new Image();
				imgPerfect.src = arrbgurl[1];

				isBgMaskCssOk = 1;

				//remove init bg
				setTimeout(()=>$('#gm_ebdinitbg').remove(),999);

				// listen start
				observer.observe(document.body, {attributes: true});
			},
			onerror: function(err){
				console.log('baiduEcchi',err);
			}
		});

		//show/hide background
		let logodom = $('#result_logo'),
			passBgLogo, passBgKeyboard,
			isOnSearchBox = ()=> $('#kw').is(":focus");

		let bgAnime = null, bgAlpha = .8;
		function stopBgAni(){
			//listen stop
			observer.disconnect();

			if(!bgAnime) return;
			cancelAnimationFrame(bgAnime);
			bgAnime = null;

			// listen start
			observer.observe(document.body, {attributes: true});
		};

		function ChangeBgColor(alpha, onlyAlpha){
			//listen stop
			observer.disconnect();
			bgChanging = 1;

			let newcss = $('body').css('background-image');
			if(onlyAlpha){
				newcss = newcss.replace(/(\d+\.\d+|\d)\)/gi, `${alpha})`);
			}
			else{
				let colors = ['30, 30, 40', '255, 255, 255'];
				newcss = newcss.replace(
					new RegExp(`${isDark ? colors[1] : colors[0]}, (\\d+\\.\\d+|\\d)`,'gi'),
					`${isDark ? colors[0] : colors[1]}, ${alpha}`
			);

			}
			$('body').attr('style',`background-image:${newcss}!important`);

			bgChanging = 0;
			// listen start
			observer.observe(document.body, {attributes: true});
		}

		function startBgAni(show){
			bgAlpha += show ? -.05 : .05;
			bgAlpha = bgAlpha < 0 ? 0 : (bgAlpha > .8 ? .8 : bgAlpha);
			ChangeBgColor(bgAlpha, 1);

			if(bgAlpha <= 0 || bgAlpha >= .8){
				stopBgAni();
				return;
			}

			bgAnime = requestAnimationFrame(()=>{startBgAni(show)});
		};

		function bgShow(){
			stopBgAni();
			startBgAni(1);
			$('#wrapper,#aging-tools-wrapper').css('opacity','0');
		};

		function bgHide(){
			stopBgAni();
			startBgAni(0);
			$('#wrapper,#aging-tools-wrapper').css('opacity','1');
		};

		$('#wrapper,#aging-tools-wrapper').addClass('hideWrapper');
		logodom.hover(()=>{
			if(!isBgMaskCssOk || passBgLogo || isOnSearchBox()) return;
			$('.bgCircleMaskSurface').remove();
			passBgKeyboard = 1;
			bgShow();

		},()=>{
			if(!isBgMaskCssOk || passBgLogo || isOnSearchBox()) return;
			bgHide();
			passBgKeyboard = 0;
		});

		//Add ripples
		function ReAddRipples(){
			$.ripple.destroy();
			$.ripple(rippleObject);
		};

		//Add dark mode menu to upper right menu
		let menuDarkModeAdded;
		let pMenuDarkMode;
		function AddMenuDarkMode(){
			let menuDarkModeId = 'gmbdecchi-menu-darkmode';
			let styleDarkMode = 'darkmode dark';
			let createDarkModeBtn = ()=>{
				pMenuDarkMode = $(`<a id="${menuDarkModeId}" href="javascript:;">${isDark ? '关闭' : '开启'}黑暗</a>`);
				pMenuDarkMode.data('cssDarkMode', 'darkmode dark');
				pMenuDarkMode.click(function(){
					if(isDark){
						$('body').removeClass(pMenuDarkMode.data('cssDarkMode'));
						$('#gmdarkscrollbar').remove();
					}else{
						$('body').addClass(pMenuDarkMode.data('cssDarkMode'));
						if($('#gmdarkscrollbar').length < 1){
							$('head').append(darkmodeScrollbarCss);
						}
					}
					isDark = !isDark;
					$(this).text(`${isDark ? '关闭' : '开启'}黑暗`);
					GM_setValue('openDark',isDark);
				});
			};

			//open dark
			if(isDark && pMenuDarkMode && !$('body').hasClass(styleDarkMode)){
				isDark = 0;
				pMenuDarkMode.click();
			}
			if(menuDarkModeAdded > 0){
				menuDarkModeAdded = isDark ? menuDarkModeAdded + 1 : 2;
				return;
			}
			if($('#u .toindex').length > 0 && $(`.bdpfmenu #${menuDarkModeId}`).length < 1){
				createDarkModeBtn();
				$('#u .toindex').after(pMenuDarkMode);
				menuDarkModeAdded = 1;
			}
		}

		//Add ripples on start
		setTimeout(()=>ReAddRipples(),500);

		//Add dark mode menu on start
		let setTimeoutAddDarkModeMenu;
		let intervalAddDarkModeMenu = setInterval(()=>{
			AddMenuDarkMode();
			if((!isDark && menuDarkModeAdded > 0) || (isDark && menuDarkModeAdded > 4)){
				clearInterval(intervalAddDarkModeMenu);
				clearTimeout(setTimeoutAddDarkModeMenu);
			}
		},100);
		//Limit add dark mode menu time
		setTimeoutAddDarkModeMenu = setTimeout(()=>clearInterval(intervalAddDarkModeMenu),5000);

		//On preloader
		let interval_addrip;
		$('#content_left').on('DOMNodeInserted',(e)=>{
			if(interval_addrip || !e.target.className) return;

			interval_addrip = setTimeout(()=>{
				if(e.target.className.indexOf('ripple') > -1){
					interval_addrip = null;
					return;
				}
				ReAddRipples();
				interval_addrip = null;
			},800);

			//Fix style occlusion
			$('.result-op[tpl*="bk_"] .c-img-border').remove()
		});

		//Create mask bg
		let bcmaskdom, ellipseOp, ellipseED, ellipseED2,
			ellipseSize = ()=> passBgLogo ? 150 : 80,
			edDelay = ()=> bcmaskdom.data('passBgLogo') ? 5.6 : 1.6;

		$('body').mousedown((e)=>{
			if(!isBgMaskCssOk) return;
			let mouseX = e.pageX - window.pageXOffset,
				mouseY = e.pageY - window.pageYOffset;

			ellipseOp = `ellipse(0 0 at ${mouseX}px ${mouseY}px)`;
			ellipseED = `ellipse(${ellipseSize()}px ${ellipseSize()}px at ${mouseX}px ${mouseY}px)`;
			ellipseED2 = `ellipse(${ellipseSize()}.1px ${ellipseSize()}.1px at ${mouseX}px ${mouseY}px)`;

			bcmaskdom = $(`<div class='${passBgLogo ? 'bgCircleMaskInside' : 'bgCircleMaskSurface'}'></div>`).clone();
			bcmaskdom.css({'clip-path':ellipseOp, 'transition':'clip-path 4s'});
			bcmaskdom.data('passBgLogo',passBgLogo).data('ed2',ellipseED2);

			bcmaskdom.on('transitionend webkitTransitionEnd oTransitionEnd',(e)=>{
				if($(e.target).css('opacity') <= 0){
					$(e.target).off().remove();
				}
			});

			$('body').append(bcmaskdom);

			setTimeout(()=>bcmaskdom.css({'clip-path':ellipseED}),1);

		}).mouseup(()=>maskAnimationEnd())
			.on('dragover',()=>maskAnimationEnd())
			.mouseleave(()=>maskAnimationEnd());

		function maskAnimationEnd(){
			if(!isBgMaskCssOk || !bcmaskdom || !bcmaskdom.data('ed2')) return;
			bcmaskdom.css({'clip-path':bcmaskdom.data('ed2'),'opacity':'0',
						   'transition':`clip-path .6s,opacity .3s ease-out ${edDelay()}s`});
		}

		//patch ac style
		if($('head').find('AC-Style-expand').length > 0 || $('head').find('.AC-TwoPageExStyle').length > 0){
			$('head').append(acCenterPatch);
		}

		//disable video auto play
		$('video').removeAttr('autoplay');

		//listen keyboard hide wrapper
		let timeCount = new Date();
		$(document).keydown(function(event){
			//192: ~
			if(event.keyCode == 192){
				if(!isBgMaskCssOk || isOnSearchBox()) return;
				let timeSpace = new Date() - timeCount;
				if(!passBgKeyboard && timeSpace > 100 && timeSpace < 700){
					if($('#wrapper').css('opacity') < 1){
						bgHide();
						passBgLogo = 0;
						$('.bgCircleMaskInside').remove();
						$('#wrapper').css('pointer-events','');
					}else{
						bgShow();
						passBgLogo = 1;
						$('.bgCircleMaskSurface').remove();
						$('#wrapper').css('pointer-events','none');
					}
				}
				timeCount = new Date();
			}
		});

	}

	//------ Run on home ------
	if(window.location.href.indexOf('.com/s')<0)
	{
		setTimeout(()=>{ecchiOnHome();}, 500);
		return;
	}

	//------ Run on search page ------
	if(window.location.href.indexOf('.com/s')>0) {
		ecchiOnSearchInit();
		setTimeout(()=>{ecchiOnSearch();}, 500);
		return;
	}

})();