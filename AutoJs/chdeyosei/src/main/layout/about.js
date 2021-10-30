module.exports = {
    Show: () => {
        // 将xml渲染为view添加到对话框中
        let view = ui.inflate(
            <card cardBackgroundColor="{{styleColors.mainBackground}}" cardCornerRadius="4">
                <vertical margin="12">

                    <linear w="*">
                        <linear layout_weight="0.2" gravity="center">
                            <img
                                id="imgLogo"
                                w="60" h="60"
                                scaleType="centerCrop"
                                src="{{randomLogo()}}"
                            />
                        </linear>
                        <vertical marginLeft="5" h="*" layout_weight="0.8">
                            <text
                                id="textTitle"
                                gravity="center|top"
                                ellipsize="marquee"
                                textSize="22"
                                textColor="{{styleColors.smoke}}"
                                text="{{resStrings.aboutTitle}}"
                                shadowColor="{{styleColors.textShadow}}"
                                shadowRadius="5"
                            />
                            <text
                                id="textAuthor"
                                w="*" h="*"
                                gravity="center|bottom"
                                ellipsize="marquee"
                                textSize="15"
                                textColor="{{styleColors.sora}}"
                                text="{{resStrings.aboutAuthor}}"
                                shadowColor="{{styleColors.textShadow}}"
                                shadowRadius="3"
                            />
                        </vertical>
                    </linear>

                    <text
                        id="textReadme"
                        w="*"
                        marginTop="12"
                        maxLines="10"
                        textSize="15"
                        textColor="{{styleColors.smoke}}"
                        text="{{resStrings.aboutReadme}}"
                        shadowColor="{{styleColors.textShadow}}"
                        shadowRadius="3"
                        scrollbars="vertical"
                    />

                    <linear id="btnCloseAbout"
                        w="*" h="35"
                        margin="90 12 90 0"
                        layout_gravity="center"
                        gravity="center"
                        clickable="true">
                        <text
                            id="textBtnCloseAbout"
                            text="关 闭"
                            textColor="{{styleColors.smoke}}"
                            textSize="15"
                            shadowColor="{{styleColors.btnTextShadow}}"
                            shadowRadius="3"
                            shadowDy="1"
                        />
                    </linear>
                </vertical>
            </card>
        );

        /**
         * 创建并显示对话框
         * @param customView view对象
         * @param wrapInScrollView view高度超过对话框时是否可滑动
         * @param autoDismiss 按下按钮时是否自动结束对话框
         */
        let dialogExternal = dialogs.build({
            customView: view,
            wrapInScrollView: true,
            autoDismiss: false
        }).show();

        //使文本说明可以滚动
        view.textReadme.setMovementMethod(ScrollingMovementMethod.getInstance());

        //关闭按钮点击事件
        view.btnCloseAbout.on("click", () => {
            ui.post(() => { dialogExternal.dismiss(); }, 100);
        });

        //透明化原始对话框背景
        dialogExternal.getWindow().getDecorView().getBackground().setAlpha(0);

        //设置按钮点击水波颜色
        Shape.widthRipple(activity)
            .setAllRadius(20)
            .setColor(styleColors.btnDefaultBg)
            .setRippleColor(styleColors.white, styleColors.sora)
            .into(view.btnCloseAbout);
    }
}