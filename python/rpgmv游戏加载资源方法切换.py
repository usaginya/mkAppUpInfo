#!/usr/bin/python
# coding=utf-8

import os
import re
import time

gamePath = ''
method = ''


def updateFile(file, old_str, new_str):
    """
    替换文件中的字符串
    :param file:文件名
    :param old_str:旧字符串 支持正则
    :param new_str:新字符串
    :return:
    """
    file_data = ''
    with open(file, 'r', encoding='utf-8') as f:
        for line in f:
            regex = re.compile(old_str, re.I)
            line = regex.sub(new_str, line)
            file_data += line
    with open(file, 'w', encoding='utf-8') as f:
        f.write(file_data)


def fileExists(path):
    return path is not None and os.path.isfile(path)


def inputGamePath():
    print('请拖入游戏文件夹、文件夹中应该有 www 名字的文件夹')
    userInput = input('游戏文件夹路径：')
    userInput = userInput.strip('"').strip("'")
    path = os.path.join(userInput, r'www\data\System.json')
    isGamePath = fileExists(path)
    if not isGamePath:
        os.system('cls')
        print(f"""
        {userInput}
        不是 rpgmv 游戏文件夹 或者 游戏档案被加密了
        """)
        inputGamePath()
        return

    global gamePath
    gamePath = path


def inputMethod():
    global method
    print("""
        输入要切换加载游戏资源的方式
        
        直接回车: 加载未加密资源 (如 *.png)

        输入任意内容回车: 加载加密资源 (如 *.rpgmvp)
        """)
    userInput = input('切换加载游戏资源的方式：')
    if userInput:
        updateFile(gamePath,
                   r',"hasEncryptedImages":(true|false),"hasEncryptedAudio":(true|false)',
                   ',"hasEncryptedImages":true,"hasEncryptedAudio":true')
        method = '加密'

    else:
        updateFile(gamePath,
                   r',"hasEncryptedImages":(true|false),"hasEncryptedAudio":(true|false)',
                   ',"hasEncryptedImages":false,"hasEncryptedAudio":false')
        method = '未加密'


print("""

    rpgmv 游戏加载资源方法切换 by YIU
    
    用于切换 rpgmv 游戏加载加密或未加密资源的方式

""")

inputGamePath()
inputMethod()

print(f"""
切换完成!
已切换为 加载{method}资源方式
""")
time.sleep(3)
