/**
 * @author YIU
 * @version 1.0.0
 * @description 应用主入口 - 基于 Auto.js Pro 8.5.21-0
 * 打包为apk后需要反编译AndroridMainifest.xml 在 <activity> 标签加入android:excludeFromRecents="true"
 */


"ui";
//================= Global Import Class ==================//
importClass(android.view.View);
importClass(android.view.animation.Animation);
importClass(android.view.animation.AlphaAnimation);
importClass(android.view.inputmethod.InputMethodManager);
importClass(android.text.method.ScrollingMovementMethod);
importClass("androidx.drawerlayout.widget.DrawerLayout");

//================= Global Variables ==================//
const resStrings = require('./src/runtimes/resources/strings');
/**
 * 当前界面 作为权限申请界面的返回界面
 */
let nowUI = null;

/**
 * 后台服务脚本
 */
let engineBgService = null;

//--------- Global Styles and Resources ---------
const resImages = require('./src/runtimes/resources/images');
const styleColors = require('./src/main/styles/colors');

/**
 * 随机logo
 * @returns base64图片字符串
 */
const randomLogo = () => {
   const icons = [
      resImages.sunnyMilkIcon,
      resImages.lunaChildIcon,
      resImages.starSapphireIcon
   ];
   return icons[Math.floor(Math.random() * 3)];
}

//================== Import Modules ==================//
const Shape = require('./src/runtimes/helpers/RippleDrawable');
const internalProcess = require('./src/runtimes/works/InternalProcess');
//const globalListeners = require('./src/runtimes/works/GlobalListeners');

//================== Load UI Layout ==================//
//第一屏界面
const UIFirst = require('./src/main/layout/first');
//权限申请界面
const UIPermission = require('./src/main/layout/permission');
//用户登录界面
const UILogin = require('./src/main/layout/login');
//主页界面
const UIHome = require('./src/main/layout/home');
//关于界面
const UIAbout = require('./src/main/layout/about');

//================= Initialize ==================//
//设置状态栏颜色
ui.statusBarColor(styleColors.mainBackground);

//强制竖屏
activity.setRequestedOrientation(1);

//初始界面
nowUI = UILogin;

//线程初始化
threads.start(function () {

   //启动后台服务
   //engineBgService = internalProcess.ScriptEngine.runOnce(resStrings.scriptBackgroundWorkerPath);

   ui.post(() => {
      //初始检查权限
      internalProcess.Permissions.check(UILogin);

      //如果不是在申请权限就显示登录界面
      if (!internalProcess.Permissions.isApplying) {
         //UILogin.Show();
         UIHome.Show();
      }
   });

});


//返回到本应用界面事件
ui.emitter.on("resume", function () {
   //检查权限
   internalProcess.Permissions.check(nowUI);
});

//显示第一屏
UIFirst.Show();




//显示申请权限界面
//UIPermission.Show();

//显示主界面
// UIHome.Show();
// internalProcess.Permissions.ignoringBatteryOptimizations();
// internalProcess.Permissions.floatyPermission();


//监听解锁屏幕事件
// unlockScreenReceiver = globalListeners.unlockScreen();

//internalProcess.Permissions.floatyPermission();

//================= Events ==================//
//应用退出事件
// events.on("exit", () => {
//    toastLog("停止了界面吗？");
// });
