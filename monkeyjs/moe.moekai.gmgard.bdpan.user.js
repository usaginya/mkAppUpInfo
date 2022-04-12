// ==UserScript==
// @name         绅士の庭度盘链接提取码补全
// @namespace    moe.moekai.gmgard.bdpan
// @version      1.6
// @description  将提取码补到度盘链接后面,配合网盘自动填写密码脚本使用
// @author       YIU
// @match        http*://gmgard.com/*
// @match        http*://hggard.com/*
// @match        http*://gmgard.moe/*
// @icon         https://hggard.com/favicon.ico
// @grant        unsafeWindow
// ==/UserScript==

(function() {
	let $ = unsafeWindow.jQuery;
	let codesv = 0;

	//取提取码
	function getcode(){
		let getval;
		let reg = /^\s*[a-z\d]{4}\s*$|^\s*[^\x00-\xff]{1}[a-z\d]{2}\s*$|^\s*[a-z\d]{2}[^\x00-\xff]{1}\s*$|^\s*[a-z\d]{1}[^\x00-\xff]{1}[a-z\d]{1}\s*$/gi;
		let codes = [];
		$('.label-inverse').each(function(){
			getval = $(this).text();
			if(getval.match(reg)) codesv = codes.push(getval);
		});
		return codes;
	}


	let code = getcode();
	if(code !== undefined && codesv > 0)
	{
		$('#dllist a').mouseenter();

		let i = 0;
		$('#dllist a').each(function(){
			let panurl = $(this)[0].href.indexOf("n.baidu");
			if(panurl > 0)
			{
				i = i<codesv ? i : i-1;
				$(this).attr("href",$(this)[0].href + '#' + code[i]);
				i++;
				//o = this;
			}
		});
	}

})();
