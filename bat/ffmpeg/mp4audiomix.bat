@echo off
title  mp4���� by YIU
:: 2021-7-17 v6
:: ������һ�е� = �����Ϊ���ffmpeg·��
set "ffmpeg=tools\ffmpeg.exe"
:: ��ffmpeg·������һ��
:init
set "ffmpeg=%ffmpeg:"=%"
call :getName "%ffmpeg%"
if exist "%ffmpeg%" (if /i "%tn%"=="ffmpeg.exe" goto op)
cls
color 4e
echo. && echo. && echo.
set /p ffmpeg= δ�ҵ�ffmpeg�����ü��±��༭���������޸�ffmpeg·����������ffmpeg����
goto init
cls
:op
color 0b
echo. && echo.
set iv=
set ofn=
set /p iv=  ������ 1 ��mp4�ļ���
if "%iv%"=="" (
	echo û�����룡
	echo.
	goto op
)
call :getExt %iv%
if /i not "%te%"==".mp4" (
	echo ������ļ�������mp4��ʽ��
	echo.
	goto op
)
call :getPureName %iv%
set "ofn=%tpn%"
call :getZipPath %iv%
echo %zip%%tpn%
:rea
echo.
set ia=
set /p ia=  ������ 1 ��aac�ļ���ΪBGM��
if "%ia%"=="" (
	echo û�����룡
	echo.
	goto rea
)
call :getExt %ia%
if /i not "%te%"==".aac" (
	echo ������ļ�������aac��ʽ��
	echo.
	goto rea
)
:svv
echo.
set "vv=1"
set /p vv=  ��Ƶ������С^[Ĭ��1^(100%^)^]��
echo ��Ƶ������Ϊ�ˣ�%vv%
:sva
echo.
set "va=0.5"
set /p va=  BGM������С^[Ĭ��0.5^(50%^)^]��
echo ��Ƶ������Ϊ�ˣ�%va%
echo.
echo ���ڻ���mp4...
timeout /t 2>nul
color 0d
start /high /wait "" "%ffmpeg%" -y -i %iv% -i %ia% -c:v copy -map 0:v:0 -filter_complex "[0:a]volume=%vv%[0a];[1:a]volume=%va%[1a];[0a][1a]amerge=inputs=2[aout]" -map "[aout]" -ac 2 -y %zip%%ofn%_remix.mp4
echo.
color 2e
echo.
echo.
echo.
echo �ѽ�mp4������ %zip%%ofn%_remix.mp4
echo.
echo.
echo ���������λmp4����������...
pause>nul
start "" explorer /e,/select,%zip%%ofn%_remix.mp4
goto :EOF
:getName
set tn=%~nx1
:getExt
set te=%~x1
:getPureName
set tpn=%~n1
:getZipPath
set zip=%~dp1