@echo off
echo =========================================
echo LUDO AMORE - AUTOMATIC RELEASE (DEV -> MAIN)
echo =========================================
echo.

REM 1. Pastikan di branch dev
for /f "tokens=*" %%i in ('git branch --show-current') do set current_branch=%%i
if not "%current_branch%"=="dev" (
    echo [ERROR] Anda harus berada di branch 'dev' untuk rilis.
    echo Branch saat ini: %current_branch%
    pause
    exit /b
)

REM 2. Cek status bersih
git status --porcelain | findstr /R "^" >nul
if %errorlevel% equ 0 (
    echo [WARNING] Ada perubahan belum dicommit. Harap commit dulu sebelum rilis.
    git status
    pause
    exit /b
)

echo Menggabungkan 'dev' ke 'main'...
git checkout main
if %errorlevel% neq 0 goto error
git merge dev
if %errorlevel% neq 0 goto error

echo.
echo Pushing ke GitHub...
git push origin main
if %errorlevel% neq 0 goto error
git push origin dev
if %errorlevel% neq 0 goto error

echo.
echo Kembali ke branch 'dev'...
git checkout dev
if %errorlevel% neq 0 goto error

echo.
echo =========================================
echo RILIS SELESAI DAN BERHASIL!
echo =========================================
pause
exit /b

:error
echo.
echo [ERROR] Terjadi kesalahan dalam proses rilis!
echo Mengembalikan posisi ke branch 'dev'...
git checkout dev
pause
exit /b
