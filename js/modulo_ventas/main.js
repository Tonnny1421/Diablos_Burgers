import { inicializarProductos } from './productos.js';
import { productosSeleccionados } from './productos.js';
import { actualizarDisplay } from './display.js';
import { manejarNotas } from './notas.js';
import { configurarPagoUI } from './pagos.js';
import { confirmarPago } from './ventas.js';

document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const dialogoPago = document.getElementById("dialogo-pago");
    const dialogoNota = document.getElementById("dialogo-nota");
    const dialogoConfirmacion = document.getElementById("dialogo-confirmacion");
    const montoTotalSpan = document.getElementById("monto-total");
    const metodoPagoSelect = document.getElementById("metodo-pago");
    const notaTextarea = document.getElementById("nota-textarea");
    const datosTransferencia = document.getElementById("datos-transferencia");
    const datosEfectivo = document.getElementById("datos-efectivo");
    const montoPagadoInput = document.getElementById("monto-pagado");
    const cambioSpan = document.getElementById("cambio");
    const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

    let total = 0;

    const actualizarYMostrarTotal = () => {
        total = 0;
        for (const nombre in productosSeleccionados) {
            const { cantidad, precio } = productosSeleccionados[nombre];
            total += cantidad * precio;
        }
        montoTotalSpan.textContent = `$${total.toFixed(2)}`;
        dialogoPago.showModal();
    };

    inicializarProductos(() => actualizarDisplay(display));
    manejarNotas(dialogoNota, notaTextarea, document.getElementById("guardar-nota"));
    configurarPagoUI(metodoPagoSelect, datosTransferencia, datosEfectivo, montoPagadoInput, cambioSpan, () => total);

    document.querySelector(".pago").addEventListener("click", actualizarYMostrarTotal);
    document.getElementById("confirmar-pago").addEventListener("click", () => {
        const metodo = metodoPagoSelect.value;
        confirmarPago(metodo, total, mensajeConfirmacion, notaTextarea, montoPagadoInput, cambioSpan, display, dialogoPago, dialogoConfirmacion);
    });
});
