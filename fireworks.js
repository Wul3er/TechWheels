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

    const hue = Math.random() * 360;
    const color = `hsl(${hue}, 100%, 50%)`;
    const size = Math.random() * 3 + 2;

    particles.push({x, y, vx, vy, size, color, alpha: 1});
  }

  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;

      ctx.fillStyle = `rgba(${hslToRgb(p.color)}, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (p.alpha <= 0) particles.splice(i, 1);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    updateParticles();
    // Create new particles from logo center
    if (Math.random() < 0.3) createParticle();
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Convert HSL string to RGB for canvas
function hslToRgb(hsl) {
  const h = parseFloat(hsl.match(/hsl\((\d+),/)[1]);
  const s = parseFloat(hsl.match(/, (\d+)%/)[1]) / 100;
  const l = parseFloat(hsl.match(/, (\d+)%\)/)[1]) / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if(h<60){r=c;g=x;b=0;}
  else if(h<120){r=x;g=c;b=0;}
  else if(h<180){r=0;g=c;b=x;}
  else if(h<240){r=0;g=x;b=c;}
  else if(h<300){r=x;g=0;b=c;}
  else{r=c;g=0;b=x;}

  r = Math.round((r+m)*255);
  g = Math.round((g+m)*255);
  b = Math.round((b+m)*255);

  return `${r},${g},${b}`;
}
