const skills = [
  { name: 'UI / UX Design', level: 'Expert', percent: 90, description: 'Designing user-centered interfaces, prototypes, and experience flows.' },
  { name: 'Responsive Web', level: 'Advanced', percent: 72, description: 'Mobile-first layouts, accessible components, and modern HTML/CSS patterns.' },
  { name: 'JavaScript / TypeScript', level: 'Advanced', percent: 58, description: 'Building interactive logic, animations, and maintainable frontend architecture.' },
  { name: 'React / Vue', level: 'Proficient', percent: 44, description: 'Component-driven applications with polished state handling and reusable design systems.' },
];

const certificates = [
  {
    title: 'Front-End Web Developer',
    issuer: 'Coursera',
    date: '2025',
    description: 'Verified certificate for completing a full modern front-end development program.',
    proofImage:
      'https://via.placeholder.com/960x640.png?text=Front-End+Web+Developer+Certificate',
  },
  {
    title: 'UI / UX Design Essentials',
    issuer: 'Google',
    date: '2024',
    description: 'Practical design workflows, accessibility best practices, and product thinking.',
    proofImage:
      'https://via.placeholder.com/960x640.png?text=UI+%2F+UX+Design+Essentials',
  },
  {
    title: 'JavaScript Algorithms',
    issuer: 'freeCodeCamp',
    date: '2024',
    description: 'Completed advanced JavaScript exercises and algorithmic problem solving.',
    proofImage:
      'https://via.placeholder.com/960x640.png?text=JavaScript+Algorithms+Certificate',
  },
];

const projects = [
  {
    title: 'Launchpad Dashboard',
    category: 'Web App',
    summary: 'A dashboard interface for tracking product launches, metrics, and team tasks.',
    details:
      'Built using a modern front-end stack with responsive components, custom data visualizations, and a polished workflow for collaborating across teams.',
    tags: ['Design System', 'Responsive', 'Data Driven'],
  },
  {
    title: 'Brand Identity Website',
    category: 'Brand',
    summary: 'A premium landing page to showcase brand positioning, storytelling, and service offerings.',
    details:
      'Designed and developed a fast-loading, animated brand experience with visual hierarchy, motion, and curated UX for conversion.',
    tags: ['Interaction', 'Animation', 'Marketing'],
  },
  {
    title: 'Certification Portal',
    category: 'Dashboard',
    summary: 'A streamlined portal for managing certificates, course progress, and achievement milestones.',
    details:
      'Implemented searchable certification cards, progress tracking, and a responsive dashboard tailored for professional development.',
    tags: ['UX Research', 'Front-End', 'Accessibility'],
  },
  {
    title: 'Portfolio Showcase',
    category: 'Web App',
    summary: 'A dynamic portfolio site highlighting featured work, skills, and contact details.',
    details:
      'Created a modular portfolio platform with project filters, interactive cards, and a strong brand identity.',
    tags: ['Personal', 'UI Design', 'Performance'],
  },
];

const categories = ['All', ...new Set(projects.map((project) => project.category))];

const skillsGrid = document.getElementById('skillsGrid');
const certificatesGrid = document.getElementById('certificatesGrid');
const projectFilters = document.getElementById('projectFilters');
const projectsGrid = document.getElementById('projectsGrid');
const projectModal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const certificateGameBtn = document.getElementById('certificateGameBtn');
const certificateGameProgress = document.getElementById('certificateGameProgress');
const certificateContent = document.getElementById('certificateContent');
const certificateSection = document.getElementById('certificates');
const projectGameStatus = document.getElementById('projectGameStatus');
const projectContent = document.getElementById('projectContent');
const projectSection = document.getElementById('projects');
const puzzleButtons = document.querySelectorAll('.puzzle-btn');
const certificateCodeInput = document.getElementById('certificateCodeInput');
const certificateCodeBtn = document.getElementById('certificateCodeBtn');
const customCursor = document.getElementById('customCursor');
const socialDoors = document.querySelectorAll('.social-door');
const contactRevealBtn = document.getElementById('contactRevealBtn');
const contactSecretText = document.getElementById('contactSecretText');
const certificateModalOverlay = document.getElementById('certificateModalOverlay');
const certificateModalImage = document.getElementById('certificateModalImage');
const certificateModalTitle = document.getElementById('certificateModalTitle');
const certificateModalClose = document.getElementById('certificateModalClose');

