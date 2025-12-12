const DEFAULT_SEARCH_CONFIG = {
  minQueryLength: 2,
  debounceDelay: 300,
  relevanceWeights: {
    title: 10,
    description: 5,
    content: 1,
    sections: 3
  },
  snippet: {
    maxLength: 300,
    contextBefore: 100,
    contextAfter: 150
  },
  selectors: {
    resultsContainer: '#search-results',
    overlay: '#search-results-overlay',
    form: '#search-form',
    input: '#search-input',
    closeButton: '#close-search'
  },
  excludedElements: ['script', 'style', 'nav', 'header', 'footer', 'svg'],
  excludedClasses: ['.social-links', '.social-link'],
  excludedSections: {
    social: [/redes\s+social/i, /social\s+network/i]
  },
  redundantPrefixes: [
    /^sobre mí\s+quién soy\s+/i,
    /^sobre mí\s+/i,
    /^quién soy\s+/i,
    /^referencias\s+personas que pueden avalar.+\s*:\s*/i,
    /^about me\s+who i am\s+/i,
    /^about me\s+/i,
    /^who i am\s+/i,
    /^references\s+people who can vouch.+\s*:\s*/i
  ],
  wordBoundaryChars: [' ', '.', ':', '\n'],
  translationKeys: {
    noResults: 'search.no-results',
    results: 'search.results',
    result: 'search.result',
    resultsPlural: 'search.results-plural'
  }
};

class AutoSearchEngine {
  constructor(config = {}) {
    this.config = { ...DEFAULT_SEARCH_CONFIG, ...config };
    this.indexedPages = [];
    this.isIndexing = false;
    this.indexingComplete = false;
    
    this.indexer = new PageIndexer(this.config);
    this.searchEngine = new SearchEngine(this.config);
    this.snippetBuilder = new SnippetBuilder(this.config);
    this.ui = new UIRenderer(this.config, this);
    this.eventManager = new SearchEventManager(this.config, this);
  }

  async indexPages(pages, forceReindex = false) {
    if (this.isIndexing || (this.indexingComplete && !forceReindex)) {
      return;
    }

    this.isIndexing = true;
    console.log("🔍 Iniciando indexación...");

    try {
      this.indexedPages = await this.indexer.indexAllPages(pages);
      this.searchEngine.loadIndex(this.indexedPages);
      this.indexingComplete = true;
      console.log(`🎉 Indexación completa. ${this.indexedPages.length} páginas indexadas.`);
    } catch (error) {
      console.error("❌ Error durante la indexación:", error);
      throw error;
    } finally {
      this.isIndexing = false;
    }
  }

  search(query) {
    const trimmed = query?.trim();
    if (!trimmed || trimmed.length < this.config.minQueryLength) {
      return [];
    }

    const results = this.searchEngine.search(trimmed);
    
    return results.map(result => ({
      ...result,
      snippet: this.snippetBuilder.buildSnippet(result.page, trimmed)
    }));
  }

  displayResults(results, query) {
    this.ui.displayResults(results, query);
  }

  clearResults() {
    this.ui.clearResults();
  }

  closeOverlay() {
    this.ui.clearResults();
  }

  initializeUI() {
    this.eventManager.setup();
  }
}

class PageIndexer {
  constructor(config) {
    this.config = config;
    this.htmlParser = new HTMLParser(config);
    this.contentExtractor = new ContentExtractor(config);
  }

  async indexAllPages(pages) {
    const indexed = [];
    
    for (const page of pages) {
      try {
        const pageData = await this.indexPage(page);
        if (pageData) {
          indexed.push(pageData);
          console.log(`✅ Indexada: ${pageData.title}`);
        }
      } catch (error) {
        console.error(`❌ Error indexando ${page.url}:`, error);
      }
    }
    
    return indexed;
  }

  async indexPage(page) {
    const html = await this.fetchPage(page.url);
    
    if (typeof i18next !== 'undefined' && !i18next.isInitialized) {
      await new Promise(resolve => {
        if (i18next.isInitialized) {
          resolve();
        } else {
          i18next.on('initialized', resolve);
        }
      });
    }
    
    const container = this.htmlParser.parse(html);
    const mainContent = this.contentExtractor.extractMain(container);
    const sections = this.contentExtractor.extractSections(mainContent);
    
    return {
      url: page.url,
      title: this.getPageTitle(page, html),
      description: this.getPageDescription(page, html),
      content: this.contentExtractor.clean(mainContent),
      nameKey: page.nameKey,
      metaKey: page.metaKey,
      sections: sections
    };
  }

  getPageTitle(page, html) {
    if (page.nameKey && this.isI18nAvailable()) {
      return i18next.t(page.nameKey);
    }
    if (page.name) return page.name;
    
    const match = html.match(/<title>(.*?)<\/title>/i);
    return match ? match[1].trim() : page.url;
  }

