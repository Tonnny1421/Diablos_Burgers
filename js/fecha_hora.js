
function mostrarFechaActual() {
    const hoy = new Date();
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fecha = hoy.toLocaleDateString('es-MX', opciones);
    document.getElementById("fecha-actual").textContent = `${fecha}`;
  }

  function mostrarHoraActual() {
    const hoy = new Date();
    const opcionesHora = { hour: '2-digit', minute: '2-digit'};
    const hora = hoy.toLocaleTimeString('es-MX', opcionesHora);
    document.getElementById("hora-actual").textContent = `${hora}`;
  }

  // Ejecutar ambas funciones al cargar la página
  window.onload = function() {
    mostrarFechaActual();
    mostrarHoraActual();
    // Opcional: actualiza la hora cada segundo
    setInterval(mostrarHoraActual, 1000);
  };

