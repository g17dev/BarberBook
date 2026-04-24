export class TimeSelection {
    constructor(selector, config) {
        this.container = document.querySelector(selector);
        this.horarios = config.horarios;
        this.periodos = config.periodos;
        this.iconos = config.iconos;
        this.onSelect = config.onSelect;
        this.onDeselect = config.onDeselect;

        if (this.container) {
            this.render();
            this.bindEvents(); // Se llama SOLO una vez en la vida del objeto
        }
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = '';

        if (!this.horarios || this.horarios.length === 0) {
            this.renderNoAvailability();
            return;
        }

        this.container.innerHTML = ''; 

        this.periodos.forEach(periodo => {
            const horasFiltradas = this.horarios.filter(item => item.periodo === periodo);
            if (horasFiltradas.length === 0) return;

            const timeWrapper = document.createElement('div');
            timeWrapper.classList.add('time-selection-div');

            const title = this.createPeriodTitle(periodo);
            const slotsContainer = this.createSlotsContainer(horasFiltradas);

            timeWrapper.append(title, slotsContainer);
            this.container.appendChild(timeWrapper);
        });
    }

    createPeriodTitle(periodo) {
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('period-header');

        const iconImg = document.createElement('img');
        iconImg.src = this.iconos[periodo];
        iconImg.alt = `Icono de ${periodo}`;
        iconImg.classList.add('period-svg');

        const title = document.createElement('h3');
        title.classList.add('time-selection-title');
        title.textContent = periodo;

        headerDiv.append(iconImg, title);
        return headerDiv;
    }

    createSlotsContainer(horas) {
        const container = document.createElement('div');
        container.classList.add('time-slots-grid');

        horas.forEach(item => {
            const slot = document.createElement('div');
            slot.classList.add('time-slot');
            slot.textContent = item.hora;
            if (!item.disponible) slot.classList.add('is-occupied');
            container.appendChild(slot);
        });

        return container;
    }

    updateData(nuevosHorarios) {

        this.horarios = nuevosHorarios;
        
        // 1. Limpiamos la selección anterior antes de re-renderizar
        if (this.onDeselect) this.onDeselect(); 
        
        // 2. Dibujamos los nuevos slots
        this.render(); 
    }

    renderNoAvailability() {
        this.container.innerHTML = '';
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('no-availability-container');
        messageDiv.innerHTML = `
        <div class="no-availability-content">
            <img src="./assets/no-schedule-avaible.svg" class="empty-img">
            <h3>SIN RESULTADOS</h3>
            <p>No hay horarios programados para esta fecha. Intenta buscar en un día diferente.</p>
        </div>
        `;
        this.container.appendChild(messageDiv);
    }


    bindEvents() {
    this.container.onclick = (e) => {
        const slot = e.target.closest(".time-slot");
        if (!slot || slot.classList.contains('is-occupied')) return;

        const isAlreadySelected = slot.classList.contains("selected");

        // Quitar selección previa
        const prev = this.container.querySelector(".time-slot.selected");
        if (prev) prev.classList.remove("selected");
        
            if (!isAlreadySelected) {
                slot.classList.add("selected");
                const hora = slot.textContent;

                // --- NUEVO: Disparar evento personalizado ---
                this.container.dispatchEvent(new CustomEvent('time-change', {
                    detail: { 
                        time: hora,
                        element: slot 
                    },
                    bubbles: true
                }));

                if (this.onSelect) this.onSelect(hora);
            } else {
                // Caso: Deselección
                this.container.dispatchEvent(new CustomEvent('time-change', {
                    detail: { time: null },
                    bubbles: true
                }));
                if (this.onDeselect) this.onDeselect();
            }
        };
    }

}
