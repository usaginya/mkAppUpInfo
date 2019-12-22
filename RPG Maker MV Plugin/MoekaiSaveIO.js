//=============================================================
// MoekaiSaveIO.js    version 0.0.11
// ----------------------------------------------------------------------
// RPG Maker MV Plugin
//=============================================================
/*
 * MIT License
 *
 * Copyright (c) 2013-2020 YIU (喵音帝) <http://usaginya.lofter.com/>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
//=============================================================
/*:zh
 * @author YIU (喵音帝)
 * @plugindesc 导入导出游戏 json 格式存档
 *
 * @param windowGroup
 * @text 窗口属性
 *
 * @param ioWindowW
 * @parent windowGroup
 * @text 输入窗口总宽度 (px)
 * @desc 导入或导出窗口的总宽度，根据游戏需求调节，默认: 600
 * @type number
 * @default 600
 * @min 100
 *
 * @param ioWindowH
 * @parent windowGroup
 * @text 输入窗口总高度 (px)
 * @desc 导入或导出窗口的总高度，根据游戏需求调节，默认: 300
 * @type number
 * @default 300
 * @min 50
 *
 * @param ioWindowPadding
 * @parent windowGroup
 * @text 输入窗口内边距 (cm)
 * @desc 导入或导出窗口的内边距，用于调整窗口背景遮罩操作层大小，默认: 2
 * @type number
 * @default 2
 * @min 1
 *
 * @param menuTitleGroup
 * @text 菜单标题
 *
 * @param menuTitleMain
 * @parent menuTitleGroup
 * @text 标题画面菜单选项标题
 * @desc 设定在游戏标题画面中的选项文字
 *
 * @param subTitleImportFormStr
 * @parent menuTitleGroup
 * @text 子菜单导入文本存档标题
 * @desc 子菜单中“导入文本存档“的选项文字
 *
 * @param subTitleExport
 * @parent menuTitleGroup
 * @text 子菜单导出文本存档标题
 * @desc 子菜单中“导出文本存档“的选项文字
 *
 * @param otherParameters
 * @text 其他设定
 *
 * @param titleMenuWindowY
 * @parent otherParameters
 * @text 标题画面菜单相对纵向Y (px)
 * @desc 设定游戏标题画面菜单窗口的相对纵向Y位置 ( -5000 ~ ∞ )，默认: 0
 * @type number
 * @default 0
 * @min -5000
 *
 * @help
 * =============================================================
 * MoekaiSaveIO.js    version 0.0.11
 * =============================================================
 * 提供 PC 端和移动端之间游戏存档的 json 格式文本导入导出功能
 * 导入或导出窗口可以点击文本框以外的黑色遮罩区域关闭
 * -------------------------------------------------------------
 * ● 标题页面菜单相对纵向位置调整
 *    增加菜单后可能导致菜单变长，挡住大部分游戏背景，这种情
 *    况可以根据情况，调整菜单相对纵向Y位置的参数来暂时解决
 *    - 设置值 0 不进行菜单位置调整
 *    - 设置 > 0 的正值可以往下调整菜单位置
 *    - 设置 < 0 的负值可以往上调整菜单位置
 */
//=============================================================
//=============================================================
// 初始化参数
//=============================================================
var MoekaiSaveIO = MoekaiSaveIO || {};

MoekaiSaveIO.Param = MoekaiSaveIO.Param || {};
MoekaiSaveIO.Parameters = PluginManager.parameters('MoekaiSaveIO');
MoekaiSaveIO.Param.titleMenuWindowY = Number(MoekaiSaveIO.Parameters['titleMenuWindowY']) || 0;
MoekaiSaveIO.Param.ioWindowW = Number(MoekaiSaveIO.Parameters['ioWindowW']) || 600;
MoekaiSaveIO.Param.ioWindowH = Number(MoekaiSaveIO.Parameters['ioWindowH']) || 300;
MoekaiSaveIO.Param.ioWindowPadding = Number(MoekaiSaveIO.Parameters['ioWindowPadding']) || 2;
MoekaiSaveIO.Param.menuTitleMain = MoekaiSaveIO.Parameters['menuTitleMain'] || '管理存档';
MoekaiSaveIO.Param.subTitleImportFormStr = MoekaiSaveIO.Parameters['subTitleImportFormStr'] || '导入文本存档';
MoekaiSaveIO.Param.subTitleExport = MoekaiSaveIO.Parameters['subTitleExport'] || '导出文本存档';

