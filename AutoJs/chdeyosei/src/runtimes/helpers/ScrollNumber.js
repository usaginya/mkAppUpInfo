/**
 * @class ScrollNumber
 * @author YIU、耗子cn
 * @description 滚动数字增加特效
 * @param {string} textId - text控件id
 * @param {object} options - 自定义参数 相当于新text对象
 * @property {number} text.value - <float> 目标数值
 * @property {number} text.time - <int> 动画持续时间
 * @property {number} text.digit - <float> 保留小数位数
 * @property {number} text.start - <float> 起始数值
 * @property {number} text.hz - <int> 动画更新频率 越小速度越快 默认30Hz 60Hz性价比最高
 * @method NumberGrow - 动态更新text显示数值
 * @see https://github.com/zhanhgao/scrollNumber
 */
function ScrollNumber(textId, options) {
    this.textId = textId;
    this.options = options || {};
}

ScrollNumber.prototype.NumberGrow = function () {
    if (typeof (this.textId) !== "string" || this.textId.length < 1) {
        throw new Error('ScrollNumber 请在本类的第一个参数填text控件id字符串');
    }

    let view = ui[this.textId],
        _hz = this.options.hz || view.hz || 30, //60Hz性价比最高。mac可达到47.95 https://support.apple.com/zh-cn/HT210742
        time = this.options.time || view.time || 1, //动画持续时间
        num = this.options.num || view.value || 0, //要显示的目标数值
        digit = this.options.digit || view.digit || 0, //小数点后几位增长
        start = this.options.start || Math.floor(view.getText().toString()) || 0, //开始值
        step = (num - (start > num ? num - 1 : start)) * _hz / (time * 1000),
        interval, //定时器
        old = 0,
        maxSafeFloat = Math.floor(Number.MAX_SAFE_INTEGER / 64); //最大安全值

    //限制目标范围在安全值(2^47-1 = 140737488355327)防止无限计时
    if (num > maxSafeFloat) {
        num = maxSafeFloat;
        log('ScrollNumber 目标值已超出安全值');
    }

    if (num < 0 || isNaN(step) || isNaN(0 - digit)) {
        log('ScrollNumber 参数值错误');
        return;
    }

    interval = setInterval(function () {
        start = start + step;
        if (start >= num) {
            clearInterval(interval);
            interval = undefined;
            start = num;
        }

        let t, __time;
        if (digit) {
            __time = Math.pow(10, digit);
            t = Math.floor(start * __time) / __time;
        } else {
            t = Math.floor(start);
        }

        old = t;
        view.setText(old.toString());
    }, _hz);
}

module.exports = ScrollNumber;