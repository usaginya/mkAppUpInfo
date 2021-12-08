// ==UserScript==
// @name         EPIC移除商店限制提示
// @namespace    moe.moekai.epicgames.removeblock
// @version      0.1
// @description  没有必要这么做
// @author       YIU
// @match        http*://www.epicgames.com/store/*
// @icon         https://static-assets-prod.epicgames.com/epic-store/static/favicon.ico
// @grant        none
// @run-at       document-end
// @supportURL   https://github.com/usaginya/mkAppUpInfo/tree/master/monkeyjs
// @homepageURL  https://github.com/usaginya/mkAppUpInfo/tree/master/monkeyjs
// ==/UserScript==

(function() {
	'use strict';

	const getDC = (dcName) => dcName ? `[data-component=${dcName}]` : '';

	let dcOverlay = getDC('Overlay'),
		dcWarning = getDC('WarningLayout'),
		dcPDPRG = getDC('PDPRegionGate'),
		dcMessage = getDC('Message');

	let removeBlock = () => {
		if (!document.querySelector(`${dcOverlay} ${dcWarning}`)) { return; }

		closeInterval();

		let domPDPRGMsg = document.querySelector(`${dcOverlay} ${dcWarning} ${dcPDPRG} ${dcMessage}`);

		let removeFunc = () => {
			document.querySelector(dcOverlay).style.setProperty('display', 'none', 'important');
			document.body.style.setProperty('overflow-y', 'auto');
		};

		if (domPDPRGMsg) {
			domPDPRGMsg.innerText = '[脚本]正在移除限制提示...';
			setTimeout(() => removeFunc(), 500);
		} else {
			removeFunc();
		}
	};

	let tryInterval = setInterval(() => removeBlock(), 500),
		closeInterval = () => {
			if (tryInterval) {
				clearInterval(tryInterval);
				tryInterval = null;
			}
		};

	setTimeout(() => closeInterval(), 3000);

})();