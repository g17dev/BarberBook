// Selectores
const btnMonthly = document.querySelector(".monthly");
const btnWeekly = document.querySelector(".weekly");

// FUNCIONES

function toogleActiveCalendarType(btnActive, btnDeactive) {
    btnActive.classList.add('active');
    btnDeactive.classList.remove('active');
}

// Eventos

btnMonthly.addEventListener('click', () => {
    toogleActiveCalendarType(btnMonthly, btnWeekly);
});

btnWeekly.addEventListener('click', () => {
    toogleActiveCalendarType(btnWeekly, btnMonthly);
});