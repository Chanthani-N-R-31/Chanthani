/**
 * Chanthani N R - Portfolio Interactive Logic
 * Modern Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectFiltering();
  initProjectModals();
  initDemoModal();
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

  // Clear legacy dark cache key and default strictly to crisp professional light mode
  localStorage.removeItem('chanthani_portfolio_theme');
  let savedTheme = localStorage.getItem('chanthani_recruiter_theme');
  if (!savedTheme) {
    savedTheme = 'light';
    localStorage.setItem('chanthani_recruiter_theme', 'light');
  }
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('chanthani_recruiter_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* ==========================================================================
   2. Navigation & Smooth Scrolling (Recruiter Section Spy)
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveSection() {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    // Check if scrolled near bottom of page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 80) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) currentId = lastSection.getAttribute('id');
    }

    links.forEach(link => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection(); // Run immediately on load

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
  'clinical-rbac-platform': {
    title: 'Sports Science & Clinical Operations Platform (6 User Roles)',
    image: 'assets/images/sports_science_dashboard.jpg',
    category: 'Healthcare & Sports Analytics Platform',
    stack: ['Next.js 14', 'PostgreSQL', 'Node.js', 'Python Analytics', 'Prisma ORM', '6-Role Access', 'Tailwind CSS'],
    frontend: 'Next.js 14, React & Tailwind CSS (6-Role Portals)',
    backend: 'Node.js, Python Analytics (Derivatives & 3-Tier Classification)',
    database: 'PostgreSQL with 6-Role Access (Private Medical Records)',
    overview: 'Built a multi-role clinic management platform at Sixs Sports Business with 6 login roles (Doctors, Physios, Admins, Receptionists, and Athletes) to manage visits and private records. In our sports analytics workflows, we used our Athlete Management System (AMS) to evaluate over 700 student athletes and generate automated 3-tier benchmark reports to assist the Government of Karnataka (DYES) talent selection trials.',
    architecture: 'Built with Next.js 14, Node.js, and PostgreSQL. Frontend offers clean, role-tailored dashboards for doctors and staff. Backend manages appointment scheduling and runs analytics scripts for athletic derivatives (sprint speed, vertical jump power, endurance). PostgreSQL keeps patient records strictly private per role.',
    incidentSolved: 'Hardest Bug Solved (Automating 3-Tier Cohort Benchmarking): Raw test scores across different age brackets skewed ranking percentiles. Solved by writing a normalization formula that benchmarks raw scores against sport-specific state standards.',
    impact: 'Streamlined clinic appointments and successfully processed 700+ student athletes, generating official 3-tier reports that assisted Government DYES in identifying top athletic talent.',
    blueprint: '<div class="blueprint-flow"><div class="blueprint-step"><span class="blueprint-step-num mono">01</span><div class="blueprint-step-desc"><strong>Data Intake:</strong> Test scores (sprint, jump, stamina) recorded via responsive Next.js forms.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">02</span><div class="blueprint-step-desc"><strong>Analytics Calculation:</strong> Backend calculates physical derivatives (power, acceleration, stamina).</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">03</span><div class="blueprint-step-desc"><strong>3-Tier DYES Report:</strong> Generates certified ranking reports (Tier 1 Elite, Tier 2 Development, Tier 3 Foundation) to assist selection trials.</div></div></div>'
  },
  'sports-science-website': {
    title: 'Centre for Sports Science Web Portal',
    image: 'assets/images/sports_science_portal.jpg',
    category: 'Full-Stack Web Portal',
    stack: ['React', 'Vite', 'PHP', 'MySQL', 'Responsive UI'],
    frontend: 'React 18 & Vite (Fast Multi-Page Interface)',
    backend: 'PHP REST API (Validated Inquiries & Sanitized Inputs)',
    database: 'MySQL (Consultation Bookings & Inquiry Records)',
    overview: 'Built a modern, mobile-friendly website for the Centre for Sports Science with clinic service pages, treatment pricing, and an online inquiry booking form.',
    architecture: 'Combined a fast React frontend bundled with Vite for near-instant page loads and a PHP backend connected to MySQL. Form submissions are safely checked on the server to block spam and malicious code.',
    incidentSolved: 'Hardest Bug Solved (Server Connectivity Fix): Diagnosed and fixed a live production bug where contact forms failed to save due to mismatched database credentials and server routing settings.',
    impact: 'Allowed hundreds of athletes and patients to easily find treatment information and book appointments online with 100% website uptime.',
    blueprint: '<div class="blueprint-flow"><div class="blueprint-step"><span class="blueprint-step-num mono">01</span><div class="blueprint-step-desc"><strong>React Web Pages:</strong> Clean, responsive user interface with live form checks.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">02</span><div class="blueprint-step-desc"><strong>PHP Backend API:</strong> Checks and sanitizes form inputs before sending to database.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">03</span><div class="blueprint-step-desc"><strong>MySQL Database:</strong> Safely stores inquiries and booking records.</div></div></div>'
  },
  'sports-science-engine': {
    title: 'Clinic Operations & Doctor Scheduler',
    image: 'assets/images/sports_science_dashboard.jpg',
    category: 'Clinic Management & Operations',
    stack: ['Next.js', 'JavaScript', 'MySQL', 'Automated Billing', 'Calendar Engine'],
    frontend: 'Next.js 14 & React (Admin Calendar Dashboard)',
    backend: 'Node.js (Doctor Availability Scheduler & Invoices)',
    database: 'MySQL (Doctor Shifts, Bookings & Billing)',
    overview: 'Developed an administrative dashboard to manage doctor appointment calendars, medical equipment inventory, and patient billing in one place.',
    architecture: 'Built with Next.js and MySQL. Features a smart calendar algorithm that checks real-time doctor availability to prevent appointment clashes, and automatically calculates billing invoices.',
    incidentSolved: 'Hardest Bug Solved (Preventing Double-Bookings): Fixed a race condition where two receptionists could accidentally book the same doctor at the exact same minute by adding database reservation locks.',
    impact: 'Reduced manual appointment scheduling time by 70% and eliminated duplicate booking errors across the clinic.',
    blueprint: '<div class="blueprint-flow"><div class="blueprint-step"><span class="blueprint-step-num mono">01</span><div class="blueprint-step-desc"><strong>Clinic Admin Dashboard:</strong> Central view for staff to see calendars and rooms.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">02</span><div class="blueprint-step-desc"><strong>Smart Scheduler:</strong> Checks open doctor slots and prevents conflicting bookings.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">03</span><div class="blueprint-step-desc"><strong>Billing System:</strong> Automatically creates and reconciles invoices.</div></div></div>'
  },
  'hostel-management-system': {
    title: 'Hostel Room Booking & Gate Pass System',
    image: 'assets/images/hostel_rbac_platform.jpg',
    category: 'Student Housing & Facilities',
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Database Rules', 'QR Passes'],
    frontend: 'Next.js App Router, Tailwind CSS (Checkout & Passes)',
    backend: 'Node.js & Database Triggers (Room Capacity Rules)',
    database: 'PostgreSQL on Supabase (Beds, Allocations & QR Passes)',
    overview: 'Built an automated online portal to manage student hostel admissions, allocate available beds, and issue digital gate passes for student athletes.',
    architecture: 'Uses PostgreSQL database rules that automatically check room vacancy before confirming a check-in. Once a bed is booked, the system automatically creates a digital entry pass with a QR code.',
    incidentSolved: 'Hardest Bug Solved (Stopping Overbooked Rooms): When multiple students tried picking the same room simultaneously, rooms became overcrowded. Solved by having the database verify available beds atomically before saving the booking.',
    impact: 'Turned a slow, paper-based room assignment process into an instant digital checkout with zero overbooked rooms.',
    blueprint: '<div class="blueprint-flow"><div class="blueprint-step"><span class="blueprint-step-num mono">01</span><div class="blueprint-step-desc"><strong>Student Check-in:</strong> Athlete selects their sport category and room preference.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">02</span><div class="blueprint-step-desc"><strong>Database Capacity Check:</strong> Automatically confirms an empty bed exists.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">03</span><div class="blueprint-step-desc"><strong>Gate Pass Issuance:</strong> Generates a verified digital entry pass with QR code.</div></div></div>'
  },
  'molecular-drug-discovery': {
    title: 'Medicine Discovery & Data Analysis Pipeline',
    image: 'assets/images/molecular_drug_discovery.jpg',
    category: 'Data Science & Machine Learning',
    stack: ['Python', 'Pandas', 'RDKit', 'Machine Learning', 'Data Cleaning'],
    github: 'https://github.com/Chanthani-N-R-31',
    frontend: 'Streamlit / Python Interactive Web Dashboard',
    backend: 'Python (RDKit, Scikit-learn, PyTorch ML)',
    database: 'PubChem & ChEMBL Datasets (Molecular SMILES & Assays)',
    overview: 'Built a Python data science workflow that analyzes the chemical structures of medicines and predicts how effectively they treat disease cells.',
    architecture: 'Combined large datasets from scientific repositories (PubChem and ChEMBL). Cleaned chemical formulas, extracted key molecular features, and trained predictive machine learning models in Python.',
    incidentSolved: 'Hardest Bug Solved (Handling Incomplete Chemical Records): Fixed issues with missing chemical values and irregular formulas by writing custom cleaning functions to keep the prediction model accurate.',
    impact: 'Helped researchers screen candidate medicine compounds faster and predict treatment sensitivity with high accuracy.',
    blueprint: '<div class="blueprint-flow"><div class="blueprint-step"><span class="blueprint-step-num mono">01</span><div class="blueprint-step-desc"><strong>Data Ingestion:</strong> Downloads and standardizes chemical data from scientific libraries.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">02</span><div class="blueprint-step-desc"><strong>Feature Extraction:</strong> Turns chemical formulas into numerical patterns for machine learning.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">03</span><div class="blueprint-step-desc"><strong>Prediction Model:</strong> Calculates expected drug response scores.</div></div></div>'
  },
  'cnn-attendance-scanner': {
    title: 'Face Recognition Attendance Scanner',
    image: 'assets/images/sports_science_portal.jpg',
    category: 'Computer Vision & AI',
    stack: ['Python', 'OpenCV', 'Face Recognition AI', 'Camera Vision', 'SQLite'],
    frontend: 'HTML5 Web Camera & Tailwind CSS',
    backend: 'Python (OpenCV & Deep Learning CNN Face AI)',
    database: 'SQLite / PostgreSQL (Enrolled Student Roster & Timestamps)',
    overview: 'Built a contactless student attendance system using camera vision and Python to recognize faces and record morning attendance in under 3 seconds.',
    architecture: 'Detects student faces through a camera feed, compares facial measurements against stored student photos, and automatically marks them present in the attendance database.',
    incidentSolved: 'Hardest Bug Solved (Dim Hallway Lighting): Fixed false rejections caused by dark or uneven hallway lighting by applying image brightness equalization before scanning faces.',
    impact: 'Saved teachers 15 to 20 minutes of roll-call time each morning and completely stopped students from marking fake attendance for absent friends.',
    blueprint: '<div class="blueprint-flow"><div class="blueprint-step"><span class="blueprint-step-num mono">01</span><div class="blueprint-step-desc"><strong>Camera Feed:</strong> Detects student face in the live video frame.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">02</span><div class="blueprint-step-desc"><strong>Face Matching:</strong> Compares facial features against the student roster.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">03</span><div class="blueprint-step-desc"><strong>Attendance Log:</strong> Automatically records the student as Present with a timestamp.</div></div></div>'
  },
  'python-flowchart-generator': {
    title: 'Python Code-to-Flowchart Generator',
    image: 'assets/images/sports_science_dashboard.jpg',
    category: 'Developer Tooling',
    stack: ['Python', 'Code Parser', 'SVG Visualizer', 'JavaScript', 'Algorithms'],
    frontend: 'Vanilla JavaScript & Scalable Vector Graphics (SVG)',
    backend: 'Python AST Tokenizer & Algorithmic Parser',
    database: 'In-Memory Abstract Syntax Tree (Client-Side)',
    overview: 'Built a developer tool that reads Python source code and automatically turns it into an interactive, step-by-step flowchart diagram.',
    architecture: 'Scans Python code structure (functions, if/else checks, and loops), calculates clean layout positions, and draws scalable vector diagrams with decision boxes and arrows.',
    incidentSolved: 'Hardest Bug Solved (Untangling Overlapping Arrows): Fixed confusing, crossed-over arrows in nested loops by calculating clean detour paths around existing boxes.',
    impact: 'Helped developers and students understand complex algorithms visually, making code reviews and onboarding much faster.',
    blueprint: '<div class="blueprint-flow"><div class="blueprint-step"><span class="blueprint-step-num mono">01</span><div class="blueprint-step-desc"><strong>Code Scanner:</strong> Reads Python code and identifies functions, conditions, and loops.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">02</span><div class="blueprint-step-desc"><strong>Flow Layout:</strong> Maps out boxes and connects True/False branches.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">03</span><div class="blueprint-step-desc"><strong>SVG Drawing:</strong> Renders a clean visual diagram with clear arrows.</div></div></div>'
  },
  'workforce-attendance-engine': {
    title: 'Employee Attendance Portal with GPS Geofencing (Check-In & Check-Out)',
    image: 'assets/images/sports_science_dashboard.jpg',
    category: 'Workforce & Policy Systems',
    stack: ['PHP', 'MySQL', 'GPS Geolocation API', 'Geofencing', 'Employee Login', 'Shift Rules'],
    frontend: 'HTML5 Geolocation API, CSS3 & Self-Service Login UI',
    backend: 'PHP Haversine Distance Engine & Shift Deadline Rules',
    database: 'MySQL Attendance Ledger (Coordinates, Times & Actions)',
    overview: 'Built a self-service employee portal where staff log in with their own credentials to record daily check-in and check-out punches. The application reads device GPS coordinates (latitude and longitude) to verify whether the employee is physically located inside the office geofence perimeter before confirming an in-office attendance record.',
    architecture: 'Built with a responsive web interface that authenticates employee logins and requests device GPS coordinates via the HTML5 Geolocation API. A PHP backend validates latitude/longitude distance against authorized office coordinates (within a 100-meter geofence radius) and checks punch timestamps against morning (9:30 AM) and afternoon (2:00 PM) deadlines. Commits verified check-in and check-out events to a MySQL audit ledger.',
    incidentSolved: 'Hardest Bug Solved (Handling GPS Drift & Inaccurate Device Coordinates): Indoor mobile browsers sometimes reported erratic GPS coordinates with large accuracy errors. Solved by implementing a device accuracy radius check and a 100-meter perimeter buffer to prevent false out-of-office rejections for legitimate staff.',
    impact: 'Eliminated proxy attendance and buddy punching, provided automated check-in and check-out verification, and cut monthly HR payroll reconciliation from days to minutes.',
    blueprint: '<div class="blueprint-flow"><div class="blueprint-step"><span class="blueprint-step-num mono">01</span><div class="blueprint-step-desc"><strong>Employee Login:</strong> Staff logs into their own dashboard to request Check-In or Check-Out.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">02</span><div class="blueprint-step-desc"><strong>GPS Geofencing:</strong> Reads latitude & longitude to verify employee is within 100m of office HQ.</div></div><div class="blueprint-step"><span class="blueprint-step-num mono">03</span><div class="blueprint-step-desc"><strong>MySQL Ledger:</strong> Checks shift cutoff rules (or On-Duty permit) and commits verified attendance.</div></div></div>'
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

    // Frontend, Backend & Database Architecture Stack Badges
    const frontEl = document.getElementById('modal-arch-frontend');
    const backEl = document.getElementById('modal-arch-backend');
    const dbEl = document.getElementById('modal-arch-database');
    if (frontEl) frontEl.textContent = data.frontend || 'Modern Web Interface';
    if (backEl) backEl.textContent = data.backend || 'Application Logic Engine';
    if (dbEl) dbEl.textContent = data.database || 'Database Storage';

    // Optional External Links
    const githubBtn = document.getElementById('modal-project-github');
    if (githubBtn) {
      if (data.github) {
        githubBtn.href = data.github;
        githubBtn.style.display = 'inline-flex';
      } else {
        githubBtn.style.display = 'none';
      }
    }

    const demoBtn = document.getElementById('modal-project-demo');
    if (demoBtn) {
      if (data.demo) {
        demoBtn.href = data.demo;
        demoBtn.style.display = 'inline-flex';
      } else {
        demoBtn.style.display = 'none';
      }
    }

    // Architecture blueprint slot
    const blueprintWrap = document.getElementById('modal-project-blueprint');
    const blueprintBlock = document.getElementById('modal-diagram-block');
    if (blueprintWrap && blueprintBlock) {
      if (data.blueprint) {
        blueprintWrap.innerHTML = data.blueprint;
        blueprintBlock.style.display = 'block';
      } else {
        blueprintBlock.style.display = 'none';
      }
    }

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
    if (toast && toast.style) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
    }
    setTimeout(() => {
      if (toast && typeof toast.remove === 'function') {
        toast.remove();
      }
    }, 300);
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

/* ==========================================================================
   11. Interactive Engineering Playgrounds (Demo Modals)
   ========================================================================== */
