document.querySelectorAll('.carousel-wrapper').forEach((container) => {
    const prevButton = container.querySelector('.arrow.left');
    const nextButton = container.querySelector('.arrow.right');
    const carousel = container.querySelector('.carousel');
    let currentSlide = 0;
  
    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + carousel.children.length) % carousel.children.length;
      updateCarousel();
    });
  
    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % carousel.children.length;
      updateCarousel();
    });
  
    function updateCarousel() {
      const slideWidth = carousel.children[0].offsetWidth;
      carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  });
  