@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

:: ===================== 核心配置（仅保留必要项） =====================
rem ImageMagick路径（建议填完整路径，如C:\ImageMagick\magick.exe）
set "MAGICK_PATH=magick"
rem WebP质量（0-100）
set "WEBP_QUALITY=90"
rem 是否删除原PNG（true/false）
set "DELETE_SOURCE=false"
:: ====================================================================

:: 1. 快速检查ImageMagick（修复语法，避免||兼容性问题）
%MAGICK_PATH% -version >nul 2>&1
if errorlevel 1 (
    echo 【错误】未找到ImageMagick，请检查MAGICK_PATH配置！
    pause
    exit /b 1
)

:: 2. 极简处理拖放/输入（修复语法陷阱）
set "SOURCE_DIR="
:: 拖放模式
if "%~1" neq "" (
    for %%i in ("%~1") do set "SOURCE_DIR=%%~fi"
) else (
    :: 输入模式（拆分cls和echo，避免拼接报错）
    cls
    echo PNG转WebP工具
    echo ================================
    
    echo 操作说明：输入文件夹路径
    
    echo 输入任意数字：处理当前目录
    
    echo 直接回车：退出
    
    echo.
    set /p "INPUT_DIR=请输入："
    
    :: 处理空输入（直接回车）
    if "!INPUT_DIR!" equ "" (
        exit /b 0
    )
    
    :: 数字判断（处理当前目录）
    set "IS_NUM=0"
    for /f "delims=0123456789" %%a in ("!INPUT_DIR!") do set "IS_NUM=1"
    if !IS_NUM! equ 0 (
        set "SOURCE_DIR=%cd%"
    ) else (
        for %%i in ("!INPUT_DIR!") do set "SOURCE_DIR=%%~fi"
    )
)

:: 统一验证路径有效性
if not exist "!SOURCE_DIR!\" (
    echo 【错误】无效文件夹：!SOURCE_DIR!
    pause
    exit /b 1
)

echo 处理目录：!SOURCE_DIR!

:: 3. 精简扫描+转换（无冗余操作）

echo 扫描PNG文件中...
set "FILE_COUNT=0" & set "CONVERTED_COUNT=0" & set "FAILED_COUNT=0"

:: 一次性扫描+遍历所有PNG
for /f "delims=" %%f in ('dir /b /a-d /s "!SOURCE_DIR!\*.png" 2^>nul') do (
    set /a FILE_COUNT+=1
    :: 构建输出路径（与原PNG同目录）
    set "OUT_FILE=%%~dpnf.webp"
    
    echo 处理：%%~nxf
    
    :: 执行转换
    %MAGICK_PATH% "%%f" -quality !WEBP_QUALITY! "!OUT_FILE!" >nul 2>&1
    
    if errorlevel 1 (
        set /a FAILED_COUNT+=1
        echo   [失败] 转换失败
    ) else (
        set /a CONVERTED_COUNT+=1
        :: 处理原文件删除逻辑
        if /i "!DELETE_SOURCE!"=="true" (
            del /f /q "%%f" >nul 2>&1
            echo   [成功] 转换并删除原文件
        ) else (
            echo   [成功] 转换完成
        )
    )
)

:: 4. 简化结果输出
echo.
echo ====================================================
if !FILE_COUNT! equ 0 (
    echo 未找到PNG文件，无需转换！
) else (
    echo 转换完成 ^| 总文件：!FILE_COUNT! ^| 成功：!CONVERTED_COUNT! ^| 失败：!FAILED_COUNT!
    echo 输出目录：所有WebP文件与原PNG同目录
)
echo ====================================================
pause
exit /b 0