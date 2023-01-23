@echo off
title ffmpeg nvenc转码 by YIU
::Last 2023-02-24

:: 将下面一行的 = 后面改为你的ffmpeg路径
::set "ffmpeg=%~dp0tools\ffmpeg.exe"
:: 改ffmpeg路径在上一行

:init
if "%ffmpeg%"=="" (
 set "ffmpeg=ffmpeg"
) else (
 set "ffmpeg=%ffmpeg:"=%"
 call :getName "%ffmpeg%"
 if not exist "%ffmpeg%" (if /i "%tn%"=="ffmpeg.exe" set "ffmpeg=ffmpeg")
)

set formdrag=0
set invideo=%1
if "%invideo%" neq "" set formdrag=1 & goto argop

:op
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
echo     [3] 拖入视频文件：
Set /p invideo=　　
:argop
set "invideo=%invideo:"=%"
if "%invideo%"=="" goto op
for /f "delims=" %%f in ("%invideo%") do set fn=%%~dpnf&set invideo=%%~dpnxf
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
)

echo     [2] 视频质量（0~50 越小质量越好体积越大、单位：cq）
set cq=26
Set /p cq=　　默认26： 
echo.

echo     [1] 编码格式（h264\hevc）
set code=h264
Set /p code=　　默认h264： 
if "%code%"=="" set "code=h264"
if "%code%" neq "h264" if "%code%" neq "hevc" set "code=h264"
echo.
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
echo %ffmpeg%
start /b /high /wait "" %ffmpeg% -i "%invideo%" -c:v %code%_nvenc -threads  %cpun% -preset slow -tier high -spatial_aq 1 -aq-strength 1 -cq %cq% -y "%fn%_%code%_nvenc.mp4"

:getName
set tn=%~nx1