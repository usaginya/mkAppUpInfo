// ==UserScript==
// @name         绅士の庭度盘链接提取码补全
// @namespace    moe.moekai.gmgard.bdpan
// @version      1.2
// @description  将提取码补到度盘链接后面,配合网盘自动填写密码脚本使用
// @author       YIU
// @match        *://gmgard.com/gm*
// @icon         http://gmgard.com/favicon.ico
// @grant        unsafeWindow
// ==/UserScript==

(function() {
	var codesv = 0;

	//取提取码
	function getcode(){
		var getval;
		var reg = /^[^\x00-\xff][a-z\d]$|^[a-z\d][^\x00-\xff]$|^[a-z\d]{4}$/g;
		var codes = [];
		$('.label-inverse').each(function(){
			getval = $(this).text();
			if(getval.match(reg)) codesv = codes.push(getval);
		});
		return codes;
	}


	var code = getcode();
	if(code !== undefined && code.length > 0)
	{
		var i = 0;
		$('#dllist a').each(function(){
			$(this).focus();
			var panurl = $(this)[0].href.indexOf("pan.baidu");
			if(panurl > 0)
			{
				setTimeout(function(){},800);
				i = i<codesv ? i : i-1;
				$(this).attr("href",$(this)[0].href + '#' + code[i]);
				i++;
			}
		});
	}

})();
