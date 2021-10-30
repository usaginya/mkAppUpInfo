/**
 * @name 权限申请界面
 */

module.exports = {
    Show: function () {
        ui.layout(
            <frame bg="{{styleColors.mainBackground}}">

                <vertical h="auto" align="top|center" margin="0 50">
                    <text
                        id="textTips"
                        gravity="center"
                        margin="50"
                        maxLines="3"
                        textSize="18"
                        textColor="{{styleColors.smoke}}"
                        shadowColor="{{styleColors.textShadow}}"
                        shadowRadius="3"
                    />

                    <card id="cardBtnBattery"
                        w="*" h="60"
                        margin="50 10"
                        cardCornerRadius="20"
                        layout_gravity="center"
                        cardBackgroundColor="{{styleColors.kohbai}}"
                        foreground="?selectableItemBackground">
                        <text
                            id="textBtnBattery"
                            gravity="center"
                            textColor="{{styleColors.smoke}}"
                            textSize="20"
                            shadowColor="{{styleColors.benitobi}}"
                            shadowRadius="3"
                            shadowDy="1"
                        />
                    </card>

                    <card id="cardBtnFloatyWindow"
                        w="*" h="60"
                        margin="50 10"
                        cardCornerRadius="20"
                        layout_gravity="center"
                        cardBackgroundColor="{{styleColors.kohbai}}"
                        foreground="?selectableItemBackground">
                        <text
                            id="textBtnFloatyWindow"
                            gravity="center"
                            textColor="{{styleColors.smoke}}"
                            textSize="20"
                            shadowColor="{{styleColors.benitobi}}"
                            shadowRadius="3"
                            shadowDy="1"
                        />
                    </card>
                </vertical>

            </frame>
        );

        ui.textTips.setText(resStrings.permissionTips);
        ui.textBtnBattery.setText("忽略电池优化（未优化）");
        ui.textBtnFloatyWindow.setText("悬浮窗权限（未授予）");

        //初始更新按钮状态
        this.Update();

        //请求忽略电池优化
        ui.cardBtnBattery.on("click", () => {
            internalProcess.Permissions.ignoringBatteryOptimizations();
        });

        //请求悬浮窗权限
        ui.cardBtnFloatyWindow.on("click", () => {
            internalProcess.Permissions.floatyPermission();
        });
    },

    /**
     * 更新界面
     */
    Update: function () {

        //更新忽略电池优化按钮
        if ($power_manager.isIgnoringBatteryOptimizations()) {
            ui.textBtnBattery.setText("忽略电池优化（已优化）");
            ui.textBtnBattery.setShadowLayer(10, 0, 3, colors.parseColor(styleColors.veludo));
            ui.cardBtnBattery.setCardBackgroundColor(colors.parseColor(styleColors.moegi));
        }

        //更新悬浮窗权限按钮
        if ($floaty.checkPermission()) {
            ui.textBtnFloatyWindow.setText("悬浮窗权限（已授予）");
            ui.textBtnFloatyWindow.setShadowLayer(10, 0, 3, colors.parseColor(styleColors.veludo));
            ui.cardBtnFloatyWindow.setCardBackgroundColor(colors.parseColor(styleColors.moegi));
        }

    }

}