import os
import glob
import xml.etree.ElementTree as ET
from collections import defaultdict

def get_input_files():
    """获取要合并的两个XML文件"""
    xml_files = glob.glob('*.xml')
    
    if len(xml_files) < 2:
        raise ValueError("当前目录中需要至少2个XML文件才能合并")
    elif len(xml_files) == 2:
        return xml_files[0], xml_files[1]
    else:
        print("找到多个XML文件:")
        for i, f in enumerate(xml_files, 1):
            print(f"{i}. {f}")
        
        while True:
            try:
                choice1 = int(input("选择第一个要合并的文件(输入编号): ")) - 1
                choice2 = int(input("选择第二个要合并的文件(输入编号): ")) - 1
                
                if 0 <= choice1 < len(xml_files) and 0 <= choice2 < len(xml_files) and choice1 != choice2:
                    return xml_files[choice1], xml_files[choice2]
                print("输入无效，请重新选择")
            except ValueError:
                print("请输入有效的数字")

def generate_output_filename(file1, file2):
    """生成输出文件名，避免冲突"""
    base1 = os.path.splitext(file1)[0]
    base2 = os.path.splitext(file2)[0]
    output_name = f"merged_{base1}_and_{base2}.xml"
    
    counter = 1
    while os.path.exists(output_name):
        output_name = f"merged_{base1}_and_{base2}_{counter}.xml"
        counter += 1
    
    return output_name

def merge_xml_files():
    """自动合并XML文件的主函数"""
    file1, file2 = get_input_files()
    output_file = generate_output_filename(file1, file2)
    
    print(f"正在合并: {file1} 和 {file2}")
    print(f"输出文件: {output_file}")
    
    tree1 = ET.parse(file1)
    tree2 = ET.parse(file2)
    root1 = tree1.getroot()
    root2 = tree2.getroot()

    # 收集所有interpolable标签
    all_interpolables = collect_all_interpolables(root1)
    
    # 处理第二个文件
    process_interpolables_from_second_file(root1, root2, all_interpolables)
    
    # 处理group结构
    merge_groups(root1, root2)
    
    # 手动写入XML内容，不包含声明
    with open(output_file, 'wb') as f:
        f.write(ET.tostring(root1, encoding='utf-8'))
    print("合并完成!")

# 以下是之前定义的辅助函数保持不变
def collect_all_interpolables(root):
    """收集XML中所有interpolable标签"""
    interpolables = {}
    
    # 收集
    for ip in root.findall('interpolable'):
        key = (ip.get('owner'), ip.get('id'), ip.get('parameter'))
        interpolables[key] = ip
    
    for group in root.findall('interpolableGroup'):
        for subgroup in group.findall('interpolableGroup'):
            for ip in subgroup.findall('interpolable'):
                key = (ip.get('owner'), ip.get('id'), ip.get('parameter'))
                interpolables[key] = ip
    
    return interpolables

def process_interpolables_from_second_file(root1, root2, existing_interpolables):
    """处理第二个文件中的interpolable"""
    # 处理root下的
    for ip2 in root2.findall('interpolable'):
        key = (ip2.get('owner'), ip2.get('id'), ip2.get('parameter'))
        if key in existing_interpolables:
            merge_keyframes(existing_interpolables[key], ip2)
        else:
            root1.append(ip2)
            existing_interpolables[key] = ip2
    
    # 处理group中的
    for group2 in root2.findall('interpolableGroup'):
        for subgroup2 in group2.findall('interpolableGroup'):
            for ip2 in subgroup2.findall('interpolable'):
                key = (ip2.get('owner'), ip2.get('id'), ip2.get('parameter'))
                if key in existing_interpolables:
                    merge_keyframes(existing_interpolables[key], ip2)
                else:
                    target_group = find_or_create_group(root1, group2.get('name'), subgroup2.get('name'))
                    target_group.append(ip2)
                    existing_interpolables[key] = ip2

def find_or_create_group(root, group_name, subgroup_name):
    """查找或创建group结构"""
    for group in root.findall('interpolableGroup'):
        if group.get('name') == group_name:
            for subgroup in group.findall('interpolableGroup'):
                if subgroup.get('name') == subgroup_name:
                    return subgroup
            new_subgroup = ET.Element('interpolableGroup', {'name': subgroup_name})
            group.append(new_subgroup)
            return new_subgroup
    
    new_group = ET.Element('interpolableGroup', {'name': group_name})
    new_subgroup = ET.Element('interpolableGroup', {'name': subgroup_name})
    new_group.append(new_subgroup)
    root.append(new_group)
    return new_subgroup

def merge_keyframes(ip1, ip2):
    """合并keyframe"""
    existing_times = {kf.get('time') for kf in ip1.findall('keyframe')}
    for kf2 in ip2.findall('keyframe'):
        if kf2.get('time') not in existing_times:
            ip1.append(kf2)

def merge_groups(root1, root2):
    """合并interpolableGroup"""
    groups1 = {g.get('name'): g for g in root1.findall('interpolableGroup')}
    for group2 in root2.findall('interpolableGroup'):
        name = group2.get('name')
        if name in groups1:
            merge_second_level_groups(groups1[name], group2)
        else:
            root1.append(group2)

def merge_second_level_groups(group1, group2):
    """合并二级group"""
    subgroups1 = {g.get('name'): g for g in group1.findall('interpolableGroup')}
    for subgroup2 in group2.findall('interpolableGroup'):
        name = subgroup2.get('name')
        if name in subgroups1:
            merge_interpolables(subgroups1[name], subgroup2)
        else:
            group1.append(subgroup2)

def merge_interpolables(group1, group2):
    """合并group中的interpolable"""
    existing = {}
    for ip in group1.findall('interpolable'):
        key = (ip.get('owner'), ip.get('id'), ip.get('parameter'))
        existing[key] = ip
    for ip2 in group2.findall('interpolable'):
        key = (ip2.get('owner'), ip2.get('id'), ip2.get('parameter'))
        if key in existing:
            merge_keyframes(existing[key], ip2)
        else:
            group1.append(ip2)

if __name__ == "__main__":
    merge_xml_files()