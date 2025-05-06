function showSection(sectionId) {
    // Ocultar el mensaje de bienvenida
    document.getElementById('main-message').style.display = 'none';
  
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
      section.style.display = 'none';
      section.classList.remove('active');
    });
  
    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';
    selectedSection.classList.add('active');
  }
  