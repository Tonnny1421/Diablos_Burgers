import { productosSeleccionados } from './productos.js';
export const actualizarDisplay = (display) => {
    const líneas = [];
    for (const producto in productosSeleccionados) {
        const { cantidad } = productosSeleccionados[producto];
        líneas.push(`${cantidad}x ${producto}`);
    }
    display.value = líneas.join("\n");
};
