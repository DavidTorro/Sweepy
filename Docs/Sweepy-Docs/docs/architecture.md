---
sidebar_position: 3
---

# Arquitectura de Sweepy

## Descripción General

Sweepy está construida con una arquitectura modular separando el frontend de la aplicación móvil, documentación y componentes reutilizables.

## Estructura de Carpetas

```
Sweepy/
├── SweepyApp/          # Aplicación principal Expo
│   ├── src/
│   │   ├── app/        # Rutas y layouts con Expo Router
│   │   ├── components/ # Componentes reutilizables
│   │   ├── hooks/      # Custom hooks
│   │   └── utils/      # Utilidades y constantes
│   └── assets/         # Recursos estáticos
│
└── Docs/               # Documentación
    └── Sweepy-Docs/    # Docusaurus
```

## Stack Tecnológico

### App móvil

- React Native + Expo con Expo Router
- Estilos con NativeWind; TypeScript en todo
- Secciones clave: `/app/(tabs)/home`, `chat`, `crear`, `mis-anuncios`, `perfil`
- Admin: `/app/admin/adminPortal.tsx` y `admin/login.tsx`

### UI reutilizable

- `components/ui/`: `Button`, `TextField`, `ClienteCard`, `SelectButton`, `SegmentedControl`, `Separator`
- Temas y constantes en `utils/theme.ts` y `utils/constants.ts`

### Flujo simple

- Autenticación: login/register → token → redirección a Home
- Publicar: Crear → formulario → backend → anuncio visible en Home
- Chat: abrir anuncio → iniciar chat → mensajes en tiempo real

### Datos

- Tablas básicas (ver `recursos_aules/Tablas.sql`): usuarios, anuncios, mensajes, transacciones, reseñas.

### Seguridad

- Todo tras autenticación, validación en backend, HTTPS en producción.
