@echo off
title  mp4�ϲ������� by YIU
:: 2021-7-5
:: ������һ�е� = �����Ϊ���ffmpeg·��
set "ffmpeg=ffmpeg.exe"
:: ��ffmpeg·������һ��
:init
call :getname %ffmpeg%
if exist %ffmpeg% (if /i "%tn%"=="ffmpeg.exe" goto op)
cls
color 4e
echo. && echo. && echo.
set /p ffmpeg= δ�ҵ�ffmpeg�����ü��±��༭���������޸�ffmpeg·����������ffmpeg����
goto init
:op
cls
color 0b
Echo.
Echo.
Set files=
set tss=
set /a n=0
:sp
set inp=
set /a n+=1
set /p inp=  ������� %n% ��mp4�ļ�������9�س���ʼ�ϲ�����
if "%inp%"=="9" goto ed
if "%inp%"=="" (
	echo û�����룡
	set /a n-=1
	echo.
	goto sp
)
echo ������ɣ�
Set "files=%files%%inp%*"
echo.
goto sp
:ed
clear
if %n% lss 3 goto pass
color 0d
set /a n=0
:work
for /f "tokens=1* delims=*" %%a in ("%files%") do (
	echo ����ת�� %%a ...
	start /high /wait "" %ffmpeg% -i "%%a" -vcodec copy -acodec copy -vbsf h264_mp4toannexb m4m%n%.ts
	set "tss=%tss%%n%.ts|"
	set "files=%%b"
	echo ת����ɣ�
	echo.
	set /a n+=1
	goto work
)
echo.
echo ...........................................................
echo.
echo ���ںϲ�mp4...
set "tss=%tss:~0,-1%"
start /high /wait "" %ffmpeg% -i "concat:%tss%" -acodec copy -vcodec copy -absf aac_adtstoasc %~dp0output.mp4
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
echo �ѽ�mp4�ϲ��� %~dp0output.mp4
echo.
echo.
echo ������������ϲ�...
pause>nul
goto :EOF
:pass
cls
color 8f
echo.
echo -----------------------------------------
echo.
echo.
set /a m=%n%-1
echo  %m%��mp4�ϲ���......�ϲ����˸���į...
echo.
echo.
echo  ��������������ºϲ�...
pause>nul
goto op
:getname
set tn=%~nx1