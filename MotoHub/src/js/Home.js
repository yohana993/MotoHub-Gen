// 🟢 Normalizar productos (asegura que todos tengan las mismas propiedades)
function normalizeProduct(p) {
  return {
    id: p.id || Date.now().toString(),
    name: p.name || p.nombre || "Producto sin nombre",
    description: p.description || p.descripcion || "Sin descripción disponible",
    category: (p.category || p.categoria || "otro").toLowerCase(),
    price: p.price || p.precio || 0,
    image: p.image || p.imagen || "default-image.png",
    oldPrice: p.oldPrice || p.precioAnterior || null,
  };
}

// 🟢 Obtener productos desde localStorage
function getProducts() {
  const productos = JSON.parse(localStorage.getItem("motohub_products")) || [];
  return productos.map(normalizeProduct);
}

// 🟢 Mostrar productos en la cuadrícula
function loadProductsFromLocalStorage() {
  const productos = getProducts();

  // Seleccionar el contenedor donde se mostrarán los productos
  const gridProductos = document.querySelector(".grid-productos");

  // Limpiar la cuadrícula antes de agregar productos (evita duplicados)
  gridProductos.innerHTML = "";

  if (productos.length === 0) {
    gridProductos.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  // Crear las tarjetas dinámicamente
  productos.forEach((producto) => {
    const productCard = document.createElement("div");
    productCard.classList.add("prod");

    productCard.innerHTML = `
            <img class="img-prod" src="${producto.image}" alt="${
      producto.name
    }">
            <h2>${producto.name}</h2>
            <p>${producto.description}</p>
            <p class="precio">$${producto.price}</p>
            ${
              producto.oldPrice
                ? `<p class="precio-anterior">$${producto.oldPrice}</p>`
                : ""
            }
            <button class="ver-mas" data-id="${producto.id}">Ver más</button>
            <button class="comprar" data-id="${producto.id}">Comprar</button>
        `;

    gridProductos.appendChild(productCard);
  });
}

// 🟢 (Opcional) Insertar productos de prueba si localStorage está vacío
function seedProducts() {
  if (!localStorage.getItem("motohub_products")) {
    const sample = [
      {
        id: 1,
        name: "Casco Pro",
        description: "Casco de alta seguridad",
        category: "cascos",
        price: 300000,
        image: "/MotoHub/src/assets/images/casco1.png",
      },
      {
        id: 2,
        name: "Guantes Moto",
        description: "Guantes de cuero reforzado",
        category: "accesorios",
        price: 120000,
        image: "/MotoHub/src/assets/images/guantes1.png",
      },
      {
        id: 3,
        name: "Chaqueta Touring",
        description: "Chaqueta impermeable y térmica",
        category: "chaquetas",
        price: 450000,
        image: "/MotoHub/src/assets/images/chaqueta1.png",
        oldPrice: 500000,
      },
    ];
    localStorage.setItem("motohub_products", JSON.stringify(sample));
    console.log("✅ Productos de prueba añadidos al localStorage");
  }
}

// script de carrucel
const carrucelHero = document.querySelector('.carrucel-hero');
const carrucelTrack = document.querySelector('.carrucel-track');
// Seleccionar todas las secciones dentro del track, sin importar su clase específica
const slides = carrucelTrack ? Array.from(carrucelTrack.children) : [];

if (carrucelHero && carrucelTrack && slides.length) {
  let index = 0; // índice actual
  let slideWidth = carrucelHero.clientWidth;
  let intervalId = null;

  function applySizes() {
    slideWidth = carrucelHero.clientWidth;
    // Asignar ancho exacto en px a cada slide y a la pista
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });
    carrucelTrack.style.width = `${slideWidth * slides.length}px`;
    // Reposicionar acorde al índice actual
    carrucelTrack.style.transition = 'none';
    carrucelTrack.style.transform = `translateX(-${index * slideWidth}px)`;
    // Forzar próximo frame para reactivar la transición
    requestAnimationFrame(() => {
      carrucelTrack.style.transition = 'transform 0.8s ease-in-out';
    });
  }

  function moverCarrucel() {
    index = (index + 1) % slides.length;
    carrucelTrack.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (slides.length > 1) {
      intervalId = setInterval(moverCarrucel, 3000);
    }
  }

  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Inicializar
  applySizes();
  startAutoPlay();

  // Recalcular en resize
  window.addEventListener('resize', () => {
    applySizes();
  });

  // Opcional: pausa en hover
  carrucelHero.addEventListener('mouseenter', stopAutoPlay);
  carrucelHero.addEventListener('mouseleave', startAutoPlay);
}
