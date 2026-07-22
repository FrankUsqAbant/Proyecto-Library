---
name: nextjs-app-architecture
description: Directrices de arquitectura para Next.js 16 App Router, Server/Client Components y renderizado híbrido.
---

# 🚀 Next.js 16 App Router Architecture Skill

Esta skill proporciona las pautas fundamentales para desarrollar y refactorizar componentes en el ecosistema **Next.js 16 (App Router)**.

## 📌 Reglas de Oro

1. **Server Components por Defecto**:
   - Todo componente es Server Component salvo que requiera hooks (`useState`, `useEffect`, `useContext`) o eventos de usuario (`onClick`, `onChange`).
   - Mantener el estado interactivo lo más abajo posible en el árbol de componentes.

2. **Tipado de Props y Datos**:
   - Usar interfaces TypeScript estrictas para Props y respuestas de API.
   - Prohibido el uso de `any`.

3. **SEO & Metadata**:
   - Definir `metadata` o `generateMetadata` en cada página (`page.tsx`).
   - Incluir datos estructurados (JSON-LD) para entidades clave (libros, autores).

4. **Gestión de Errores y Loading**:
   - Usar `loading.tsx` y `error.tsx` en las rutas para manejar estados de carga y fallos de forma elegante.
