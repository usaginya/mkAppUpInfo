@echo off
title ffmpeg nvencת�� by YIU
::Last 2023-06-13

:: ������һ�е� = �����Ϊ��� ffmpeg.exe ����·��
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
echo     �� �밴������ʾ���������س�
echo.
echo     [4] ������Ƶ�ļ���
Set /p invideo=������
set "invideo=%invideo:"=%"
:argop
if not defined invideo goto op
for /f "delims=" %%f in ("%invideo%") do set fn=%%~dpnf&set invideo=%%~dpnxf
echo.
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     �� �밴������ʾ���������س�
echo.
)
goto InputWidth

:InputWidthError
echo.
echo �������Ƶ��ȸ�ʽ�������������֣�
echo.

:InputWidth
echo     [3] ��Ƶ�ߴ����
echo     ��  ֻ�����ȡ��߶Ȼ���ݿ�ȵȱȵ���
echo     ��  ������ 16:9 �������ÿ�Ȳο�
echo     --- �ֱ��� ------ ���(px) ---
echo     -     720P         1280      -
echo     -    1080P         1920      -
echo     -       2K         2560      -
echo     -       4K         3840      -
set width=
Set /p width=��  �� �����ȡ�����Ĭ�ϱ���ԭ��Ƶ�ߴ磺 
if not defined width echo. & echo. & goto InputCQ
echo %width%|findstr "[^0-9]">nul && goto InputWidthError
set "width=-vf scale=%width%:-1 -sws_flags fast_bilinear"
echo.
echo.
goto InputCQ

:InputCQError
echo.
echo �������Ƶ������ʽ�������������֣�
echo.

:InputCQ
echo     [2] ��Ƶ������-cq 0~51��
echo     - ֵԽ�� ���ԽС ����Խ��
echo     - ����ԭ��Ƶ������Խ������Խ���ֵ����֮����ԽС��ֵ
set cq=37
Set /p cq=������Ĭ��37�� 
echo %cq%|findstr "[^0-9]">nul && goto InputCQError
echo.
echo.

echo     [1] �����ʽ��h264\hevc��
set code=hevc
Set /p code=������Ĭ��hevc�� 
if not defined code set "code=hevc"
if "%code%" neq "h264" if "%code%" neq "hevc" set "code=hevc"
echo code = %code%_nvenc
echo.
echo.
echo.

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
echo     ����ת����ɣ�
echo.
timeout /t 5 >nul
goto :eof 

:getName
set tn=%~nx1

:INFO
echo.
echo --=== FFmpeg Nvenc ת��������  Ver 1.2  by YIU ===--
goto :eof