@echo off
title  mp4�ϲ������� by YIU
:: 2021-7-5 v9
:: ������һ�е� = �����Ϊ���ffmpeg·��
set "ffmpeg=ffmpeg.exe"
:: ��ffmpeg·������һ��
:init
call :getName "%ffmpeg%"
if exist "%ffmpeg%" (if /i "%tn%"=="ffmpeg.exe" goto op)
cls
color 4e
echo. && echo. && echo.
set /p ffmpeg= δ�ҵ�ffmpeg�����ü��±��༭���������޸�ffmpeg·����������ffmpeg����
goto init
:op
cls
color 0b
echo. && echo.
set ofn=
set files=
set tss=
set /a n=0
:sp
set inp=
set /a n+=1
set /p inp=  ������� %n% ��mp4�ļ���ֱ�ӻس���ʼ�ϲ�����
if not defined inp goto ed
call :getExt %inp%
if /i not "%te%"==".mp4" (
	echo ������ļ�������mp4��ʽ��
	set /a n-=1
	echo.
	goto sp
)
if %inp%=="" (
	echo û�����룡
	set /a n-=1
	echo.
	goto sp
)
if %n% equ 1 (
	call :getPureName %inp%
	set "ofn=%tpn%"
)
echo ������ɣ�
set "files=%files%%inp%*"
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
	start /high /wait "" %ffmpeg% -y -i %%a -vcodec copy -acodec copy -vbsf h264_mp4toannexb m4m%n%.ts
	set "tss=%tss%m4m%n%.ts|"
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
echo "concat:%tss%"
start /high /wait "" %ffmpeg% -y -i "concat:%tss%" -c copy %ofn%_merge.mp4
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
echo �ѽ�mp4�ϲ��� %~dp0%ofn%_merge.mp4
echo.
echo.
echo ���������λmp4�������ϲ�...
pause>nul
start "" explorer /e,/select,%~dp0%ofn%_merge.mp4
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
:getName
set tn=%~nx1
:getExt
set te=%~x1
:getPureName
set tpn=%~n1