document.addEventListener("DOMContentLoaded", () => {
    // Obtener referencias a los elementos del DOM
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

    // Objeto para almacenar los productos seleccionados y sus cantidades
    const productosSeleccionados = {};
    let ventaId = 1; // Identificador único para cada venta
    let total = 0; // Total de la venta actual
    let nota = ""; // Nota adicional para la venta

    // Cargar ventas previas desde localStorage
    let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    // Agregar eventos a los botones de agregar y eliminar productos
    document.querySelectorAll(".product").forEach((product) => {
        const nombreProducto = product.querySelector("p").textContent.split("\n")[0].trim();
        const btnAgregar = product.querySelector(".agregar");
        const precioTexto = product.querySelector("p").textContent.match(/\$(\d+(\.\d{1,2})?)/)[1];
        const precio = parseFloat(precioTexto);

        // Evento para agregar producto
        btnAgregar.addEventListener("click", () => {
            if (productosSeleccionados[nombreProducto]) {
                productosSeleccionados[nombreProducto].cantidad++;
            } else {
                productosSeleccionados[nombreProducto] = { cantidad: 1, precio };
            }
            actualizarDisplay();
        });

        // Evento para eliminar producto
        product.querySelector(".borrar").addEventListener("click", () => {
            if (productosSeleccionados[nombreProducto]) {
                productosSeleccionados[nombreProducto].cantidad--;
                if (productosSeleccionados[nombreProducto].cantidad === 0) {
                    delete productosSeleccionados[nombreProducto];
                }
                actualizarDisplay();
            }
        });
    });

    // Evento para abrir el diálogo de nota
    document.getElementById("nota-btn").addEventListener("click", () => {
        dialogoNota.showModal();
    });

    // Evento para guardar la nota
    document.getElementById("guardar-nota").addEventListener("click", () => {
        nota = notaTextarea.value;
        dialogoNota.close();
    });

    // Evento para cambiar el método de pago
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

    // Evento para calcular el cambio en efectivo
    montoPagadoInput.addEventListener("input", () => {
        const montoPagado = parseFloat(montoPagadoInput.value);
        if (!isNaN(montoPagado)) {
            const cambio = montoPagado - total;
            cambioSpan.textContent = `Cambio: $${cambio.toFixed(2)}`;
        } else {
            cambioSpan.textContent = "";
        }
    });

    // Evento para abrir el diálogo de pago
    document.querySelector(".pago").addEventListener("click", () => {
        total = 0;
        for (const nombre in productosSeleccionados) {
            const { cantidad, precio } = productosSeleccionados[nombre];
            total += cantidad * precio;
        }
        montoTotalSpan.textContent = `$${total.toFixed(2)}`;
        dialogoPago.showModal();
    });

    // Evento para confirmar el pago
    document.getElementById("confirmar-pago").addEventListener("click", () => {
        const metodo = metodoPagoSelect.value;

        // Guardar la venta
        const hora = new Date().toLocaleTimeString();
        const contenidoOrden = Object.entries(productosSeleccionados)
            .map(([nombre, { cantidad }]) => `${cantidad}x ${nombre}`)
            .join(", ");
        const venta = {
            "no. de venta": ventaId++,
            "contenido de la orden": contenidoOrden,
            total: total.toFixed(2),
            "hora del pedido": hora,
            "método de pago": metodo,
            nota: nota,
        };
        ventas.push(venta);
        localStorage.setItem("ventas", JSON.stringify(ventas));

        // Imprimir la venta en formato JSON en la consola
        console.log(JSON.stringify(venta, null, 2));

        // Mostrar mensaje de confirmación
        mensajeConfirmacion.textContent = `Pago confirmado con ${metodo.toUpperCase()}`;
        dialogoConfirmacion.showModal();

        // Limpiar productos seleccionados y nota
        for (const producto in productosSeleccionados) {
            delete productosSeleccionados[producto];
        }
        nota = "";
        notaTextarea.value = "";
        montoPagadoInput.value = "";
        cambioSpan.textContent = "";
        display.value = "";
        dialogoPago.close();
    });

    // Función para actualizar el display con los productos seleccionados
    function actualizarDisplay() {
        const líneas = [];
        for (const producto in productosSeleccionados) {
            const { cantidad } = productosSeleccionados[producto];
            líneas.push(`${cantidad}x ${producto}`);
        }
        display.value = líneas.join("\n");
    }
});
