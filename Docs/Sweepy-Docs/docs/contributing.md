---
sidebar_position: 6
---

# Contribuyendo a Sweepy

¡Nos encantaría recibir tus contribuciones! Aquí hay las pautas para contribuir al proyecto.

## Empezar

1. **Fork** el repositorio
2. **Clona** tu fork localmente
3. **Crea una rama** para tu feature: `git checkout -b feature/amazing-feature`
4. **Realiza cambios** y haz commit: `git commit -m 'Add amazing feature'`
5. **Push** a tu fork: `git push origin feature/amazing-feature`
6. **Abre un Pull Request**

## Estándares de Código

### TypeScript
- Utiliza tipos explícitos
- Evita `any`
- Usa interfaces para contratos

```typescript
interface ServiceListing {
  id: string;
  title: string;
  price: number;
}
```

### Naming Conventions
- Componentes: `PascalCase` (ej: `UserProfile.tsx`)
- Funciones: `camelCase` (ej: `getUserProfile()`)
- Constantes: `UPPER_SNAKE_CASE` (ej: `API_BASE_URL`)
- Archivos: minúsculas con guiones (ej: `user-profile.ts`)

### Formato de Código

```bash
# Formatea el código
npx prettier --write .

# Verifica tipos
npm run typecheck
```

## Commits

Sigue el formato convencional:

```
feat: Agrega nueva funcionalidad
fix: Corrige un bug
docs: Actualiza documentación
refactor: Refactoriza código
test: Agrega pruebas
chore: Cambios de configuración
```

## Revisar Pull Requests

Cada PR será revisado por al menos un mantenedor. Por favor:

- Proporciona una descripción clara
- Incluye capturas de pantalla para cambios UI
- Asegúrate de que las pruebas pasen
- Resuelve conflictos de merge

## Reportar Bugs

Cuando reportes un bug, incluye:

1. Descripción clara del problema
2. Pasos para reproducir
3. Comportamiento esperado
4. Comportamiento actual
5. Screenshots si aplica
6. Entorno (OS, navegador, versión Node)

## Solicitar Features

Para solicitar nuevas características:

1. Describe el caso de uso
2. Explica por qué es útil
3. Sugiere una implementación posible

## Preguntas

Para preguntas generales, abre una **Discussion** en lugar de una issue.

¡Gracias por contribuir a Sweepy! 🎉
