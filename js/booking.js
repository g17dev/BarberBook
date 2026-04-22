// Selectores
const btnMonthly = document.querySelector(".monthly");
const btnWeekly = document.querySelector(".weekly");
const calendarComponent = document.querySelector('booking-calendar');

// DATA
// Listado completo especificado por el barbero
const horariosBarbero = [
    // --- MAÑANA ---
    { hora: "06:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "07:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "08:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "09:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "10:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "11:00 AM", disponible: true, periodo: "MAÑANA" },

    // --- TARDE ---
    { hora: "12:00 PM", disponible: false, periodo: "TARDE" }, // Almuerzo
    { hora: "01:00 PM", disponible: true, periodo: "TARDE" },
    { hora: "02:00 PM", disponible: true, periodo: "TARDE" },
    { hora: "03:00 PM", disponible: true, periodo: "TARDE" },
    { hora: "04:00 PM", disponible: true, periodo: "TARDE" },
    { hora: "05:00 PM", disponible: true, periodo: "TARDE" },
    
    // --- NOCHE ---
    { hora: "06:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "07:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "08:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "09:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "10:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "11:00 PM", disponible: true, periodo: "NOCHE" }
];


const horarioDia = [
    "MAÑANA", "TARDE", "NOCHE"
];

const iconosPeriodo = {
    "MAÑANA": "./assets/icons/sunshine.svg",
    "TARDE": "./assets/icons/sun.svg",
    "NOCHE": "./assets/icons/moon.svg"
};


// FUNCIONES

function updateCalendarView(view) {
    // Cambiamos la vista en el componente (usando el setter)
    if (calendarComponent) {
        calendarComponent.view = view;
    }

    // Actualizamos clases visuales de los botones
    if (view === 'monthly') {
        btnMonthly.classList.add('active');
        btnWeekly.classList.remove('active');
    } else {
        btnWeekly.classList.add('active');
        btnMonthly.classList.remove('active');
    }
}

function initTimeSelection() {
    const rootContainer = document.querySelector(".time-selection-container");
    if (!rootContainer) return;

    rootContainer.innerHTML = ''; 

    horarioDia.forEach(periodo => {
        // 1. Filtrar las horas antes de crear el contenedor (Eficiencia)
        const horasFiltradas = horariosBarbero.filter(item => item.periodo === periodo);
        if (horasFiltradas.length === 0) return;

        // 2. Crear los elementos principales
        const timeWrapper = document.createElement('div');
        timeWrapper.classList.add('time-selection-div');

        const title = createPeriodTitle(periodo);
        const slotsContainer = createSlotsContainer(horasFiltradas);

        // 3. Ensamblar y añadir al DOM
        timeWrapper.append(title, slotsContainer);
        rootContainer.appendChild(timeWrapper);
    });

    rootContainer.onclick = (e) => {
        const slot = e.target.closest(".time-slot");
        
        // 1. Si no es un slot o está ocupado, ignorar
        if (!slot || slot.classList.contains('is-occupied')) return;

        // 2. Verificar si el slot clickeado ya era el seleccionado
        const isAlreadySelected = slot.classList.contains("selected");

        // 3. Limpiar selección previa en cualquier caso
        const prev = rootContainer.querySelector(".time-slot.selected");
        if (prev) prev.classList.remove("selected");
        
        // 4. Si NO estaba seleccionado antes, lo seleccionamos
        // Si YA estaba seleccionado, se queda deseleccionado (gracias al paso 3)
        if (!isAlreadySelected) {
            slot.classList.add("selected");
            console.log("Seleccionado:", slot.textContent);
            // Aquí podrías mostrar el Summary Card:
            // document.getElementById('summaryCard').classList.remove('hidden');
        } else {
            console.log("Deseleccionado");
            // Aquí podrías ocultar el Summary Card:
            // document.getElementById('summaryCard').classList.add('hidden');
    }
};

}

// --- FUNCIONES DE APOYO (HELPERS) ---

function createPeriodTitle(periodo) {
    // 1. Contenedor para el icono y el texto
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('period-header');

    // 2. Imagen del icono
    const iconImg = document.createElement('img');
    iconImg.src = iconosPeriodo[periodo];
    iconImg.alt = `Icono de ${periodo}`;
    iconImg.classList.add('period-svg');

    // 3. Título del periodo
    const title = document.createElement('h3');
    title.classList.add('time-selection-title');
    title.textContent = periodo;

    // 4. Ensamblamos horizontalmente
    headerDiv.append(iconImg, title);
    
    return headerDiv;
}

function createSlotsContainer(horas) {
    const container = document.createElement('div');
    container.classList.add('time-slots-grid');

    horas.forEach(item => {
        const slot = document.createElement('div');
        slot.classList.add('time-slot');
        slot.textContent = item.hora;

        if (!item.disponible) {
            slot.classList.add('is-occupied');
        }

        container.appendChild(slot);
    });

    return container;
}


// 1. Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initTimeSelection();
});

// 2. Eventos de los botones de vista (Tus eventos actuales)
btnMonthly.addEventListener('click', () => {
    updateCalendarView('monthly'); 
});

btnWeekly.addEventListener('click', () => {
    updateCalendarView('weekly');
});