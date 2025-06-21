@echo off
REM Setup script for Microsoft Sentinel Audit Tool
REM Elaborado por Latitud42

echo ========================================
echo Microsoft Sentinel Audit - Setup
echo Elaborado por Latitud42
echo ========================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python no esta instalado
    echo Instala Python desde https://python.org
    pause
    exit /b 1
)

REM Create virtual environment
echo Creando entorno virtual...
python -m venv env

REM Activate virtual environment
echo Activando entorno virtual...
call env\Scripts\activate.bat

REM Install requirements
echo Instalando dependencias...
pip install -r requirements.txt

echo.
echo ========================================
echo Setup completado!
echo ========================================
echo.
echo Para usar el script:
echo 1. Copia .env.example a .env
echo 2. Completa los valores en .env
echo 3. Ejecuta: python sentinel_audit.py
echo.
echo Para activar el entorno virtual manualmente:
echo call env\Scripts\activate.bat
echo.
pause
