---
sidebar_position: 1
---

# Catálogo de Componentes

Sweepy incluye una librería de componentes UI reutilizables construida con React Native y NativeWind. Cada componente está optimizado para la plataforma móvil y web.

## Estructura de Componentes

Todos los componentes se encuentran en `SweepyApp/src/components/`:

```
components/
├── auth/          # Componentes de autenticación
│   └── SocialButton.tsx
├── ui/           # Componentes UI reutilizables
│   ├── Button.tsx
│   ├── ClienteCard.tsx
│   ├── SegmentedControl.tsx
│   ├── SelectButton.tsx
│   ├── Separator.tsx
│   └── TextField.tsx
└── hooks/        # Custom hooks
```

## Componentes Disponibles

### Button
Botón personalizable con soporte para diferentes estilos y variantes.

**Ubicación:** `src/components/ui/Button.tsx`

### TextField
Campo de texto con validación y personalizaciones.

**Ubicación:** `src/components/ui/TextField.tsx`

### ClienteCard
Tarjeta para mostrar servicios o perfiles de usuarios.

**Ubicación:** `src/components/ui/ClienteCard.tsx`

### ⚙️ SegmentedControl
Control segmentado para selección múltiple.

**Ubicación:** `src/components/ui/SegmentedControl.tsx`

### 🔘 SelectButton
Botón de selección personalizado.

**Ubicación:** `src/components/ui/SelectButton.tsx`

### ✂️ Separator
Separador visual entre elementos.

**Ubicación:** `src/components/ui/Separator.tsx`

### 🔐 SocialButton
Botón para login social (Google, Apple).

**Ubicación:** `src/components/auth/SocialButton.tsx`

## Principios de Diseño

- ✨ **Simplicidad** - Componentes fáciles de usar y entender
- 🎯 **Consistencia** - Estilos y comportamientos uniformes
- ♿ **Accesibilidad** - Soporte completo para A11y con React Aria
- 📱 **Responsive** - Funcionan en todos los tamaños de pantalla
- 🌗 **Tema** - Soporte para modo claro y oscuro

## Instalación y Uso

Importa el componente que necesites:

```typescript
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';

export default function MyComponent() {
  return (
    <>
      <TextField placeholder="Ingresa tu email" />
      <Button title="Enviar" onPress={() => {}} />
    </>
  );
}
```

## Temas

Los componentes utilizan el sistema de temas definido en `utils/theme.ts`:

```typescript
// Acceder al tema
import { useTheme } from '@/utils/theme';

const { colors, spacing, fonts } = useTheme();
```

## Siguientes Pasos

Explora los componentes individuales:
- [Button](./button.md)
- [TextField](./text-field.md)
- [Card](./card.md)
- [Separator](./separator.md)
