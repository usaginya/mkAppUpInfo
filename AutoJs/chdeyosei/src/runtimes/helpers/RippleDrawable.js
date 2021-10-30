/**
 * var shape = require("./RippleDrawable")
 * shape.widthRipple(activity).setRippleColor("#FFFFFF","#303F9F").into(ui.view)
 */
importClass(Packages.android.graphics.drawable.GradientDrawable);
importClass(Packages.android.graphics.LinearGradient);
importClass(Packages.android.graphics.Shader);
importClass(Packages.android.graphics.Paint);
importClass(Packages.android.graphics.drawable.LayerDrawable);
importClass(Packages.android.graphics.drawable.RippleDrawable);

var drawable = {};

function dp2px(context, value) {
    if (value <= 0) {
        return 0;
    }
    var density = context.getResources().getDisplayMetrics().density;
    return value * density + 0.5;
}

function toJavaIntArray(arr) {
    var javaArr = util.java.array("int", arr.length);
    for (var i = 0; i < arr.length; i++) {
        javaArr[i] = arr[i];
    }
    return javaArr;
}

function toJavaFloatArray(arr) {
    var javaArr = util.java.array("float", arr.length);
    for (var i = 0; i < arr.length; i++) {
        javaArr[i] = arr[i];
    }
    return javaArr;
}

function check(params) {
    return params != undefined && params != null;
}

var orientationMap = {
    top_bottom: android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM,
    tr_bl: android.graphics.drawable.GradientDrawable.Orientation.TR_BL,
    right_left: android.graphics.drawable.GradientDrawable.Orientation.RIGHT_LEFT,
    br_tl: android.graphics.drawable.GradientDrawable.Orientation.BR_TL,
    bottom_top: android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP,
    bl_tr: android.graphics.drawable.GradientDrawable.Orientation.BL_TR,
    left_right: android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT,
    tl_br: android.graphics.drawable.GradientDrawable.Orientation.TL_BR
};

let whiteColor = colors.parseColor("#50FFFFFF");

