@echo off
title  mp4合并批处理 by YIU
:: 2021-7-5 v9
:: 将下面一行的 = 后面改为你的ffmpeg路径
set "ffmpeg=ffmpeg.exe"
:: 改ffmpeg路径在上一行
:init
call :getName "%ffmpeg%"
if exist "%ffmpeg%" (if /i "%tn%"=="ffmpeg.exe" goto op)
cls
color 4e
echo. && echo. && echo.
set /p ffmpeg= 未找到ffmpeg、请用记事本编辑此批处理、修改ffmpeg路径、或拖入ffmpeg程序：
goto init
:op
cls
color 0b
echo. && echo.
set ofn=
set files=
set tss=
set /a n=0
:sp
set inp=
set /a n+=1
set /p inp=  请拖入第 %n% 个mp4文件（直接回车开始合并）：
if not defined inp goto ed
call :getExt %inp%
if /i not "%te%"==".mp4" (
	echo 拖入的文件必须是mp4格式！
	set /a n-=1
	echo.
	goto sp
)
if %inp%=="" (
	echo 没有输入！
	set /a n-=1
	echo.
	goto sp
)
if %n% equ 1 (
	call :getPureName %inp%
	set "ofn=%tpn%"
)
echo 输入完成！
set "files=%files%%inp%*"
echo.
goto sp
:ed
clear
if %n% lss 3 goto pass
color 0d
set /a n=0
:work
for /f "tokens=1* delims=*" %%a in ("%files%") do (
	echo 正在转换 %%a ...
	start /high /wait "" %ffmpeg% -y -i %%a -vcodec copy -acodec copy -vbsf h264_mp4toannexb m4m%n%.ts
	set "tss=%tss%m4m%n%.ts|"
	set "files=%%b"
	echo 转换完成！
	echo.
	set /a n+=1
	goto work
)
echo.
echo ...........................................................
echo.
echo 正在合并mp4...
set "tss=%tss:~0,-1%"
echo "concat:%tss%"
start /high /wait "" %ffmpeg% -y -i "concat:%tss%" -c copy %ofn%_merge.mp4
:clear
for /f "tokens=1* delims=^|" %%a in ("%tss%") do (
	del /f /s /q %%a
	set "tss=%%b"
	goto clear
)
cls
color 2e
echo.
echo.
echo.
echo 已将mp4合并到 %~dp0%ofn%_merge.mp4
echo.
echo.
echo 按任意键定位mp4并结束合并...
pause>nul
start "" explorer /e,/select,%~dp0%ofn%_merge.mp4
goto :EOF
:pass
cls
color 8f
echo.
echo -----------------------------------------
echo.
echo.
set /a m=%n%-1
echo  %m%个mp4合并中......合并出了个寂寞...
echo.
echo.
echo  按任意键返回重新合并...
pause>nul
goto op
:getName
set tn=%~nx1
:getExt
set te=%~x1
:getPureName
set tpn=%~n1