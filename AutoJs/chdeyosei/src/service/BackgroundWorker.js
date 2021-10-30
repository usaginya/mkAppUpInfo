/**
 * @author YIU
 * @version 1.0.0
 * @description 无界面后台运行工作脚本
 */

//================== Import Modules ==================//
const globalListeners = require('./src/runtimes/works/GlobalListeners');
const internalProcess = require('./src/runtimes/works/InternalProcess');

//创建全局悬浮窗口保持后台运行
let windowFloaty = floaty.rawWindow(
   <frame gravity="center" bg="#44ffcc00" />
);
windowFloaty.setSize(300, 300);
windowFloaty.setTouchable(false);
setInterval(() => { }, 60000);

//接收前台获取数据事件
events.on('getEdata', e => {
   //回发数据
   internalProcess.ScriptEngine.emit(e, 'dataBgServer', '居然搞到我了，真的牛啤');
});

events.on("exit", () => {
   toastLog("后台脚本终了");
});