function initDemoModal() {
  const demoModal = document.getElementById('demo-modal');
  const closeBtn = document.getElementById('demo-modal-close');
  const openButtons = document.querySelectorAll('[data-open-demo]');
  const tabButtons = document.querySelectorAll('[data-demo-tab]');
  const panes = document.querySelectorAll('.demo-pane');

  if (!demoModal) return;

  function switchTab(tabKey) {
    tabButtons.forEach(btn => {
      const isMatch = btn.getAttribute('data-demo-tab') === tabKey;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    panes.forEach(pane => {
      const isMatch = pane.id === `demo-pane-${tabKey}`;
      pane.classList.toggle('active', isMatch);
    });
  }

  function openDemo(initialTab = 'hostel') {
    switchTab(initialTab);
    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDemo() {
    demoModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-open-demo') || 'ams';
      openDemo(tab);
    });
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-demo-tab');
      if (tab) switchTab(tab);
    });
  });

  closeBtn?.addEventListener('click', closeDemo);

  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) {
      closeDemo();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('active')) {
      closeDemo();
    }
  });

  // Initialize individual playground feature engines
  initAmsPlayground();
  initHostelPlayground();
  initCnnPlayground();
  initFlowchartPlayground();
  initWorkforcePlayground();
}

/* --------------------------------------------------------------------------
   Sub-Playground 0: DYES Athlete Management System (AMS) 3-Tier Ranking Simulator
   -------------------------------------------------------------------------- */
