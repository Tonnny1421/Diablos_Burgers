document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const dialogo = document.getElementById("dialogo-pago");
  const montoTotalSpan = document.getElementById("monto-total");
  const metodoPagoSelect = document.getElementById("metodo-pago");
  const productosSeleccionados = {};
  let ventaId = 1;
  let total = 0; // Definir total en el ámbito correcto

  // Cargar ventas previas desde localStorage
  let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

  document.querySelectorAll(".product").forEach(product => {
      const nombreProducto = product.querySelector("p").textContent.split("\n")[0].trim();
      const btnAgregar = product.querySelector(".agregar");
      const precioTexto = product.querySelector("p").textContent.match(/\$(\d+(\.\d{1,2})?)/)[1];
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

  document.querySelector(".pago").addEventListener("click", () => {
      total = 0; // Reiniciar total antes de calcular
      for (const nombre in productosSeleccionados) {
          const { cantidad, precio } = productosSeleccionados[nombre];
          total += cantidad * precio;
      }
      montoTotalSpan.textContent = `$${total.toFixed(2)}`;
      dialogo.showModal();
  });

  document.getElementById("confirmar-pago").addEventListener("click", () => {
      const metodo = metodoPagoSelect.value;
      alert(`Pago confirmado con ${metodo.toUpperCase()}`);
      dialogo.close();

      // Guardar la venta
      const hora = new Date().toLocaleTimeString(); // Obtener solo la hora
      const contenidoOrden = Object.entries(productosSeleccionados).map(([nombre, { cantidad }]) => `${cantidad}x ${nombre}`).join(", ");
      const venta = {
          "no. de venta": ventaId++,
          "contenido de la orden": contenidoOrden,
          total: total.toFixed(2), // Usar total definido en el ámbito correcto
          "hora del pedido": hora,
          "método de pago": metodo // Agregar método de pago
      };
      ventas.push(venta);
      localStorage.setItem("ventas", JSON.stringify(ventas));

      // Imprimir la venta en formato JSON en la consola
      console.log(JSON.stringify(venta, null, 2));

      // Limpiar productos seleccionados
      for (const producto in productosSeleccionados) {
          delete productosSeleccionados[producto];
      }
      display.value = "";
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
