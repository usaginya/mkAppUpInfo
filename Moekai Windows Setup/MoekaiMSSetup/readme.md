
# 萌界微软系统安装部署工具
## by YIU      2021-10-07

### 用法：
1. 将工具设置到镜像无人值守配置中，使其在安装阶段运行，一般在镜像 .\sources\$OEM$\$$\Setup\Scripts\SetupComplete.cmd 脚本中配置启动


2. 在工具相同目录位置新建 mkmssetup.txt 文件和 mkmssetup 文件夹


3. 将需要自动安装的软件放到 mkmssetup 文件夹中，安装软件必须符合以下要求，否则可能造成意外

* 每个安装软件包，安装时间不可超过 5 分钟，属性中有锁定的必须解锁

* 必须能达到全过程自动安装，无任何弹窗

* 保证能正常运行，且必须为可执行的安装程序


4. 在 mkmssetup.txt 文件中写安装配置
格式为：mkmssetup 文件夹中需要运行安装的程序名字 = 运行参数（等号两边尽量不要有空格）|最大等待时间（秒，不设置默认为5分钟）
每行一个安装程序，将按每行从上到下顺序自动逐个安装
如果使用system32目录下的程序，必须写上后缀，比如cmd.exe，不需要写完整的路径

例如：
`
setup1.exe=/q /a
setup2.exe=/q /b|120
...
`

5. 在 mkmssetup.txt 文件中可在最后一行写上一个游戏程序路径，仅可有一个
将会在安装过程时，作为可玩的小游戏，游戏必须符合以下条件

* 游戏不能放在 mkmssetup 文件夹里，避免在保留游戏的情况下被删除

* 游戏必须放在单独的文件夹里，否则在不保留游戏的情况下会误删游戏所在位置的所有文件

* 游戏窗口失去焦点时可以自动暂停

* 游戏窗口大小不可以是全屏或者太大的，窗口大小最好不超过 1024x1024

* 避免需要太多支持库才可运行的游戏，例如 RPGMaker 需要安装 RTP 资源库，自带 RTP 的例外

* 避免体积太大，占用太多存储空间

* 游戏简单、可保存或游戏时间短，体验友好

* 可用简短的说明描述游戏的玩法

游戏配置格式为：*Game=游戏路径（必须包含在镜像中）|游戏说明文本（可不写说明）
注意Game前面有一个星号，游戏说明可用 \n 换行，建议不超过 3 行
游戏路径支持系统环境变量路径，如%ProgramFiles%、%SystemDrive%等

例如
`
*Game=%ProgramFiles%\Game\Game.exe|方向键移动，Z键攻击，X键跳跃...
`

6. 在安装期间进行游戏，如果发生游戏窗口看不见的问题，可按 F10 将游戏窗口显示出来


7. 如果觉得某个安装步骤超过 5 分钟以上或者等待部署时间太久，可按 F12 强制结束部署
