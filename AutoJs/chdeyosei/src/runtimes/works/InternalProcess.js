/**
 * @name InternalProcess
 * @description 内部工作流程
 * @method Permissions 权限申请
 */

module.exports = {

    /**
     * 权限申请
     */
    Permissions: {

        //正在权限申请界面
        isApplying: false,

        //请求忽略电池优化
        ignoringBatteryOptimizations: function () {
            if (!$power_manager.isIgnoringBatteryOptimizations()) {
                $power_manager.requestIgnoreBatteryOptimizations();
            }
        },

        //请求悬浮窗权限 需重启应用
        floatyPermission: function () {
            if (!$floaty.checkPermission()) {
                $floaty.requestPermission();
            }
        },

        /**
         * 检查需要的权限是否启用 如果没启用则显示权限申请界面
         * @param {*} lastUI 上次界面对象 用于返回界面
         */
        check: function (lastUI) {
            //两个都启用就没事
            if ($power_manager.isIgnoringBatteryOptimizations() && $floaty.checkPermission()) {
                if (this.isApplying) {
                    //申请完成返回上次界面 等待1.5秒为了展示权限按钮的状态
                    this.isApplying = false;
                    UIPermission.Update();
                    ui.post(() => {
                        lastUI.Show();
                    }, 1500);
                }
                return;
            }

            //显示申请界面开始申请权限
            if (!this.isApplying) {
                this.isApplying = true;
                UIPermission.Show();
            }
        }

    },

    /**
     * 脚本控制
     */
    ScriptEngine: {

        /**
         * 获取脚本文件名标识用于查找脚本对象
         * @param {string} path 脚本路径
         */
        getNameFlag: function (path) {
            return path.replace(/[^\\\/]*[\\\/]+/g, '');
        },

        /**
         * 查找脚本 返回第一个找到的脚本对象
         * @param {string} path 脚本路径
         */
        find: function (path) {
            let engine = null;
            engines.all().some(e => {
                if (e.source.toString().indexOf(this.getNameFlag(path)) > 0) {
                    engine = e;
                    return true;
                }
            });
            return engine;
        },

        /**
         * 只运行一次脚本 返回脚本对象 脚本启动需要几秒时间 调用时需要线程调用
         * @param {string} path 脚本路径
         * @param {object} args 传递给脚本的变量参数
         */
        runOnce: function (path, args) {
            args = args || {};
            let engine = this.find(path);
            if (!engine) {
                engine = engines.execScriptFile(path, args);
                //等脚本启动
                for (let i = 0; i < 21; i++) {
                    sleep(100);
                    engine = engine.getEngine();
                    if (engine) { break; }
                }
            }
            return engine;
        },

        /**
         * 停止指定脚本运行
         * @param {object} engine 脚本对象
         */
        stop: function (engine) {
            if (engine) {
                engine.forceStop();
            }
        },

        /**
         * 向指定脚本发送事件参数
         * @param {object} engine 脚本对象
         * @param {string} action 动作
         * @param {object} args 参数
         */
        emit: function (engine, action, args) {
            if (engine) {
                engine.emit(action, args);
            }
        }

    },

    /**
     * 数据管理
     */
    DataManager: {

        /**
         * 存储对象
         */
        storage: storages.create("chd-eyosei:@dataManager"),

        /**
         * 读取保存的登录凭证对象
         * @returns {object} 凭证对象{phone:100,pwd:123}
         */
        readUserLoginCredentials: function () {
            //从存储里取数据
            let loginCredential = this.storage.get("loginCertificate") || {};
            if (!loginCredential.pwdhash) {
                log('读取失败、密码hash为空');
                return {};
            }

            //还原pwd
            try {
                loginCredential.pwd = $crypto.decrypt(
                    loginCredential.pwd,
                    new $crypto.Key(loginCredential.pwdhash),
                    "AES/ECB/PKCS7padding",
                    { output: 'string' }
                );
            } catch (ex) {
                //清除错误的数据
                this.storage.clear();
            }
            //提供凭证
            return loginCredential;
        },

        /**
         * 保存登录凭据
         * @param {object} loginCredential 登录凭据{phone:100,pwd:123,pwdhash:9c6ff...}
         */
        saveUserLoginCredentials: function (loginCredential) {
            loginCredential = loginCredential || {};
            if (!loginCredential.pwdhash) {
                log('保存失败、密码hash为空');
                return;
            }

            //加密保存 hash应该是64字节
            if (loginCredential.pwdhash && loginCredential.pwdhash.length !== 64) {
                log('保存失败、密码hash长度错误');
                return;
            }

            loginCredential.pwdhash = loginCredential.pwdhash.substr(16, 32);

            loginCredential.pwd = $crypto.encrypt(
                loginCredential.pwd,
                new $crypto.Key(loginCredential.pwdhash),
                "AES/ECB/PKCS7padding"
            );

            //存储起来
            this.storage.put("loginCertificate", loginCredential);
        }

    },

    /**
     * 账户管理
     */
    AccountManager: {
        /**
         * 进行登录、登录成功时自动保存登录凭据、登录失败时自动清除保存的登录凭据
         * @param {object} loginCredential 登录凭据
         * @returns {object} 返回登录结果对象 {boolean}success是否登录成功 {string}message登录结果消息
         */
        startLogin: function (loginCredential) {
            let result = {};

            result.success=false;
            result.message='未知错误';
            return result;
        }
    }

};
