// Función para manejar la alerta al hacer clic en los botones de precios
document.querySelectorAll('.pricing-button button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Esta página es solo para demostración de habilidades.');
    });
});

// Función para redirigir a app.html al hacer clic en los botones de demo
document.querySelectorAll('.demo-button button, .hero-demo button').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'app.html'; 
    });
});
