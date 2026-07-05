@echo off
echo =========================================
echo LUDO AMORE - REWIND HELPER
echo =========================================
echo.
echo 10 COMMIT TERAKHIR:
echo -----------------------------------------
git log --oneline -n 10
echo -----------------------------------------
echo.
set /p commit_hash="Masukkan Hash Commit tujuan rewind (atau tekan Enter untuk batal): "

if "%commit_hash%"=="" (
    echo Batal rewind.
    pause
    exit /b
)

echo.
echo PERINGATAN: Perubahan yang belum dicommit akan HILANG!
set /p confirm="Apakah Anda yakin ingin rewind ke %commit_hash%? (y/n): "

if /i "%confirm%"=="y" (
    git reset --hard %commit_hash%
    echo.
    echo Sukses! Anda sekarang berada di commit %commit_hash%.
) else (
    echo Batal.
)
pause
