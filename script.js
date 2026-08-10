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

  document.querySelectorAll('.hero-stars').forEach(container => {
    const count = 32;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      const size = (Math.random() * 2.5 + 1.5).toFixed(1);
      star.style.setProperty('--x', Math.random() * 100 + '%');
      star.style.setProperty('--size', size + 'px');
      star.style.setProperty('--duration', (Math.random() * 6 + 7).toFixed(1) + 's');
      star.style.setProperty('--delay', (Math.random() * -14).toFixed(1) + 's');
      star.style.setProperty('--drift', (Math.random() * 60 - 30).toFixed(0) + 'px');
      container.appendChild(star);
    }
  });

  document.querySelectorAll('.sticky-cta').forEach(bar => {
    const key = 'sticky-cta-dismissed-' + (bar.dataset.id || 'default');
    if (sessionStorage.getItem(key)) return;
    const anchor = document.querySelector(bar.dataset.watch || '.hero');
    const footer = document.querySelector('.site-footer');
    const closeBtn = bar.querySelector('.sticky-cta-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        bar.classList.remove('is-visible');
        sessionStorage.setItem(key, '1');
      });
    }
    if (!anchor) { bar.classList.add('is-visible'); return; }

    let pastAnchor = false;
    let footerVisible = false;
    const update = () => bar.classList.toggle('is-visible', pastAnchor && !footerVisible);

    const anchorObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        pastAnchor = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      });
    }, { threshold: 0 });
    anchorObserver.observe(anchor);

    if (footer) {
      const footerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          footerVisible = entry.isIntersecting;
          update();
        });
      }, { threshold: 0 });
      footerObserver.observe(footer);
    }
  });
});
