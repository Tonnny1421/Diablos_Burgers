import { getVentaId, productosSeleccionados } from './productos.js';

export const confirmarPago = (metodo, total, mensajeConfirmacion, notaTextarea, montoPagadoInput, cambioSpan, display, dialogoPago, dialogoConfirmacion) => {
    const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
    const hora = new Date().toLocaleTimeString();
    const contenidoOrden = Object.entries(productosSeleccionados)
        .map(([nombre, { cantidad }]) => `${cantidad}x ${nombre}`)
        .join(", ");
    const venta = {
        "no. de venta": getVentaId(),
        "contenido de la orden": contenidoOrden,
        total: total.toFixed(2),
        "hora del pedido": hora,
        "método de pago": metodo,
        nota: notaTextarea.value,
    };
    ventas.push(venta);
    localStorage.setItem("ventas", JSON.stringify(ventas));

    console.log(JSON.stringify(venta, null, 2));

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
