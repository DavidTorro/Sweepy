---
slug: /docs/login
sidebar_position: 1
---

# Login y autenticación

## Credenciales
- Email + contraseña para acceso básico.
- Social login (Google, Apple en iOS) recomendado para menos fricción.

## Estados y errores
- 401: token faltante/ inválido.
- 403: permisos insuficientes.
- Reintento: mostrar mensaje breve y CTA de re-login.

## Buenas prácticas de UI
- Validar email/contraseña en cliente.
- Botón deshabilitado mientras envía.
- Mostrar spinner corto y mensajes claros.

## Backend
- `POST /auth/login` → token.
- `POST /auth/register` → token.
- Usa Bearer token en peticiones posteriores.
