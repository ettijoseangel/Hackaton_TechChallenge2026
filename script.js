// Métricas simuladas del cliente
const metrics = {
    serviceLevel: 20,
    onTime: 30,
    nps: 9,
    complaints: 0
};

// Mostrar métricas en pantalla
document.getElementById("serviceLevel").textContent = metrics.serviceLevel;
document.getElementById("onTime").textContent = metrics.onTime;
document.getElementById("nps").textContent = metrics.nps;
document.getElementById("complaints").textContent = metrics.complaints;

// Contador de señales de riesgo
let riskSignals = 0;

if (metrics.serviceLevel < 90) riskSignals++;
if (metrics.onTime < 85) riskSignals++;
if (metrics.nps <= 6) riskSignals++;
if (metrics.complaints >= 2) riskSignals++;

// Clasificación de riesgo
let riskLevel = "";
let actions = [];

if (riskSignals <= 1) {
    riskLevel = "BAJO RIESGO";
    actions = [
        "Seguimiento regular",
        "Mantener nivel de servicio"
    ];
    setTrafficLight("green");
} else if (riskSignals === 2) {
    riskLevel = "RIESGO MEDIO";
    actions = [
        "Contacto preventivo con el cliente",
        "Revisión de métricas operativas"
    ];
    setTrafficLight("yellow");
} else {
    riskLevel = "ALTO RIESGO";
    actions = [
        "Contacto inmediato con el cliente",
        "Plan de recuperación del servicio",
        "Asignar ejecutivo dedicado"
    ];
    setTrafficLight("red");
}

// Mostrar resultado
document.getElementById("riskText").textContent = riskLevel;

const actionsList = document.getElementById("actionsList");
actions.forEach(action => {
    const li = document.createElement("li");
    li.textContent = action;
    actionsList.appendChild(li);
});

// Función simple para el semáforo
function setTrafficLight(color) {
    const light = document.getElementById("trafficLight");
    light.classList.remove("green", "yellow", "red");
    light.classList.add(color);
}