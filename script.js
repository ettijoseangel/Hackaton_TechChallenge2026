function procesarIA() {
    const servicio = parseFloat(document.getElementById('in-servicio').value);
    const puntualidad = parseFloat(document.getElementById('in-puntualidad').value);
    const nps = parseFloat(document.getElementById('in-nps').value);
    const quejas = parseInt(document.getElementById('in-quejas').value);

    //Porcentaje de quejas
    const porcentajeQuejas = (quejas / 25) * 100;

    document.getElementById('resumen-metricas').innerHTML = `
    <div class="metric-container">
        <label>Servicio (${servicio}%)</label>
        <div class="bar-bg"><div class="bar-fill" style="width: ${servicio}%; background: ${servicio < 70 ? '#d9534f' : '#5DA83B'};"></div></div>
    </div>
    <div class="metric-container">
        <label">Puntualidad (${puntualidad}%)</label>
        <div class="bar-bg"><div class="bar-fill" style="width: ${puntualidad}%; background: ${puntualidad < 80 ? '#d9534f' : '#5DA83B'};"></div></div>
    </div>
    <div class="metric-container">
        <label>NPS (${nps * 10}%)</label>
        <div class="bar-bg"><div class="bar-fill" style="width: ${nps * 10}%; background: ${nps < 6 ? '#d9534f' : '#5DA83B'};"></div></div>
    </div>
    <div class="metric-container">
        <label>Quejas (${quejas} de 25)</label>
        <div class="bar-bg">
            <div class="bar-fill" style="width: ${porcentajeQuejas}%; background: ${quejas > 2 ? '#d9534f' : '#5DA83B'};"></div>
        </div>
    </div>
`;

    const diagTexto = document.getElementById('detalle-diagnostico');
    const acciones = document.getElementById('lista-acciones');
    const nivelH2 = document.getElementById('nivel-riesgo');
    const luz = document.getElementById('luz-semaforo');
    const box = document.getElementById('semaforo-box');

    // 2. Lógica de Riesgo Integrada
    if (servicio < 70 || puntualidad < 80 || quejas >= 3 || nps < 6) {
        // RIESGO CRÍTICO
        nivelH2.innerText = "RIESGO CRÍTICO";
        box.style.borderColor = "#d9534f";
        luz.style.backgroundColor = "#d9534f";
        diagTexto.innerText = "Se detecta un colapso en los indicadores operativos. El cliente está en la fase final antes de una posible recesión.";
        acciones.innerHTML = `
            <li>Activación inmediata de un plan de retención.</li>
            <li>Escalamiento interno y contacto directo con el cliente.</li>
        `;
    } else if (servicio < 85 || puntualidad < 90 || nps < 8 || quejas >= 1) {
        // RIESGO MEDIO
        nivelH2.innerText = "RIESGO MEDIO";
        box.style.borderColor = "#ffcc00";
        luz.style.backgroundColor = "#ffcc00";
        diagTexto.innerText = "Existen señales tempranas de insatisfacción. La puntualidad o el servicio han bajado de los estándares ideales.";
        acciones.innerHTML = `
            <li>Contacto proactivo con el cliente.</li>
            <li>Revisión de los puntos críticos del servicio.</li>
        `;
    } else {
        // SALUDABLE
        nivelH2.innerText = "SALUDABLE";
        box.style.borderColor = "#5cb85c";
        luz.style.backgroundColor = "#5cb85c";
        diagTexto.innerText = "El cliente mantiene una relación sólida y métricas estables. Se recomienda fidelización.";
        acciones.innerHTML = `
            <li>Seguimiento regular.</li>
            <li>Mantenimiento de la relación con el cliente.</li>
        `;
    }
}

// Función para validar rangos y estado del botón
const inputs = document.querySelectorAll('input[type="number"]');
const btnAnalizar = document.querySelector('.aside-button');

inputs.forEach(input => {
    input.addEventListener('input', function() {
        const val = parseFloat(this.value);
        const max = parseFloat(this.max);
        const min = parseFloat(this.min);

        // 1. Evitar números fuera de rango
        if (val > max) this.value = max;
        if (val < min) this.value = min;

        // 2. Desactivar botón si falta algún campo
        const todosLlenos = Array.from(inputs).every(i => i.value !== "");
        btnAnalizar.disabled = !todosLlenos;
    });
});

// Desactivar al inicio
btnAnalizar.disabled = true;