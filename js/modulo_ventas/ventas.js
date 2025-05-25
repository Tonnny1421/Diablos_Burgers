import { getVentaId, productosSeleccionados } from './productos.js';

export const confirmarPago = (metodo, total, mensajeConfirmacion, notaTextarea, montoPagadoInput, cambioSpan, display, dialogoPago, dialogoConfirmacion) => {
    const hora = new Date().toLocaleTimeString();
    const contenidoOrden = Object.entries(productosSeleccionados)
        .map(([nombre, { cantidad }]) => `${cantidad}x ${nombre}`)
        .join(", ");

    console.log(`Pago confirmado con ${metodo.toUpperCase()}:
    No. de venta: ${getVentaId()}
    Contenido de la orden: ${contenidoOrden}
    Total: ${total.toFixed(2)}
    Hora del pedido: ${hora}
    Método de pago: ${metodo}
    Nota: ${notaTextarea.value}`);

    mensajeConfirmacion.textContent = `Pago confirmado con ${metodo.toUpperCase()}`;
    dialogoConfirmacion.showModal();

    for (const producto in productosSeleccionados) {
        delete productosSeleccionados[producto];
    }
    notaTextarea.value = "";
    montoPagadoInput.value = "";
    cambioSpan.textContent = "";
    display.value = "";
    dialogoPago.close();
};
