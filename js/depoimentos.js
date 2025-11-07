// ===== DEPOIMENTOS SIMPLIFICADOS COM SWIPE E LIMITE =====

// ARRAY DE DEPOIMENTOS
const testimonials = [
  {
    name: "Carlos Silva",
    photo: "assets/images/cliente1.jpg",
    rating: 5,
    text: "Melhor barbearia da região! Atendimento impecável e profissionais excelentes.",
    clientSince: "Cliente há 3 anos",
  },
  {
    name: "Rafael Oliveira",
    photo: "assets/images/cliente2.jpg",
    rating: 5,
    text: "Ambiente acolhedor e profissionais qualificados. A experiência VIP é sensacional!",
    clientSince: "Cliente há 2 anos",
  },
  {
    name: "Bruno Costa",
    photo: "assets/images/cliente3.jpg",
    rating: 5,
    text: "Preço justo e qualidade excepcional! Recomendo demais!",
    clientSince: "Cliente há 1 ano",
  },
  {
    name: "Lucas Santos",
    photo: "assets/images/cliente4.jpg",
    rating: 5,
    text: "Atendimento diferenciado e ambiente agradável. Virei cliente fiel!",
    clientSince: "Cliente há 6 meses",
  },
];

// Função que gera estrelas
function generateStars(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    i < rating
      ? '<i class="bi bi-star-fill"></i>'
      : '<i class="bi bi-star"></i>'
  ).join("");
}

// Renderiza depoimentos
function renderTestimonials() {
  const track = document.getElementById("testimonialsTrack");
  if (!track) return;

  track.innerHTML = testimonials
    .map(
      (t) => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="client-photo">
            <i id="person-icon" class="bi bi-person"></i>
          </div>
          <div class="client-info">
            <h3>${t.name}</h3>
            <div class="rating">${generateStars(t.rating)}</div>
          </div>
          <div class="quote-icon"><i class="bi bi-quote"></i></div>
        </div>
        <p class="testimonial-text">"${t.text}"</p>
        <span class="testimonial-date">${t.clientSince}</span>
      </div>
    `
    )
    .join("");

  // Garante que o track comece na posição 0
  track.style.transform = "translateX(0)";
}

// Controle de swipe
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

// Função para atualizar a posição do carrossel
function setTranslateX(track, translateX) {
  const maxTranslate = 0;
  const minTranslate = -(track.scrollWidth - track.clientWidth);

  // Limita o deslocamento dentro dos limites
  if (translateX > maxTranslate) translateX = maxTranslate;
  if (translateX < minTranslate) translateX = minTranslate;

  track.style.transform = `translateX(${translateX}px)`;
  currentTranslate = translateX;
}

// Função para lidar com início do arraste
function startDrag(x) {
  isDragging = true;
  startX = x - prevTranslate;
}

// Função para mover o carrossel
function moveDrag(x, track) {
  if (!isDragging) return;
  currentTranslate = x - startX;
  setTranslateX(track, currentTranslate);
}

// Função para encerrar o arraste
function endDrag() {
  isDragging = false;
  prevTranslate = currentTranslate;
}

// Inicialização
function initTestimonials() {
  renderTestimonials();

  const track = document.getElementById("testimonialsTrack");
  if (!track) return;

  // === Eventos de toque (mobile) ===
  track.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX));
  track.addEventListener("touchmove", (e) =>
    moveDrag(e.touches[0].clientX, track)
  );
  track.addEventListener("touchend", endDrag);

  // === Eventos de mouse (desktop) ===
  track.addEventListener("mousedown", (e) => startDrag(e.clientX));
  track.addEventListener("mousemove", (e) => moveDrag(e.clientX, track));
  track.addEventListener("mouseup", endDrag);
  track.addEventListener("mouseleave", () => {
    if (isDragging) endDrag();
  });
}

document.addEventListener("DOMContentLoaded", initTestimonials);
