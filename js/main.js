/**
 * Chanthani N R - Portfolio Interactive Logic
 * Modern Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectFiltering();
  initProjectModals();
  initResumeModal();
  initContactForm();
  initClipboardCopy();
  initBackToTop();
  initRotatingSubtitles();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('chanthani_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('chanthani_portfolio_theme', newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });
}

/* ==========================================================================
   2. Navigation & Smooth Scrolling
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll Header Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Close when clicking any nav link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (mobileToggle) mobileToggle.innerHTML = '&#9776;';
      });
    });
  }
}

/* ==========================================================================
   3. Rotating Subtitles in Hero
   ========================================================================== */
function initRotatingSubtitles() {
  const rotatorElem = document.getElementById('hero-rotating-text');
  if (!rotatorElem) return;

  const titles = [
    'AI-Native Software Builder',
    'Cursor & Antigravity Powered',
    'Full-Stack & Systems Architect',
    'Big Data Analytics Specialist'
  ];

  let currentIndex = 0;
  setInterval(() => {
    rotatorElem.style.opacity = '0';
    rotatorElem.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % titles.length;
      rotatorElem.textContent = titles[currentIndex];
      rotatorElem.style.opacity = '1';
      rotatorElem.style.transform = 'translateY(0)';
    }, 300);
  }, 3200);
}

/* ==========================================================================
   4. Project Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Project Architecture Detail Modals
   ========================================================================== */