MoekaiSaveIO.SaveManage = MoekaiSaveIO.SaveManage || {};
MoekaiSaveIO.JavaScript = MoekaiSaveIO.JavaScript || {};
MoekaiSaveIO.Strings = MoekaiSaveIO.Strings || {};

MoekaiSaveIO.Strings.saveMaxCount = DataManager.maxSavefiles();
MoekaiSaveIO.Strings.menuSymbol = function() {
    throw new Error('This is a static class');
}

//=============================================================
// 重写参数
//=============================================================
Object.defineProperties(MoekaiSaveIO.Strings.menuSymbol, {
    openSaveIOScene: {
        value: 'openSaveIOScene'
    },
    saveImportFormStr: {
        value: 'saveImportFormStr'
    },
    saveImportFormZip: {
        value: 'saveImportFormZip'
    },
    saveExport: {
        value: 'saveExport'
    }
});

//=============================================================
// 重写JS方法
//=============================================================
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target, firstSource) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

//=============================================================
// 自定义JS方法
//=============================================================
MoekaiSaveIO.JavaScript.stringHelper = {
    isEmpty: function (obj, type) {
            try {
                type = type || 'string';
                return typeof obj != type || obj == null || obj.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') == "";
            } catch (e) {
                return false;
            }
        },

        toast: function (msg, duration) {
            var tosastId = 'mktoast';
            var oldtoast = document.getElementById(tosastId);
            if (oldtoast)
                oldtoast.remove();
            duration = isNaN(duration) ? 3000 : duration;
            var o = document.createElement('div');
            o.id = tosastId;
            o.innerHTML = msg;
            o.style.cssText = "max-width:60%;min-width:150px;padding:10px 20px;color:rgb(255, 255, 255);line-height:20pt;text-align:center;border-radius:2px;position:fixed;top:80%;left:50%;transform:translate(-50%, -50%);z-index:999999;background:rgba(0, 0, 0,.7);font-size:16px;";
            document.body.appendChild(o);
            setTimeout(function() {
                var d = 0.5;
                o.style.webkitTransition = `-webkit-transform ${d}s ease-in, opacity ${d}s ease-in`;
                o.style.opacity = '0';
                setTimeout(function() {
                    if (document.body.contains(o))
                        document.body.removeChild(o);
                }, d * 1000);
            }, duration);
        },

        copyStr: function (str, tips, tipsduration, closecallback) {
            var oBody = document.getElementsByTagName('body').item(0);
            var oCopy = document.createElement('div');
            oCopy.style.margin = 'auto';
            oCopy.style.left = '0';
            oCopy.style.right = '0';
            oCopy.style.top = '0';
            oCopy.style.bottom = '0';
            oCopy.style.width = `${MoekaiSaveIO.Param.ioWindowW}px`;
            oCopy.style.height = `${MoekaiSaveIO.Param.ioWindowH}px`;
            oCopy.style.padding = `${MoekaiSaveIO.Param.ioWindowPadding}cm`;
            oCopy.style.position = 'fixed';
            oCopy.style.zIndex = '998';
            oCopy.style.background = 'rgba(0, 0, 0, 0.6)';
            oCopy.innerHTML = `<textarea id='mkcopy' autofocus='autofocus' style='width:${oCopy.style.width};height:${oCopy.style.height};padding:3px;outline:0;color:#fff;background:rgba(0,0,0, 0.5);box-shadow:rgba(0, 0, 0, 0.7) 0px 0px 10px 0;resize:none;z-index:999'>${str}</textarea>`;
            oCopy.onclick = function (e) {
                if (e.srcElement.localName != 'textarea') {
                    if (typeof closecallback == 'function') {
                        if (!closecallback(document.getElementById('mkcopy').value)) {
                            this.remove();
                        }
                    } else {
                        this.remove();
                    }
                    e.preventDefault();
                }
            }
            oBody.appendChild(oCopy);
            document.getElementById('mkcopy').select();

            if (!this.isEmpty(tips))
                this.toast(tips, tipsduration);
        },
		
		isCopyStrOpen: function() {
			return !!document.getElementById('mkcopy');
		}
};

