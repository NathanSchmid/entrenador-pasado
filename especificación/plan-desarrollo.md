# Plan de Desarrollo - Entrenador del Pasado

## Fase 1: Configuración del Proyecto (1-2 días)
- [ ] Inicializar proyecto con Vite + React + TypeScript
- [ ] Configurar estructura de carpetas
- [ ] Configurar ESLint y Prettier
- [ ] Crear componentes base vacíos

## Fase 2: Diseño y Estructura de Datos (2-3 días)
- [ ] Definir tipos TypeScript para ejercicios y soluciones
- [ ] Crear base de datos JSON con 500 textos de ejemplo
- [ ] Implementar lógica de selección aleatoria de ejercicios
- [ ] Diseñar esquema de colores y estilos CSS

## Fase 3: Componente de Infografía (3-4 días)
- [ ] Crear componente InfografiaPasado
  - [ ] Sección Pretérito Perfecto (descripción, marcadores, ejemplos)
  - [ ] Sección Pretérito Indefinido (descripción, marcadores, ejemplos)
  - [ ] Sección Pretérito Imperfecto (descripción, marcadores, ejemplos)
- [ ] Implementar líneas de tiempo visuales para cada forma
- [ ] Diseño responsive para la infografía

## Fase 4: Componente Entrenador Interactivo (5-7 días)
- [ ] Crear componente EntrenadorInteractivo
- [ ] Implementar presentación de texto con huecos
- [ ] Crear campos de entrada para verbos
- [ ] Implementar lógica de corrección:
  - [ ] Comparación exacta (verde)
  - [ ] Detección de errores (rojo con tachado)
  - [ ] Detección de errores tipográficos/acentos (naranja)
- [ ] Botón "Corregir y mostrar solución"
- [ ] Botón "Siguiente ejemplo"
- [ ] Gestión de estado del ejercicio actual

## Fase 5: Lógica de Validación (2-3 días)
- [ ] Implementar función de comparación de respuestas
- [ ] Crear algoritmo de detección de errores tipográficos
- [ ] Implementar validación de acentos
- [ ] Testing de casos edge

## Fase 6: Integración y Estilos (2-3 días)
- [ ] Integrar infografía y entrenador en página única
- [ ] Aplicar estilos CSS/diseño final
- [ ] Implementar diseño responsive
- [ ] Añadir transiciones y animaciones sutiles

## Fase 7: Testing y Optimización (2-3 días)
- [ ] Testing de funcionalidad completa
- [ ] Testing en diferentes navegadores
- [ ] Testing responsive en diferentes dispositivos
- [ ] Optimización de rendimiento
- [ ] Corrección de bugs

## Fase 8: Deployment (1 día)
- [ ] Build de producción
- [ ] Configurar deployment (GitHub Pages, Netlify, Vercel, etc.)
- [ ] Testing en producción

## Estimación Total
**15-25 días de desarrollo**

## Notas Técnicas
- Todo en español peninsular
- Sin backend, solo frontend estático
- Base de datos local en JSON
- Enfoque en UX simple y clara para estudiantes
