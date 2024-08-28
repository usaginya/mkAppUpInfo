@echo off
title ffmpeg GIF 转 MP4 视频 by YIU
::Last 2023-12-26

:: 将下面一行的 = 后面改为你的ffmpeg路径
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
set ingif=%1
if defined ingif set "ingif=%ingif:"=%" & set formdrag=1 & goto argop

:op
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
echo     [1] 拖入图片文件(gif)：
Set /p ingif=　　
:argop
if "%ingif:"=%"=="" goto op
for /f "delims=" %%f in ("%ingif%") do set fn=%%~dpnf&set ingif=%%~dpnxf
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
)

:convert
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

set ffmpegRun=%ffmpeg% -i "%ingif%" -threads %cpun% -vf "scale='trunc(iw/2)*2:trunc(ih/2)*2'" -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -an -movflags faststart -y "%fn%.mp4"

echo.
echo %ffmpegRun%
echo.
timeout /t 2 >nul
echo.
start /b /high /wait "" %ffmpegRun%

echo.
echo.
echo.
echo     转换完成！
echo.
timeout /t 5 >nul
goto :eof 

:getName
set tn=%~nx1

:INFO
echo.
echo --=== FFmpeg Gif to Video GIF转视频批处理  Ver 1.0  by YIU ===--
goto :eof