function buildSkills() {
  skillsGrid.innerHTML = skills
    .map(
      (skill) => `
      <article class="skill-card" tabindex="0">
        <div>
          <h3>${skill.name}</h3>
          <p class="skill-teaser">${skill.level} expertise · ${skill.percent}% mastery</p>
          <p class="skill-detail">${skill.description}</p>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" data-percent="${skill.percent}"></div>
        </div>
      </article>
    `
    )
    .join('');
}

function buildCertificates() {
  certificatesGrid.innerHTML = certificates
    .map(
      (certificate) => `
      <article class="certificate-card">
        <span>Certificate</span>
        <h3>${certificate.title}</h3>
        <p>${certificate.description}</p>
        <div class="skill-meta">
          <span>${certificate.issuer}</span>
          <span>${certificate.date}</span>
        </div>
        ${certificate.proofImage ? `<button class="button button-secondary certificate-proof" type="button" data-proof-image="${certificate.proofImage}" data-title="${certificate.title}">View proof</button>` : ''}
      </article>
    `
    )
    .join('');
}

function buildFilters() {
  projectFilters.innerHTML = categories
    .map(
      (category, index) => `
      <button type="button" class="filter-button${index === 0 ? ' active' : ''}" data-category="${category}">
        ${category}
      </button>
    `
    )
    .join('');

  projectFilters.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-button');
    if (!button) return;
    const category = button.dataset.category;
    setActiveFilter(button);
    renderProjects(category);
  });
}

function setActiveFilter(button) {
  const buttons = projectFilters.querySelectorAll('.filter-button');
  buttons.forEach((btn) => btn.classList.remove('active'));
  button.classList.add('active');
}

function renderProjects(category = 'All') {
  const filtered = category === 'All' ? projects : projects.filter((project) => project.category === category);
  projectsGrid.innerHTML = filtered
    .map(
      (project, index) => `
      <article class="project-card">
        <div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="project-meta">
            <span class="project-chip">${project.category}</span>
            ${project.tags.slice(0, 2).map((tag) => `<span class="project-chip">${tag}</span>`).join('')}
          </div>
        </div>
        <button class="button button-secondary" type="button" data-index="${index}">View details</button>
      </article>
    `
    )
    .join('');

  projectsGrid.querySelectorAll('button[data-index]').forEach((button) => {
    button.addEventListener('click', () => {
      openProjectModal(filtered[button.dataset.index]);
    });
  });
}

