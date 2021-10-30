/**
 * @name 登录界面
 * @param {boolean} 是否自动登录
 */

module.exports = {
    Show: (autoLogin) => {
        ui.layout(
            <frame bg="{{styleColors.mainBackground}}">

                <vertical h="auto" margin="0 50">
                    <img
                        id="imgLogo"
                        w="90" h="90"
                        margin="0 30 0 10"
                        scaleType="centerCrop"
                        layout_gravity="center"
                        src="{{randomLogo()}}"
                        bg="?selectableItemBackground"
                    />

                    <text
                        id="textTitle"
                        h="68"
                        textSize="40"
                        textColor="{{styleColors.smoke}}"
                        gravity="center"
                        text="{{resStrings.appName}}"
                        shadowColor="{{styleColors.textShadow}}"
                        shadowRadius="12"
                    />

                    <linear margin="50 25 50 2">
                        <img
                            id="imgPhoneIco"
                            margin="0 0 8 0"
                            scaleType="center"
                            layout_gravity="center"
                            src="{{resImages.phoneIcon}}"
                        />
                        <input
                            id="inputPhone"
                            w="*" h="50"
                            hint="输入手机号"
                            singleLine="true"
                            inputType="phone"
                            maxLength="13"
                            color="{{styleColors.smoke}}"
                            textColorHint="{{styleColors.inputHintText}}"
                            shadowColor="{{styleColors.textShadow}}"
                            shadowRadius="3"
                        />
                    </linear>

                    <linear margin="50 0">
                        <img
                            id="imgPasswordIco"
                            margin="0 0 8 0"
                            scaleType="center"
                            layout_gravity="center"
                            src="{{resImages.passwordIcon}}"
                        />
                        <input
                            id="inputPassword"
                            w="*" h="50"
                            hint="输入登录密码"
                            password="true"
                            color="{{styleColors.smoke}}"
                            textColorHint="{{styleColors.inputHintText}}"
                            shadowColor="{{styleColors.textShadow}}"
                            shadowRadius="3"
                        />
                    </linear>

                    <linear id="btnLogin"
                        w="120" h="40"
                        margin="0 40"
                        layout_gravity="center"
                        gravity="center"
                        clickable="true"
                    >
                        <text id="textBtnLogin"
                            textColor="{{styleColors.smoke}}"
                            textSize="18"
                            shadowColor="{{styleColors.btnTextShadow}}"
                            shadowRadius="3"
                        />
                    </linear>


                    <progressbar id="pbarLogin"
                        visibility="gone"
                        layout_gravity="center"
                        indeterminateTint="{{styleColors.textShadow}}"
                    />
                </vertical>

            </frame>
        );

        //定向页面为此
        nowUI = this;

        //设置点击水波颜色
        Shape.widthRipple(activity)
            .setAllRadius(20)
            .setColor(styleColors.btnDefaultBg)
            .setRippleColor(styleColors.white, styleColors.sora)
            .into(ui.btnLogin);

        //从存储恢复登录凭证
        let loginCredential = internalProcess.DataManager.readUserLoginCredentials() || {};
        if (loginCredential.pwdhash) {
            ui.inputPhone.setText(loginCredential.phone);
            ui.inputPassword.setText(loginCredential.pwd);
            //自动登录
            if (autoLogin) {
                //sendActionLogin();
            }
        }

        /**
         *  登录按钮点击事件
         */
        ui.btnLogin.on("click", () => {

            //loginCredential.pwdhash = "9a0d36e649c9e59c290360752683997e6dbc7c1916a9451b1c5eb1fab99cbce3";
            if (!checkInput()) { return; }
            setLoginStyle(true);

            ui.post(() => {
                setLoginStyle(false);
                UIHome.Show();

                //存储凭证
                // internalProcess.DataManager.saveUserLoginCredentials(loginCredential);
                // loginCredential = null;
            }, 2000);
        });

        /**
         * 检查输入内容
         */
        function checkInput() {
            let fail, imm;
            if (ui.inputPhone.getText().toString().trim() == '') {
                toast("请输入手机号");
                fail = ui.inputPhone;
                if (ui.inputPhone.hasFocus()) { return false; }
            }
            if (!fail && ui.inputPassword.getText().toString() == '') {
                toast("请输入登录密码");
                fail = ui.inputPassword;
                if (ui.inputPassword.hasFocus()) { return false; }
            }
            if (fail) {
                //输入错误定位并调用输入法
                fail.setFocusable(true);
                fail.setFocusableInTouchMode(true);
                fail.requestFocus();
                imm = context.getApplicationContext().getSystemService(context.INPUT_METHOD_SERVICE);
                imm.showSoftInput(fail, 0);
                imm = null;
                return false;
            }
            return true;
        }

        /**
         * 发送登录令牌到后台
         */
        function sendActionLogin() {
            let args = {};
            args.sourceEngine = engines.myEngine();
            loginCredential.phone = ui.inputPhone.text();
            loginCredential.pwd = ui.inputPassword.text().replace(/<\/?.+?>|[\r\n]/g, "");
            args.loginData = loginCredential;

            setLoginStyle(true);
            //internalProcess.ScriptEngine.emit(engineBgService, resStrings.bgAct.login, args);
        }

        /**
         * 登录响应结果处理
         */
        events.on(resStrings.bgResp.login, args => {

            toastLog("从后台收到了：" + args);
        });

        /** 
         * 设置登录样式(是否正在登录)
         */
        function setLoginStyle(loggingin) {
            let alphaStart = loggingin ? 1 : 0.5;
            let alphaEnd = loggingin ? 0.5 : 1;

            let alphaAnimation = new AlphaAnimation(alphaStart, alphaEnd);
            alphaAnimation.setDuration(300);
            alphaAnimation.setFillAfter(true);

            ui.inputPhone.setEnabled(!loggingin);
            ui.inputPassword.setEnabled(!loggingin);
            ui.btnLogin.setEnabled(!loggingin);

            ui.imgPhoneIco.startAnimation(alphaAnimation);
            ui.inputPhone.startAnimation(alphaAnimation);

            ui.imgPasswordIco.startAnimation(alphaAnimation);
            ui.inputPassword.startAnimation(alphaAnimation);

            ui.btnLogin.startAnimation(alphaAnimation);
            ui.textBtnLogin.setText(loggingin ? "正在登录" : "登 录");

            ui.pbarLogin.setVisibility(loggingin ? View.VISIBLE : View.GONE);
        }

        //点击Logo更换
        ui.imgLogo.on("click", () => {
            if (ui.imgLogo.anirun) { return; }
            ui.imgLogo.anirun = true;

            let alphaAnimation = new AlphaAnimation(1, 0);
            alphaAnimation.setDuration(300);
            alphaAnimation.setFillAfter(true);

            //监听动画事件
            alphaAnimation.setAnimationListener(new Animation.AnimationListener({
                //动画结束后执行
                onAnimationEnd() {
                    //换图后恢复显示
                    alphaAnimation = new AlphaAnimation(0, 1);
                    alphaAnimation.setDuration(300);
                    alphaAnimation.setFillAfter(true);
                    alphaAnimation.setAnimationListener(new Animation.AnimationListener({
                        onAnimationEnd() {
                            ui.imgLogo.anirun = false;
                        }
                    }));
                    ui.imgLogo.attr("src", randomLogo());
                    ui.imgLogo.startAnimation(alphaAnimation);

                }
            }));

            ui.imgLogo.startAnimation(alphaAnimation);
        });

        //首次为非登录状态
        setLoginStyle(false);
    }

}