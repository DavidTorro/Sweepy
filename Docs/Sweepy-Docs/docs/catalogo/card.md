---
slug: /catalogo/card
sidebar_position: 3
---

# Card

Tarjeta para listar servicios o perfiles.

- Archivo: `src/components/ui/ClienteCard.tsx`
- Props: `title`, `subtitle`, `price`, `rating`, `onPress`.
- Incluye soporte para imagen y badges.

## Uso
```tsx
import { ClienteCard } from '@/components/ui/ClienteCard';

<ClienteCard
  title="Limpieza de piso"
  subtitle="2h · Zona Centro"
  price={25}
  rating={4.8}
  onPress={() => {}}
/>
```
