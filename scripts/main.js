function openModal(index) {
  const producto = productos[index]; 
  if (!producto) {
    console.error('Producto no encontrado');
    return;
  }

  const modalCarousel = document.getElementById('modal-carousel');
  modalCarousel.innerHTML = ''; // Limpia las imágenes del modal

  // Asegúrate de que subimagenes exista y no esté vacío
  if (producto.subimagenes && producto.subimagenes.length > 0) {
    producto.subimagenes.forEach((subimagen) => {
      const img = document.createElement('img');
      img.src = subimagen;
      img.dataset.price = producto.precio;
      img.dataset.reference = producto.referencia;
      modalCarousel.appendChild(img);

      img.addEventListener('click', () => cargarSubimagenes(subimagen, producto));
    });
  } else {
    console.error('No se encontraron subimágenes para este producto');
  }
}

async function llenarCarrusel(carruselClase, archivoJson) {
  try {
    const response = await fetch(archivoJson);
    const data = await response.json();

    // Obtener el contenedor del carrusel de acuerdo con la clase
    const carrusel = document.querySelector(`.carousel-group .carousel-container.${carruselClase} .carousel`);
    carrusel.innerHTML = ''; 

    // Llenar el carrusel con las imágenes
    data.productos.forEach((producto, index) => {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      const img = document.createElement('img');
      img.src = producto.imagenPrincipal;
      img.alt = producto.nombre;
      img.dataset.price = producto.precio; // Añadir datos para el modal
      img.dataset.reference = producto.referencia; // Añadir datos para el modal
      img.dataset.index = index; // Índice del producto
      img.dataset.title = producto.nombre; // Añadir título para saber a qué pertenece
      img.dataset.subimages = JSON.stringify(producto.subimagenes);

      slide.appendChild(img);
      carrusel.appendChild(slide);

      // Añadir el evento click para abrir el modal
      img.addEventListener('click', () => {
        openModal(index, data.productos);
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


