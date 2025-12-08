// Buscador automático que lee las páginas HTML directamente
class AutoSearchEngine {
  constructor() {
    this.indexedPages = [];
    this.isIndexing = false;
    this.indexingComplete = false;
  }

  // Cargar e indexar todas las páginas
  async indexPages(forceReindex = false) {
    if (this.isIndexing) return;
    if (this.indexingComplete && !forceReindex) return;
    
    this.isIndexing = true;
    this.indexedPages = []; // Limpiar páginas anteriores
    console.log('🔍 Iniciando indexación de páginas...');

    for (let page of pagesToIndex) {
      try {
        const response = await fetch(page.url);
        const html = await response.text();

        // Crear contenedor temporal para leer el HTML
        const tempDiv = document.createElement('section');
        tempDiv.innerHTML = html;

        // Eliminar scripts, styles y elementos no deseados
        const elementsToRemove = tempDiv.querySelectorAll('script, style, nav, header, footer');
        elementsToRemove.forEach(el => el.remove());

        // Traducir el contenido según el idioma actual
        if (typeof i18next !== 'undefined') {
          tempDiv.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = i18next.t(key);
            
            if (translation && translation !== key) {
              if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
              } else {
                element.innerHTML = translation;
              }
            }
          });
        }

        // Extraer solo el texto visible del main o body
        const mainContent = tempDiv.querySelector('main') || tempDiv.querySelector('body') || tempDiv;
        
        // Eliminar títulos (h1, h2, h3, h4, h5, h6) para evitar redundancia en snippets
        const headingsToRemove = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headingsToRemove.forEach(heading => heading.remove());
        
        let textContent = mainContent.innerText || mainContent.textContent || '';
        
        // Limpiar espacios múltiples y saltos de línea
        textContent = textContent.replace(/\s+/g, ' ').trim();

        // Obtener el título traducido
        let title = page.url;
        if (page.nameKey && typeof i18next !== 'undefined') {
          title = i18next.t(page.nameKey);
        } else if (page.name) {
          title = page.name;
        } else {
          title = this.extractTitle(html) || page.url;
        }

        // Obtener la descripción traducida
        let description = '';
        if (page.metaKey && typeof i18next !== 'undefined') {
          description = i18next.t(page.metaKey);
        } else {
          description = this.extractMetaDescription(html);
        }

        this.indexedPages.push({
          url: page.url,
          title: title,
          description: description,
          content: textContent,
          nameKey: page.nameKey
        });

