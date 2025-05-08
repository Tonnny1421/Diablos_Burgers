document.addEventListener("DOMContentLoaded", () => {
    mostrarTablaVentas();
});

export const mostrarTablaVentas = () => {
    const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Crear encabezados de la tabla
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ["No. de Venta", "Contenido de la Orden", "Total", "Hora del Pedido", "Método de Pago", "Nota"];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear filas de la tabla
    ventas.forEach(venta => {
        const row = document.createElement('tr');

        const noVentaCell = document.createElement('td');
        noVentaCell.textContent = venta["no. de venta"];
        row.appendChild(noVentaCell);

        const contenidoCell = document.createElement('td');
        contenidoCell.textContent = venta["contenido de la orden"];
        row.appendChild(contenidoCell);

        const totalCell = document.createElement('td');
        totalCell.textContent = `$${venta.total}`;
        row.appendChild(totalCell);

        const horaCell = document.createElement('td');
        horaCell.textContent = venta["hora del pedido"];
        row.appendChild(horaCell);

        const metodoCell = document.createElement('td');
        metodoCell.textContent = venta["método de pago"];
        row.appendChild(metodoCell);

        const notaCell = document.createElement('td');
        notaCell.textContent = venta.nota;
        row.appendChild(notaCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Insertar la tabla en el contenedor
    const tablaVentasContainer = document.getElementById('tabla-ventas');
    if (tablaVentasContainer) {
        tablaVentasContainer.innerHTML = ''; // Limpiar el contenedor antes de insertar la tabla
        tablaVentasContainer.appendChild(table);
    }
};
