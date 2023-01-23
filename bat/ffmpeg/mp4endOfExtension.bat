@echo off
title ffmpeg静态延长视频 by YIU
::Last 2022-09-05

:: 将下面一行的 = 后面改为你的ffmpeg路径
set "ffmpeg=%~dp0tools\ffmpeg.exe"
:: 改ffmpeg路径在上一行

:init
set "ffmpeg=%ffmpeg:"=%"
call :getName "%ffmpeg%"
if not exist "%ffmpeg%" (if /i "%tn%"=="ffmpeg.exe" set "ffmpeg=ffmpeg")

set formdrag=0
set invideo=%1
if "%invideo%" neq "" set formdrag=1 & goto argop

:op
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
echo     [6] 拖入视频文件：
Set /p invideo=　　
:argop
if "%invideo:"=%"=="" goto op
for /f "delims=" %%f in ("%invideo%") do set fn=%%~dpnf & set invideo=%%~dpnxf
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
)

echo     [5] 视频延长时间（单位：秒）
set duration=10
Set /p duration=　　默认10：
echo.

echo     [4] 视频最低码率（单位：Kbps）
set minkbps=2600
Set /p minkbps=　　默认2600：
echo.

echo     [3] 视频最高码率（单位：Kbps）
set maxkbps=3500
Set /p maxkbps=　　默认3500：
echo.

echo     [2] 音频码率（单位：kb/s）（可选：128 \ 192 \ 256 \ 320）
set akbs=256
Set /p akbs=　　默认256：
echo.

echo     [1] 使用 h264 编码器（ffmpeg 必须支持）
echo           0   不使用
echo           1   使用
set usex264=1
Set /p usex264=　　默认1：
if %usex264% gtr 0 (set "usex264= -vcodec libx264") else (set "usex264=")
echo.
echo.

::取CPU核心数计算线程
setlocal enabledelayedexpansion
set line=0
for /f  %%a in ('wmic cpu get numberofcores') do (
set /a line+=1
if !line!==2 set cpun=%%a
)
setlocal disabledelayedexpansion  

if ERRORLEVEL 1 (set cpun=1)
if %cpun% lss 1 (set cpun=2) else (set /a cpun=cpun-1)

start /b /high /wait "" %ffmpeg% -i "%invideo%"%usex264% -acodec libmp3lame -threads  %cpun% -vf tpad=stop_mode=clone:stop_duration=%duration% -b:v %minkbps%k -b:a %akbs%k -ar 44100 -bufsize %minkbps%k -maxrate %maxkbps%k -y "%fn%_expand_%duration%s.mp4"

:getName
set tn=%~nx1