@echo off
title ffmpeg ��Ƶת GIF ͼƬ by YIU
::Last 2022-01-23

:: ������һ�е� = �����Ϊ���ffmpeg·��
set "ffmpeg=%~dp0tools\ffmpeg.exe"
:: ��ffmpeg·������һ��

:init
set "ffmpeg=%ffmpeg:"=%"
call :getName "%ffmpeg%"
if not exist "%ffmpeg%" (if /i "%tn%"=="ffmpeg.exe" set "ffmpeg=ffmpeg")

set formdrag=0
set invideo=%1
if "%invideo%" neq "" set formdrag=1 & goto argop

:op
echo.
echo.
echo     �� �밴������ʾ���������س�
echo.
echo     [3] ������Ƶ�ļ�(video)��
Set /p invideo=������
:argop
if "%invideo:"=%"=="" goto op
for /f "delims=" %%f in ("%invideo%") do set fn=%%~dpnf&set invideo=%%~dpnxf
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     �� �밴������ʾ���������س�
echo.
)

echo     [2] ����ת����ͼƬ��ȣ���λ��px ���أ�
set width=0
Set /p width=������Ĭ��ԭʼ��С���������֣���
if %width% gtr 0 (set "scale=scale=%width%:-1:flags=lanczos,") else (set "scale=")
echo.
echo.

echo     [1] ÿ��֡�����ʣ���λ��fps��
set fps=0
Set /p fps=������Ĭ���Զ����ʣ��������֣���
if %fps% gtr 0 (set "fps=fps=%fps%,") else (set "fps=")
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

start /b /high /wait "" %ffmpeg% -i "%invideo%" -threads %cpun% -vf "%fps%%scale%split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 -y "%fn%.gif"

:getName
set tn=%~nx1