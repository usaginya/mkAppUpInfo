// ==UserScript==
// @name         百度样式萌化
// @namespace    https://github.com/usaginya/mkAppUpInfo/raw/master/monkeyjs/moe.moekai.moebaidu.user.js
// @version      1.3
// @description  萌化度娘搜索
// @author       YIU
// @icon         https://www.baidu.com/favicon.ico
// @match        *://www.baidu.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/matthias-vogt/legitRipple.js@gh-pages/js/ripple.js
// ==/UserScript==

(function($){
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
	#result_logo{opacity:.6}
	body{background:linear-gradient(#fffc,#fffc),url(https://random.52ecy.cn/randbg.php) center center / cover no-repeat fixed!important;
	background-attachment:fixed!important;background-repeat:no-repeat;background-position:center center}
	#head,#wrapper #s_tab{background:#fff2!important;backdrop-filter:blur(3px);transition-duration:.3s}
	#head:hover,#wrapper #s_tab:hover{background:#fff6!important;transition-duration:.3s}
	#su{background-color:#4ea6f2aa!important;transition-duration:.2s}#su:hover{background-color:#4e88f2ee!important;transition-duration:.2s}
	.wrapper_new .iptfocus.s_ipt_wr,.wrapper_new #form .bdsug-new{border-color: #4e71f2bb!important;transition-duration:.2s}
	.wrapper_new .sam_newgrid~#page a,.c-tabs-nav .c-tabs-nav-selected,.c-tabs-nav,.c-tabs-item,.c-input{background:#fff8!important}
	.selected-search-box,.bdpfmenu,.usermenu{background:#fff8!important;backdrop-filter:blur(3px)}
	.wrapper_new #u .bdpfmenu a:hover,.wrapper_new #u .usermenu a:hover,.bdsug{background-color:#fffe!important;transition-duration:.3s}
	.wrapper_new #s_tab{padding-top:72px!important}
	.wrapper_new .s_ipt_wr{background:#fff7!important;transition-duration:.3s}
	.wrapper_new .s_ipt_wr:hover{background:#fffa!important;transition-duration:.3s}
	#container.sam_newgrid .c-container .t a,#container.sam_newgrid .c-container .c-title a{text-decoration:none!important}
	#container.sam_newgrid .c-container .t a:hover{text-decoration:underline!important}
	#container.sam_newgrid .c-container .c-title a:hover{text-decoration:underline!important}
	#container.sam_newgrid #content_left .result-op,#container.sam_newgrid #content_left .result,
	#rs,.video_list{margin-bottom:8px!important;background:#fff8!important;border-radius:8px!important;padding:10px!important;transition-duration:.5s}
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
	.op_new_cal_screen,[data-pmd] .c-container,.col-header .col-overview{background-color:#fff2!important}
	.c-tabs-item .c-btn:hover{background:#ccc6!important}
	.col-header-wrap::before{background:-webkit-linear-gradient(150deg,#00d3ea6b,#00cfa3b0)!important;background:linear-gradient(-60deg,#00d3ea6b,#00cfa3b0)!important}
	.sp-separator{width:100%;background-color:#fffa!important;backdrop-filter:blur(6px);transition-duration:.3s}
	.sp-separator:hover{transition-duration:.3s}
	::-webkit-scrollbar{width:.16rem;height:.17rem}
	::-webkit-scrollbar-track-piece:vertical{background:#fff;box-shadow:inset 8px 0 8px #d3dbe0, inset -2px 0 8px #f5f5f5}
	::-webkit-scrollbar-track-piece:horizontal{background:#fff;box-shadow:inset 0 8px 8px #d3dbe0, inset 0 -2px 8px #f5f5f5}
	::-webkit-scrollbar-thumb{border-radius:.1rem}
	::-webkit-scrollbar-thumb:vertical{background:linear-gradient(92deg,#fcffff,#ccd2d8);box-shadow:5px 7px 10px #959ca5, 5px -7px 10px #c8d0da}
    ::-webkit-scrollbar-thumb:horizontal{background:linear-gradient(180deg,#fcfdff,#ccd2d8);box-shadow:5px 7px 10px #959ca5, -5px 7px 10px #959ca5}
	</style>`;

	let mouseAcrylic = `<style>
	.gm-mouse-acrylic{z-index:-1;width:50px;height:50px;position: fixed;
	background-color:#fff0;backdrop-filter:blur(5px);pointer-events:none;border-radius:100%;
	</style>`;

	let rippleCss = `<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/matthias-vogt/legitRipple.js@gh-pages/css/ripple.css">
	<style>
	.legitRipple{user-select:auto!important}
	.legitRipple-ripple{background:#ffebea22;backdrop-filter:blur(5px);z-index:-2!important}
	</style>`;

	//------------------------------------ JS Run -------------------------------------------
	if(window.location.href.indexOf('.com/s')<0)
	{
		$("body").append(st);
		return;
	}

	if(window.location.href.indexOf('.com/s')>0) {

		$("body").append(ru)
			.append(rippleCss)
			.append(mouseAcrylic)
			.append($('<div class="gm-mouse-acrylic"></div>'));

		//set mouse acrylic move
		let acrylic = document.querySelector('.gm-mouse-acrylic');
		document.addEventListener("mousemove",function(e){
			let x = e.x;
			let y = e.y;
			acrylic.style.left = x-25+'px';
			acrylic.style.top = y-25+'px';
		});

		//show background
		let logodom = $('#result_logo');
		if(logodom.length<1){return;}
		let bgtimein,bgtimeout,bgalpha = 0.8;

		logodom.hover(()=>{
			if($('#kw').is(":focus")){
				return;
			}
			$('#wrapper').fadeTo(1200,0);

			bgtimein = setInterval(()=>{
				bgalpha -= 0.01
				if(bgalpha<0.01){
					clearInterval(bgtimein);
					bgtimein = null;
					bgalpha = 0;
				}
				let newcss = $('body').css('background').replace(/255, 255, 255, (\d+\.\d+|\d)/ig, `255, 255, 255, ${bgalpha}`);
				$('body').css('cssText',`background:${newcss}!important`);
			},15);

		},()=>{
			if($('#kw').is(":focus")){
				return;
			}
			$('#wrapper').stop(true);
			$('#wrapper').fadeTo("slow",1);

			if(bgtimein){
				clearInterval(bgtimein);
				bgtimein=null;
			}

			if(bgtimeout){
				clearInterval(bgtimeout);
			}

			bgtimeout = setInterval(()=>{
				bgalpha += 0.01
				if(bgalpha>0.79){
					clearInterval(bgtimeout);
					bgtimeout = null;
					bgalpha=0.8;
				}
				let newcss = $('body').css('background').replace(/255, 255, 255, (\d+\.\d+|\d)/ig, `255, 255, 255, ${bgalpha}`);
				$('body').css('cssText',`background:${newcss}!important`);
			},15);
		});

		//remove garbage
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

		//Add ripples
		function getRandom(min,max){
			return Math.floor(Math.random()*(max+1-min)+min)
		}
		function ReAddRipples(){
			$.ripple.destroy();
			$('.result,.result-op').ripple({ dragging:0, allowDragging:1,callback:($container,$ripple)=>{
				$ripple.css('background',`rgba(${getRandom(200,255)},${getRandom(200,255)},${getRandom(200,255)},.2)`);
			}});
		};

		//Add ripples
		setTimeout(()=>{
			ReAddRipples();
		},500);

		let interval_addrip;
		$('#content_left').on('DOMNodeInserted',(e)=>{
			if(interval_addrip){
				return;
			}

			interval_addrip = setTimeout(()=>{
				if(e.target.className.indexOf('ripple') > -1){
					interval_addrip = null;
					return;
				}
				ReAddRipples();
				interval_addrip = null;
			},500);
		});

		return;
	}

})(window.jQuery);