function initAmsPlayground() {
  const athleteSelect = document.getElementById('ams-athlete-select');
  const sprintInput = document.getElementById('ams-sprint-input');
  const jumpInput = document.getElementById('ams-jump-input');
  const enduranceInput = document.getElementById('ams-endurance-input');
  const calcBtn = document.getElementById('ams-calculate-btn');
  const terminal = document.getElementById('ams-terminal');

  const resName = document.getElementById('ams-res-name');
  const resSport = document.getElementById('ams-res-sport');
  const resId = document.getElementById('ams-res-id');
  const resPower = document.getElementById('ams-res-power');
  const resAccel = document.getElementById('ams-res-accel');
  const resStamina = document.getElementById('ams-res-stamina');
  const resTierBox = document.getElementById('ams-res-tier-box');
  const resTierTitle = document.getElementById('ams-res-tier-title');
  const resTierDesc = document.getElementById('ams-res-tier-desc');
  const resRank = document.getElementById('ams-res-rank');

  if (!calcBtn || !terminal) return;

  function appendTerminal(lineHtml) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = lineHtml;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
  }

  athleteSelect?.addEventListener('change', () => {
    const opt = athleteSelect.options[athleteSelect.selectedIndex];
    if (sprintInput) sprintInput.value = opt.getAttribute('data-sprint') || '11.0';
    if (jumpInput) jumpInput.value = opt.getAttribute('data-jump') || '60';
    if (enduranceInput) enduranceInput.value = opt.getAttribute('data-endurance') || '18.0';
    appendTerminal(`<span class="terminal-prompt">$</span> Loaded athlete assessment file: [${opt.value}] ${opt.getAttribute('data-name')}`);
  });

  calcBtn?.addEventListener('click', () => {
    const opt = athleteSelect.options[athleteSelect.selectedIndex];
    const name = opt.getAttribute('data-name') || 'Athlete';
    const sport = opt.getAttribute('data-sport') || 'Sport';
    const academy = opt.getAttribute('data-academy') || 'DYES Academy';
    const athleteId = opt.value;
    const weight = parseFloat(opt.getAttribute('data-weight') || '65');

    const sprint = parseFloat(sprintInput?.value) || 11.0;
    const jump = parseFloat(jumpInput?.value) || 55;
    const endurance = parseFloat(enduranceInput?.value) || 17.0;

    // Calculate athletic derivatives
    // Lewis power index formula: Watts = 21.67 * weight * sqrt(jumpMeters)
    const jumpMeters = jump / 100;
    const powerWatts = 21.67 * weight * Math.sqrt(jumpMeters);
    const powerPerKg = (powerWatts / weight).toFixed(1);

    // Acceleration velocity: approx 20 / (time^2)
    const sprintSplit = sprint * 0.38;
    const accelVal = (20 / (sprintSplit * sprintSplit)).toFixed(2);

    // Stamina percent
    const staminaScore = Math.min(99.5, (endurance / 22.0 * 100)).toFixed(1);

    // Composite benchmark score for 3-tier classification
    const compositeScore = (jump * 0.45) + ((15 - sprint) * 6.5) + (endurance * 2.8);

    let tierNum = 3;
    let tierTitle = '';
    let tierDesc = '';
    let tierClass = '';
    let rankNum = 0;

    if (compositeScore >= 82) {
      tierNum = 1;
      tierTitle = '🌟 TIER 1 — ELITE STATE SQUAD';
      tierDesc = 'Ranked in top 5% across 720 tested athletes. Recommended for state scholarship and national training camp.';
      tierClass = 'ams-tier-box ams-tier-tier1';
      rankNum = Math.floor(5 + Math.random() * 20);
    } else if (compositeScore >= 64) {
      tierNum = 2;
      tierTitle = '📈 TIER 2 — COMPETITIVE DEVELOPMENT SQUAD';
      tierDesc = 'High athletic potential identified. Assigned to targeted regional coaching and physical conditioning.';
      tierClass = 'ams-tier-box ams-tier-tier2';
      rankNum = Math.floor(40 + Math.random() * 150);
    } else {
      tierNum = 3;
      tierTitle = '🎯 TIER 3 — FOUNDATION SQUAD';
      tierDesc = 'Baseline metrics logged. Mapped to fundamental conditioning and strength development program.';
      tierClass = 'ams-tier-box ams-tier-tier3';
      rankNum = Math.floor(240 + Math.random() * 400);
    }

    if (resName) resName.textContent = name;
    if (resSport) resSport.innerHTML = `${sport} &bull; ${academy}`;
    if (resId) resId.textContent = athleteId;
    if (resPower) resPower.textContent = `${powerPerKg} W/kg`;
    if (resAccel) resAccel.textContent = `${accelVal} m/s²`;
    if (resStamina) resStamina.textContent = `${staminaScore}%`;

    if (resTierBox) resTierBox.className = tierClass;
    if (resTierTitle) resTierTitle.textContent = tierTitle;
    if (resTierDesc) resTierDesc.textContent = tierDesc;
    if (resRank) resRank.textContent = `#${rankNum} of 720`;

    appendTerminal(`<span class="terminal-prompt">$</span> [DERIVATIVE MATH] Power: ${powerPerKg} W/kg | Accel: ${accelVal} m/s² | Stamina: ${staminaScore}%`);
    appendTerminal(`<span class="terminal-prompt">$</span> Benchmarking against 720 student athletes in DYES Karnataka database...`);
    appendTerminal(`<span class="terminal-success">[3-TIER VERIFIED] Classified into Tier ${tierNum} (Rank #${rankNum} of 720). Official report ready.</span>`);

    showToast(`DYES 3-Tier Report Generated for ${name}!`);
  });
}

/* --------------------------------------------------------------------------
   Sub-Playground 1: Hostel Room Allocation & PostgreSQL Trigger Sandbox
   -------------------------------------------------------------------------- */
