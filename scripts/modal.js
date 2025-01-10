let productos = []; 

async function loadProductos(archivoJson) {
    const response = await fetch(archivoJson);
    const data = await response.json();
    productos = productos.concat(data.productos);  // Agregar los productos al arreglo
}

async function loadModal() {
    const response = await fetch('components/modal.html');
    const modalHTML = await response.text();
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    setupModalEvents(); 
}

function setupModalEvents() {
  if (!document.getElementById('image-modal')) {
    return;
  }

  let modalIndex = 0;

  function updateModal() {
    const modalCarousel = document.getElementById('modal-carousel');
    const offset = -modalIndex * 100;
    modalCarousel.style.transform = `translateX(${offset}%)`;

    const images = document.querySelectorAll('#modal-carousel img');
    const currentImage = images[modalIndex];
    document.getElementById('price').textContent = `Precio: ${currentImage.dataset.price}`;
    document.getElementById('reference').textContent = `Referencia: ${currentImage.dataset.reference}`;
  }

  function openModal(index) {
    const producto = productos[index]; 
    const modalCarousel = document.getElementById('modal-carousel');
    modalCarousel.innerHTML = '';

    producto.subimagenes.forEach((subimagen) => {
      const img = document.createElement('img');
      img.src = subimagen;
      img.dataset.price = producto.precio;
      img.dataset.reference = producto.referencia;
      modalCarousel.appendChild(img);

      img.addEventListener('click', () => cargarSubimagenes(subimagen, producto));
    });

    document.getElementById('price').textContent = `Precio: $${producto.precio}`;
    document.getElementById('reference').textContent = `Referencia: ${producto.referencia}`;

    document.getElementById('image-modal').classList.add('show');
    modalIndex = 0; 
    updateModal();
  }

  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('image-modal').classList.remove('show');
  });

  document.getElementById('modal-left').addEventListener('click', () => {
    const total = document.querySelectorAll('#modal-carousel img').length;
    modalIndex = (modalIndex - 1 + total) % total;
    updateModal();
  });

  document.getElementById('modal-right').addEventListener('click', () => {
    const total = document.querySelectorAll('#modal-carousel img').length;
    modalIndex = (modalIndex + 1) % total;
    updateModal();
  });

  document.querySelectorAll('.slide img').forEach((img, index) => {
    img.addEventListener('click', () => {
      openModal(index);
    });
  });
}

function cargarSubimagenes(subimagen, producto) {
  const modalCarousel = document.getElementById('modal-carousel');
  modalCarousel.innerHTML = ''; 

  producto.subimagenes.forEach((subimg) => {
    const img = document.createElement('img');
    img.src = subimg;
    img.dataset.price = producto.precio;
    img.dataset.reference = producto.referencia;
    modalCarousel.appendChild(img);
  });
}

Promise.all([
  loadProductos('lenceria.json'),
  loadProductos('ropa_deportiva.json'),
  loadProductos('vestidos_de_bano.json'),
  loadProductos('pijamas.json')
]).then(() => {
  loadModal();  
});

/*let productos = []; 

async function loadProductos() {
  const response = await fetch('lenceria.json');
  const data = await response.json();
  productos = data.productos;
}

async function loadModal() {
  const response = await fetch('components/modal.html');
  const modalHTML = await response.text();
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  setupModalEvents(); 
}

function setupModalEvents() {
  if (!document.getElementById('image-modal')) {
    return;
  }

  let modalIndex = 0;

  function updateModal() {
    const modalCarousel = document.getElementById('modal-carousel');
    const offset = -modalIndex * 100;
    modalCarousel.style.transform = `translateX(${offset}%)`;

    const images = document.querySelectorAll('#modal-carousel img');
    const currentImage = images[modalIndex];
    document.getElementById('price').textContent = `Precio: ${currentImage.dataset.price}`;
    document.getElementById('reference').textContent = `Referencia: ${currentImage.dataset.reference}`;
  }

  function openModal(index, carruselId) {
    const producto = productos[index];
    const modalCarousel = document.getElementById('modal-carousel');
    modalCarousel.innerHTML = '';

    // Filtramos las imágenes por el carrusel de origen
    const subimagenes = producto.subimagenes.filter(subimagen => subimagen.includes(carruselId));

    subimagenes.forEach((subimagen) => {
      const img = document.createElement('img');
      img.src = subimagen;
      img.dataset.price = producto.precio;
      img.dataset.reference = producto.referencia;
      modalCarousel.appendChild(img);

      img.addEventListener('click', () => cargarSubimagenes(subimagen, producto));
    });

    document.getElementById('price').textContent = `Precio: $${producto.precio}`;
    document.getElementById('reference').textContent = `Referencia: ${producto.referencia}`;

    document.getElementById('image-modal').classList.add('show');
    modalIndex = 0; 
    updateModal();
  }

  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('image-modal').classList.remove('show');
  });

  document.getElementById('modal-left').addEventListener('click', () => {
    const total = document.querySelectorAll('#modal-carousel img').length;
    modalIndex = (modalIndex - 1 + total) % total;
    updateModal();
  });

  document.getElementById('modal-right').addEventListener('click', () => {
    const total = document.querySelectorAll('#modal-carousel img').length;
    modalIndex = (modalIndex + 1) % total;
    updateModal();
  });

  // Aquí detectamos qué carrusel fue clickeado
  document.querySelectorAll('.slide img').forEach((img, index) => {
    img.addEventListener('click', () => {
      const carruselId = img.closest('.carousel').id;  // Obtener el ID del carrusel contenedor
      openModal(index, carruselId);
    });
  });
}

function cargarSubimagenes(subimagen, producto) {
  const modalCarousel = document.getElementById('modal-carousel');
  modalCarousel.innerHTML = ''; 

  producto.subimagenes.forEach((subimg) => {
    const img = document.createElement('img');
    img.src = subimg;
    img.dataset.price = producto.precio;
    img.dataset.reference = producto.referencia;
    modalCarousel.appendChild(img);
  });
}

loadProductos();
loadModal();*/



