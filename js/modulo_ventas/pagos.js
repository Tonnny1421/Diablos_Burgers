export const configurarPagoUI = (metodoPagoSelect, datosTransferencia, datosEfectivo, montoPagadoInput, cambioSpan, getTotal) => {
    metodoPagoSelect.addEventListener("change", () => {
        if (metodoPagoSelect.value === "transferencia") {
            datosTransferencia.style.display = "block";
            datosEfectivo.style.display = "none";
        } else if (metodoPagoSelect.value === "efectivo") {
            datosTransferencia.style.display = "none";
            datosEfectivo.style.display = "block";
        } else {
            datosTransferencia.style.display = "none";
            datosEfectivo.style.display = "none";
        }
    });

    montoPagadoInput.addEventListener("input", () => {
        const montoPagado = parseFloat(montoPagadoInput.value);
        if (!isNaN(montoPagado)) {
            const cambio = montoPagado - getTotal();
            cambioSpan.textContent = `Cambio: $${cambio.toFixed(2)}`;
        } else {
            cambioSpan.textContent = "";
        }
    });
};
