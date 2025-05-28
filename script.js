document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Smooth Scroll para la Navbar ---
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previene el comportamiento de salto por defecto del ancla
            e.preventDefault();

            // Obtiene el atributo href (ej. '#inicio', '#nosotros')
            const targetId = this.getAttribute('href');

            // Encuentra el elemento de destino usando el ID
            const targetSection = document.querySelector(targetId);

            // Si el elemento de destino existe, desplázate suavemente hacia él
            if (targetSection) {
                // `behavior: 'smooth'` habilita la animación de desplazamiento suave
                // `block: 'start'` alinea el inicio del elemento con el inicio del viewport
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Lógica del Carrusel de Imágenes ---
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const heroContent = document.querySelector('.hero-content'); // <-- AÑADIDO: Selecciona el contenido del hero

    // Cantidad total de elementos en el carrusel
    const totalItems = carouselItems.length;
    let currentIndex = 0; // Índice de la imagen actual (inicialmente la primera)

    // Si no hay elementos de carrusel, sal del script para evitar errores
    if (totalItems === 0) {
        // console.warn('No se encontraron elementos de carrusel. El carrusel no funcionará.');
        return;
    }

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        // Calcula el desplazamiento necesario para mostrar la imagen actual
        // Multiplica el índice actual por -100% para mover el slide
        const offset = -currentIndex * 100;
        carouselSlide.style.transform = `translateX(${offset}%)`; // Aplica la transformación CSS
        updateDots(); // Actualiza el estado de los puntos indicadores

        // <-- AÑADIDO: Lógica para mostrar/ocultar el hero-content basado en el índice
        if (heroContent) { // Asegurarse de que heroContent existe
            if (currentIndex === 0) { // Asumiendo que Inochilogo.jpg es la primera imagen (índice 0)
                heroContent.style.opacity = '0'; // Hace el texto transparente
                heroContent.style.pointerEvents = 'none'; // Evita interacciones (clics, selección)
            } else {
                heroContent.style.opacity = '1'; // Hace el texto visible
                heroContent.style.pointerEvents = 'auto'; // Habilita interacciones
            }
        }
    }

    // Función para crear los puntos indicadores dinámicamente
    function createDots() {
        // Limpiar puntos existentes por si se llama más de una vez
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement('span'); // Crea un elemento <span> para cada punto
            dot.classList.add('dot'); // Le añade la clase 'dot' para los estilos CSS
            dot.dataset.index = i; // Guarda el índice de la imagen a la que corresponde este punto
            dotsContainer.appendChild(dot); // Añade el punto al contenedor de puntos

            // Añade un evento de clic a cada punto
            dot.addEventListener('click', () => {
                currentIndex = i; // Establece el índice actual a la imagen correspondiente al punto
                updateCarousel(); // Actualiza el carrusel para mostrar esa imagen
            });
        }
        updateDots(); // Actualiza los puntos para que el inicial esté activo
    }

    // Función para actualizar el estado activo (clase 'active') de los puntos indicadores
    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dots .dot'); // Selecciona todos los puntos
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active'); // Añade la clase 'active' al punto correspondiente a la imagen actual
            } else {
                dot.classList.remove('active'); // Elimina la clase 'active' de los demás puntos
            }
        });
    }

    // Evento para el botón Siguiente
    nextBtn.addEventListener('click', () => {
        // Incrementa el índice, y usa el operador módulo (%) para volver a 0 si llega al final
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel(); // Mueve el carrusel a la siguiente imagen
    });

    // Evento para el botón Anterior
    prevBtn.addEventListener('click', () => {
        // Decrementa el índice, y ajusta para que vaya a la última imagen si está en la primera
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel(); // Mueve el carrusel a la imagen anterior
    });

    // Inicializar los puntos y el carrusel al cargar la página
    createDots();
    updateCarousel(); // <-- AÑADIDO: Llama a updateCarousel al inicio para aplicar el estado inicial

    // Opcional: Auto-avance del carrusel
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000); // Cambia de imagen cada 5 segundos (5000 ms)

    // Opcional: Detener el auto-avance al pasar el ratón y reiniciarlo al quitarlo
    carouselSlide.addEventListener('mouseenter', () => clearInterval(autoSlideInterval)); // Detiene el intervalo
    carouselSlide.addEventListener('mouseleave', () => {
        // Reinicia el intervalo
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    });
});
