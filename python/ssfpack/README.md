# 说明

用于搜狗拼音输入法皮肤文件(.ssf) 提取/加密打包 的工具

## 来历

时隔多年、搜狗输入法皮肤商店删除了曾经上传的自制皮肤、好在同步功能还能取回皮肤文件
想重新对皮肤进行修改、发现皮肤文件不能直接解压
为此在 GitHub 上找到了搜狗皮肤文件转换的相关项目：ssfconv https://github.com/fkxxyz/ssfconv
使用很方便、提取皮肤文件的问题解决了
修改完皮肤后、正想打包回原本加密的皮肤文件、发现 ssfconv 没有做好转换到加密皮肤文件的功能
于是只好自己按着提取转换的算法来写加密打包的算法
因为只需要提取和打包功能、所以把额外功能去除、作为新的名为 ssfpack 的提取打包工具

## 开始使用

以下仅说明在 Windows 系统下使用的方法

### 安装 Python 3

> **已安装好的可以跳过**

在 Python 官方网站下载页面下载合适你的系统的安装包、并安装：
https://www.python.org/downloads/

### 下载文件

1. requirements.txt
2. ssfpack

### 启动控制台

在 ssfpack 文件所在的目录中按住 shift 键然后打开右键菜单中的 `在此处打开 Powershell 窗口`

### 安装依赖包

输入以下命令
```
pip install -r requirements.txt
```

### 提取皮肤文件

命令格式为：
ssfpack .ssf皮肤文件 要保存提取出内容的文件夹

例子：
```
python ssfpack 搜狗拼音皮肤.ssf 搜狗拼音皮肤
```

### 打包皮肤文件

命令格式为：
ssfpack 要打包为皮肤文件的文件夹 皮肤文件名称.ssf

例子：
```
python ssfpack 搜狗拼音皮肤 搜狗拼音皮肤.ssf
```

### 查看使用方法帮助

输入以下命令
```
python ssfpack -h
```

## 致谢

解密算法和密钥基于 [VOID001/ssf2fcitx](VOID001/ssf2fcitx)

## 声明

用户的个人行为与本工具作者无关，作者不承担用户因侵权、违反所在地区法律及道德等不被支持的行为所带来的一切后果