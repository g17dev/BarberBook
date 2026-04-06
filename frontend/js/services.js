// Seleccionar todos los botones del tab
const tabs = document.querySelectorAll(".tab-button");

// Seleccionar todos los contenidos del tab correspondiente
const contents = document.querySelectorAll(".tabcontent");

// Recorrer cada boton
tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Eliminar clase Active de todos
        tabs.forEach(t => t.classList.remove("active"));

        // Ocultar todos los contenidos
        contents.forEach(c => c.style.display = "none");

        // Activar el boton clickeado
        tab.classList.add("active");

        // Mostrar contenido corresponiendo al tab seleccionado
        const id = tab.dataset.tab;
        document.getElementById(id).style.display = "block";
    });
});

