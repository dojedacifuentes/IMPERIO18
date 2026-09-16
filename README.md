# Desafíos de Brayan · Team Imperio

Aplicación web móvil para registrar los resultados de los **ocho desafíos físicos** del puesto de
Fiestas Patrias y enviarlos por **WhatsApp a Brayan Morales** (`+56 9 4967 1466`).

La persona escanea el QR, escribe su apodo, elige modalidad, registra su marca y envía. Sin cuentas,
sin base de datos, sin backend.

---

## Cómo funciona

1. La persona escanea el QR y la app abre directo en el formulario.
2. Escribe su **nombre o apodo** (único dato obligatorio).
3. Elige **Un desafío ($2.000)** o **Pack completo ($10.000)**.
4. Registra el resultado de los desafíos seleccionados.
5. Revisa el resumen.
6. Toca **Enviar a Brayan por WhatsApp**: se abre WhatsApp con el mensaje escrito.

> La app **no envía el mensaje sola**. Abre WhatsApp con el texto listo y la persona presiona enviar
> dentro de la aplicación. Por eso los datos **no se borran** al abrir WhatsApp: quedan guardados
> hasta que alguien confirme *"Registrar otro participante"*.

### Los ocho desafíos

| # | Desafío | Resultado |
|---|---------|-----------|
| 1 | 🤼 Derrota al campeón | Logrado / No logrado |
| 2 | 🔨 El martillo de Thor | Logrado / No logrado |
| 3 | 💿 Emboque de disco | Logrado / No logrado |
| 4 | ⚖️ Equilibrio extremo | Logrado / No logrado |
| 5 | 🦍 Búsqueda del gorila | Tiempo en segundos |
| 6 | ⬆️ Rise | Fuerza en kg |
| 7 | 🔄 Pronación | Fuerza en kg |
| 8 | 💪 Back Pressure | Fuerza en kg |

---

## Ejecutar en tu computador

Necesitas [Node.js](https://nodejs.org) 20 o superior.

```bash
npm install
```

```bash
npm run dev
```

Queda disponible en `http://localhost:5173`. El servidor escucha en toda la red local, así que puedes
abrirlo desde tu teléfono usando la IP de tu computador (por ejemplo `http://192.168.1.10:5173`).

### Otros comandos

```bash
npm run typecheck
```

```bash
npm run build
```

```bash
npm run preview
```

- `typecheck`: revisa los tipos de TypeScript sin generar archivos.
- `build`: genera la versión de producción en `dist/`.
- `preview`: sirve localmente lo que quedó en `dist/`.

---

## Publicar en Vercel

El proyecto ya trae `vercel.json` listo. No hay variables de entorno ni servicios externos.

### Opción A — desde la web (la más rápida)

1. Entra a [vercel.com/new](https://vercel.com/new) e inicia sesión con GitHub.
2. Importa el repositorio `dojedacifuentes/IMPERIO18`.
3. Vercel detecta Vite automáticamente (`npm run build` → carpeta `dist`).
4. Presiona **Deploy**. En menos de un minuto tendrás la URL pública.

Cada `git push` a la rama principal vuelve a desplegar el sitio.

### Opción B — desde la terminal

```bash
npx vercel --prod
```

---

## Generar el QR del puesto

Con la URL que entrega Vercel (por ejemplo `https://imperio18.vercel.app`), genera el código en
cualquier servicio de QR y imprímelo grande. Recomendaciones:

- Usa la URL **con https**, sin parámetros extra.
- Imprime el QR de al menos 10 × 10 cm para que se lea desde lejos.
- Agrega abajo el texto: *"Escanea y registra tu marca"*.

---

## Personalizar

### Cambiar el número de WhatsApp

Edita `src/lib/constants.ts`:

```ts
export const WHATSAPP_NUMBER = '56949671466';
export const WHATSAPP_CONTACT = 'Brayan Morales';
```

El número va en formato internacional, sin `+`, sin espacios y sin guiones.

### Cambiar los precios

También en `src/lib/constants.ts`, dentro de `MODES`. Recuerda ajustar `price` y `priceLabel`.

### Usar el logo oficial en PNG

La app trae el emblema vectorial `public/logo-imperio.svg` (liviano y nítido en cualquier pantalla).

Si prefieres el PNG original del Team Imperio, guárdalo como:

```
public/logo-imperio.png
```

La app lo toma automáticamente y usa el SVG solo como respaldo. No hay que tocar código.

### Editar los desafíos

Todo el catálogo (nombres, emojis, instrucciones y tipo de resultado) vive en
`src/data/challenges.ts`.

---

## Estructura del proyecto

```
src/
├── components/         Interfaz por pasos + piezas reutilizables
│   ├── AppHeader.tsx       Encabezado con el emblema
│   ├── StepIdentity.tsx    Paso 1 · nombre o apodo
│   ├── StepMode.tsx        Paso 2 · modalidad y precio
│   ├── StepChallenges.tsx  Pasos 3 y 4 · desafíos y resultados
│   ├── StepReview.tsx      Paso 5 · resumen y envío
│   ├── ChallengeCard.tsx   Tarjeta de un desafío
│   └── ui/Button.tsx       Botón con variantes
├── data/challenges.ts  Catálogo de los ocho desafíos
├── hooks/              Estado del registro + persistencia
├── lib/
│   ├── constants.ts        Número de WhatsApp, precios, aviso de seguridad
│   ├── format.ts           Decimales con coma o punto, fecha y hora
│   ├── validation.ts       Reglas de los campos
│   ├── results.ts          Resultados listos para mostrar y enviar
│   ├── storage.ts          localStorage a prueba de datos corruptos
│   └── whatsapp.ts         Armado y codificación del mensaje
└── types.ts            Tipos compartidos
```

---

## Decisiones técnicas

- **React 19 + TypeScript + Vite 8 + Tailwind CSS 3** — sin backend, sin autenticación, sin pagos.
- **Una sola pantalla** con estados internos: nunca hay recargas de página.
- **`localStorage`** guarda nombre, modalidad, desafíos, resultados y paso actual. Si el navegador
  bloquea el almacenamiento (Safari en modo privado), la app sigue funcionando igual.
- **Sin base de datos ni panel administrativo**: el único destino de los datos es el WhatsApp de
  Brayan.
- **Compatibilidad amplia**: la compilación apunta a Chrome 87+ y Safari 14+ para que funcione
  también en teléfonos antiguos.
- **Accesibilidad**: etiquetas visibles, foco en el primer campo inválido, estados que no dependen
  solo del color, botones grandes y teclado numérico en los campos de resultado.

---

## Seguridad en el puesto

La app muestra siempre este aviso:

> Realiza los desafíos bajo supervisión. Detén el intento ante dolor, mareo o pérdida de control.
