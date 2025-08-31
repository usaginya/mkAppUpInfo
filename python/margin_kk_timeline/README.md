# Timeline Keyframe Merger for Koikatu (KK/KKS)

## English

### Overview
This script helps merge Timeline keyframes between different objects in Koikatu/Koikatsu Sunshine (KK/KKS) by combining two Single Files configurations while preserving existing animations.

### Features
- Merges `interpolableGroup` and `interpolable` keyframes between two XML files
- Preserves all existing keyframes from both files
- Automatically handles file selection and naming
- Tested with KKPE basic keyframe merging

### Installation
1. Place `margin_single_files.py` in:
   ```
   [KK/KKS Install Directory]\BepInEx\plugins\Timeline\Single Files
   ```

### Preparation in Studio
1. Adjust both objects' Timeline keyframes so they don't overlap in time
2. Save each object's Timeline configuration using Single Files (will create two XML files)

### Usage
1. Open command prompt in the Single Files directory
2. Run the script:
   ```bash
   python margin_single_files.py
   ```
3. If more than 2 XML files exist, you'll be prompted to select which two to merge
4. The script will create a new merged file (e.g., `merged_file1_and_file2.xml`)

### Final Steps in Studio
1. Delete the Timeline tracks you want to replace (undeleted tracks won't be overwritten)
2. Load the merged configuration via Single Files
3. Now you can copy/paste keyframes between the combined tracks

### Notes
- This is currently the only known method to copy partial animations between objects
- If you know a better method, please share!

---

## 中文

### 概述
本脚本用于合并《恋活》(KK/KKS)中不同对象的Timeline关键帧，通过合并两个Single Files配置文件来保留原有动画。

### 功能特点
- 合并两个XML文件中的`interpolableGroup`和`interpolable`关键帧
- 保留两个文件中的所有现有关键帧
- 自动处理文件选择和命名
- 已测试支持KKPE基础关键帧合并

### 安装方法
1. 将`margin_single_files.py`放入：
   ```
   [游戏安装目录]\BepInEx\plugins\Timeline\Single Files
   ```

### 工作室准备工作
1. 调整两个对象的时间轴关键帧，确保时间线上没有重叠
2. 分别使用Single Files保存两个对象的配置（将生成两个XML文件）

### 使用方法
1. 在Single Files目录打开命令行
2. 运行脚本：
   ```bash
   python margin_single_files.py
   ```
3. 如果有多个XML文件，脚本会提示选择要合并的两个文件
4. 脚本将生成合并后的新文件（如`merged_文件1_and_文件2.xml`）

### 最后步骤
1. 在工作室中删除想要替换的时间轴轨道（未删除的时间轴轨道不会被覆盖）
2. 通过Single Files加载合并后的配置
3. 现在可以在合并后的轨道上自由复制/粘贴关键帧了

### 注意事项
- 这是我目前已知在不同对象间复制部分动画的方法
- 如果你知道更好的方法，欢迎告诉我！
