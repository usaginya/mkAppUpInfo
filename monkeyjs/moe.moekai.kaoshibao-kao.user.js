// ==UserScript==
// @name         考试宝-溢烟丁真鉴定为：烤
// @namespace    https://www.kaoshibao.com/
// @version      2023.6.10.6
// @description  轻轻敲醒厨圣的心灵
// @author       YIU
// @match        http*://www.kaoshibao.com/k*
// @match        http*://www.kaoshibao.com/online/paper*
// @match        http*://www.kaoshibao.com/mnks/simulation*
// @match        http*://www.zaixiankaoshi.com/k*
// @match        http*://www.zaixiankaoshi.com/online/paper*
// @match        http*://www.zaixiankaoshi.com/mnks/simulation*
// @icon         https://resource.zaixiankaoshi.com/pc/favicon.ico
// @run-at       document-start
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {

	//+++++++++++++++++++++++ 全局量 +++++++++++++++++++++++++++++++++++++++++
	// 已获取的答案列表
	let answerList;

	// 上次回答题目编号
	let beforeQusetionNumber = 0;

	// 考试DOM区域
	let examDom;

	// 显示答案区域
	let answerShowDom;

	// 答题状态 1正在答题
	let answerState;

	// 重答次数计算
	let answerAgainCount;

	// 错题索引组
	let wrongAnswerIds;

	// 要答错的题数
	let wrongAnswerCount;

	// 自动切题模式
	let isAutoNext;

	// 答案数据类型 默认:练习型(数组) 1:考试型(对象组)
	let answerDataType;

	// 脚本设置菜单id - 初始化
	let gmMenuIdInit;

	// 脚本设置菜单id - 强制停止
	let gmMenuIdForceStop;

	// 选项索引表
	const mapAnswerOption = {
		'A': 0, 'B': 1, 'C': 2,
		'D': 3, 'E': 4, 'F': 5,
		'G': 6, 'H': 7, 'I': 8,
		'J': 9, 'K': 10, 'L': 11
	};
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	//------------------- 附加样式 --------------------------------
	const myStyle = `@font-face {
    font-family: 'yydz-jdwk-zihun250';
    src: url('data:font/ttf;charset=utf-8;base64,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Ax4FAwQEFQcBAgYFBAYDBAQCBQcBAgsVGh4GAwUEBQcCAQIEBAgKAgcCCQMCBwMfEBUPHSgPBQIDAgEFEwUBDAMnDw8HAhoZBQYcCgcEAwEJBAUCAwMFAwICARENHAgFCgEDBAMFCAMBAggOIQoBFQsEBgcRBBEMBAQHCAcWEgwODAECHA0GBgQCAgcEFQMLCAMCAf5iEwQDAgEGBQQCBAMCAQEBAgICAgMDBQYDAQIBAQECBAMCBAQCAQIBAQEBAQcBAQIDAwMBAQICAwIEBQEBAQEBAgIEAgICAQECBQEDBQEHBwcFAgUDCAcDAgMEBQUHAwMEBQgFAgEDAgEDBQIBAgIOBgIJBQIEBgIBAQUFBAcCBwMCAQEFBQMCAwEFAwQEAQcFBgIBBQQKAQMGBQkPAgQIBREFBgIDAgUEBQUCAgIDFQYKDgoHGg8oEAkCAgEEBAIUHRQCAwEHCgkfFAoBAwQCBgUBBQMCAgECAgEBCQEDBQcMBQICAwIBAgICAwQEBQZUCgMCAwQMAwQCAgEEAgUBAgIGBwQBBAQGBwQEAQcHAQIEDAECBAMDBAMBAwUGFQMHDAECBAUGAwIIAwMEAQICAgECAgkHAYEBAgH9pAYEBAIFBgEFHiQTBgQGBgkJCAkMCQUEDwICAwECUwIC/ccFAwEBAi0EBQECBAICAQMCCQEBA/6SAQIBAgICBAICAQUCAgJdAQICAQF8AwIBBC4DAgIjAQICAQQBAQEBCAEBAQH+jgEBAXYEAgYBAQH+nwEWBAEBAQICAQECAgFvAgIBAgL+hQIDAQEEAgEDAQIBAQEDAQMBAQMBAQECAgQBAgEBAQECCwIBAQIEAwICAwMSAQMEAwgBAQQCAgMCAQMEJQICAgIC3QYDAwMJBgcFCQQfGg4IBwEDBAMDBgQEAQQFBwkLCAcIBQoGBAQDBRkJBQYHFgcBDg4bAgICAgQCAwEIBAMCAQUGAwQHAgQFCA4ICQYFCA4REAcEDAEBBQYDBAIDAwMDAwIBAgICAggDBAQDAwMCAQMEAwIBAgcIBAEEBAMHBgcDBgkMBQMMBgoOAwUDAgMCAgIDCgEEBAQDAwIBAQIDBwcBAgEEAQMBAgkBAgkFAQEBBAQCAgIBBQIGBgMCAwMGCAIDBgMCAgILAwIFBQkDAgcEAwYFAwQECgMBHQICBgEBAQEBAQEJBwEB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') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
	}
	@keyframes fire-shadow {
		0% {
		  text-shadow: 0 0 4px white, 0 -5px 4px #ff3, 2px -10px 6px #fd3,
		  -2px -15px 11px #f80, 2px -25px 18px #f20;
		}
		25% {
		  text-shadow: 0 0 4px white, 2px -7px 6px #ff3, 2px -12px 8px #fd3,
		  -3px -20px 11px #f80, 4px -30px 22px #f20;
		}
		50% {
		  text-shadow: 0 0 4px white, 2px -10px 8px #ff3, 2px -14px 10px #fd3,
		  -4px -25px 11px #f80, 4px -35px 25px #f20;
		}
		75% {
		  text-shadow: 0 0 4px white, 2px -7px 6px #ff3, 2px -12px 8px #fd3,
		  -3px -20px 11px #f80, 4px -30px 22px #f20;
		}
		100% {
		  text-shadow: 0 0 4px white, 0 -5px 4px #ff3, 2px -10px 6px #fd3,
		  -2px -15px 11px #f80, 2px -25px 18px #f20;
		}
	}
	.mk-ksb-a-mark{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #fd05;
      display: flex;
      justify-content: center;
      align-items: center;
	  z-index: 99999;
	}
	.mk-ksb-a-mark p{
	  color: #fffef6e0;
	  font-size: 200pt;
	  font-family: 'yydz-jdwk-zihun250';
      text-align: center;
      transform: translateY(-50px);
	  animation: fire-shadow 2s infinite;
	}
	.mk-ksb-answer-show-box {
	  display: flex;
	  flex-wrap: wrap;
	  gap: 8px;
	  align-items: center;
	  margin-top: 20px;
	}
    .mk-ksb-answer-show-grid {
	  flex: 1;
      width: 22%;
      min-width: 22%;
      max-width: 22%;
    }
	.mk-ksb-answer-show-grid-highlight {
	  box-shadow:
	    0 -8px 8px -5px #fa0,
		0 8px 8px -5px #fa0,
		-8px 0 8px -5px #0e3,
		8px 0 8px -5px #0e3 !important;
	}`;
	//----------------------------------------------------------


	//
	// 添加样式到页面
	// flag 字符串标志 用于避免重复添加
	//
	function addStyle(flag, style) {
		// 检查样式是否已经存在
		if (!flag || !style || document.querySelector(`style[style-flag="${flag}"]`)) {
			return;
		}
		const newStyle = document.createElement('style');
		newStyle.innerHTML = style.trim();
		newStyle.setAttribute('style-flag', flag);
		// 插入样式元素到head元素的最后
		document.head.appendChild(newStyle);
	}


	//
	// xhr hook
	//
	function addXMLRequestCallback(callback){
		if(XMLHttpRequest.callbacks) {
			// we've already overridden send() so just add the callback
			XMLHttpRequest.callbacks.push(callback);
		}else{
			// create a callback queue
			XMLHttpRequest.callbacks = [callback];
			// store the native send()
			let oldSend = XMLHttpRequest.prototype.send;
			// override the native send()
			XMLHttpRequest.prototype.send = function(){
				// process the callback queue
				// the xhr instance is passed into each callback but seems pretty useless
				// you can't tell what its destination is or call abort() without an error
				// so only really good for logging that a request has happened
				// I could be wrong, I hope so...
				// EDIT: I suppose you could override the onreadystatechange handler though
				for(let i = 0; i < XMLHttpRequest.callbacks.length; i++) {
					XMLHttpRequest.callbacks[i](this);
				}
				// call the native send()
				oldSend.apply(this, arguments);
			}
		}
	}


	//
	// 拦截题目列表请求响应
	//
	addXMLRequestCallback(function(xhr) {
		xhr.addEventListener('load', function(){
			if(xhr.readyState != 4 && xhr.status != 200){ return; }

			if((xhr.responseURL.includes('api/questions/ids') || xhr.responseURL.includes('api/examination/')) && !xhr.responseURL.includes('Count')){
				//console.log("HOOK > " + xhr.responseURL );
				//console.log(xhr.responseText);
				AnalyzeAnswerData(xhr.responseText);
			}

		});
	});


	//
	// 答案数据解析、保存题目答案到 answerList
	//
	function AnalyzeAnswerData(responseText){
		if(!responseText){ return; }

		let qJson = JSON.parse(responseText);
		let qList = qJson.data;
		answerList = [];

		if(Array.isArray(qList)){
			qList.map((qo)=>{
				let answerData = {};
				answerData.answer = qo.answer;
				answerData.qtype = qo.qtype;
				answerList.push(answerData);
			});
		}
		else if(qList.hasOwnProperty('questions_detail')) {
			answerDataType = 1;
			for (let q in qList.questions_detail) {
				let answerData = {};
				let qo = qList.questions_detail[q];
				answerData.question = qo.question;
				answerData.answer = qo.answer;
				answerData.qtype = qo.qtype;
				answerList.push(answerData);
			}
		}

		//console.log(answerList);
	}


	//
	// 交换最后两个字符
	// 如果只有一个字符则为两个重复字符
	//
	function swapLastTwoChars(str) {
		if (str.length === 1) {
			return str.toString().repeat(2);
		} else {
			const lastChar = str.charAt(str.length - 1);
			const secondLastChar = str.charAt(str.length - 2);
			const restOfString = str.slice(0, str.length - 2);
			return restOfString + lastChar + secondLastChar;
		}
	}


	//
	// 答题开始
	//
	function AnswerStart(){
		answerState = 1;
		ShowAnswerMark(1);
		answerAgainCount = 0;
		wrongAnswerIds = generateWrongAnswerIds();
		Answer();
	}


	//
	// 获取当前题目编号 失败返回 -1
	//
	function GetQuestionNumber(){
		let qNumDom = examDom.querySelector('.topic-tit span:nth-child(2)');
		if(!qNumDom || !qNumDom.innerText){ return -1; }

		let qNum = qNumDom.innerText.match(/\d+(\.\d+)?/);
		if(!qNum){ return -1; }

		let qNumInt = parseInt(qNum[0]);
		if(isNaN(qNumInt)){ return -1; }
		return qNumInt;
	}


	//
	// 获取当前题目标题
	// simplify 为 true 时截取一半题目用于后续匹配
	//
	function GetQuestionTitle(simplify){
		let qTitleDom = examDom.querySelector('.topic-tit .qusetion-box');
		if(!qTitleDom || !qTitleDom.innerHTML){ return -1; }

		let qTitle;

		if(simplify){
			qTitle = qTitleDom.innerHTML;
			qTitle = qTitle.slice(0, - parseInt(qTitle.length / 2));
			return qTitle;
		}

		//可匹配到的题目标题
		//- 题目<span
		//- &nbsp;题目<span
		//- 题目&nbsp;<span
		//- &nbsp;题目&nbsp;<span
		//- 题目\n有换行<span
		//- 题目\n有换行&nbsp;<span
		//- &nbsp;题目\n有换行<span
		//- &nbsp;题目\n有换行&nbsp;<span
		qTitle = qTitleDom.innerHTML.match(/(?:^|&nbsp;)([\s\S]*?)(?=(<br|<span|&nbsp;))/);
		return qTitle ? qTitle[0] : null;
	}


	//
	// 获取当前题目答案数据
	// { id: 答案索引, data: 答案对象 }
	//
	function GetAnswerData(){
		let answerData = {};
		let aId = -1;
		let qNumber = GetQuestionNumber();
		let qTitle = GetQuestionTitle();

		if(answerDataType == 1){
			answerData = answerList.find(data => data.question.includes(qTitle));
			//如果找不到题目则以半题模式搜索
			if(!answerData){
				qTitle = GetQuestionTitle(!0);
				answerData = answerList.find(data => data.question.includes(qTitle));
			}
			aId = answerList.indexOf(answerData);
		}
		else{
			aId = qNumber - 1;
			aId = aId < 0 ? 0 : aId;
			answerData = answerList[aId];
		}
		return {id: aId, data: answerData};
	}


	//
	// 生成错题索引
	// 返回索引组Set对象
	//
	function generateWrongAnswerIds() {
		const qCount = answerList.length;
		if(qCount < 1) return;

		// 存放分配为错误答案的索引
		const wrongIndices = new Set();

		// 随机平分全部的错题数量到问题中
		while (wrongIndices.size < wrongAnswerCount) {
			const randomIndex = Math.floor(Math.random() * qCount); // 随机选择一个索引
			if (!wrongIndices.has(randomIndex)) {
				wrongIndices.add(randomIndex); // 将该索引添加到分配为错误答案的索引集合中
			}
		}
		return wrongIndices;
	}


	//
	// 进行答题 递归
	//
	function Answer(){
		// 检查答题状态是否停止
		if(!answerState){
			return;
		}

		setTimeout(()=>{
			// 取当前题目编号
			let qNumInt = GetQuestionNumber();
			if(qNumInt < 0){
				AnswerEnd();
				console.warn('取当前题目编号失败');
				return;
			}

			// 检测是否开启自动下一题功能
			if( beforeQusetionNumber && beforeQusetionNumber != qNumInt && (qNumInt - beforeQusetionNumber > 1) ){
				isAutoNext = 1;
				AnswerPrevious();
				Answer();
				return;
			}

			// 防止重答题目 重复时切下一题
			if(beforeQusetionNumber && beforeQusetionNumber == qNumInt){
				// 重复超过 5 次则直接结束
				if(answerAgainCount > 5){
					console.warn(qNumInt, '题目重复次数超限');
					AnswerEnd();
					return;
				}
				answerAgainCount++;
				AnswerNext();
				Answer();
				return;
			}

			// 暂存当前题目编号
			beforeQusetionNumber = qNumInt;
			answerAgainCount = 0;


			// 是否为错误回答
			let isWrongAnswer;

			let answerData = GetAnswerData();
			if(answerData.data && answerData.data.answer && answerData.data.qtype){

				let examAnsDom, examAnsInputDom, examAnsSaveBtn, examAnsPostBtn, answerGroup, aIndex, examAnsInputCount, wrongAnswerOk;

				//1单选 2多选 3判断 4填空
				switch(answerData.data.qtype){
					case '1':
					case '2':
					case '3':
						examAnsDom = examDom.querySelector('[class*=options]');
						if(!examAnsDom) {
							ShowAnswer(qNumInt, answerData.data.answer);
							console.warn(qNumInt, '未找到答题选项区域');
							break;
						}

						answerGroup = answerData.data.answer.toUpperCase().split('');
						if(answerGroup.length < 1) break;

						examAnsInputCount = examAnsDom.children.length;

						answerGroup.map((aKey)=>{
							aIndex = mapAnswerOption[aKey];
							if(!aIndex && aIndex != 0) {
								ShowAnswer(qNumInt, answerData.data.answer);
								console.warn(qNumInt, '未找到答题选项索引');
								return;
							}

							// 答错题
							if(wrongAnswerCount > 0){
								isWrongAnswer = wrongAnswerIds.has(answerData.id);
								// 多个答案时如果答案总数与选项元素总数相同改变答案索引
								// 否则将每个答案往后移而最后的答案移到第一个
								// 只有一个答案时选择另一个
								if(isWrongAnswer){
									if (answerGroup.length > 1) {
										if(answerGroup.length === examAnsInputCount){
											aIndex++;
											wrongAnswerOk = !0;
										}
										else if(!wrongAnswerOk){
											aIndex++;
											aIndex = aIndex >= examAnsInputCount ? 0 : aIndex;
										}
									}
									else {
										aIndex = aIndex > 0 ? 0 : 1;
									}
								}
							}

							// 答题
							if(aIndex || aIndex == 0){
								examAnsInputDom = examAnsDom.children[aIndex];
								if(!examAnsInputDom) {
									ShowAnswer(qNumInt, answerData.data.answer);
									console.warn(qNumInt, '未找到答题选项元素');
									return;
								}

								if(!examAnsInputDom.classList.contains('right')){
									examAnsInputDom.click();
								}
							}
						});

						//如果有提交答案按钮则提交
						examAnsPostBtn = examAnsDom.nextElementSibling;
						if(examAnsPostBtn && !examAnsPostBtn.classList.contains('next-preve')){
							examAnsPostBtn = examAnsPostBtn.querySelector('button');

							for (let i = 0; i < 5; i++) {
								(function (t, qNumInt, answerData, examAnsPostBtn) {
									setTimeout(function () {

										if(!examAnsPostBtn.disabled){
											examAnsPostBtn.click();
										} else if (i > 4){
											ShowAnswer(qNumInt, answerData.data.answer);
											console.warn(qNumInt, '提交答案超时');
										}

									}, 200 * t);
								})(i, qNumInt, answerData, examAnsPostBtn);
							}
						}

						break;

					case '4': // 填空题
						examAnsDom = examDom.querySelector('[class*=custom-ans]');
						if(!examAnsDom) {
							ShowAnswer(qNumInt, answerData.data.answer);
							console.warn(qNumInt, '未找到答题输入区域');
							break;
						}

						answerGroup = answerData.data.answer.toUpperCase().split('|');
						if(answerGroup.length < 1) break;

						answerGroup.map((answer, aIndex)=>{
							if(!answer) {
								ShowAnswer(qNumInt, answerData.data.answer);
								console.warn(qNumInt, '未找到答案内容');
								return;
							}

							// 答错题
							if(wrongAnswerCount > 0){
								isWrongAnswer = wrongAnswerIds.has(answerData.id);
								if(isWrongAnswer){
									if(answerGroup.length === 1){ //只有一个答案则直接修改答案内容
										answer = swapLastTwoChars(answer);
									}
									else if(aIndex < 2){ // 多个答案时只反转前两个答案
										aIndex = aIndex < 1 ? 1 : 0;
									}
								}
							}

							examAnsInputDom = examAnsDom.children[aIndex];
							if(!examAnsInputDom) {
								ShowAnswer(qNumInt, answerData.data.answer);
								console.warn(qNumInt, '未找到答题输入元素');
								return;
							}

							if(!examAnsInputDom.__vue__.getInput().value){
								examAnsInputDom.__vue__.getInput().value = answer;
								examAnsInputDom.__vue__.getInput().dispatchEvent(new Event('input'));
							}
						});

						//点击保存答案
						examAnsSaveBtn = examAnsDom.querySelector('button');
						if(examAnsSaveBtn){
							examAnsSaveBtn.click();
						} else {
							ShowAnswer(qNumInt, answerData.data.answer);
							console.warn(qNumInt, '未找到保存答案按钮元素');
						}
						break;
				} // switch end
			} // 填写答案结束

			//下一题
			if(isAutoNext){
				if(!AnswerNextCheck()){
					AnswerEnd();
					return;
				}
			}

			if(!isAutoNext && AnswerNext() > 1){
				AnswerEnd();
				return;
			}

			// 回答下一题
			Answer();

		}, 666);
	}


	//
	// 切换上一题 失败返回0 成功返回1 无法继续上一题返回2
	//
	function AnswerPrevious(){
		let examNextPreveDom = examDom.querySelector('.next-preve');
		if (!examNextPreveDom) { return 0; }
		let examPreviousBtn = examNextPreveDom.querySelector('button');
		if (!examPreviousBtn) { return 0; }
		if (examPreviousBtn.disabled) { return 2; }
		examPreviousBtn.click();
		return 1;
	}


	//
	// 切换下一题 失败返回0 成功返回1 无法继续下一题返回2
	//
	function AnswerNext(){
		let examNextPreveDom = examDom.querySelector('.next-preve');
		if (!examNextPreveDom) { return 0; }
		let examNextBtn = examNextPreveDom.querySelector('button:nth-child(2)');
		if (!examNextBtn) { return 0; }
		if (examNextBtn.disabled) { return 2; }
		examNextBtn.click();
		return 1;
	}


	//
	// 检查下一题按钮是否可用 不可用返回 0
	//
	function AnswerNextCheck(answerNextBtn){
		if(!answerNextBtn){
			let examNextPreveDom = examDom.querySelector('.next-preve');
			if (!examNextPreveDom) { return 0; }
			answerNextBtn = examNextPreveDom.querySelector('button:nth-child(2)');
			if (!answerNextBtn) { return 0; }
		}
		return !answerNextBtn.disabled;
	}


	//
	// 答题结束
	//
	function AnswerEnd(){
		if(!answerState) { return; }
		answerState = null;
		ShowAnswerMark(0);
		alert('烤题完成！\n自行查看！');
	}


	//
	// 定位元素到可视区
	//
	function scrollIntoViewIfNeeded(element) {
		const rect = element.getBoundingClientRect();
		if (rect.bottom >= 0 && rect.top <= window.innerHeight && rect.right >= 0 && rect.left <= window.innerWidth) {
			//console.log('元素可见 不需要定位');
		} else {
			element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
		}
	}


	//
	// 显示答案到界面
	//
	function ShowAnswer(qNumInt, answer){
		if(!answer) { return; }

		if(!answerShowDom){
			answerShowDom = examDom.querySelector('#mk-ksb-a-sa');
			if(!answerShowDom){
				answerShowDom = document.createElement('div');
				answerShowDom.className = 'mk-ksb-answer-show-box';
				examDom.appendChild(answerShowDom);
			}
		}

		// 移除之前高亮的答案
		const highlightAnswers = answerShowDom.querySelectorAll('.mk-ksb-answer-show-grid-highlight');
		for (let i = 0; i < highlightAnswers.length; i++) {
			highlightAnswers[i].classList.remove('mk-ksb-answer-show-grid-highlight');
		}

		// 定位已显示过的答案位置
		const locateTheAnswer = answerShowDom.querySelector(`div[q-number="${qNumInt}"]`);
		if(locateTheAnswer){
			locateTheAnswer.classList.add('mk-ksb-answer-show-grid-highlight');
			//定位到答案显示位置
			scrollIntoViewIfNeeded(locateTheAnswer);
			return;
		}

		// 替换简答题分隔符为换行
		answer = answer.includes('|') ? `\n${answer.replaceAll('|','\n')}` : answer;

		const answerItemDom = document.createElement('div');
		answerItemDom.className = 'topic-type mk-ksb-answer-show-grid mk-ksb-answer-show-grid-highlight';
		answerItemDom.setAttribute('q-number', qNumInt);
		answerItemDom.innerText = `${qNumInt}. ${answer}`;
		answerShowDom.appendChild(answerItemDom);
		//定位答案显示位置
		scrollIntoViewIfNeeded(answerItemDom);
	}


	//
	// 创建操作按钮方法
	//
	function CreatBtn(id, text, callback){
		let intervalAddBtn = setInterval(function(){

			if(!examDom){
				examDom = document.querySelector('[class*=exam_modal]');
			}
			if(!examDom){ return; }

			//如果按钮存在则不添加
			if(document.querySelector(`#${id}`)){
				console.log(`${text}按钮已添加过了`);
				return;
			}

			let btmDom = document.createElement('button');
			btmDom.type = 'button';
			btmDom.id = id || `mk-btn-${Math.floor(Math.random()*100)}`;
			btmDom.className = 'el-button el-button--primary el-button--small';
			btmDom.innerHTML = `<span>${text}</span>`;
			btmDom.onclick = callback || function(){}
			examDom.querySelector('.next-preve').appendChild(btmDom);

			clearInterval(intervalAddBtn);
		},500);

		setTimeout(function(){ clearInterval(intervalAddBtn); },1500);
	}


	//
	// 创建答题按钮
	//
	function CreatAnswerBtn(){
		const id = 'mk-ksb-a-btn';
		const text = '烤';
		const callback = function(){
			if(answerState){ return; }

			const qCount = answerList.length;
			const maxErrorCount = parseInt(qCount / 2);

			let eac = prompt('请输入错题个数，不输入或者输入0 按满分答题\n'
							 + `错题个数最多可输入 ${maxErrorCount}\n`
							 + '自动错题可能有 1～3 题误差\n'
							 + '想要停止烤题可在右键脚本扩展找到此脚本菜单的强制停止') || '0';

			if(!/^\d+$/.test(eac.replace(/\s+/g,'')) || eac > maxErrorCount){
				alert(`输入不正确！请输入小于等于 ${maxErrorCount} 的错题个数`);
				return;
			}
			eac = eac < 0 ? 0 : eac;
			wrongAnswerCount = parseInt(eac);
			AnswerStart();
		}

		if(!answerList || answerList.length < 1){
			console.log('没有获得答案, 或者不在题目页面');
			return;
		}
		CreatBtn(id, text, callback);
	}


	//
	// 创建查看答案按钮
	//
	function CreatViewAnswerBtn(){
		let id = 'mk-ksb-va-btn';
		let text = '查看答案';
		let callback = function(){
			if(answerState){ return; }
			if(!answerList || answerList.length < 1){
				console.log('找不到答案');
				return;
			}

			let qNumInt = GetQuestionNumber()
			if(qNumInt < 0) {
				alert('未获得此题答案');
				console.log('未找到答案 - 题号', qNumInt);
				return;
			}

			let answerData = GetAnswerData();
			if(!answerData.data || !answerData.data.answer){
				alert('未获得此题答案');
				console.log('未找到答案 - 题目', GetQuestionTitle());
				return;
			}

			ShowAnswer(qNumInt, answerData.data.answer);
		}

		if(!answerList || answerList.length < 1){
			console.log('没有获得答案');
			return;
		}
		CreatBtn(id, text, callback);
	}


	//
	// 显示或隐藏正在答题水印
	//
	function ShowAnswerMark(show){
		const markDom = document.querySelector('.mk-ksb-a-mark');
		if(show && !markDom){
			const answerMark = document.createElement('div');
			answerMark.className = 'mk-ksb-a-mark';
			answerMark.innerHTML = `<p>烤</p>`;
			document.body.appendChild(answerMark);
		}else if(markDom){
			markDom.parentNode.removeChild(markDom);
		}
	}


	//
	// 初始化必要样式
	//
	function InitCss(){
		addStyle('mk-ksb-style', myStyle);
	}


	//
	// 注册脚本设置按钮
	//
	// 初始化显示按钮
	if (!gmMenuIdInit) {
		gmMenuIdInit = GM_registerMenuCommand('看不到按钮就点一次', CreatAnswerBtn);
	}
	// 强制停止答题
	if (!gmMenuIdForceStop) {
		gmMenuIdForceStop = GM_registerMenuCommand('强制停止答题', AnswerEnd);
	}


	//
	// 等待页面加载完毕 初始化答题按钮
	//
	window.onload = function(){
		setTimeout(function(){
			InitCss();
			CreatAnswerBtn();
			CreatViewAnswerBtn();
		},800);
	};


	//
	//-- 当网址被改变尝试显示答题按钮 ------
	//
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
		setTimeout(()=>{
			InitCss();
			CreatAnswerBtn();
			CreatViewAnswerBtn();
		},1000);
	}
	window.addEventListener('pushState', handler);
	window.addEventListener('replaceState', handler);

})();