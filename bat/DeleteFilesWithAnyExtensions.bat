@echo off
title ɾ��ָ����չ�����ļ� by YIU
color b
echo.
echo.
:start
echo.
echo 		   �Ѱ���Ҫɾ�����ļ����ļ������봰��
echo.
echo.
set /p ml=""
if %ml%=="" goto badpath
if not exist %ml% set badfolder=1 && goto badpath
:startnext
echo.
echo.
echo         ������Ҫɾ�����ļ���׺��������ʹ��ͨ��� *    ���� png
echo         Ҫɾ�������׺�����ļ��� \ �ָ���   ���� png\txt
echo         ������ɺ󰴻س�����ʼɾ��
echo.
echo.
set /p exts=
if "%exts%"=="" goto badexts
if not exist %ml% set badfolder=1 && goto badpath
cls
color e
echo.
echo   ���ڴ� %ml% �ļ�����
echo   ɾ������ %exts% ��׺�����ļ�
echo.
echo   �����ȡ�������� 6 ���ڹرմ���
echo.
echo   ���س������̽���ɾ��
echo.
timeout /t 6
echo.
echo   ��Ůɾ����......
echo.
timeout /t 1 >nul
set nextexts=%exts%
:loop
for /f "tokens=1* delims=\" %%a in ("%nextexts%") do (
    for /r %ml% %%i in (*.%%a) do del /f /s /q "%%i"
    set nextexts=%%b
)
if defined nextexts goto :loop
color b
echo.
echo.
echo  ɾ�����!
timeout /t 1 >nul
goto :EOF
:badpath
echo. 
if %badfolder% neq 1 (
echo         ����ļ������봰��
) else (
echo         �ļ��в�����! �����������ļ���
)
echo.
echo.
set ml=""
set exts=
set badfolder=0
pause
cls
goto start
:badexts
echo.
echo         ������Ҫɾ�����ļ���׺��   ���� png
echo.
echo.
pause
cls
echo.
echo ��ǰ���ļ���·��: %ml%
goto startnext