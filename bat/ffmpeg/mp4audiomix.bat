@echo off
title  mp4混音 by YIU
:: 2021-7-17 v6
:: 将下面一行的 = 后面改为你的ffmpeg路径
set "ffmpeg=tools\ffmpeg.exe"
:: 改ffmpeg路径在上一行
:init
set "ffmpeg=%ffmpeg:"=%"
call :getName "%ffmpeg%"
if exist "%ffmpeg%" (if /i "%tn%"=="ffmpeg.exe" goto op)
cls
color 4e
echo. && echo. && echo.
set /p ffmpeg= 未找到ffmpeg、请用记事本编辑此批处理、修改ffmpeg路径、或拖入ffmpeg程序：
goto init
cls
:op
color 0b
echo. && echo.
set iv=
set ofn=
set /p iv=  请拖入 1 个mp4文件：
if "%iv%"=="" (
	echo 没有输入！
	echo.
	goto op
)
call :getExt %iv%
if /i not "%te%"==".mp4" (
	echo 拖入的文件必须是mp4格式！
	echo.
	goto op
)
call :getPureName %iv%
set "ofn=%tpn%"
call :getZipPath %iv%
echo %zip%%tpn%
:rea
echo.
set ia=
set /p ia=  请拖入 1 个aac文件作为BGM：
if "%ia%"=="" (
	echo 没有输入！
	echo.
	goto rea
)
call :getExt %ia%
if /i not "%te%"==".aac" (
	echo 拖入的文件必须是aac格式！
	echo.
	goto rea
)
:svv
echo.
set "vv=1"
set /p vv=  视频音量大小^[默认1^(100%^)^]：
echo 视频音量设为了：%vv%
:sva
echo.
set "va=0.5"
set /p va=  BGM音量大小^[默认0.5^(50%^)^]：
echo 视频音量设为了：%va%
echo.
echo 正在混音mp4...
timeout /t 2>nul
color 0d
start /high /wait "" "%ffmpeg%" -y -i %iv% -i %ia% -c:v copy -map 0:v:0 -filter_complex "[0:a]volume=%vv%[0a];[1:a]volume=%va%[1a];[0a][1a]amerge=inputs=2[aout]" -map "[aout]" -ac 2 -y %zip%%ofn%_remix.mp4
echo.
color 2e
echo.
echo.
echo.
echo 已将mp4混音到 %zip%%ofn%_remix.mp4
echo.
echo.
echo 按任意键定位mp4并结束混音...
pause>nul
start "" explorer /e,/select,%zip%%ofn%_remix.mp4
goto :EOF
:getName
set tn=%~nx1
:getExt
set te=%~x1
:getPureName
set tpn=%~n1
:getZipPath
set zip=%~dp1