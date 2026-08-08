// Katharsis — comportament comun tuturor paginilor
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  document.querySelectorAll('.quote-carousel-wrap').forEach(wrap => {
    const track = wrap.querySelector('.quote-carousel');
    const prev = wrap.querySelector('[data-carousel-prev]');
    const next = wrap.querySelector('[data-carousel-next]');
    if (!track) return;
    const scrollByCard = dir => {
      const card = track.querySelector('.quote-card');
      const amount = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    };
    if (prev) prev.addEventListener('click', () => scrollByCard(-1));
    if (next) next.addEventListener('click', () => scrollByCard(1));
  });
});
