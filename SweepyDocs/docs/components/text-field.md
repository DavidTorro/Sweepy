---
sidebar_position: 3
---

# TextField Component

Campo de texto reutilizable con validación y estilos personalizables.

## Características

- ✨ Placeholder y label
- 🔐 Tipos de entrada seguros (password, email, etc.)
- ✅ Validación integrada
- 🎨 Personalizable completamente
- 📱 Accesible con React Aria
- 🌗 Soporte para tema claro/oscuro

## Código del Componente

```typescript
// src/components/ui/TextField.tsx
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/utils/theme';

interface Props extends TextInputProps {
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  error?: boolean;
  style?: any;
}

export default function TextField({
  leftIcon,
  rightIcon,
  onRightIconPress,
  error = false,
  style,
  ...props
}: Props) {
  return (
    <View style={[styles.container, error && styles.errorBorder, style]}>
      {leftIcon && (
        <Ionicons
          name={leftIcon as any}
          size={20}
          color={COLORS.textSecondary}
          style={styles.leftIcon}
        />
      )}

      <TextInput
        {...props}
        style={[styles.input, leftIcon && { paddingLeft: 4 }, rightIcon && { paddingRight: 4 }]}
        placeholderTextColor={COLORS.textSecondary}
      />

      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress}>
          <Ionicons
            name={rightIcon as any}
            size={20}
            color={COLORS.textSecondary}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 50,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
});
```

## Ejemplos de Uso

### Campo Básico con Ícono

<div class="component-showcase">
  <div class="component-preview">
    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
      <div style={{flex:1, display:'flex', alignItems:'center', background:'#fff', border:'1px solid #d7dde2', borderRadius:'999px', padding:'0 16px', height:'50px', boxShadow:'0 4px 10px rgba(0,0,0,0.04)'}}>
        <span style={{color:'#6f6f6f', marginRight:'10px'}}>🔍</span>
        <input type="text" placeholder="Buscar servicios" style={{flex:1, border:'none', outline:'none', fontSize:'16px', color:'#104e6a'}} />
      </div>
    </div>
  </div>
  
  <div class="component-code">

```typescript
<TextField placeholder="Buscar servicios" leftIcon="search" />
```
  </div>
</div>

### Con Acción en Ícono Derecho

<div class="component-showcase">
  <div class="component-preview">
    <div style={{flex:1, display:'flex', alignItems:'center', background:'#fff', border:'1px solid #d7dde2', borderRadius:'999px', padding:'0 16px', height:'50px', boxShadow:'0 4px 10px rgba(0,0,0,0.04)'}}>
      <input type="password" placeholder="••••••••" style={{flex:1, border:'none', outline:'none', fontSize:'16px', color:'#104e6a'}} />
      <span style={{color:'#6f6f6f', marginLeft:'10px'}}>👁️</span>
    </div>
  </div>
  
  <div class="component-code">

```typescript
<TextField
  placeholder="••••••••"
  secureTextEntry
  rightIcon="eye"
  onRightIconPress={toggleVisibility}
/> 
```
  </div>
</div>

### Con Error

<div class="component-showcase">
  <div class="component-preview">
    <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
      <div style={{flex:1, display:'flex', alignItems:'center', background:'#fff', border:'2px solid #ff3b30', borderRadius:'999px', padding:'0 16px', height:'50px'}}>
        <input type="email" placeholder="correo@ejemplo.com" style={{flex:1, border:'none', outline:'none', fontSize:'16px', color:'#104e6a'}} />
      </div>
      <span style={{fontSize:'12px', color:'#ff3b30'}}>Email inválido</span>
    </div>
  </div>
  
  <div class="component-code">

```typescript
<TextField
  placeholder="correo@ejemplo.com"
  keyboardType="email-address"
  error
/>
```
  </div>
</div>

## Props

| Prop | Tipo | Defecto | Descripción |
|------|------|---------|-------------|
| `label` | string | - | Etiqueta del campo |
| `placeholder` | string | - | Texto de placeholder |
| `error` | string | - | Mensaje de error |
| `helperText` | string | - | Texto de ayuda |
| `fullWidth` | boolean | true | Ancho completo |
| `keyboardType` | string | 'default' | Tipo de teclado |
| `secureTextEntry` | boolean | false | Ocultar entrada (password) |

## Best Practices

- ✅ Siempre proporciona una etiqueta clara
- ✅ Valida en tiempo real
- ✅ Proporciona mensajes de error claros
- ✅ Usa `helperText` para información adicional
- ❌ No dejes campos sin validar
- ❌ No uses placeholders como etiquetas
