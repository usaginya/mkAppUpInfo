@echo off
title 删除指定扩展名的文件 by YIU
color b
echo.
echo.
:start
echo.
echo 		   把包含要删除的文件的文件夹拖入窗口
echo.
echo.
set /p ml=""
if %ml%=="" goto badpath
if not exist %ml% set badfolder=1 && goto badpath
:startnext
echo.
echo.
echo         请输入要删除的文件后缀名、可以使用通配符 *    例如 png
echo         要删除多个后缀名的文件用 \ 分隔开   例如 png\txt
echo         输入完成后按回车键开始删除
echo.
echo.
set /p exts=
if "%exts%"=="" goto badexts
if not exist %ml% set badfolder=1 && goto badpath
cls
color e
echo.
echo   正在从 %ml% 文件夹中
echo   删除含有 %exts% 后缀名的文件
echo.
echo   如果想取消、请在 6 秒内关闭窗口
echo.
echo   按回车键立刻进行删除
echo.
timeout /t 6
echo.
echo   少女删除中......
echo.
timeout /t 1 >nul
set nextexts=%exts%
:loop
for /f "tokens=1* delims=\" %%a in ("%nextexts%") do (
    for /r %ml% %%i in (*.%%a) do del /f /s /q "%%i"
    set nextexts=%%b
)
if defined nextexts goto :loop
color b
echo.
echo.
echo  删除完成!
timeout /t 1 >nul
goto :EOF
:badpath
echo. 
if %badfolder% neq 1 (
echo         请把文件夹拖入窗口
) else (
echo         文件夹不存在! 请重新拖入文件夹
)
echo.
echo.
set ml=""
set exts=
set badfolder=0
pause
cls
goto start
:badexts
echo.
echo         请输入要删除的文件后缀名   例如 png
echo.
echo.
pause
cls
echo.
echo 当前的文件夹路径: %ml%
goto startnext