const projectDetails = {
  'sports-science-website': {
    title: 'Centre for Sports Science Website & Portal',
    image: 'assets/images/sports_science_portal.jpg',
    category: 'Full-Stack Web & Healthcare',
    stack: ['React', 'Vite', 'PHP', 'MySQL', 'PDO', 'Cursor IDE', 'AI-Assisted Triage'],
    overview: 'Developed a high-performance multi-page responsive web portal for the Centre for Sports Science featuring modular components for Home, Clinical Services, Pricing, About, and Contact inquiries.',
    architecture: 'Built on a decoupled modern architecture combining a React SPA frontend bundled with Vite for near-instant rendering and a dedicated PHP API backend with MySQL relational store. Data integrity is enforced via strict PDO prepared statements, mitigating injection risks and supporting concurrent patient inquiries.',
    incidentSolved: 'AI-Assisted Incident Diagnosis: When a critical production database-connectivity incident occurred, used systematic root-cause analysis in Cursor to rapidly diagnose and rectify 5 interdependent failure points: environment config mismatch, database host resolution, API routing path discrepancies, MySQL user permission grants, and SPA client-side rewrite fallback rules.',
    impact: 'Streamlined patient engagement and athlete program bookings while ensuring zero downtime across subsequent production deploys.'
  },
  'sports-science-engine': {
    title: 'Sports Science Engine & Clinical Scheduler',
    image: 'assets/images/sports_science_dashboard.jpg',
    category: 'Full-Stack Enterprise & Healthcare',
    stack: ['Next.js', 'JavaScript', 'MySQL', 'Relational Schemas', 'AI Code Synthesis', 'Invoicing'],
    overview: 'Architected the administrative cockpit, inventory management engine, and intelligent patient scheduling system backed by a normalized MySQL relational schema.',
    architecture: 'Built using Next.js and JavaScript utilizing server components and REST API routes. Engineered an automated scheduling algorithm to pair patients and athletes with specialists based on real-time availability, treatment plans, and facility rooms.',
    incidentSolved: 'AI-Augmented Implementation: Formulated architectural specifications to synthesize robust billing modules that compute session rates, track payment statuses, generate invoices, and automate revenue reporting in a fraction of typical development time.',
    impact: 'Automated clinic operations for physiotherapists, doctors, and sports science specialists, reducing manual scheduling overhead by over 70%.'
  },
  'hostel-management-system': {
    title: 'Enterprise Hostel Management System (6-Role RBAC)',
    image: 'assets/images/hostel_rbac_platform.jpg',
    category: 'Systems, Security & Database Architecture',
    stack: ['Next.js', 'JavaScript', 'Supabase', 'PostgreSQL', '6-Role RBAC', 'Agentic Audit'],
    overview: 'Engineered an end-to-end multi-tenant hostel administration platform with granular role-based access control (RBAC) across six distinct user tiers.',
    architecture: 'Designed PostgreSQL migrations with strict foreign key constraints, composite indexes for rapid tenant lookups, timestamp audit triggers, and automatic user-row creation upon authentication. Implemented metadata-driven redirection with protected server-side routes and secure session validation checks.',
    incidentSolved: 'Security & Access Control Verification: Prevented privilege escalation and unauthorized data access by establishing multi-layered security: row-level security (RLS) policies, email/password validation schemas, and server-side authentication tokens audited with AI logic analyzers.',
    impact: 'Enabled multi-role staff (Super Admins, Wardens, Accountants, Maintenance, Students) to operate seamlessly inside bespoke dashboards with zero cross-role data leaks.'
  },
  'molecular-drug-discovery': {
    title: 'Molecular Structure Analysis & Drug Discovery Pipeline',
    image: 'assets/images/molecular_drug_discovery.jpg',
    category: 'Data Science, Bioinformatics & Machine Learning',
    stack: ['Python', 'RDKit', 'DGL-LifeSci', 'PubChem', 'ChEMBL', 'GDSC2', 'GNN', 'Pandas'],
    overview: 'Engineered an automated bioinformatics processing pipeline integrating large-scale pharmacogenomic and chemical compound datasets to predict drug sensitivity.',
    architecture: 'Merged multi-source repositories (PubChem, ChEMBL, GDSC2) into a unified preprocessing ETL pipeline. Handled missing values, normalized chemical SMILES strings, extracted Morgan fingerprints, and generated molecular graph representations using RDKit and Deep Graph Library (DGL-LifeSci).',
    incidentSolved: 'High-Dimensional Feature Engineering: Overcame structural molecular sparsity by formulating graph neural networks (GNNs) and regression workflows calibrated against half-maximal inhibitory concentration (IC50) values.',
    impact: 'Accelerated candidate compound screening and accurately predicted cellular drug sensitivity with high model correlation.'
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('[data-open-modal]');

  if (!modalBackdrop) return;

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-project-img').src = data.image;
    document.getElementById('modal-project-img').alt = data.title;
    document.getElementById('modal-project-overview').textContent = data.overview;
    document.getElementById('modal-project-arch').textContent = data.architecture;
    document.getElementById('modal-project-incident').textContent = data.incidentSolved;
    document.getElementById('modal-project-impact').textContent = data.impact;

    // Render stack tags
    const stackWrap = document.getElementById('modal-project-stack');
    if (stackWrap) {
      stackWrap.innerHTML = data.stack
        .map(s => `<span class="tech-tag">${s}</span>`)
        .join('');
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-modal');
      openModal(projectId);
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Resume Viewer Modal
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openButtons = document.querySelectorAll('[data-open-resume]');
  const closeBtn = document.getElementById('resume-modal-close');

  if (!resumeModal) return;

  function openResume() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  closeBtn?.addEventListener('click', closeResume);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResume();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeResume();
    }
  });
}

/* ==========================================================================
   7. Copy to Clipboard Utility with Toast
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied: ${textToCopy}`);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--accent-emerald)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Copy failed: ', err);
      });
    });
  });
}

/* ==========================================================================
   8. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const origHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! ✓';
        submitBtn.style.background = 'var(--accent-emerald)';

        showToast(`Thank you, ${name}! Your message has been prepared.`);

        // Launch prefilled mailto as backup
        const mailtoLink = `mailto:chanthanirajiraj2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        window.location.href = mailtoLink;

        setTimeout(() => {
          form.reset();
          submitBtn.innerHTML = origHtml;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3500);
      }, 700);
    }
  });
}

/* ==========================================================================
   9. Toast Notification System
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg style="width: 18px; height: 18px; stroke: var(--accent-emerald); fill: none; stroke-width: 2;" viewBox="0 0 24 24">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   10. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
