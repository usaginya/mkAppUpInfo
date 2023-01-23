@echo off
title ffmpeg nvencת�� by YIU
::Last 2023-02-24

:: ������һ�е� = �����Ϊ���ffmpeg·��
::set "ffmpeg=%~dp0tools\ffmpeg.exe"
:: ��ffmpeg·������һ��

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
echo     �� �밴������ʾ���������س�
echo.
echo     [3] ������Ƶ�ļ���
Set /p invideo=������
:argop
set "invideo=%invideo:"=%"
if "%invideo%"=="" goto op
for /f "delims=" %%f in ("%invideo%") do set fn=%%~dpnf&set invideo=%%~dpnxf
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     �� �밴������ʾ���������س�
echo.
)

echo     [2] ��Ƶ������0~50 ԽС����Խ�����Խ�󡢵�λ��cq��
set cq=26
Set /p cq=������Ĭ��26�� 
echo.

echo     [1] �����ʽ��h264\hevc��
set code=h264
Set /p code=������Ĭ��h264�� 
if "%code%"=="" set "code=h264"
if "%code%" neq "h264" if "%code%" neq "hevc" set "code=h264"
echo.
echo.
echo.

::ȡCPU�����������߳�
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