function openProjectModal(project) {
  modalContent.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.details}</p>
    <div class="modal-details">
      <div>
        <strong>Category</strong>
        <p>${project.category}</p>
      </div>
      <div>
        <strong>Highlights</strong>
        <p>${project.tags.join(', ')}</p>
      </div>
    </div>
    <div class="modal-tags">
      ${project.tags.map((tag) => `<span class="modal-tag">${tag}</span>`).join('')}
    </div>
  `;
  projectModal.classList.add('active');
  projectModal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  projectModal.classList.remove('active');
  projectModal.setAttribute('aria-hidden', 'true');
}

function setupModalEvents() {
  closeModal.addEventListener('click', closeProjectModal);
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

function setupNavigationToggle() {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen.toString());
  });
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupCustomCursor() {
  if (!customCursor) return;

  document.addEventListener('mousemove', (event) => {
    customCursor.style.left = `${event.clientX}px`;
    customCursor.style.top = `${event.clientY}px`;
  });

  document.addEventListener('mouseover', (event) => {
    const target = event.target.closest('button, a, .social-door, .filter-button, .project-card button');
    if (target) {
      customCursor.classList.add('cursor-active');
    }
  });

  document.addEventListener('mouseout', (event) => {
    const target = event.target.closest('button, a, .social-door, .filter-button, .project-card button');
    if (target) {
      customCursor.classList.remove('cursor-active');
    }
  });
}

function setupSocialDoors() {
  socialDoors.forEach((door) => {
    door.addEventListener('click', () => {
      const link = door.dataset.link;
      door.classList.add('active');
      door.setAttribute('aria-pressed', 'true');
      setTimeout(() => {
        window.open(link, '_blank', 'noopener');
      }, 280);
    });

    door.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        door.click();
      }
    });
  });
}

function setupCertificateCarousel() {
  const carousel = document.querySelector('.certificate-carousel');
  const grid = document.querySelector('.certificates-grid');
  if (!carousel || !grid) return;

  const updateRotation = () => {
    const rect = carousel.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const distance = window.innerHeight / 2 - center;
    const rotation = Math.max(Math.min(distance / 18, 28), -28);
    grid.style.transform = `rotateY(${rotation}deg)`;
  };

  window.addEventListener('scroll', updateRotation);
  carousel.addEventListener('mousemove', (event) => {
    const rect = carousel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const xDeg = (x - 0.5) * 18;
    const yDeg = (y - 0.5) * -14;
    grid.style.transform = `rotateX(${yDeg}deg) rotateY(${xDeg}deg)`;
  });

  carousel.addEventListener('mouseleave', () => {
    grid.style.transform = 'rotateY(0deg)';
  });
}

function setupCertificateProofPopups() {
  if (!certificateModalOverlay || !certificateModalImage || !certificateModalTitle || !certificateModalClose) return;

  const openCertificatePopup = (title, imageUrl) => {
    certificateModalTitle.textContent = title || 'Certificate preview';
    certificateModalImage.src = imageUrl;
    certificateModalImage.alt = `${title} proof`;
    certificateModalOverlay.classList.add('active');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  };

  const closeCertificatePopup = () => {
    certificateModalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    certificateModalImage.src = '';
  };

  certificatesGrid.addEventListener('click', (event) => {
    const button = event.target.closest('.certificate-proof');
    if (!button) return;
    const imageUrl = button.dataset.proofImage;
    const title = button.dataset.title;
    if (!imageUrl) return;
    openCertificatePopup(title, imageUrl);
  });

  certificateModalOverlay.addEventListener('click', (event) => {
    if (event.target === certificateModalOverlay) {
      closeCertificatePopup();
    }
  });

  certificateModalClose.addEventListener('click', closeCertificatePopup);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && certificateModalOverlay.classList.contains('active')) {
      closeCertificatePopup();
    }
  });
}

function setupContactUnlock() {
  if (!contactRevealBtn || !contactSecretText) return;
  contactRevealBtn.addEventListener('click', () => {
    contactSecretText.textContent = 'Email unlocked: soumyajit@example.com';
    contactRevealBtn.textContent = 'Contact revealed';
    contactRevealBtn.disabled = true;
  });
}

function animateSectionReveal(element) {
  element.classList.add('visible');
}

function setupSectionGames() {
  let certificateHits = 0;
  const certificateGoal = 2;

  const unlockCertificateSection = () => {
    certificateSection.classList.add('unlocked');
    certificateContent.classList.remove('locked');
    certificateCodeInput.disabled = true;
    certificateCodeBtn.disabled = true;
    certificateCodeInput.classList.add('is-success');
    certificateGameProgress.textContent = 'Unlocked! Certificates are ready.';
    animateSectionReveal(certificateContent);
    certificateGameBtn?.closest('.section-unlock-overlay')?.classList.add('fade-out');
  };

  const validateCertificateCode = () => {
    if (!certificateCodeInput) return;
    const inputValue = certificateCodeInput.value.trim().replace(/\s+/g, '').toLowerCase();
    const accepted = [
      'console.log(\'cert\')',
      'console.log("cert")',
      'console.log(cert)',
      'console.logcert',
      'cert',
    ].map((value) => value.replace(/\s+/g, '').toLowerCase());

    if (accepted.includes(inputValue)) {
      unlockCertificateSection();
    } else {
      certificateGameProgress.textContent = 'Try again — use console.log and the word cert.';
      certificateCodeInput.classList.add('is-error');
    }
  };

  if (certificateCodeBtn) {
    certificateCodeBtn.addEventListener('click', validateCertificateCode);
  }

  if (certificateCodeInput) {
    certificateCodeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        validateCertificateCode();
      }
    });
  }

  puzzleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isCorrect = button.dataset.answer === 'launch';
      if (isCorrect) {
        button.classList.add('is-correct');
        projectGameStatus.textContent = 'Correct! Projects are unlocked.';
        projectSection.classList.add('unlocked');
        projectContent.classList.remove('locked');
        animateSectionReveal(projectContent);
        button.closest('.section-unlock-overlay')?.classList.add('fade-out');
      } else {
        projectGameStatus.textContent = 'Try again — think of a word that means “to begin.”';
      }
    });
  });
}

function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const percent = element.dataset.percent || '0';
          element.style.width = `${percent}%`;
          observerInstance.unobserve(element);
        }
      });
    },
    { threshold: 0.2 }
  );
  progressBars.forEach((bar) => observer.observe(bar));
}

function init() {
  buildSkills();
  buildCertificates();
  buildFilters();
  renderProjects();
  setupModalEvents();
  setupNavigationToggle();
  setupSectionGames();
  setupCertificateProofPopups();
  setupCustomCursor();
  setupSocialDoors();
  setupCertificateCarousel();
  setupContactUnlock();
  animateProgressBars();
}

init();
