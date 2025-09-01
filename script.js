/* ========= Config Rápida ========= */
const CONFIG = {
  nome: "Pietro Moliani",
  typedStrings: ["Pietro Moliani", "Desenvolvedor Web", "Front-end • HTML • CSS • JS"],
  email: "pietrosilvamoliani@gmail.com",
  fotoURL: "https://via.placeholder.com/400" // troque para a URL da sua foto
};

/* ========= Ano no footer ========= */
document.getElementById("year").textContent = new Date().getFullYear();

/* ========= Preenche nome e e-mail ========= */
document.title = `Portfólio Criativo | ${CONFIG.nome}`;
document.querySelectorAll(".footer-logo").forEach(el => el.textContent = CONFIG.nome);
document.getElementById("ownerEmail").textContent = CONFIG.email;

/* ========= Typed effect ========= */
(function typedEffect() {
  const el = document.getElementById("typed");
  const seq = CONFIG.typedStrings;
  let i = 0, j = 0, deleting = false;

  function type() {
    const word = seq[i];
    el.textContent = word.substring(0, j);

    if (!deleting && j < word.length) j++;
    else if (!deleting && j === word.length) { deleting = true; setTimeout(type, 1100); return; }
    else if (deleting && j > 0) j--;
    else { deleting = false; i = (i + 1) % seq.length; }

    const speed = deleting ? 35 : 70;
    setTimeout(type, speed);
  }
  type();
})();

/* ========= Partículas de fundo (canvas dentro de #particles-js) ========= */
(function particles() {
  const container = document.getElementById("particles-js");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  container.appendChild(canvas);

  let w, h, dpr, particles = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    init();
  }

  function init() {
    const count = Math.floor((w * h) / (14000 * dpr));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.6 + 0.2,
      c: ["#6c5ce7", "#00cec9", "#00ffaa"][Math.floor(Math.random() * 3)]
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.a += 0.002;
      p.x += Math.cos(p.a) * p.s;
      p.y += Math.sin(p.a) * p.s;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  resize(); tick();
})();

/* ========= Tilt 3D suave nos cards ========= */
(function tilt3D() {
  const maxTilt = 8;
  document.querySelectorAll(".tilt, .project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -maxTilt;
      const ry = ((x / r.width) - 0.5) * maxTilt;
      card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-10px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();

/* ========= Scroll suave nos links internos ========= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
  });
});

/* ========= Formulário (mock) ========= */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message").value.trim();
  alert(`Obrigado, ${name}!\n\nRecebi sua mensagem:\n"${msg}"\nEntrarei em contato no e-mail: ${email}\n\n(Conecte aqui com seu backend/serviço de e-mail)`);
  e.target.reset();
});

/* ========= Avatar: pausar/retomar rotação ao passar o mouse ========= */
(function avatarHover() {
  const cube = document.getElementById("avatarCube");
  let paused = false;
  cube.addEventListener("mouseenter", () => { cube.style.animationPlayState = "paused"; paused = true; });
  cube.addEventListener("mouseleave", () => { cube.style.animationPlayState = "running"; paused = false; });
  // toque em dispositivos móveis
  cube.addEventListener("click", () => {
    paused = !paused;
    cube.style.animationPlayState = paused ? "paused" : "running";
  });
})();

/* ========= Substitui imagem se configurada ========= */
(function setPhoto() {
  if (!CONFIG.fotoURL) return;
  const img = document.querySelector(".avatar-face.front img");
  if (img) img.src = CONFIG.fotoURL;
})();
