export function initLoader(onDone) {
  const MSGS = ['compiling...', 'loading assets...', 'initializing 3D...', 'calibrating cursor...', 'ready!'];
  let pct = 0, mi = 0;
  const fill = document.getElementById('ld-fill');
  const line = document.getElementById('ld-line');

  const ldIv = setInterval(() => {
    pct += Math.random() * 5 + 2;
    if (pct > 100) pct = 100;
    fill.style.width = pct + '%';
    const ni = Math.floor(pct / 20);
    if (ni > mi && ni < MSGS.length) line.textContent = MSGS[(mi = ni)];
    if (pct >= 100) {
      clearInterval(ldIv);
      setTimeout(() => {
        document.getElementById('loader').classList.add('done');
        if (typeof onDone === 'function') onDone();
      }, 500);
    }
  }, 55);
}
