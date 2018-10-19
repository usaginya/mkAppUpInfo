// ==UserScript==
// @name         115网盘显示文件SHA1
// @namespace    com.115wangpan.showsha1
// @version      0.2
// @description  标题意思
// @author       YIU
// @match        http*://115.com/*ct=file*
// @grant        unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.$;

//允许重新显示标识
var canDisplay = 0;

function displaySha1(){

	if(canDisplay > 0)
	{

		//在文件列表iframe内，只取非文件夹类型，并且含有sha1属性的DOM
		$('.list-contents li[file_type!="0"][sha1]',$('iframe[rel="wangpan"]')[0]).each(function(){
			var vsha1 = $(this).attr('sha1');
			$(this).children('.file-detail').append('<span gmflag>SHA1: ' + vsha1 + '</span>');
		});

		//禁止重新显示
		canDisplay = 0;

	}

}

//绑定函数处理方法
function bindfun(e){

	//等待重新显示
	if(canDisplay < 1)
	{
		canDisplay++;

		setTimeout(function(){

			if($('.list-contents li[file_type!="0"][sha1] span:not([gmflag])',e.target).parents('li').length > 0)
			{
				displaySha1();
			}

			canDisplay = 0;

		},800);
	}

}


(function(){

	//绑定文件列表变化事件
	var bind_list = $('#js_data_list',$('iframe[rel="wangpan"]')[0]).on("DOMSubtreeModified",function(e){
		bindfun(e);
	});

	//绑定文件夹点击事件
	$('.list-contents li[file_type="0"]',$('iframe[rel="wangpan"]')[0]).on("click",function(e){
		canDisplay = 0;
		bindfun($(e.target).parents('#js_data_list')[0]);
	});

})();
