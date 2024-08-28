@echo off
title spine-export ����ģ�Ͷ�������
::Last 2024-08-29

:init
call :INFO

set formdrag=0
set indir=%1
if defined indir set "indir=%indir:"=%" & set formdrag=1 & goto argop

:op
echo.
echo.
echo     �� �밴������ʾ���������س�
echo.
echo     [6] ���뺬�� spine ģ�͵��ļ��С�ע�������ļ��к����� ���� �ᱻ�滻ΪӢ�� " ��
Set /p indir=������
:argop
if "%indir:"=%"=="" goto op
echo.

if %formdrag% gtr 0 (
echo.
echo.
echo     �� �밴������ʾ���������س�
echo.
)

echo     [5] ���������ͣ� 1.gif / 2.png / 3.sequence / 4.mov ��
Set etype=
Set /p etype=��������������ѡ�����֣�Ĭ�� gif����
if not defined etype (set "etype=gif" & goto etypeend)
if %etype% leq 1 (set "etype=gif" & goto etypeend)
if %etype% geq 4 (set "etype=mov" & goto etypeend)
if %etype%=="2" (set "etype=png" & goto etypeend)
if %etype%=="3"  (set "etype=sequence")
echo.
:etypeend
echo %etype%
if %etype%=="png" goto reszie
if %etype%=="sequence" goto reszie
echo.
echo.

echo     [4] �����Ķ���֡�٣�fps��
Set fps=
Set /p fps=������������ֵ��Ĭ�� 30����
if not defined fps set "fps=30"
echo.
echo %fps%
echo.
echo.

:reszie
echo     [3] ���������ţ�1x��
Set scale=
Set /p scale=�������������ű�����Ĭ�� 1����
if not defined scale set "scale=1"
echo.
echo %scale%
echo.
echo.

echo     [2] �Ƿ�ʹ��Ԥ��Alpha����
Set pma=
Set /p pma=������ѡ��   0.��ʹ��   1.ʹ��  ��Ĭ�� 0����
if not defined pma (set "pma=false" & goto pamend)
if %pma% neq 0 (set "pma=true") else (set "pma=false")
:pamend
echo.
if %pma%==false (echo ��ʹ��) else (echo ʹ��)
echo.
echo.

:output
echo     [1] ������·�����ļ������ļ�����ʽ����ʹ�����´�����ģ���ַ���
echo          {assetName}         ��Դ����
echo          {assetPath}         ��Դ����·��
echo          {fps}               fpsѡ��
echo          {scale}             scaleѡ��
echo          {animationName}     ��ǰ��ȡ�Ķ�������
echo.
Set outdir=
Set /p outdir=���������� ·��^/�ļ����� Ĭ�� spine-output^/{assetName}_{animationName} ����
if not defined outdir set "outdir=spine-output/{assetName}_{animationName}"
echo.
echo %outdir%
echo.
echo.

spine-export-cli -e %etype% -f %fps% --scale %scale% --pma %pma% -o "%outdir%" "%indir%"

:INFO
echo.
echo --=== spine-export ����ģ�Ͷ������������� by YIU ===--
echo --- Github: https://github.com/Nattsu39/spine-exporter ---
goto :eof