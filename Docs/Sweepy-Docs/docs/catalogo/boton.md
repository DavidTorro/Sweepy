---
slug: /catalogo/boton
sidebar_position: 1
---

# Botón

Botón reutilizable con variantes y estados.

- Archivo: `src/components/ui/Button.tsx`
- Props típicas: `title`, `onPress`, `variant`, `disabled`, `loading`.
- Estilos con NativeWind; soporta tema claro/oscuro.

## Uso
```tsx
import { Button } from '@/components/ui/Button';

<Button title="Publicar" onPress={handleSubmit} variant="primary" />
```

## Notas
- Deshabilita en envíos para evitar dobles clics.
- Usa `loading` para mostrar spinner.