        console.log(`✅ Indexada: ${title || page.name} (${textContent.length} caracteres)`);

      } catch (error) {
        console.error(`❌ Error cargando ${page.url}:`, error);
      }
    }

    this.isIndexing = false;
    this.indexingComplete = true;
    console.log(`🎉 Indexación completa. ${this.indexedPages.length} páginas indexadas.`);
  }

  // Extraer título de la página
  extractTitle(html) {
    const match = html.match(/<title>(.*?)<\/title>/i);
    return match ? match[1].trim() : null;
  }

  // Extraer meta description
  extractMetaDescription(html) {
    const match = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    return match ? match[1].trim() : '';
  }

  // Realizar búsqueda
  search(query) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results = [];

    this.indexedPages.forEach(page => {
      let relevance = 0;
      const titleLower = page.title.toLowerCase();
      const contentLower = page.content.toLowerCase();
      const descriptionLower = page.description.toLowerCase();

      // Calcular relevancia
      const inTitle = titleLower.includes(searchTerm);
      const inDescription = descriptionLower.includes(searchTerm);
      const inContent = contentLower.includes(searchTerm);

      if (inTitle) {
        relevance += 10; // Título tiene máxima prioridad
      }
      
      if (inDescription) {
        relevance += 5; // Description tiene prioridad media
      }
      
      if (inContent) {
        relevance += 1; // Contenido tiene prioridad baja
      }

      // Si encontró algo, agregar a resultados
      if (relevance > 0) {
        // Decidir qué texto usar para el snippet (priorizar donde aparece el término)
        let textForSnippet = '';
        if (inContent) {
          textForSnippet = page.content;
        } else if (inDescription) {
          textForSnippet = page.description;
        } else if (inTitle) {
          textForSnippet = page.title;
        }
        
        const snippet = this.makeSnippet(textForSnippet, searchTerm);
        
        results.push({
          url: page.url,
          title: page.title,
          snippet: snippet,
          relevance: relevance
        });
      }
    });

    // Ordenar por relevancia
    return results.sort((a, b) => b.relevance - a.relevance);
  }

  // Crear fragmento de texto destacando el término buscado
  makeSnippet(text, searchTerm, maxLength = 200) {
    if (!text || text.trim().length === 0) {
      return '';
    }

    const lowerText = text.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();
    const index = lowerText.indexOf(lowerSearchTerm);
    
    // Si no encuentra el término, devolver el inicio del texto
    if (index === -1) {
      const truncated = text.substring(0, maxLength);
      return text.length > maxLength ? truncated + '...' : truncated;
    }

    // Si el texto es corto, devolverlo completo
    if (text.length <= maxLength) {
      const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

    // Crear snippet centrado en el término encontrado
    const contextBefore = 80;
    const contextAfter = 80;
    const start = Math.max(0, index - contextBefore);
    const end = Math.min(text.length, index + searchTerm.length + contextAfter);
    
    let snippet = text.substring(start, end);
    
    // Agregar elipsis si es necesario
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    
    // Resaltar todas las ocurrencias del término de búsqueda (case insensitive)
    const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
    snippet = snippet.replace(regex, '<mark>$1</mark>');
    
    return snippet;
  }

  // Escapar caracteres especiales de regex
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Mostrar resultados en el DOM
  displayResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    const overlay = document.getElementById('search-results-overlay');
    
    if (!resultsContainer || !overlay) return;

    // Mostrar el overlay
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';

    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      const noResultsText = typeof i18next !== 'undefined' 
        ? i18next.t('search.no-results') 
        : 'No se encontraron resultados para:';
      
      resultsContainer.innerHTML = `
        <article class="search-no-results">
          <p>${noResultsText} "${query}"</p>
        </article>
      `;
      return;
    }

    const resultsText = typeof i18next !== 'undefined' 
      ? i18next.t('search.results') 
      : 'Resultados de búsqueda para:';
    
    // Obtener la traducción correcta para "resultado/resultados"
    const resultWord = typeof i18next !== 'undefined' 
      ? (results.length !== 1 ? i18next.t('search.results-plural') : i18next.t('search.result'))
      : (results.length !== 1 ? 'resultados' : 'resultado');
    
    const resultsHTML = `
      <h2>${resultsText} "${query}" <small>(${results.length} ${resultWord})</small></h2>
      <section class="search-results-list">
        ${results.map(result => `
          <article class="search-result-item">
            <h3><a href="${result.url}">${result.title}</a></h3>
            <p class="search-snippet">${result.snippet}</p>
            <p class="search-url">${result.url}</p>
          </article>
        `).join('')}
      </section>
    `;

    resultsContainer.innerHTML = resultsHTML;
  }

  // Limpiar resultados
  clearResults() {
    const resultsContainer = document.getElementById('search-results');
    const overlay = document.getElementById('search-results-overlay');
    
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
    }
    
    if (overlay) {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // Cerrar overlay
  closeOverlay() {
    this.clearResults();
  }
}

// Inicializar el buscador automático
let autoSearchEngine;

document.addEventListener('DOMContentLoaded', async function() {
  // Crear instancia del buscador
  autoSearchEngine = new AutoSearchEngine();
  
  // Indexar páginas al cargar
  await autoSearchEngine.indexPages();
  
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const closeSearchBtn = document.getElementById('close-search');
  const overlay = document.getElementById('search-results-overlay');
  
  if (searchForm && searchInput) {
    // Búsqueda al enviar el formulario
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value;
      if (query.trim().length >= 2) {
        const results = autoSearchEngine.search(query);
        autoSearchEngine.displayResults(results, query);
      }
    });

    // Búsqueda en tiempo real mientras escribe
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
      clearTimeout(searchTimeout);
      const query = e.target.value;
      
      if (query.length >= 2) {
        // Esperar 300ms después de que el usuario deje de escribir
        searchTimeout = setTimeout(() => {
          const results = autoSearchEngine.search(query);
          autoSearchEngine.displayResults(results, query);
        }, 300);
      } else if (query.length === 0) {
        autoSearchEngine.clearResults();
      }
    });
  }

  // Cerrar overlay con el botón X
  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', function() {
      autoSearchEngine.closeOverlay();
    });
  }

  // Cerrar overlay al hacer clic fuera del contenedor
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        autoSearchEngine.closeOverlay();
      }
    });
  }

  // Cerrar overlay con la tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      autoSearchEngine.closeOverlay();
    }
  });
});


