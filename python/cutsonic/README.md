# Cut Sonic (Audio Segmentation and Enhancement)

- [English](https://github.com/usaginya/mkAppUpInfo/tree/master/python/cutsonic/README_EN.md)

此脚本用于分割 wav / mp3 / ogg 等音频文件、并可选进行简易的降噪和语音增强、主要用于快速制作用于 AI 训练的语音数据集


## 来源

- 脚本基于 Reddragon300 的 [Voice-Segmentation-and-Enhancement](https://github.com/Reddragon300/Voice-Segmentation-and-Enhancement) 项目基础上修改

- 降噪和语音优化 参考了 Mastering-Python-GT 的 [Audio_Enhancement](https://github.com/Mastering-Python-GT/Audio_Enhancement) 项目代码


## 开始使用

1. 安装 Python (如果你还没安装)
2. 下载 `cutsonic.py` 和 `requirements.txt` 把它们存放到一个文件夹中
3. 在文件夹中运行命令 `pip install -r requirements.txt` 等到安装好依赖包
4. 运行命令 `py cutsonic.py` 根据提示开始使用

- PS: 如果输入错误或想要终止可以按 `Ctrl+C` 组合键终止运行


## 其他说明

如果降噪和增强效果不满意、你自己可以修改脚本中 `self.__board__ = Pedalboard([...])` 内的效果器参数配置
代码离开头很近、仅在20行以内、很快就能找到
更多效果器配置请参考 [Pedalboard 的官方文档](https://spotify.github.io/pedalboard/index.html)