function initHostelPlayground() {
  const residentSelect = document.getElementById('hostel-resident-select');
  const roomSelect = document.getElementById('hostel-room-select');
  const allocateBtn = document.getElementById('hostel-allocate-btn');
  const resetBtn = document.getElementById('hostel-reset-btn');
  const terminal = document.getElementById('hostel-terminal');

  const statusPill = document.getElementById('gatepass-status-pill');
  const serialElem = document.getElementById('gatepass-serial');
  const residentNameElem = document.getElementById('gatepass-resident-name');
  const residentSportElem = document.getElementById('gatepass-resident-sport');
  const roomValElem = document.getElementById('gatepass-room-val');

  if (!allocateBtn || !terminal) return;

  // Initial room capacities and occupancy state
  const roomsInitialState = {
    'A-101': { cap: 3, occ: 2, name: 'Block A — Room 101', type: 'Triple Bed' },
    'A-102': { cap: 4, occ: 4, name: 'Block A — Room 102', type: 'Quad Bed (AT CAPACITY)' },
    'B-201': { cap: 2, occ: 1, name: 'Block B — Room 201', type: 'Double Bed' },
    'B-202': { cap: 2, occ: 2, name: 'Block B — Room 202', type: 'Double Bed (AT CAPACITY)' }
  };

  let roomsState = JSON.parse(JSON.stringify(roomsInitialState));

  function refreshSelectLabels() {
    Array.from(roomSelect.options).forEach(opt => {
      const rId = opt.value;
      if (roomsState[rId]) {
        const r = roomsState[rId];
        const isFull = r.occ >= r.cap;
        opt.textContent = `${r.name} (${r.type} • ${r.occ}/${r.cap} Occupied${isFull ? ' - FULL' : ' - VACANT'})`;
      }
    });
  }

  function appendTerminal(lineHtml) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = lineHtml;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
  }

  allocateBtn.addEventListener('click', () => {
    const selectedResidentOpt = residentSelect.options[residentSelect.selectedIndex];
    const residentId = residentSelect.value;
    const residentName = selectedResidentOpt.getAttribute('data-name');
    const residentSport = selectedResidentOpt.getAttribute('data-sport');

    const roomId = roomSelect.value;
    const room = roomsState[roomId];

    appendTerminal(`<span class="terminal-prompt">$</span> [BEGIN TRANSACTION] SERIALIZABLE (ISO-9075)`);
    appendTerminal(`<span class="terminal-prompt">$</span> SELECT room_id, capacity, occupied FROM hostel_rooms WHERE room_id = '${roomId}' FOR UPDATE;`);

    // Check PostgreSQL trigger rule
    if (room.occ >= room.cap) {
      appendTerminal(`<span class="terminal-error">[TRIGGER ERROR] postgres_trigger_check_room_capacity() EXCEPTION: Room ${roomId} occupancy limit reached (${room.occ}/${room.cap}).</span>`);
      appendTerminal(`<span class="terminal-warning">[ROLLBACK] Transaction aborted by database constraint. Zero rows inserted into resident_allocations.</span>`);

      if (statusPill) {
        statusPill.textContent = 'ALLOCATION REJECTED (ROOM FULL)';
        statusPill.style.background = '#EF4444';
        statusPill.style.color = '#FFFFFF';
      }

      showToast(`Trigger Blocked: Room ${roomId} is at full capacity (${room.occ}/${room.cap}).`);
    } else {
      room.occ += 1;
      refreshSelectLabels();

      appendTerminal(`<span class="terminal-success">[TRIGGER PASS] Capacity check validated: Vacancy available (${room.occ}/${room.cap} beds occupied).</span>`);
      appendTerminal(`<span class="terminal-prompt">$</span> INSERT INTO resident_allocations (resident_id, room_id, status, assigned_at) VALUES ('${residentId}', '${roomId}', 'ALLOCATED', NOW());`);
      appendTerminal(`<span class="terminal-prompt">$</span> UPDATE hostel_rooms SET occupied = ${room.occ} WHERE room_id = '${roomId}';`);
      appendTerminal(`<span class="terminal-success">[COMMIT] Transaction committed. Digital Gate-Pass generated &amp; verified.</span>`);

      const passSerial = `DYES-GP-${Math.floor(1000 + Math.random() * 9000)}`;

      if (statusPill) {
        statusPill.textContent = 'ALLOCATED & VALIDATED ✓';
        statusPill.style.background = '#10B981';
        statusPill.style.color = '#0E131F';
      }
      if (serialElem) serialElem.textContent = `PASS #${passSerial}`;
      if (residentNameElem) residentNameElem.textContent = residentName;
      if (residentSportElem) residentSportElem.textContent = residentSport;
      if (roomValElem) roomValElem.textContent = room.name;

      showToast(`Success: Resident ${residentName} allocated to ${roomId}! Gate-Pass ${passSerial} issued.`);
    }
  });

  resetBtn.addEventListener('click', () => {
    roomsState = JSON.parse(JSON.stringify(roomsInitialState));
    refreshSelectLabels();
    terminal.innerHTML = `
      <div class="terminal-line terminal-prompt">$ // PostgreSQL Trigger Simulation Console ready</div>
      <div class="terminal-line" style="color: #9CA3AF;">$ State reset. Select resident and room to re-simulate...</div>
    `;
    if (statusPill) {
      statusPill.textContent = 'AWAITING TRIGGER';
      statusPill.style.background = '#4B5563';
      statusPill.style.color = '#F3F4F6';
    }
    if (serialElem) serialElem.textContent = 'PASS #PENDING';
    if (residentNameElem) residentNameElem.textContent = 'Vikas Gowda';
    if (residentSportElem) residentSportElem.textContent = 'Athletics (Discus Throw)';
    if (roomValElem) roomValElem.textContent = 'Block A — Room 101';
    showToast('Hostel room occupancy and simulation state reset.');
  });
}

/* --------------------------------------------------------------------------
   Sub-Playground 2: CNN Student Facial Recognition Attendance Scanner
   -------------------------------------------------------------------------- */
