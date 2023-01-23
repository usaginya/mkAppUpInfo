@echo off
title ffmpeg������Ƶ by YIU
::Last 2022-09-05

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
echo     [8] ������Ƶ�ļ���
Set /p invideo=������
:argop
set "invideo=%invideo:"=%"
if "%invideo%"=="" goto op
for /f "delims=" %%f in ("%invideo%") do set fn=%%~dpnf & set invideo=%%~dpnxf
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     �� �밴������ʾ���������س�
echo.
)

echo     [7] ��������ѡ��һ��Ч����
echo           0   �Ӻ�������Ƶ�����룩
echo           1   ����Ƶ��������������
set direction=0
Set /p direction=������Ĭ��0��

setlocal enabledelayedexpansion
set /a tmpTotalTime=0
set /a tmpStartTime=0
for /f %%j in ('%ffmpeg% -i "%invideo%"  2^>^&1 ^| grep "Duration" ^| cut -d ^' ^' -f 4 ^| sed s/^,// ^| sed ^'s@\..*@@g^' ^| awk ^'{ split^($1^, A^, ":"^)^; split^(A[3]^, B^, "."^)^; print 3600*A[1] + 60*A[2] + B[1] }^'') do (
 set /a tmpTotalTime=%%j
 set /a tmpStartTime=%%j
)
if !tmpStartTime! leq 0 (set /a tmpStartTime=180)
if %direction% leq 0 (set /a tmpStartTime=0)
setlocal disabledelayedexpansion

if %direction% gtr 0 (set direction=out) else (set direction=in)
echo.

echo     [6] ������ʼʱ�䣨��λ���룩
set startTime=%tmpStartTime%
if %tmpStartTime% gtr 3 (set /a startTime=%tmpStartTime% - 3)
Set /p startTime=��������ǰ��Ƶ�ܳ�%tmpTotalTime%�룬Ĭ�ϴӵ�%startTime%�뿪ʼ��
echo.

echo     [5] ������Ч������ʱ�䣨��λ���룩
set duration=3
Set /p duration=������Ĭ��3��
echo.

echo     [4] ��Ƶ������ʣ���λ��Kbps��
set minkbps=2600
Set /p minkbps=������Ĭ��2600��
echo.

echo     [3] ��Ƶ������ʣ���λ��Kbps��
set maxkbps=3500
Set /p maxkbps=������Ĭ��3500��
echo.

echo     [2] ��Ƶ���ʣ���λ��kb/s������ѡ��128 \ 192 \ 256 \ 320��
set akbs=256
Set /p akbs=������Ĭ��256��
echo.

echo     [1] ʹ�� h264 ��������ffmpeg ����֧�֣�
echo           0   ��ʹ��
echo           1   ʹ��
set usex264=1
Set /p usex264=������Ĭ��1��
if %usex264% gtr 0 (set "usex264= -vcodec libx264") else (set "usex264=")
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
start /b /high /wait "" %ffmpeg% -i "%invideo%"%usex264% -acodec libmp3lame -threads  %cpun% -vf fade=t=%direction%:st=%startTime%:d=%duration% -filter_complex "[0:a]afade=t=%direction%:st=%startTime%:d=%duration%" -b:v %minkbps%k -b:a %akbs%k -ar 44100 -bufsize %minkbps%k -maxrate %maxkbps%k -y "%fn%_fade%direction%.mp4"

:getName
set tn=%~nx1