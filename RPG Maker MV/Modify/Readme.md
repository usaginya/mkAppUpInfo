## rpg managers decrypt json

使用方法：

- 备份原来的 **rpg_mangers.js** 然后替换这个同名文件

- 编辑这个 **rpg_mangers.js** 内容，根据游戏目录 **www\data\Map\*\*\*.json** 中地图最大id修改第76行的参数

&emsp;&emsp;**例子：**

&emsp;&emsp;假如目录中地图最大id文件是 **Map070.json**

```javascript
//Line 76
this.writeDecryptMapData(69);
```

&emsp;&emsp;把 69 修改为 70

```javascript
//Line 76
this.writeDecryptMapData(70);
```

- 启动游戏，然后解密的 json 就会生成在游戏目录下 **decrypt** 目录中