@echo off
rem Builds a standalone LuciferTranslator.exe folder on this PC. Any language packs already
rem installed (the models folder) are copied in. The easier route - no Python needed - is
rem the ready-made download built by GitHub; see README.md.
rem Build files go under %LOCALAPPDATA%\LuciferTranslator to stay clear of Windows'
rem 260-character path limit.
setlocal
cd /d "%~dp0"
set "VENV=%LOCALAPPDATA%\LuciferTranslator\venv"
set "OUT=%LOCALAPPDATA%\LuciferTranslator"

if not exist "%VENV%\.lucifer-ok" call setup.bat nopause
if not exist "%VENV%\.lucifer-ok" (
    pause
    exit /b 1
)

"%VENV%\Scripts\python.exe" -m pip install --upgrade --prefer-binary pyinstaller
if errorlevel 1 (
    echo Installing PyInstaller failed.
    pause
    exit /b 1
)

"%VENV%\Scripts\python.exe" build_exe.py "%OUT%\dist" "%OUT%\build"
if errorlevel 1 (
    echo.
    echo Build failed - see the messages above.
    pause
    exit /b 1
)

if exist "models\packages" (
    echo Copying installed language packs...
    xcopy /e /i /y /q "models\packages" "%OUT%\dist\LuciferTranslator\models\packages" >nul
)

echo.
echo Testing the built app...
"%OUT%\dist\LuciferTranslator\LuciferTranslator.exe" --selftest "%OUT%\selftest.txt"
type "%OUT%\selftest.txt"

echo.
echo Done: %OUT%\dist\LuciferTranslator\LuciferTranslator.exe
echo Zip that LuciferTranslator folder to move it to another PC.
explorer "%OUT%\dist"
pause
