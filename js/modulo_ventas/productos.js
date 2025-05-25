export const productosSeleccionados = {};
let ventaId = 1;
export const getVentaId = () => ventaId++;

export const inicializarProductos = (callback) => {
    document.querySelectorAll(".product").forEach((product) => {
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
            callback();
        });

        product.querySelector(".borrar").addEventListener("click", () => {
            if (productosSeleccionados[nombreProducto]) {
                productosSeleccionados[nombreProducto].cantidad--;
                if (productosSeleccionados[nombreProducto].cantidad === 0) {
                    delete productosSeleccionados[nombreProducto];
                }
                callback();
            }
        });
    });
};
