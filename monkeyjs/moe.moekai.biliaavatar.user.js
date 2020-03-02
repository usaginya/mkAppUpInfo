// ==UserScript==
// @name         bilibili动态头像
// @namespace    moe.moekai.biliaavatar
// @version      0.1
// @description  可以上传APNG动画图片作为bilibili的个人头像
// @author       YIU
// @match        *://account.bilibili.com/account/face/upload
// @icon         https://www.bilibili.com/favicon.ico
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function(){

	var $ = unsafeWindow.$;

	var biliAAvatar = function(){
		return{
			dataURLtoBlob: function(t) {
				for(var i = t.split(','), e = i[0].match(/:(.*?);/)[1], a = atob(i[1]), o = a.length, s = new Uint8Array(o); o--;){
					s[o] = a.charCodeAt(o);
				}
				return new Blob([s],{
					type: e
				})
			},
			getBiliJct: function(){
				var name = 'bili_jct=';
				var ca = document.cookie.split(';');
				for(var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) == 0) {
						return c.substring(name.length, c.length);
					}
				}
				return '';
			},
			uploadAvatar: function(){

				if($('#clip_src_img').length<1 || $('#clip_src_img')[0].src.length<5){
					alert("bilibili动态头像：请先选择一个要上传的头像");
					return;
				}
				var avatarUri = $('#clip_src_img')[0].src;
				if(avatarUri.indexOf('png;')<0){
					alert("bilibili动态头像：头像只支持APNG、PNG格式");
					return;
				}
				var avatarDat = this.dataURLtoBlob(avatarUri);
				if(avatarDat.size>2097150){
					alert("bilibili动态头像：头像图片需小于2MB");
					return;
				}
				var i = new FormData;
				i.append("dopost", "save");
				i.append("DisplayRank", "10000");
				i.append("face", avatarDat);
				$.ajax({
					url: "//api.bilibili.com/x/member/web/face/update?csrf="+this.getBiliJct(),
					type: "post",
					xhrFields: {
						withCredentials: true
					},
					data: i,
					contentType: false,
					processData: false,
					success: function(data){
						alert("bilibili动态头像：更新成功");
						window.location.href = "http://account.bilibili.com/site/face.html"
					},
					error: function(){
						alert('bilibili动态头像：上传失败');
					}
				});
			}
		}
	};

	setTimeout(function(){
		if($('input[type=button]').length>0){
			var btn = $('input[type=button]:first').clone();
			btn.attr('id','biliaa');
			btn.css('margin-left','30px');
			btn.val('更新动画头像');
			btn.click(function(){
				if($(this).hasClass('disabled')){ return; }
				biliAAvatar().uploadAvatar();
			});
			$('input[type=button]:first').after(btn);

			$('#clip_src_img:first').on('DOMSubtreeModified',function(){
				$('#biliaa').removeClass('disabled');
				$(this).off('DOMSubtreeModified');
			});
		}
	},998)
})();