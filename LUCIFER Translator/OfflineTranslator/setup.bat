@echo off
rem One-time setup for LUCIFER Translator: creates a private Python 3.12 environment
rem and installs the translation engine into it.
rem
rem The environment lives in %LOCALAPPDATA%\LuciferTranslator\venv. A short path avoids
rem Windows' 260-character path limit, which big packages such as torch can hit when
rem installed deep inside Downloads or Desktop.
rem
rem Pass any argument (e.g. "setup.bat nopause") to skip the final pause.
setlocal
cd /d "%~dp0"
set "VENV=%LOCALAPPDATA%\LuciferTranslator\venv"
set "LOG=%~dp0setup-log.txt"
set "CHECK=import sys; sys.exit(0 if sys.version_info[:2] in ((3, 11), (3, 12)) else 1)"

rem --- 1. Find Python 3.12 or 3.11. Newer versions lack ready-made Windows packages for torch and spaCy.
set "PY="
for %%V in (3.12 3.11) do if not defined PY (py -%%V -c "%CHECK%" >nul 2>nul && set "PY=py -%%V")
if not defined PY (python -c "%CHECK%" >nul 2>nul && set "PY=python")
if not defined PY if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" set PY="%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
if not defined PY if exist "%ProgramFiles%\Python312\python.exe" set PY="%ProgramFiles%\Python312\python.exe"

if not defined PY (
    echo.
    echo LUCIFER Translator needs Python 3.12.
    echo Newer versions such as 3.13 and 3.14 are missing ready-made Windows packages
    echo that the translation engine depends on. Python 3.12 can be installed alongside them.
    echo.
    where winget >nul 2>nul
    if errorlevel 1 (
        echo Install the latest Python 3.12 Windows installer from https://www.python.org/downloads/windows/
        echo then run setup.bat again.
        if "%~1"=="" pause
        exit /b 1
    )
    choice /c YN /m "Install Python 3.12 now from python.org using winget"
    if errorlevel 2 (
        echo Install the latest Python 3.12 Windows installer from https://www.python.org/downloads/windows/
        echo then run setup.bat again.
        if "%~1"=="" pause
        exit /b 1
    )
    rem "--source winget" skips the Microsoft Store source, which often fails with
    rem "Failed when searching source: msstore" and isn't needed for Python.
    winget install -e --id Python.Python.3.12 --source winget --scope user --accept-package-agreements --accept-source-agreements
)
if not defined PY if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" set PY="%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
if not defined PY if exist "%ProgramFiles%\Python312\python.exe" set PY="%ProgramFiles%\Python312\python.exe"

rem If winget didn't work, download the official installer straight from python.org.
set "PYSETUP=%TEMP%\python-3.12.10-amd64.exe"
if not defined PY (
    echo.
    echo winget could not install Python - downloading the installer from python.org instead...
    curl.exe -L --fail -o "%PYSETUP%" https://www.python.org/ftp/python/3.12.10/python-3.12.10-amd64.exe
)
if not defined PY if exist "%PYSETUP%" (
    echo Installing Python 3.12 for this user - this takes a minute...
    start /wait "" "%PYSETUP%" /quiet InstallAllUsers=0 Include_launcher=1 Include_test=0 PrependPath=0
    del "%PYSETUP%"
)
if not defined PY if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" set PY="%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
if not defined PY (
    echo.
    echo Python 3.12 still was not found. Install it from https://www.python.org/downloads/windows/
    echo then close this window and run setup.bat again.
    if "%~1"=="" pause
    exit /b 1
)
echo Using Python: %PY%

rem --- 2. Remove environments left by earlier attempts, including ones made with the wrong Python.
if exist ".venv" rmdir /s /q ".venv"
if exist "%VENV%\Scripts\python.exe" (
    "%VENV%\Scripts\python.exe" -c "%CHECK%" >nul 2>nul || rmdir /s /q "%VENV%"
)
if not exist "%VENV%\Scripts\python.exe" (
    echo Creating the Python environment...
    %PY% -m venv "%VENV%"
)
if not exist "%VENV%\Scripts\python.exe" (
    echo Could not create the Python environment in %VENV%
    if "%~1"=="" pause
    exit /b 1
)

rem --- 3. Install packages. Details are also written to setup-log.txt for troubleshooting.
if exist "%LOG%" del "%LOG%"
if exist "%VENV%\.lucifer-ok" del "%VENV%\.lucifer-ok"
echo.
echo Installing the translation engine. The first time this downloads about 1 GB
echo and can take 10-20 minutes - please keep this window open.
echo.
"%VENV%\Scripts\python.exe" -m pip install --upgrade pip setuptools wheel
"%VENV%\Scripts\python.exe" -m pip install --prefer-binary --log "%LOG%" -r requirements.txt
if errorlevel 1 (
    echo.
    echo Installing packages failed.
    echo The full details are in setup-log.txt in this folder - send that file to get help.
    if "%~1"=="" pause
    exit /b 1
)
echo ok> "%VENV%\.lucifer-ok"

echo.
echo Setup complete. Double-click run.bat to start LUCIFER Translator.
if "%~1"=="" pause
exit /b 0
