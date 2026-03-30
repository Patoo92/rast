#!/bin/bash

# Script de instalación para PWA Rastreo de Paquetes
# Uso: bash setup.sh

echo "================================================"
echo "🚀 Configuración de PWA Rastreo de Paquetes"
echo "================================================"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "Por favor, descarga Node.js desde https://nodejs.org"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo ""

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

echo "✅ npm detectado: $(npm --version)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente"
echo ""

# Crear archivo .env.local
if [ ! -f .env.local ]; then
    echo "🔧 Creando archivo .env.local..."
    cp .env.example .env.local
    echo "✅ Archivo .env.local creado"
    echo "   ⚠️  Recuerda configurar tus API keys en .env.local"
else
    echo "✅ Archivo .env.local ya existe"
fi

echo ""
echo "================================================"
echo "✨ ¡Configuración completada!"
echo "================================================"
echo ""
echo "🚀 Para iniciar el servidor de desarrollo:"
echo "   npm start"
echo ""
echo "📦 Para crear una versión de producción:"
echo "   npm run build"
echo ""
echo "📚 Para más información, ver README.md"
echo ""