function JsDrawable(context) {
    JsDrawable.context = context;
    JsDrawable.defaultColors = [whiteColor, whiteColor];
    JsDrawable.colors = [];
    JsDrawable.radius = [];
    JsDrawable.strokeWidth = 0;
    JsDrawable.strokeColor = -1;
    JsDrawable.strokeDashWidth = 0;
    JsDrawable.strokeDashGap = 0;
    JsDrawable.rippleColors = [colors.parseColor("#4e000000"), colors.parseColor("#4e000000")];
    JsDrawable.orientation;
    JsDrawable.gradientStrokeOrientation;
    JsDrawable.isDrawLine = false;
    JsDrawable.textColors = [];
    JsDrawable.gradientStrokeColors = [];

    JsDrawable.prototype.setGradientStrokeColor = function () {
        JsDrawable.isDrawLine = false;
        JsDrawable.gradientStrokeColors = [];
        for (let index = 0; index < arguments.length; index++) {
            JsDrawable.gradientStrokeColors.push(colors.parseColor(arguments[index]));
        }
        return this;
    }

    JsDrawable.prototype.setGradientStrokeOrientation = function (orientation) {
        JsDrawable.isDrawLine = false;
        var iori = orientationMap[orientation];
        if (iori == undefined) {
            iori = android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT;
        }
        JsDrawable.gradientStrokeOrientation = iori;
        return this;
    }

    JsDrawable.prototype.setStrokeWidth = function (strokeWidth) {
        JsDrawable.isDrawLine = false;
        JsDrawable.strokeWidth = dp2px(JsDrawable.context, strokeWidth);
        return this;
    }

    JsDrawable.prototype.setTextColor = function () {
        JsDrawable.isDrawLine = false;
        let len = arguments.length;
        JsDrawable.textColors = [];
        if (len > 0) {
            if (len == 1) {
                JsDrawable.textColors = [colors.parseColor(arguments[0]), colors.parseColor(arguments[0])];
            } else {
                for (let index = 0; index < len; index++) {
                    JsDrawable.textColors.push(colors.parseColor(arguments[index]));
                }
            }
        }
        return this;
    }

    JsDrawable.prototype.line = function (strokeColor, strokeDashWidth, strokeDashGap) {
        JsDrawable.isDrawLine = true;
        JsDrawable.strokeColor = colors.parseColor(strokeColor);
        JsDrawable.strokeDashWidth = dp2px(JsDrawable.context, strokeDashWidth);
        JsDrawable.strokeDashGap = dp2px(JsDrawable.context, strokeDashGap);
        return this;
    }

    JsDrawable.prototype.setRippleColor = function () {
        JsDrawable.isDrawLine = false;
        let len = arguments.length;
        if (len > 0) {
            let color = (len > 1) ? colors.parseColor(arguments[1]) : colors.parseColor(arguments[0]);
            JsDrawable.rippleColors = [colors.parseColor(arguments[0]), color];
        }
        return this;
    }

    JsDrawable.prototype.setStroke = function (strokeWidth, strokeColor) {
        JsDrawable.isDrawLine = false;
        JsDrawable.strokeWidth = dp2px(JsDrawable.context, strokeWidth);
        JsDrawable.strokeColor = colors.parseColor(strokeColor);
        return this;
    }

    JsDrawable.prototype.setDash = function (dashWidth, dashGap) {
        JsDrawable.isDrawLine = false;
        JsDrawable.strokeDashWidth = dp2px(JsDrawable.context, dashWidth);
        JsDrawable.strokeDashGap = dp2px(JsDrawable.context, dashGap);
        return this;
    }

    JsDrawable.prototype.setColor = function () {
        JsDrawable.isDrawLine = false;
        JsDrawable.colors = [];
        for (let index = 0; index < arguments.length; index++) {
            JsDrawable.colors.push(colors.parseColor(arguments[index]));
        }
        if (JsDrawable.colors.length == 1) {
            JsDrawable.colors.push(colors.parseColor(arguments[0]));
        }
        return this;
    }

    JsDrawable.prototype.setAllRadius = function (radius) {
        JsDrawable.isDrawLine = false;
        this.setRadius(radius, radius, radius, radius, radius, radius, radius, radius);
        return this;
    }

    JsDrawable.prototype.setRadius = function () {
        JsDrawable.isDrawLine = false;
        let n = arguments.length;
        JsDrawable.radius = [];
        if (n > 0) {
            for (let index = 0; index < arguments.length; index++) {
                JsDrawable.radius.push(dp2px(JsDrawable.context, arguments[index]));
            }
            let n1 = 8 - n;
            if (n1 > 0) {
                for (let index = 0; index < n1; index++) {
                    JsDrawable.radius.push(0);
                }
            }
        }
        return this;
    }

    JsDrawable.prototype.setOrientation = function (orientation) {
        JsDrawable.isDrawLine = false;
        var iori = orientationMap[orientation];
        if (iori == undefined) {
            iori = android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT;
        }
        JsDrawable.orientation = iori;
        return this;
    }

    JsDrawable.prototype.into = function () {
        for (let index = 0; index < arguments.length; index++) {
            if (JsDrawable.isDrawLine) {
                arguments[index].setBackground(this.getLineDrawable(arguments[index]));
            }
            else {
                arguments[index].setBackground(this.getRippleDrawable());

                if (check(JsDrawable.textColors) && JsDrawable.textColors.length > 0) {
                    let textView = arguments[index];
                    let jf = new Packages.java.lang.Float(0);
                    var mLinearGradient = new LinearGradient(jf, jf, new Packages.java.lang.Float(textView.getPaint().getTextSize() * textView.getText().length), jf, toJavaIntArray(JsDrawable.textColors), null, Shader.TileMode.CLAMP);
                    textView.getPaint().setShader(mLinearGradient);
                    textView.invalidate();
                }
            }
        }
    }

    JsDrawable.prototype.intoGradientStroke = function () {
        if (check(JsDrawable.gradientStrokeColors) && JsDrawable.gradientStrokeColors.length > 0) {
            for (let index = 0; index < arguments.length; index++) {
                var bgDrawable = new GradientDrawable();
                bgDrawable.setDither(true);
                if (check(JsDrawable.colors) && JsDrawable.colors.length >= 2) {
                    bgDrawable.setColors(toJavaIntArray(JsDrawable.gradientStrokeColors));
                }
                if (check(JsDrawable.radius) && JsDrawable.radius.length > 0) {
                    bgDrawable.setCornerRadii(toJavaFloatArray(JsDrawable.radius));
                }
                if (check(JsDrawable.orientation)) {
                    bgDrawable.setOrientation(JsDrawable.orientation);
                }

                var foreDrawable2 = new GradientDrawable();
                foreDrawable2.setDither(true);
                if (check(JsDrawable.radius) && JsDrawable.radius.length > 0) {
                    foreDrawable2.setCornerRadii(toJavaFloatArray(JsDrawable.radius));
                }
                if (check(JsDrawable.colors) && JsDrawable.colors.length >= 2) {
                    foreDrawable2.setColors(toJavaIntArray(JsDrawable.colors));
                }
                if (check(JsDrawable.gradientStrokeOrientation)) {
                    foreDrawable2.setOrientation(JsDrawable.gradientStrokeOrientation);
                }

                var width = JsDrawable.strokeWidth;
                var layerDrawable = new LayerDrawable([bgDrawable, foreDrawable2]);
                layerDrawable.setLayerInset(1, width, width, width, width);
                arguments[index].setLayerType(1, null);
                arguments[index].setBackground(this.getRippleDrawable(layerDrawable));
                if (check(JsDrawable.textColors) && JsDrawable.textColors.length > 0) {
                    let textView = arguments[index];
                    let jf = new Packages.java.lang.Float(0);
                    var mLinearGradient = new LinearGradient(jf, jf, new Packages.java.lang.Float(textView.getPaint().getTextSize() * textView.getText().length), jf, toJavaIntArray(JsDrawable.textColors), null, Shader.TileMode.CLAMP);
                    textView.getPaint().setShader(mLinearGradient);
                    textView.invalidate();
                }
            }
        }
    }

    JsDrawable.prototype.getLineDrawable = function (view) {
        let params = view.getLayoutParams();
        var lineDrawable = new GradientDrawable();
        let strokeWidth = dp2px(JsDrawable.context, 2);
        if (params.height == -1 || params.height == -2) {
            params.height = strokeWidth + 2;
            view.setLayoutParams(params);
        } else {
            strokeWidth = params.height - 1;
        }
        lineDrawable.setStroke(strokeWidth, JsDrawable.strokeColor,
            new Packages.java.lang.Float(JsDrawable.strokeDashWidth),
            new Packages.java.lang.Float(JsDrawable.strokeDashGap));
        lineDrawable.setShape(GradientDrawable.LINE);
        view.setLayerType(1, null);
        return lineDrawable;
    }

    JsDrawable.prototype.getDrawable = function () {
        var gradientDrawable = new GradientDrawable();
        gradientDrawable.setDither(true);
        if (check(JsDrawable.colors) && JsDrawable.colors.length >= 2) {
            gradientDrawable.setColors(toJavaIntArray(JsDrawable.colors));
        }
        if (check(JsDrawable.radius) && JsDrawable.radius.length > 0) {
            gradientDrawable.setCornerRadii(toJavaFloatArray(JsDrawable.radius));
        }
        if (check(JsDrawable.orientation)) {
            gradientDrawable.setOrientation(JsDrawable.orientation);
        }
        gradientDrawable.setStroke(JsDrawable.strokeWidth, JsDrawable.strokeColor, JsDrawable.strokeDashWidth, JsDrawable.strokeDashGap);
        return gradientDrawable;
    }

    JsDrawable.prototype.getRippleDrawable = function () {
        let gradientDrawable = arguments.length == 0 ? this.getDrawable() : arguments[0];
        if (device.sdkInt >= 21) {
            try {
                if (check(JsDrawable.colors) && JsDrawable.colors.length == 0) {
                    gradientDrawable.setColors(toJavaIntArray(JsDrawable.defaultColors));
                }
            } catch (error) {

            }
            var stateList = [
                [android.R.attr.state_pressed],
                [android.R.attr.state_focused],
                [android.R.attr.state_activated],
                [],
            ];
            var normalColor = JsDrawable.rippleColors[0];
            var pressedColor = JsDrawable.rippleColors[1];
            var stateColorList = [
                pressedColor,
                pressedColor,
                pressedColor,
                normalColor
            ];
            var colorStateList = new Packages.android.content.res.ColorStateList(stateList, stateColorList);
            var rippleDrawable = new RippleDrawable(colorStateList, gradientDrawable, null);
            return rippleDrawable;
        }
        return gradientDrawable;
    }
}

drawable.widthRipple = function (context) {
    return new JsDrawable(context);
}

module.exports = drawable;