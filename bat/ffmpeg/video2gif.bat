@echo off
title ffmpeg ��Ƶת GIF ͼƬ by YIU
::Last 2025-02-27

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
set invideo=%1
if defined invideo set "invideo=%invideo:"=%" & set formdrag=1 & goto argop

:op
echo.
echo.
echo     �� �밴������ʾ���������س�
echo.
echo     [4] ������Ƶ�ļ�(video)��
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

echo     [3] ����ת����ͼƬ��ȣ���λ��px ���أ�
set width=0
Set /p width=������Ĭ��ԭʼ��С���������֣���
if %width% gtr 0 (set "scale=scale=%width%:-1:flags=lanczos,") else (set "scale=")
echo.
echo.

echo     [2] ÿ��֡�����ʣ���λ��fps��
set fps=0
Set /p fps=������Ĭ���Զ����ʣ��������֣���
if %fps% gtr 0 (set "fps=fps=%fps%,") else (set "fps=")
echo.
echo.

:InputColor
set colorkey=
echo     [1] ͸��ɫ��ɫ���� ��ָ����ɫ͸���� ���ӣ�0x00FF00��
set hexColor=
Set /p hexColor=������Ĭ�Ϻ��ԣ���������
if not defined hexColor goto convert
echo %hexColor%|findstr /r "^0x[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]$" || goto InputColorError
set "colorkey=chromakey=%hexColor%"
echo.
echo.
goto InputColorSimilarity

:InputColorError
echo.
echo ��  �������ɫ��ʽ�������������룡
echo.
goto InputColor

:InputColorSimilarity
echo     [1.2] ͸��ɫ���ƶȣ�0.01 ��ȫ����  ~ 1 ƥ���κ���ɫ��
set similarity=0.2
Set /p similarity=������Ĭ�� 0.2���������֣���
echo %similarity%|findstr /r "^1$" || ^
echo %similarity%|findstr /r "^0\.[0-9][1-9]$" || ^
echo %similarity%|findstr /r "^0\.[1-9]$" || ^
goto InputColorSimilarityError
set "colorkey=%colorkey%:%similarity%"
echo.
echo.
goto InputColorBlend

:InputColorSimilarityError
echo.
echo ��  ��������ƶȴ��������� 0.01~1 ֮�������
echo.
goto InputColorSimilarity

:InputColorBlend
echo     [1.1] ͸��ɫ�ں϶ȣ�0 ��ȫ͸�� ~ 1 ��ȫ��͸����
set blend=0.28
Set /p blend=������Ĭ�� 0.28���������֣���
echo %blend%|findstr /r "^[0-1]$" || ^
echo %blend%|findstr /r "^0\.[0-9][1-9]$" || ^
echo %blend%|findstr /r "^0\.[1-9]$" || ^
goto InputColorBlendError
set "colorkey=%colorkey%:%blend%,"
echo.
echo.
goto convert

:InputColorBlendError
echo.
echo ��  ������ں϶ȴ��������� 0~1 ֮�������
echo.
goto InputColorBlend


:convert
::ȡCPU�����������߳�
for /f %%a in ('powershell -command "Get-WmiObject Win32_Processor | Measure-Object -Property NumberOfCores -Sum | Select-Object -ExpandProperty Sum"') do set /a cpun=%%a

:: CPU���������� 2 ʱȡһ��
setlocal enabledelayedexpansion
if !cpun! gtr 2 (
    set /a cpun=!cpun! / 2
)
if !cpun! lss 1 set cpun=1
setlocal disabledelayedexpansion

set ffmpegRun=%ffmpeg% -i "%invideo%" -threads %cpun% -vf "%colorkey%%fps%%scale%split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 -y "%fn%.gif"

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
echo --=== FFmpeg Video to Gif ��ƵתGIF������  Ver 1.2  by YIU ===--
goto :eof