/**
 * @name 第一屏
 */

 module.exports = {
    Show: () => {
        ui.layout(
            <frame bg="{{styleColors.mainBackground}}">
                <vertical h="auto" margin="0 50">
                    <img
                        w="90" h="90"
                        margin="0 30 0 10"
                        scaleType="centerCrop"
                        layout_gravity="center"
                        src="{{randomLogo()}}"
                    />

                    <text
                        h="68"
                        textSize="40"
                        textColor="{{styleColors.smoke}}"
                        gravity="center"
                        text="{{resStrings.appName}}"
                        shadowColor="{{styleColors.textShadow}}"
                        shadowRadius="12"
                    />
                </vertical>
            </frame>
        );
    }
}