// Configuración de i18next para internacionalización
const resources = {
  es: {
    translation: {
      // Navegación
      'nav.inicio': 'Inicio',
      'nav.sobre-mi': 'Sobre mí',
      'nav.aficiones': 'Aficiones',
      'nav.contacto': 'Contacto',
      
      // Meta descriptions
      'meta.index': 'Sitio web personal - Desarrolladora Full-Stack, Profesora e Investigadora.',
      'meta.about': 'Información personal y profesional - Formación, experiencia laboral y logros.',
      'meta.hobbies': 'Aficiones e intereses personales.',
      'meta.contact': 'Información de contacto y redes sociales profesionales.',
      
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
      
      // Formación - Máster
      'about.formacion.master.titulo': 'Máster en Ingeniería Web',
      'about.formacion.master.fecha': '2025 - Actualidad',
      'about.formacion.master.institucion': 'Universidad de Oviedo, España',
      'about.formacion.master.descripcion': 'Especialización en Seguridad Web. Enfocada en proteger la información y garantizar la integridad de sistemas en línea mediante técnicas avanzadas de ciberseguridad aplicadas al desarrollo web.',
      
      // Formación - Licenciatura
      'about.formacion.licenciatura.titulo': 'Licenciatura en Ciencias de la Computación',
      'about.formacion.licenciatura.fecha': 'Septiembre 2018 - Diciembre 2023',
      'about.formacion.licenciatura.institucion': 'Universidad de La Habana, Cuba',
      'about.formacion.licenciatura.descripcion': 'Formación integral combinando conocimientos avanzados en matemáticas, programación y tecnologías de la información. Dominio de lenguajes como Python, C++, C#, JavaScript, frameworks como React y .NET, algoritmos, estructuras de datos, bases de datos SQL/NoSQL, inteligencia artificial, redes y ciberseguridad.',
      
      // Experiencia - Full-Stack
      'about.experiencia.fullstack.titulo': 'Desarrolladora Full-Stack',
      'about.experiencia.fullstack.fecha': 'Febrero 2024 - Actualidad',
      'about.experiencia.fullstack.institucion': 'IBERANT SOLUTIONS S.L. (Remoto)',
      'about.experiencia.fullstack.descripcion': 'Diseño, desarrollo y mantenimiento de aplicaciones web completas usando React para frontend y .NET con C# para backend. Creación de interfaces dinámicas y responsivas (UI/UX), desarrollo de APIs robustas y escalables con .NET Core, gestión y optimización de bases de datos SQL Server, y colaboración con equipos multidisciplinarios.',
      
      // Experiencia - Profesora
      'about.experiencia.profesora.titulo': 'Profesora Asistente de Álgebra y Matemáticas',
      'about.experiencia.profesora.fecha': 'Enero 2023 - Actualidad',
      'about.experiencia.profesora.institucion': 'Facultad de Economía, Universidad de La Habana, Cuba',
      'about.experiencia.profesora.descripcion': 'Impartición de clases de álgebra a nivel universitario, diseño de materiales didácticos, asesoramiento académico personalizado, colaboración en actualizaciones curriculares, y participación en actividades de investigación relacionadas con matemáticas aplicadas a la economía. Implementación de métodos innovadores de enseñanza integrando herramientas computacionales.',
      
      // Certificaciones - CICCI
      'about.certificaciones.cicci.titulo': 'Ponente en VII CICCI 2024',
      'about.certificaciones.cicci.fecha': 'Marzo 2024',
      'about.certificaciones.cicci.institucion': 'VII Conferencia Internacional de Ciencias Computacionales e Informática',
      'about.certificaciones.cicci.descripcion': 'Presentación del trabajo de investigación <strong>"CRYSTAL: Herramienta computacional para resolver modelos epidemiológicos definidos por ecuaciones diferenciales ordinarias"</strong>. Diseño y desarrollo de una herramienta innovadora para simular y analizar modelos epidemiológicos basados en ecuaciones diferenciales ordinarias, aplicando metodologías numéricas y técnicas avanzadas de programación. Esta participación permitió compartir conocimientos con la comunidad científica internacional sobre las últimas tendencias en ciencias computacionales aplicadas a problemas multidisciplinarios.',
      
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
      'search.result': 'resultado',
      'search.results-plural': 'resultados',
    }
  },
  en: {
    translation: {
      // Navigation
      'nav.inicio': 'Home',
      'nav.sobre-mi': 'About me',
      'nav.aficiones': 'Hobbies',
      'nav.contacto': 'Contact',
      
      // Meta descriptions
      'meta.index': 'Personal website - Full-Stack Developer, Professor and Researcher.',
      'meta.about': 'Personal and professional information - Education, work experience and achievements.',
      'meta.hobbies': 'Personal hobbies and interests.',
      'meta.contact': 'Contact information and professional social networks.',
      
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
      
      // Education - Master's
      'about.formacion.master.titulo': 'Master\'s in Web Engineering',
      'about.formacion.master.fecha': '2025 - Present',
      'about.formacion.master.institucion': 'University of Oviedo, Spain',
      'about.formacion.master.descripcion': 'Specialization in Web Security. Focused on protecting information and ensuring the integrity of online systems through advanced cybersecurity techniques applied to web development.',
      
      // Education - Bachelor's
      'about.formacion.licenciatura.titulo': 'Bachelor of Computer Science',
      'about.formacion.licenciatura.fecha': 'September 2018 - December 2023',
      'about.formacion.licenciatura.institucion': 'University of Havana, Cuba',
      'about.formacion.licenciatura.descripcion': 'Comprehensive training combining advanced knowledge in mathematics, programming, and information technology. Proficiency in languages such as Python, C++, C#, JavaScript, frameworks like React and .NET, algorithms, data structures, SQL/NoSQL databases, artificial intelligence, networks, and cybersecurity.',
      
      // Experience - Full-Stack
      'about.experiencia.fullstack.titulo': 'Full-Stack Developer',
      'about.experiencia.fullstack.fecha': 'February 2024 - Present',
      'about.experiencia.fullstack.institucion': 'IBERANT SOLUTIONS S.L. (Remote)',
      'about.experiencia.fullstack.descripcion': 'Design, development, and maintenance of comprehensive web applications using React for frontend and .NET with C# for backend. Creation of dynamic and responsive user interfaces (UI/UX), development of robust and scalable APIs with .NET Core, management and optimization of SQL Server databases, and collaboration with multidisciplinary teams.',
      
      // Experience - Professor
      'about.experiencia.profesora.titulo': 'Assistant Professor of Algebra and Mathematics',
      'about.experiencia.profesora.fecha': 'January 2023 - Present',
      'about.experiencia.profesora.institucion': 'Faculty of Economics, University of Havana, Cuba',
      'about.experiencia.profesora.descripcion': 'University-level algebra instruction, design of teaching materials, personalized academic advising, collaboration on curricular updates, and participation in research activities related to applied mathematics in economics. Implementation of innovative teaching methods integrating computational tools.',
      
      // Certifications - CICCI
      'about.certificaciones.cicci.titulo': 'Speaker at VII CICCI 2024',
      'about.certificaciones.cicci.fecha': 'March 2024',
      'about.certificaciones.cicci.institucion': 'VII International Conference on Computational Sciences and Informatics',
      'about.certificaciones.cicci.descripcion': 'Presentation of the research work <strong>"CRYSTAL: Computational tool for solving epidemiological models defined by ordinary differential equations"</strong>. Design and development of an innovative tool to simulate and analyze epidemiological models based on ordinary differential equations, applying numerical methodologies and advanced programming techniques. This participation allowed sharing knowledge with the international scientific community about the latest trends in computational sciences applied to multidisciplinary problems.',
      
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
      'search.result': 'result',
      'search.results-plural': 'results',
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
  
  // Actualizar meta description según la página actual
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const pageName = getPageName();
    const metaKey = `meta.${pageName}`;
    const translation = i18next.t(metaKey);
    
    if (translation && translation !== metaKey) {
      metaDescription.setAttribute('content', translation);
    }
  }
  
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
}

// Función auxiliar para obtener el nombre de la página actual
function getPageName() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1);
  
  // Mapear nombres de archivo a claves de traducción
  if (page === 'index.html' || page === '') {
    return 'index';
  } else if (page === 'about.html') {
    return 'about';
  } else if (page === 'hobbies.html') {
    return 'hobbies';
  } else if (page === 'contact.html') {
    return 'contact';
  }
  
  return 'index'; // Por defecto
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
      i18next.changeLanguage(newLang);
    });
  }
  
  // Actualizar contenido inicial
  updateContent();
});

// Evento cuando cambia el idioma (evita llamadas redundantes)
i18next.on('languageChanged', function(lng) {
  // Actualizar atributo lang del documento
  document.documentElement.lang = lng;
  
  // Actualizar selector de idioma
  const langSelector = document.getElementById('language-selector');
  if (langSelector && langSelector.value !== lng) {
    langSelector.value = lng;
  }
  
  // Actualizar contenido
  updateContent();
  
  // Re-indexar páginas del buscador con el nuevo idioma
  if (typeof autoSearchEngine !== 'undefined' && autoSearchEngine) {
    console.log(`🔄 Re-indexando páginas en ${lng}...`);
    autoSearchEngine.indexPages(true);
  }
});

