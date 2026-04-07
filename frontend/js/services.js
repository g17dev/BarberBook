// Data
const services = {
  corte: [
    { id: 1, name: "Fade", description: "Corte moderno degradado", price: 120, time: 60, icon: "fa-solid fa-scissors", check: false },
    { id: 2, name: "Clásico", description: "Corte tradicional", price: 100, time: 60, icon: "fa-solid fa-user", check: false }
  ],
  barba: [
    { id: 3, name: "Barba completa", description: "Arreglo profesional", price: 80, time: 40, icon: "fa-solid fa-user-beard", check: false }
  ],
  facial: [
    { id: 4, name: "Limpieza facial", description: "Cuidado de piel", price: 150, time: 50, icon: "fa-solid fa-face-smile", check: false }
  ],
  combos: [
    { id: 5, name: "Corte + barba", description: "Servicio completo", price: 180, time: 90, icon: "fa-solid fa-star", check: false }
  ]
};

// Selectores
const tabs = document.querySelectorAll(".tab-button");
const container = document.getElementById("services-container");

// --- FUNCIONES CORE ---

function renderServices(category) {
  // Verificación de seguridad para evitar el error 'undefined'
  if (!category || !services[category]) {
    
  }
  else {
    container.innerHTML = "";

  services[category].forEach(service => {
    const card = document.createElement("div");
    card.classList.add("service-card");

    card.innerHTML = `
      <div class="service-card-inner ${service.check ? "selected" : ""}">
        <div class="service-top">
          <i class="${service.icon} service-icon"></i>
          ${service.check ? '<i class="fa-solid fa-circle-check check" style="color: #9e0020;"></i>' : ""}
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

    handleCardSelection(card, service, category);
    container.appendChild(card);
  });
  }
}

function handleCardSelection(card, service, category) {
  card.addEventListener("click", () => {
    service.check = !service.check;
    
    // 1. Dibujamos las tarjetas de nuevo
    renderServices(category);
    
    // 2. ¡IMPORTANTE! Las tarjetas nuevas nacen ocultas, hay que animarlas:
    const cards = document.querySelectorAll(".service-card");
    cards.forEach(c => c.classList.add("show")); // Las mostramos de golpe sin delay para que sea fluido
    
    // 3. Actualizamos el footer
    calcularYActualizar();
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

function calcularYActualizar() {
  let cantidadTotal = 0;
  let precioTotal = 0;

  Object.values(services).forEach(categoria => {
    categoria.forEach(servicio => {
      if (servicio.check) {
        cantidadTotal++;
        precioTotal += servicio.price;
      }
    });
  });

  actualizarResumen(cantidadTotal, precioTotal);
}

function actualizarResumen(cantidad, precio) {
  const footer = document.querySelector(".footer");
  const container = document.getElementById("services-container"); // Usamos el contenedor
  const elCantidad = document.getElementById('cantidad');
  const elTotal = document.getElementById('total');
  let textoCantidad = "";

  if (cantidad > 0) {
    footer.classList.add('visible');
    container.style.paddingBottom = "50px";
    textoCantidad = (cantidad === 1) 
      ? "1 Servicio Seleccionado" 
      : `${cantidad} Servicios Seleccionados`;
  } else {
    footer.classList.remove('visible');
    container.style.paddingBottom = "0px";
  }

  if (elCantidad && elTotal) {
    elCantidad.textContent = textoCantidad;
    elTotal.textContent = precio.toFixed(2);
  }
}

function resetearTodo() {
  // 1. Reset lógico
  Object.keys(services).forEach(key => {
    services[key].forEach(s => s.check = false);
  });

  // 2. Visual: Detectar pestaña activa para limpiar cards
  const activeTab = document.querySelector(".tab-button.active");
  const categoriaActual = activeTab ? activeTab.dataset.tab : "corte";
  renderServices(categoriaActual);

  // 3. Reset footer
  calcularYActualizar();
}

// --- EVENTOS ---

// Delegación para botón cancelar
document.addEventListener("click", (event) => {
  if (event.target.closest(".cancel")) {
    resetearTodo();
  }
});

// Click en Tabs
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderServices(tab.dataset.tab);
    animateCards();
  });
});

// --- INICIALIZACIÓN ---
renderServices();
animateCards();
