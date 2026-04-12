import { EXP } from '../data/experience.js';

export function showExp(i) {
  const d = EXP[i];
  const el = document.getElementById('exp-detail');
  el.style.opacity = '0';
  el.style.transform = 'translateX(20px)';
  setTimeout(() => {
    el.innerHTML = `
      <div class="ed-badge">${d.badge}</div>
      <div class="ed-title">${d.title}</div>
      <div class="ed-co">${d.co}</div>
      <div class="ed-desc">${d.desc}</div>
      <ul class="ed-buls">${d.buls.map((b) => `<li>${b}</li>`).join('')}</ul>
      <div class="ed-stack">${d.stack.map((t) => `<span class="ed-tag">${t}</span>`).join('')}</div>
    `;
    el.style.transition = 'opacity .4s, transform .4s';
    el.style.opacity = '1';
    el.style.transform = 'none';
  }, 150);
  document.querySelectorAll('.tl-item').forEach((it, j) => it.classList.toggle('sel', j === i));
}

export function initExperience() {
  document.getElementById('exp-tl').addEventListener('click', (e) => {
    const item = e.target.closest('.tl-item');
    if (item) showExp(+item.dataset.i);
  });
  showExp(0);
}

let countered = false;
export function animateCounters() {
  if (countered) return;
  countered = true;
  document.querySelectorAll('.counter').forEach((el) => {
    const to = +el.dataset.to, suf = el.dataset.suf || '';
    let c = 0;
    const iv = setInterval(() => {
      c += to / 50;
      if (c >= to) { c = to; clearInterval(iv); }
      el.textContent = Math.round(c) + suf;
    }, 28);
  });
}

export function animateBars() {
  document.querySelectorAll('.sbf').forEach((el) => {
    el.style.width = el.dataset.w + '%';
  });
}
