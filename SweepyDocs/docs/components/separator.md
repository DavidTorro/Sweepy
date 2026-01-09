---
sidebar_position: 5
---

# Separator Component

Componente separador visual minimalista para dividir secciones de contenido.

## Características

- ✨ Simple y minimalista
- 🎨 Personalizable (color, grosor)
- 📱 Responsive
- 🌗 Soporte para tema claro/oscuro
- ⚡ Muy ligero

## Código del Componente

```typescript
// src/components/ui/Separator.tsx
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SeparatorProps {
  color?: string;
  height?: number;
  style?: ViewStyle;
  vertical?: boolean;
}

export const Separator: React.FC<SeparatorProps> = ({
  color = '#e5e7eb',
  height = 1,
  style,
  vertical = false,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          ...(vertical
            ? { width: height, height: '100%' }
            : { height, width: '100%' }),
        },
        style,
      ]}
    />
  );
};
```

## Ejemplos de Uso

### Separador Horizontal (Default)

<div class="component-showcase">
  <div class="component-preview">
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div>Sección 1</div>
      <div style={{height: '1px', backgroundColor: '#e5e7eb', width: '100%'}}></div>
      <div>Sección 2</div>
    </div>
  </div>
  
  <div class="component-code">

```typescript
<View>
  <Text>Sección 1</Text>
  <Separator />
  <Text>Sección 2</Text>
</View>
```
  </div>
</div>

### Separador Vertical

<div class="component-showcase">
  <div class="component-preview">
    <div style={{display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center'}}>
      <div>Izquierda</div>
      <div style={{width: '1px', height: '40px', backgroundColor: '#e5e7eb'}}></div>
      <div>Derecha</div>
    </div>
  </div>
  
  <div class="component-code">

```typescript
<View style={{ flexDirection: 'row' }}>
  <Text>Izquierda</Text>
  <Separator vertical height={1} />
  <Text>Derecha</Text>
</View>
```
  </div>
</div>

### Separador Grueso

<div class="component-showcase">
  <div class="component-preview">
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div>Contenido</div>
      <div style={{height: '4px', backgroundColor: '#10b981', width: '100%'}}></div>
      <div>Más contenido</div>
    </div>
  </div>
  
  <div class="component-code">

```typescript
<Separator 
  color="#10b981"
  height={4}
/>
```
  </div>
</div>

### En Listados

<div class="component-showcase">
  <div class="component-preview">
    <div style={{backgroundColor: '#f9fafb', borderRadius: '8px', padding: '8px'}}>
      <div style={{padding: '12px 0'}}>Item 1</div>
      <div style={{height: '1px', backgroundColor: '#e5e7eb'}}></div>
      <div style={{padding: '12px 0'}}>Item 2</div>
      <div style={{height: '1px', backgroundColor: '#e5e7eb'}}></div>
      <div style={{padding: '12px 0'}}>Item 3</div>
    </div>
  </div>
  
  <div class="component-code">

```typescript
<View>
  {items.map((item, index) => (
    <View key={index}>
      <Text>{item}</Text>
      {index < items.length - 1 && <Separator />}
    </View>
  ))}
</View>
```
  </div>
</div>

## Props

| Prop | Tipo | Defecto | Descripción |
|------|------|---------|-------------|
| `color` | string | '#e5e7eb' | Color del separador |
| `height` | number | 1 | Grosor en píxeles |
| `vertical` | boolean | false | Orientación vertical |
| `style` | ViewStyle | - | Estilos adicionales |

## Best Practices

- ✅ Usa separadores para dividir lógicamente secciones
- ✅ Mantén el color consistente con el tema
- ✅ No abuses de separadores (máximo 1 por sección)
- ❌ No uses separadores con colores muy llamativos
- ❌ No olvides espaciar adecuadamente alrededor del separador
