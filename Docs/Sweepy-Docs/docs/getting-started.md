---
sidebar_position: 3
---

# Getting Started

Arranca rápido con el repo: app Expo + docs.

## 1) Clona el proyecto
```bash
git clone https://github.com/tu-usuario/sweepy.git
cd Sweepy
```

## 2) Instala dependencias
```bash
# App móvil
toRoot="$(pwd)"
cd SweepyApp
npm install

# Documentación
cd "$toRoot/Docs/Sweepy-Docs"
npm install
```

## 3) Variables de entorno (SweepyApp/.env)
```env
API_BASE_URL=http://localhost:3000
NODE_ENV=development
```

## 4) Ejecuta
```bash
# App móvil
cd SweepyApp
npm start   # i (iOS) | a (Android) | w (Web)

# Docs
cd ../Docs/Sweepy-Docs
npm start   # http://localhost:3000
```

## 5) Estructura mínima
```
Sweepy/
├─ SweepyApp/        # app Expo Router
│  ├─ src/app/       # rutas y layouts
│  ├─ src/components # ui + auth
│  ├─ src/utils      # tema y constantes
│  └─ assets/
└─ Docs/Sweepy-Docs/ # Docusaurus
```

## 6) Scripts útiles
- App: `npm start`, `npm run ios`, `npm run android`, `npm run web`
- Docs: `npm start`, `npm run build`, `npm run serve`

## 7) Si algo falla
- Puerto ocupado: `lsof -i :3000` → `kill -9 <PID>`
- Caché Expo: `npm start --clear`
- Reinstalar deps: `rm -rf node_modules package-lock.json && npm install`

## 8) Dónde mirar después
- Diseño y foco de producto: [Sobre la app](./about-app.md)
- Flujo de usuario: [Guía de Usuario](./user-guide.md)
- Arquitectura: [Arquitectura](./architecture.md)
- Componentes UI: [Catálogo de Componentes](./components/index.md)
- API: [API Reference](./api.md)
