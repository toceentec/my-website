// ================================
// Modal Logic (Consultation Form)
// ================================
(function () {
  const openBtn = document.getElementById('open-consult');
  const navContactBtn = document.getElementById('nav-contact');
  const modal = document.getElementById('consult-modal');
  const closeBtn = document.getElementById('close-modal');
  const cancelBtn = document.getElementById('cancel-modal');
  const form = document.getElementById('consult-form');

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    // focus name field
    setTimeout(() => {
      const nameInput = document.getElementById('client-name');
      if (nameInput) nameInput.focus();
    }, 40);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (navContactBtn) navContactBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  form?.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameRaw = document.getElementById('client-name')?.value.trim() || '';
    const emailRaw = document.getElementById('client-email')?.value.trim() || '';
    const messageRaw = document.getElementById('client-message')?.value.trim() || '';

    const name = encodeURIComponent(nameRaw);
    const email = encodeURIComponent(emailRaw);
    const message = encodeURIComponent(messageRaw);

    const recipient = 'example@gmail.com';
    const subject = encodeURIComponent('Consult Request — ' + (nameRaw || 'No name'));

    let body = `Name: ${name || ''}%0D%0A`;
    body += `Email: ${email || ''}%0D%0A%0D%0A`;
    body += `Message:%0D%0A${message || ''}%0D%0A%0D%0A`;
    body += 'Source: Website consultation form';

    // Fallback: open mailto
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal();
  });
})();

// ================================
// Menu Toggle Logic
// ================================
(function () {
  const menuBar = document.querySelector('.menu-bar');
  const navigation = document.querySelector('.navbar ul');
  const navLinks = document.querySelectorAll('.navbar ul a');

  menuBar?.addEventListener('click', () => {
    const isOpened = menuBar.getAttribute('aria-expanded') === 'true';
    menuBar.setAttribute('aria-expanded', String(!isOpened));
    navigation.classList.toggle('opened', !isOpened);
  });

  // close mobile menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navigation.classList.contains('opened')) {
        navigation.classList.remove('opened');
        menuBar?.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

// ================================
// Theme Toggle Logic
// ================================
(function () {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
    } else {
      root.removeAttribute('data-theme');
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
    }
  } catch (err) {
    // localStorage might be unavailable in some browsers — fail silently
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
      try { localStorage.setItem('theme', 'light'); } catch (e) {}
    } else {
      root.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    }
  });
})();

// ================================
// Typing / Deleting Animation on Scroll
// ================================
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const subtitleSpan = document.querySelector(".subtitle span");
    if (!subtitleSpan) return;

    let lastScrollTop = window.scrollY;
    subtitleSpan.classList.add("typing");

    window.addEventListener("scroll", () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        subtitleSpan.classList.replace("typing", "deleting");
      } else {
        subtitleSpan.classList.replace("deleting", "typing");
      }
      lastScrollTop = Math.max(0, currentScrollTop);
    });
  });
})();

// ================================
// Scroll-Reveal Animations
// ================================
(function () {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => observer.observe(el));
})();

// ================================
// Project modal (open card to view details)
// ================================
(function () {
  const cards = document.querySelectorAll('.portfolio-card');
  const projectModal = document.getElementById('project-modal');
  const closeProjectBtn = document.getElementById('close-project-modal');
  const projectTitle = document.getElementById('project-modal-title');
  const projectDesc = document.getElementById('project-modal-desc');

  function openProject(title, desc) {
    if (!projectModal) return;
    projectModal.style.display = 'flex';
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    if (projectTitle) projectTitle.textContent = title || 'Project';
    if (projectDesc) projectDesc.textContent = desc || '';
    // focus close button
    setTimeout(() => {
      if (closeProjectBtn) closeProjectBtn.focus();
    }, 40);
  }

  function closeProject() {
    if (!projectModal) return;
    projectModal.style.display = 'none';
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title || card.querySelector('.meta-title')?.textContent;
      const desc = card.dataset.desc || '';
      openProject(title, desc);
    });

    // keyboard access
    card.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const title = card.dataset.title || card.querySelector('.meta-title')?.textContent;
        const desc = card.dataset.desc || '';
        openProject(title, desc);
      }
    });
  });

  if (closeProjectBtn) closeProjectBtn.addEventListener('click', closeProject);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProject();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('open')) closeProject();
  });
})();

// ================================
// Robust "Show more" toggle for portfolio
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-projects');
  const moreGrid = document.getElementById('portfolio-more') || document.querySelector('.more-grid');

  if (!toggleBtn) {
    console.warn('Portfolio toggle button (#toggle-projects) not found.');
    return;
  }
  if (!moreGrid) {
    console.warn('Hidden projects grid (id="portfolio-more" or class="more-grid") not found.');
    return;
  }

  // Ensure initial hidden state
  moreGrid.style.display = 'none';
  moreGrid.setAttribute('aria-hidden', 'true');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.textContent = 'Show more';

  function toggleMore() {
    const currentlyHidden = window.getComputedStyle(moreGrid).display === 'none';
    if (currentlyHidden) {
      moreGrid.style.display = 'grid';
      moreGrid.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.textContent = 'Show less';
      const first = moreGrid.querySelector('.portfolio-card');
      if (first) first.focus();
    } else {
      moreGrid.style.display = 'none';
      moreGrid.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.textContent = 'Show more';
      toggleBtn.focus();
    }
  }

  toggleBtn.addEventListener('click', toggleMore);
  toggleBtn.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.key === ' ') toggleMore();
  });
});
