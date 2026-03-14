// Client-side language management
// Reads localStorage and applies data-lang attribute to <html>
// This script runs on every page load before paint (inline)

const STORAGE_KEY = 'wiki_lang';

function applyLang(lang: string) {
  document.documentElement.setAttribute('data-lang', lang);
}

function initLang() {
  const saved = localStorage.getItem(STORAGE_KEY) || 'en';
  applyLang(saved);
}

function toggleLang() {
  const current = document.documentElement.getAttribute('data-lang') || 'en';
  const next = current === 'en' ? 'pt' : 'en';
  localStorage.setItem(STORAGE_KEY, next);
  applyLang(next);
}

// Auto-init
initLang();

// Expose toggle for the LangToggle component
(window as any).__toggleLang = toggleLang;