//=============================================================
// 导入导出游戏存档
// savefileId:
// -1         Config
//  0         Global
//  1~20   Save data id
//=============================================================
MoekaiSaveIO.SaveManage = {

    loadGlobalInfo: function (saveobj) {
            var json;
            try {
                json = LZString.decompressFromBase64(saveobj.g);
            } catch (e) {
                console.error(e);
                return [];
            }
            if (json) {
                var globalInfo = JSON.parse(json);
                for (var i = 1; i <= MoekaiSaveIO.Strings.saveMaxCount; i++) {
                    if (MoekaiSaveIO.JavaScript.stringHelper.isEmpty(saveobj.s[i])) {
                        delete globalInfo[i];
                    }
                }
                return globalInfo;
            } else {
                return [];
            }
        },

        loadFromLocalFile: function (savefileId) {
            var data = null;
            var fs = require('fs');
            var filePath = StorageManager.localFilePath(savefileId);
            if (fs.existsSync(filePath)) {
                data = fs.readFileSync(filePath, {
                    encoding: 'utf8'
                });
            }
            return data;
        },

        loadFromWebStorage: function (savefileId) {
            var key = StorageManager.webStorageKey(savefileId);
            var data = localStorage.getItem(key);
            return data;
        },

        load: function (savefileId) {
            if (StorageManager.isLocalMode()) {
                return this.loadFromLocalFile(savefileId);
            } else {
                return this.loadFromWebStorage(savefileId);
            }
        },

        applyConfig: function (saveobj) {
            var json;
            var config = {};
            json = LZString.decompressFromBase64(saveobj.c);
            if (!MoekaiSaveIO.JavaScript.stringHelper.isEmpty(json)) {
                config = JSON.parse(json);
                ConfigManager.applyData(config);
            }
        },

        isThisGameFile: function (savefileId, saveobj) {
            var globalInfo = this.loadGlobalInfo(saveobj);
            if (globalInfo && globalInfo[savefileId]) {
                if (StorageManager.isLocalMode()) {
                    return true;
                } else {
                    var savefile = globalInfo[savefileId];
                    return (savefile.globalId === DataManager._globalId && savefile.title === $dataSystem.gameTitle);
                }
            } else {
                return false;
            }
        },
		
		copyClosing: function(wmsio) {
			wmsio.activate();
		},

        $import: function(wmsio) {
            MoekaiSaveIO.JavaScript.stringHelper.copyStr('', "请粘贴Json文本存档，粘贴后按文本框外导入存档，注意！这会覆盖当前所有存档！你可以先导出现在已有都存档再来导入！", 8000, function (input) {
                try {
                    if (MoekaiSaveIO.JavaScript.stringHelper.isEmpty(input)) {
                        MoekaiSaveIO.JavaScript.stringHelper.toast('没东西导入...');
						MoekaiSaveIO.SaveManage.copyClosing(wmsio);
                        return;
                    } else if (!confirm('真的确定要导入这个存档吗？\r\n要退出导入请删除全部内容再点文本框外退出。')) {
						MoekaiSaveIO.SaveManage.copyClosing(wmsio);
                        return 1;
					}

                    var count = 0;
                    var saveObj = JSON.parse(input) || {};
                    var o_globalInfo = DataManager.loadGlobalInfo();
                    var globalInfo = MoekaiSaveIO.SaveManage.loadGlobalInfo(saveObj);
                    if (globalInfo.length < 1) {
                        MoekaiSaveIO.JavaScript.stringHelper.toast('导入失败！填入的存档缺少记录信息，或者存档是空的！');
						MoekaiSaveIO.SaveManage.copyClosing(wmsio);
                        return;
                    }
                    DataManager.saveGlobalInfo(globalInfo);

                    for (var i = 1; i <= MoekaiSaveIO.Strings.saveMaxCount; i++) {
                        if (MoekaiSaveIO.SaveManage.isThisGameFile(i, saveObj)) {
                            StorageManager.save(i, LZString.decompressFromBase64(saveObj.s[i]));
                            count++;
                        }
                    }
                    if (count > 0) {
                        MoekaiSaveIO.SaveManage.applyConfig(saveObj);
                        ConfigManager.save();
                        DataManager.saveGlobalInfo(Object.assign(o_globalInfo, globalInfo));
                        MoekaiSaveIO.JavaScript.stringHelper.toast(`导入了 ${count} 个存档！`);
						MoekaiSaveIO.SaveManage.copyClosing(wmsio);
                    } else {
                        DataManager.saveGlobalInfo(o_globalInfo);
                        MoekaiSaveIO.JavaScript.stringHelper.toast('存档数据有误？<br/>什么都没有导入...');
						MoekaiSaveIO.SaveManage.copyClosing(wmsio);
                    }
                } catch (e) {
                    MoekaiSaveIO.JavaScript.stringHelper.toast(`导入错误！格式不正确！<br/>${e.message}`);
					MoekaiSaveIO.SaveManage.copyClosing(wmsio);
                }
            });
        },

        $export: function(wmsio) {
            var saveObj = {};
            var saveJson = '';

            if (confirm("要把设置一起导出来吗？\r\n一般是系统和各种音量的设置。"))
                saveObj.c = this.load(-1) || '';

            saveObj.g = this.load(0) || '';
            saveObj.s = {};

            for (var i = 1; i <= MoekaiSaveIO.Strings.saveMaxCount; i++) {
                if (StorageManager.exists(i)) {
                    saveObj.s[i] = this.load(i);
                }
            }

            saveJson = JsonEx.stringify(saveObj);
            MoekaiSaveIO.JavaScript.stringHelper.copyStr(saveJson, "复制全部存档文本，然后可以通过导入存档进行导入，点击文本框边缘可以关闭窗口", 3800, function() {
				MoekaiSaveIO.SaveManage.copyClosing(wmsio);
			});
        }
};

