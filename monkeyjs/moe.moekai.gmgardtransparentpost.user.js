// ==UserScript==
// @name         绅士之庭透明界面
// @namespace    moe.moekai.gmgardtransparentpost
// @version      3.3.70
// @description  让绅士之庭的界面和文章背景半透明
// @author       YIU
// @match        http*://gmgard.com/*
// @match        http*://hggard.com/*
// @icon         https://gmgard.com/favicon.ico
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

// ====== 可以修改以下参数等号后的值(保留最后的;） ======

//主背景透明度, 可改范围0.00~1.00 , 值越小越透明
var gmtp_background_opacity = 0.68;

//主背景模糊度, 默认是0 , 推荐0~8, 值越大越模糊
var gmtp_background_blur = 0;

// ============= 可以修改的部分到此为止 =================

(function() {
	var $ = unsafeWindow.jQuery;

	$("#body").css("background-color",`rgba(255,255,255,${gmtp_background_opacity})`);
	if(gmtp_background_blur>0){$("#body").css("backdrop-filter",`blur(${gmtp_background_blur}px)`);}
	$(".categories").css("background","#ffffff99");
	$("#blog").css("background-color","#fff0");
	$("#blog .uimg").css("background","#fff9");
	$(".well").css("background-color","#f5f5f5b8");
	$("input.tagsearch").css("background-color","#f5f5f599");
	$("span[style='background-color:#000000'],span[style='background-color: #000000'],span[style='background-color:rgb(0, 0, 0)']").css("background","#000000a5");
	$("span[style='background-color:#ffffff']").css("background","#fffb");
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
	$("#multiview table").css({"background-color":"#fff6"});

	//============ < STYLE > =============================
	var strs = `<style>
pre{background-color:#f5f5f599}
.expbar{background-image:linear-gradient(to bottom,#f5f5f500,#f9f9f999)}
.progress-success .bar{background-image:linear-gradient(to bottom,#00ff004a,#00ff008c)}
.main-content .label,.main-content .badge{background-color:#9999}
.btn{background-image:linear-gradient(to bottom,transparent,transparent);background-color:#f5f5f5b0}
.btn-warning{background-image:linear-gradient(to bottom,#fbb45099,#f8940699)!important}
.btn-danger{background-image:linear-gradient(to bottom,#ee5f5bc0,#bd362fc0)!important}
.btn-inverse{background-image:linear-gradient(to bottom,#4449,#222c)}
.listview li div.badge,.hanintro .label{background-color:#2d89efbd}
.label-info[href],.badge-info[href]{background-color:#007ebda0!important}
.label-important,.badge-important{background-color:#b94a48d6!important}
.label-info,.badge-info,#createform .label-info{background-color:#3a87adb0!important}
.label-warning,.badge-warning{background-color:#f89406b0!important}
.label-success,.badge-success{background-color:#468847b0!important}
.label-inverse,.badge-inverse{background-color:#0008!important}
.lolly,.lvl{background-color:#f5ab36b0!important}
.cbadge{background-color:#FF677D!important}
.scate-1 .sactive,.scate-1 .sinde,.scate-1.sactive,.scate-1.sinde{background:#e63333}
.scate-2 .sactive,.scate-2 .sinde,.scate-2.sactive,.scate-2.sinde{background:#2f75b5}
.scate-3 .sactive,.scate-3 .sinde,.scate-3.sactive,.scate-3.sinde{background:#60f}
.scate-4 .sactive,.scate-4 .sinde,.scate-4.sactive,.scate-4.sinde{background:#70ad47}
.scate-5 .sactive,.scate-5 .sinde,.scate-5.sactive,.scate-5.sinde{background:#bf8f00}
.scate-6 .sactive,.scate-6 .sinde,.scate-6.sactive,.scate-6.sinde{background:#ff92db}
.scate-7 .sactive,.scate-7 .sinde,.scate-7.sactive,.scate-7.sinde{background:#630}
.scate-8 .sactive,.scate-8 .sinde,.scate-8.sactive,.scate-8.sinde{background:#3cf}
.scate-9 .sactive,.scate-9 .sinde,.scate-9.sactive,.scate-9.sinde{background:#d9e51e}
.listview li div.badge.info{background-color:#007ebda0}
.alert-info{background-color:#d9edf7b0}
.btn-primary{background-image:linear-gradient(to bottom,transparent,transparent)!important;background-color:#006dcc99!important}
.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary.active,.btn-primary.disabled,.btn-primary[disabled]{background-color:#04c9!important}
.btn-warning:hover,.btn-warning:focus,.btn-warning:active,.btn-warning.active,.btn-warning.disabled,.btn-warning[disabled]{background:#f89406a0!important}
.nav-pills>.active>a,.nav-pills>.active>a:hover,.nav-pills>.active>a:focus{background-color:#08ca}
.navbar .nav>.active>a, .navbar .nav>.active>a:hover, .navbar .nav>.active>a:focus{background-color:#e5e5e595}
.rankflag::before{background:linear-gradient(210deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}
.rankflag::after{background:linear-gradient(150deg,rgba(218,235,244,.4) 0,rgba(218,235,244,.4) 50%,transparent 51%,transparent 100%)}
.nav-tabs .active a,.nav-tabs .active a:hover,.nav-tabs .active a:focus,.user-comment,#multiview input[type='text'],#multiview textarea{background-color:#fffb}
.feed-item,select{background-color:#fff9}
textarea,input[type='text'],input[type='password'],input[type='datetime'],input[type='datetime-local'],input[type='date'],input[type='month'],input[type='time'],
input[type='week'],input[type='number'],input[type='email'],input[type='url'],input[type='search'],input[type='tel'],input[type='color'],.uneditable-input{background-color:#fffa}
.feed-footer{background:#f7f6f980}
.tabcontent{background-color:#fff4}
.tooltip-inner{background-color:#000b}
#flinkdiv img{opacity:.5;transition: opacity ease-in-out .5s}
#flinkdiv img:hover{opacity:.9}
#donatediv #msgmenu .active a,#donatediv .btn-warning,.expbar,.progress-success .bar{background-color:transparent}
.msglist-item:hover{background-color:#c0c0c090}
.dropdown-menu{background-color:#fffd;backdrop-filter:blur(3px)}
.nav-pills .open .dropdown-toggle{background-color:#999a}
.nav>li>a:hover,.nav>li>a:focus{background-color:#eeeb}
.post .post-title a:hover{background-color:#e6e6e6cc}
.totop{margin-left:1000px;background-repeat:no-repeat;background-position-x:0px;-webkit-transition:background-position-x ease-out .6s;transition:background-position-x ease-out .6s}
.totop-wrapper.hidden>.totop{background-position-x:-250px}
.user-bg>h2,.user-bg>.user-stats{padding:2px 10px}
.user-bg>h2,.user-bg>.user-stats,.user-bg>.user-numbers-div,.userinfo h3{background-color:#fffa;border-radius:5px}
::-webkit-scrollbar{width:10px;height:10px}
::-webkit-scrollbar-thumb{border:solid 1px #0001;border-radius:8px;box-shadow:0 0 6px 2px #fff8;background-color:rgba(153,153,153,.5)}
::-webkit-scrollbar-thumb:hover{background-color:rgba(100,100,100,.5);border-color:#0004}
::-webkit-scrollbar-thumb:active{background-color:rgba(50,50,50,.5);border-color:#0006}
::-webkit-scrollbar-track{border-radius:8px;-webkit-box-shadow:inset 0 0 4px rgba(0,0,0,.3);background-color:#fff8}
::-webkit-scrollbar-track:hover{background-color:#fffa}
::-webkit-scrollbar-track:active{background-color:#fffd}
::-webkit-scrollbar-corner{display:block}
::-webkit-scrollbar-button{border-radius:8px;background-color:#fff8}
::-webkit-scrollbar-button:start:increment,::-webkit-scrollbar-button:end:decrement{visibility:hidden}
::-webkit-scrollbar-button:start,::-webkit-scrollbar-button:end{width:10px;height:10px;border-width:5px;border-style:solid}
::-webkit-scrollbar-button:start{border-color:transparent transparent rgba(0,0,0,.3) transparent}
::-webkit-scrollbar-button:start:hover{border-color:transparent transparent rgba(0,0,0,.5) transparent;background-color:#fffa}
::-webkit-scrollbar-button:start:active{border-color:transparent transparent rgba(0,0,0,.8) transparent;background-color:#fffd}
::-webkit-scrollbar-button:end{border-color:rgba(0,0,0,.3) transparent transparent transparent}
::-webkit-scrollbar-button:end:hover{border-color:rgba(0,0,0,.5) transparent transparent transparent;background-color:#fffa}
::-webkit-scrollbar-button:end:active{border-color:rgba(0,0,0,.8) transparent transparent transparent;background-color:#fffd}
</style>`;
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
	$("#main .content-wrapper").on("DOMSubtreeModified",function(e){
		var bg_set = $(".bubble").css("background");
		if(bg_set && bg_set.indexOf('0.')<1){
			$(".bubble").css("background","#ffffff90");
			$(".btn-info").css({"background":"transparent linear-gradient(to bottom,#5bc0dea0,#2f96b480)"});
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
		//-- home-list --
		bg_set = $(".home-list").css("background-color");
		if(bg_set && bg_set.indexOf("0.")<1) {$(".home-list").css("background-color","#f7f7de50");}
		//-- history bg --
		bg_set = $("#main").css("background");
		if($("#calendar").length > 0 && bg_set && bg_set.indexOf("0.")<1) {$("#main").css("background","linear-gradient(135deg,#cebe29aa 0,#9b1f50aa 33%,#2989d8aa 71%,#89b4ffaa 91%)");}
	});

	//----- edit tag ----
	$("#edit-tag").on("DOMSubtreeModified",function(){
		var bg_taginfo = $(".tag-info").css("background");
		if(bg_taginfo && bg_taginfo.indexOf('0.')<1){
			$("#tag-input").css("background-color","#fffc");
			$(".tag-info").css("background","#f3f3f3a0");
		}
		$(".tm-tag-info").css({"color":"#4594b5","background-color":"#c5eefaa0"});
		$(".tm-tag").not(".tm-tag-info").css({"color":"#368000","background-color":"#b1ff6b80"});
	});

	//---- comment edit box ----
	$("#AddReplyForm").on("DOMSubtreeModified",function(){
		var bg_cke_inner = $(".cke_inner").css("background");
		if(bg_cke_inner && bg_cke_inner.indexOf("0.")<1){
			$(".cke_toolgroup").css("background","transparent");
			$(".cke_top,.cke_bottom").css({"background":"transparent linear-gradient(rgba(229,245,250,.3), rgba(1,158,213,.3))"});
			$(".cke_inner").css({"background":"transparent linear-gradient(to right, rgba(255,255,255,.5),rgba(255,255,255,.5),rgba(255,255,255,.5),rgba(255,255,255,1),rgba(255,255,255,1))"});
		}
	});

	//---- Message center table ----
	$(".tabcontent").on("DOMSubtreeModified",function(){
		var bg_table = $("#multiview table").css("background-color");
		if(bg_table && bg_table.indexOf("0.")<1){
			$("#multiview table").css("background-color","#fff6");
		}
	});

	//---- New post create edit box ----
	$("#createform tbody").on("DOMSubtreeModified",function(){
		var bg_cke_wysiwyg = $(".cke_wysiwyg_frame").css("background");
		if(bg_cke_wysiwyg && bg_cke_wysiwyg.indexOf("0)")<1){
			$(".cke_wysiwyg_frame,.cke_wysiwyg_div").css("background","transparent");
		}

		var bg_cke_inner = $(".cke_inner").css("background");
		if(bg_cke_inner && bg_cke_inner.indexOf("0.")<1){
			$(".cke_toolgroup,.cke_combo_button").css("background","transparent linear-gradient(to bottom,#fff9,#e4e4e444)");
			$(".cke_top,.cke_bottom").css({"background":"transparent linear-gradient(to bottom,#f5f5f555,#cfd1cf8c)"});
			$(".cke_inner").css({"background":"#fffc"});
		}

		//-- maximize button set style --
		if($(".cke_button__maximize").length > 0){
			$(".cke_button__maximize").click(function(){
				if($(this).text().indexOf("全屏")>0){
					$("header").css('visibility','visible');
				}else{
					$("header").css('visibility','hidden');
				}
			});
		}
	});

})();