//=============================================================
// MoekaiSaveIO.js    version 0.0.9
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
 * @param titleMenuY
 * @text 标题菜单相对纵向Y位置 (px)
 * @desc 设置标题页面菜单的相对纵向Y位置 ( -2000 ~ ∞ )，默认: 0
 * @type number
 * @default 0
 * @min -2000
 *
 * @param ioWindowW
 * @text 输入窗口总宽度 (px)
 * @desc 导入或导出窗口的总宽度，根据游戏需求调节，默认: 600
 * @type number
 * @default 600
 * @min 100
 *
 * @param ioWindowH
 * @text 输入窗口总高度 (px)
 * @desc 导入或导出窗口的总高度，根据游戏需求调节，默认: 300
 * @type number
 * @default 300
 * @min 50
 *
 * @param ioWindowPadding
 * @text 输入窗口内边距 (cm)
 * @desc 导入或导出窗口的内边距，用于调整窗口背景遮罩操作层大小，默认: 2
 * @type number
 * @default 2
 * @min 1
 
 * @help
 * 提供 PC 端和移动端之间游戏存档的 json 格式文本导入导出功能
 * 导入或导出窗口可以点击文本框以外的黑色遮罩区域关闭
 * ----------------------------------------------------------------
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
var commandWindow = commandWindow;

MoekaiSaveIO.Param = MoekaiSaveIO.Param || {};
MoekaiSaveIO.Parameters = PluginManager.parameters('MoekaiSaveIO');
MoekaiSaveIO.Param.titleMenuY = Number(MoekaiSaveIO.Parameters['titleMenuY']) || 0;
MoekaiSaveIO.Param.ioWindowW = Number(MoekaiSaveIO.Parameters['ioWindowW']) || 600;
MoekaiSaveIO.Param.ioWindowH = Number(MoekaiSaveIO.Parameters['ioWindowH']) || 300;
MoekaiSaveIO.Param.ioWindowPadding = Number(MoekaiSaveIO.Parameters['ioWindowPadding']) || 2;

MoekaiSaveIO.SaveManage = MoekaiSaveIO.SaveManage || {};
MoekaiSaveIO.JavaScript = MoekaiSaveIO.JavaScript || {};
MoekaiSaveIO.Strings = MoekaiSaveIO.Strings || {};

MoekaiSaveIO.Strings.saveMaxCount = DataManager.maxSavefiles();
MoekaiSaveIO.Strings.Import = '导入存档';
MoekaiSaveIO.Strings.Export = '导出存档';

//=============================================================
// 重写JS方法
//=============================================================
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, firstSource) {
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
    isEmpty: function(obj, type) {
        try {
            type = type || 'string';
            return typeof obj != type || obj == null || obj.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') == "";
        } catch (e) {
            return false;
        }
    },

    toast: function(msg, duration) {
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

    copyStr: function(str, tips, tipsduration, closecallback) {
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
        oCopy.onclick = function(e) {
            if (e.srcElement.localName != 'textarea') {
                if (typeof closecallback == 'function') {
                    if (!closecallback(document.getElementById('mkcopy').value)) {
                        commandWindow._commandWindow.activate();
                        this.remove();
                    }
                } else {
                    commandWindow._commandWindow.activate();
                    this.remove();
                }
                e.preventDefault();
            }
        }
        oBody.appendChild(oCopy);
        document.getElementById('mkcopy').select();

        if (!this.isEmpty(tips))
            this.toast(tips, tipsduration);
    }
};

//=============================================================
// 标题页面菜单创建
//=============================================================
MoekaiSaveIO.TitleCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    MoekaiSaveIO.TitleCommandList.call(this);
    this.addCommand(MoekaiSaveIO.Strings.Import, 'saveIOMenuImport');
    this.addCommand(MoekaiSaveIO.Strings.Export, 'saveIOMenuExport');
};

