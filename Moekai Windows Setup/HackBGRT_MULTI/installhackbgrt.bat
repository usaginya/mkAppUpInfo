::HACKBGRT INSTALL BATCH BY MOEKAI,YIU & FREE_WING,Y.Sakamoto
::You need to edit config.txt properly in advance
::Execute following Command in Command Prompt(cmd.exe) as Administrator
::See http://www.neko.ne.jp/~freewing/software/windows_10_customize_boot_logo_hackbgrt/
@echo off&setlocal enabledelayedexpansion

::Source folder
set SOURCE_FOLDER=%SystemDrive%\mkhackbg

::Verify whether the boot method is UEFI
set VERIFY_BOOT_METHOD=
for /f %%i in ('bcdedit /enum {current}^|find ".efi"') do (
	set "VERIFY_BOOT_METHOD=%%i"
)
if "%VERIFY_BOOT_METHOD%"=="" (
	echo Does not support BIOS boot mode.
	timeout /t 3 >nul
	goto :EOF
)

::Set nonexistent efi drive letter and hackbgrt path and create it
set EFI_DRIVE_LETTER=
for %%c in (Z,Y,X,W,V,U,T,S,R,Q,P,O,N,M,L,K,J,I,H,G,F,E,D) do (
	if "!EFI_DRIVE_LETTER!"=="" (
		if not exist %%c: (
			set "EFI_DRIVE_LETTER=%%c"
			goto next
		)
	)
)
:next
set HACK_BGRT_PATH=%EFI_DRIVE_LETTER%:\EFI\HackBGRT

mountvol %EFI_DRIVE_LETTER%: /S

dir %EFI_DRIVE_LETTER%:
mkdir %HACK_BGRT_PATH%
cd %HACK_BGRT_PATH%
dir %EFI_DRIVE_LETTER%:

::Copy files
::You have to need Edit config.txt , Before copying it.
copy %SOURCE_FOLDER%\config.txt %EFI_DRIVE_LETTER%:
::You change to your favorite image file, the image file name is the same as in config.txt
copy %SOURCE_FOLDER%\moekaiwinboot.png %EFI_DRIVE_LETTER%:
copy %SOURCE_FOLDER%\bootx64.efi %EFI_DRIVE_LETTER%:

::Hide efi drive letter
dir %EFI_DRIVE_LETTER%:
mountvol %EFI_DRIVE_LETTER%: /D

::Change boot loader to \EFI\HackBGRT\bootx64.efi
bcdedit /set {bootmgr} path \EFI\HackBGRT\bootx64.efi
::You change to your favorite description
bcdedit /set {bootmgr} description "Moekai System Boot"

::Add trusted certificate
%SOURCE_FOLDER%\certmgr.exe -add -c %SOURCE_FOLDER%\moekai.spc -s -r localMachine root

::Clear files
rd /s /q %SOURCE_FOLDER%
del "%0"

exit