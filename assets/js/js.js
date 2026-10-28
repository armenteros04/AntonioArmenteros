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
  'p3.d': 'Real-time detection in a traffic system.', 'p3.alt': 'Object detection',
  'p4.d': 'Web application for personal wellness.', 'p4.alt': 'TERCFIT screenshot',
  'proj.more': 'More information', 'proj.public': 'Public code', 'm.private': 'Private code', 'm.close': 'Close',
  'm.about': 'Overview', 'm.viewphotos': 'View photos', 'm.shots': 'Screenshots',
  'm.zoom': 'Enlarge image', 'm.viewer': 'Image viewer', 'm.prev': 'Previous', 'm.next': 'Next',
  'p3.t': 'Object detection', 'tag.ai': 'AI',
  'tfg.t': 'Final Degree Project',
  'tfg.d': 'Web platform based on computer vision for football video analysis.',
  'tfg.c1': 'Main menu', 'tfg.c2': 'Analysed final video', 'tfg.c3': 'Heatmaps',
  'tfg.c4': 'Passing graphs', 'tfg.c5': 'Performance sheet', 'tfg.c6': 'Strategic study',
  'tfg.a1': 'Web application that automatically analyses videos of Real Jaén CF matches. From a clip, an artificial intelligence pipeline detects and tracks players, goalkeepers, referees and the ball, assigns teams and roles, projects the players onto a minimap of the pitch and computes metrics.',
  'tfg.a2': 'The results (annotated videos, heatmaps, graphs, player reports and tactical study) are viewed from a web dashboard that also includes the season calendar with its statistics.',
  'tfg.a3': 'The application is split into three parts:',
  'tfg.n1': 'Frontend', 'tfg.u1': 'HTML and JavaScript. This is what the user sees.',
  'tfg.n2': 'Backend', 'tfg.u2': 'Python (FastAPI). Exposes a REST API and launches the analyses.',
  'tfg.n3': 'AI pipeline', 'tfg.u3': 'main.py. Does the heavy lifting on the video.',
  'tfg.a4': 'Season data is stored in a SQLite database.'
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

// ---------- ventana modal de proyectos ----------
$$('[data-open]').forEach(c => c.addEventListener('click', () => {
  const m = document.getElementById(c.dataset.open);
  m.showModal(); m.scrollTop = 0;
}));
$$('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) m.close(); });
});
// si falta una imagen, se oculta en lugar de mostrar el icono roto
$$('.thumb img, .shots img').forEach(i => i.addEventListener('error', () => {
  const f = i.closest('figure'); f ? f.remove() : i.style.visibility = 'hidden';
}));

// ---------- visor de imágenes (ampliar capturas) ----------
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
const lbStage = lb.querySelector('.lb-stage');
let shots = [], cur = 0;

function showShot(i) {
  cur = (i + shots.length) % shots.length;
  const fig = shots[cur], im = fig.querySelector('img');
  lbImg.src = im.currentSrc || im.src;
  lbImg.alt = im.alt;
  lbCap.textContent = fig.querySelector('figcaption').textContent + ' · ' + (cur + 1) + '/' + shots.length;
  lbStage.classList.remove('zoomed');
  lbStage.scrollTo(0, 0);
}
function openViewer(figs, i) {
  shots = figs;
  lb.classList.toggle('single', shots.length < 2);
  lb.showModal();
  showShot(i);
}
// clic en una foto: abre el visor en esa foto
$$('[data-zoom]').forEach(b => b.addEventListener('click', () => {
  const figs = [...b.closest('.shots').querySelectorAll('figure')];
  openViewer(figs, figs.indexOf(b.closest('figure')));
}));
// botón "Ver fotos": abre el visor directamente en la primera foto
$$('[data-gallery]').forEach(b => b.addEventListener('click', () => {
  const figs = [...document.getElementById(b.dataset.gallery).querySelectorAll('.shots figure')];
  if (figs.length) openViewer(figs, 0);
}));
lb.querySelector('.lb-prev').addEventListener('click', () => showShot(cur - 1));
lb.querySelector('.lb-next').addEventListener('click', () => showShot(cur + 1));
lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
lbImg.addEventListener('click', () => lbStage.classList.toggle('zoomed'));   // clic: tamaño real / ajustar
lb.addEventListener('click', e => { if (e.target === lb || e.target === lbStage) lb.close(); });
lb.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') showShot(cur - 1);
  if (e.key === 'ArrowRight') showShot(cur + 1);
});
