function startFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const logo = document.querySelector('.logo img');

  function createParticle() {
    const rect = logo.getBoundingClientRect();
    const x = rect.left + rect.width / 2; // center of logo
    const y = rect.top + rect.height / 2;

    const angle = Math.random() * 2 * Math.PI; // random direction
    const speed = Math.random() * 4 + 2; // random speed
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const size = Math.random() * 3 + 2;

    particles.push({ x, y, vx, vy, size, color: `rgb(${r},${g},${b})`, alpha: 1 });
  }

  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;

      const rgb = p.color.slice(4, -1); // remove 'rgb(' and ')'
      ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
      ctx.beginPath();
