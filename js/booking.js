import { TimeSelection } from './components/time-selection.js';

// --- SELECTORES ---
const btnMonthly = document.querySelector(".monthly");
const btnWeekly = document.querySelector(".weekly");
const calendarComponent = document.querySelector('booking-calendar');
const summaryCard = document.querySelector('.summary-card');


// --- DATA ---
const horariosBarbero = [
    { hora: "06:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "07:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "08:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "09:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "10:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "11:00 AM", disponible: true, periodo: "MAÑANA" },
    { hora: "12:00 PM", disponible: false, periodo: "TARDE" },
    { hora: "01:00 PM", disponible: true, periodo: "TARDE" },
    { hora: "02:00 PM", disponible: true, periodo: "TARDE" },
    { hora: "03:00 PM", disponible: true, periodo: "TARDE" },
    { hora: "04:00 PM", disponible: true, periodo: "TARDE" },
    { hora: "05:00 PM", disponible: true, periodo: "TARDE" },
    { hora: "06:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "07:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "08:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "09:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "10:00 PM", disponible: true, periodo: "NOCHE" },
    { hora: "11:00 PM", disponible: true, periodo: "NOCHE" }
];

const horarioDia = ["MAÑANA", "TARDE", "NOCHE"];

const iconosPeriodo = {
    "MAÑANA": "./assets/icons/sunshine.svg",
    "TARDE": "./assets/icons/sun.svg",
    "NOCHE": "./assets/icons/moon.svg"
};

// Variable global dentro del DOMContentLoaded para guardar la selección
let selectedDate = "Seleccionar fecha";
let selectedTime = "--:--";
let fechaSeleccionada = null; // Aquí guardaremos el valor


// --- FUNCIONES DE COORDINACIÓN ---

function updateCalendarView(view) {
    if (calendarComponent) {
        calendarComponent.view = view;
    }
    btnMonthly.classList.toggle('active', view === 'monthly');
    btnWeekly.classList.toggle('active', view === 'weekly');
}

/**
 * Actualiza los datos visuales del Summary Card
 */
function updateSummaryUI(hora) {
    const timeBadge = document.getElementById('summary-time');
    if (timeBadge) timeBadge.textContent = hora;
    
    if (summaryCard) summaryCard.classList.add("visible");
}

async function cargarHorariosPorFecha(fecha) {
    try {

        const response = await fetch(`http://localhost:3000/disponibilidad/${fecha}`);

        if (!response.ok) {
            console.warn(`⚠️ La fecha ${fecha} no tiene configuración.`);
            return []; // Retornamos array vacío para disparar renderNoAvailability
        }
        
        const data = await response.json();
        return data.horarios || [];
    } catch (error) {
        console.error("❌ Error de conexión:", error);
        return []; 
    }
}

// --- INICIALIZACIÓN ---

document.addEventListener('DOMContentLoaded', async (e) => {
    
    // Guardamos la instancia del TimeSelection para poder actualizarla luego
    const timePicker = new TimeSelection(".time-selection-container", {
        horarios: horariosBarbero,
        periodos: horarioDia,
        iconos: iconosPeriodo,
        onSelect: (hora) => {
            // --- AQUÍ ACTUALIZAS TU VARIABLE ---
            selectedTime = hora; 
            console.log("⌚ Hora seleccionada en el proyecto:", selectedTime);
            
            // Llamas a tu función visual
            updateSummaryUI(hora);
        },
        onDeselect: () => {
            // --- AQUÍ LIMPIAS TU VARIABLE ---
            selectedTime = "--:--";
            summaryCard.classList.remove("visible");
        }
    });

    // Eventos de botones de vista de calendario
    btnMonthly?.addEventListener('click', () => updateCalendarView('monthly'));
    btnWeekly?.addEventListener('click', () => updateCalendarView('weekly'));

    // Evento para el botón regresar del componente summary
    document.getElementById('closeSummary')?.addEventListener('click', () => {
        summaryCard.classList.remove("visible");
        // Deseleccionar visualmente el slot
        document.querySelector('.time-slot.selected')?.classList.remove('selected');
    });

    // Evento para obtener el dia seleccionado de la vista del calendario
    calendarComponent.addEventListener('date-change', (e) => {
        // Obtener el valor de 'dateValue' del componente
        fechaSeleccionada = e.detail.date; 
        
        console.log("Variable actualizada en el proyecto:", fechaSeleccionada);
    });

    // ESCUCHAR CAMBIOS DE FECHA
    calendarComponent.addEventListener('date-change', async (e) => {
        const fecha = e.detail.date;

        selectedTime = "--:--"; 

        // 1. Obtener los nuevos horarios para esa fecha
        const nuevosHorarios = await cargarHorariosPorFecha(fechaSeleccionada);

        // 2. Actualizar el componente de tiempo
        // (Asumiendo que tu clase TimeSelection tiene un método para actualizar datos)
        if (timePicker.updateData) {
            timePicker.updateData(nuevosHorarios);
        } else {
            // Si no tienes método de actualización, podrías re-instanciarlo 
            // o limpiar el contenedor y volver a crearlo.
        }
    });

});
