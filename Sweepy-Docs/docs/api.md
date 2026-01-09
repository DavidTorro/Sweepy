---
sidebar_position: 5
---

# API Reference

## Uso rápido
- Base URL: `/api`
- Auth: Bearer token en `Authorization` (excepto registro/login)
- Versión actual: `v1`

## Endpoints clave

### Auth
- POST `/auth/register` — email, password, fullName → devuelve token.
- POST `/auth/login` — email, password → devuelve token.

### Servicios
- GET `/services` — lista paginada (`page`, `limit`, `category`).
- POST `/services` — crear anuncio (requiere token).
- GET `/services/{id}` — detalle de anuncio.

### Mensajes
- POST `/messages` — enviar mensaje (`recipientId`, `content`, `serviceId`).
- GET `/messages/conversation/{userId}` — mensajes con un usuario.

### Usuario
- GET `/users/me` — perfil propio.
- PUT `/users/me` — actualizar perfil (nombre, bio, imagen).

## Errores comunes
- 401: token faltante o inválido.
- 403: sin permisos.
- 404: recurso no encontrado.
- 429: límite de peticiones (100/min).
- 500: error interno.
