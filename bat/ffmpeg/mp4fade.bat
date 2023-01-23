@echo off
title ffmpeg淡入视频 by YIU
::Last 2022-09-05

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
echo     [8] 拖入视频文件：
Set /p invideo=　　
:argop
set "invideo=%invideo:"=%"
if "%invideo%"=="" goto op
for /f "delims=" %%f in ("%invideo%") do set fn=%%~dpnf & set invideo=%%~dpnxf
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
)

echo     [7] 输入数字选择一种效果：
echo           0   从黑屏到视频（淡入）
echo           1   从视频到黑屏（淡出）
set direction=0
Set /p direction=　　默认0：

setlocal enabledelayedexpansion
set /a tmpTotalTime=0
set /a tmpStartTime=0
for /f %%j in ('%ffmpeg% -i "%invideo%"  2^>^&1 ^| grep "Duration" ^| cut -d ^' ^' -f 4 ^| sed s/^,// ^| sed ^'s@\..*@@g^' ^| awk ^'{ split^($1^, A^, ":"^)^; split^(A[3]^, B^, "."^)^; print 3600*A[1] + 60*A[2] + B[1] }^'') do (
 set /a tmpTotalTime=%%j
 set /a tmpStartTime=%%j
)
if !tmpStartTime! leq 0 (set /a tmpStartTime=180)
if %direction% leq 0 (set /a tmpStartTime=0)
setlocal disabledelayedexpansion

if %direction% gtr 0 (set direction=out) else (set direction=in)
echo.

echo     [6] 黑屏开始时间（单位：秒）
set startTime=%tmpStartTime%
if %tmpStartTime% gtr 3 (set /a startTime=%tmpStartTime% - 3)
Set /p startTime=　　当前视频总长%tmpTotalTime%秒，默认从第%startTime%秒开始：
echo.

echo     [5] 黑屏过效果持续时间（单位：秒）
set duration=3
Set /p duration=　　默认3：
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
echo %ffmpeg%
start /b /high /wait "" %ffmpeg% -i "%invideo%"%usex264% -acodec libmp3lame -threads  %cpun% -vf fade=t=%direction%:st=%startTime%:d=%duration% -filter_complex "[0:a]afade=t=%direction%:st=%startTime%:d=%duration%" -b:v %minkbps%k -b:a %akbs%k -ar 44100 -bufsize %minkbps%k -maxrate %maxkbps%k -y "%fn%_fade%direction%.mp4"

:getName
set tn=%~nx1