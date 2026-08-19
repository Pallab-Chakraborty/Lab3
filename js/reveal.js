/* ══════════════════════════
   REVEAL ON SCROLL
══════════════════════════ */
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(e => e.forEach(el => {
  if(el.isIntersecting) el.target.classList.add('visible');
}),{threshold:.12});
reveals.forEach(r => ro.observe(r));

