// ---------- i18n (ES por defecto en el HTML, EN aquí) ----------
const EN = {
  title: 'Antonio Armenteros · Computer Engineering',
  desc: 'Portfolio of Antonio Armenteros, Computer Engineering student at the University of Jaén.',
  burger: 'Open menu',
  'nav.about': 'About me', 'nav.projects': 'Projects', 'nav.cv': 'Download CV',
  'hero.hello': "Hi, I'm", 'hero.role': 'Computer Engineering student at the University of Jaén',
  'hero.btn1': 'View projects', 'hero.btn2': 'Download CV', 'hero.alt': 'Portrait of Antonio Armenteros',
  'about.title': 'Passionate about computing since I was a kid',
  'about.p1': "I've always loved tinkering with computers and devices, which led me to study Computer Engineering at the University of Jaén.",
  'about.p2': "During my studies I'm gaining a comprehensive understanding of computer science principles and building solid programming skills. I've worked with Python, Java and C++, and have experience with Git, SQL databases and web application development.",
  'about.p3': "I've taken part in projects to recreate a University of Jaén building in 3D, implement search algorithms and game theory with AI in Pacman, and build a personal wellness web app for the gym.",
  'about.p4': 'My goal is to keep growing professionally in an environment that challenges me and lets me contribute my skills to building innovative solutions.',
  'social.title': 'Find me on',
  'proj.title': 'Projects', 'proj.filter': 'Filter projects', 'proj.code': 'View code',
  'f.all': 'All', 'f.ai': 'AI', 'f.web': 'Web', 'f.graphics': '3D graphics',
  'cat.graphics': '3D graphics', 'cat.ai': 'Artificial intelligence', 'cat.web': 'Web app',
  'p1.d': 'Recreation of the University of Jaén A4 building with OpenGL and C++.', 'p1.alt': 'UJA A4 building',
  'p2.d': 'Implementation of search algorithms and game theory.', 'p2.alt': 'Pacman screenshot',
  'p3.d': 'Real-time object detection with YOLOv8 and OpenCV.', 'p3.alt': 'Object detection',
  'p4.d': 'Web application for personal wellness.', 'p4.alt': 'TERCFIT screenshot'
};
const meta = document.querySelector('meta[name=description]');
const ES = { title: document.title, desc: meta.content, burger: 'Abrir menú' };
const $$ = s => document.querySelectorAll(s);

// guarda el texto original (español) de cada elemento
$$('[data-i18n]').forEach(e => ES[e.dataset.i18n] = e.textContent);
$$('[data-i18n-alt]').forEach(e => ES[e.dataset.i18nAlt] = e.alt);
$$('[data-i18n-aria]').forEach(e => ES[e.dataset.i18nAria] = e.getAttribute('aria-label'));

function setLang(l) {
  const d = l === 'en' ? EN : ES;
  document.documentElement.lang = l;
  document.title = d.title; meta.content = d.desc;
  $$('[data-i18n]').forEach(e => e.textContent = d[e.dataset.i18n]);
  $$('[data-i18n-alt]').forEach(e => e.alt = d[e.dataset.i18nAlt]);
  $$('[data-i18n-aria]').forEach(e => e.setAttribute('aria-label', d[e.dataset.i18nAria]));
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  try { localStorage.setItem('lang', l); } catch (_) {}
}
$$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
let saved = null; try { saved = localStorage.getItem('lang'); } catch (_) {}
setLang(saved || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en'));

// ---------- menú móvil ----------
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
});

// ---------- filtros del portfolio ----------
const buttons = $$('.filters button');
const cards = $$('.card');
buttons.forEach(b => b.addEventListener('click', () => {
  buttons.forEach(x => x.classList.toggle('on', x === b));
  cards.forEach(c => { c.hidden = b.dataset.f !== 'all' && c.dataset.c !== b.dataset.f; });
}));

document.getElementById('y').textContent = new Date().getFullYear();
