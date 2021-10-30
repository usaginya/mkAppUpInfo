/**
 * @name 主界面
 */

ScrollNumber = require("../../runtimes/helpers/ScrollNumber");
FreeToast = require("../../runtimes/helpers/FreeToast");

module.exports = {
    Show: () => {
        ui.layout(
            <drawer id="drawer" bg="{{styleColors.mainBackground}}">

                {/* --- 主页面布局 --- */}
                <vertical>
                    {/* 顶部工具栏 */}
                    <appbar>
                        <toolbar id="toolbar" bg="{{styleColors.mainBackground}}" />
                    </appbar>

                    {/* -- 下拉刷新布局 -- */}
                    <androidx.swiperefreshlayout.widget.SwipeRefreshLayout id="swipe">

                        {/* 用于下拉刷新的独立内部布局 */}
                        <vertical>

                            {/* -- 用户信息区 -- */}
                            <card
                                margin="10 10 10 0"
                                cardElevation="8"
                                cardCornerRadius="12"
                                cardBackgroundColor="{{styleColors.homeCardBg}}"
                            >
                                {/* 卡片背景星空图 */}
                                <img
                                    w="match_parent"
                                    h="match_parent"
                                    scaleType="centerCrop"
                                    src="{{resImages.homeUserInfoBackground}}"
                                />
                                <vertical margin="10">
                                    {/* 用户头像 - 使用双层card实现边框*/}
                                    <card
                                        w="106" h="106"
                                        layout_gravity="center"
                                        cardCornerRadius="80"
                                        cardBackgroundColor="{{styleColors.homeUserAvatarBottomCard}}"
                                    >
                                        <card
                                            w="95" h="95"
                                            layout_gravity="center"
                                            cardCornerRadius="80"
                                            cardBackgroundColor="{{styleColors.ainezumi}}"
                                        >
                                            <img
                                                id="imgUserAvatar"
                                                scaleType="fitCenter"
                                                layout_gravity="center"
                                                src="http://imgsrc.baidu.com/forum/pic/item/91ef76c6a7efce1b54dd4431a451f3deb58f6553.jpg"
                                            />
                                        </card>
                                    </card>
                                    {/* 用户名 */}
                                    <text
                                        id="textUserName"
                                        margin="10 10 10 0"
                                        gravity="center"
                                        maxLines="1"
                                        text="我是帝"
                                        textSize="20"
                                        textColor="{{styleColors.smoke}}"
                                        shadowColor="{{styleColors.textShadow}}"
                                        shadowRadius="4"
                                    />
                                    {/* 公会名 */}
                                    <text
                                        id="textGuildName"
                                        margin="10 5 10 0"
                                        gravity="center"
                                        maxLines="1"
                                        text="萌界网络科技有限公司"
                                        textSize="14"
                                        textColor="{{styleColors.sora}}"
                                        shadowColor="{{styleColors.textShadow}}"
                                        shadowRadius="2"
                                    />
                                </vertical>
                            </card>

                            {/* -- 今日步数区 -- */}
                            <card
                                margin="10 10 10 0"
                                cardElevation="8"
                                cardCornerRadius="12"
                                cardBackgroundColor="{{styleColors.homeCardBg}}"
                            >
                                <horizontal padding="8">
                                    <horizontal>
                                        {/* 今日步数图标标题 */}
                                        <img
                                            w="58" h="58"
                                            scaleType="centerCrop"
                                            src="{{resImages.setpIcon}}"
                                            tint="{{styleColors.sora}}"
                                        />
                                        <text
                                            id="textDaySetp"
                                            maxLines="2"
                                            textSize="20"
                                            textColor="{{styleColors.sora}}"
                                            shadowColor="{{styleColors.textShadow}}"
                                            shadowRadius="4"
                                        />
                                    </horizontal>
                                    {/* 步数显示 */}
                                    <text
                                        id="textSetp"
                                        w="*" h="*"
                                        padding="6 0"
                                        gravity="center"
                                        maxLines="1"
                                        text="0"
                                        textSize="42"
                                        typeface="monospace"
                                        textColor="{{styleColors.textShadow}}"
                                        shadowColor="{{styleColors.textShadow}}"
                                        shadowRadius="8"
                                    />
                                </horizontal>
                            </card>

                            {/* 个人排名显示区 */}
                            <horizontal>
                                {/* -- 左 本公会排名区-- */}
                                <card
                                    layout_weight="1"
                                    margin="10 10 5 10"
                                    cardElevation="8"
                                    cardCornerRadius="12"
                                    cardBackgroundColor="{{styleColors.homeCardBg}}"
                                >
                                    <vertical padding="8">

                                        {/* 本公会排名图标标题 */}
                                        <img
                                            w="32" h="32"
                                            layout_gravity="center"
                                            scaleType="centerCrop"
                                            src="{{resImages.rankIcon}}"
                                            tint="{{styleColors.sora}}"
                                        />
                                        <text
                                            marginTop="3"
                                            gravity="center"
                                            text="在本公会排名"
                                            textSize="14"
                                            textColor="{{styleColors.sora}}"
                                            shadowColor="{{styleColors.textShadow}}"
                                            shadowRadius="3"
                                        />

                                        {/* 名次显示 */}
                                        <text
                                            id="textGuildRank"
                                            w="*" h="*"
                                            padding="6 0"
                                            gravity="center"
                                            maxLines="1"
                                            text="0"
                                            textSize="32"
                                            typeface="monospace"
                                            textColor="{{styleColors.textShadow}}"
                                            shadowColor="{{styleColors.textShadow}}"
                                            shadowRadius="5"
                                        />
                                    </vertical>
                                </card>

                                {/* -- 右 本小组排名区-- */}
                                <card
                                    layout_weight="1"
                                    margin="5 10 10 10"
                                    cardElevation="8"
                                    cardCornerRadius="12"
                                    cardBackgroundColor="{{styleColors.homeCardBg}}"
                                >
                                    <vertical padding="8">

                                        {/* 本小组排名图标标题 */}
                                        <img
                                            w="32" h="32"
                                            layout_gravity="center"
                                            scaleType="centerCrop"
                                            src="{{resImages.rankIcon}}"
                                            tint="{{styleColors.sora}}"
                                        />
                                        <text
                                            marginTop="3"
                                            gravity="center"
                                            text="在本小组排名"
                                            textSize="14"
                                            textColor="{{styleColors.sora}}"
                                            shadowColor="{{styleColors.textShadow}}"
                                            shadowRadius="3"
                                        />

                                        {/* 名次显示 */}
                                        <text
                                            id="textGroupRank"
                                            w="*" h="*"
                                            padding="6 0"
                                            gravity="center"
                                            maxLines="1"
                                            text="0"
                                            textSize="32"
                                            typeface="monospace"
                                            textColor="{{styleColors.textShadow}}"
                                            shadowColor="{{styleColors.textShadow}}"
                                            shadowRadius="5"
                                        />
                                    </vertical>
                                </card>
                            </horizontal>

                            {/* -- 最后更新时间显示区 -- */}
                            <card
                                margin="10"
                                cardElevation="8"
                                cardCornerRadius="12"
                                cardBackgroundColor="{{styleColors.homeCardBg}}"
                            >
                                <horizontal padding="8">
                                    <img
                                        w="20" h="20"
                                        layout_gravity="center"
                                        scaleType="centerCrop"
                                        src="@drawable/ic_access_time_black_48dp"
                                        tint="{{styleColors.ainezumi}}"
                                    />
                                    <text
                                        margin="3 0"
                                        gravity="center"
                                        text="最后更新时间"
                                        textSize="14"
                                        textColor="{{styleColors.ainezumi}}"
                                        shadowColor="{{styleColors.ainezumi}}"
                                        shadowRadius="3"
                                    />
                                    <text
                                        id="textUpdateTime"
                                        w="*" h="*"
                                        margin="5 0"
                                        gravity="center"
                                        text="-"
                                        textSize="14"
                                        textColor="{{styleColors.ainezumi}}"
                                        shadowColor="{{styleColors.ainezumi}}"
                                        shadowRadius="3"
                                    />
                                </horizontal>
                            </card>

                        </vertical>
                    </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>
                </vertical>

                {/* 侧边栏布局 */}
                <vertical layout_gravity="left" w="280" bg="{{styleColors.mainBackground}}">
                    {/* 顶部应用图标背景 */}
                    <frame w="280" h="200">
                        <img
                            id="imgMenuBg"
                            scaleType="center"
                            clickable="true"
                            src="{{resImages.sidebarTopBackground}}"
                        />
                        <vertical id="drawerHead" bg="?selectableItemBackground">
                            <img
                                id="imgAppIcon"
                                w="64" h="64"
                                margin="10 28 10 12"
                                scaleType="centerCrop"
                                layout_gravity="center"
                                src="{{randomLogo()}}"
                            />
                            <text
                                id="textAppName"
                                gravity="center"
                                textSize="25"
                                textColor="{{styleColors.smoke}}"
                                text="{{resStrings.appName}}"
                                shadowColor="{{styleColors.textShadow}}"
                                shadowRadius="5"
                            />
                            <text
                                id="textAppVer"
                                gravity="center"
                                marginTop="5"
                                textSize="15"
                                textColor="{{styleColors.smoke}}"
                                text="{{resStrings.appVerName}}"
                                shadowColor="{{styleColors.textShadow}}"
                                shadowRadius="3"
                            />
                        </vertical>
                    </frame>

                    {/* 菜单列表项 */}
                    <list id="menu">
                        <horizontal id="menuItem" w="*" clickable="true">
                            <img
                                w="55" h="55"
                                padding="16"
                                src="{{this.icon}}"
                                tint="{{styleColors.textShadow}}"
                            />
                            <text
                                layout_gravity="center"
                                textSize="17"
                                text="{{this.title}}"
                                textColor="{{styleColors.smoke}}"
                                shadowColor="{{styleColors.textShadow}}"
                                shadowRadius="3"
                            />
                        </horizontal>
                    </list>
                </vertical>

            </drawer>
        );

        //定向页面为此
        nowUI = this;

        //设置文本
        ui.textDaySetp.setText("今日\n步数");

        //左上角菜单按钮打开侧拉菜单
        ui.toolbar.setupWithDrawer(ui.drawer);

        //设置侧边栏菜单项
        ui.menu.setDataSource([
            {
                title: "切换账号",
                icon: "@drawable/ic_transfer_within_a_station_black_48dp"
            },
            {
                title: "关于",
                icon: "@drawable/ic_brightness_4_black_48dp"
            },
            {
                title: "退出",
                icon: "@drawable/ic_exit_to_app_black_48dp"
            }
        ]);

        //返回键控制侧边栏菜单
        ui.emitter.on("back_pressed", function (e) {
            //判断抽屉是否打开
            if (ui.drawer.isDrawerOpen(3)) {
                //返回键关闭抽屉
                ui.drawer.closeDrawer(3);
                //取消返回
                e.consumed = true;
            }
        });

        //设置侧边栏菜单点击水波颜色
        ui.post(() => {
            let menuItemCount = ui.menu.getChildCount();
            for (let i = 0; i < menuItemCount; i++) {
                let item = ui.menu.getChildAt(i);
                Shape.widthRipple(activity)
                    .setColor(styleColors.mainBackground)
                    .setRippleColor(styleColors.white, styleColors.btnDefaultBg)
                    .into(item);
            }
        }, 100);

        //设置下拉控件背景色
        ui.swipe.setProgressBackgroundColorSchemeColor(colors.parseColor(styleColors.aisumicha));

        //设置下拉控件圆圈颜色
        ui.swipe.setColorSchemeColors(
            colors.parseColor(styleColors.kohbai),
            colors.parseColor(styleColors.moegi),
            colors.parseColor(styleColors.sora),
            colors.parseColor(styleColors.sakura)
        );

        //监听下拉刷新事件
        ui.swipe.setOnRefreshListener({
            onRefresh: function () {
                //为了看效果延迟一下
                setTimeout(function () {

                    ui.textSetp.value = "18236";
                    ui.textGuildRank.value = "16";
                    ui.textGroupRank.value = "9";

                    let setpNumber = new ScrollNumber("textSetp"),
                        guildRankNumber = new ScrollNumber("textGuildRank"),
                        groupRankNumber = new ScrollNumber("textGroupRank");

                    setpNumber.NumberGrow();
                    guildRankNumber.NumberGrow();
                    groupRankNumber.NumberGrow();

                    setpNumber = null;
                    guildRankNumber = null;
                    groupRankNumber = null;

                    //获取当前时间
                    let simpleDateFormat = new java.text.SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
                    let date = new Date(java.lang.System.currentTimeMillis());
                    ui.textUpdateTime.setText(simpleDateFormat.format(date));

                    //收起下拉控件
                    ui.swipe.setRefreshing(false);
                }, 2333);
            },
        });

        //侧边栏菜单项点击事件
        ui.menu.on("item_click", item => {
            switch (item.title) {
                case "切换账号":
                    dialogs.confirm("切换账号", "确定要退出当前账号吗？", (select) => {
                        if (select) {
                            toast("//TODO 退出账号操作");
                        }
                    });
                    break;

                case "关于":
                    UIAbout.Show();
                    break;

                case "退出":
                    dialogs.confirm("退出", "确定要退出吗？\n退出后将不再自动刷新华电e家步数", (select) => {
                        if (select) {

                            //结束后台脚本线程
                            internalProcess.ScriptEngine.stop(engineBgService);

                            ui.finish();
                        }
                    });
                    break;
            }
        });

        //监听侧边栏事件
        ui.drawer.addDrawerListener(new DrawerLayout.SimpleDrawerListener({
            //被关闭
            onDrawerClosed: function (drawerView) {
                //设置侧边栏顶部随机图标
                drawerView.imgAppIcon.attr("src", randomLogo());

                //隐藏侧边栏顶部背景图
                if (ui.imgMenuBg.isShow) {
                    drawerBackgroundShow();
                }
            }
        }));

        //点击侧边栏顶部背景信息层事件
        ui.drawerHead.on("click", () => {
            //显示或隐藏背景图
            drawerBackgroundShow();
        });

        /**
         * 显示或隐藏侧边栏顶部背景图
         */
        function drawerBackgroundShow() {
            let backgroundAlphaStart = ui.imgMenuBg.isShow ? 1 : 0.1,
                backgroundAlphaEnd = ui.imgMenuBg.isShow ? 0.1 : 1;

            let backgroundAlphaAnimation = new AlphaAnimation(backgroundAlphaStart, backgroundAlphaEnd),
                foregroundAlphaAnimation = new AlphaAnimation(backgroundAlphaEnd, backgroundAlphaStart);

            backgroundAlphaAnimation.setDuration(380);
            foregroundAlphaAnimation.setDuration(380);

            backgroundAlphaAnimation.setFillAfter(true);
            foregroundAlphaAnimation.setFillAfter(true);

            ui.imgMenuBg.startAnimation(backgroundAlphaAnimation);
            ui.drawerHead.startAnimation(foregroundAlphaAnimation);

            ui.imgMenuBg.isShow = !ui.imgMenuBg.isShow;
        }



        //初始化时隐藏侧边栏顶部背景图
        ui.imgMenuBg.isShow = true;
        drawerBackgroundShow();


        //ceshi 自定义toast
        ui.imgUserAvatar.on("click", () => {
            let toastOptions = {};
            toastOptions.text = "e家步数：999990步\n本公会排名：102名\n本小组排名：99名";
            toastOptions.textSize = 14;
            toastOptions.iconSrc = randomLogo();
            toastOptions.iconSize = "36";
            toastOptions.offsetY = 180;

            new FreeToast(toastOptions).Show();

            //测试 发送请求到后台脚本
            //internalProcess.ScriptEngine.emit(engineBgService, 'getEdata', engines.myEngine());
        });

        //监听后台脚本传递来的数据
        /*events.on('dataBgServer', args => {
            toastLog("从后台收到了：" + args);
        });*/

    }
}