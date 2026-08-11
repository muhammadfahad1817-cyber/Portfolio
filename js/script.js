document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  const backTop = document.querySelector('.back-top');

  // Navbar scroll
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    if (window.scrollY > 500) backTop.classList.add('visible');
    else backTop.classList.remove('visible');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const closeMenu = () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };
  toggle.addEventListener('click', () => {
    const open = menu.classList.contains('open');
    if (open) closeMenu();
    else {
      toggle.classList.add('open');
      menu.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
  overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Back to top
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Reveal
  const reveals = document.querySelectorAll('.reveal');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  reveals.forEach(el => revObs.observe(el));

  // Skill bars
  const fills = document.querySelectorAll('.bar__fill');
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  fills.forEach(f => barObs.observe(f));

  // Rotating role titles (typewriter)
  const roles = [
    'UI/UX Craftsman',
    'Interface Architect',
    'React Developer',
    'Creative Coder',
    'Web Artisan'
  ];
  const typedEl = document.getElementById('typed-role');
  if (typedEl) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;
    let pause = 0;

    // initial content
    typedEl.innerHTML = '<strong>' + roles[0] + '</strong><span class="cursor"></span>';

    const tick = () => {
      const current = roles[roleIndex];

      if (pause > 0) {
        pause--;
        setTimeout(tick, 40);
        return;
      }

      if (!deleting) {
        // typing
        charIndex++;
        typedEl.innerHTML = '<strong>' + current.slice(0, charIndex) + '</strong><span class="cursor"></span>';
        if (charIndex >= current.length) {
          deleting = true;
          pause = 28; // hold before delete (~1.1s)
          setTimeout(tick, 40);
          return;
        }
        setTimeout(tick, 70 + Math.random() * 40);
      } else {
        // deleting
        charIndex--;
        typedEl.innerHTML = '<strong>' + current.slice(0, charIndex) + '</strong><span class="cursor"></span>';
        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          pause = 6;
          setTimeout(tick, 40);
          return;
        }
        setTimeout(tick, 35);
      }
    };

    setTimeout(tick, 1800);
  }

});