//=============================================================
// 菜单窗口构建
//=============================================================

//-------------------------------
//  Scene 菜单场景
//-------------------------------
function Scene_MoekaiSaveIO() {
    this.initialize.apply(this, arguments);
}

Scene_MoekaiSaveIO.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MoekaiSaveIO.prototype.constructor = Scene_MoekaiSaveIO;

Scene_MoekaiSaveIO.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_MoekaiSaveIO.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createIOWindow();
};
/*
Scene_Options.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    ConfigManager.save();
};
*/
Scene_MoekaiSaveIO.prototype.createIOWindow = function() {
    this._mksioWindow = new Window_MoekaiSaveIO();
    this._mksioWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._mksioWindow);
};

//-------------------------------
//  Window 菜单窗口
//-------------------------------
function Window_MoekaiSaveIO() {
    this.initialize.apply(this, arguments);
}

Window_MoekaiSaveIO.prototype = Object.create(Window_Command.prototype);
Window_MoekaiSaveIO.prototype.constructor = Window_MoekaiSaveIO;

Window_MoekaiSaveIO.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};

Window_MoekaiSaveIO.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_MoekaiSaveIO.prototype.windowWidth = function() {
    return 300;
};

Window_MoekaiSaveIO.prototype.windowHeight = function() {
    return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};

Window_MoekaiSaveIO.prototype.makeCommandList = function() {
    this.addCommand(MoekaiSaveIO.Param.subTitleImportFormStr, MoekaiSaveIO.Strings.menuSymbol.saveImportFormStr);
    this.addCommand(MoekaiSaveIO.Param.subTitleExport, MoekaiSaveIO.Strings.menuSymbol.saveExport);
};

Window_MoekaiSaveIO.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    switch (symbol) {
    case MoekaiSaveIO.Strings.menuSymbol.saveImportFormStr:
	    this.deactivate();
        MoekaiSaveIO.SaveManage.$import(this);
        break;
    case MoekaiSaveIO.Strings.menuSymbol.saveExport:
	    this.deactivate();
        MoekaiSaveIO.SaveManage.$export(this);
        break;
    }
};

//=============================================================
// 标题页面菜单创建
//=============================================================
MoekaiSaveIO.TitleCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    MoekaiSaveIO.TitleCommandList.call(this);

    this.addCommand(MoekaiSaveIO.Param.menuTitleMain, MoekaiSaveIO.Strings.menuSymbol.openSaveIOScene);
};

MoekaiSaveIO.TitleUpdatePlacement = Window_TitleCommand.prototype.updatePlacement;
Window_TitleCommand.prototype.updatePlacement = function() {
    MoekaiSaveIO.TitleUpdatePlacement.call(this);
    this.y += MoekaiSaveIO.Param.titleMenuWindowY;
};

//=============================================================
// 菜单事件绑定
//=============================================================
MoekaiSaveIO.Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    MoekaiSaveIO.Scene_Title_createCommandWindow.call(this);

    this._commandWindow.setHandler(MoekaiSaveIO.Strings.menuSymbol.openSaveIOScene, this.openSaveIOScene.bind(this));
};

Scene_Title.prototype.openSaveIOScene = function() {
    Input.clear();
    TouchInput.clear();
    this._commandWindow.close();
    SceneManager.push(Scene_MoekaiSaveIO);
};
