@echo off
title ffmpeg 视频转 GIF 图片 by YIU
::Last 2025-02-27

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
set invideo=%1
if defined invideo set "invideo=%invideo:"=%" & set formdrag=1 & goto argop

:op
echo.
echo.
echo     ◆ 请按以下提示依次输入后回车
echo.
echo     [4] 拖入视频文件(video)：
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

echo     [3] 设置转换后图片宽度（单位：px 像素）
set width=0
Set /p width=　　默认原始大小（输入数字）：
if %width% gtr 0 (set "scale=scale=%width%:-1:flags=lanczos,") else (set "scale=")
echo.
echo.

echo     [2] 每秒帧数速率（单位：fps）
set fps=0
Set /p fps=　　默认自动速率（输入数字）：
if %fps% gtr 0 (set "fps=fps=%fps%,") else (set "fps=")
echo.
echo.

:InputColor
set colorkey=
echo     [1] 透明色（色键度 将指定颜色透明化 例子：0x00FF00）
set hexColor=
Set /p hexColor=　　默认忽略（跳过）：
if not defined hexColor goto convert
echo %hexColor%|findstr /r "^0x[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]$" || goto InputColorError
set "colorkey=chromakey=%hexColor%"
echo.
echo.
goto InputColorSimilarity

:InputColorError
echo.
echo   输入的颜色格式错误！请重新输入！
echo.
goto InputColor

:InputColorSimilarity
echo     [1.2] 透明色相似度（0.01 完全相似  ~ 1 匹配任何颜色）
set similarity=0.2
Set /p similarity=　　默认 0.2（输入数字）：
echo %similarity%|findstr /r "^1$" || ^
echo %similarity%|findstr /r "^0\.[0-9][1-9]$" || ^
echo %similarity%|findstr /r "^0\.[1-9]$" || ^
goto InputColorSimilarityError
set "colorkey=%colorkey%:%similarity%"
echo.
echo.
goto InputColorBlend

:InputColorSimilarityError
echo.
echo   输入的相似度错误！请输入 0.01~1 之间的数！
echo.
goto InputColorSimilarity

:InputColorBlend
echo     [1.1] 透明色融合度（0 完全透明 ~ 1 完全不透明）
set blend=0.28
Set /p blend=　　默认 0.28（输入数字）：
echo %blend%|findstr /r "^[0-1]$" || ^
echo %blend%|findstr /r "^0\.[0-9][1-9]$" || ^
echo %blend%|findstr /r "^0\.[1-9]$" || ^
goto InputColorBlendError
set "colorkey=%colorkey%:%blend%,"
echo.
echo.
goto convert

:InputColorBlendError
echo.
echo   输入的融合度错误！请输入 0~1 之间的数！
echo.
goto InputColorBlend


:convert
::取CPU核心数计算线程
for /f %%a in ('powershell -command "Get-WmiObject Win32_Processor | Measure-Object -Property NumberOfCores -Sum | Select-Object -ExpandProperty Sum"') do set /a cpun=%%a

:: CPU核心数大于 2 时取一半
setlocal enabledelayedexpansion
if !cpun! gtr 2 (
    set /a cpun=!cpun! / 2
)
if !cpun! lss 1 set cpun=1
setlocal disabledelayedexpansion

set ffmpegRun=%ffmpeg% -i "%invideo%" -threads %cpun% -vf "%colorkey%%fps%%scale%split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 -y "%fn%.gif"

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
echo --=== FFmpeg Video to Gif 视频转GIF批处理  Ver 1.2  by YIU ===--
goto :eof