# Muro de Recuerdos - Quinceañera

Aplicación web para fiestas de 15 años donde los invitados pueden compartir fotos, videos y mensajes en tiempo real.

## Características

- 📱 **Diseño Mobile-First**: Estética iOS con glassmorphism y modo oscuro elegante
- 📸 **Compresión de Imágenes**: Las fotos se comprimen localmente antes de subir (máx 1200px, calidad 0.8)
- ❤️ **Sistema de Likes**: Los invitados pueden dar me gusta a las publicaciones
- 👤 **Identificación de Invitados**: Registro express con nombre y seguimiento de presencia
- 🔐 **Panel de Administración**: Dashboard protegido con PIN para gestionar contenido
- 🗑️ **Moderación**: Eliminación de publicaciones inapropiadas desde el admin
- ⚡ **Tiempo Real**: Actualizaciones instantáneas usando Firestore onSnapshot

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con tus credenciales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### 2. Reglas de Firebase

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## Uso

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Panel de Administración

Accede al dashboard de administración en `/admin` usando el PIN: `1515`

El panel permite:
- Ver estadísticas (recuerdos, invitados, likes)
- Listar todos los invitados registrados
- Eliminar publicaciones inapropiadas

## Estructura del Proyecto

```
src/
├── app/
│   ├── admin/page.tsx          # Dashboard de administración
│   ├── page.tsx                # Página principal con feed
│   ├── layout.tsx              # Layout raíz
│   └── globals.css             # Estilos globales
├── components/
│   ├── PhotoCard.tsx           # Tarjeta de recuerdo
│   ├── UploadModal.tsx         # Modal para subir recuerdos
│   └── GuestModal.tsx          # Modal de registro de invitados
└── lib/
    └── firebase.ts             # Configuración de Firebase
```

## Tecnologías

- Next.js 16 (App Router)
- Firebase (Firestore + Storage)
- Tailwind CSS 4
- Framer Motion
- browser-image-compression
- canvas-confetti
- Lucide React
