# Buscador de Sitio Web Personal

## Descripción General

Este buscador es una herramienta de búsqueda client-side (del lado del cliente) que permite a los usuarios encontrar contenido en todas las páginas del sitio web personal de forma rápida e intuitiva.

## Características Principales

✅ **Búsqueda en tiempo real**: Los resultados se muestran mientras escribes
✅ **Sin servidor**: Todo funciona en el navegador del usuario
✅ **Multiidioma**: Compatible con español e inglés
✅ **Búsqueda inteligente**: Resultados ordenados por relevancia
✅ **Snippets contextuales**: Muestra fragmentos del texto donde aparece el término
✅ **Resaltado de términos**: Los términos buscados aparecen destacados
✅ **Accesible**: Cumple con estándares WCAG de accesibilidad

## Cómo Usar el Buscador

### Para Usuarios del Sitio Web

1. **Abrir el buscador**:
   - Localiza el campo de búsqueda en la parte superior de cualquier página
   - Haz clic en el campo que dice "Buscar en el sitio..."

2. **Realizar una búsqueda**:
   - Escribe al menos 2 caracteres
   - Los resultados aparecerán automáticamente mientras escribes
   - También puedes presionar Enter o hacer clic en el botón de búsqueda

3. **Ver resultados**:
   - Se abrirá un overlay con todos los resultados encontrados
   - Cada resultado muestra:
     - Título de la página
     - Fragmento de texto donde aparece tu búsqueda
     - El término buscado resaltado en amarillo

4. **Navegar a un resultado**:
   - Haz clic en cualquier título de resultado
   - Se te llevará directamente a esa página

5. **Cerrar resultados**:
   - Haz clic en la "X" en la esquina superior derecha
   - Haz clic fuera del cuadro de resultados
   - Presiona la tecla `Escape`

### Ejemplos de Búsquedas

- **Búsqueda simple**: `programación`
- **Búsqueda de nombre**: `Daniela`
- **Búsqueda de tecnología**: `React`
- **Búsqueda de ubicación**: `Oviedo`
- **Búsqueda de formación**: `universidad`

## Para Desarrolladores

### Instalación

El buscador ya está integrado en el sitio. Solo necesitas incluir los siguientes archivos en cada página HTML:

```html
<!-- Dependencias externas (i18next para traducciones) -->
<script src="https://cdn.jsdelivr.net/npm/i18next@23.7.6/i18next.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@7.2.0/i18nextBrowserLanguageDetector.min.js"></script>

<!-- Scripts del sitio -->
<script src="js/i18n-config.js"></script>
<script src="js/pages.js"></script>
<script src="js/search-auto.js"></script>
```

### Estructura HTML Requerida

Cada página debe incluir:

#### 1. Formulario de búsqueda
```html
<form id="search-form" role="search" class="header-search">
  <input 
    type="search" 
    id="search-input" 
    placeholder="Buscar en el sitio..."
    aria-label="Buscar en el sitio">
  <button type="submit" class="search-btn" aria-label="Buscar">
    <!-- Icono SVG de lupa -->
  </button>
</form>
```

#### 2. Overlay para resultados
```html
<aside id="search-results-overlay" class="search-overlay" 
       role="dialog" aria-modal="true" 
       style="display: none;">
  <section class="search-results-container">
    <button id="close-search" class="close-search-btn">✕</button>
    <section id="search-results"></section>
  </section>
</aside>
```

### Añadir Nuevas Páginas

Para añadir una nueva página al índice de búsqueda:

1. Abre el archivo `js/pages.js`
2. Añade un objeto al array `pagesToIndex`:

```javascript
{
  url: "nueva-pagina.html",
  nameKey: "nav.nueva-pagina",    // Clave de traducción
  metaKey: "meta.nueva-pagina"    // Clave de meta descripción
}
```

3. Añade las traducciones en `js/i18n-config.js`:

```javascript
// En el objeto 'es'
'nav.nueva-pagina': 'Nueva Página',
'meta.nueva-pagina': 'Descripción de la nueva página',

// En el objeto 'en'
'nav.nueva-pagina': 'New Page',
'meta.nueva-pagina': 'Description of the new page',
```

4. La página se indexará automáticamente al cargar el sitio

### Personalizar Configuración

Puedes personalizar el comportamiento del buscador modificando la configuración al inicializarlo:

```javascript
const customConfig = {
  minQueryLength: 3,           // Requiere 3 caracteres mínimo
  debounceDelay: 500,          // Espera 500ms antes de buscar
  relevanceWeights: {
    title: 15,                 // Mayor peso al título
    description: 8,
    content: 2,
    sections: 5
  },
  snippet: {
    maxLength: 400,            // Snippets más largos
    contextBefore: 150,
    contextAfter: 200
  }
};

await initializeSearchEngine(customConfig, pagesToIndex);
```

### Personalizar Estilos

Los estilos principales están en `css/style.css`. Puedes modificar:

- `.search-overlay`: Fondo del overlay
- `.search-results-container`: Contenedor blanco con resultados
- `.search-result-item`: Cada resultado individual
- `.search-snippet mark`: Resaltado de términos (actualmente amarillo)
- `.search-no-results`: Mensaje cuando no hay resultados

Ejemplo para cambiar el color de resaltado:

```css
.search-snippet mark {
  background: #90EE90;  /* Verde claro */
  padding: 0.1rem 0.2rem;
  border-radius: 2px;
}
```

## Arquitectura del Sistema

El buscador está compuesto por varios módulos:

