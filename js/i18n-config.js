// Configuración de i18next para internacionalización
const resources = {
  es: {
    translation: {
      // Navegación
      'nav.inicio': 'Inicio',
      'nav.sobre-mi': 'Sobre mí',
      'nav.aficiones': 'Aficiones',
      'nav.contacto': 'Contacto',
      
      // Página de inicio
      'index.titulo': 'Hola, soy Daniela Rodríguez Cepero',
      'index.subtitulo': 'Desarrolladora Full-Stack | Profesora | Investigadora',
      'index.btn-conoceme': 'Conóceme',
      'index.bienvenida': 'Bienvenida',
      'index.descripcion': 'Desarrolladora Full-Stack con experiencia en React, Angular, .NET y Python. Profesora de matemáticas e investigadora especializada en métodos numéricos y simulaciones. Actualmente cursando el Máster en Ingeniería Web con especialización en Seguridad Web en la Universidad de Oviedo.',
      
      // Página Sobre mí
      'about.titulo': 'Sobre mí',
      'about.quien-soy': 'Quién soy',
      'about.descripcion1': 'Me llamo Daniela Rodríguez Cepero. Soy desarrolladora Full-Stack, profesora e investigadora en programación aplicada a matemáticas. Tengo experiencia en tecnologías como React, Angular, Node.js, Python y bases de datos SQL/NoSQL.',
      'about.descripcion2': 'He trabajado como profesora de álgebra y matemáticas, integrando herramientas computacionales para mejorar el aprendizaje. Como investigadora, me especializo en métodos numéricos y simulaciones, destacando mi proyecto CRYSTAL para modelado epidemiológico.',
      'about.formacion': 'Formación',
      'about.experiencia': 'Experiencia Laboral',
      'about.certificaciones': 'Certificaciones y Logros',
      
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
    }
  },
  en: {
    translation: {
      // Navigation
      'nav.inicio': 'Home',
      'nav.sobre-mi': 'About me',
      'nav.aficiones': 'Hobbies',
      'nav.contacto': 'Contact',
      
      // Home page
      'index.titulo': 'Hi, I\'m Daniela Rodríguez Cepero',
      'index.subtitulo': 'Full-Stack Developer | Professor | Researcher',
      'index.btn-conoceme': 'Get to know me',
      'index.bienvenida': 'Welcome',
      'index.descripcion': 'Full-Stack Developer with experience in React, Angular, .NET and Python. Mathematics professor and researcher specialized in numerical methods and simulations. Currently pursuing a Master\'s in Web Engineering with a specialization in Web Security at the University of Oviedo.',
      
      // About page
      'about.titulo': 'About me',
      'about.quien-soy': 'Who I am',
      'about.descripcion1': 'My name is Daniela Rodríguez Cepero. I am a Full-Stack developer, professor, and researcher in programming applied to mathematics. I have experience in technologies such as React, Angular, Node.js, Python, and SQL/NoSQL databases.',
      'about.descripcion2': 'I have worked as an algebra and mathematics professor, integrating computational tools to improve learning. As a researcher, I specialize in numerical methods and simulations, highlighting my CRYSTAL project for epidemiological modeling.',
      'about.formacion': 'Education',
      'about.experiencia': 'Work Experience',
      'about.certificaciones': 'Certifications and Achievements',
      
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
  }
};

// Inicializar i18next
i18next
  .use(i18nextBrowserLanguageDetector)
  .init({
    resources: resources,
    fallbackLng: 'es',
    debug: false,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language'
    },
    interpolation: {
      escapeValue: false // No escapar HTML (necesario para <strong>, etc.)
    }
  }, function(err, t) {
    // Callback después de inicializar
    updateContent();
  });

// Función para actualizar el contenido de la página
function updateContent() {
  const currentLang = i18next.language;
  
  // Actualizar atributo lang del HTML
  document.documentElement.lang = currentLang;
  
  // Actualizar todos los elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
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
  
  // Actualizar selector de idioma
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = currentLang;
  }
}

// Event listener para cambio de idioma
document.addEventListener('DOMContentLoaded', function() {
  const langSelector = document.getElementById('language-selector');
  
  if (langSelector) {
    // Establecer idioma actual
    langSelector.value = i18next.language;
    
    // Cambiar idioma al seleccionar
    langSelector.addEventListener('change', function(e) {
      const newLang = e.target.value;
      i18next.changeLanguage(newLang, function(err, t) {
        if (!err) {
          updateContent();
        }
      });
    });
  }
  
  // Actualizar contenido inicial
  updateContent();
});

// Evento cuando cambia el idioma
i18next.on('languageChanged', function(lng) {
  updateContent();
});

