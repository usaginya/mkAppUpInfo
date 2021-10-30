module.exports = {
    appName: "e家小妖精",
    appVerName: app.versionName,

    aboutReadme: "\n使用说明（上滑滚动查看）"
        + "\n\n1、本应用不会开机时启动，每次开机时需要手动打开一次才能在后台自动刷新步数。"
        + "\n\n2、主页显示的步数是华电e家的步数，不会实时更新，可以手动下拉刷新步数。"
        + "\n\n3、用返回键退出会在后台运行，如果要完全退出本应用不留后台，可以在左侧菜单中选择退出。"
        + "\n\n4、本应用需要加入后台清理白名单中以及设置忽略电池优化，才可正常在后台运行自动刷新步数。",

    aboutTitle: "e家小妖精 " + app.versionName,
    aboutAuthor: "基于Auto.js Pro V8\u3000\u3000开发者:YIU",

    permissionTips: "本应用需要以下权限支持以保持后台运行"
        + "\n请点击下面红色按钮授予本应用权限"
        + "\n使按钮全部变为绿色后重新打开本应用",

    scriptBackgroundWorkerPath: "./src/service/BackgroundWorker.js",

    bgAct: {
        login: 'bgAct@Login'
    },

    bgResp: {
        login: 'bgResp@Login'
    }

}