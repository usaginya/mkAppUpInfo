@echo off
title ffmpeg nvenc转码 by YIU
::Last 2023-06-13

:: 将下面一行的 = 后面改为你的 ffmpeg.exe 所在路径
set "ffmpeg=ffmpeg.exe"

:init
call :INFO
if not defined %ffmpeg% (
 set "ffmpeg=ffmpeg"
) else (
 set "ffmpeg=%ffmpeg:"=%"
 call :getName "%ffmpeg%"
 if not exist "%ffmpeg%" (if /i "%tn%"=="ffmpeg.exe" set "ffmpeg=ffmpeg")
)

set formdrag=0
set invideo=%1
if defined invideo set "invideo=%invideo:"=%" & set formdrag=1 & goto argop

:op
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
echo     [4] 拖入视频文件：
Set /p invideo=　　
set "invideo=%invideo:"=%"
:argop
if not defined invideo goto op
for /f "delims=" %%f in ("%invideo%") do set fn=%%~dpnf&set invideo=%%~dpnxf
echo.
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
)
goto InputWidth

:InputWidthError
echo.
echo 输入的视频宽度格式错误！请输入数字！
echo.

:InputWidth
echo     [3] 视频尺寸调整
echo     ★  只输入宽度、高度会根据宽度等比调整
echo     ★  以下是 16:9 比例常用宽度参考
echo     --- 分辨率 ------ 宽度(px) ---
echo     -     720P         1280      -
echo     -    1080P         1920      -
echo     -       2K         2560      -
echo     -       4K         3840      -
set width=
Set /p width=  ○ 输入宽度、留空默认保持原视频尺寸： 
if not defined width echo. & echo. & goto InputCQ
echo %width%|findstr "[^0-9]">nul && goto InputWidthError
set "width=-vf scale=%width%:-1 -sws_flags fast_bilinear"
echo.
echo.
goto InputCQ

:InputCQError
echo.
echo 输入的视频质量格式错误！请输入数字！
echo.

:InputCQ
echo     [2] 视频质量（-cq 0~51）
echo     - 值越大 体积越小 画质越差
echo     - 建议原视频比特率越高输入越大的值、反之输入越小的值
set cq=37
Set /p cq=　　默认37： 
echo %cq%|findstr "[^0-9]">nul && goto InputCQError
echo.
echo.

echo     [1] 编码格式（h264\hevc）
set code=hevc
Set /p code=　　默认hevc： 
if not defined code set "code=hevc"
if "%code%" neq "h264" if "%code%" neq "hevc" set "code=hevc"
echo code = %code%_nvenc
echo.
echo.
echo.

::取CPU核心数计算线程
setlocal enabledelayedexpansion
set line=0
for /f  %%a in ('wmic cpu get numberofcores') do (
set /a line+=1
if !line!==2 set /a cpun=%%a / 2
)
setlocal disabledelayedexpansion

if ERRORLEVEL 1 set cpun=1
if %cpun% lss 1 set cpun=1

set ffmpegRun=%ffmpeg% -i "%invideo%" %width% -c:v %code%_nvenc -preset:v slow -tune:v hq -rc:v vbr -cq:v %cq% -b:v 0 -threads:v:0 %cpun% -filter_threads %cpun% -spatial_aq 1 -aq-strength 1 -y "%fn%_%code%_nvenc.mp4"
echo.
echo %ffmpegRun%
echo.
timeout /t 2 >nul
echo.
start /b /high /wait "" %ffmpegRun%

echo.
echo.
echo.
echo     编码转换完成！
echo.
timeout /t 5 >nul
goto :eof 

:getName
set tn=%~nx1

:INFO
echo.
echo --=== FFmpeg Nvenc 转码批处理  Ver 1.2  by YIU ===--
goto :eof