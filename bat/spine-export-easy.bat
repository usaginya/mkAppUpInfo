@echo off
title spine-export 方舟模型动画导出
::Last 2024-08-29

:init
call :INFO

set formdrag=0
set indir=%1
if defined indir set "indir=%indir:"=%" & set formdrag=1 & goto argop

:op
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
echo     [6] 拖入含有 spine 模型的文件夹、注意拖入文件夹后中文 “” 会被替换为英文 " ：
Set /p indir=　　
:argop
if "%indir:"=%"=="" goto op
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
)

echo     [5] 导出的类型（ 1.gif / 2.png / 3.sequence / 4.mov ）
Set etype=
Set /p etype=　　输入类型选项数字（默认 gif）：
if not defined etype (set "etype=gif" & goto etypeend)
if %etype% leq 1 (set "etype=gif" & goto etypeend)
if %etype% geq 4 (set "etype=mov" & goto etypeend)
if %etype%=="2" (set "etype=png" & goto etypeend)
if %etype%=="3"  (set "etype=sequence")
echo.
:etypeend
echo %etype%
if %etype%=="png" goto reszie
if %etype%=="sequence" goto reszie
echo.
echo.

echo     [4] 导出的动画帧速（fps）
Set fps=
Set /p fps=　　输入数值（默认 30）：
if not defined fps set "fps=30"
echo.
echo %fps%
echo.
echo.

:reszie
echo     [3] 导出的缩放（1x）
Set scale=
Set /p scale=　　输入缩放倍数（默认 1）：
if not defined scale set "scale=1"
echo.
echo %scale%
echo.
echo.

echo     [2] 是否使用预乘Alpha纹理
Set pma=
Set /p pma=　　选择   0.不使用   1.使用  （默认 0）：
if not defined pma (set "pma=false" & goto pamend)
if %pma% neq 0 (set "pma=true") else (set "pma=false")
:pamend
echo.
if %pma%==false (echo 不使用) else (echo 使用)
echo.
echo.

:output
echo     [1] 导出的路径和文件名、文件名格式可以使用以下大括号模板字符串
echo          {assetName}         资源名称
echo          {assetPath}         资源所在路径
echo          {fps}               fps选项
echo          {scale}             scale选项
echo          {animationName}     当前提取的动画名称
echo.
Set outdir=
Set /p outdir=　　输入 路径^/文件名（ 默认 spine-output^/{assetName}_{animationName} ）：
if not defined outdir set "outdir=spine-output/{assetName}_{animationName}"
echo.
echo %outdir%
echo.
echo.

spine-export-cli -e %etype% -f %fps% --scale %scale% --pma %pma% -o "%outdir%" "%indir%"

:INFO
echo.
echo --=== spine-export 方舟模型动画导出批处理 by YIU ===--
echo --- Github: https://github.com/Nattsu39/spine-exporter ---
goto :eof