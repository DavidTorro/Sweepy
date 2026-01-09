---
slug: /app/arquitectura
sidebar_position: 2
---

# Arquitectura

## Estructura del proyecto

```
Sweepy/
├─ SweepyApp/          # Aplicación móvil principal
│  ├─ src/app/         # Rutas y layouts (Expo Router)
│  ├─ src/components/  # Componentes reutilizables
│  ├─ src/hooks/       # Custom hooks
│  ├─ src/utils/       # Tema y constantes
│  └─ assets/          # Recursos estáticos
└─ Docs/Sweepy-Docs/   # Documentación (Docusaurus)
```

## Stack tecnológico

### Aplicación móvil (Frontend)

- React Native
- Expo (con Expo Router)
- Context API / Hooks
- NativeWind + TypeScript

### Backend

- Firebase
  - Firestore (Base de datos)
  - Authentication
  - Storage (Imágenes)
  - Hosting para el panel admin

### Panel de Administración

- React o Next.js
- Firebase Admin SDK

### Documentación

- Docusaurus 3
- React + MDX

## Componentes UI

Button, TextField, ClienteCard, SelectButton, SegmentedControl, Separator

## Flujo de datos

- Autenticación: login/register → token → Home
- Publicación: Crear → formulario → backend → visible en Home
- Chat: abrir anuncio → iniciar chat en tiempo real

## Base de datos

Tablas principales: usuarios, anuncios, mensajes, transacciones, reseñas

## Seguridad

- Autenticación requerida
- Validación en backend
- HTTPS en producción
