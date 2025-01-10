/*function openModal(index) {
    const producto = productos[index]; // Producto seleccionado
    const modalCarousel = document.getElementById('modal-carousel');
    modalCarousel.innerHTML = ''; // Limpia las imágenes del modal

    producto.subimagenes.forEach((subimagen) => {
      const img = document.createElement('img');
      img.src = subimagen;
      img.dataset.price = producto.precio;
      img.dataset.reference = producto.referencia;
      modalCarousel.appendChild(img);

      img.addEventListener('click', () => cargarSubimagenes(subimagen, producto));
    });
}

async function llenarLenceria() {
  try {
    const response = await fetch('lenceria.json');
    const data = await response.json();

    const lenceriaCarousel = document.querySelector('.carousel-group:first-of-type .carousel');

    lenceriaCarousel.innerHTML = ''; // Limpia el carrusel

    data.productos.forEach((producto, index) => {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      const img = document.createElement('img');
      img.src = producto.imagenPrincipal;
      img.alt = producto.nombre;
      img.dataset.price = producto.precio; // Añade datos para el modal
      img.dataset.reference = producto.referencia; // Añade datos para el modal
      img.dataset.index = index; // Índice del producto

      slide.appendChild(img);
      lenceriaCarousel.appendChild(slide);
    });

    document.querySelectorAll('.carousel-group:first-of-type .carousel .slide img').forEach((img, index) => {
      img.addEventListener('click', () => {
        openModal(index, data.productos);
      });
    });

  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}
  
llenarLenceria();*/

function openModal(index) {
  const producto = productos[index]; // Producto seleccionado
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

llenarCarrusel('lingerie', 'lenceria.json');
llenarCarrusel('sports-clothing', 'ropa_deportiva.json');
llenarCarrusel('swim-dresses', 'vestidos_de_bano.json');
llenarCarrusel('pajamas', 'pijamas.json');