```
AutoSearchEngine (Coordinador principal)
    ├── PageIndexer (Indexación de páginas)
    │   ├── HTMLParser (Parseo de HTML)
    │   ├── ContentExtractor (Extracción de contenido)
    │   └── ContentTranslator (Traducción i18n)
    │
    ├── SearchEngine (Motor de búsqueda)
    │
    ├── SnippetBuilder (Generación de snippets)
    │   └── TextProcessor (Procesamiento de texto)
    │
    ├── UIRenderer (Renderizado de interfaz)
    │   └── TemplateRenderer (Templates HTML)
    │
    └── SearchEventManager (Gestión de eventos)
```

## Flujo de Funcionamiento

### Inicialización (al cargar la página)

1. El navegador carga la página HTML
2. Se espera a que el DOM esté listo (`DOMContentLoaded`)
3. Se espera a que i18next esté inicializado
4. Se crea una instancia de `AutoSearchEngine`
5. Se configuran los event listeners
6. Se descargan todas las páginas definidas en `pagesToIndex`
7. Se procesan y se crea el índice de búsqueda
8. El buscador está listo para usar

### Búsqueda (cuando el usuario escribe)

1. Usuario escribe en el campo de búsqueda
2. Se activa el evento `input`
3. Se aplica debounce (espera 300ms)
4. Si la query tiene al menos 2 caracteres, se ejecuta la búsqueda
5. Se busca el término en el índice
6. Se calcula la relevancia de cada página
7. Se ordenan los resultados por relevancia
8. Se generan snippets contextuales
9. Se renderizan los resultados en el overlay
10. Se muestra el overlay al usuario

## Cálculo de Relevancia

El buscador asigna diferentes pesos según dónde aparece el término:

| Ubicación     | Peso | Descripción                           |
|---------------|------|---------------------------------------|
| Título        | 10   | Máxima relevancia                     |
| Descripción   | 5    | Alta relevancia                       |
| Secciones     | 3    | Relevancia media (ej: referencias)    |
| Contenido     | 1    | Relevancia base                       |

**Ejemplo**: Si buscas "React" y aparece en el título (10 puntos) y en el contenido 3 veces (3 puntos), la relevancia total será **13 puntos**.

## Internacionalización (i18n)

El buscador soporta múltiples idiomas gracias a i18next:

- Al cambiar el idioma, el buscador se **re-indexa automáticamente**
- Las búsquedas se realizan en el **idioma actual**
- Los mensajes de la interfaz se **traducen automáticamente**

### Idiomas Soportados

- **Español** (es) - Idioma por defecto
- **Inglés** (en)

## Accesibilidad

El buscador cumple con estándares de accesibilidad web (WCAG):

✅ **Roles ARIA**: `role="search"`, `role="dialog"`, `aria-modal="true"`
✅ **Labels descriptivos**: Todos los controles tienen `aria-label`
✅ **Navegación por teclado**: 
   - `Enter` para buscar
   - `Escape` para cerrar
✅ **Contraste de colores**: El resaltado amarillo tiene buen contraste
✅ **Gestión de foco**: El overlay bloquea el contenido de fondo

## Rendimiento

### Métricas

- **Tiempo de indexación**: ~100-500ms (depende del número de páginas)
- **Tiempo de búsqueda**: <10ms por consulta
- **Memoria utilizada**: ~50-200KB (según contenido)
- **Tamaño del código**: ~26KB (sin minificar)

### Optimizaciones

- **Debounce**: Evita búsquedas excesivas durante la escritura
- **Indexación única**: Las páginas se indexan solo una vez
- **Búsqueda en memoria**: Todo el índice se mantiene en RAM
- **Lazy loading**: No se descargan las páginas hasta que se indexan

## Solución de Problemas

### El buscador no aparece

**Solución**: Verifica que el HTML incluya el formulario con `id="search-form"` y el input con `id="search-input"`.

### No se muestran resultados

**Posibles causas**:
1. La query tiene menos de 2 caracteres
2. La página no está en `pagesToIndex`
3. El contenido está en elementos excluidos (nav, footer, etc.)

**Solución**: Verifica en la consola del navegador si hay errores.

### Los resultados no se ven bien

**Solución**: Verifica que `css/style.css` esté cargado y que incluya los estilos para `.search-overlay`, `.search-results-container`, etc.

### El buscador no funciona en un idioma

**Solución**: 
1. Verifica que i18next esté cargado
2. Comprueba que las traducciones existan en `js/i18n-config.js`
3. Revisa la consola del navegador

## Limitaciones

- **Solo páginas HTML**: No indexa PDFs, imágenes u otros archivos
- **Client-side**: Requiere JavaScript habilitado
- **Contenido estático**: No indexa contenido generado dinámicamente después de la carga
- **Tamaño**: Para sitios muy grandes (>100 páginas), considera una solución server-side

## Próximas Mejoras

Ideas para futuras versiones:

- [ ] Búsqueda por frases exactas (entrecomilladas)
- [ ] Autocompletado de búsquedas
- [ ] Historial de búsquedas recientes
- [ ] Filtros por tipo de página
- [ ] Búsqueda avanzada con operadores (AND, OR, NOT)
- [ ] Exportar índice a JSON para carga más rápida

## Créditos

- **Autor**: Daniela Rodríguez Cepero
- **Dependencias**: 
  - [i18next](https://www.i18next.com/) - Internacionalización
  - [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) - Detección de idioma

## Licencia

Este código es parte del sitio web personal de Daniela Rodríguez Cepero.

---

**Última actualización**: Diciembre 2025
**Versión**: 1.0.0

