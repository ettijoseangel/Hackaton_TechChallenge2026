// Función para validar rangos automáticamente
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        let val = parseFloat(this.value);
        let max = parseFloat(this.max);
        let min = parseFloat(this.min);

        if (val > max) this.value = max;
        if (val < min) this.value = min;
    });
});