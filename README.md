# 📖 Leer es Pensar — Biblioteca Digital Zen

<div align="center">
  <p align="center">
    <strong>Biblioteca Digital de Libros Clásicos de Dominio Público & Lector Inmersivo</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Database-Turso_LibSQL-3ECF8E?style=for-the-badge&logo=sqlite&logoColor=white" alt="Turso" />
    <img src="https://img.shields.io/badge/Seguridad-0_Vulnerabilidades-22c55e?style=for-the-badge" alt="Seguridad" />
  </p>

  <br />
</div>

---

## 📚 Sobre el Proyecto

**Leer es Pensar** es una plataforma web moderna y minimalista diseñada para los amantes de la lectura clásica y el pensamiento profundo. Permite explorar miles de obras maestras universales de dominio público, disfrutar de una experiencia de lectura zen sin distracciones y sincronizar favoritos en la nube.

---

## ✨ Características Principales

- 🔍 **Catálogo Clásico Universal:** Integración fluida con Gutendex y Open Library para acceder a miles de títulos clásicos.
- 📖 **Lector Inmersivo Zen:** Experiencia de lectura tipográfica refinada con sanitización DOMPurify y modo oscuro cálido.
- ⚡ **Base de Datos Turso (LibSQL):** Sincronización en la nube de favoritos, notas y progreso de lectura con fallback resiliente en `localStorage`.
- 🎙️ **Búsqueda por Voz y Filtros Avanzados:** Búsqueda rápida por autor, título, época y categorías temáticas.
- 📱 **Diseño 100% Responsivo:** Adaptado con Tailwind CSS para móviles, tablets y monitores de escritorio.
- 🔒 **Arquitectura Segura:** 0 vulnerabilidades, consultas SQL parametrizadas y protección contra ataques XSS.

---

## 🛠️ Estructura Simplificada del Proyecto

```
Proyecto-Library/
├── app/                  # Rutas App Router (Inicio, Explorar, Categorías, Lector)
├── components/           # Componentes modulares (UI, Libros, 3D, Layout, SEO)
├── hooks/                # Hooks personalizados de React
├── lib/                  # Utilidades, constantes y cliente de Turso DB
├── public/               # Recursos e íconos estáticos
├── types/                # Definiciones de TypeScript
└── tests/                # Pruebas unitarias
```

---

## 🚀 Ejecución en Entorno Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/FrankUsqAbant/Proyecto-Library.git

# 2. Entrar al proyecto
cd Proyecto-Library

# 3. Instalar dependencias
npm install --legacy-peer-deps

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre tu navegador en: 👉 **[http://localhost:3000](http://localhost:3000)**

---

<div align="center">
  <sub>© 2026 Leer es Pensar · Diseñado & Desarrollado por <strong>Franquer Abanto</strong></sub>
</div>
