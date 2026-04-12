export function initCards3D() {
  document.querySelectorAll('.pc, .sk-group, .bs-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / r.height) * -8;
      const ry = ((x - r.width / 2) / r.width) * 8;
      card.style.setProperty('--rx', rx + 'deg');
      card.style.setProperty('--ry', ry + 'deg');
      card.style.setProperty('--mx', (x / r.width) * 100 + '%');
      card.style.setProperty('--my', (y / r.height) * 100 + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.cssText = '';
    });
  });
}
