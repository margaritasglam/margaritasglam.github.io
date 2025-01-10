/*let productos = []; 

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
  loadProductos('../lenceria.JSON'),
  loadProductos('../ropa_deportiva.JSON'),
  loadProductos('../vestidos_de_bano.JSON'),
  loadProductos('../pijamas.JSON')
]).then(() => {
  loadModal();  
});
*/

let productos = [];
let modalIndex = 0; 

async function openModal(index, archivoJson) {
  const response = await fetch(archivoJson);
  const data = await response.json();
  const producto = data.productos[index];
  if (!producto) {
    console.error('Producto no encontrado');
    return;
  }

  const modalCarousel = document.getElementById('modal-carousel');
  modalCarousel.innerHTML = ''; 

  if (producto.subimagenes && producto.subimagenes.length > 0) {
    producto.subimagenes.forEach((subimagen, idx) => {
      const img = document.createElement('img');
      img.src = subimagen;
      img.dataset.price = producto.precio;
      img.dataset.reference = producto.referencia;
      img.dataset.index = idx; 
      modalCarousel.appendChild(img);

      img.addEventListener('click', () => cargarSubimagenes(subimagen, producto, idx));
    });
  } else {
    console.error('No se encontraron subimágenes para este producto');
  }

  document.getElementById('price').textContent = `Precio: $${producto.precio}`;
  document.getElementById('reference').textContent = `Referencia: ${producto.referencia}`;

  document.getElementById('image-modal').classList.add('show');

  modalIndex = 0;
  updateModal();
}

function cargarSubimagenes(subimagen, producto, index) {
  const modalCarousel = document.getElementById('modal-carousel');
  modalCarousel.innerHTML = '';

  producto.subimagenes.forEach((subimg, idx) => {
    const img = document.createElement('img');
    img.src = subimg;
    img.dataset.price = producto.precio;
    img.dataset.reference = producto.referencia;
    img.dataset.index = idx; 
    modalCarousel.appendChild(img);
  });

  modalIndex = index;
  updateModal();
}

function updateModal() {
  const modalCarousel = document.getElementById('modal-carousel');
  const offset = -modalIndex * 100;
  modalCarousel.style.transform = `translateX(${offset}%)`;

  const images = document.querySelectorAll('#modal-carousel img');
  const currentImage = images[modalIndex];
  document.getElementById('price').textContent = `Precio: ${currentImage.dataset.price}`;
  document.getElementById('reference').textContent = `Referencia: ${currentImage.dataset.reference}`;
}

function setupModalEvents() {
  if (!document.getElementById('image-modal')) {
    return;
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
}

async function loadModal() {
  const response = await fetch('components/modal.html');
  const modalHTML = await response.text();
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  setupModalEvents();
}

loadModal();

