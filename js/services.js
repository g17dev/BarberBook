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
const btnDirection = document.querySelector(".btn-direction");

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
  const cantidadSeleccionados = document.getElementById('count');
  const total = document.getElementById('price');
  let textoCantidad = "";

  if (cantidad > 0) {
    footer.classList.add('visible');
    container.style.paddingBottom = "100px";
    textoCantidad = (cantidad === 1) 
      ? "1 Seleccionado" 
      : `${cantidad} Seleccionados`;
  } else {
    footer.classList.remove('visible');
    container.style.paddingBottom = "0px";
  }

  if (cantidadSeleccionados && total) {
    cantidadSeleccionados.textContent = textoCantidad;
    total.textContent = `$${precio.toFixed(2)}`;
  }
}

function resetearTodo() {
  // 1. Reset lógico: Imprescindible para que al cambiar de pestaña no vuelvan a aparecer
  Object.keys(services).forEach(key => {
    services[key].forEach(s => s.check = false);
  });

  // 2. Limpieza visual sutil del DOM actual
  // Buscamos todas las tarjetas que tengan la clase 'selected' actualmente
  const selectedCards = document.querySelectorAll(".service-card-inner.selected");

  selectedCards.forEach(inner => {
    // Quitamos la clase 'selected' (esto activa la transición CSS de salida)
    inner.classList.remove("selected");

    // Buscamos el icono del check dentro de esta tarjeta y lo eliminamos
    // (O si prefieres animar su desaparición antes de borrarlo):
    const checkIcon = inner.querySelector(".check");
    if (checkIcon) {
      checkIcon.remove(); 
    }
  });

  // 3. Reset footer: Oculta el footer y pone contadores a cero
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

// Click boton direction v1
btnDirection.addEventListener("click", () => {
  const urlMapa = "https://maps.app.goo.gl/rF3Q2dDC9RRsjDY47";
  window.open(urlMapa, '_blank');
});

// --- INICIALIZACIÓN ---
renderServices();
animateCards();