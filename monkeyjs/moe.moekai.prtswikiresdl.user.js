// ==UserScript==
// @name         PRTS Wiki Resoures Download
// @namespace    https://github.com/usaginya/mkAppUpInfo/blob/master/monkeyjs/moe.moekai.prtswikiresdl.user.js
// @version      2024-08-29-00
// @description  从 PRTS Wiki 获得资源文件
// @author       YIU
// @match        *://prts.wiki/w/*
// @icon         http://prts.wiki/favicon.ico
// @require      https://cdn.bootcdn.net/ajax/libs/jszip/3.9.1/jszip.min.js
// @grant        GM_addStyle
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(function(JSZip) {
	'use strict';

	// 全局 存储干员id名
	let globalCharId;
	// 全局 spine模型信息
	let globalSpineData;
	// 全局 spine模型面板
	let globalSpinePanel;
	// 全局 jszip实例
	let globalZip;

	// 模型信息json域名路径
	const globalSpineDataUri = 'https://torappu.prts.wiki/assets/char_spine'

	// 添加样式
	const globalCss = `.pwrd-tooltip {
    position: absolute;
    background-color: #fff;
    color: #000;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    z-index: 5000;
    opacity: 0;
    transition: opacity 0.2s ease;
	}
	.pwrd-tooltip.pwrd-show {
	opacity: 1;
	}
	.pwrd-disabled {
    pointer-events: none;
	}
	.pwrd-circular-progress-container {
    position: absolute;
	}
	.pwrd-circular-progress {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 0 solid #fff;
	backdrop-filter: blur(1px);
    box-sizing: border-box;
    z-index: 1001;
	}
	.pwrd-circular-progress-text {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
	user-select: none;
	z-index: 1003;
	}`;
	GM_addStyle(globalCss);


	// 初始化操作
	// 绑定加载模型按钮
	const spineRootElement = document.getElementById('spine-root');
	if (spineRootElement) {
		globalCharId = spineRootElement.getAttribute('data-id');
		globalSpinePanel = spineRootElement.querySelector('div.n-config-provider');
		const spineShowButton = globalSpinePanel.querySelector('button');
		if (spineShowButton) {
			spineShowButton.addEventListener('click', event => {
				spineShowButtonClick(event, globalCharId);
			});
		}
	}


	// 处理加载模型按钮点击事件
	const spineShowButtonClick = (event, dataId) => {
		const jsonUrl = `${globalSpineDataUri}/${dataId}/meta.json`;

		// 解析模型json信息
		fetchJson(jsonUrl)
			.then(data => {
			globalSpineData = processSpineJsonData(data);
			if (globalSpineData && globalSpineData.fileLinks.length > 0) {
				addDownloadSpineModelsBtn();
			}
		})
			.catch(errorMessage => {
			// 解析独立模型、比如敌人
			let spineData = document.querySelector('#SPINEDATA');
			if (!spineData || !spineData.innerText && !spineData.textContent) {
				console.error('解析spine模型信息json错误:', errorMessage);
				return;
			}
			spineData = JSON.parse(spineData.inndeText || spineData.textContent);
			globalSpineData = processSpineJsonData(spineData);
			if (globalSpineData && globalSpineData.fileLinks.length > 0) {
				addDownloadSpineModelsBtn();
			}
		});
	}


	// 添加下载模型按钮元素
	const addDownloadSpineModelsBtn = () => {
		const targetElement = spineRootElement.querySelector('.flex-col');
		if (!targetElement) return;
		const flexContainers = targetElement.querySelectorAll('.flex.justify-around');
		const lastFlexContainer = flexContainers[flexContainers.length - 1];

		if (!lastFlexContainer) return;
		const firstButton = lastFlexContainer.querySelector('button');
		if (!firstButton) return;

		const downloadSpineModelsBtnIcon = `<path d="m16.23,3.35a2.62,2.62 0 0 1 1.85,0.77l2.21,2.21a1.75,1.75 0 0 1 0.51,1.24l0,10.62a2.62,2.62 0 0 1 -2.62,2.62l-12.22,0a2.62,2.62 0 0 1 -2.62,-2.62l0,-10.47l0,-0.15a1.75,1.75 0 0 1 0.51,-1.24l2.21,-2.21a2.62,2.62 0 0 1 1.86,-0.77l8.29,0zm3.27,4.8l-14.84,0l0,10.04a1.31,1.31 0 0 0 1.31,1.31l12.22,0a1.31,1.31 0 0 0 1.31,-1.31l0,-10.04zm-7.42,2.4a0.65,0.65 0 0 1 0.65,0.57l0,4.18l1.06,-1.06a0.65,0.65 0 0 1 0.98,0.85l-0.06,0.07l-1.55,1.56a1.53,1.53 0 0 1 -2.05,0.1l-0.11,-0.1l-1.57,-1.57a0.65,0.65 0 0 1 0.85,-0.98l0.07,0.06l1.06,1.06l0,-4.09a0.65,0.65 0 0 1 0.65,-0.65zm4.15,-5.89l-8.29,0a1.31,1.31 0 0 0 -0.83,0.3l-0.1,0.09l-1.8,1.8l13.74,0l-1.8,-1.8a1.31,1.31 0 0 0 -0.92,-0.38l0,0z"></path>`;
		const downloadSpineModelsBtn = copySpineToolsButton(firstButton, downloadSpineModels, '下载模型包', downloadSpineModelsBtnIcon);

		lastFlexContainer.appendChild(downloadSpineModelsBtn);
		console.log('Button duplicated and appended.');
	};


	// 下载spine模型包按钮事件
	const downloadSpineModels = button => {
		globalZip = globalZip || new ZipDownloader(globalSpineData.charName);
		const progress = new CircularProgress(button, globalSpineData.fileLinks.length);

		// 添加要下载的文件 链接、自定义文件名和存放目录路径
		globalSpineData.fileLinks.forEach(({ finalLink, fileLocalPath }) => {
			globalZip.addFile(finalLink, fileLocalPath);
		});

		// 进度回调函数
		const progressCallback = (completedCount, totalFiles) => {
			progress.incrementProgress(completedCount);
		};

		// 启动下载任务并传递回调函数
		globalZip.startDownload(progressCallback).then(() => {
			progress.removeProgress();
		}).catch(err => {
			console.error('下载Spine模型时出错: ', err);
		});
	};


	// 获取 JSON 数据
	const fetchJson = (jsonUrl) => {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: "GET",
				url: jsonUrl,
				onload: (response) => {
					if (response.status >= 200 && response.status < 400) {
						try {
							const data = JSON.parse(response.responseText);
							resolve(data);
						} catch (error) {
							reject(`JSON 解析错误: ${error.message}`);
						}
					} else {
						reject(`JSON 请求失败: ${response.statusText}`);
					}
				},
				onerror: (error) => {
					reject(`Request failed: ${error}`);
				}
			});
		});
	};


	// 复制spine工具按钮
	const copySpineToolsButton = (targetBtn, action, tooltipStr, svgIcon) => {
		if (!targetBtn) return;
		const newButton = targetBtn.cloneNode(true);
		const svg = newButton.querySelector('svg');
		if (svg && svgIcon) {
			svg.innerHTML = svgIcon;
		}

		if (action) {
			newButton.addEventListener('click', () => action(newButton));
		}

		if (tooltipStr) {
			newButton.addEventListener('mouseenter', () => {
				let tooltip = document.createElement('div');
				tooltip.textContent = tooltipStr;
				tooltip.classList.add('pwrd-tooltip');
				newButton.tooltipElement = tooltip;
				newButton.parentElement.querySelectorAll('.pwrd-tooltip').forEach(t => t.remove());
				newButton.parentElement.appendChild(tooltip);

				const buttonRect = newButton.getBoundingClientRect();
				const parentRect = globalSpinePanel.getBoundingClientRect();
				tooltip.style.top = `${buttonRect.top - parentRect.top - tooltip.offsetHeight - 5}px`;
				tooltip.style.left = `${buttonRect.left - parentRect.left + buttonRect.width / 2 - tooltip.offsetWidth / 2}px`;

				requestAnimationFrame(() => {
					tooltip.classList.add('pwrd-show');
				});

				newButton.addEventListener('mouseleave', () => {
					tooltip.classList.remove('pwrd-show');
					tooltip.addEventListener('transitionend', () => tooltip.remove(), { once: true });
				}, { once: true });
			});
		}

		return newButton;
	}


	// 环形进度条
	class CircularProgress {
		constructor(buttonElement, maxCount) {
			this.buttonElement = buttonElement;
			this.maxCount = maxCount;
			this.currentCount = 0;
			this.createProgressElements();
		}

		createProgressElements() {
			const { width, height } = this.buttonElement.getBoundingClientRect();

			// 创建容器来包含进度条和文本
			this.progressContainer = document.createElement('div');
			this.progressContainer.className = 'pwrd-circular-progress-container';
			Object.assign(this.progressContainer.style, {
				width: `${width}px`,
				height: `${height}px`,
				zIndex: 3000
			});

			// 创建圆背景
			this.circleBackground = document.createElement('div');
			this.circleBackground.className = 'pwrd-circular-progress-circle-background';
			this.progressContainer.appendChild(this.circleBackground);

			// 创建蓝色当前进度
			this.progressCircle = document.createElement('div');
			this.progressCircle.className = 'pwrd-circular-progress';
			this.progressContainer.appendChild(this.progressCircle);

			// 创建显示进度的文本
			this.progressText = document.createElement('div');
			this.progressText.className = 'pwrd-circular-progress-text';
			this.progressText.style.fontSize = `${width / 3}px`;
			this.progressContainer.appendChild(this.progressText);

			// 移除已有进度条
			this.buttonElement.querySelectorAll('.pwrd-circular-progress-container').forEach(p => p.remove());

			// 将进度条容器添加到按钮中
			this.buttonElement.appendChild(this.progressContainer);

			// 初始化显示
			this.updateProgress();
		}

		updateProgress() {
			const percentage = Math.floor((this.currentCount / this.maxCount) * 100);
			const progressDegree = (this.currentCount / this.maxCount) * 360;
			this.progressCircle.style.backgroundImage = `conic-gradient(#6a6aff99 0deg, #6a6aff99 ${progressDegree}deg, #fffa ${progressDegree}deg, #fffa 360deg)`;
			this.progressText.textContent = `${percentage}%`;
			this.buttonElement.disabled = percentage < 100;
			if (this.buttonElement.disabled){
				this.buttonElement.classList.add('pwrd-disabled');
				this.buttonElement.parentElement.querySelectorAll('.pwrd-tooltip').forEach(t => t.remove());
			}
		}

		incrementProgress(increment) {
			this.currentCount = increment > this.maxCount ? this.maxCount : increment;
			this.updateProgress();
		}

		removeProgress() {
			if (this.progressContainer) {
				this.buttonElement.classList.remove('pwrd-disabled');
				this.progressContainer.remove();
				this.progressContainer = null;
			}
		}
	}


	// zip下载类
	class ZipDownloader {
		constructor(zipFileName) {
			this.zipFileName = zipFileName; // 压缩包文件名
			this.files = []; // 存储需要下载的文件链接及自定义文件名
			this.fileCache = {}; // 文件缓存
			this.completedCount = 0; // 已完成的下载文件数量
		}

		// 添加文件链接
		addFile(fileUrl, directoryPath) {
			this.files.push({ url: fileUrl, path: directoryPath });
		}

		// 启动异步下载任务
		async startDownload(onProgressCallback) {
			let zip = new JSZip();

			const filePromises = this.files.map(async (file) => {
				let blob;

				// 检查文件是否已在缓存中
				if (this.fileCache[file.url]) {
					blob = this.fileCache[file.url]; // 从缓存中获取文件
				} else {
					blob = await this.fetchBlobWithGM(file.url);
					this.fileCache[file.url] = blob; // 将文件缓存
				}

				// 存储文件
				zip.file(file.path, blob, {base64: true});

				// 每当一个文件下载完成时调用回调函数
				this.completedCount++;
				if (onProgressCallback && typeof onProgressCallback === 'function') {
					onProgressCallback(this.completedCount, this.files.length);
				}
			});

			// 等待所有文件下载完成
			await Promise.all(filePromises);

			// 生成 ZIP 文件并下载
			await zip.generateAsync({ type: 'blob' }).then(blob => {
				this.downloadZip(blob, `${this.zipFileName}.zip`);
			}).catch(error => {
				console.error('Error generating blob:', error);
			});
		}

		// 使用 GM_xmlhttpRequest 获取文件 Blob
		fetchBlobWithGM(url) {
			return new Promise((resolve, reject) => {
				GM_xmlhttpRequest({
					method: "GET",
					url: url,
					responseType: "blob",
					onload: function(response) {
						if (response.status >= 200 && response.status < 400) {
							resolve(response.response);
						} else {
							reject(new Error("Error fetching file: " + response.statusText));
						}
					},
					onerror: function(error) {
						reject(new Error("Request failed: " + error));
					}
				});
			});
		}

		// 触发下载 ZIP 文件
		downloadZip(blob, zipFileName) {
			GM_download({
				url: URL.createObjectURL(blob),
				name: zipFileName,
				saveAs: true
			});
		}
	}


	// 解析spine模型 JSON 信息
	const processSpineJsonData = (data) => {
		const { prefix, name, skin: skins } = data;
		const fileLinks = [];

		for (const [skinName, group] of Object.entries(skins)) {
			for (const [groupName, value] of Object.entries(group)) {
				const { file: filePath } = value;
				const fileName = filePath.split('/').pop();
				const baseLink = `${prefix}${filePath}`;
				const fileExtensions = ['.skel', '.atlas', '.png'];

				fileExtensions.forEach(ext => {
					const finalLink = `${baseLink}${ext}`;
					const fileLocalPath = `${name}/Spine/${skinName}/${groupName}/${fileName}${ext}`;
					fileLinks.push({ fileLocalPath, finalLink });
				});
			}
		}

		return {charName: name, fileLinks};
	};


})(JSZip);