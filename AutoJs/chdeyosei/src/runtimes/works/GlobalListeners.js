/**
 * @name GlobalListeners
 * @description 全局监听事件
 */

IntentFilter = android.content.IntentFilter;

module.exports = {

    //解锁屏幕事件 返回接收器对象
    unlockScreen: function () {
        let receiver = new BroadcastReceiver(function (ctx, intent) {
            toastLog(intent);
        });
        const action = "android.intent.action.USER_PRESENT";
        context.registerReceiver(receiver, new IntentFilter(action));
        return receiver;
    }

};
