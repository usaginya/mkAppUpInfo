/**
 * @class FreeToast
 * @author YIU
 * @version 1.0.0
 * @description 自定义Toast
 * @param {object} options 自定义参数组
 * @param {View} customLayoutView 自定义Toast布局 使用 ui.inflate(xml) 创建
 * @property {string} options.background Toast背景色
 * @property {string} options.cornerRadius Toast圆角弧度
 * @property {string} options.iconSrc 图标img.src
 * @property {string} options.iconTint 图标上色颜色
 * @property {string} options.iconCircle 是否为圆形图标
 * @property {string} options.iconSize 图标大小 如20 则为 w=20 h=20
 * @property {string} options.text 提示内容文本
 * @property {string} options.textSize 文本大小
 * @property {string} options.textColor 文本颜色
 * @property {string} options.textStyle 文本样式
 * @property {string} options.textShadowColor 文本阴影色
 * @property {string} options.textShadowRadius 文本阴影模糊度
 * @property {number} options.offsetY Toast底部偏移距离
 */

importClass(android.widget.Toast);
importClass(android.view.Gravity);

function FreeToast(options, customLayoutView) {
    this.options = {};
    this.mToast = Toast.makeText(context.getApplicationContext(), "toast", Toast.LENGTH_LONG);

    if (customLayoutView) {
        this.view = customLayoutView;
    } else {
        this.options.background = options.background || "#CC1E1428";
        this.options.cornerRadius = options.cornerRadius || "8";
        this.options.iconSrc = options.iconSrc || "@drawable/ic_info_outline_black_48dp";
        this.options.iconTint = options.iconTint || "#00000000";
        this.options.iconCircle = options.iconCircle || "false";
        this.options.iconSize = options.iconSize || "26";
        this.options.text = options.text || "";
        this.options.textSize = options.textSize || "16";
        this.options.textColor = options.textColor || "#eeeeee";
        this.options.textStyle = options.textStyle || "normal";
        this.options.textShadowColor = options.textShadowColor || "#18FFEE";
        this.options.textShadowRadius = options.textShadowRadius || "3";

        this.view = ui.inflate(
            <card
                cardBackgroundColor={this.options.background}
                cardCornerRadius={this.options.cornerRadius}
            >
                <horizontal margin="6">
                    <img
                        margin="3 0"
                        gravity="center"
                        layout_gravity="center"
                        w={this.options.iconSize}
                        h={this.options.iconSize}
                        src={this.options.iconSrc}
                        tint={this.options.iconTint}
                        circle={this.options.iconCircle}
                    />
                    <text
                        id="freeToastText"
                        marginRight="5"
                        gravity="center"
                        layout_gravity="center|left"
                        textSize={this.options.textSize}
                        textColor={this.options.textColor}
                        textStyle={this.options.textStyle}
                        shadowColor={this.options.textShadowColor}
                        shadowRadius={this.options.textShadowRadius}
                    />
                </horizontal>
            </card>
        );
    }
    this.options.offsetY = this.options.offsetY || options.offsetY || 100;
    this.view.freeToastText.setText(this.options.text);

    this.mToast.setView(this.view);
    this.mToast.setGravity(Gravity.BOTTOM | Gravity.CENTER, 0, this.options.offsetY);
}

/**
 * 显示Toast
 */
FreeToast.prototype.Show = function () {
    this.mToast.show();
}

module.exports = FreeToast;