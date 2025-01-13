async function llenarCarrusel(carruselClase, archivoJson) {
  try {
    const response = await fetch(archivoJson);
    const data = await response.json();

    const carrusel = document.querySelector(`.carousel-group .carousel-container.${carruselClase} .carousel`);
    carrusel.innerHTML = ''; 

    data.productos.forEach((producto, index) => {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      const img = document.createElement('img');
      img.src = producto.imagenPrincipal;
      img.alt = producto.nombre;
      img.dataset.price = producto.precio; 
      img.dataset.reference = producto.referencia; 
      img.dataset.index = index;
      img.dataset.title = producto.nombre; 

      slide.appendChild(img);
      carrusel.appendChild(slide);

      img.addEventListener('click', () => {
        openModal(index, archivoJson);
      });
    });
  } catch (error) {
    console.error(`Error al cargar los productos de ${archivoJson}:`, error);
  }
}

llenarCarrusel('lingerie', '../lenceria.JSON');
llenarCarrusel('sports-clothing', '../ropa_deportiva.JSON');
llenarCarrusel('swim-dresses', '../vestidos_de_bano.JSON');
llenarCarrusel('pajamas', '../pijamas.JSON');

