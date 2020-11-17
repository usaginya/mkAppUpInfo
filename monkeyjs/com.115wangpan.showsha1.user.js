// ==UserScript==
// @name         115网盘显示文件SHA1
// @namespace    com.115wangpan.showsha1
// @version      0.7
// @description  标题意思
// @author       YIU
// @match        http*://115.com/*ct=file*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

var $ = unsafeWindow.$;


//* 显示SHA1(要显示的元素,列表类型[0列表型,1图标型])
function displaySha1(dom, listType){
	//由事件传入的dom元素可能是任何标签,只对含有sha1的文件元素显示sha1
	if(dom.hasAttribute('sha1'))
	{
		var sha1 = $(dom).attr('sha1');
		if(listType){
			//图标型、无法直接显示、只能在提示中显示
			if($(dom).find('em[gmflagsha1]').length > 0){
				$(dom).find('em[gmflagsha1]').remove();
				$(dom).find('em').css('padding-top','');
				$(dom).find('.file-name').css('height','');
				$(dom).find('.file-name').css('position','');
			}
			if(dom.title.indexOf('\r')<1){
				var title = `\r\n${sha1}`;
				dom.title += title;
				$(dom).find('.file-name .name')[0].title += title;
			}
		}
		else if(listType < 1 && $(dom).find('em[gmflagsha1]').length < 1){
			//列表型
			$(dom).find('.file-name').css('position','initial');
			$(dom).find('.file-name').css('height','50px');
			$(dom).find('em').css('padding-top','6px');
			$(dom).find('.file-name').append(
				`<em gmflagsha1 style="position:absolute;padding-top:25px;color:#1a273466;font-size: x-small">${sha1}</em>`
			);
		}
	}
}

//* 绑定事件处理过程(事件对象,事件数值参数)
function EventProcess(e,i){
	//处理前解除绑定事件防止处理过程事件死循环
	unbindEvents();

	displaySha1(e.target,i);

	//重新绑定事件
	bindEvents();
}

//* 绑定事件
function bindEvents(){
	//先解除之前绑定的事件
	unbindEvents();

	//文件列表变化
	$('#js_data_list').on("DOMSubtreeModified",function(e){
		EventProcess(e, $('#js_data_list').find('.list-thumb').length);
	});
}

//* 解除绑定事件
function unbindEvents(){
	$('#js_data_list').off("DOMSubtreeModified");
	$('.list-contents li[file_type="0"]').off("click");
}

//* 执行开始
(function(){
	//绑定事件
	bindEvents();
})();