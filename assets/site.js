'use strict';

const header = document.querySelector('.site-header');

if (header) {
  const updateHeaderBackground = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 0);
  };

  updateHeaderBackground();
  window.addEventListener('scroll', updateHeaderBackground, { passive: true });
  window.addEventListener('pageshow', updateHeaderBackground);

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(() => {
      const height = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--site-header-height', `${height}px`);
    });
    observer.observe(header);
  }
}

const menu = document.querySelector('[data-mobile-menu]');
const desktop = window.matchMedia('(min-width: 62rem)');

if (menu) {
  const toggle = menu.querySelector('summary');
  const close = () => {
    menu.open = false;
  };

  desktop.addEventListener('change', event => {
    if (event.matches) close();
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('click', event => {
    if (menu.open && !menu.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      close();
      toggle.focus({ preventScroll: true });
    }
  });
}

for (const accordion of document.querySelectorAll('[data-accordion], [data-service-guide]')) {
  const items = [...accordion.querySelectorAll('details')];
  for (const item of items) {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      for (const sibling of items) {
        if (sibling !== item) sibling.open = false;
      }
    });
  }
}
