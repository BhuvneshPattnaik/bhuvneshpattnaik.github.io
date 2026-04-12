export function initCursor() {
  const cur = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let cx = 0, cy = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', (e) => {
    cx = e.clientX; cy = e.clientY;
    cur.style.left = cx + 'px';
    cur.style.top = cy + 'px';
  });

  (function animCur() {
    tx += (cx - tx) * 0.14;
    ty += (cy - ty) * 0.14;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animCur);
  })();

  document.querySelectorAll('a,button,.bs-card,.pc,.tl-item,.sn-dot').forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('link-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('link-hover'));
  });
}
