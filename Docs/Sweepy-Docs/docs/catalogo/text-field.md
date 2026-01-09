---
slug: /catalogo/text-field
sidebar_position: 2
---

# Text Field

Campo de texto con validación y estilos coherentes.

- Archivo: `src/components/ui/TextField.tsx`
- Props: `placeholder`, `value`, `onChangeText`, `error`, `secureTextEntry`.
- Compatibilidad con tema claro/oscuro.

## Uso
```tsx
import { TextField } from '@/components/ui/TextField';

<TextField
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
/>
```
