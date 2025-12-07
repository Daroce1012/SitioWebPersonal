// Traducciones del sitio
const translations = {
  es: {
    // Navegación
    'nav.inicio': 'Inicio',
    'nav.sobre-mi': 'Sobre mí',
    'nav.aficiones': 'Aficiones',
    'nav.contacto': 'Contacto',
    
    // Página de inicio
    'index.titulo': 'Hola, soy Daniela',
    'index.subtitulo': 'Estudiante del Máster en Ingeniería Web',
    'index.btn-conoceme': 'Conóceme',
    'index.bienvenida': 'Bienvenida',
    'index.descripcion': 'Este es mi espacio en línea donde comparto información sobre mí, mis intereses y cómo contactarme.',
    
    // Página Sobre mí
    'about.titulo': 'Sobre mí',
    'about.quien-soy': 'Quién soy',
    'about.descripcion1': 'Me llamo Daniela. Estudio el Máster en Ingeniería Web y me apasiona la tecnología, el diseño y la programación.',
    'about.descripcion2': 'También me interesan la experiencia de usuario, la inteligencia artificial y el desarrollo de software.',
    'about.formacion': 'Formación',
    'about.experiencia': 'Experiencia Laboral',
    
    // Página Aficiones
    'hobbies.titulo': 'Mis aficiones',
    'hobbies.series-coreanas': 'Series coreanas',
    'hobbies.series-desc': 'Me encanta ver dramas y series coreanas, que combinan historias intensas con riqueza cultural y emocional.',
    'hobbies.programacion': 'Programación',
    'hobbies.programacion-desc': 'La programación es mi vocación: me gusta experimentar con nuevos lenguajes y frameworks, y construir proyectos personales.',
    'hobbies.ciencia-ficcion': 'Ciencia ficción',
    'hobbies.ciencia-desc': 'Disfruto de series y películas de ciencia ficción por su capacidad para imaginar futuros y posibilidades tecnológicas.',
    'hobbies.peliculas': 'Películas',
    'hobbies.peliculas-desc': 'Mi película favorita es <strong>Crepúsculo</strong>, me encanta la mezcla entre romance y elementos fantásticos.',
    
    // Página Contacto
    'contact.titulo': 'Contacto',
    'contact.descripcion': 'Puedes ponerte en contacto conmigo a través de los siguientes medios:',
    'contact.email': 'Email:',
    'contact.telefono': 'Teléfono:',
    'contact.ubicacion': 'Ubicación:',
    'contact.ubicacion-valor': 'Oviedo, Asturias, España',
    'contact.redes-sociales': 'Redes Sociales',
    'contact.referencias': 'Referencias',
    'contact.referencias-desc': 'Personas que pueden avalar mi trabajo y experiencia:',
    
    // Footer
    'footer.derechos': 'Todos los derechos reservados.',
    
    // Buscador
    'search.placeholder': 'Buscar en el sitio...',
    'search.button': 'Buscar',
    'search.no-results': 'No se encontraron resultados para:',
    'search.results': 'Resultados de búsqueda para:',
  },
  en: {
    // Navigation
    'nav.inicio': 'Home',
    'nav.sobre-mi': 'About me',
    'nav.aficiones': 'Hobbies',
    'nav.contacto': 'Contact',
    
    // Home page
    'index.titulo': 'Hi, I\'m Daniela',
    'index.subtitulo': 'Master\'s in Web Engineering Student',
    'index.btn-conoceme': 'Get to know me',
    'index.bienvenida': 'Welcome',
    'index.descripcion': 'This is my online space where I share information about me, my interests and how to contact me.',
    
    // About page
    'about.titulo': 'About me',
    'about.quien-soy': 'Who I am',
    'about.descripcion1': 'My name is Daniela. I study the Master\'s in Web Engineering and I\'m passionate about technology, design and programming.',
    'about.descripcion2': 'I\'m also interested in user experience, artificial intelligence and software development.',
    'about.formacion': 'Education',
    'about.experiencia': 'Work Experience',
    
    // Hobbies page
    'hobbies.titulo': 'My hobbies',
    'hobbies.series-coreanas': 'Korean dramas',
    'hobbies.series-desc': 'I love watching Korean dramas and series, which combine intense stories with cultural and emotional richness.',
    'hobbies.programacion': 'Programming',
    'hobbies.programacion-desc': 'Programming is my vocation: I like to experiment with new languages and frameworks, and build personal projects.',
    'hobbies.ciencia-ficcion': 'Science fiction',
    'hobbies.ciencia-desc': 'I enjoy science fiction series and movies for their ability to imagine futures and technological possibilities.',
    'hobbies.peliculas': 'Movies',
    'hobbies.peliculas-desc': 'My favorite movie is <strong>Twilight</strong>, I love the mix between romance and fantasy elements.',
    
    // Contact page
    'contact.titulo': 'Contact',
    'contact.descripcion': 'You can contact me through the following means:',
    'contact.email': 'Email:',
    'contact.telefono': 'Phone:',
    'contact.ubicacion': 'Location:',
    'contact.ubicacion-valor': 'Oviedo, Asturias, Spain',
    'contact.redes-sociales': 'Social Networks',
    'contact.referencias': 'References',
    'contact.referencias-desc': 'People who can vouch for my work and experience:',
    
    // Footer
    'footer.derechos': 'All rights reserved.',
    
    // Search
    'search.placeholder': 'Search the site...',
    'search.button': 'Search',
    'search.no-results': 'No results found for:',
    'search.results': 'Search results for:',
  }
};

// Obtener idioma actual
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'es';
}

// Cambiar idioma
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  updateContent(lang);
  updateLangAttribute(lang);
}

// Actualizar atributo lang del HTML
function updateLangAttribute(lang) {
  document.documentElement.lang = lang;
}

// Actualizar contenido de la página
function updateContent(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });
  
  // Actualizar selector de idioma
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = lang;
  }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  const currentLang = getCurrentLanguage();
  updateContent(currentLang);
  updateLangAttribute(currentLang);
  
  // Event listener para el selector de idioma
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = currentLang;
    langSelector.addEventListener('change', function(e) {
      setLanguage(e.target.value);
    });
  }
});

