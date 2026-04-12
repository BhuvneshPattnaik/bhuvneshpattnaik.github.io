import { goTo } from './navigation.js';

const CMDS = {
  help: () => [{ c: 'i', t: 'Commands: whoami | skills | exp | contact | projects | hire | nav | clear' }],
  whoami: () => [
    { c: 's', t: 'Bhuvnesh Pattnaik — Full Stack Engineer & Leader' },
    { c: '',  t: '8+ yrs · Glasgow, UK · No Sponsorship' },
    { c: '',  t: 'AI tools: Claude AI, Cursor AI, GitHub Copilot' },
  ],
  skills: () => [
    { c: 'i', t: 'Stack:' },
    { c: '',  t: '  Backend  → Java, Spring Boot, Node.js' },
    { c: '',  t: '  Frontend → ReactJS, Vue.js, React Native' },
    { c: '',  t: '  DB       → MySQL, MongoDB, Redis' },
    { c: '',  t: '  Cloud    → AWS, GCP, Docker, Kafka' },
    { c: 's', t: '  AI       → Claude AI ★, Cursor AI ★' },
  ],
  exp: () => [
    { c: 'i', t: 'Experience:' },
    { c: 's', t: '  Hotel Trader  2024-Now  Senior SWE' },
    { c: '',  t: '  Shypmax      2022-23   Assoc. Eng Manager' },
    { c: '',  t: '  Shyplite     2019-22   Software Dev' },
    { c: '',  t: '  Daphnis      2017-19   TL → Dev → Intern' },
  ],
  contact: () => [
    { c: 's', t: '📧 bhuvnesh.pattnaik@gmail.com' },
    { c: '',  t: '📱 +44 7351222837' },
    { c: '',  t: '🔗 linkedin.com/in/bhuvneshpattnaik' },
  ],
  projects: () => [
    { c: 'i', t: 'Projects:' },
    { c: 's', t: '  Shypmax-Club → 2K+ users, App+Play Store' },
    { c: '',  t: '  FinTrack     → fintrack.light2glow.com' },
    { c: '',  t: '  Splitzy      → splitzy.light2glow.com' },
  ],
  hire: () => [
    { c: 's', t: 'Why Bhuvnesh? 👇' },
    { c: '',  t: '  ▸ 8+ yrs real production experience' },
    { c: '',  t: '  ▸ 15K+ orders/day platforms' },
    { c: '',  t: '  ▸ 9+ person teams from scratch' },
    { c: '',  t: '  ▸ 3× growth in one year' },
    { c: 's', t: '  → bhuvnesh.pattnaik@gmail.com' },
  ],
  nav: () => [
    { c: 'i', t: 'Navigation: scroll / arrow keys / side dots' },
    { c: '',  t: '  Transitions: fold→cube→diagonal→zoom→flip' },
  ],
  clear: () => 'CLR',
};

export function initTerminal() {
  const tmod = document.getElementById('tmod');
  const tout = document.getElementById('t-out');
  const tinp = document.getElementById('tinp');
  const hist = [];
  let hi = -1;

  const openT  = () => { tmod.classList.add('open'); tinp.focus(); };
  const closeT = () => tmod.classList.remove('open');

  document.getElementById('term-btn').addEventListener('click', openT);
  document.getElementById('t-close').addEventListener('click', closeT);
  tmod.addEventListener('click', (e) => { if (e.target === tmod) closeT(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeT();
    if ((e.ctrlKey || e.metaKey) && e.key === '`') { e.preventDefault(); openT(); }
  });

  tinp.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp')   { if (hi < hist.length - 1) tinp.value = hist[++hi] || ''; e.preventDefault(); return; }
    if (e.key === 'ArrowDown') { hi > 0 ? (tinp.value = hist[--hi]) : ((hi = -1), (tinp.value = '')); e.preventDefault(); return; }
    if (e.key !== 'Enter') return;

    const cmd = tinp.value.trim().toLowerCase();
    if (!cmd) return;
    hist.unshift(cmd); hi = -1;

    const echo = document.createElement('div');
    echo.className = 'to';
    echo.innerHTML = `<span style="color:var(--teal)">$</span> ${cmd}`;
    tout.appendChild(echo);
    tinp.value = '';

    // Handle nav shortcuts
    const navMap = { hero: 0, about: 1, skills: 2, experience: 2, projects: 4, contact: 5 };
    if (cmd.startsWith('nav ')) {
      const target = cmd.slice(4).trim();
      if (navMap[target] !== undefined) { closeT(); goTo(navMap[target]); return; }
    }

    const fn = CMDS[cmd];
    if (fn) {
      const r = fn();
      if (r === 'CLR') {
        tout.innerHTML = '';
      } else {
        r.forEach((l) => {
          const d = document.createElement('div');
          d.className = 'to' + (l.c ? ' ' + l.c : '');
          d.textContent = l.t;
          tout.appendChild(d);
        });
      }
    } else {
      const d = document.createElement('div');
      d.className = 'to e';
      d.textContent = `command not found: ${cmd}. Type 'help'`;
      tout.appendChild(d);
    }
    tout.scrollTop = tout.scrollHeight;
  });
}
