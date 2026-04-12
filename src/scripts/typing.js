const ROLES = [
  'Full Stack Engineer',
  'Engineering Leader',
  'Platform Architect',
  'AI-Powered Developer',
  'Team Builder & Mentor',
];

export function startTyping() {
  const tel = document.getElementById('typed');
  let ri = 0, ci = 0, del = false, tw = 0;

  function tick() {
    const r = ROLES[ri];
    if (!del) {
      tel.textContent = r.slice(0, ++ci);
      if (ci === r.length) { del = true; tw = 60; }
    } else {
      if (tw-- > 0) { setTimeout(tick, 28); return; }
      tel.textContent = r.slice(0, --ci);
      if (!ci) { del = false; ri = (ri + 1) % ROLES.length; }
    }
    setTimeout(tick, del ? 36 : 85);
  }
  tick();
}

const SC = '!@#$%^&*<>[]{}ブフネシパタニABCDEF01234';

export function initScramble() {
  document.querySelectorAll('.glitch').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const orig = el.dataset.t;
      let i = 0;
      const iv = setInterval(() => {
        el.textContent = orig
          .split('')
          .map((c, j) => (j < i ? c : SC[Math.floor(Math.random() * SC.length)]))
          .join('');
        if (++i > orig.length) { el.textContent = orig; clearInterval(iv); }
      }, 38);
    });
  });
}
