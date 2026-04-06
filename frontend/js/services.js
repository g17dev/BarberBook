// Tabs
const tabs = document.querySelectorAll(".tab-button");

// Container
const container = document.getElementById("services-container");

// Data
const services = {
  corte: [
    {
      id: 1,
      name: "Fade",
      description: "Corte moderno degradado",
      price: 120,
      time: 60,
      icon: "fa-solid fa-scissors",
      check: false
    },
    {
      id: 2,
      name: "Clásico",
      description: "Corte tradicional",
      price: 100,
      time: 60,
      icon: "fa-solid fa-user",
      check: false
    }
  ],
  barba: [
    {
      id: 3,
      name: "Barba completa",
      description: "Arreglo profesional",
      price: 80,
      time: 40,
      icon: "fa-solid fa-user-beard",
      check: false
    }
  ],
  facial: [
    {
      id: 4,
      name: "Limpieza facial",
      description: "Cuidado de piel",
      price: 150,
      time: 50,
      icon: "fa-solid fa-face-smile",
      check: false
    }
  ],
  combos: [
    {
      id: 5,
      name: "Corte + barba",
      description: "Servicio completo",
      price: 180,
      time: 90,
      icon: "fa-solid fa-star",
      check: false
    }
  ]
};

// Tabs click
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.dataset.tab;

    renderServices(category);   // 🧱 render limpio
    animateCards();             // 🎬 animación entrada
  });
});

// Render
function renderServices(category) {
  container.innerHTML = "";

  services[category].forEach(service => {
    const card = document.createElement("div");
    card.classList.add("service-card");

    card.innerHTML = `
      <div class="service-card-inner ${service.check ? "selected" : ""}">
        <div class="service-top">
          <i class="${service.icon} service-icon"></i>
          ${service.check ? '<i class="fa-solid fa-circle-check check"></i>' : ""}
        </div>

        <div class="service-description">
          <h3>${service.name}</h3>
          <p>${service.description}</p>
        </div>

        <div class="service-info">
          <span class="service-price">$${service.price}</span>
          <span class="service-timer">${service.time}MIN</span>
        </div>
      </div>
    `;

    // 👉 manejar selección independiente
    handleCardSelection(card, service, category);

    container.appendChild(card);
  });
}

function animateCards() {
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 70);
  });
}

function handleCardSelection(card, service, category) {
  card.addEventListener("click", () => {
  service.check = !service.check;

  const inner = card.querySelector(".service-card-inner");
  inner.classList.toggle("selected");

  let check = card.querySelector(".check");

  if (service.check && !check) {
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-circle-check check";
    icon.style.color = "#9e0020";

    card.querySelector(".service-top").appendChild(icon);
  } else if (!service.check && check) {
    check.remove();
  }
});
}

renderServices();
animateCards();