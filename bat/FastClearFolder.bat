@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion
title 快速清空文件夹 by YIU
color b
set "installPath=%SystemDrive%\ProgramData\fast_clear_folder.bat"
if "%~1"=="" (
    cls
    call :INFO
    if exist "%installPath%" (
        set "m=u"
        echo 快速清空文件夹 已安装
        echo.
        echo.
        echo 卸载...........1
    ) else (
        set "m=i"
        echo 快速清空文件夹 未安装
        echo.
        echo.
        echo 安装...........1
    )
    echo 退出...........2
    echo.
    set /p "c1=请输入选择并回车 (1，2) (不输入默认为2)："
    if "!c1!"=="1" goto install
    goto exit /b
) else goto startclean

:install
if "!m!"=="i" (
    copy /y "%~f0" "%installPath%" >nul
    if not exist "%installPath%" (
        echo 安装失败，无法复制文件 & pause & exit /b
    )
    reg add "HKEY_CLASSES_ROOT\Directory\shell\FastClearFolder" /ve /d "🫧 快速清空文件夹" /f >nul
    reg add "HKEY_CLASSES_ROOT\Directory\shell\FastClearFolder\command" /ve /d "\"%installPath%\" \"%%1\"" /f >nul
    echo.
    echo 安装完成！
    echo.
    echo 使用方法：
    echo - 在需要清空的文件夹的右键菜单中，选择“快速清空文件夹”
)

if "!m!"=="u" (
    reg delete "HKEY_CLASSES_ROOT\Directory\shell\FastClearFolder" /f >nul 2>&1
    if exist "%installPath%" (
        del /f /q "%installPath%" >nul
        echo.
        echo 卸载完成！
    ) else (
        echo.
        echo 未找到安装文件！
    )
)
echo.
echo 按任意键退出...
timeout /t 10 >nul
exit /b

:startclean
cls
call :INFO
set "tempDir=%TEMP%"
set "folderName=nullfolder_%time:~0,2%%time:~3,2%%time:~6,2%"
set "folderName=%folderName: =0%"
set "tempFolder=%tempDir%\!folderName!"
mkdir "!tempFolder!" >nul 2>&1
if not exist "!tempFolder!" (
    echo.
    echo 尝试准备清空工作时失败，请尝试用管理员权限运行
    pause & exit /b
)
echo   准备清空文件夹：
echo   %~1
echo.
echo 只清空....................1
echo 清空后删除文件夹..........2
echo 取消......................3
echo.
set /p "c2=请输入选择并回车 (1-3) (不输入默认为3)："
if "!c2!"=="1" goto clean
if "!c2!"=="2" goto clean
rd /s /q "!tempFolder!" >nul 2>&1
exit /b

:clean
echo.
echo   少女清扫中......
robocopy "!tempFolder!" "%~1" /mir /r:0 /w:0
if "!c2!"=="2" rd /s /q "%~1" >nul 2>&1
rd /s /q "!tempFolder!" >nul 2>&1
echo.
echo.
echo   清空完成！
echo.
timeout /t 10 >nul
exit /b

:INFO
echo.
echo.
echo --=== 快速清空文件夹 by YIU ===--
echo.
echo.
goto :eof