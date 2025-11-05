// ========================================
// CONFIGURAÇÃO DOS HORÁRIOS DA BARBEARIA
// ========================================
// Aqui você define os horários de funcionamento
// Formato: { abertura: "09:00", fechamento: "20:00" }
// Para dia fechado, use: null

const horariosFuncionamento = {
  0: null, // Domingo - FECHADO
  1: { abertura: "09:00", fechamento: "20:00" }, // Segunda
  2: { abertura: "09:00", fechamento: "20:00" }, // Terça
  3: { abertura: "09:00", fechamento: "20:00" }, // Quarta
  4: { abertura: "09:00", fechamento: "20:00" }, // Quinta
  5: { abertura: "09:00", fechamento: "20:00" }, // Sexta
  6: { abertura: "09:00", fechamento: "18:00" }, // Sábado
};

// Nomes dos dias da semana
const diasDaSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// ========================================
// FUNÇÃO: VERIFICAR SE ESTÁ ABERTO AGORA
// ========================================
// Esta função verifica em TEMPO REAL se a barbearia está aberta
function verificarStatusAtual() {
  // Pega a data e hora atual
  const agora = new Date();
  const diaAtual = agora.getDay(); // 0 = Domingo, 1 = Segunda, etc
  const horaAtual = agora.getHours();
  const minutoAtual = agora.getMinutes();

  // Converte hora atual para minutos (facilita comparação)
  const minutosTotais = horaAtual * 60 + minutoAtual;

  // Pega o horário do dia atual
  const horarioDia = horariosFuncionamento[diaAtual];

  // Seleciona os elementos HTML que vamos atualizar
  const badge = document.getElementById("statusBadge");
  const statusText = document.getElementById("statusText");

  // Se o dia está fechado (null no objeto horariosFuncionamento)
  if (!horarioDia) {
    badge.className = "status-badge closed";
    statusText.textContent = "FECHADO";
    return false;
  }

  // Converte horários de abertura e fechamento para minutos
  const [horaAbertura, minutoAbertura] = horarioDia.abertura
    .split(":")
    .map(Number);
  const [horaFechamento, minutoFechamento] = horarioDia.fechamento
    .split(":")
    .map(Number);

  const minutosAbertura = horaAbertura * 60 + minutoAbertura;
  const minutosFechamento = horaFechamento * 60 + minutoFechamento;

  // Verifica se está dentro do horário de funcionamento
  if (minutosTotais >= minutosAbertura && minutosTotais < minutosFechamento) {
    badge.className = "status-badge open";
    statusText.textContent = "ABERTO AGORA";
    return true;
  } else {
    badge.className = "status-badge closed";
    statusText.textContent = "FECHADO";
    return false;
  }
}

// ========================================
// FUNÇÃO: CRIAR GRADE DE HORÁRIOS
// ========================================
// Cria os cards com os horários de cada dia da semana
function criarGradeHorarios() {
  const grid = document.getElementById("scheduleGrid");
  const diaAtual = new Date().getDay();

  // Loop por todos os dias da semana (0 a 6)
  for (let dia = 0; dia < 7; dia++) {
    // Cria o card do dia
    const card = document.createElement("div");
    card.className = "schedule-day";

    // Marca o dia atual com classe especial
    if (dia === diaAtual) {
      card.classList.add("today");
    }

    // Título do dia
    const titulo = document.createElement("h3");
    titulo.textContent = diasDaSemana[dia];

    // Horário do dia
    const horario = document.createElement("p");
    const horarioDia = horariosFuncionamento[dia];

    // Se está fechado neste dia
    if (!horarioDia) {
      horario.textContent = "Fechado";
      horario.style.color = "#999";
    } else {
      horario.textContent = `${horarioDia.abertura} às ${horarioDia.fechamento}`;
    }

    // Adiciona elementos ao card
    card.appendChild(titulo);
    card.appendChild(horario);

    // Adiciona card à grade
    grid.appendChild(card);
  }
}

// ========================================
// FUNÇÃO: SCROLL SUAVE PARA SEÇÕES
// ========================================
function scrollToContact() {
  const section = document.getElementById("contact");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToServices() {
  const section = document.getElementById("services");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// ========================================
// FUNÇÃO: ABRIR WHATSAPP
// ========================================
function openWhatsApp() {
  // IMPORTANTE: Trocar pelo número real do cliente
  // Formato: código do país + DDD + número (sem espaços, traços ou parênteses)
  const telefone = "5571987654321";

  // Mensagem que será enviada automaticamente
  const mensagem = encodeURIComponent(
    "Olá! Gostaria de agendar um horário na Barbearia Império."
  );

  // Monta a URL do WhatsApp
  const url = `https://wa.me/${telefone}?text=${mensagem}`;

  // Abre em nova aba com segurança
  window.open(url, "_blank", "noopener,noreferrer");
}

// ========================================
// FUNÇÕES: MENU HAMBURGUER (MOBILE)
// ========================================
// Abre e fecha o menu mobile
function toggleMenu() {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menuToggle");
  // Adiciona ou remove a classe 'active' que faz o menu aparecer
  menu.classList.toggle("active");
  toggle.classList.toggle("active");
}

// Fecha o menu quando clicar em algum link
function closeMenu() {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menuToggle");
  // Remove as classes 'active'
  menu.classList.remove("active");
  toggle.classList.remove("active"); // CORREÇÃO: estava "classLaist"
}

// Fecha o menu ao clicar fora dele
document.addEventListener("click", function (event) {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menuToggle");

  // Verifica se o clique foi fora do menu e do botão hamburguer
  if (menu && toggle) {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnToggle = toggle.contains(event.target);

    // Se clicou fora e o menu está aberto, fecha o menu
    if (
      !isClickInsideMenu &&
      !isClickOnToggle &&
      menu.classList.contains("active")
    ) {
      closeMenu();
    }
  }
});

// ========================================
// PROTEÇÃO CONTRA CLICKJACKING
// ========================================
// Impede que o site seja carregado dentro de um iframe malicioso
if (window.top !== window.self) {
  window.top.location = window.self.location;
}

// ========================================
// INICIALIZAÇÃO DO SITE
// ========================================
// Executa quando a página carregar completamente
document.addEventListener("DOMContentLoaded", function () {
  // Verifica status inicial
  verificarStatusAtual();

  // Cria a grade de horários
  criarGradeHorarios();

  // Atualiza o status a cada 1 minuto (60000 milissegundos)
  // Isso mantém o badge sempre atualizado em tempo real
  setInterval(verificarStatusAtual, 60000);
});
