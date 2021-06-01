// ==UserScript==
// @name         度娘搜索萌化ecchi
// @namespace    https://cdn.jsdelivr.net/gh/usaginya/mkAppUpInfo@master/monkeyjs/moe.moekai.moebaidu.ecchi.user.js
// @version      1.5
// @description  萌化度娘搜索18+限制级
// @author       YIU
// @icon         https://www.baidu.com/favicon.ico
// @match        *://www.baidu.com/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      moest.top
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
	#result_logo .index-logo-src{display:block!important}
	#result_logo .index-logo-srcnew,#result_logo .index-logo-peak{display:none!important}
	#wrapper.hideWrapper{transition-duration:1s}
	#head,#wrapper #s_tab{background:#fff2!important;backdrop-filter:blur(3px);transition-duration:.3s}
	#head:hover,#wrapper #s_tab:hover{background:#fff6!important;transition-duration:.3s}
	#con-at .result-op{width:80%!important;border-radius:16px!important}
	[class*="bac-box_"]{background:#fff0!important}
	[class*="bac-img_"]{opacity:.7!important}
	[class^="view-right_"]{right:6%!important}
	.view-bac_PurEx{padding-right:12px!important}
	.c-container{width:100%!important}
	.dropdown-menu{position: fixed!important;left:auto!important;top:auto!important;width:auto!important;}
	#s_tab .cur-tab,#s_tab .s-tab-item:hover,#u>a{color:#222!important}
	#s_tab .cur-tab:before,#s_tab a,#s_tab b,#s_tab .s-tab-item:hover:before{color:#626675!important}
	#s_tab a,#s_tab b{text-align:center!important}
	#s_tab .cur-tab:after{background:#0095ff!important}#u>a:hover{color:#0095ff!important}#s_tab b{border-bottom:#0095ff!important}
	.s-tab-item{position:relative;transition:.2s all ease-in-out}
	.s-tab-item:after,#wrapper #content_left .op-soft-title a:after,#wrapper #content_left .result h3 a:after,
	#wrapper #content_left .result-op h3 a:after{content: '';position:absolute;left:100%;width:0;height:100%;border-bottom:2px solid #5cf;transition:.2s all ease-in-out}
	.s-tab-item:hover:after,#wrapper #content_left .op-soft-title a:hover:after,#wrapper #content_left .result h3 a:hover:after,
	#wrapper #content_left .result-op h3 a:hover:after{width:100%;left:0;transition-delay:.1s}
	.s-tab-item:hover~.s-tab-item:after{left:0}
	#s_tab .s-tab-item:before{color:#c0c2c8!important}
	#su{background-color:#4ea6f2aa!important;transition-duration:.2s}#su:hover{background-color:#4e88f2ee!important;transition-duration:.2s}
	.iptfocus.s_ipt_wr,#form .bdsug-new{border-color: #4e71f2bb!important;transition-duration:.2s}
	.sam_newgrid~#page a,.c-tabs-nav .c-tabs-nav-selected,.c-tabs-nav,.c-tabs-item,.c-input{background:#fff8!important}
	.selected-search-box,.bdpfmenu,.usermenu{background:#fff8!important;backdrop-filter:blur(3px)}
	#u .bdpfmenu a:hover,#u .usermenu a:hover,.bdsug{background-color:#fffe!important;transition-duration:.3s}
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
	#content_right{opacity:.5;transition-duration:1s}#content_right:hover{opacity:1;transition-duration:.5s}
	#foot,.sam_newgrid~#page{background-color:#f5f5f666!important}
	#foot #help,.c-tip-con .c-tip-menu li a,.bdpfmenu a:link,.bdpfmenu a:visited,#u .usermenu a:link,#u .usermenu a:visited,#wrapper #rs .tt,
	#wrapper #content_left .result[tpl='soft'] .op-soft-title,#wrapper #content_left .result h3,#wrapper #content_left .c-container h3,
	.op_express_delivery_hidemore,.op_express_delivery_showmore,#wrapper #content_left .c-container
	.ms-measures-content .op-unit-tabs-nav-container,.ms-measures-content .tabs-nav{background-color:#fff0!important}
	.c-tip-con .c-tip-menu li a:hover{background-color:#ccc6!important;transition-duration:.3s}
	.c-tip-con,#c-tip-custom-calenderCont,#c-tip-custom-calenderCont .op_cal{background:#fffb!important;backdrop-filter:blur(3px)}
	.soutu-hover-tip,.soutu-env-new .soutu-layer .soutu-state-normal,.soutu-env-new .soutu-layer .soutu-error,.soutu-env-new .soutu-layer .soutu-waiting{background:#fffd}
	.sam_newgrid~#page strong,.sam_newgrid~#page a:hover,
	.sam_newgrid~#page a:hover .pc,.sam_newgrid~#page .n:hover{background:#0089ffab!important;color:#fff!important}
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
	[tpl^=right_game_recommend]{display:none}
	.op-qr{top:-100px!important;left:auto!important}
	</style>`;

	let rippleCss = `<style>
	.legitRipple{position:relative;overflow:hidden;user-select:auto}
	.legitRipple-ripple{position:absolute;z-index:0;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);
	pointer-events:none;border-radius:50%;background:#fff4;will-change:transform,width,opacity;
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

	//------------------------------------ JS Run -------------------------------------------
	if(window.location.href.indexOf('.com/s')<0)
	{
		$('head').append(st);
		return;
	}

	//------ Search Page ------
	if(window.location.href.indexOf('.com/s')>0) {

		$('head')
			.append(ru)
			.append(rippleCss);

		$('meta[name="referrer"]').attr('content','no-referrer');

		//get random background url
		let isBgMaskCssOk;
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://rimg.moest.top',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				'token': '0191f2696816cf0b4cf88c6ab4e1e6103f71d938'
			},
			onload: function(response){
				let arrbgurl = $.parseJSON(response.responseText);
				if(arrbgurl && arrbgurl.length < 2) return;

				bgImageCss = bgImageCss.replace('#url', `url(${arrbgurl[0]})`);
				bgCircleMaskSurface = '.bgCircleMaskSurface' + bgCircleMaskInside.replace('#url', `url(${arrbgurl[1]})`);
				bgCircleMaskInside = bgCircleMaskSurface.replace('Surface','Inside').replace(/#ffffffc6/ig, '#fff0');
				$('head').append(`<style>${bgImageCss}${bgCircleMaskSurface}${bgCircleMaskInside}</style>`);

				//imgload
				let imgPerfect = new Image();
				imgPerfect.src = arrbgurl[1];

				isBgMaskCssOk = 1;
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
			if(!bgAnime) return;
			cancelAnimationFrame(bgAnime);
			bgAnime = null;
		};

		function startBgAni(show){
			bgAlpha += show ? -.02 : .02;
			bgAlpha = bgAlpha < 0 ? 0 : (bgAlpha > .8 ? .8 : bgAlpha);

			let newcss = $('body').css('background-image').replace(/255, 255, 255, (\d+\.\d+|\d)/ig, `255, 255, 255, ${bgAlpha}`);
			$('body').attr('style',`background-image:${newcss}!important`);

			if( bgAlpha <= 0 || bgAlpha >= .8){
				stopBgAni();
				return;
			}

			bgAnime = requestAnimationFrame(()=>{startBgAni(show)});
		};

		function bgShow(){
			stopBgAni();
			startBgAni(1);
			$('#wrapper').css('opacity','0');
		};

		function bgHide(){
			stopBgAni();
			startBgAni(0);
			$('#wrapper').css('opacity','1');
		};

		$('#wrapper').addClass('hideWrapper');
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
		function getRandom(min,max){
			return Math.floor(Math.random()*(max+1-min)+min)
		}
		function ReAddRipples(){
			$.ripple.destroy();
			$.ripple({
				'.result,.result-op':{
					dragging: 0,
					allowDragging: 1,
					callback: ($container,$ripple)=>{
						if($ripple.hasSetColor) return;
						$ripple.hasSetColor = 1;
						$ripple.css('background',`rgba(${getRandom(180,255)},${getRandom(180,255)},${getRandom(180,255)},.26)`);
					}}
			});
		};

		//Add ripples on start
		setTimeout(()=>ReAddRipples(),500);

		let interval_addrip;
		$('#content_left').on('DOMNodeInserted',(e)=>{
			if(interval_addrip) return;

			interval_addrip = setTimeout(()=>{
				if(e.target.className.indexOf('ripple') > -1){
					interval_addrip = null;
					return;
				}
				ReAddRipples();
				interval_addrip = null;
			},500);
		});

		//Create mask bg
		let bcmaskdom, ellipseOp, ellipseED, ellipseED2,
			ellipseSize = ()=> passBgLogo ? 150 : 80,
			edDelay = ()=> bcmaskdom.data('passBgLogo') ? 3.6 : 1.6;

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

		return;
	}

})(unsafeWindow.jQuery);