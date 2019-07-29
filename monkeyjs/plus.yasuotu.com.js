// ==UserScript==
// @name         压缩图-功能提升
// @namespace    www.yasuotu.com
// @version      190729.0.2
// @description  免会员下载原图,提升图片上传数量/大小限制
// @author       YIU
// @match        https://www.yasuotu.com/*
// @require      https://www.yasuotu.com/yasuotu/lib/jquery/1.9.1/jquery.min.js
// @grant        unsafeWindow
// @run-at       document-start
// @icon         https://www.yasuotu.com/favicon.ico
// ==/UserScript==

unsafeWindow.Object.freeze = null;

(function() {

	document.addEventListener('DOMContentLoaded', function (event) {
		try {
			unsafeWindow.uid = 1;
			unsafeWindow.vip = 100;
			unsafeWindow.webuploader.param.num = 60;
			unsafeWindow.webuploader.param.upload_size = 92428800;

		} catch (error) {
			console.error(error);
		}
	}, true);

	//page loaded
	$(document).ready(function(){
		setTimeout(()=>{
			if($('.layui-elem-quote')[0]){
				$('.layui-elem-quote').html($('.layui-elem-quote').html().replace('50M','90M'));
			}
			if($('.user-cz font')[0]){
				$('.user-cz font').html($('.user-cz font').html().replace('普通','脚本'));
			}
			BindSaveBtn();
		},500);
	});

	function BindSaveBtn(){
		if($('.filelist').length>0){
			$('.filelist').on("DOMSubtreeModified",()=>{

				if($('.btn-dowload').length>0){
					$('.filelist').off("DOMSubtreeModified");

					$('.filelist .btn-dowload').each((i,o)=>{

						$(o).removeAttr('onclick');
						$(o).attr('href', $(o).attr('url'));

					});

					BindSaveBtn();
				}

			});
		}
	}


})();