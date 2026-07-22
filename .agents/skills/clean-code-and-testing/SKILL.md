---
name: clean-code-and-testing
description: Directrices para asegurar código limpio, principios SOLID, TypeScript estricto y testing unitario con Jest.
---

# 🧹 Clean Code & Testing Skill

Esta skill establece las normas de calidad de código y estrategias de pruebas automáticas.

## 📌 Principios

1. **SOLID & Clean Code**:
   - Funciones pequeñas con responsabilidad única.
   - Nombres descriptivos en español/inglés coherentes con el proyecto.
   - Tratar advertencias de linter como errores.

2. **TypeScript Estricto**:
   - Sin tipo `any`. Usar generics, `unknown` con type guards o tipos explícitos.
   - No usar castings inseguros (`as Type` sin validación previos de Zod o Type Guards).

3. **Pruebas automáticas (Jest & React Testing Library)**:
   - Probar comportamientos y accesibilidad, no detalles de implementación interna.
   - Mantener cobertura de tests para utilidades centrales (`lib/`) y hooks (`hooks/`).
