@echo off
title ffmpeg 视频转 GIF 图片 by YIU
::Last 2022-01-23

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
echo     [3] 拖入视频文件(video)：
Set /p invideo=　　
:argop
if "%invideo:"=%"=="" goto op
for /f "delims=" %%f in ("%invideo%") do set fn=%%~dpnf&set invideo=%%~dpnxf
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
)

echo     [2] 设置转换后图片宽度（单位：px 像素）
set width=0
Set /p width=　　默认原始大小（输入数字）：
if %width% gtr 0 (set "scale=scale=%width%:-1:flags=lanczos,") else (set "scale=")
echo.
echo.

echo     [1] 每秒帧数速率（单位：fps）
set fps=0
Set /p fps=　　默认自动速率（输入数字）：
if %fps% gtr 0 (set "fps=fps=%fps%,") else (set "fps=")
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

start /b /high /wait "" %ffmpeg% -i "%invideo%" -threads %cpun% -vf "%fps%%scale%split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 -y "%fn%.gif"

:getName
set tn=%~nx1