document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Smooth Scroll para la Navbar ---
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
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
    const heroContent = document.querySelector('.hero-content'); // Selecciona el contenido del hero

    const totalItems = carouselItems.length;
    let currentIndex = 0;

    if (totalItems === 0) {
        return;
    }

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselSlide.style.transform = `translateX(${offset}%)`;
        updateDots();

        // Lógica para mostrar/ocultar el hero-content basado en el índice
        if (heroContent) {
            if (currentIndex === 0) { // Si es la primera imagen (el logo)
                heroContent.style.opacity = '0'; // Hace el texto transparente
                heroContent.style.pointerEvents = 'none'; // Evita interacciones (clics, selección)
            } else {
                heroContent.style.opacity = '1'; // Hace el texto visible
                heroContent.style.pointerEvents = 'auto'; // Habilita interacciones
            }
        }
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);

            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
        }
        updateDots();
    }

    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dots .dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    createDots();
    updateCarousel(); // Llama a updateCarousel al inicio para aplicar el estado inicial

    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);

    carouselSlide.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carouselSlide.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    });
});
