@echo off
title ffmpeg GIF ת MP4 ��Ƶ by YIU
::Last 2023-12-26

:: ������һ�е� = �����Ϊ���ffmpeg·��
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
echo     �� �밴������ʾ���������س�
echo.
echo     [1] ����ͼƬ�ļ�(gif)��
Set /p ingif=������
:argop
if "%ingif:"=%"=="" goto op
for /f "delims=" %%f in ("%ingif%") do set fn=%%~dpnf&set ingif=%%~dpnxf
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     �� �밴������ʾ���������س�
echo.
)

:convert
::ȡCPU�����������߳�
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
echo     ת����ɣ�
echo.
timeout /t 5 >nul
goto :eof 

:getName
set tn=%~nx1

:INFO
echo.
echo --=== FFmpeg Gif to Video GIFת��Ƶ������  Ver 1.0  by YIU ===--
goto :eof