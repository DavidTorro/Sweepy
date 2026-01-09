---
slug: /docs/api
sidebar_position: 3
---

# API

## Uso rápido
- Base URL: `/api`
- Auth: Bearer token en `Authorization` (excepto registro/login)
- Versión: `v1`

## Endpoints clave
- POST `/auth/register` — email, password, fullName → token.
- POST `/auth/login` — email, password → token.
- GET `/services` — lista paginada (`page`, `limit`, `category`).
- POST `/services` — crear anuncio (token).
- GET `/services/{id}` — detalle.
- POST `/messages` — enviar mensaje.
- GET `/messages/conversation/{userId}` — conversación.
- GET `/users/me` — perfil propio.
- PUT `/users/me` — actualizar perfil.

## Errores comunes
- 401: token faltante/ inválido.
- 403: sin permisos.
- 404: no encontrado.
- 429: límite de peticiones (100/min).
- 500: error interno.
