// Selectores
const btnMonthly = document.querySelector(".monthly");
const btnWeekly = document.querySelector(".weekly");
const calendarComponent = document.querySelector('booking-calendar');

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

// Eventos

btnMonthly.addEventListener('click', () => {
    updateCalendarView('monthly'); 
});

btnWeekly.addEventListener('click', () => {
    updateCalendarView('weekly');
});