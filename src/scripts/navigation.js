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

function isMobile() { return window.innerWidth <= 768; }
function hasOverflow(el) { return el.scrollHeight > el.clientHeight + 5; }
function isAtTop(el) { return el.scrollTop <= 2; }
function isAtBottom(el) { return el.scrollTop + el.clientHeight >= el.scrollHeight - 2; }

export function initNav(onSectionEnter) {
  secs = document.querySelectorAll('.sec');
  dots = document.querySelectorAll('.sn-dot');
  onEnterCallbacks = onSectionEnter || {};

  // Dot nav
  dots.forEach((d) => d.addEventListener('click', () => goTo(+d.dataset.i)));

  // Wheel — boundary-aware on mobile
  let wheelCooldown = false;
  window.addEventListener('wheel', (e) => {
    if (wheelCooldown || busy) return;
    const sec = secs[curSec];
    if (isMobile() && hasOverflow(sec)) {
      if (e.deltaY > 0 && !isAtBottom(sec)) return;
      if (e.deltaY < 0 && !isAtTop(sec)) return;
    }
    wheelCooldown = true;
    setTimeout(() => (wheelCooldown = false), 300);
    e.deltaY > 0 ? goTo(curSec + 1) : goTo(curSec - 1);
  }, { passive: true });

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); goTo(curSec + 1); }
    if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); goTo(curSec - 1); }
  });

  // Touch — boundary-aware: only navigate when at scroll boundaries
  let touchY = 0;
  let touchSec = null;
  window.addEventListener('touchstart', (e) => {
    touchY = e.touches[0].clientY;
    touchSec = secs[curSec];
  }, { passive: true });
  window.addEventListener('touchend', (e) => {
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) < 50) return;
    if (touchSec && hasOverflow(touchSec)) {
      // Swiping up (next section) — only if at bottom
      if (dy > 0 && !isAtBottom(touchSec)) return;
      // Swiping down (prev section) — only if at top
      if (dy < 0 && !isAtTop(touchSec)) return;
    }
    dy > 0 ? goTo(curSec + 1) : goTo(curSec - 1);
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

  toEl.scrollTop = 0;
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
