// ==UserScript==
// @name         度娘搜索萌化ecchi
// @namespace    https://cdn.jsdelivr.net/gh/usaginya/mkAppUpInfo@master/monkeyjs/moe.moekai.moebaidu.ecchi.user.js
// @version      3.8.6
// @description  萌化度娘搜索R18限制级 [18+]
// @author       YIU
// @icon         https://www.baidu.com/favicon.ico
// @match        *://www.baidu.com/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @connect      moest.top
// @run-at       document-start
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/2.0.3/jquery.min.js
// @require      https://jsdelivr.b-cdn.net/gh/matthias-vogt/legitRipple.js@gh-pages/js/ripple.js
// ==/UserScript==

(function(){
	//--------------- STYLE -----------------------------------------
	let gb = `<style id="dumoe-gb">
	html{overflow-y:auto}
	#wrapper{z-index:2;position:sticky}
	.pass-qrcode-download{display:none!important}
	#container.sam_newgrid .right-ceiling{position:unset}
	#container.sam_newgrid #content_left,.new-pmd .c-span12{width:580px}
	.darkmode.dark .op_weather4_twoicon_bg{opacity:.5!important}
	.darkmode.dark .tang-background{box-shadow:1px 5px 12px 0 #4e6ff24d}
	.darkmode.dark p.pass-form-logo{color:#dde}
	.darkmode .soutu-hover-tip{color:#ccc!important}
	.darkmode.dark .tang-pass-pop-login .pass-text-input{color:#666;border-color:#666}
	.darkmode.dark .tang-pass-pop-login div.tang-title,.darkmode.dark .tang-pass-footerBar{background-color:#222d}
	.darkmode.dark .tang-pass-pop-login div.tang-body{color:#bbb;background-color:#222d}
	.darkmode.dark .tang-pass-pop-login .pass-item-timer,.darkmode.dark .tang-pass-pop-login .pass-item-time-timing{color:#9db2ff;border-color:#666}
	.darkmode.dark .tang-pass-pop-login .pass-item-timer:hover,.darkmode.dark .tang-pass-pop-login .pass-item-time-timing:hover{color:#c8f;border-color:#ccc}
	.darkmode.dark .login-type-tab .switch-item.activ,.darkmode.dark .desktop-opt{color:#ccc}
	.darkmode.dark .compose-left-container{border-right:1px solid #555}
	.darkmode.dark .tang-pass-pop-login .pass-item-timer,
	 .darkmode.dark .tang-pass-pop-login .pass-item-time-timing,
	 .darkmode.dark .c-radio-inner,.darkmode.dark .c-checkbox-inner,
	 .darkmode.dark #wrapper [class*=dis_able],.darkmode.dark #wrapper [class*=time_li_]{background-color:#0000}
	.darkmode.dark .soutu-layer .soutu-url-wrap,.darkmode.dark .c-select-selection,
	 .darkmode.dark .c-select-dropdown{background:#333d;backdrop-filter:blur(8px)}
	.darkmode.dark .bdlayer{background:#112b;backdrop-filter:blur(5px)}
	.darkmode.dark .advanced-setting .adv-input-prepend{background:#2228}
	.darkmode.dark .pfpanel-bd{color:#888!important}
	.darkmode.dark .pftab .pftab_hd{color:#aaa}
	.darkmode.dark .pftab .pftab_hd .cur,.darkmode.dark .advanced-setting .adv-input-prepend{color:#9db2ff!important}
	.darkmode.dark .c-input{color:#eee}
	.darkmode.dark .c-tabs-nav .c-tabs-nav-selected,
	 .darkmode.dark .c-tabs-nav,.darkmode.dark .c-tabs-item,.darkmode.dark .c-input,.darkmode.dark .c-dropdown2,
	 .darkmode.dark .c-dropdown2 .c-dropdown2-btn-icon,.darkmode.dark .c-dropdown2 .c-dropdown2-option{background:#2225!important}
	.darkmode.dark .c-radio-checked + .setting-radio-label{color:#ddd!important}
	.darkmode.dark #wrapper [class*=color333_],.darkmode.dark #wrapper [class*=card_layout_] [class*=title_]{color:#888}
	.darkmode.dark .sug-search-icon{color:#77809f!important}
	.darkmode.dark #wrapper [class*=card_layout_]{background:#2222}
	.darkmode.dark #wrapper [class*=cate-title_]{background:#2223}
	.darkmode.dark #wrapper [class*=cate-title_]:hover{background:#1118;color:#eee}
	.darkmode.dark .c-checkbox-inner{background:#0000!important}
	</style>`

	let st = `<style id="dumoe-st">
	#lg img{opacity:.2;transition:opacity 1s}
	#lg:hover img{opacity:.9}
	#head_wrapper #lg [id*=s_lg_img]{filter:drop-shadow(0 0 3px #56acda9a);mix-blend-mode:color}
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
	.s-top-left .mnav,.s-top-left-new .mnav,.s-top-right .s-top-right-text,.s-weather-wrapper{margin-top:5px}
	.s-top-right .s-top-username,.s-top-right .operate-wrapper{margin-top:2px;vertical-align:top}
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
	.darkmode.dark #wrapper input:not(#kw):not([class*=select-input_]):not([class*=c-btn]),.darkmode #s_side_wrapper{background-color:#1118}
	.darkmode.dark #wrapper [class*=input_]{color:#eee}
	.darkmode.dark{background-color:#1f1f25cc!important}
	.darkmode.dark #bottom_layer,.darkmode.dark #head,.darkmode.dark #s_menu_gurd.s-down,
	 .darkmode.dark #s_wrap{background-color:#0000}
	.darkmode.dark #s_top_wrap,.darkmode.dark #s_top_wrap.s-down .s-center-box{background-color:#3337}
	.darkmode.dark #aging-tools-pc>div{background:#000b!important}
	.darkmode.dark #aging-tools-pc>div div[class|=item]>div[class|=icon]:not([class*=choosed]){background-color:#3339}
	.darkmode.dark #aging-tools-pc>div div[class*=item-text]{color:#aaa}
	.darkmode.dark #aging-tools-pc>div div[class|=pop] div[class*=barBac]{background:#0006}
	.darkmode.dark #aging-tools-pc>div div[class|=pop]{background:#0006}
	.darkmode.dark #aging-tools-pc>div div[class|=pop]>div[class*=left],.darkmode .s-skin-layer .s-skin-random,
	 .darkmode .c-color-gray,.darkmode .news-meta-item:nth-of-type(n+4) .c-index-single{color:#ddd}
	.darkmode.dark #aging-tools-pc>div div[class|=pop] button{background:#5555;color:#ddd}
	.darkmode.dark #aging-tools-pc>div div[class|=pop] button:hover{color:#7bf}
	.darkmode.dark #aging-tools-pc>div div[class|=float],.darkmode #s_side_wrapper .side-entry .toast{background:#222b!important}
	.darkmode.dark .s-skin-hasbg #s_main,.darkmode.dark .s-block-nav .nav-item-edit{background:#22222555}
	.darkmode.dark .s-skin-hasbg #s_main:hover,.darkmode.dark .s-top-left-new .s-top-more .s-top-more-content>a:hover,
	 .darkmode.dark .s-mod-setweather .setweather-content .everyday-mod .everyday-item:hover,
	 .darkmode.dark .s-top-left-new .s-top-more .s-top-tomore:hover,
	 .darkmode.dark .edting-block .d-nav-item .border-for-item,.darkmode.dark .edting-block .nav-item .border-for-item{background:#222c}
	.darkmode.dark .s-top-more,.darkmode.dark .soutu-hover-tip,.darkmode.dark .s-mod-setweather,
	 .darkmode.dark .c-floating-box{background:#333b!important}
	.darkmode .c-color-gray2{color:#eee!important}
	.darkmode #s-user-name-menu a,.darkmode #s-user-name-menu a:visited,.darkmode #s-user-setting-menu a,
	 .darkmode #s-user-setting-menu a:visited{color:#b9a260}
	.darkmode #s-user-name-menu a:hover,.darkmode #s-user-setting-menu a:hover{color:#fff762}
	.darkmode.dark .setweather-content .warn-mod{background:#30303050!important}
	.darkmode.dark .s-mod-setweather .setweather-content .lunar-mod .lunar-sevenday,.darkmode .s-nav-wrapper .nav-block:hover,
	 .darkmode.dark .s-code-blocks .s-setbar .set-menu .edit-class .selected,.darkmode.dark .s-top-left-new .s-top-more .s-top-tomore:hover a,
	 .darkmode.dark .s-top-left-new .s-top-more .s-top-more-content>a:hover .s-top-more-title{color:#50bfff}
	.darkmode.dark .hot-refresh .hot-refresh-text{color:#fff762!important}
	.darkmode.dark .title-content:hover,.darkmode.dark .hot-refresh:hover .c-icon,
	 .darkmode.dark .hot-refresh:hover .hot-refresh-text{color:#5af!important}
	#s_side_wrapper{opacity:.3;transition:.3s}
	#s_side_wrapper:hover{opacity:.9}
	.darkmode .c-color-text,.darkmode .s-block-stock .stock-item .stock-highprice,.darkmode .s-block-stock .stock-item .stock-lowprice,
	 .darkmode .s-block-stock .stock-item .stock-updatetime,.darkmode .s-skin-hasbg .s-block-stock .stock-banner,
	 .darkmode .s-xmancard-mine_new .tips-manager-btn .manager-btn-text{color:#cef}
	.darkmode .s-xmancard-mine_new .edting-btn-text .manager-btn-text,
	 .darkmode .s-xmancard-mine_new .tips-manager-btn .manager-btn-text:hover,
	 .darkmode .s-mod-setweather .setweather-content .lunar-mod .lunar-setting-btn:hover .lunar-settint-text{color:#fff!important}
	.darkmode.dark .s-ctner-contents .s-loading .load-done,.darkmode.dark .s-ctner-contents .s-loading .load-text,
	 .darkmode.dark .s-ctner-contents .s-loading img{filter:brightness(0.7)}
	.darkmode .s-skin-layer{background:#222b!important}
	.darkmode .s-skin-layer .choose-nav,.darkmode .s-skin-layer .s-skin-subnav li.cur .subnav-tag{color:#00e7ff}
	.darkmode .s-skin-layer .nav-underline{background:#00e7ff}
	.darkmode .s-skin-layer .choose-nav:hover,.darkmode .s-skin-layer .skin-nav:hover,
	 .darkmode .s-skin-layer .s-skin-set.is-hover,.darkmode .s-skin-layer .subnav-tag:hover{color:#00adff}
	.darkmode .s-skin-layer .subnav-tag,.darkmode .s-skin-layer .defined-state-chooseimg,
	 .darkmode .s-skin-layer .skin-img-list .no-img{background:#1e1e267a!important}
	::-webkit-scrollbar{width:1rem;height:1rem}
	::-webkit-scrollbar-track-piece:vertical{background:#fff;box-shadow:inset 8px 0 8px #d3dbe0, inset -2px 0 8px #f5f5f5}
	::-webkit-scrollbar-track-piece:horizontal{background:#fff;box-shadow:inset 0 8px 8px #d3dbe0, inset 0 -2px 8px #f5f5f5}
	::-webkit-scrollbar-thumb{border-radius:1rem}
	::-webkit-scrollbar-thumb:vertical{background:linear-gradient(92deg,#fcffff,#ccd2d8);box-shadow:5px 7px 10px #959ca5, 5px -7px 10px #c8d0da}
    ::-webkit-scrollbar-thumb:horizontal{background:linear-gradient(180deg,#fcfdff,#ccd2d8);box-shadow:5px 7px 10px #959ca5, -5px 7px 10px #959ca5}
	</style>`;

	let ru = `<style id="dumoe-ru">
	#result_logo{opacity:.6}
	#result_logo .index-logo-src{display:block!important}
	#result_logo .index-logo-srcnew,#result_logo .index-logo-peak{display:none!important}
	#aging-tools-wrapper{transition-duration:.3s}
	#wrapper.hideWrapper,#aging-tools-wrapper.hideWrapper{transition-duration:1s}
	#head,#wrapper #s_tab{background:#fff2!important;backdrop-filter:blur(3px);transition-duration:.3s}
	#searchTag{backdrop-filter:blur(3px);background:#0000!important}
	#searchTag [class*=tags_]{background-color:#f0f3fd66!important}
	#searchTag [class*=tag-selected_]{color:#0039ff!important}
	#searchTag [class*=tags_]:hover{background-color:#f0f3fdcc!important}
	#head:hover,#wrapper #s_tab:hover{background:#fff6!important;transition-duration:.3s}
	#con-at .result-op{width:90%!important;border-radius:16px!important}
	[class*="bac-box_"]{background:#fff0!important;color:#aaa}
	[class*="bac-img_"]{opacity:.7!important}
	[class^="view-right_"]{right:6%!important}
	[class*=sg-content_]{background:#0000!important}
	.view-bac_PurEx{padding-right:12px!important}
	.c-container{width:100%!important}
	.container_l.sam_newgrid{width:80vw}
	.c-group-wrapper{margin-left:auto!important}
	.dropdown-menu,.c-dropdown2 .c-dropdown2-menu,
	 [class*=travel-select-board-layout]{position: fixed!important;left:auto!important;top:auto!important;width:auto!important;}
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
	 .c-link:hover{background:-webkit-linear-gradient(left,#e20,#e40 6.25%,#e90 12.5%,#ee0 18.75%,#9d0 25%,#0dd 31.25%,#07f 37.5%,
	 #d0f 43.75%,#e00 50%,#f22 56.25%,#e90 62.5%,#ee0 68.75%,#9d0 75%,#0dd 81.25%,#07f 87.5%,#d0f 93%,#e00 100%);
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
	#container.sam_newgrid,#wrapper_wrapper{background:unset!important}
	#container.sam_newgrid .c-container .t a,#container.sam_newgrid .c-container .c-title a,a em{text-decoration:none!important}
	#container.sam_newgrid #content_left .result-op,#container.sam_newgrid #content_left .result,
	#rs,.video_list{margin-bottom:8px!important;background:#fff8!important;border-radius:8px!important;padding:10px!important;transition-duration:.5s}
	#container.sam_newgrid #content_left .result-op:hover,#container.sam_newgrid #content_left .result:hover,
	.video_list:hover{background:#fffb!important;box-shadow:#0003 0 2px 9px;transition-duration:.5s}
	.new-pmd .c-border,.c-group-wrapper{background:#fff5!important;transition-duration:.5s}
	.new-pmd .c-border:hover{background:#fffb!important;transition-duration:.5s}
	#con-ar{margin-bottom:0!important;margin-top:40px}
	#content_right{opacity:0;transition-duration:.38s}#content_right:hover{opacity:1;transition-duration:.38s}
	#content_right [tpl=search_topic_publisher]{opacity:.3;transition-duration:.38s}
	#content_right [tpl=search_topic_publisher]:hover{opacity:.9;transition-duration:.38s}
	#foot,.sam_newgrid~#page,.x-interact-publish-cont,#container.sam_newgrid div[class*=has-content_] textarea,
	.result-molecule>#page,.recommend-line-one .recommend-item-a{background-color:#f5f5f666!important}
	.result-molecule>#page strong{background-color:#4e90f2d4!important}
	.result-molecule>#page a:hover,.result-molecule>#page .n:hover,.darkmode.dark .result-molecule>#page a:hover,
	.darkmode.dark .result-op [class*=pag-item_]:not([class*=active]):hover{background:#4e90f2c0!important;color:#fff!important}
	#foot #help,.c-tip-con [class*=menu] li a,.bdpfmenu a:link,.bdpfmenu a:visited,#u .usermenu a,#wrapper #rs .tt,
	#wrapper #content_left .result[tpl='soft'] .op-soft-title,#wrapper #content_left .result h3,#wrapper #content_left .c-container h3,
	.op_express_delivery_hidemore,.op_express_delivery_showmore,#wrapper #content_left .c-container
	.ms-measures-content .op-unit-tabs-nav-container,.ms-measures-content .tabs-nav,[class*=dis_able],[class*=time_li_],
	 [class*=pop_over_] li,[class*=_popup_] [class*=selectItem],[class*=select-container] li{background-color:#fff0!important}
	[class*=pop_over_] li:hover,[class*=_popup_] [class*=selectItem]:hover,[class*=select-container] li:hover{background-color:#5bf3!important}
	.c-tip-con [class*=menu] li a:hover{background-color:#ccc6!important;transition-duration:.3s}
	.c-tip-con,#c-tip-custom-calenderCont,#c-tip-custom-calenderCont .op_cal,#container.sam_newgrid div[class*=has-content_],
	 [class*=select-container] ul,[class*=pop_over_],[class*=_popup_]{background:#fffb!important;backdrop-filter:blur(3px)}
	[class*=normal_color_]{background:#fffb}
	[class*=input_]{background-color:#fffb}
	[class*=dis_able]:not([class*=file_li_]){color:#88a!important}
	[class*=calendar-wrapper_]{background:#fffe!important}
	[class*=travel-select-board-layout]{background:#fff9;backdrop-filter:blur(3px)}
	.soutu-hover-tip,.soutu-env-new .soutu-layer .soutu-state-normal,
	 .soutu-env-new .soutu-layer .soutu-error,.soutu-env-new .soutu-layer .soutu-waiting{background:#fffd}
	.sam_newgrid~#page strong,.sam_newgrid~#page a:hover,
	.sam_newgrid~#page a:hover .pc,.sam_newgrid~#page .n:hover{background:#0089ffab!important;color:#fff!important}
	.new-pmd .c-tabs.c-sub-tabs .c-tabs-nav,.new-pmd .c-tabs-content,.op_express_delivery_more,.result-molecule>#page a{background-color:#fff6!important}
	.op_express_delivery_input{background:#fafafa77!important}
	.op_new_cal_screen,[data-pmd] .c-container,.col-header .col-overview{background-color:#fff2!important}
	.c-tabs-item .c-btn:hover{background:#ccc6!important}
	.col-header-wrap::before{background:-webkit-linear-gradient(150deg,#00d3ea6b,#00cfa3b0)!important;background:linear-gradient(-60deg,#00d3ea6b,#00cfa3b0)!important}
	div .sp-separator{width:100%;background-color:#fffa!important;backdrop-filter:blur(6px);transition-duration:.3s}
	div .sp-separator:hover{transition-duration:.3s}
	.result-op [class*=card_]:not(.result-op [class*=image-]):not(.c-onlyshow-toppic [class*=card_]){padding:10px 16px}
	.result-op [class*=card_],.c-onlyshow-toppic [class*=right-btn_]{background:#fff6;backdrop-filter:blur(3px)!important;
	  box-shadow:inset 0 0 12px 0 #0003!important}
	.c-onlyshow-toppic [class*=card_]{background:#fffa!important}
	.c-onlyshow-toppic [class*=right-btn_],.c-onlyshow-toppic [class*=left-btn_]{background:#fffa!important}
	.c-onlyshow-toppic [class*=left-btn_]{left:-18px!important}
	.result-op [class*=boiling-btn_]{background-color:#fffc!important;backdrop-filter:blur(8px)}
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
	#wrapper div[class*=button-list_] div[class*=item_] a{background:#eee9}
	#wrapper div[class*=button-list_] div[class*=item_] a:hover{background:#5bf3}
	#aging-tools-pc>div{background:#eee9!important}
	#aging-tools-pc>div div[class|=item]>div[class|=icon]:not([class*=choosed]){background-color:#fff9}
	#aging-tools-pc>div div[class|=item]:hover>div[class|=icon],
	 #aging-tools-pc>div div[class|=item][class*=checked]>div[class|=icon]{background-color:#6d87f2!important}
	#aging-tools-pc>div div[class|=float]{background:#fffb!important}
	#aging-tools-pc>div div[class|=pop]{background:#fffc;backdrop-filter:blur(10px)}
	.xdp{overflow:overlay}.xdp::-webkit-scrollbar{width:.1rem;height:.1rem}
	.x-interact-publish .emoj-panel{margin:0 12px;width:96%;right:0!important}
	.xdp .no-margin-left{margin-right:10px}
	#wrapper div[class*=img-content-wrap_],.darkmode.dark #wrapper div[class*=head-wrap-new_]{background:#fff0!important}
	#wrapper div[class*=content-wrapper_],#wrapper div[class*=weather-top_]{background-image:none!important;background-color:#fff0!important}
	#wrapper div[class*=forecast_]{background:none!important}
	#wrapper div[class*=weather-top_] div[class*=bg-wrapper_]{margin-top:-10px;opacity:0.7}
	[class*=chart-wrapper_] [class*=tip-alert_]{margin-right:22px}
	.darkmode.dark [class*=chart-wrapper_] [class*=tip-alert_]{background-color:#222;color:#eee;}
	.darkmode.dark [class*=-chart-wrapper_] [class*=price-text_],
	 .darkmode.dark [class*=-chart-wrapper] [class*=ratio-text_],
	 .darkmode.dark [class*=-chart-wrapper] [class*=time-text_]{background:#222}
	.darkmode.dark #s_tab .cur-tab:hover,.darkmode.dark #s_tab .s-tab-item:hover,.darkmode.dark #u>a:hover{color:#9d9bff!important}
	.darkmode.dark #s_tab .cur-tab,.darkmode.dark #u>a{color:#ddd!important}
	.darkmode.dark #wrapper input:not(#kw):not([class*=c-btn]){background-color:#1118;color:#bbb!important}
	.darkmode.dark #wrapper [class*=input_]:not([class*=c-btn]),.darkmode.dark .op_translation_usertip{color:#eee}
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
	.darkmode.dark .c-btn:not([class*=btn-content_]){color:#ddd!important}
	.darkmode em,.darkmode.dark div[class*=button-list_] span[class*=label_],.darkmode.dark .op-weather-province-city,
	 .darkmode.dark [class*=error-tip]{color:#f77!important}
	.darkmode.dark .result-op [class*=up_],.darkmode.dark .op-concept-stock-rose{color:#f77}
	.darkmode.dark #su{background-color:#3f3dc780!important}
	.darkmode.dark #su:hover{background-color:#5545ddaa!important}
	.darkmode.dark a:not([class*=op_weather]):not(.OP_LOG_LINK):not(.c-btn):not([class*=consulting-btn_]),.darkmode.dark h3[class*=title_],
	 .darkmode.dark .result-op [class*=pag-item_]:not([class*=active]),
	 .darkmode.dark .a-se-st-single-video-zhanzhang-capsule,.darkmode.dark .translateContent,
	 .darkmode.dark .col-header .overview-desc-wrap,.darkmode.dark .b2c-universal-card a .c-title .c-title-text,
	 .darkmode.dark [class*=time_li_],.darkmode.dark [class*=card-more-link],
	 .darkmode.dark [class*=info-row-btn_],.darkmode.dark [class*=button_]{color:#9db2ff!important}
	.darkmode.dark [class*=normal_color_],.darkmode.dark .result-op [class*=same_],.darkmode.dark [class*=LabelText_],
	 .darkmode.dark [class*=Container_],.darkmode.dark [class*=description_],.darkmode.dark [class*=Label_],
	 .darkmode.dark [class*=domain-name_],.darkmode.dark [class*=card-title-text],
	 .darkmode.dark [class*=label-bar_] [class*=nav-item_]:hover,
	 .darkmode.dark [class*=tab-bar_] [class*=nav-item_]:hover,
	 .darkmode.dark [class*=custom-bar_] [class*=nav-item_]:hover,
	 .darkmode.dark [class*=sample-bar_] [class*=nav-item_]:hover,.darkmode.dark [class*=pan-link_]{color:#9db2ff}
	.darkmode.dark a:hover:not([class*=op_weather]):not(.header .c-btn),.darkmode.dark #u>a:hover:not([name*=login]),
	 .darkmode.dark .b2c-universal-card a:hover .c-title .c-title-text,
	 .darkmode.dark #timeRlt:hover,.darkmode.dark [class*=hovering_]:hover,.darkmode.dark [class*=hovering_]:hover i,
	 .darkmode.dark [class*=time_li_]:hover,.darkmode.dark [class*=card-more-link]:hover,
	 .darkmode.dark [class*=card-more_]:hover [class*=card-more-link]{color:#c8f!important}
	.darkmode.dark [class*=active_color_],.darkmode.dark [class*=active_color_] span,.darkmode.dark [class*=pick_color]{color:#89f!important}
	.darkmode .s_ipt_wr{border:2px solid #556!important}
	.darkmode .s_ipt_wr:hover{border-color:#99a!important}
	.darkmode .s_ipt_wr{background:#3337!important}
	.darkmode .s_ipt_wr input,.darkmode [class*=input-color] input{color:#aaa!important}
	.darkmode .s_ipt_wr:hover{background:#2228!important}
	.darkmode .s_ipt_wr:hover input{color:#eee!important}
	.darkmode.dark #u>a[name*=login]:hover{color:#eee!important}
	.darkmode .search-keyboard-toast{background-color:#112;color:#eee}
	.darkmode .search-keyboard-toast::before{border-bottom-color:#112}
	.darkmode .search-keyboard-toast .left-text .key{border-color:#555}
	.darkmode .cr-content a,.darkmode.dark .search_tool,.darkmode.dark .securityplan .hint_right_content
	.darkmode.dark .search_tool_conter span,.darkmode.dark [class*=cr-title]{color:#909cb3!important}
	.darkmode .new-pmd .c-color-link,.darkmode.dark font[color*="0000cc"]{color:#6783f5!important}
	.darkmode .new-pmd .c-abstract,.darkmode #s_tab .cur-tab,.darkmode #s_tab .s-tab-item:hover,.darkmode #u>a:not([name*=login]),
	 .darkmode #content_left .result-op,.darkmode #content_left .result,.darkmode .c-tabs-nav-li,.darkmode .c-tabs-nav li,
	 .darkmode .op_exactqa_gray,.darkmode .op-xueshu-links-new-journal,.darkmode.dark [class^=text_],.darkmode.dark [class*=-text_],
	 .darkmode.dark [class*=-cont_],.darkmode.dark [class*=big-img-sub-abs_],.darkmode.dark [class^=name_],
	 .darkmode.dark [class^=time_]{color:#aaa!important}
	.darkmode #content_left .result-op [class*=audio-] [class*=pinyin]{color:#89e4ff}
	.darkmode .new-pmd .c-color-gray,.darkmode .new-pmd .c-color-gray2,.darkmode .op_weather4_twoicon_wlink,.darkmode.dark .result-op [class*=source-name_],
	 .darkmode.dark .pfpanel-bd,.darkmode.dark #timeRlt,.darkmode.dark [class*=common-font_],.darkmode .c-author,.darkmode .c-title-author,
	 .darkmode.dark [class*=sftip_] [class*=content_],.darkmode.dark [class^=tips-],.darkmode.dark [class*=loc-wrapper_] [class*=wrapper_]{color:#888!important}
	.darkmode #s_tab .cur-tab:before,.darkmode #s_tab a,.darkmode #s_tab b,.darkmode #s_tab .s-tab-item:hover:before{color:#888!important}
	.darkmode.dark #container.sam_newgrid #content_left .result-op,.darkmode.dark #container.sam_newgrid #content_left .result,
	 .darkmode.dark #rs,.darkmode.dark .video_list,.darkmode.dark [class*=see-more-wrap_],
	 .darkmode.dark [class*=see-more-wrap_] [class*=see-more-content_],
	 .darkmode.dark [class*=see-more-wrap_]:hover [class*=see-more-content_]{background:#3c3c3c88!important}
	.darkmode.dark #container.sam_newgrid #content_left .result-op:hover,
	 .darkmode.dark #container.sam_newgrid #content_left .result:hover,.darkmode.dark .video_list:hover,
	 .darkmode.dark [class*=see-more-wrap_]:hover{background:#1116!important}
	.darkmode.dark .result-molecule[tpl*="app/rs"] td a,.darkmode.dark .selected-search-box,.darkmode.dark .bdpfmenu,
	 .darkmode.dark .usermenu{background:#2224!important}
	.darkmode.dark div[class*=button-list_] div[class*=item_] a,.darkmode.dark .result-op:not([tpl=recommend_list]) a[class*=item_]`
	 +`:not([class*=bottom-scroll-item_]),.darkmode.dark [class*=sc-scroll-control-],
	 .darkmode.dark div[class*=list_]>[class*=item_]:not([class*=_item_]),.darkmode.dark [class*=info-row-btn_],
	 .darkmode.dark [class*=item-] [class*=link_]:not([class*=btn-]),
	 .darkmode.dark [class^=wrap_]:not([class*=like_]),.darkmode.dark [class^=comment-wrapper_] [class*=content_],
	 .darkmode.dark [class*=tabs-wrapper_] [class*=tab_],
	 .darkmode.dark [class*=words-record_]{background:#2224!important}
	.darkmode.dark .result-molecule[tpl*="app/rs"] td a:hover,.darkmode.dark .result-op:not([tpl=recommend_list]) a[class*=item_]`
	 +`:not([class*=bottom-scroll-item_]):hover,.darkmode.dark [class*=sc-scroll-control-]:hover,
	 .darkmode.dark div[class*=button-list_] div[class*=item_] a:hover,.darkmode.dark div[class*=list_]>[class*=item_]:not([class*=_item_]):hover,
	 .darkmode.dark [class*=info-row-btn_]:hover,.darkmode.dark [class^=wrap_]:not([class*=like_]):hover,
	 .darkmode.dark [class*=item-] [class*=link_]:not([class*=btn-]):hover,
	 .darkmode.dark [class*=tabs-wrapper_] [class*=tab_]:hover,
	 .darkmode.dark [class*=words-record_]:hover{background:#2229!important}
	.darkmode.dark #foot,.darkmode.dark .sam_newgrid~#page,.darkmode.dark .x-interact-publish-cont,
	 .darkmode.dark #container.sam_newgrid div[class*=has-content_] textarea,
	 .darkmode.dark .result-molecule>#page,.darkmode.dark .recommend-line-one .recommend-item-a,
	 .darkmode.dark .new-pmd .c-border:hover,.darkmode.dark [class*=hover_]:hover,.darkmode.dark [class*=rel-divider],
	 .darkmode.dark [class*=loc-wrapper_],.darkmode.dark [class*=episode-btn_],.darkmode.dark [class*=-tlinkur] a{background:#2225!important}
	.darkmode.dark .new-pmd .c-tabs.c-sub-tabs .c-tabs-nav,.darkmode.dark .new-pmd .c-tabs-content,
	 .darkmode.dark .op_express_delivery_more,.darkmode.dark .result-molecule>#page a,.darkmode.dark.new-pmd .c-border,
	 .darkmode.dark .c-group-wrapper,.darkmode.dark .new-pmd .c-border,.darkmode.dark .op_express_delivery_input,
	 .darkmode.dark .result-op [class*=pag-item_]:not([class*=active]){background:#3336!important}
	.darkmode.dark #head,.darkmode.dark #wrapper #s_tab,.darkmode.dark .tag-container-fixed{background:#3332!important}
	.darkmode.dark #head:hover,.darkmode.dark #wrapper #s_tab:hover,.darkmode.dark .tag-container-fixed:hover{background:#22222833!important}
	.darkmode.dark .tag-container-fixed{backdrop-filter:blur(3px)}
	.darkmode.dark .selected-search-box,.darkmode.dark .bdpfmenu,.darkmode.dark .usermenu,
	 .darkmode.dark .result-op [class*=tab-selected_],
	 .darkmode.dark [class*=travel-select-board-layout] ul li:hover{background:#0008!important}
	.darkmode.dark .soutu-hover-tip,.darkmode.dark [class*=calendar-wrapper_],.darkmode.dark .dropdown-menu{background:#222e!important}
	.darkmode.dark [class*=calendar-table_] thead{background-color:#333a!important}
	.darkmode.dark [class*=calendar-table_] th:not([class*=danger_]){color:#aad}
	.darkmode.dark [class*=calendar-table_] tr td:not([class*=current_]){color:#557}
	.darkmode.dark [class*=calendar-table_] tr td[class*=current_]{color:#eee}
	.darkmode.dark [class*=calendar-table_] div:hover{background-color:#52f8!important}
	.darkmode.dark .c-tip-con,.darkmode.dark #c-tip-custom-calenderCont,.darkmode.dark #c-tip-custom-calenderCont .op_cal,
	 .darkmode.dark #container.sam_newgrid div[class*=has-content_],
	 .darkmode.dark [class*=pop_over_],.darkmode.dark [class*=_popup_],
	 .darkmode.dark [class*=select-container] ul{background:#222b!important}
	.darkmode.dark .c-tip-con [class*=menu] li a:hover,.darkmode.dark [class*=time_li_]:hover{background-color:#0006!important}
	.darkmode.dark .new-pmd .c-tools-tip-con .c-tip-arrow em{border-bottom-color:#222b}
	.darkmode.dark .bdsug{background-color:#333e!important}
	.darkmode.dark #u .bdpfmenu a:hover,.darkmode.dark #u .usermenu a:hover{background-color:#000!important}
	.darkmode.dark .wrapper_new #form .bdsug-new ul li{color:#aab0c5}
	.darkmode.dark .wrapper_new #form .bdsug-new ul{border-top:2px solid #f5f5f630}
	.darkmode.dark .wrapper_new #form .bdsug-new .bdsug-s{background-color:#222!important}
	.darkmode.dark .wrapper_new #form .bdsug-new ul li b{color:#848797}
	.darkmode.dark .c-gap-top-large [class*=tag-item-selected],
	 .darkmode.dark .result-op [class*=list-num],.darkmode.dark .op_express_delivery_input span,
	 .darkmode.dark .op_exactqa_word_word_text,.darkmode.dark .op_exactqa_word_word_pronounce,
	 .darkmode.dark #c-tip-custom-calenderCont{color:#eee}
	.darkmode.dark .c-btn,.darkmode.dark .result-op [class*=episode-btn],
	 .darkmode.dark div[class*=gameinfo] [class*=item_],.darkmode.dark [class*=table-body-row_]:nth-of-type(odd){background-color:#2228}
	.darkmode.dark .c-btn:active,.darkmode.dark [class*=hover_]:hover{-webkit-box-shadow:inset 1px 1px 0px #000,inset -1px -1px 0px #555}
	.darkmode.dark .sam_newgrid~#page a{background-color:#2228!important}
	.darkmode.dark .c-tabs-nav .c-tabs-nav-selected,.darkmode.dark .xcp-list-loader.is-second{color:#2c99ff!important}
	.darkmode.dark .result-op [class*=tabs-]:not([class*=tabs-container]),.darkmode.dark .c-gap-top-large [class*=tag-item],
	 .darkmode.dark .result-op [class*=tabs-]:not([class*=tabs-container]) a:not([class*=-links-]),
	 .darkmode.dark .result-op [class*=tags-]:not([class*=tabs-container]) span{background-color:#2225}
	.darkmode.dark .result-op [class*=main-tabs_] [class*=tab-item-selected]{color:#ccc}
	.darkmode.dark div[class*=calendar-box] div[class*=select]:not([class*=selecting]),
	 .darkmode.dark div[class*=button-list_] div[class*=item_],.darkmode.dark .new-pmd .c-img,.darkmode.dark .op_cal table,
	 .darkmode.dark .op-b2b-find-all{background:#0000}
	.darkmode.dark div[class*=resultItem-hover],.darkmode.dark a[class*=race_]:hover{background-color:#222a}
	.darkmode.dark div[class*=calendar-box] div[class*=back-today]{background:#f5f5f6a0!important}
	.darkmode.dark div[class*=calendar-box] div[class*=back-today]:hover{background:#f0f0f1db!important}
	.darkmode.dark div[class*=calendar-box] div[class*=content-thead]{color:#aaa!important}
	.darkmode.dark .cell-almanac,.darkmode.dark .result-molecule>#page a:hover{color:#ddd!important}
	.darkmode.dark .cell-inner-box:not(.cell-work):not(.cell-rest):not(.cell-weekend):not(.cell-festival) .cell-daynumber,
	 .darkmode.dark .result-op [class*=tab-selected_].darkmode.dark [class*=label-bar_],.darkmode.dark [class*=tab-bar_],
	 .darkmode.dark [class*=custom-bar_],.darkmode.dark [class*=sample-bar_],.darkmode.dark [class*=under-line_],
	 .darkmode.dark [class*=vmp-zxenterprise-new_] [class*=vmp-zxenterprise-scroll-item_] p{color:#eee}
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
	.darkmode.dark .op_express_delivery_more li i:hover,.darkmode.dark .op_express_delivery_hidemore:hover,
	 .darkmode.dark .op_express_delivery_showmore:hover{color:#e38cff}
	.darkmode.dark .c-border{border:1px solid #5566;border-bottom-color:#5556;border-right-color:#5556}
	.darkmode.dark .op_express_delivery_hot li{border-color:#777 #777 #777 transparent}
	.darkmode.dark .new-pmd .se_st_icon_book,.darkmode.dark .new-pmd .se_st_icon_download,
	.darkmode.dark .search_tool:hover,.darkmode.dark .search_tool_conter span:hover,
	 .darkmode.dark .c-tip-custom-input,.darkmode.dark .c-tip-si-input,.darkmode.dark .col-header .overview-display-text,
	 .darkmode.dark .op_exactqa_detail_word_pronounce,.darkmode.dark [class*=search-container] input,
	 .darkmode.dark [class*=select-container],.darkmode.dark .cu-color-text,
	 .darkmode.dark [data-pmd] .c-color-link{color:#bbb}
	.darkmode.dark .result-op [class*=card_],.darkmode.dark .c-onlyshow-toppic [class*=right-btn_],
	 .darkmode.dark .c-onlyshow-toppic [class*=left-btn_]{border-radius:8px;background:#2226!important;backdrop-filter:blur(3px)!important;
	   box-shadow:inset 0 0 12px 0 #0007!important}
	.darkmode.dark .c-onlyshow-toppic [class*=right-btn_],
	.darkmode.dark .c-onlyshow-toppic [class*=left-btn_]{background:#2228!important}
	.darkmode.dark .result-op [class*=boiling-btn_],
	 .darkmode.dark .result-op [class*=card-more_]:hover{background-color:#333b!important;backdrop-filter:blur(8px)}
	.darkmode.dark .soutu-env-new .soutu-layer .soutu-state-normal,
	 .darkmode.dark .soutu-env-new .soutu-layer .soutu-error,
	 .darkmode.dark .soutu-env-new .soutu-layer .soutu-waiting{background:#222d}
	.darkmode.dark .soutu-env-new .soutu-layer .soutu-drop{background:#2222}
	.darkmode.dark .op_new_cal_screen,.darkmode.dark [data-pmd] .c-container,
	 .darkmode.dark .col-header .col-overview{background-color:#2222!important;color:#aaa}
	.darkmode.dark #wrapper [data-pmd] .c-img img,.darkmode.dark .x-interact-publish-opt>*:not(.send),.darkmode.dark .interact-bar-right,
	 .darkmode.dark .xcp-list-loader.is-second.icon,
	 .darkmode.dark #wrapper [class*=icon_]:not([class*=clear_]):not([class*=_download]):not([class*=bear-icon_]):not([class*=live-label-icon_])`
	 +`:not([class*=op_weather]):not([class*=full-star_]):not([class*=card-more-icon_]):not([class*=unselected_] i):not([class^=right-icon_])`
	 +`:not([class^=source-icon_]):not([class*=live-icon]):not([class*=arrow-icon]):not([class*=theme-icon]):not([class*=avatar])`
	 +`:not(.c-showurl [class*=icon_]):not([class*=weather-icon_]):not([class*=icon-gap-]):not([class*=qihou-icon_]):not([class*=state-icon_])`
	 +`:not([class*=pause]):not([class*=play]):not([class*=audio-wrapper_]),
	 .darkmode.dark #wrapper [class*=wrap_] [class*=opt-emoji_],.darkmode.dark #wrapper .c-icon [class*=img2_],
	 .darkmode.dark #wrapper .c-icon[class*=wrapper_],.darkmode.dark #wrapper [class*=select-icon],
	 .darkmode.dark #wrapper [class*=icon-more_],.darkmode.dark #wrapper [class*=title-icon-row_],
	 .darkmode.dark #wrapper .c-color .sub-icon,.darkmode.dark [class*=sc-audio-] [class*=-icon_]{filter:invert(1)}
	.darkmode.dark .col-header .overview-display-wrap li,.darkmode.dark .new-pmd .recommend-none-border{border-color:#8887}
	.darkmode.dark .col-header .overview-display-wrap li:hover,.darkmode.dark .x-interact-publish-cont,
	 .darkmode.dark .x-interact-publish-cont-topic,.darkmode.dark a:nth-child(even) [class*=row-wrapper_]{background-color:#1115}
	.darkmode.dark .new-pmd .c-tag,.darkmode.dark [class*=game_]:nth-child(odd){background-color:#1113}
	.darkmode.dark .new-pmd .c-tag:hover{background-color:#111c}
	.darkmode.dark .col-header .overview-display-wrap li::after,
	 .darkmode.dark .col-header .col-overview-desc::before,.darkmode.dark .col-header .col-overview-display::before{background:#999}
	.darkmode.dark .op_exactqa_word_how_read,.darkmode.dark .op_exactqa_word_mp3_play{mix-blend-mode:color-burn}
	.darkmode.dark .c-container [class*=ask-doctor-btn]:not([class*=-btn-]),
	 .darkmode.dark .c-container [class*=-btn]:not([class*=-btn-]):not(:not(.c-gap-left)),
	 .darkmode.dark .result-op [class*=-btn]:not([class*=-btn-]):not(:not(.c-gap-left)),
	 .darkmode.dark .c-container [class*=btn-w]:not([class*=-btn-]),
	 .darkmode.dark .col-header .col-viewmore-wrap{background:#2228;color:#bbb}
	.darkmode.dark .result-op [class*=tag-item_]:not([class*=tag-item-active_]){background:#2228!important;color:#bbb!important}
	.darkmode.dark .c-container [class*=ask-doctor-btn]:not([class*=-btn-]):hover,
	 .darkmode.dark .result-op [class*=-btn]:not([class*=-btn-]):not(:not(.c-gap-left)):hover,
	 .darkmode.dark .result-op [class*=tag-item_]:not([class*=tag-item-active_]):hover,
	 .darkmode.dark .c-container [class*=-btn]:not([class*=-btn-]):not(:not(.c-gap-left)):hover,
	 .darkmode.dark .c-container [class*=btn-w]:not([class*=-btn-]):hover{background:#1118!important;color:#a088ff!important}
	.darkmode.dark .sam_newgrid~#page a{background:#2222!important}
	.darkmode.dark .c-dropdown2:hover .c-dropdown2-btn-icon-border,.darkmode.dark .c-dropdown2-hover .c-dropdown2-btn-icon-border,
	 .darkmode.dark .c-tabs-item .c-btn:hover,.darkmode.dark .result-op [class*=tags-] span:hover{background:#222!important}
	.darkmode.dark .c-dropdown2 .c-dropdown2-menu,.darkmode.dark [class*=data-tip],
	 .darkmode.dark [class*=travel-select-board-layout]{background:#222b;backdrop-filter:blur(5px)}
	.darkmode.dark .op-exrate-nav{border-bottom:1px solid #9db2ff}
	.darkmode.dark .op-exrate-li,.darkmode.dark .op-exrate-dropdown dl dd div,.darkmode.dark .nors li{color:#777}
	.darkmode.dark .op-exrate-nav li.op-exrate-li-sel{color:#9db2ff;background:#2222;border:1px solid #9db2ff}
	.darkmode.dark .c-dropdown2 .c-dropdown2-selected{color:#9db2ff!important;background:#9db2ff22!important}
	.darkmode.dark .opui-scroll-ctrl-scroll{border:none!important}
	.darkmode.dark .opui-scroll-ctrl-scroll .opui-scroll-axis{background:#0005}
	.darkmode.dark .opui-scroll-ctrl-scroll .opui-scroll-slider{background:#6665;border:1px solid #9db2ff1f}
	.darkmode.dark .opui-scroll-ctrl-scroll-touch .opui-scroll-slider{border:1px solid #9db2ff;margin-left:-2px}
	.darkmode.dark .c-color-text,.darkmode.dark [class*=opt-ctn],.darkmode.dark .xdp .title-area,.darkmode.dark [class*=SuffixText_],
	 .darkmode.dark [class*=cc-title_],.darkmode.dark .wenda-abstract-leading-words h3,.darkmode .c-summary,
	 .darkmode.dark [class*=car-pc-series-color],.darkmode.dark [class^=wrap_]:not([class*=like_]){color:#909cb3}
	.darkmode.dark .c-gap-bottom-small,.darkmode.dark [class*=rich-text],.darkmode.dark .xcp-publish-title,
	 .darkmode.dark .c-dropdown2 .c-dropdown2-option,.darkmode.dark .xcp-list-title,.darkmode.dark .nors p,
	 .darkmode.dark .content *:not([class*=-img-]):not([class*=-game-]){color:#aaa}
	.darkmode.dark [class*=article_]>[class*=title_],.darkmode.dark .user-bar-uname{color:#909cb3!important}
	.darkmode.dark .x-interact-publish .textarea-topic,.darkmode.dark .x-interact-publish .text-area{background:#0000;color:#bbb}
	.darkmode.dark .x-interact-publish .emoj-panel,.darkmode.dark [class*=car-pc-series-table]{background:#1118}
	.darkmode.dark .new-pmd .c-line-clamp1[class*=source-name_],.darkmode.dark .op_weather4_xlzstit,
	 .darkmode.dark .op_weather4_jslul span,.darkmode.dark [class*=color-span_] [class^=text_]{color:#fff!important}
	.darkmode.dark [srcid]:not([srcid=''])>[class*=root],.darkmode.dark .res-border-bottom,.darkmode.dark .hint_right_middle,
	 .darkmode.dark .med-qa .c-line-bottom,.darkmode.dark .wa-zp-exact-new-bline,.darkmode.dark .c-tabs-nav,
	 .darkmode.dark [class*=nav_],.darkmode.dark [class*=table-thead_],.darkmode.dark [class*=car-pc-series-bline],
	 .darkmode.dark [class*=head-container_],.darkmode.dark .op-weather-province-item,
	 .darkmode.dark [class*=tab-bar_]{border-bottom:1px solid #556}
	.darkmode.dark .xcp-list-loader:not(.is-second),.darkmode.dark [class*=reyi-item-group],
	 .darkmode.dark [class*=select-wrapper_] [class*=select-box_]{background:#2223}
	.darkmode.dark .xcp-list-loader:not(.is-second):hover{background:#2228}
	.darkmode .new-pmd .c-text-blue-border{color:#859dff!important}
	.darkmode.dark .new-pmd .c-text-blue-border{border:1px solid #859dff}
	.darkmode.dark .c-tip-con .c-tip-timerfilter ul,
	 .darkmode.dark [class*=pop_over_],.darkmode.dark [class*=_popup_],
	 .darkmode.dark [class*=select-container] ul,
	 .darkmode.dark .wrapper_new #form .bdsug-new ul li .name,
	 .darkmode.dark .wrapper_new #form .bdsug-new ul li .brief,
	 .darkmode.dark .wrapper_new #form .bdsug-new ul li .info{color:#999}
	.darkmode.dark .c-tip-custom hr{border-top:1px solid #9db2ff66}
	.darkmode.dark .c-tip-custom-input,.darkmode.dark .c-tip-si-input,.darkmode.dark .c-tip-con .c-tip-timerfilter li .c-tip-custom-submit,
	 .darkmode.dark .c-tip-con .c-tip-timerfilter li .c-tip-timerfilter-si-submit,.darkmode.dark #c-tip-custom-calenderCont,
	 .darkmode.dark [class*=input_],.darkmode.dark [class*=car-pc-list],.darkmode.dark [class*=text-area-box_]{border:1px solid #778}
	.darkmode.dark .op_mon h5{background:#0000;border-bottom:1px solid #448}
	.darkmode.dark .op_mon td,.darkmode.dark .op_mon th{background:#0000;border:1px solid #448}
	.darkmode.dark .op_mon th{background:#33a6}
	.darkmode.dark #c-tip-custom-calenderCont .op_mon td.op_mon_cur_month,.darkmode.dark [class*=shortAnswer_]{color:#fff}
	.darkmode.dark .op_mon td.op_mon_day_disabled{color:#557!important}
	.darkmode.dark .op_mon td.op_mon_day_hover{color:#6af;border:1px solid #38f}
	.darkmode.dark .wa-zp-exact-new-aurl:not(.wa-zp-exact-new-current),.darkmode.dark .wa-zp-exact-new-gray-a{color:#6af}
	.darkmode.dark .wa-zp-exact-new-aurl:not(.wa-zp-exact-new-current):hover{color:#c8f}
	.darkmode.dark .wa-zp-exact-new-color{color:#99a}
	.darkmode.dark #wrapper [class*=line_]:not([class*=timeline_]):not([class*=_fanyi]):not([class*=container-inline_]):not([class*=image-]):not([class*=pinyin])`
	 +`:not([class*=chart-line_]):not([class*=blog-item_]),.darkmode.dark [class*=hasline_]:after,
	 .darkmode.dark [class*=Line_],.darkmode.dark [class*=activeCategoryItem_]:after{background:#9db2ff66}
	.darkmode.dark [class*=inpt_disable_]{background:#1118!important;color:#aaa!important}
	.darkmode.dark [class*=pop_over_] li:hover,.darkmode.dark [class*=_popup_] [class*=selectItem]:hover,
	 .darkmode.dark [class*=select-container] li:hover{background-color:#0005!important;color:#b9f}
	.darkmode.dark .op_translation_textbg,.darkmode.dark [class^=publisher-wrap_] [class^=textarea_],
	 .darkmode.dark [class*=text-area-box_] [class*=text-area_]{background:unset;color:#eee!important;font:10pt Microsoft-Yahei,sans-serif}
	.darkmode.dark #container.sam_newgrid .c-showurl{color:#88a}
	.darkmode.dark #guaranteePopper.guarantee-pc .popover-content{background-color:#111a;backdrop-filter:blur(5px)}
	.darkmode.dark #guaranteePopper.guarantee-pc .popover-content .popover-arrow{color:#1119}
	.darkmode.dark #guaranteePopper.guarantee-pc .popover-content .popover-inner{background-color:#0000}
	.darkmode.dark #guaranteePopper.guarantee-pc .popover-content .actions .btn{background-color:#3337}
	.darkmode.dark #guaranteePopper.guarantee-pc .popover-content .actions .btn:hover{background-color:#000a}
	.darkmode.dark section.header{filter:opacity(.7);transition-duration:.3s}
	.darkmode.dark section.header:hover{filter:initial}
	.darkmode.dark #wrapper [class*=table-body-row_] span{color:#09f}
	.darkmode.dark #wrapper [class*=table-body-row_] span:hover{color:#0df}
	.darkmode.dark #wrapper [class*=virus-item_] [style*="#4D5054"]{color:#999!important}
	.darkmode.dark #wrapper [class*=episode-btn_]:hover,.darkmode.dark [class*=-tlinkur] a:hover{background:#111!important}
	.darkmode.dark #wrapper [class*=result] [class*=text-container_]{width:268px}
	.darkmode.dark .op-unit-tabs-nav-left .tabs-nav,.darkmode.dark .single-answer,.darkmode.dark .ms-measures-content .op-result,
	 .darkmode.dark .op-unit-tabs-nav-container .op-unit-tabs-nav-right{border-color:#6ff5!important}
	.darkmode.dark .op-unit-tabs-nav-left-bg{border-color:#fff0!important}
	.darkmode.dark .op-unit-tabs-nav-left .tabs-nav li:not(.tabs-nav-selected):not(:last-of-type)::after{background-color:#6ff5!important}
	.darkmode.dark .op-unit-tabs-nav-left .tabs-nav .tabs-nav-selected{border-color:#1bb!important;background-color:#1118!important;color:#fff!important}
	.darkmode.dark .op-unit-tabs-nav-left .tabs-nav li{color:#999!important}
	.darkmode.dark .ms-measures-container .op-unit-exchange{border-color:#999}
	.darkmode.dark .ms-measures-container .answer-item{color:#ccc;border-color:#9996!important}
	.darkmode.dark .dropdown-menu-item,.darkmode.dark [class*=pc-name_],.darkmode.dark [class*=pc-sub-title_],.darkmode.dark [class*=subtitle_],
	 .darkmode.dark [class*=answer-pc_]{color:#ccc!important}
	.darkmode.dark .dropdown-menu-item:hover{background:#3c3c3c!important}
	.darkmode.dark #wrapper [class*=container_] [class^=right-icon_],.darkmode.dark [class*=button_]:not([class*=slink-button]){background:#2228}
	.darkmode.dark #wrapper [class*=container_] [class^=right-icon_]:hover,
	 .darkmode.dark #wrapper [class*=button_]:not([class*=slink-button]):hover{background:#111!important}
	.darkmode.dark #wrapper [class*=button_]:not([class*=slink-button]):hover [class*=content_]{color:#eee}
	.darkmode.dark #wrapper [class^=title_],.darkmode.dark #wrapper [class^=list-gap_],.darkmode.dark #wrapper [class*=group-title_]{color:#a8b8c8}
	.darkmode.dark #wrapper [class*=danmaku_] [class*=mask_]{background:linear-gradient(180deg,#222,#0000)}
	.darkmode.dark #wrapper [class^=wrap_]:not([class*=like_]):hover{box-shadow:0 2px 5px 0 #735aff4d}
	.darkmode.dark #wrapper [class^=publisher_]{background:#0000}
	.darkmode.dark #wrapper [class^=publisher-wrap_]{background:#3338!important}
	.darkmode.dark #wrapper [class^=publisher-wrap_]:hover{background:#2228!important}
	.darkmode.dark #wrapper [class^=publisher_][class*=border_]:not(:hover){border:1px solid #666}
	.darkmode.dark #wrapper [class^=emoji-picker_]{background-color:#222d}
	.darkmode.dark #wrapper [class^=emoji-picker-item_]:hover{background-color:#fff2}
	.darkmode.dark .op-stockdynamic-content{color:#bbb}
	.darkmode.dark .op-stockdynamic-map,.darkmode.dark [class^=vote-content_] [class*=gary_],
	 .darkmode.dark [class*=icon-wrapper_]:not([class*=-icon-wrapper_]){background:#1115}
	.darkmode.dark .op-stockdynamic-map-tag{background-color:#555}
	.darkmode.dark .op-stockdynamic-map-tip{background:#111d;border-color:#444}
	.darkmode.dark .op-stockdynamic-tabs-nav{border-color:#555}
	.darkmode.dark .op-stockdynamic-tabs-nav .op-stockdynamic-tabs-nav-selected{color:#ccc;border-color:#555 #555 #9db2ff #555}
	.darkmode.dark .s_side_wrapper,.darkmode.dark #s_side_wrapper{opacity:.1;transition-duration:.38s}
	.darkmode.dark .s_side_wrapper:hover,.darkmode.dark #s_side_wrapper:hover{opacity:1}
	.darkmode.dark .s_side_wrapper,.darkmode.dark #s_side_wrapper,.darkmode.dark .video-tag-item:hover{background-color:#222a}
	.darkmode.dark .side-toast,.darkmode.dark #s_side_wrapper .toast{color:#ddd;background:#222a}
	.darkmode.dark .video-tag-container{background-color:unset}
	.darkmode.dark .video-tag-item{background-color:#3335}
	.darkmode.dark .video-tag-item-select{background-color:#111a}
	.darkmode.dark .c-table th{color:#888;background-color:#2225}
	.darkmode.dark .c-table th,.darkmode.dark .c-table td{border-color:#555}
	.darkmode.dark .op-concept-stock-fall{color:#5d5}
	.darkmode.dark [class*=see-more-wrap_] [class*=see-more-content_],
	 .darkmode.dark [class*=see-more-wrap_]:hover [class*=see-more-content_]{border-radius:6px}
	.darkmode.dark [class*=doctor-desc] span,.darkmode.dark .cu-color-source{color:#6aa2cb}
	.darkmode.dark #searchTag [class*=tags_]{color:#bbb!important;background-color:#29293050!important}
	.darkmode.dark #searchTag [class*=tag-selected_]{color:#9db2ff!important}
	.darkmode.dark #searchTag [class*=tags_]:hover{color:#fff!important}
	.darkmode.dark #searchTag [class*=tag-selected_],.darkmode.dark #searchTag [class*=tagSelected_],
	 .darkmode.dark #searchTag [class*=tags_]:hover{background-color:#292930cc!important}
	.darkmode.dark #searchTag [class*=tag-selected_],
	 .darkmode.dark #searchTag [class*=tagSelected_]{box-shadow:0px 1px 0px 1px #2226 inset,0px -1px 0px 0px #9ae6 inset}
	.darkmode.dark #wrapper [class*=vertical-gradient_]{background-image:linear-gradient(to top,#2626268a,#3330)!important}
	.darkmode.dark #wrapper [class^=comment-wrapper_] [class^=cover-container_]{background:linear-gradient(to top,#222,#0000)}
	.darkmode.dark #wrapper [class*=vmp-zxenterprise-new_] table tbody tr:nth-child(odd){background:unset}
	.darkmode.dark #wrapper [class*=vmp-zxenterprise-new_] [class*=vmp-zxenterprise-scroll-item-title_]{color:unset}
	.darkmode.dark #wrapper [class*=vmp-zxenterprise-new_] [class*=vmp-zxenterprise-links_]{background:#1115;color:#eee}
	.darkmode.dark #wrapper [class^=_content] [class^=load_]{background-color:#2225!important}
	.darkmode.dark #wrapper [class*=tabs-wrapper_] [class*=tab_]{color:#aaa!important}
	.darkmode.dark #wrapper [class*=tabs-wrapper_] [class*=tab_][class*=active_]{background:#2226!important;color:#a59fff!important}
	.darkmode.dark #wrapper [class*=pc_] [class*=item_]:hover [class*=item-hover_],
	 .darkmode.dark #wrapper [class*=list-row_]:hover{background-color:#1118!important}
	.darkmode.dark #wrapper [class*=more-btn_],.darkmode.dark #wrapper [class*=box-item_],{background-color:#3335}
	.darkmode.dark #wrapper [class*=content_]{color:#b3bcff}
	.darkmode.dark #wrapper [class*=pc_] [class*=text_]{color:#90c2ff}
	.darkmode.dark #wrapper [class*=item-selected_]{background-color:#1117}
	[class*=item-selected_] [class*=left-circle],[class*=item-selected_] [class*=right-circle]{background-color:#0000!important}
	.darkmode.dark #wrapper [class*=detail-bg_]{background-image:linear-gradient(#1117,#1111)}
	.darkmode.dark .cos-city-selector-content,.darkmode.dark .cos-city-header-list-wrapper,
	 .darkmode.dark [class*=selector-options_]{background-color:#111a;backdrop-filter:blur(4px)}
	.darkmode.dark .cos-city-header-city-search{background-color:#111a}
	.darkmode.dark .cos-city-content,.darkmode.dark .cos-city-header-city-sug-list,.cos-city-header-city-sug-none,
	 .darkmode.dark .cos-city-header-city-search input{background-color:#0000!important}
	.darkmode.dark .cos-city-content-nav,.darkmode.dark [class*=selector-options_] [class*=options-item_]{color:#aaa}
	.darkmode.dark [class*=selector-options_] [class*=options-item_]:hover{background:#111}
	.darkmode.dark .cos-city-content-city-item-wrapper,.darkmode.dark .op_dict3_title{color:#bbb}
	.darkmode.dark .op_dict3_common{color:#a8bfff}
	.darkmode.dark #wrapper [class*=more-wrap_]:hover{background:#222a}
	.darkmode.dark #wrapper [class*=more-wrap_] [class*=more-span_]{background-color:#0000!important;color:#88a!important}
	.darkmode.dark #wrapper [class*=more-wrap_]:hover [class*=text_]{color:#a0b6ff!important}
	.darkmode.dark #wrapper [class*=money-style_]{color:#ffd400}
	.darkmode.dark #wrapper [class*=select-input_]{color:#0003}
	.darkmode.dark #wrapper [class*=select-wrapper_]{border-color:#6d5fdd70}
	.darkmode.dark .wrapper_new #form .bdsug-new ul li .right-btn{background-color:#3335;background-image:none!important}
	.darkmode.dark #wrapper [class*=baike-wrapper_],.darkmode.dark #wrapper [class*=interaction-wrapper_] [class*=interaction_]{background-color:#222c}
	.darkmode.dark #wrapper [class*=baike-slink-wrapper_]{background-color:#222d}
	.darkmode.dark #wrapper [class*=interaction-wrapper_] svg[class*=irregularity-svg_] #WISE > g{fill:#222c}
	.result-op [class*=footer_]{background:#eee1}
	.result-op [class*=footer_] [class*=more_]{background-color:#eee6}
	.result-op [class*=footer_] [class*=content_]{background:#eee2}
	.darkmode.dark .result-op [class*=footer_]{background:#1111}
	.darkmode.dark .result-op [class*=footer_] [class*=more_]{background-color:#1116}
	.darkmode.dark .result-op [class*=footer_] [class*=content_]{background:#1112}
	.darkmode.dark .result-op [class*=tag_][class*=primary_],
	 .darkmode.dark .result-op [class*=bg_] [class*=header-btn_]:hover,
	 .darkmode.dark .cos-search-link,.darkmode.dark #wrapper [class*=_popup_] [class*=selected]{color:#5bf}
	.result-op [class*=bg_],.result-op [class*=content_],
	 .darkmode.dark .result-op [class*=bg_],.darkmode.dark .result-op [class*=content_]{background-color:#0000}
	.darkmode.dark .result-op [class*=content_] [class*=desc_],
	 .darkmode.dark .result-op [class*=bg_] [class*=entry-text_]{color:#ccc}
	.darkmode.dark .result-op [class*=bg_] [class*=select-entry_]{background:#0000}
	.darkmode.dark .result-op [class*=bg_] [class*=_select-entry_]{border-color:#677799}
	.darkmode.dark .result-op [class*=bg_] [class*=header-btn_]{background:#2225}
	[class*=video-title_]{color:#6ea1ff!important}
	[class*=exam-tab_] [class*=select-item_]:before{background-image:radial-gradient(circle at top left,transparent 0.09rem,#ffffff45 0)}
	[class*=exam-tab_] [class*=select-item_]:after{background-image:radial-gradient(circle at top right,transparent .09rem,#ffffff45 0)}
	.darkmode.dark [class*=exam-tab_] [class*=select-item_]:before{background-image:radial-gradient(circle at top left,transparent 0.09rem,#22222245 0)}
	.darkmode.dark [class*=exam-tab_] [class*=select-item_]:after{background-image:radial-gradient(circle at top right,transparent .09rem,#22222245 0)}
	</style>`;

	let rippleCss = `<style id="dumoe-rippleCss">
	.legitRipple{position:relative;overflow:hidden}
	.legitRipple-ripple{position:absolute;z-index:0;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);
	pointer-events:none!important;border-radius:50%;background:#fff4;will-change:transform,width,opacity;
	-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);width:0;opacity:1;
	-webkit-transition:width .5s linear,opacity 2s ease-out;transition:width .5s linear, opacity 2s ease-out}
	.legitRipple-ripple:before{content:"";padding-top:100%;display: block}
	img ~ .legitRipple-ripple{z-index:auto}
	</style>`;

	let onSearchInitCss = `<style id="gm_ebdinitbg">body,#head{background:#333!important;color:#aaa!important}</style>`;

	let rightListSwitchCss = `<style id="dumoe-rightListSwitch">
	.gm-right-switch{float:right;margin-bottom:10px;padding:5px;box-sizing:border-box;text-align:center}
	.hamburger .line{width:12px;height:2px;background-color:#9db2ff;display:block;margin:2px auto;transition:all 0.3s ease-in-out}
	#hamburger-1.is-active .line:nth-child(2){opacity:0}
	#hamburger-1.is-active .line:nth-child(1){transform:translateY(4px) rotate(45deg)}
	#hamburger-1.is-active .line:nth-child(3){transform: translateY(-4px) rotate(-45deg)}
	.hamburger:hover{cursor:pointer}
	</style>`

	let initHideRightListCss = `<style>#content_right>table,#con-ar{visibility:hidden}</style>`;

	let bgImageCss = `body:before{content: '';position:fixed;top:0;left:0;height:100%;width:100%;animation:gmebdbgfadein .6s ease-in both;z-index:-1}
	body{background:linear-gradient(#ffffffc6,#ffffffc6),#url center / cover no-repeat!important;
	background-attachment:fixed!important;background-repeat:no-repeat;background-position:center}
	@-webkit-keyframes gmebdbgfadein{ 0% {background:rgba(255,255,255,1)} 100% {background:rgba(255,255,255,0)} }`;

	let bgCircleMaskSurface,bgCircleMaskInside = `{left:0;top:0;width:100%;height:100%;position:fixed;
	background:linear-gradient(#ffffffc6,#ffffffc6),#url center / cover no-repeat;background-attachment:fixed;
	background-repeat:no-repeat;background-position:center}`;

	let darkmodeHomeToSearchCssFix = `<style id="gmdarkmodehometosearchcssfix">
	body{background:#333!important}
	#head,#wrapper #s_tab{background:#fff2!important;transition-duration:.3s}
	#head:hover,#wrapper #s_tab:hover{background:#fff6!important;transition-duration:.3s}
	#head,#wrapper #s_tab{background:#3332!important}
	#head:hover,#wrapper #s_tab:hover{background:#22222833!important}
	#s_tab .cur-tab,#s_tab .s-tab-item:hover,#u>a{color:#9d9bff!important}
	#s_tab .cur-tab,#s_tab .s-tab-item:hover,.darkmode #u>a:not([name*=login]),
	 .c-tabs-nav-li,.c-tabs-nav li,.c-btn:not([class*=btn-content_]):not([class*=search]):not([class*=setting]){color:#aaa!important}
	#s_tab .cur-tab:before,#s_tab a,#s_tab b,#s_tab .s-tab-item:hover:before{color:#888!important}
	.bdpfmenu,.usermenu,.result-op [class*=tab-selected_]{background:#0008!important}
	#u .bdpfmenu a,#u .usermenu a{color:#aaa!important}
	#u .bdpfmenu a:hover,#u .usermenu a:hover{color:#fff762!important;background-color:#000!important;transition-duration:.3s}
	.c-tip-con [class*=menu] li a,.bdpfmenu a:link,.bdpfmenu a:visited,#u .usermenu a:link,#u .usermenu a:visited{background-color:#fff0!important}
	.darkmode.dark #u .bdpfmenu a,.darkmode.dark #u .usermenu a{border:none!important;background:#0000!important}
	</style>`;

	let darkmodeScrollbarCss = `<style id="gmdarkscrollbar">
	::-webkit-scrollbar-track-piece:vertical{background:#666!important;box-shadow:inset 8px 0 8px #222, inset -2px 0 8px #666!important}
	::-webkit-scrollbar-track-piece:horizontal{background:#666!important;box-shadow:inset 0 8px 8px #222, inset 0 -2px 8px #666!important}
	::-webkit-scrollbar-thumb:vertical{background:linear-gradient(92deg,#666,#222)!important;box-shadow:5px 7px 10px #111, 5px -7px 10px #111!important}
    ::-webkit-scrollbar-thumb:horizontal{background:linear-gradient(180deg,#666,#222)!important;box-shadow:5px 7px 10px #111, -5px 7px 10px #111!important}
	</style>`;

	let scrollbarCssFix = `<style id="gmscrollbarfix">
	::-webkit-scrollbar{width:1rem!important;height:1rem!important}
	::-webkit-scrollbar-thumb{border-radius:1rem!important}
	</style>`;

	let notifyCss = `<style id="dumoe-notify">
	.notify-item {
	  min-width: 150px;  padding: 1.2vh 1.2vw;  font-size: 14pt;  line-height: 1.2;
	  border-radius: 4px;  margin-bottom: 2vh;  animation-duration: .5s;
	  animation-name: bounceIn;  position: relative; text-align: center;
	}
	.notify-item::before {
	  content: "";  z-index: -1;  position: absolute;  border-radius: inherit;  background: inherit;  filter: blur(4px);
	  top: 1px;  left: 0px;  opacity: 0.6;  width: 100%;  height: 100%;
	}
	.notify-container {
	  position: fixed;  height: 0;  bottom: 0;  width: 100%;  z-index: 100;
	  display: flex;  flex-direction: column-reverse;  align-items: center;  flex-wrap: nowrap;
	}
	.notify-item-removing{
	  opacity: 0;
	  transition: opacity 0.3s;
	}
	.notify-item-default {
	  background: hsl(0, 0%, 85%);
	  color: hsl(0, 0%, 10%);
	}
	.notify-item-green {
	  background: hsl(126 70% 46%);
	  color: #fff;
	}
	.notify-item-red {
	  background: hsl(0, 88%, 68%);
	  color: #fff;
	}
	@keyframes bounceIn {
	  0%,20%,40%,60%,80%,to {
		  -webkit-animation-timing-function: cubic-bezier(.215,.61,.355,1);
		  animation-timing-function: cubic-bezier(.215,.61,.355,1)
	  }
	  0% {
		  opacity: 0;
		  -webkit-transform: scale3d(.3,.3,.3);
		  transform: scale3d(.3,.3,.3)
	  }
	  20% {
		  -webkit-transform: scale3d(1.05,1.05,1.05);
		  transform: scale3d(1.05,1.05,1.05)
	  }
	  40% {
		  -webkit-transform: scale3d(.95,.95,.95);
		  transform: scale3d(.95,.95,.95)
	  }
	  60% {
		  opacity: 1;
		  -webkit-transform: scale3d(1.03,1.03,1.03);
		  transform: scale3d(1.03,1.03,1.03)
	  }
	  80% {
		  -webkit-transform: scale3d(.97,.97,.97);
		  transform: scale3d(.97,.97,.97)
	  }
	  to {
		  opacity: 1;
		  -webkit-transform: scaleX(1);
		  transform: scaleX(1)
	  }
	}
	</style>`;

	//-------- Class ----------------------------------------------------------------------
	class Notify {
		#$container;
		constructor () {
			// Add container to hold notify item
			this.#$container = this.createNotifyContainer();
			document.body.append(this.#$container);
		}

		show(options) {
			if (!this.isOptionsValid(options)) return;

			const $item = this.createNotifyItem(
				options.message || '',
				options.color || 'default'
			);

			if (options.timeout && options.timeout > 999) {
				this.setAutocloseTimeout($item, options.timeout);
			}

			this.setCloseOnClick($item);
			this.#$container.append($item);
		}

		createNotifyContainer() {
			const $container = document.createElement('div');
			$container.className = 'notify-container';

			return $container;
		}

		createNotifyItem(message, color) {
			const $item = document.createElement('div');
			$item.classList.add('notify-item');
			$item.classList.add('notify-item-' + color);
			$item.innerHTML = message;

			return $item;
		}

		setCloseOnClick($el) {
			$el.addEventListener('click', () => {
				this.removeNotifyItem($el);
			});
		}

		setAutocloseTimeout($el, timeout) {
			setTimeout(() => {
				this.removeNotifyItem($el);
			}, timeout);
		}

		removeNotifyItem($el) {
			if ($el.classList.contains('notify-item-removing')) return;
			$el.classList.add('notify-item-removing');
			$el.addEventListener('transitionend', function() {
				$el.remove();
			});
		}

		isOptionsValid(options) {
			return (
				options ||
				console.error(`usage: \n const notify = new Notify();\n notify.show({ message: 'OK', color: 'green', timeout: 3000 })`)
			);
		}
	}
	//------------------------------------------------------------- Class -----------------

	//------------------------------------ Global -------------------------------------------
	const gmCfg = {
		ecchiMode: {
			id: 'ecchiMode',
			get: () => GM_getValue(gmCfg.ecchiMode.id),
			set: value => { GM_setValue(gmCfg.ecchiMode.id, value); }
		},
		performanceMode: {
			id: 'performanceMode',
			get: () => GM_getValue(gmCfg.performanceMode.id),
			set: value => { GM_setValue(gmCfg.performanceMode.id, value); }
		},
		rightListSwitch: {
			id: 'rightListSwitch',
			get: () => GM_getValue(gmCfg.rightListSwitch.id),
			set: value => {
				if(!value) { GM_deleteValue(gmCfg.rightListSwitch.id); return; }
				GM_setValue(gmCfg.rightListSwitch.id, value);
			}
		}
	};

	const gmMenu = {
		ecchiMode: {
			id: 0,
			title: {
				on: '开启ecchi模式',
				off: '关闭ecchi模式'
			},
			initNotifyCss: function(){
				if(!$('head #dumoe-notify').length){
					$('head').append(notifyCss);
				}
			},
			showNotify: function(){
				const notify = window.dumoeNotify || new Notify();
				const ecchiMode = gmCfg.ecchiMode.get();
				window.dumoeNotify = notify;
				gmMenu.ecchiMode.initNotifyCss();
				notify.show({
					message: `已${(ecchiMode ? this.title.on : this.title.off)}`,
					color: ecchiMode ? 'green' : 'red',
					timeout: 3000
				});
			},
			call: function(){
				gmCfg.ecchiMode.set(!gmCfg.ecchiMode.get());
				registerMenu();
				gmMenu.ecchiMode.showNotify();
			}
		},
		performanceMode: {
			id: 0,
			title:{
				on: '开启性能模式',
				off: '关闭性能模式'
			},
			initNotifyCss: function(){
				if(!$('head #dumoe-notify').length){
					$('head').append(notifyCss);
				}
			},
			showNotify: function(){
				const notify = window.dumoeNotify || new Notify();
				const performanceMode = gmCfg.performanceMode.get();
				window.dumoeNotify = notify;
				gmMenu.performanceMode.initNotifyCss();
				notify.show({
					message: `已${(performanceMode ? this.title.on : this.title.off)}`,
					color: performanceMode ? 'green' : 'red',
					timeout: 3000
				});
			},
			call: function(){
				gmCfg.performanceMode.set(!gmCfg.performanceMode.get());
				registerMenu();
				gmMenu.performanceMode.showNotify();
			}
		}
	};

	function registerMenu() {
		// Remove old menu
		$.each(gmMenu, function(i, ele){
			if (ele.id) {
				GM_unregisterMenuCommand(ele.id);
			}
		});

		gmMenu.ecchiMode.id = GM_registerMenuCommand(
			gmCfg.ecchiMode.get() ? gmMenu.ecchiMode.title.off : gmMenu.ecchiMode.title.on,
			gmMenu.ecchiMode.call
		);

		gmMenu.performanceMode.id = GM_registerMenuCommand(
			gmCfg.performanceMode.get() ? gmMenu.performanceMode.title.off : gmMenu.performanceMode.title.on,
			gmMenu.performanceMode.call
		);
	}

	function getRandom(min,max){
		return Math.floor(Math.random()*(max+1-min)+min)
	}

	const rippleObject = {
		'.result,.result-op:not([tpl=interactive]),.video_list':{
			dragging: 0,
			allowDragging: 1,
			callback: ($container,$ripple)=>{
				if($ripple.hasSetColor) return;
				$ripple.hasSetColor = 1;
				$ripple.css('background',`rgba(${getRandom(180,255)},${getRandom(180,255)},${getRandom(180,255)},.26)`);
			}
		}
	};

	function recoveryMutationObserver(){
		let ifr = document.createElement('iframe');
		ifr.style.display = 'none';
		document.body.appendChild(ifr);
		unsafeWindow.MutationObserver = ifr.contentWindow.MutationObserver;
		document.body.removeChild(ifr);
	}

	function getPerformanceModeStyle(style){
		const regx = /transition.+?([;}])/g;
		const performanceMode = gmCfg.performanceMode.get();
		if(performanceMode){
			style = style.replaceAll(regx, '$1');
		}
		return style
	}

	//------------------------------------ JS Run -------------------------------------------
	let home_observer;
	function ecchiOnHome()
	{
		let isDark = GM_getValue('openDark');

		$('head')
			.append(gb)
			.append(getPerformanceModeStyle(st));

		$('#lg img').each(function(){
			$(this).attr('src','https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white-d0c9fe2af5.png');
		});

		// Add dark mode switch to upper right menu
		let darkModeMenu;
		let menuDarkModeId = 'gmbdecchi-menu-darkmode';
		if($('#s-user-setting-menu').length > 0 && $(`#s-user-setting-menu #${menuDarkModeId}`).length < 1){
			darkModeMenu = $(`<a id="${menuDarkModeId}" href="javascript:;"><span class="set">${isDark ? '关闭' : '开启'}黑暗</span></a>`);
			darkModeMenu.data('cssDarkMode', 'darkmode dark');
			darkModeMenu.click(function(){
				if(isDark){
					$('body').removeClass(darkModeMenu.data('cssDarkMode'));
					$('#gmdarkscrollbar').remove();
					$('head #gmdarkmodehometosearchcssfix').remove();
				}else{
					$('body').addClass(darkModeMenu.data('cssDarkMode'));
					if(!$('#gmdarkscrollbar').length){
						$('head').append(darkmodeScrollbarCss);
					}
					if(!$('head #gmdarkmodehometosearchcssfix').length){
						$('head').append(getPerformanceModeStyle(darkmodeHomeToSearchCssFix));
					}
				}
				isDark = !isDark;
				$(this).find('span').text(`${isDark ? '关闭' : '开启'}黑暗`);
				GM_setValue('openDark',isDark);
			});
			$('#s-user-setting-menu').append(darkModeMenu);
		}

		recoveryMutationObserver();
		home_observer = new unsafeWindow.MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				let bddkmode = $('body.darkmode.dark').length > 0;
				isDark = !isDark ? bddkmode : isDark;
				if(!isDark){ return; }
				if(!bddkmode){
					home_observer.disconnect();
					$('body').addClass(darkModeMenu.data('cssDarkMode'));
					home_observer.observe(document.body, {attributes: true});
				}
				if(!$('head #gmdarkmodehometosearchcssfix').length){
					$('head').append(getPerformanceModeStyle(darkmodeHomeToSearchCssFix));
				}
			});
		});
		home_observer.observe(document.body, {attributes: true});
	}

	//------ Search Page Dark Mode Init ------
	// {bool} again - Initialize again when dom is loaded
	function ecchiOnSearchInit(){
		let isDark = GM_getValue('openDark');
		let bddkmode = $('body.darkmode.dark').length > 0;
		let performanceMode = gmCfg.performanceMode.get();

		isDark = !isDark ? bddkmode : isDark;

		if(home_observer){
			home_observer.disconnect();
			home_observer = undefined;
		}

		if($('#dumoe-rightListSwitch').length < 1){
			$('head').append(rightListSwitchCss)
			if(gmCfg.rightListSwitch.get() === '1'){
				setTimeout(()=>{ $('head').append(initHideRightListCss) },100);
			}
		}

		// Fix scorll bar css
		if(window.location.href.indexOf('.com/sf')>0 || window.location.href.indexOf('tn=news')>0){
			if($('#gmscrollbarfix').length < 1){
				$('head').append(scrollbarCssFix)
			}
		}
		$('meta[name="referrer"]').attr('content','no-referrer');

		if(!isDark || $('#dumoe-ru').length > 0 || $('#gmdarkscrollbar').length > 0){ return; }

		$('html').css('background-color', '#333');

		if($('#gm_ebdinitbg').length < 1) {
			$('head').append(onSearchInitCss);
		}

		let intervalInit = setInterval(()=>{
			bddkmode = $('body.darkmode.dark').length > 0;
			isDark = GM_getValue('openDark');
			if (!isDark) {
				clearInterval(intervalInit);
				return;
			}
			console.log('darkmode', bddkmode, isDark);
			if(!bddkmode){
				$('body, #wrapper').addClass('darkmode dark');
				if($('#gmdarkscrollbar').length < 1){
					$('head').append(darkmodeScrollbarCss);
				}
			}
		},100);
		setTimeout(()=>clearInterval(intervalInit), performanceMode ? 5000 : 8000);
	}

	//------ Search Page ------
	let bgLoading;
	function ecchiOnSearch() {
		let isDark = GM_getValue('openDark');
		let performanceMode = gmCfg.performanceMode.get();

		if(isDark && $('#gmdarkscrollbar').length < 1){
			$('head').append(darkmodeScrollbarCss);
		}

		if($('#dumoe-ru').length > 0){
			return;
		}
		$('head').append(gb).append(getPerformanceModeStyle(ru))

		if(!performanceMode){
			$('head').append(rippleCss)
		}

		let bgChanging;
		function ChangeBgColor(alpha, onlyAlpha) {
			bgChanging = 1;

			let newcss = $('body').css('background-image');
			if(onlyAlpha){
				newcss = newcss.replace(/(\d+\.\d+|\d)\)/gi, `${alpha})`);

			} else {
				let colors = ['30, 30, 40', '255, 255, 255'];
				newcss = newcss.replace(
					new RegExp(`${isDark ? colors[0] : colors[1]}, (\\d+\\.\\d+|\\d)`,'gi'),
					`${isDark ? colors[1] : colors[0]}, ${alpha}`
				);
			}

			$('body').attr('style',`background-image:${newcss}!important`);

			bgChanging = 0;
		}

		// Add ripples
		function ReAddRipples(){
			if(performanceMode){ return; }
			$.ripple.destroy();
			$.ripple(rippleObject);
		};

		// Add dark mode menu to upper right menu
		let menuDarkModeAdded;
		let pMenuDarkMode;
		function AddMenuDarkMode(){
			let menuDarkModeId = 'gmbdecchi-menu-darkmode';
			let styleDarkMode = 'darkmode dark';
			let createDarkModeBtn = ()=>{
				pMenuDarkMode = $(`<a id="${menuDarkModeId}" href="javascript:;"><span class="set">${isDark ? '关闭' : '开启'}黑暗</span></a>`);
				pMenuDarkMode.data('cssDarkMode', 'darkmode dark');
				pMenuDarkMode.click(function(){
					if(isDark){
						$('html').css('background-color', '');
						$('body ,#wrapper').removeClass(pMenuDarkMode.data('cssDarkMode'));
						$('#gmdarkscrollbar').remove();
						$('#gm_ebdinitbg').remove();
					}else{
						$('html').css('background-color', '#333');
						$('body ,#wrapper').addClass(pMenuDarkMode.data('cssDarkMode'));
						if($('#gmdarkscrollbar').length < 1){
							$('head').append(darkmodeScrollbarCss);
						}
						if($('#gm_ebdinitbg').length < 1 && !gmCfg.ecchiMode.get()) {
							$('head').append(onSearchInitCss);
						}
					}
					if(!bgChanging){ ChangeBgColor(.8); }
					isDark = !isDark;
					$(this).find('span').text(`${isDark ? '关闭' : '开启'}黑暗`);
					GM_setValue('openDark',isDark);
				});
			};

			// Open dark
			if(isDark && pMenuDarkMode && !$('body').hasClass(styleDarkMode)){
				isDark = 0;
				pMenuDarkMode.click();
			}
			if(menuDarkModeAdded > 0){
				menuDarkModeAdded = isDark ? menuDarkModeAdded + 1 : 2;
				return;
			}
			if($('b[class*=s-tab-ps]').length > 0 && $('.bdpfmenu').length > 0 && $(`.bdpfmenu #${menuDarkModeId}`).length < 1){
				createDarkModeBtn();
				$('.bdpfmenu').append(pMenuDarkMode);
			}
			else if($('#head #u').length > 0 && $(`#head #u #${menuDarkModeId}`).length < 1){
				createDarkModeBtn();
				$('#head #u').prepend(pMenuDarkMode);
			}
			menuDarkModeAdded = 1;
		}

		// Add ripples on start
		setTimeout(()=>ReAddRipples(),500);

		// Add dark mode menu on start
		let setTimeoutAddDarkModeMenu;
		let intervalAddDarkModeMenu = setInterval(()=>{
			AddMenuDarkMode();
			if((!isDark && menuDarkModeAdded > 0) || (isDark && menuDarkModeAdded > 4)){
				clearInterval(intervalAddDarkModeMenu);
				clearTimeout(setTimeoutAddDarkModeMenu);
			}
		},200);
		// Limit add dark mode menu time
		setTimeoutAddDarkModeMenu = setTimeout(()=>clearInterval(intervalAddDarkModeMenu),5000);

		// Right list switch
		let RightListSwitch = {
			button: $(`<div class="gm-right-switch">
				<div class="hamburger is-active" id="hamburger-1">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
				</div></div>`),
			create: ()=>{
				if($('#content_right').length < 1 || $('#content_right .gm-right-switch').length > 0){
					return;
				}
				$('#content_right').prepend(RightListSwitch.button);
				RightListSwitch.button.on('click',()=> { RightListSwitch.onClick(); });
			},
			onClick: active => {
				if(!active && active != false){ RightListSwitch.create(); }
				let hamburger = RightListSwitch.button.find('.hamburger');

				hamburger.toggleClass('is-active', active);
				if(hamburger.hasClass('is-active')){
					$('#content_right>table').css('visibility','visible');
					$('#con-ar').css('visibility','visible');
					gmCfg.rightListSwitch.set();
					return;
				}
				$('#content_right>table').css('visibility','hidden');
				$('#con-ar').css('visibility','hidden');
				gmCfg.rightListSwitch.set('1');
			}
		};

		// On preloader
		setTimeout(()=> {
			let interval_addrip;
			$('#content_left').on('DOMNodeInserted',(e)=>{

				if (e.target.nodeName !== 'DIV') { return; }

				let $this = $(e.target);

				if(!performanceMode && !interval_addrip && e.target.className) {
					interval_addrip = setTimeout(()=>{
						if(e.target.className.indexOf('ripple') > -1){
							interval_addrip = null;
							return;
						}
						ReAddRipples();
						interval_addrip = null;
					},900);
				}

				// Fix style occlusion
				let tql = $this.attr('tql');
				if (tql && tql.indexOf('bk_')) {
					$this.find('.c-img-border').remove();
				}

				// Remove promotion results
				$this.find('[data-placeid]').remove();
			});

			// Disable video auto play
			$('video').removeAttr('autoplay');

			// Create right List switch
			RightListSwitch.create();
			if(gmCfg.rightListSwitch.get()) { RightListSwitch.onClick(false); }

		}, 900);

		// The following is the on ecchi mode ---------------------------------------------------------------------------
		if (!gmCfg.ecchiMode.get()) {
			return;
		}

		// Get random background url
		let isBgMaskCssOk;

		if(!bgLoading){
			bgLoading = true;

			if($('#dumoe-bgCss').length > 0){
				BackgroundLoaded();
				bgLoading = false;
				return;
			}

			GM_xmlhttpRequest({
				method: 'post',
				url: 'https://rimg.moest.top',
				headers: {
					'token': '0191f2696816cf0b4cf88c6ab4e1e6103f71d966'
				},
				onload: function(response) {
					let arrbgurl = $.parseJSON(response.responseText);
					if(arrbgurl && arrbgurl.length < 2) return;

					let bgUrlA = arrbgurl[0];
					let bgUrlB = arrbgurl[1];
					let loaded = 0;

					preloadBackground();

					// Preload complete
					function setBackground() {
						let bgCss = bgImageCss.replaceAll('#url', `url(${bgUrlA})`);
						let bgCircleMaskI = bgCircleMaskInside.replace('#url', `url(${bgUrlB})`);
						let bgCircleMaskS = `.bgCircleMaskSurface${bgCircleMaskI}`
					    + `.darkmode.dark .bgCircleMaskSurface${bgCircleMaskI.replace(/#ffffffc6/ig, '#1e1e28cc')}`;

						bgCircleMaskI = bgCircleMaskS.replaceAll('Surface','Inside').replace(/#ffffffc6|#1e1e28cc/ig, '#fff0');

						if(isDark){
							let bgColorA = '30,30,40,1',
								bgColorB = '30,30,40,0',
								bgColorC = '#1e1e28cc';
							bgCss = bgCss.replace(/255,255,255,1/ig, bgColorA).replace(/255,255,255,0/ig, bgColorB).replace(/#ffffffc6/ig, bgColorC);
						}

						$('body').attr('crossorigin','anonymous');
						$('head').append(`<style id="dumoe-bgCss">${bgCss}${bgCircleMaskS}${bgCircleMaskI}`
										 + `.darkmode.dark{color:#aaa;background-color:#0000!important}</style>`);

						// preload mask background
						let maskbg = $(`<div class="bgCircleMaskInside"></div>`).clone();
						maskbg.css({'clip-path':'ellipse(1px 1px at -1% -1%)'});
						setTimeout(() => maskbg.remove(), 3000);
						$('body').append(maskbg);

						createMaskBg();
						BackgroundLoaded();
						isBgMaskCssOk = 1;
						bgLoading = false;
					}

					function startSetBackground(){
						loaded++;
						if(loaded == 2) {
							setBackground();
						}
					}

					async function preloadBackground(){
						let imgA = new Image(),
							imgB = new Image();
						await (()=>{
							imgB.src = bgUrlB;
							imgB.onload = startSetBackground();
						})();
						await (()=>{
							imgA.src = bgUrlA;
							imgA.onload = startSetBackground();
						})();
					}
				},
				onerror: function(err){
					console.log('dumoe-ecchi',err);
				}
			});
		}

		function BackgroundLoaded(){
			// Remove init bg
			$('#gm_ebdinitbg').remove();
			$('#wrapper').removeClass('darkmode dark');
			$('body').removeAttr('style');
		}

		// Show/hide background
		let logodom = $('#result_logo'),
			passBgLogo, passBgKeyboard,
			isOnSearchBox = ()=> $('#kw').is(":focus");

		let bgAnime = null, bgAlpha = .8;
		function stopBgAni(){
			if(!bgAnime) return;
			cancelAnimationFrame(bgAnime);
			bgAnime = null;
		};

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
			setTimeout(()=>{
				$('#wrapper,#aging-tools-wrapper').css('opacity','0');
			}, 60)
		};

		function bgHide(){
			stopBgAni();
			startBgAni(0);
			setTimeout(()=>{
				$('#wrapper,#aging-tools-wrapper').css('opacity','1');
			}, 60)
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

		function createMaskBg(){
			let bcmaskdom, ellipseOp, ellipseED, ellipseED2,
				ellipseSize = ()=> passBgLogo ? 120 : 80,
				edDelay = ()=> bcmaskdom.data('passBgLogo') ? 20 : 1.6;

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
		}

		// Listen keyboard hide wrapper
		let timeCount = new Date();
		$(document).keydown(function(event){
			// 192: ~
			if(event.keyCode == 192){
				if(!isBgMaskCssOk || document.activeElement.type === 'text') return;

				let timeSpace = new Date() - timeCount;

				if(!passBgKeyboard && timeSpace > 120 && timeSpace < 500){
					timeCount -= 600
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
					return
				}
				timeCount = new Date()
			}
		});

	}
//----------------------------------------------------------------

function isOnHomePage(){
	return window.location.href.indexOf('.com/s')<0 && window.location.pathname == '/' && window.location.href.indexOf('wd=')<0;
}
function isOnSearchPage(){
	return window.location.href.indexOf('.com/s')>0 && (window.location.href.indexOf('wd=')>0 || window.location.href.indexOf('word=')>0);
}

//-- Priority processing --
if(isOnSearchPage()) {
	ecchiOnSearchInit();
}

$(function(){
	//------ Run on home ------
	if(isOnHomePage())
	{
		ecchiOnHome();
		registerMenu();
		return;
	}

	//------ Run on search page ------
	if(isOnSearchPage()) {
		ecchiOnSearchInit();
		ecchiOnSearch();
		registerMenu();
		return;
	}
});

//-- Post-processing for asynchronous search page ------
const addHistoryEvent = function(type) {
	let originalMethod = history[type];
	return function() {
		let recallMethod = originalMethod.apply(this, arguments);
		let e = new Event(type);
		e.arguments = arguments;
		window.dispatchEvent(e);
		return recallMethod;
	};
};
history.pushState = addHistoryEvent('pushState');
history.replaceState = addHistoryEvent('replaceState');

const handler = function(...arg){
	let rerunInterval = setInterval(function(){
		if(isOnSearchPage()) {
			ecchiOnSearchInit();
			ecchiOnSearch();
			return;
		}
	},200);
	setTimeout(()=>clearInterval(rerunInterval),2000)
}
window.addEventListener('pushState', handler);
window.addEventListener('replaceState', handler);

})();