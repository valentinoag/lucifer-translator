@echo off
cd /d "%~dp0"
set "VENV=%LOCALAPPDATA%\LuciferTranslator\venv"
if not exist "%VENV%\.lucifer-ok" (
    call setup.bat nopause
    if errorlevel 1 (
        pause
        exit /b 1
    )
)
start "" "%VENV%\Scripts\pythonw.exe" translator.py
