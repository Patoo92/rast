@echo off
REM Script de instalación para PWA Rastreo de Paquetes - Windows
REM Uso: setup.bat

echo ================================================
echo 🚀 Configuración de PWA Rastreo de Paquetes
echo ================================================
echo.

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo Por favor, descarga Node.js desde https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js detectado: %NODE_VERSION%
echo.

REM Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm no está instalado
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm detectado: %NPM_VERSION%
echo.

REM Instalar dependencias
echo 📦 Instalando dependencias...
call npm install

if errorlevel 1 (
    echo ❌ Error instalando dependencias
    pause
    exit /b 1
)

echo ✅ Dependencias instaladas correctamente
echo.

REM Crear archivo .env.local
if not exist .env.local (
    echo 🔧 Creando archivo .env.local...
    copy .env.example .env.local
    echo ✅ Archivo .env.local creado
    echo    ⚠️  Recuerda configurar tus API keys en .env.local
) else (
    echo ✅ Archivo .env.local ya existe
)

echo.
echo ================================================
echo ✨ ¡Configuración completada!
echo ================================================
echo.
echo 🚀 Para iniciar el servidor de desarrollo:
echo    npm start
echo.
echo 📦 Para crear una versión de producción:
echo    npm run build
echo.
echo 📚 Para más información, ver README.md
echo.
pause
