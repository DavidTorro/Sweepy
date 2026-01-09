---
sidebar_position: 4
---

# ClienteCard Component

Tarjeta reutilizable para mostrar servicios, perfiles de usuario o productos.

## Características

- 🎴 Diseño moderno y atractivo
- 📸 Soporte para imágenes
- ⭐ Muestra calificaciones
- 💰 Detalles de precio
- 🎨 Personalizable completamente
- 📱 Responsive

## Código del Componente

```typescript
// src/components/ui/ClienteCard.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

interface ClienteCardProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export const ClienteCard: React.FC<ClienteCardProps> = ({
  image,
  title,
  description,
  price,
  rating = 4.5,
  reviewCount = 0,
  onPress,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        },
        style,
      ]}
    >
      <Image
        source={image}
        style={{
          width: '100%',
          height: 200,
          backgroundColor: '#e5e7eb',
        }}
      />
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: 4,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#6b7280',
              lineHeight: 20,
            }}
            numberOfLines={2}
          >
            {description}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#10b981',
              }}
            >
              ${price}
            </Text>
            {rating && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{ color: '#fbbf24', fontSize: 12 }}>⭐ {rating}</Text>
                {reviewCount > 0 && (
                  <Text style={{ color: '#9ca3af', fontSize: 12, marginLeft: 4 }}>
                    ({reviewCount})
                  </Text>
                )}
              </View>
            )}
          </View>
          <Pressable
            style={{
              backgroundColor: '#10b981',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>
              Ver Más
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
```

## Ejemplos de Uso

### Tarjeta de Servicio

<div class="component-showcase">
  <div class="component-preview">
    <div style={{background:'#fff', borderRadius:'18px', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,0.12)', maxWidth:'420px', border:'1px solid #d7dde2'}}>
      <div style={{width:'100%', height:'200px', background:'#e9fcfa', display:'flex', alignItems:'center', justifyContent:'center', color:'#00a190', fontWeight:'700'}}>Imagen del servicio</div>
      <div style={{padding:'16px'}}>
        <h3 style={{fontSize:'16px', fontWeight:'700', color:'#104e6a', margin:'0 0 4px 0'}}>Limpieza de Apartamento</h3>
        <p style={{fontSize:'14px', color:'#6f6f6f', margin:'0 0 12px 0', lineHeight:'1.5'}}>Limpieza profunda de tu hogar. Servicio profesional y confiable.</p>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:'18px', fontWeight:'700', color:'#00b8a9'}}>$75</div>
            <div style={{fontSize:'12px', color:'#f59e0b', marginTop:'4px'}}>⭐ 4.8 (24)</div>
          </div>
          <button style={{background:'linear-gradient(135deg, #00b8a9 0%, #00a190 100%)', color:'white', padding:'10px 14px', borderRadius:'999px', border:'none', fontWeight:'700', cursor:'pointer', boxShadow:'0 4px 12px rgba(0,184,169,0.18)'}}>Ver Más</button>
        </div>
      </div>
    </div>
  </div>
  
  <div class="component-code">

```typescript
<ClienteCard
  image={require('./cleaning-service.png')}
  title="Limpieza de Apartamento"
  description="Limpieza profunda de tu hogar. Servicio profesional y confiable."
  price={75}
  rating={4.8}
  reviewCount={24}
  onPress={() => console.log('Card pressed')}
/>
```
  </div>
</div>

## Props

| Prop | Tipo | Defecto | Descripción |
|------|------|---------|-------------|
| `image` | ImageSourcePropType | - | Imagen de la tarjeta |
| `title` | string | - | Título del servicio |
| `description` | string | - | Descripción breve |
| `price` | number | - | Precio del servicio |
| `rating` | number | 4.5 | Calificación (0-5) |
| `reviewCount` | number | 0 | Número de reseñas |
| `onPress` | () => void | - | Callback al presionar |

## Best Practices

- ✅ Usa imágenes de buena calidad
- ✅ Mantén las descripciones concisas
- ✅ Muestra siempre el precio claramente
- ✅ Incluye calificaciones cuando estén disponibles
- ❌ No uses imágenes rotas
- ❌ No hagas tarjetas demasiado grandes
