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
    const productosSeleccionados = {};
    let ventaId = 1;
    let total = 0;
    let nota = "";
  
    // Cargar ventas previas desde localStorage
    let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  
    document.querySelectorAll(".product").forEach((product) => {
      const nombreProducto = product
        .querySelector("p")
        .textContent.split("\n")[0]
        .trim();
      const btnAgregar = product.querySelector(".agregar");
      const precioTexto = product
        .querySelector("p")
        .textContent.match(/\$(\d+(\.\d{1,2})?)/)[1];
      const precio = parseFloat(precioTexto);
  
      btnAgregar.addEventListener("click", () => {
        if (productosSeleccionados[nombreProducto]) {
          productosSeleccionados[nombreProducto].cantidad++;
        } else {
          productosSeleccionados[nombreProducto] = { cantidad: 1, precio };
        }
        actualizarDisplay();
      });
  
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
  
    document.getElementById("nota-btn").addEventListener("click", () => {
      dialogoNota.showModal();
    });
  
    document.getElementById("guardar-nota").addEventListener("click", () => {
      nota = notaTextarea.value;
      dialogoNota.close();
    });
  
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
        const cambio = montoPagado - total;
        cambioSpan.textContent = `Cambio: $${cambio.toFixed(2)}`;
      } else {
        cambioSpan.textContent = "";
      }
    });
  
    document.querySelector(".pago").addEventListener("click", () => {
      total = 0;
      for (const nombre in productosSeleccionados) {
        const { cantidad, precio } = productosSeleccionados[nombre];
        total += cantidad * precio;
      }
      montoTotalSpan.textContent = `$${total.toFixed(2)}`;
      dialogoPago.showModal();
    });
  
    document.getElementById("confirmar-pago").addEventListener("click", () => {
      const metodo = metodoPagoSelect.value;
      let datosPago = {};
  
      if (metodo === "transferencia") {
        datosPago = {
          banco: "Banco XYZ",
          nombrePersona: "Juan Pérez",
          referencia: "123456789",
        };
      } else if (metodo === "efectivo") {
        const montoPagado = parseFloat(montoPagadoInput.value);
        if (!isNaN(montoPagado)) {
          const cambio = montoPagado - total;
          datosPago = {
            montoPagado: montoPagado,
            cambio: cambio.toFixed(2),
          };
        }
      }
  
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
        "datos de pago": datosPago, // Agregar datos de pago
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
  
    function actualizarDisplay() {
      const líneas = [];
      for (const producto in productosSeleccionados) {
        const { cantidad } = productosSeleccionados[producto];
        líneas.push(`${cantidad}x ${producto}`);
      }
      display.value = líneas.join("\n");
    }
  });
  