MoekaiSaveIO.TitleUpdatePlacement = Window_TitleCommand.prototype.updatePlacement;
Window_TitleCommand.prototype.updatePlacement = function() {
    MoekaiSaveIO.TitleUpdatePlacement.call(this);
    this.y += MoekaiSaveIO.Param.titleMenuY;
};

//=============================================================
// 导入导出游戏存档
// savefileId:
// -1         Config
//  0         Global
//  1~20   Save data id
//=============================================================
MoekaiSaveIO.SaveManage = {

    loadGlobalInfo: function(saveobj) {
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

    loadFromLocalFile: function(savefileId) {
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

    loadFromWebStorage: function(savefileId) {
        var key = StorageManager.webStorageKey(savefileId);
        var data = localStorage.getItem(key);
        return data;
    },

    load: function(savefileId) {
        if (StorageManager.isLocalMode()) {
            return this.loadFromLocalFile(savefileId);
        } else {
            return this.loadFromWebStorage(savefileId);
        }
    },

    applyConfig: function(saveobj) {
        var json;
        var config = {};
        json = LZString.decompressFromBase64(saveobj.c);
        if (!MoekaiSaveIO.JavaScript.stringHelper.isEmpty(json)) {
            config = JSON.parse(json);
            ConfigManager.applyData(config);
        }
    },

    isThisGameFile: function(savefileId, saveobj) {
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

    $import: function() {
        MoekaiSaveIO.JavaScript.stringHelper.copyStr('', "请粘贴Json文本存档，粘贴后按文本框外导入存档，注意！这会覆盖当前所有存档！你可以先导出现在已有都存档再来导入！", 8000, function(input) {
            try {
                if (MoekaiSaveIO.JavaScript.stringHelper.isEmpty(input)) {
                    MoekaiSaveIO.JavaScript.stringHelper.toast('没东西导入...')
                    return;
                } else if (!confirm('真的确定要导入这个存档吗？\r\n要退出导入请删除全部内容再点文本框外退出。'))
                    return 1;

                var count = 0;
                var saveObj = JSON.parse(input) || {};
                var o_globalInfo = DataManager.loadGlobalInfo();
                var globalInfo = MoekaiSaveIO.SaveManage.loadGlobalInfo(saveObj);
                if (globalInfo.length < 1) {
                    MoekaiSaveIO.JavaScript.stringHelper.toast('导入失败！填入的存档缺少记录信息，或者存档是空的！');
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
                    MoekaiSaveIO.JavaScript.stringHelper.toast(`导入了 ${count} 个存档！<br/>正在重载游戏！`);

                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                } else {
                    DataManager.saveGlobalInfo(o_globalInfo);
                    MoekaiSaveIO.JavaScript.stringHelper.toast('存档数据有误？<br/>什么都没有导入...')
                }
            } catch (e) {
                MoekaiSaveIO.JavaScript.stringHelper.toast(`导入错误！格式不正确！<br/>${e.message}`)
            }
        });
    },

    $export: function() {
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
        MoekaiSaveIO.JavaScript.stringHelper.copyStr(saveJson, "复制全部存档文本，然后可以通过导入存档进行导入，点击文本框边缘可以关闭窗口", 3800);
    }
};

//=============================================================
// 菜单事件绑定
//=============================================================
MoekaiSaveIO.Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    MoekaiSaveIO.Scene_Title_createCommandWindow.call(this);

    this._commandWindow.setHandler('saveIOMenuImport', this.saveImport.bind(this));
    this._commandWindow.setHandler('saveIOMenuExport', this.saveExport.bind(this));
};

Scene_Title.prototype.saveImport = function() {
    Input.clear();
    TouchInput.clear();
    commandWindow = this;
    MoekaiSaveIO.SaveManage.$import();
};

Scene_Title.prototype.saveExport = function() {
    Input.clear();
    TouchInput.clear();
    commandWindow = this;
    MoekaiSaveIO.SaveManage.$export();
};
