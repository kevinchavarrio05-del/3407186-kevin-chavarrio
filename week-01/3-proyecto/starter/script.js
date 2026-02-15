/* ============================================
   GUÍA TURÍSTICA VIRTUAL - BUSINESS CARD
   ============================================ */

// ============================================
// DATA
// ============================================

const VirtualTouristGuideAppData = {
  name: 'VirtualTouristGuideApp',
  title: 'Explora Colombia',
  location: 'Colombia',

  bio: 'Plataforma digital para descubrir los mejores destinos turísticos del país con guías virtuales.',

  contact: {
    email: 'virtualtouristguideapp@gmail.com',
    phone: '+57 3214479314'
  },

  skills: [
    { name: 'Cartagena', level: 95 },
    { name: 'Medellín', level: 90 },
    { name: 'Bogotá', level: 88 },
    { name: 'Santa Marta', level: 92 },
    { name: 'San Andrés', level: 97 },
    { name: 'Cali', level: 85 },
    { name: 'Ibague', level: 85 }
   
  ],

  socials: [
    
     { platform: 'Instagram', url: 'https://www.instagram.com/virtualtravelguideapp?igsh=cmFpZWc5bTllMDZq&utm_source=qr', icon: '📸' },
     { platform: 'Facebook', url: 'https://www.facebook.com/share/1E5iGzRGPi/?mibextid=wwXIfr', icon: '📘' }
  
  ],

  stats: {
    totalUsers: 5000,
    activeUsers: 2000,
    destinations: 7,
    rating: 4.9,

  }
};

// ============================================
// DOM
// ============================================

const userName = document.getElementById('userName');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userBio = document.getElementById('userBio');

const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');

const skillsList = document.getElementById('skillsList');
const socialLinks = document.getElementById('socialLinks');
const statsContainer = document.getElementById('stats');

const themeToggle = document.getElementById('themeToggle');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const toggleSkills = document.getElementById('toggleSkills');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// BASIC INFO
// ============================================

const renderBasicInfo = () => {
  const {
    name,
    title,
    location,
    bio,
    contact: { email, phone }
  } = VirtualTouristGuideAppData;

  userName.textContent = name;
  userTitle.textContent = title;
  userLocation.textContent = `📍 ${location}`;
  userBio.textContent = bio;

  userEmail.textContent = email;
  userPhone.textContent = phone;
};

// ============================================
// SKILLS / DESTINOS
// ============================================

const renderSkills = (showAll = false) => {
  const { skills } = VirtualTouristGuideAppData;

  const skillsToShow = showAll ? skills : skills.slice(0, 4);

  const skillsHtml = skillsToShow
    .map(skill => {
      const { name, level } = skill;

      return `
      <div class="skill-item">
        <div class="skill-name">${name}</div>

        <div class="skill-bar">
          <div 
            class="skill-progress"
            style="width: ${level}%">
          </div>
        </div>

        <span>${level}%</span>
      </div>
    `;
    })
    .join('');

  skillsList.innerHTML = skillsHtml;
};

// ============================================
// SOCIAL LINKS
// ============================================

const renderSocials = () => {
  const { socials } = VirtualTouristGuideAppData;

  const socialsHtml = socials
    .map(social => {
      const { platform, url, icon } = social;

      return `
      <a href="${url}" target="_blank">
        ${icon} ${platform}
      </a>
    `;
    })
    .join('');

  socialLinks.innerHTML = socialsHtml;
};

// ============================================
// STATS
// ============================================

const renderStats = () => {
  const { stats } = VirtualTouristGuideAppData;

  const statsArray = [

    { label: 'Total de usuarios', value: stats.totalUsers },
    { label: 'Usuarios activos', value: stats.activeUsers },
    { label: 'Destinos', value: stats.destinations },
    { label: 'Rating', value: stats.rating }
  ];

  const statsHtml = statsArray
    .map(stat => `
      <div class="stat-item">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `)
    .join('');

  statsContainer.innerHTML = statsHtml;
};

// ============================================
// THEME
// ============================================

const toggleThemeHandler = () => {
  const current = document.documentElement.dataset.theme ?? 'light';

  const newTheme = current === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;

  themeToggle.querySelector('.theme-icon').textContent =
    newTheme === 'dark' ? '☀️' : '🌙';

  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const saved = localStorage.getItem('theme') ?? 'light';

  document.documentElement.dataset.theme = saved;

  themeToggle.querySelector('.theme-icon').textContent =
    saved === 'dark' ? '☀️' : '🌙';
};

// ============================================
// COPY
// ============================================

const copyEmail = () => {
  const { contact } = VirtualTouristGuideAppData;

  navigator.clipboard.writeText(contact.email);

  showToast('Email copiado ✅');
};

// ============================================
// TOAST
// ============================================

const showToast = message => {
  toastMessage.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// TOGGLE SKILLS
// ============================================

let showingAllSkills = false;

const toggleSkillsHandler = () => {
  showingAllSkills = !showingAllSkills;

  renderSkills(showingAllSkills);

  toggleSkills.textContent = showingAllSkills
    ? 'Show Less'
    : 'Show More';
};

// ============================================
// INIT
// ============================================

const init = () => {
  loadTheme();

  renderBasicInfo();
  renderSkills();
  renderSocials();
  renderStats();

  console.log('✅ App cargada correctamente');
};

// ============================================
// EVENTS
// ============================================

themeToggle.addEventListener('click', toggleThemeHandler);
copyEmailBtn.addEventListener('click', copyEmail);
toggleSkills.addEventListener('click', toggleSkillsHandler);

// ============================================
// START
// ============================================

init();
