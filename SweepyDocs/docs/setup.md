---
sidebar_position: 4
---

# Configuración rápida

## Requisitos
- Node.js 20+ y npm
- Git
- Expo CLI (global) para la app móvil

## Instalar
```bash
git clone https://github.com/tu-usuario/sweepy.git
cd Sweepy

# App móvil
cd SweepyApp
npm install

# Documentación
cd ../Docs/Sweepy-Docs
npm install
```

## Ejecutar
```bash
# App móvil (Expo)
cd SweepyApp
npm start   # i (iOS) | a (Android) | w (Web)

# Documentación
cd ../Docs/Sweepy-Docs
npm start   # http://localhost:3000
```

## Variables de entorno (SweepyApp/.env)
```env
API_BASE_URL=http://localhost:3000
NODE_ENV=development
```

## Scripts útiles
- App: `npm start`, `npm run ios`, `npm run android`, `npm run web`
- Docs: `npm start`, `npm run build`, `npm run serve`

## Si algo falla
- Puerto 3000 ocupado: `lsof -i :3000` y `kill -9 <PID>`
- Limpiar caché Expo: `npm start --clear`
- Reinstalar deps: `rm -rf node_modules package-lock.json && npm install`
