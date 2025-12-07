// Buscador del sitio web
class SiteSearch {
  constructor() {
    this.pages = [
      {
        url: 'index.html',
        title: 'Inicio',
        content: 'Hola soy Daniela Estudiante del Máster en Ingeniería Web Bienvenida Este es mi espacio en línea donde comparto información sobre mí mis intereses y cómo contactarme'
      },
      {
        url: 'about.html',
        title: 'Sobre mí',
        content: 'Sobre mí Quién soy Me llamo Daniela Estudio el Máster en Ingeniería Web y me apasiona la tecnología el diseño y la programación También me interesan la experiencia de usuario la inteligencia artificial y el desarrollo de software Formación Experiencia Laboral'
      },
      {
        url: 'hobbies.html',
        title: 'Aficiones',
        content: 'Mis aficiones Series coreanas Me encanta ver dramas y series coreanas que combinan historias intensas con riqueza cultural y emocional Programación La programación es mi vocación me gusta experimentar con nuevos lenguajes y frameworks y construir proyectos personales Ciencia ficción Disfruto de series y películas de ciencia ficción por su capacidad para imaginar futuros y posibilidades tecnológicas Películas Mi película favorita es Crepúsculo me encanta la mezcla entre romance y elementos fantásticos'
      },
      {
        url: 'contact.html',
        title: 'Contacto',
        content: 'Contacto Puedes ponerte en contacto conmigo a través de los siguientes medios Email Teléfono Ubicación Oviedo Asturias España LinkedIn GitHub Redes Sociales Referencias'
      }
    ];
  }

  search(query) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results = [];

    this.pages.forEach(page => {
      const titleMatch = page.title.toLowerCase().includes(searchTerm);
      const contentMatch = page.content.toLowerCase().includes(searchTerm);
      
      if (titleMatch || contentMatch) {
        // Extraer fragmento relevante
        const snippet = this.getSnippet(page.content, searchTerm);
        
        results.push({
          url: page.url,
          title: page.title,
          snippet: snippet,
          relevance: titleMatch ? 2 : 1
        });
      }
    });

    // Ordenar por relevancia
    return results.sort((a, b) => b.relevance - a.relevance);
  }

  getSnippet(content, searchTerm, maxLength = 150) {
    const lowerContent = content.toLowerCase();
    const index = lowerContent.indexOf(searchTerm);
    
    if (index === -1) {
      return content.substring(0, maxLength) + '...';
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + searchTerm.length + 50);
    
    let snippet = content.substring(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';
    
    // Resaltar término de búsqueda
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    snippet = snippet.replace(regex, '<mark>$1</mark>');
    
    return snippet;
  }

  displayResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    const overlay = document.getElementById('search-results-overlay');
    
    if (!resultsContainer || !overlay) return;

    // Mostrar el overlay
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body

    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p><span data-i18n="search.no-results">No se encontraron resultados para:</span> "${query}"</p>
        </div>
      `;
      return;
    }

    const resultsHTML = `
      <h2><span data-i18n="search.results">Resultados de búsqueda para:</span> "${query}"</h2>
      <div class="search-results-list">
        ${results.map(result => `
          <article class="search-result-item">
            <h3><a href="${result.url}">${result.title}</a></h3>
            <p class="search-snippet">${result.snippet}</p>
          </article>
        `).join('')}
      </div>
    `;

    resultsContainer.innerHTML = resultsHTML;
  }

  clearResults() {
    const resultsContainer = document.getElementById('search-results');
    const overlay = document.getElementById('search-results-overlay');
    
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
    }
    
    if (overlay) {
      overlay.style.display = 'none';
      document.body.style.overflow = ''; // Restaurar scroll del body
    }
  }

  closeOverlay() {
    this.clearResults();
  }
}

// Inicializar buscador
let searchEngine;

document.addEventListener('DOMContentLoaded', function() {
  searchEngine = new SiteSearch();
  
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const closeSearchBtn = document.getElementById('close-search');
  const overlay = document.getElementById('search-results-overlay');
  
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value;
      if (query.trim().length >= 2) {
        const results = searchEngine.search(query);
        searchEngine.displayResults(results, query);
      }
    });

    // Búsqueda mientras se escribe (después de 2 caracteres)
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value;
      if (query.length >= 2) {
        const results = searchEngine.search(query);
        searchEngine.displayResults(results, query);
      } else if (query.length === 0) {
        searchEngine.clearResults();
      }
    });
  }

  // Cerrar overlay con el botón X
  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', function() {
      searchEngine.closeOverlay();
    });
  }

  // Cerrar overlay al hacer clic fuera del contenedor
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        searchEngine.closeOverlay();
      }
    });
  }

  // Cerrar overlay con la tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      searchEngine.closeOverlay();
    }
  });
});