function initCnnPlayground() {
  const candidateButtons = document.querySelectorAll('.face-chip-btn');
  const scanBtn = document.getElementById('cnn-scan-btn');
  const terminal = document.getElementById('cnn-terminal');
  const ledgerTbody = document.getElementById('cnn-ledger-tbody');

  const boundingBox = document.getElementById('face-bounding-box');
  const boxTag = document.getElementById('face-box-tag');
  const faceSvgTarget = document.getElementById('face-svg-target');

  if (!scanBtn || !terminal) return;

  const rosterData = {
    'rahul': {
      name: 'Rahul Sharma',
      roll: 'ST-1042',
      sim: '98.8%',
      dist: '0.114',
      isRecognized: true,
      color: '#60A5FA'
    },
    'priya': {
      name: 'Priya Nair',
      roll: 'ST-1043',
      sim: '99.4%',
      dist: '0.082',
      isRecognized: true,
      color: '#34D399'
    },
    'karthik': {
      name: 'Karthik V.',
      roll: 'ST-1044',
      sim: '97.9%',
      dist: '0.138',
      isRecognized: true,
      color: '#FBBF24'
    },
    'unknown': {
      name: 'Unknown Visitor',
      roll: 'N/A',
      sim: '41.2%',
      dist: '0.742',
      isRecognized: false,
      color: '#F87171'
    }
  };

  let currentKey = 'rahul';

  function appendTerminal(lineHtml) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = lineHtml;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
  }

  candidateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      candidateButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentKey = btn.getAttribute('data-face');

      const subject = rosterData[currentKey];
      if (faceSvgTarget) {
        faceSvgTarget.setAttribute('stroke', subject.color);
      }
      if (boxTag) {
        boxTag.textContent = `TARGET: ${subject.name.toUpperCase()}`;
      }
      if (boundingBox) {
        boundingBox.style.borderColor = '#10B981';
      }

      appendTerminal(`<span class="terminal-prompt">$</span> Optical target switched to [${subject.name}]. Ready for inference.`);
    });
  });

  scanBtn.addEventListener('click', () => {
    const subject = rosterData[currentKey];
    scanBtn.disabled = true;
    scanBtn.innerHTML = '<span>Processing CNN Inference...</span>';

    if (boxTag) boxTag.textContent = 'EXTRACTING 128-D VECTORS...';
    if (boundingBox) boundingBox.style.borderColor = '#F59E0B';

    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      if (subject.isRecognized) {
        if (boundingBox) boundingBox.style.borderColor = '#10B981';
        if (boxTag) boxTag.textContent = `MATCH: ${subject.name.toUpperCase()} (${subject.sim})`;

        appendTerminal(`<span class="terminal-prompt">$</span> [FRAME INGEST] Optical sensor captured 640x480 frame. MTCNN detected 1 face.`);
        appendTerminal(`<span class="terminal-prompt">$</span> [CNN EMBEDDING] Extracted 128-dimensional Euclidean vector via FaceNet model.`);
        appendTerminal(`<span class="terminal-success">[VECTOR MATCH] Nearest roster neighbor: ${subject.name} (Roll #${subject.roll})</span>`);
        appendTerminal(`<span class="terminal-success">[METRICS] Cosine Similarity = ${subject.sim} | Euclidean Distance = ${subject.dist} (Threshold &ge; 85%)</span>`);
        appendTerminal(`<span class="terminal-success">[LEDGER INSERT] INSERT INTO student_attendance (roll_no, status, recorded_at) VALUES ('${subject.roll}', 'PRESENT', NOW());</span>`);

        if (ledgerTbody) {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td style="font-weight: 600;">${subject.name}</td>
            <td class="mono">${subject.roll}</td>
            <td class="mono" style="color: #10B981;">${subject.sim}</td>
            <td class="mono">${timeStr}</td>
            <td><span class="badge-present">PRESENT</span></td>
          `;
          ledgerTbody.insertBefore(row, ledgerTbody.firstChild);
        }

        showToast(`Attendance Marked: ${subject.name} verified PRESENT (${subject.sim} similarity).`);
      } else {
        if (boundingBox) boundingBox.style.borderColor = '#EF4444';
        if (boxTag) boxTag.textContent = 'UNKNOWN SUBJECT (<85% MATCH)';

        appendTerminal(`<span class="terminal-prompt">$</span> [FRAME INGEST] Optical sensor captured 640x480 frame. MTCNN detected 1 face.`);
        appendTerminal(`<span class="terminal-prompt">$</span> [CNN EMBEDDING] Extracted 128-dimensional Euclidean vector.`);
        appendTerminal(`<span class="terminal-error">[SIMILARITY BREACH] Nearest vector distance: ${subject.dist} (Similarity: ${subject.sim}).</span>`);
        appendTerminal(`<span class="terminal-warning">[ATTENDANCE DENIED] Confidence score &lt; 85.0% threshold. Unrecognized visitor flagged.</span>`);

        showToast('Attendance Denied: Face not recognized in registered student roster.');
      }

      scanBtn.disabled = false;
      scanBtn.innerHTML = '<span>Run CNN Inference &amp; Mark Attendance</span>';
    }, 550);
  });
}

/* --------------------------------------------------------------------------
   Sub-Playground 3: Python AST to SVG Flowchart Generator
   -------------------------------------------------------------------------- */
function initFlowchartPlayground() {
  const templateSelect = document.getElementById('flowchart-template-select');
  const codeInput = document.getElementById('flowchart-code-input');
  const renderBtn = document.getElementById('flowchart-render-btn');
  const terminal = document.getElementById('flowchart-terminal');
  const canvas = document.getElementById('flowchart-canvas');

  if (!renderBtn || !canvas || !codeInput) return;

  const pythonTemplates = {
    'hostel_gate': `def check_hostel_entry(student_id, curfew_time):
  scan_result = cnn_face_verify(student_id)
  if scan_result.is_valid:
    if current_time <= curfew_time:
      log_attendance(student_id, "PRESENT")
      return "GATE_OPEN"
    else:
      flag_warden_alert(student_id, "LATE_ENTRY")
      return "DISCIPLINE_HOLD"`,

    'attendance_streak': `def calculate_streak(attendance_records):
    streak_count = 0
    idx = 0
    while idx < len(attendance_records):
        record = attendance_records[idx]
        if record.is_present:
            streak_count += 1
            idx += 1
        else:
            break
    return streak_count`,

    'binary_search': `def binary_search_bed(rooms_list, target_room_id):
    low = 0
    high = len(rooms_list) - 1
    while low <= high:
        mid = (low + high) // 2
        if rooms_list[mid] == target_room_id:
            return mid
        elif rooms_list[mid] < target_room_id:
            low = mid + 1
        else:
            high = mid - 1
    return -1`
  };

  function appendTerminal(lineHtml) {
    if (!terminal) return;
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = lineHtml;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
  }

  function escapeXml(unsafe) {
    return String(unsafe || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function truncateText(str, maxLen = 26) {
    if (!str) return '';
    return str.length > maxLen ? str.slice(0, maxLen - 2) + '..' : str;
  }

  function parsePythonBlocks(codeStr) {
    const lines = codeStr.split('\n');
    const items = [];

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const trimmed = rawLine.trim();
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) continue;

      const expandedLine = rawLine.replace(/\t/g, '    ');
      const indentMatch = expandedLine.match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1].length : 0;

      let type = 'process';
      let label = trimmed;
      let subtype = '';

      if (trimmed.startsWith('def ') || trimmed.startsWith('function ')) {
        type = 'start';
        const m = trimmed.match(/^(?:def|function)\s+([a-zA-Z0-9_]+)\s*\((.*?)\):?/);
        label = m ? `Start: ${m[1]}()` : 'Start';
        subtype = m && m[2] ? m[2] : '';
      } else if (/^if[\s(]/.test(trimmed)) {
        type = 'if';
        label = trimmed.replace(/^if\s*/, '').replace(/[:{]$/, '').trim();
      } else if (/^(?:elif|else\s+if)[\s(]/.test(trimmed)) {
        type = 'elif';
        label = trimmed.replace(/^(?:elif|else\s+if)\s*/, '').replace(/[:{]$/, '').trim();
      } else if (/^else(?:\s*[:{]|\s*$)/.test(trimmed)) {
        type = 'else';
        label = 'else';
      } else if (/^while[\s(]/.test(trimmed)) {
        type = 'while';
        label = trimmed.replace(/^while\s*/, '').replace(/[:{]$/, '').trim();
      } else if (/^for[\s(]/.test(trimmed)) {
        type = 'for';
        label = trimmed.replace(/^for\s*/, '').replace(/[:{]$/, '').trim();
      } else if (trimmed.startsWith('return')) {
        type = 'return';
        label = trimmed.replace(/;$/, '');
      } else if (trimmed === 'break' || trimmed === 'continue' || trimmed === 'pass') {
        type = 'control';
        label = trimmed;
      }

      items.push({
        line: i + 1,
        indent,
        type,
        subtype,
        label,
        raw: trimmed
      });
    }

    return items;
  }

  function parseBlocksToAst(tokens) {
    let idx = 0;

    function parseBlock(targetIndent) {
      const block = [];

      while (idx < tokens.length) {
        const tok = tokens[idx];

        if (tok.indent < targetIndent) {
          break;
        }

        if (tok.type === 'else' || tok.type === 'elif') {
          break;
        }

        if (tok.type === 'start') {
          idx++;
          const nextIndent = idx < tokens.length ? tokens[idx].indent : targetIndent;
          const body = parseBlock(nextIndent);
          block.push({
            type: 'start',
            label: tok.label,
            subtype: tok.subtype,
            body: body
          });
        } else if (tok.type === 'if') {
          function parseIfChain(currentTok) {
            const cond = currentTok.label;
            const chainIndent = currentTok.indent;
            idx++;
            const bodyIndent = idx < tokens.length && tokens[idx].indent > chainIndent ? tokens[idx].indent : chainIndent + 2;
            const trueBranch = parseBlock(bodyIndent);
            let falseBranch = [];

            if (idx < tokens.length && tokens[idx].indent === chainIndent) {
              if (tokens[idx].type === 'elif') {
                const nextTok = tokens[idx];
                falseBranch = [parseIfChain(nextTok)];
              } else if (tokens[idx].type === 'else') {
                idx++;
                const elseBodyIndent = idx < tokens.length && tokens[idx].indent > chainIndent ? tokens[idx].indent : chainIndent + 2;
                falseBranch = parseBlock(elseBodyIndent);
              }
            }

            return {
              type: 'if',
              condition: cond,
              trueBranch: trueBranch,
              falseBranch: falseBranch
            };
          }

          block.push(parseIfChain(tok));
        } else if (tok.type === 'while' || tok.type === 'for') {
          const loopType = tok.type;
          const cond = tok.label;
          const loopIndent = tok.indent;
          idx++;
          const bodyIndent = idx < tokens.length && tokens[idx].indent > loopIndent ? tokens[idx].indent : loopIndent + 4;
          const body = parseBlock(bodyIndent);

          block.push({
            type: 'loop',
            loopType: loopType,
            condition: cond,
            body: body
          });
        } else if (tok.type === 'return') {
          block.push({
            type: 'return',
            label: tok.label
          });
          idx++;
        } else if (tok.type === 'control') {
          block.push({
            type: 'control',
            label: tok.label
          });
          idx++;
        } else {
          block.push({
            type: 'process',
            label: tok.label
          });
          idx++;
        }
      }

      return block;
    }

    return parseBlock(0);
  }

  function generateDynamicFlowchartSvg(codeStr) {
    const rawCode = (codeStr || '').trim();
    if (!rawCode) {
      return `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:260px; color:#6B7280; text-align:center; padding:1.5rem;">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 0.75rem auto; display:block; opacity:0.6;">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 8h10M7 12h4M7 16h8" />
          </svg>
          <div style="font-weight:600; font-size:0.95rem; margin-bottom:0.35rem; color:var(--text-primary);">No Python Code Provided</div>
          <p style="font-size:0.8rem; margin:0 auto; max-width:280px;">Type or paste any Python code in the editor on the left and click "Generate Visual Flowchart".</p>
        </div>
      `;
    }

    const tokens = parsePythonBlocks(rawCode);
    const ast = parseBlocksToAst(tokens);

    const width = 520;
    const cx = width / 2;
    let curY = 24;

    const svgElements = [];
    const defs = `
      <defs>
        <marker id="flow-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#3730A3" />
        </marker>
        <marker id="flow-arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#10B981" />
        </marker>
        <marker id="flow-arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#EF4444" />
        </marker>
        <marker id="flow-arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#D97706" />
        </marker>
      </defs>
    `;

    function drawStart(label, y) {
      const text = escapeXml(truncateText(label, 32));
      const fullText = escapeXml(label);
      svgElements.push(`
        <g>
          <title>${fullText}</title>
          <rect x="${cx - 110}" y="${y}" width="220" height="38" rx="19" fill="#EEF2FF" stroke="#3730A3" stroke-width="2" />
          <text x="${cx}" y="${y + 24}" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" fill="#1E1B4B">${text}</text>
        </g>
      `);
      return y + 38;
    }

    function drawProcess(label, x, y, isBranch = false) {
      const w = isBranch ? 164 : 220;
      const h = 38;
      const text = escapeXml(truncateText(label, isBranch ? 20 : 28));
      const fullText = escapeXml(label);
      svgElements.push(`
        <g>
          <title>${fullText}</title>
          <rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="6" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.5" />
          <text x="${x}" y="${y + 23}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" fill="#0F172A">${text}</text>
        </g>
      `);
      return y + h;
    }

    function drawReturn(label, x, y, isBranch = false) {
      const w = isBranch ? 154 : 190;
      const h = 38;
      const text = escapeXml(truncateText(label, isBranch ? 18 : 24));
      const fullText = escapeXml(label);
      svgElements.push(`
        <g>
          <title>${fullText}</title>
          <rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5" />
          <text x="${x}" y="${y + 23}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#065F46">${text}</text>
        </g>
      `);
      return y + h;
    }

    function drawControl(label, x, y, isBranch = false) {
      const w = isBranch ? 120 : 140;
      const h = 32;
      const text = escapeXml(label);
      svgElements.push(`
        <g>
          <rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1.5" />
          <text x="${x}" y="${y + 20}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#B91C1C">${text}</text>
        </g>
      `);
      return y + h;
    }

    function drawDecision(label, x, y, isBranch = false) {
      const w = isBranch ? 160 : 190;
      const h = 56;
      const text = escapeXml(truncateText(label, isBranch ? 18 : 22));
      const fullText = escapeXml(label);
      const halfW = w / 2;
      const halfH = h / 2;
      const points = `${x},${y} ${x + halfW},${y + halfH} ${x},${y + h} ${x - halfW},${y + halfH}`;
      svgElements.push(`
        <g>
          <title>${fullText}</title>
          <polygon points="${points}" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5" />
          <text x="${x}" y="${y + halfH + 4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#78350F">${text}</text>
        </g>
      `);
      return y + h;
    }

    function drawLoop(label, x, y) {
      const w = 200;
      const h = 56;
      const text = escapeXml(truncateText(label, 22));
      const fullText = escapeXml(label);
      const halfW = w / 2;
      const halfH = h / 2;
      const points = `${x},${y} ${x + halfW},${y + halfH} ${x},${y + h} ${x - halfW},${y + halfH}`;
      svgElements.push(`
        <g>
          <title>${fullText}</title>
          <polygon points="${points}" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2" />
          <text x="${x}" y="${y + halfH + 4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#312E81">${text}</text>
        </g>
      `);
      return y + h;
    }

    function drawEnd(y) {
      svgElements.push(`
        <g>
          <rect x="${cx - 75}" y="${y}" width="150" height="32" rx="16" fill="#1E1B4B" stroke="#3730A3" stroke-width="1.5" />
          <text x="${cx}" y="${y + 20}" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">End / Return</text>
        </g>
      `);
      return y + 32;
    }

    function drawArrow(x1, y1, x2, y2, color = '#3730A3', marker = 'flow-arrow') {
      svgElements.push(`
        <path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="${color}" stroke-width="2" marker-end="url(#${marker})" />
      `);
    }

    function drawOrthogonalArrow(dPath, color = '#3730A3', marker = 'flow-arrow') {
      svgElements.push(`
        <path d="${dPath}" stroke="${color}" stroke-width="2" fill="none" marker-end="url(#${marker})" />
      `);
    }

    function drawLabel(x, y, text, color = '#10B981') {
      svgElements.push(`
        <text x="${x}" y="${y}" font-family="JetBrains Mono, monospace" font-size="9.5" font-weight="700" fill="${color}">${text}</text>
      `);
    }

    const hasStart = ast.length > 0 && ast[0].type === 'start';
    if (!hasStart) {
      curY = drawStart('Start: Script Execution', curY);
      drawArrow(cx, curY, cx, curY + 28);
      curY += 28;
    }

    function renderList(list, startY, parentX = cx, isBranch = false) {
      let y = startY;

      for (let i = 0; i < list.length; i++) {
        const item = list[i];

        if (item.type === 'start') {
          const bottom = drawStart(item.label, y);
          drawArrow(cx, bottom, cx, bottom + 28);
          y = renderList(item.body, bottom + 28, cx, false);
        } else if (item.type === 'process') {
          const bottom = drawProcess(item.label, parentX, y, isBranch);
          if (i < list.length - 1) {
            drawArrow(parentX, bottom, parentX, bottom + 28);
            y = bottom + 28;
          } else {
            y = bottom;
          }
        } else if (item.type === 'return') {
          const bottom = drawReturn(item.label, parentX, y, isBranch);
          if (i < list.length - 1) {
            drawArrow(parentX, bottom, parentX, bottom + 28);
            y = bottom + 28;
          } else {
            y = bottom;
          }
        } else if (item.type === 'control') {
          const bottom = drawControl(item.label, parentX, y, isBranch);
          if (i < list.length - 1) {
            drawArrow(parentX, bottom, parentX, bottom + 28);
            y = bottom + 28;
          } else {
            y = bottom;
          }
        } else if (item.type === 'if') {
          const diamondTop = y;
          const diamondH = 56;
          const diamondW = isBranch ? 160 : 190;
          const diamondBottom = drawDecision(item.condition, parentX, diamondTop, isBranch);
          const diamondMidY = diamondTop + diamondH / 2;

          const hasElse = item.falseBranch && item.falseBranch.length > 0;

          if (hasElse) {
            const offset = isBranch ? 65 : 125;
            const lx = Math.max(90, parentX - offset);
            const rx = Math.min(width - 90, parentX + offset);
            const branchStartY = diamondBottom + 35;

            drawOrthogonalArrow(`M ${parentX - diamondW / 2} ${diamondMidY} L ${lx} ${diamondMidY} L ${lx} ${branchStartY}`, '#10B981', 'flow-arrow-green');
            drawLabel(lx - 15, diamondMidY - 6, '[True]', '#10B981');

            drawOrthogonalArrow(`M ${parentX + diamondW / 2} ${diamondMidY} L ${rx} ${diamondMidY} L ${rx} ${branchStartY}`, '#EF4444', 'flow-arrow-red');
            drawLabel(rx + 5, diamondMidY - 6, '[False]', '#EF4444');

            const trueEndY = renderList(item.trueBranch, branchStartY, lx, true);
            const falseEndY = renderList(item.falseBranch, branchStartY, rx, true);

            const maxEndY = Math.max(trueEndY, falseEndY);

            const trueReturns = item.trueBranch.some(n => n.type === 'return');
            const falseReturns = item.falseBranch.some(n => n.type === 'return');

            if (i < list.length - 1 || (!trueReturns && !falseReturns)) {
              const mergeY = maxEndY + 30;
              if (!trueReturns) {
                drawOrthogonalArrow(`M ${lx} ${trueEndY} L ${lx} ${mergeY} L ${parentX} ${mergeY}`, '#94A3B8', 'flow-arrow');
              }
              if (!falseReturns) {
                drawOrthogonalArrow(`M ${rx} ${falseEndY} L ${rx} ${mergeY} L ${parentX} ${mergeY}`, '#94A3B8', 'flow-arrow');
              }
              drawArrow(parentX, mergeY, parentX, mergeY + 28);
              y = mergeY + 28;
            } else {
              y = maxEndY;
            }
          } else {
            const lx = Math.max(90, parentX - 110);
            const branchStartY = diamondBottom + 35;

            drawOrthogonalArrow(`M ${parentX - diamondW / 2} ${diamondMidY} L ${lx} ${diamondMidY} L ${lx} ${branchStartY}`, '#10B981', 'flow-arrow-green');
            drawLabel(lx - 15, diamondMidY - 6, '[True]', '#10B981');

            const trueEndY = renderList(item.trueBranch, branchStartY, lx, true);
            const trueReturns = item.trueBranch.some(n => n.type === 'return');

            if (i < list.length - 1 || !trueReturns) {
              const nextY = Math.max(diamondBottom + 40, trueEndY + 30);
              drawOrthogonalArrow(`M ${parentX} ${diamondBottom} L ${parentX} ${nextY} `, '#EF4444', 'flow-arrow-red');
              drawLabel(parentX + 8, diamondBottom + 18, '[False]', '#EF4444');

              if (!trueReturns) {
                drawOrthogonalArrow(`M ${lx} ${trueEndY} L ${lx} ${nextY} L ${parentX} ${nextY} `, '#94A3B8', 'flow-arrow');
              }
              y = nextY;
            } else {
              drawOrthogonalArrow(`M ${parentX} ${diamondBottom} L ${parentX} ${diamondBottom + 32} `, '#EF4444', 'flow-arrow-red');
              drawLabel(parentX + 8, diamondBottom + 18, '[False]', '#EF4444');
              y = diamondBottom + 32;
            }
          }
        } else if (item.type === 'loop') {
          const loopTop = y;
          const loopH = 56;
          const loopW = 200;
          const loopBottom = drawLoop(`${item.loopType} ${item.condition} `, parentX, loopTop);
          const loopMidY = loopTop + loopH / 2;

          drawArrow(parentX, loopBottom, parentX, loopBottom + 30, '#10B981', 'flow-arrow-green');
          drawLabel(parentX + 8, loopBottom + 18, '[True: Loop]', '#10B981');

          const bodyStartY = loopBottom + 30;
          const bodyEndY = renderList(item.body, bodyStartY, parentX, false);

          const loopBackX = Math.max(25, parentX - 150);
          drawOrthogonalArrow(`M ${parentX} ${bodyEndY} L ${loopBackX} ${bodyEndY} L ${loopBackX} ${loopMidY} L ${parentX - loopW / 2} ${loopMidY} `, '#4F46E5', 'flow-arrow');

          const exitX = Math.min(width - 25, parentX + 150);
          const exitY = bodyEndY + 35;
          drawOrthogonalArrow(`M ${parentX + loopW / 2} ${loopMidY} L ${exitX} ${loopMidY} L ${exitX} ${exitY} L ${parentX} ${exitY} `, '#EF4444', 'flow-arrow-red');
          drawLabel(exitX - 50, loopMidY - 6, '[False: Exit]', '#EF4444');

          if (i < list.length - 1) {
            drawArrow(parentX, exitY, parentX, exitY + 28);
            y = exitY + 28;
          } else {
            y = exitY;
          }
        }
      }

      return y;
    }

    const finalY = renderList(ast, curY);
    const endY = finalY + 30;
    drawArrow(cx, finalY, cx, endY);
    const totalH = drawEnd(endY) + 30;

    return `
      <svg class="flowchart-svg" viewBox="0 0 ${width} ${totalH}" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        ${svgElements.join('\n')}
      </svg>
    `;
  }

  function renderCurrentCode(showSuccessToast = false) {
    const rawCode = codeInput.value;
    try {
      const svgHtml = generateDynamicFlowchartSvg(rawCode);
      canvas.innerHTML = svgHtml;

      const lines = rawCode.split('\n').filter(l => l.trim().length > 0 && !l.trim().startsWith('#'));
      const ifCount = (rawCode.match(/\b(if|elif)\b/g) || []).length;
      const loopCount = (rawCode.match(/\b(while|for)\b/g) || []).length;
      const funcCount = (rawCode.match(/\bdef\b/g) || []).length;
      const returnCount = (rawCode.match(/\breturn\b/g) || []).length;

      appendTerminal(`<span class="terminal-prompt">$</span> Parsed ${lines.length} Python lines: ${funcCount} func, ${ifCount} decision points, ${loopCount} loops, ${returnCount} return.`);
      appendTerminal(`<span class="terminal-success">[FLOWCHART READY] Diagram updated with directed orthogonal routing.</span>`);

      if (showSuccessToast) {
        showToast('Flowchart generated from Python code!');
      }
    } catch (err) {
      console.error('Flowchart generation error:', err);
      appendTerminal(`<span class="terminal-prompt" style="color:#EF4444;">[ERROR] Could not parse code syntax: ${escapeXml(err.message)}</span>`);
    }
  }

  // Initial load
  codeInput.value = pythonTemplates['hostel_gate'];
  renderCurrentCode(false);

  // When template is changed
  templateSelect.addEventListener('change', () => {
    const selected = templateSelect.value;
    if (pythonTemplates[selected]) {
      codeInput.value = pythonTemplates[selected];
      renderCurrentCode(false);
      appendTerminal(`<span class="terminal-prompt">$</span> Example template loaded: [${selected}].`);
    } else if (selected === 'custom') {
      appendTerminal(`<span class="terminal-prompt">$</span> Custom mode active: Type or paste any code into editor.`);
    }
  });

  // Live debounced auto-rendering as code is typed or pasted
  let flowchartDebounceTimer = null;
  codeInput.addEventListener('input', () => {
    if (templateSelect.value !== 'custom') {
      templateSelect.value = 'custom';
    }
    clearTimeout(flowchartDebounceTimer);
    flowchartDebounceTimer = setTimeout(() => {
      renderCurrentCode(false);
    }, 200);
  });

  codeInput.addEventListener('paste', () => {
    if (templateSelect.value !== 'custom') {
      templateSelect.value = 'custom';
    }
    clearTimeout(flowchartDebounceTimer);
    flowchartDebounceTimer = setTimeout(() => {
      renderCurrentCode(false);
    }, 80);
  });

  // When user clicks the render button
  renderBtn.addEventListener('click', () => {
    clearTimeout(flowchartDebounceTimer);
    renderCurrentCode(true);
  });
}

/* --------------------------------------------------------------------------
   Sub-Playground 4: Workforce Geofenced Check-In & Check-Out Policy Engine
   -------------------------------------------------------------------------- */
function initWorkforcePlayground() {
  const empSelect = document.getElementById('workforce-emp-select');
  const actionSelect = document.getElementById('workforce-action-select');
  const locationSelect = document.getElementById('workforce-location-select');
  const timeSelect = document.getElementById('workforce-time-select');
  const detectGpsBtn = document.getElementById('workforce-detect-gps-btn');
  const punchBtn = document.getElementById('workforce-punch-btn');
  const terminal = document.getElementById('workforce-terminal');
  const ledgerTbody = document.getElementById('workforce-ledger-tbody');
  const currentEmpSpan = document.getElementById('workforce-current-emp');

  if (!punchBtn || !terminal) return;

  function appendTerminal(lineHtml) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = lineHtml;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Update session label on employee change
  if (empSelect && currentEmpSpan) {
    empSelect.addEventListener('change', () => {
      const selectedEmpOpt = empSelect.options[empSelect.selectedIndex];
      const empName = selectedEmpOpt.getAttribute('data-name');
      const empId = empSelect.value;
      currentEmpSpan.textContent = `${empName} (${empId})`;
      appendTerminal(`<span class="terminal-prompt">$</span> [SESSION SWITCH] Active employee login changed to: <strong>${empName}</strong> (${empId}).`);
    });
  }

  // Live device GPS detection
  if (detectGpsBtn) {
    detectGpsBtn.addEventListener('click', () => {
      appendTerminal(`<span class="terminal-prompt">$</span> [GPS SENSOR] Querying browser navigator.geolocation...`);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude.toFixed(5);
            const lng = pos.coords.longitude.toFixed(5);
            const acc = pos.coords.accuracy ? pos.coords.accuracy.toFixed(1) : '15.0';
            appendTerminal(`<span class="terminal-success">[GPS HARDWARE OK] Live coordinates acquired: Lat ${lat}° N, Long ${lng}° E (Accuracy: ±${acc}m).</span>`);
            showToast(`GPS Acquired: ${lat}° N, ${lng}° E`);
          },
          (err) => {
            appendTerminal(`<span class="terminal-warning">[GPS NOTICE] Browser location permission not granted or running offline (${err.message || 'code ' + err.code}).</span>`);
            appendTerminal(`<span class="terminal-prompt">$</span> [FALLBACK SIMULATION] Office HQ coordinates calibrated: Lat 12.9716° N, Long 77.5946° E.`);
            showToast('Simulated GPS coordinates calibrated.');
          },
          { timeout: 4000 }
        );
      } else {
        appendTerminal(`<span class="terminal-warning">[GPS SENSOR] Geolocation API unavailable on this device. Using calibrated Office HQ coordinates.</span>`);
      }
    });
  }

  punchBtn.addEventListener('click', () => {
    const selectedEmpOpt = empSelect.options[empSelect.selectedIndex];
    const empId = empSelect.value;
    const empName = selectedEmpOpt.getAttribute('data-name');
    const empRole = selectedEmpOpt.getAttribute('data-role');

    const action = actionSelect ? actionSelect.value : 'check_in';
    const actionLabel = action === 'check_in' ? 'Check-In' : 'Check-Out';

    const selectedLocOpt = locationSelect.options[locationSelect.selectedIndex];
    const locMode = locationSelect.value;
    const lat = selectedLocOpt.getAttribute('data-lat') || '12.9716';
    const lng = selectedLocOpt.getAttribute('data-lng') || '77.5946';
    const distStr = selectedLocOpt.getAttribute('data-dist') || '18m';

    const selectedTimeOpt = timeSelect.options[timeSelect.selectedIndex];
    const punchTime = timeSelect.value;
    const punchLabel = selectedTimeOpt.getAttribute('data-label') || punchTime;

    appendTerminal(`<span class="terminal-prompt">$</span> [LOGIN SESSION] Authenticated employee: <strong>${empName}</strong> (${empId}, ${empRole})`);
    appendTerminal(`<span class="terminal-prompt">$</span> [PUNCH REQUEST] Action: <strong>${actionLabel.toUpperCase()}</strong> at ${punchLabel}`);
    appendTerminal(`<span class="terminal-prompt">$</span> [GPS GEOFENCE] Device coordinates: Lat <strong>${lat}° N</strong>, Long <strong>${lng}° E</strong>`);

    let punchStatus = 'ON TIME';
    let badgeClass = 'badge-present';
    let ruleDesc = 'Inside 100m office perimeter';
    let isRejected = false;

    if (locMode === 'office_inside') {
      appendTerminal(`<span class="terminal-success">[GEOFENCE PASS] Distance from Office HQ: ${distStr} (Within 100m geofence radius). Physical presence verified ✓</span>`);

      if (action === 'check_in') {
        if (punchTime === '09:12:00') {
          appendTerminal(`<span class="terminal-prompt">$</span> [SHIFT CHECK] Shift 1 Morning (Cutoff: 09:30:00 AM)`);
          appendTerminal(`<span class="terminal-success">[POLICY PASS] Punch time 09:12 AM is 18 minutes before shift deadline.</span>`);
          appendTerminal(`<span class="terminal-success">[MYSQL COMMIT] Status = ON TIME &bull; Check-in logged with GPS coordinates.</span>`);
          punchStatus = 'ON TIME';
          badgeClass = 'badge-present';
          ruleDesc = 'Passed 09:30 Cutoff (-18m)';
        } else if (punchTime === '09:47:30') {
          appendTerminal(`<span class="terminal-prompt">$</span> [SHIFT CHECK] Shift 1 Morning (Cutoff: 09:30:00 AM)`);
          appendTerminal(`<span class="terminal-warning">[DEADLINE BREACH] Punch time 09:47 AM is +17.5 mins past cutoff. Grace period expired.</span>`);
          appendTerminal(`<span class="terminal-error">[AUDIT FLAG] Status = LATE (PENDING) &bull; Supervisor review required.</span>`);
          punchStatus = 'LATE (PENDING)';
          badgeClass = 'badge-late';
          ruleDesc = 'Exceeded 09:30 Cutoff (+17m)';
        } else if (punchTime === '13:50:00') {
          appendTerminal(`<span class="terminal-prompt">$</span> [SHIFT CHECK] Shift 2 Afternoon (Cutoff: 02:00:00 PM)`);
          appendTerminal(`<span class="terminal-success">[POLICY PASS] Punch time 01:50 PM is 10 minutes before afternoon cutoff.</span>`);
          appendTerminal(`<span class="terminal-success">[MYSQL COMMIT] Status = ON TIME &bull; Afternoon shift credit committed.</span>`);
          punchStatus = 'ON TIME';
          badgeClass = 'badge-present';
          ruleDesc = 'Passed 14:00 Cutoff (-10m)';
        } else {
          appendTerminal(`<span class="terminal-prompt">$</span> [SHIFT CHECK] Evening Check-In at 06:05 PM.`);
          appendTerminal(`<span class="terminal-success">[MYSQL COMMIT] Status = ON TIME &bull; Evening roster recorded.</span>`);
          punchStatus = 'ON TIME';
          badgeClass = 'badge-present';
          ruleDesc = 'Evening Roster Active';
        }
      } else {
        // Check-Out
        appendTerminal(`<span class="terminal-success">[CHECK-OUT PASS] Shift ended. Total work duration: 8.5 hours recorded.</span>`);
        appendTerminal(`<span class="terminal-success">[MYSQL COMMIT] Status = CHECK-OUT OK &bull; Exit timestamp saved with GPS coordinates.</span>`);
        punchStatus = 'CHECK-OUT OK';
        badgeClass = 'badge-checkout';
        ruleDesc = 'Full 8.5h Shift Completed';
      }
    } else if (locMode === 'office_outside') {
      appendTerminal(`<span class="terminal-error">[GEOFENCE BREACH ✗] Distance from Office HQ: ${distStr} (Exceeds 100m perimeter). Employee is outside office!</span>`);
      appendTerminal(`<span class="terminal-error">[PUNCH REJECTED] In-office attendance requires physical presence inside office perimeter or approved On-Duty permit.</span>`);
      punchStatus = 'REJECTED';
      badgeClass = 'badge-rejected';
      ruleDesc = `Geofence Alert (${distStr} away)`;
      isRejected = true;
    } else {
      // Out-of-Office / Approved On-Duty (OD)
      const odToken = `OD-AUTH-${Math.floor(1000 + Math.random() * 9000)}`;
      appendTerminal(`<span class="terminal-prompt">$</span> [OD VALIDATION] Querying authorized On-Duty (OD) permits for today...`);
      appendTerminal(`<span class="terminal-success">[OD AUTHORIZED] Valid token ${odToken} verified &bull; Approved by Operations Lead.</span>`);
      appendTerminal(`<span class="terminal-success">[MYSQL COMMIT] Status = OD APPROVED &bull; Full duty credit recorded without geofence penalty.</span>`);
      punchStatus = 'OD APPROVED';
      badgeClass = 'badge-od';
      ruleDesc = `Approved OD (${odToken})`;
    }

    if (ledgerTbody) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="font-weight: 600;">${empName} <span style="font-size: 0.7rem; color: var(--text-muted); display: block;">${empId}</span></td>
        <td><span style="font-weight: 600; color: ${action === 'check_in' ? '#4F46E5' : '#10B981'};">${actionLabel}</span></td>
        <td class="mono" style="font-size: 0.75rem;">${lat}° N, ${lng}° E</td>
        <td class="mono">${punchLabel}</td>
        <td style="font-size: 0.75rem; color: ${isRejected ? '#DC2626' : (locMode === 'office_inside' ? '#10B981' : '#4F46E5')};">${ruleDesc}</td>
        <td><span class="${badgeClass}">${punchStatus}</span></td>
      `;
      ledgerTbody.insertBefore(row, ledgerTbody.firstChild);
    }

    if (isRejected) {
      showToast(`Punch Blocked: Outside office geofence (${distStr}).`);
    } else {
      showToast(`Verified: ${empName} recorded ${actionLabel} (${punchStatus}).`);
    }
  });
}
