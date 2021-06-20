#! python3
# encoding:utf-8
# last 2021.6.20.23
# change by yiu
import json
import os
import re
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util import Retry

# 设置cookie值 --- 如果想固定cookie就从这里开始删除
cookie = input('请粘贴你的cookie：')
if not cookie or cookie == '':
    print('没有cookie 请重新开始')
    exit()
print('\n')
#----------- 删到这里为止

# 然后删除下面一行前面的 # 再把cookie粘贴到最后的 "" 里面 注意不能出现换行（自动换行显示效果除外）
#cookie = ""


# 漫画id
mangaid = input('请粘贴漫画链接或输入漫画id：')
if mangaid.startswith('http'):
    mangaid = re.findall(r'/mc(\d+)', mangaid, re.I)
    if mangaid:
        mangaid = mangaid[0]
if not mangaid or mangaid == '':
    print('没有得到漫画id 请重新开始')
    exit()
print('ID: ' + mangaid + '\n')

# 漫画名
manganame = input('请输入漫画名：')
if not manganame or manganame == '':
    print('没有漫画名 请重新开始')
    exit()
print('\n')


def transCookie(cookie):
    
    cookie = cookie.split(';')
    cdict = dict()
    for c in cookie:
        if c:
            c = c.split('=')
            cdict[c[0]] = c[1]
    return cdict


cookie = transCookie(cookie)


def getComicDetail(cid):
    url = "https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail?device=pc&platform=web"
    postdict = {"comic_id": cid}
    res = requests.post(url, data=postdict, cookies=cookie)
    eps = json.loads(res.text)['data']['ep_list']
    print(eps)
    downloadable = dict()
    downloadinable = dict()
    for ep in eps:
        shortTitle = ''
        if ep['short_title']:
            shortTitle = ep['short_title']
        title = shortTitle + ' ' + ep['title']
        if ep["is_locked"] and not ep['is_in_free']:
            downloadinable[title] = ep['id']
        else:
            downloadable[title] = ep['id']
    print(downloadable)
    print()
    print(downloadinable)
    return downloadable


def getEpImageIndex(epid):
    url = "https://manga.bilibili.com/twirp/comic.v1.Comic/GetImageIndex?device=pc&platform=web"
    postdata = {"ep_id": epid}
    res = requests.post(url, data=postdata, cookies=cookie)
    index = json.loads(res.text)
    print(index['data']['images'])
    return index['data']['images']


def getImageToken(path):
    url = "https://manga.bilibili.com/twirp/comic.v1.Comic/ImageToken?device=pc&platform=web"
    path += '@1100w.jpg'

    postdict = {"urls": f"[\"{path}\"]"}
    res = requests.post(url, data=postdict, cookies=cookie)
    token = json.loads(res.text)['data'][0]
    print(token)
    return token['url'] + "?token=" + token['token']


def downloadImage(token, page):
    file = open(f"{page}.jpg", 'wb')
    s = requests.Session()
    s.mount('https://', HTTPAdapter(max_retries=Retry(total=5)))
    res = requests.get(token)
    file.write(res.content)


a = getEpImageIndex(252052)

print(a[0]['path'])

# 字符串截取
def getMiddleStr(content,startStr,endStr):
  startIndex = content.index(startStr)
  if startIndex>=0:
    startIndex += len(startStr)
  endIndex = content.index(endStr)
  return content[startIndex:endIndex]


def auto(cid, cname):
    if not os.path.exists(cname):
        os.makedirs(cname)
    os.chdir(f'.\\{cname}')
    eps = getComicDetail(cid)
    for ep in eps.keys():
        fn=re.sub(r'[\\/:*?"<>|\r\n]+', '', ep)
        if not os.path.exists(fn):
            os.makedirs(fn)
        os.chdir(f'.\\{fn}')
        index = getEpImageIndex(eps[ep])
        page = 1
        for i in index:
            if not os.path.exists(f"{page}.jpg"):
                token = getImageToken(i['path'])
                downloadImage(token, page)
            page += 1
        os.chdir('..')

# 第一个参数为漫画id，第二个为目录名称
auto(mangaid, manganame)  
print(f'\n{manganame} 下载完成！')