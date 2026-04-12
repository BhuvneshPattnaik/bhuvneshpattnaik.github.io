const TOTAL = 6;
const TRANSITIONS = [
  ['fold-out',   'fold-in'],
  ['cube-y-out', 'cube-y-in'],
  ['diag-out',   'diag-in'],
  ['zoom-out',   'zoom-in'],
  ['flip-out',   'flip-in'],
];
const TRANSITIONS_R = [
  ['fold-out',     'fold-in'],
  ['cube-y-out-r', 'cube-y-in-r'],
  ['diag-out-r',   'diag-in-r'],
  ['zoom-out-r',   'zoom-in-r'],
  ['flip-out-r',   'flip-in-r'],
];
const DURATION = [850, 900, 850, 800, 850];

let curSec = 0, busy = false;
let secs, dots;
let onEnterCallbacks = {};

export function initNav(onSectionEnter) {
  secs = document.querySelectorAll('.sec');
  dots = document.querySelectorAll('.sn-dot');
  onEnterCallbacks = onSectionEnter || {};

  // Dot nav
  dots.forEach((d) => d.addEventListener('click', () => goTo(+d.dataset.i)));

  // Wheel
  let wheelCooldown = false;
  window.addEventListener('wheel', (e) => {
    if (wheelCooldown || busy) return;
    wheelCooldown = true;
    setTimeout(() => (wheelCooldown = false), 300);
    e.deltaY > 0 ? goTo(curSec + 1) : goTo(curSec - 1);
  }, { passive: true });

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); goTo(curSec + 1); }
    if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); goTo(curSec - 1); }
  });

  // Touch
  let touchY = 0;
  window.addEventListener('touchstart', (e) => { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchend', (e) => {
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 50) dy > 0 ? goTo(curSec + 1) : goTo(curSec - 1);
  }, { passive: true });
}

export function goTo(next) {
  if (busy || next === curSec || next < 0 || next >= TOTAL) return;
  busy = true;
  const from = curSec, to = next, dir = to > from ? 1 : -1;
  const ti = Math.min(from, to);
  const [exitCls, enterCls] = dir > 0 ? TRANSITIONS[ti] : TRANSITIONS_R[ti];
  const dur = DURATION[ti];
  const fromEl = secs[from], toEl = secs[to];

  toEl.style.opacity = '1';
  toEl.classList.add('entering');
  fromEl.classList.add('exiting', exitCls);
  toEl.classList.add(enterCls);

  setTimeout(() => {
    fromEl.classList.remove('active', 'exiting', exitCls);
    fromEl.style.opacity = '0';
    toEl.classList.remove('entering', enterCls);
    toEl.classList.add('active');
    curSec = to;
    updateNav();
    busy = false;
    if (typeof onEnterCallbacks[to] === 'function') onEnterCallbacks[to]();
  }, dur + 50);
}

function updateNav() {
  dots.forEach((d, i) => d.classList.toggle('active', i === curSec));
  document.getElementById('sec-cur').textContent = String(curSec + 1).padStart(2, '0');
}
