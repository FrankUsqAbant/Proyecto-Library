# 📖 Leer es Pensar — Biblioteca Digital Zen

<div align="center">
  <p align="center">
    <strong>Plataforma Web de Libros Clásicos de Dominio Público & Lector Inmersivo</strong>
  </p>

  <p align="center">
    <a href="https://frankusqabant.github.io/Proyecto-Library/">
      <img src="https://img.shields.io/badge/🌐_Sitio_Web_en_Vivo-GitHub_Pages-2A8C5A?style=for-the-badge&logo=github&logoColor=white" alt="Sitio Web en Vivo" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Database-Turso_LibSQL-3ECF8E?style=for-the-badge&logo=sqlite&logoColor=white" alt="Turso" />
    <img src="https://img.shields.io/badge/Seguridad-0_Vulnerabilidades-22c55e?style=for-the-badge" alt="Seguridad" />
  </p>

  <br />

  <a href="https://frankusqabant.github.io/Proyecto-Library/">
    <img src="public/preview-library.webp" alt="Vista Previa de Leer es Pensar" width="880" style="border-radius: 14px; border: 1px solid rgba(217, 119, 6, 0.35); box-shadow: 0 16px 45px rgba(0,0,0,0.6);" />
  </a>
</div>

---

## 📚 Sobre el Proyecto

**Leer es Pensar** es una biblioteca digital moderna y minimalista diseñada para los amantes de la lectura clásica y el pensamiento reflexivo. Permite explorar miles de obras maestras universales de dominio público, disfrutar de una experiencia de lectura zen sin distracciones y sincronizar favoritos en la nube.

> 🌐 **Explorar en producción:** [https://frankusqabant.github.io/Proyecto-Library/](https://frankusqabant.github.io/Proyecto-Library/)

---

## ✨ Características Principales

- 🔍 **Catálogo Clásico Universal:** Integración fluida con Gutendex y Open Library para acceder a miles de títulos clásicos.
- 📖 **Lector Inmersivo Zen:** Experiencia de lectura tipográfica refinada con sanitización DOMPurify y modo oscuro cálido.
- ⚡ **Base de Datos Turso (LibSQL):** Sincronización en la nube de favoritos, notas y progreso con fallback automático a `localStorage`.
- 🎙️ **Búsqueda por Voz y Filtros:** Búsqueda rápida por autor, título, época y categorías temáticas.
- 📱 **Diseño 100% Responsivo:** Adaptado con Tailwind CSS para móviles, tablets y monitores de escritorio.
- 🔒 **Arquitectura Segura:** 0 vulnerabilidades, consultas SQL parametrizadas y protección contra ataques XSS.

---

## 🛠️ Estructura Simplificada del Proyecto

```
Proyecto-Library/
├── src/                  # Código fuente unificado
│   ├── app/              # Rutas App Router (Inicio, Explorar, Categorías, Lector)
│   ├── components/       # Componentes de UI modulares
│   ├── hooks/            # Hooks personalizados de React
│   ├── lib/              # Utilidades, constantes y cliente de Turso DB
│   └── types/            # Definiciones de TypeScript
├── public/               # Recursos estáticos y capturas
├── .github/              # Workflow de despliegue automático a GitHub Pages
├── next.config.ts        # Configuración de Next.js
├── tailwind.config.js    # Configuración de estilos
└── tsconfig.json         # Configuración de TypeScript
```

---

## 🌐 Acceso al Proyecto en Producción

El proyecto se encuentra alojado y disponible públicamente en **GitHub Pages**:

👉 **[https://frankusqabant.github.io/Proyecto-Library/](https://frankusqabant.github.io/Proyecto-Library/)**

---

<div align="center">
  <sub>© 2026 Leer es Pensar · Diseñado & Desarrollado por <strong>Franquer Abanto</strong></sub>
</div>