  getPageDescription(page, html) {
    if (page.metaKey && this.isI18nAvailable()) {
      return i18next.t(page.metaKey);
    }
    
    const match = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    return match ? match[1].trim() : '';
  }

  async fetchPage(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al cargar ${url}: ${response.statusText}`);
    }
    return await response.text();
  }

  isI18nAvailable() {
    return typeof i18next !== 'undefined' && typeof i18next.t === 'function';
  }
}

class HTMLParser {
  constructor(config) {
    this.config = config;
    this.translator = new ContentTranslator();
  }

  parse(html) {
    const container = document.createElement('section');
    container.innerHTML = html;
    
    this.removeExcludedElements(container);
    this.translator.translate(container);
    
    return container;
  }

  removeExcludedElements(container) {
    this.config.excludedElements.forEach(selector => {
      container.querySelectorAll(selector).forEach(el => el.remove());
    });
    
    this.config.excludedClasses.forEach(className => {
      container.querySelectorAll(className).forEach(el => el.remove());
    });
  }
}

class ContentExtractor {
  constructor(config) {
    this.config = config;
  }

  extractMain(container) {
    const main = container.querySelector('main') || 
                 container.querySelector('body') || 
                 container;
    
    this.removeExcludedSections(main);
    this.convertHeadingsToText(main);
    
    return main;
  }

  removeExcludedSections(main) {
    const cards = main.querySelectorAll('.card');
    
    cards.forEach(card => {
      const heading = card.querySelector('h1, h2');
      if (!heading) return;
      
      const text = heading.textContent.trim().toLowerCase();
      
      const shouldExclude = Object.values(this.config.excludedSections)
        .some(patterns => patterns.some(pattern => pattern.test(text)));
      
      if (shouldExclude) {
        card.remove();
      }
    });
  }

  convertHeadingsToText(main) {
    main.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      const textNode = document.createTextNode(heading.textContent + ': ');
      heading.replaceWith(textNode);
    });
  }

  extractSections(main) {
    const sections = {};
    const cards = main.querySelectorAll('.card');
    
    for (const card of cards) {
      const refContainer = card.querySelector('.references-grid') || 
                          card.querySelector('.reference-card');
      
      if (refContainer) {
        sections.references = this.clean(refContainer);
        break;
      }
    }
    
    return sections;
  }

  clean(element) {
    const text = element.innerText || element.textContent || '';
    return text.replace(/\s+/g, ' ').trim();
  }
}

class ContentTranslator {
  translate(container) {
    if (!this.isI18nAvailable()) return;
    
    if (!i18next.isInitialized) {
      console.warn('i18next no está inicializado, las traducciones pueden no funcionar correctamente');
      return;
    }
    
    const currentLanguage = i18next.language;
    
    container.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = i18next.t(key, { lng: currentLanguage });
      
      if (!translation || translation === key) return;
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.innerHTML = translation;
      }
    });
  }

  isI18nAvailable() {
    return typeof i18next !== 'undefined' && typeof i18next.t === 'function';
  }
}

class SearchEngine {
  constructor(config) {
    this.config = config;
    this.index = [];
  }

  loadIndex(pages) {
    this.index = pages;
  }

  search(term) {
    const normalizedTerm = term.toLowerCase();
    const matches = [];
    
    for (const page of this.index) {
      const relevance = this.calculateRelevance(page, normalizedTerm);
      
      if (relevance > 0) {
        matches.push({
          page: page,
          relevance: relevance
        });
      }
    }
    
    return matches.sort((a, b) => b.relevance - a.relevance);
  }

  calculateRelevance(page, term) {
    let relevance = 0;
    const weights = this.config.relevanceWeights;
    
    if (page.title.toLowerCase().includes(term)) {
      relevance += weights.title;
    }
    
    if (page.description.toLowerCase().includes(term)) {
      relevance += weights.description;
    }
    
    if (page.content.toLowerCase().includes(term)) {
      relevance += weights.content;
    }
    
    if (page.sections) {
      Object.values(page.sections).forEach(section => {
        if (section.toLowerCase().includes(term)) {
          relevance += weights.sections;
        }
      });
    }
    
    return relevance;
  }
}

class SnippetBuilder {
  constructor(config) {
    this.config = config;
    this.textProcessor = new TextProcessor(config);
  }

  buildSnippet(page, term) {
    const text = this.selectBestText(page, term);
    const normalizedText = text.toLowerCase();
    const normalizedTerm = term.toLowerCase();
    const index = normalizedText.indexOf(normalizedTerm);
    
    if (index === -1) {
      return this.textProcessor.truncate(text, this.config.snippet.maxLength);
    }
    
    const snippet = this.textProcessor.extractContext(
      text,
      index,
      term.length,
      this.config.snippet
    );
    
    return this.textProcessor.highlight(snippet, term);
  }

  selectBestText(page, term) {
    const normalizedTerm = term.toLowerCase();
    
    if (page.sections) {
      for (const [key, section] of Object.entries(page.sections)) {
        if (section.toLowerCase().includes(normalizedTerm)) {
          return section;
        }
      }
    }
    
    if (page.content.toLowerCase().includes(normalizedTerm)) {
      return page.content;
    }
    
    if (page.description.toLowerCase().includes(normalizedTerm)) {
      return page.description;
    }
    
    return page.title;
  }
}

class TextProcessor {
  constructor(config) {
    this.config = config;
  }

  extractContext(text, index, termLength, snippetConfig) {
    const { contextBefore, contextAfter, maxLength } = snippetConfig;
    
    let start = this.findSentenceStart(text, index);
    let end = this.findSentenceEnd(text, index + termLength);
    
    if (end - start > maxLength) {
      start = Math.max(0, index - contextBefore);
      end = Math.min(text.length, index + termLength + contextAfter);
      start = this.adjustToWordBoundary(text, start, index, 'backward');
      end = this.adjustToWordBoundary(text, end, index + termLength, 'forward');
    } else {
      const sentenceBefore = this.findSentenceStart(text, Math.max(0, start - 1));
      const sentenceAfter = this.findSentenceEnd(text, Math.min(text.length, end + 1));
      
      if (sentenceBefore < start && (end - sentenceBefore) <= maxLength) {
        start = sentenceBefore;
      }
      
      if (sentenceAfter > end && (sentenceAfter - start) <= maxLength) {
        end = sentenceAfter;
      }
    }
    
    let snippet = text.substring(start, end).trim();
    snippet = this.removeRedundantPrefixes(snippet);
    snippet = this.addHeadingSeparation(snippet, text, index, start);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet += '...';
    
    return snippet;
  }

  addHeadingSeparation(snippet, text, termIndex, snippetStart) {
    const beforeTerm = text.substring(snippetStart, termIndex);
    const colonIndex = beforeTerm.lastIndexOf(': ');
    
    if (colonIndex !== -1 && colonIndex > beforeTerm.length - 50) {
      const textAfterColon = beforeTerm.substring(colonIndex + 2).trim();
      if (textAfterColon.length <= 10 && !snippet.startsWith('...')) {
        snippet = snippet.replace(/^([^:]+):\s+/, '$1. ');
      }
    }
    
    return snippet;
  }

  findSentenceStart(text, index) {
    const sentenceEnders = ['.', ':', '\n', '!', '?'];
    let start = index;
    
    for (let i = index - 1; i >= 0; i--) {
      if (sentenceEnders.includes(text[i])) {
        start = i + 1;
        break;
      }
      if (i === 0) {
        start = 0;
        break;
      }
    }
    
    while (start < text.length && text[start] === ' ') {
      start++;
    }
    
    return start;
  }

  findSentenceEnd(text, index) {
    const sentenceEnders = ['.', ':', '\n', '!', '?'];
    let end = index;
    
    for (let i = index; i < text.length; i++) {
      if (sentenceEnders.includes(text[i])) {
        end = i + 1;
        break;
      }
      if (i === text.length - 1) {
        end = text.length;
        break;
      }
    }
    
    return end;
  }

  adjustToWordBoundary(text, position, reference, direction) {
    const boundaryChars = this.config.wordBoundaryChars;
    
    if (direction === 'backward') {
      while (position > 0 && position < reference && 
             !boundaryChars.includes(text[position])) {
        position--;
      }
      if (position < reference && boundaryChars.includes(text[position])) {
        position++;
      }
    } else {
      while (position < text.length && 
             !boundaryChars.includes(text[position])) {
        position++;
      }
    }
    
    return position;
  }

  removeRedundantPrefixes(text) {
    let cleaned = text;
    let previousLength;
    do {
      previousLength = cleaned.length;
      for (const pattern of this.config.redundantPrefixes) {
        cleaned = cleaned.replace(pattern, '').trim();
      }
    } while (cleaned.length !== previousLength && cleaned.length > 0);
    
    return cleaned.trim();
  }

  highlight(text, term) {
    const escaped = this.escapeRegex(term);
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

class UIRenderer {
  constructor(config, engine) {
    this.config = config;
    this.engine = engine;
    this.templateRenderer = new TemplateRenderer(config);
  }

  displayResults(results, query) {
    const container = this.getElement(this.config.selectors.resultsContainer);
    const overlay = this.getElement(this.config.selectors.overlay);
    
    if (!container || !overlay) return;
    
    overlay.showModal();
    document.body.style.overflow = 'hidden';
    
    if (results.length === 0) {
      container.innerHTML = this.templateRenderer.renderNoResults(query);
      return;
    }
    
    container.innerHTML = this.templateRenderer.renderResults(results, query);
  }

  clearResults() {
    const container = this.getElement(this.config.selectors.resultsContainer);
    const overlay = this.getElement(this.config.selectors.overlay);
    
    if (container) container.innerHTML = '';
    if (overlay) {
      overlay.close();
      document.body.style.overflow = '';
    }
  }

  getElement(selector) {
    return document.querySelector(selector);
  }
}

class TemplateRenderer {
  constructor(config) {
    this.config = config;
  }

  renderNoResults(query) {
    const message = this.getTranslation(
      this.config.translationKeys.noResults,
      'No se encontraron resultados para:'
    );
    
    return `
      <article class="search-no-results">
        <p>${message} "${this.escapeHtml(query)}"</p>
      </article>
    `;
  }

  renderResults(results, query) {
    const resultsText = this.getTranslation(
      this.config.translationKeys.results,
      'Resultados para:'
    );
    const countText = this.getResultCountText(results.length);
    
    return `
      <h2>${resultsText} "${this.escapeHtml(query)}" <small>(${results.length} ${countText})</small></h2>
      <section class="search-results-list">
        ${results.map(result => this.renderResultItem(result)).join('')}
      </section>
    `;
  }

  renderResultItem(result) {
    return `
      <article class="search-result-item">
        <h3><a href="${this.escapeHtml(result.page.url)}">${this.escapeHtml(result.page.title)}</a></h3>
        <p class="search-snippet">${result.snippet}</p>
      </article>
    `;
  }

  getResultCountText(count) {
    const key = count === 1 
      ? this.config.translationKeys.result
      : this.config.translationKeys.resultsPlural;
    
    return this.getTranslation(key, count === 1 ? 'resultado' : 'resultados');
  }

  getTranslation(key, fallback) {
    if (typeof i18next !== 'undefined' && typeof i18next.t === 'function') {
      const translation = i18next.t(key);
      return translation !== key ? translation : fallback;
    }
    return fallback;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

class SearchEventManager {
  constructor(config, engine) {
    this.config = config;
    this.engine = engine;
    this.debounceTimer = null;
  }

  setup() {
    this.setupForm();
    this.setupInput();
    this.setupCloseButton();
    this.setupOverlay();
    this.setupKeyboard();
  }

  setupForm() {
    const form = document.querySelector(this.config.selectors.form);
    const input = document.querySelector(this.config.selectors.input);
    
    if (!form || !input) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.executeSearch(input.value);
    });
  }

  setupInput() {
    const input = document.querySelector(this.config.selectors.input);
    if (!input) return;
    
    input.addEventListener('input', (e) => {
      this.debounceSearch(e.target.value);
    });
  }

  debounceSearch(query) {
    clearTimeout(this.debounceTimer);
    
    const trimmed = query.trim();
    
    if (trimmed.length < this.config.minQueryLength) {
      this.engine.clearResults();
      return;
    }
    
    this.debounceTimer = setTimeout(() => {
      this.executeSearch(trimmed);
    }, this.config.debounceDelay);
  }

  executeSearch(query) {
    const results = this.engine.search(query);
    this.engine.displayResults(results, query);
  }

  setupCloseButton() {
    const closeBtn = document.querySelector(this.config.selectors.closeButton);
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.engine.closeOverlay());
    }
  }

  setupOverlay() {
    const overlay = document.querySelector(this.config.selectors.overlay);
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.engine.closeOverlay();
        }
      });
    }
  }

  setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.engine.closeOverlay();
      }
    });
  }
}

let autoSearchEngine;

async function initializeSearchEngine(customConfig = {}, pages = pagesToIndex) {
  autoSearchEngine = new AutoSearchEngine(customConfig);
  autoSearchEngine.initializeUI();
  
  await autoSearchEngine.indexPages(pages);
  
  return autoSearchEngine;
}

document.addEventListener('DOMContentLoaded', async () => {
  if (typeof i18next !== 'undefined') {
    await new Promise(resolve => {
      if (i18next.isInitialized) {
        resolve();
      } else {
        i18next.on('initialized', resolve);
      }
    });
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  await initializeSearchEngine();
});

if (typeof i18next !== 'undefined') {
  i18next.on('languageChanged', async (lng) => {
    if (autoSearchEngine && typeof pagesToIndex !== 'undefined') {
      console.log(`🔄 Re-indexando páginas en ${lng}...`);
      await new Promise(resolve => setTimeout(resolve, 100));
      await autoSearchEngine.indexPages(pagesToIndex, true);
    }
  });
}
