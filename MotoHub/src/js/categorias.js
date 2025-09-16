document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const paginationContainer = document.createElement("div");
  paginationContainer.id = "pagination";
  document.querySelector(".categorias").appendChild(paginationContainer);

  const PRODUCTS_PER_PAGE = 8; // 👈 2 filas x 4 columnas
  let currentPage = 1;
  let allProducts = [];

  // 🟢 Normalizar productos
  function normalizeProduct(p) {
    return {
      id: p.id || Date.now().toString(),
      name: p.name || p.nombre || "Sin nombre",
      description: p.description || p.descripcion || "",
      category: (p.category || p.categoria || "otro").toLowerCase(),
      price: p.price || p.precio || 0,
      image: p.image || p.imagen || "/assets/images/default.png",
      oldPrice: p.oldPrice || p.precioAnterior || null,
    };
  }

  // 🟢 Obtener productos
  function getProducts() {
    const local1 = JSON.parse(localStorage.getItem("motohub_products")) || [];
    const local2 = JSON.parse(localStorage.getItem("productos")) || [];
    return [...local1, ...local2].map(normalizeProduct);
  }

  // 🟢 Mostrar tarjeta
  function displayProduct(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("card-producto");
    productCard.innerHTML = `
      <div class="card-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="card-body">
        <h3 class="prod-nombre">${product.name}</h3>
        <p class="prod-desc">${product.description}</p>
        <div class="precio-box">
          <span class="precio-actual">$${product.price}</span>
          ${
            product.oldPrice
              ? `<span class="precio-anterior">$${product.oldPrice}</span>`
              : ""
          }
        </div>
        <div class="acciones">
          <button class="btn-ver">Ver más</button>
          <button class="btn-comprar">Comprar</button>
        </div>
      </div>
    `;
    productGrid.appendChild(productCard);
  }

  // 🟢 Banner dinámico
  function showCategoryBanner(category) {
    const bannerContainer = document.getElementById("category-banner");
    if (!bannerContainer) return;
    bannerContainer.innerHTML = "";

    const validCategories = [
      "motos",
      "cascos",
      "accesorios",
      "botas",
      "chaquetas",
      "todo",
    ];
    let normalized = (category || "todo").toLowerCase();
    if (!validCategories.includes(normalized)) normalized = "todo";

    const img = document.createElement("img");
    img.src = `/assets/banners/${normalized}.png`;
    img.alt = `Sección ${normalized}`;
    img.classList.add("banner-img");
    bannerContainer.appendChild(img);
  }

  //  Renderizar productos de la página actual
  function renderPage(page, category = "todo") {
    currentPage = page;
    productGrid.innerHTML = "";

    let filtered =
      category === "todo"
        ? allProducts
        : allProducts.filter((p) => p.category === category);

    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const paginated = filtered.slice(start, end);

    if (paginated.length === 0) {
      productGrid.innerHTML = "<p>No hay productos en esta categoría.</p>";
    } else {
      paginated.forEach((p) => displayProduct(p));
    }

    showCategoryBanner(category);
    renderPagination(filtered.length, category);
  }

  //  Renderizar botones de paginación
  function renderPagination(totalProducts, category) {
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE) || 1;
    paginationContainer.innerHTML = "";

    // Botón anterior
    if (currentPage > 1) {
      const prev = document.createElement("button");
      prev.textContent = "«";
      prev.addEventListener("click", () =>
        renderPage(currentPage - 1, category)
      );
      paginationContainer.appendChild(prev);
    }

    // Botones de página
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.toggle("active", i === currentPage);
      btn.addEventListener("click", () => renderPage(i, category));
      paginationContainer.appendChild(btn);
    }

    // Botón siguiente
    if (currentPage < totalPages) {
      const next = document.createElement("button");
      next.textContent = "»";
      next.addEventListener("click", () =>
        renderPage(currentPage + 1, category)
      );
      paginationContainer.appendChild(next);
    }
  }

  // Enlaces de categorías
  document.querySelectorAll("#category-list a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.getAttribute("data-category").toLowerCase();
      renderPage(1, category);
    });
  });

  allProducts = getProducts();
  renderPage(1, "todo");
});
