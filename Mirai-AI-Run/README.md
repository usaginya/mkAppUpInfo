# Mirai AI Run 后台服务管理

Mirai AI Run 是一个在 Windows 上轻松管理基于 [Mirai](https://github.com/project-mirai) 后台服务的 AI 启动和停止运行的工具
支持显示隐藏 Mirai AI 后台服务命令窗口
支持一键启动、停止 Mirai AI（必须已配置好 Mirai Console Loader 和 AI 相关设置）
支持守护 Mirai AI 后台服务进程

## 声明

- 本软件为快速开发而使用“易语言”制作，已通过火绒安全验证并开源，其它任何安全防护软件报木马均为误报。
- 本软件使用的图标由画师保留所有权利。
- 禁止任何商业盈利行为分发、使用本软件。
- 因使用者个人行为使用不当造成的后果，一切责任由使用者自行承担。

## 使用

> 使用之前必须已配置好 Mirai 和有关 AI，详细配置方法请到官方项目查看文档。

1. 首次使用先点击“设置”按钮进行关联设置，设置将会保存到相同目录下名为 `MiraiAIRun.ini` 文件中；
2. 在 Mirai mcl 运行文件路径中填入 Mirai Console Loader `mcl.cmd` 启动文件的路径；
3. 在 AI 运行文件路径中填入基于 Mirai 的 AI 相关启动文件的路径；
4. 如果 Mirai AI 还有云管理地址可在 云管理地址 中输入，这将可以在界面上快速打开云管理页面；
5. 设置中可根据需求决定是否在启动时自动启动 Mirai AI 后台服务；
6. 如果设置无误，就可以启动服务并使用了，启动过程大概在 10 秒以上完成，日志信息窗口会有提示。

## 开发

1. 开发之前必须先准备“易语言”编程软件；
2. 首先将 `source` 文件夹中的 `里面的文件夹覆盖到易语言安装目录` 所有文件夹复制到“易语言”安装目录中覆盖；
3. 启动“易语言”然后在菜单栏 T.工具 -> L.支持库配置 -> 键入 `tp` 然后勾选“托盘图标支持库 2.0 版”并确认；
4. 打开 `source` 文件夹中的源码 `MiraiAIRun.e` 开始开发；
5. 编译时使用 VC6 Linker 链接器即可编译成功。

## 更新日志

> Version 2021.12.30.20
* 调整 后台进程守护逻辑
* 调整 设置保存提示
* 调整 启动方式允许只单独启动 AI

> Version 2021.12.23.13
* 修复 后台进程守护因参数错误导致判断错误的bug
* 修复 后台进程守护在丢失后台后不能自动重启的bug
* 调整 后台进程守护逻辑
* 删除 保存配置的冗余代码

> Version 2021.12.22.14
* 调整 守护逻辑、减少进程误判

> Version 2021.12.19.15
* 增加 显示/隐藏 全部后台窗口右键菜单
* 增加 自动启动在托盘状态时提示启动是否完成的信息
* 调整 守护逻辑、针对 Python 脚本进程进行区别

> Version 2021.12.17.2
* 修复 点击右键菜单显示隐藏窗口时“打开云管理”菜单消失的bug
* 优化 守护逻辑、改用 WMI 进行进程监控管理、提高守护稳定性