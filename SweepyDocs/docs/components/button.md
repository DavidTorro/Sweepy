---
sidebar_position: 2
---

# Button Component

Componente de botón personalizable y versátil para todas tus necesidades de interacción.

## Características

- ✨ Múltiples variantes de estilo
- 🎨 Personalizable con colores
- ♿ Accesible con React Aria
- 📱 Funciona en móvil y web
- 🌗 Soporte para modo claro/oscuro

## Código del Componente

```typescript
// src/components/ui/Button.tsx
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '@/utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variantStyle =
    variant === 'outline'
      ? styles.outlineButton
      : variant === 'ghost'
      ? styles.ghostButton
      : styles.primaryButton;

  const textStyle = {
    primary: styles.primaryText,
    outline: styles.outlineText,
    ghost: styles.ghostText,
  }[variant];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variantStyle,
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
      disabled={isDisabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : COLORS.primary} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.card,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  primaryText: {
    color: '#fff',
    fontFamily: FONTS.semibold,
    fontSize: SIZES.medium,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  outlineText: {
    color: COLORS.primary,
    fontFamily: FONTS.semibold,
    fontSize: SIZES.medium,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  ghostText: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.4,
  },
});
```

## Ejemplos de Uso

### Botón Primario

<div class="component-showcase">
  <div class="component-preview">
    <button style={{width: '100%', padding: '14px 20px', borderRadius: '999px', border: 'none', color: 'white', fontWeight: '700', background: 'linear-gradient(135deg, #00b8a9 0%, #00a190 100%)', boxShadow: '0 4px 12px rgba(0,184,169,0.18)'}}>Publicar</button>
  </div>
  
  <div class="component-code">

```typescript
<Button title="Publicar" onPress={() => {}} />
```
  </div>
</div>

### Botón Outline

<div class="component-showcase">
  <div class="component-preview">
    <button style={{width: '100%', padding: '14px 20px', borderRadius: '999px', background: 'transparent', border: '2px solid #00b8a9', color: '#00b8a9', fontWeight: '700'}}>Cancelar</button>
  </div>
  
  <div class="component-code">

```typescript
<Button title="Cancelar" variant="outline" onPress={() => {}} />
```
  </div>
</div>

### Botón Ghost

<div class="component-showcase">
  <div class="component-preview">
    <button style={{width: '100%', padding: '14px 20px', borderRadius: '999px', background: 'transparent', border: 'none', color: '#104e6a', fontWeight: '700'}}>Ver detalle</button>
  </div>
  
  <div class="component-code">

```typescript
<Button title="Ver detalle" variant="ghost" onPress={() => {}} />
```
  </div>
</div>

## Props

| Prop | Tipo | Defecto | Descripción |
|------|------|---------|-------------|
| `title` | string | - | Texto del botón |
| `variant` | 'primary' \| 'outline' \| 'ghost' | 'primary' | Estilo del botón |
| `loading` | boolean | false | Estado de carga con spinner |
| `disabled` | boolean | false | Deshabilitado |
| `onPress` | () => void | - | Callback al presionar |

## Best Practices

- ✅ Usa `variant="primary"` para acciones principales
- ✅ Mantén los textos cortos y descriptivos
- ✅ Proporciona feedback visual al presionar
- ❌ No desactives botones sin explicación
- ❌ No uses más de 2 botones primarios en la misma pantalla
