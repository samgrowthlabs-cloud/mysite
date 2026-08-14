(() => {
  const company = window.SAMGROWTH_CONFIG?.company || {};
  document.querySelectorAll('[data-company-email]').forEach(el => { el.textContent = company.email || ''; if (el.tagName === 'A') el.href = 'mailto:' + (company.email || ''); });
  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = new Date().getFullYear());
  const button = document.querySelector('.mobile-menu-btn'), navigation = document.querySelector('.nav-links');
  if (!button || !navigation) return;
  button.addEventListener('click', () => {
    const open = navigation.classList.toggle('active');
    document.body.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
})();