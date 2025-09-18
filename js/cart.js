const btnCarrito = document.getElementById("btn-carrito");
const carrito = document.querySelector(".carrito");
const cerrarCarrito = document.querySelector(".cerrar-carrito");

let overlay = null;

function abrirCarrito() {
  if (!carrito) return;
  carrito.classList.add("active");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "carrito-overlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = "0";
    overlay.addEventListener("click", cerrarCarritoFn);
  }
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
}

function cerrarCarritoFn() {
  if (!carrito) return;
  carrito.classList.remove("active");
  if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  document.body.style.overflow = "";
}

btnCarrito && btnCarrito.addEventListener("click", abrirCarrito);
cerrarCarrito && cerrarCarrito.addEventListener("click", cerrarCarritoFn);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarCarritoFn();
});

const carritoContainer = document.querySelector(".contenedor-productos");
const totalEl = document.getElementById("carrito-total-valor");
const checkoutBtn = document.getElementById("btn-checkout");

// --- Estado y utilidades ---
const CART_KEY = "motohub_cart";

function parsePriceToNumber(valor) {
  // acepta formatos como "$1.500.000", "150000", "1,500,000"
  if (typeof valor === "number") return valor;
  const limpio = String(valor)
    .replace(/precio\s*:\s*/i, "")
    .replace(/[^0-9.,-]/g, "")
    .replace(/\./g, "") 
    .replace(/,/g, "."); 
  const num = parseFloat(limpio);
  return isNaN(num) ? 0 : num;
}

function formatCurrency(num) {
  const n = typeof num === "number" ? num : parsePriceToNumber(num);
  return n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function calcTotal(items) {
  return items.reduce((acc, it) => acc + parsePriceToNumber(it.price) * (it.qty || 1), 0);
}

function renderCart() {
  if (!carritoContainer) return;
  const items = getCart();
  carritoContainer.innerHTML = "";

  items.forEach((it) => {
    const item = document.createElement("div");
    item.classList.add("card");
    item.dataset.id = it.id;
    item.innerHTML = `
      <img src="${it.image}" alt="${it.name}" />
      <div class=\"text-card\">
        <h3>${it.name}</h3>
        <h4>${formatCurrency(it.price)}</h4>
      </div>
      <div class=\"cantidad-producto\">
        <input class=\"cantidad-input\" type=\"number\" value="${it.qty || 1}" min=\"1\">
        <button class=\"eliminar\">
          <lord-icon src=\"https://cdn.lordicon.com/kfzfxczd.json\" colors=\"primary:#1F1F1F\" trigger=\"hover\" style=\"width:30px;height:30px\"></lord-icon>
        </button>
      </div>
    `;

    // listeners por item
    item.querySelector(".eliminar").addEventListener("click", () => {
      removeFromCart(it.id);
    });
    item.querySelector(".cantidad-input").addEventListener("change", (ev) => {
      const val = Math.max(1, parseInt(ev.target.value || "1", 10));
      updateQty(it.id, val);
    });

    carritoContainer.appendChild(item);
  });

  if (totalEl) totalEl.textContent = formatCurrency(calcTotal(items));
}

function addToCart(prod) {
  const items = getCart();
  const idx = items.findIndex((x) => x.id === prod.id);
  if (idx >= 0) {
    items[idx].qty = (items[idx].qty || 1) + (prod.qty || 1);
  } else {
    items.push({ id: prod.id, name: prod.name, price: parsePriceToNumber(prod.price), image: prod.image, qty: prod.qty || 1 });
  }
  setCart(items);
  renderCart();
}

function removeFromCart(id) {
  const items = getCart().filter((x) => x.id !== id);
  setCart(items);
  renderCart();
}

function updateQty(id, qty) {
  const items = getCart();
  const idx = items.findIndex((x) => x.id === id);
  if (idx >= 0) {
    items[idx].qty = qty;
    setCart(items);
    renderCart();
  }
}


document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  // Soportar ambas clases: .btn-comprar (estático) y .comprar (dinámico)
  if (!btn.classList.contains("btn-comprar") && !btn.classList.contains("comprar")) {
    return;
  }

  if (!carritoContainer) return;

  // Detectar el tipo de tarjeta y extraer datos
  const cardProyecto = btn.closest(".card-proyecto");
  const cardProd = btn.closest(".prod");

  let nombre = "";
  let precio = "";
  let imagen = "";
  let id = btn.dataset.id || "";

  if (cardProyecto) {
    // Estructura de Home.html (Productos Recomendados)
    nombre = (cardProyecto.querySelector("h3")?.textContent || "").trim();
    const precioTexto = cardProyecto.querySelector(".js p")?.textContent || "";
    precio = precioTexto.replace(/\s*precio:\s*/i, "").trim();
    imagen = cardProyecto.querySelector("img")?.src || "";
    if (!id) {
      // generar id estable a partir del nombre+imagen
      id = `static-${(nombre || imagen).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    }
  } else if (cardProd) {
    // Estructura dinámica renderizada por Home.js (grid-productos)
    nombre = (cardProd.querySelector("h2")?.textContent || "").trim();
    precio = (cardProd.querySelector(".precio")?.textContent || "").trim();
    imagen = cardProd.querySelector(".img-prod")?.src || "";
    if (!id) {
      id = cardProd.querySelector(".comprar")?.dataset.id || `dyn-${(nombre || imagen).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    }
  } else {
    // Si no se reconoce la tarjeta, no hacemos nada
    return;
  }

  addToCart({ id, name: nombre, price: precio, image: imagen, qty: 1 });

  // Abrir carrito al añadir
  abrirCarrito();
});


checkoutBtn && checkoutBtn.addEventListener("click", () => {
  const items = getCart();
  if (!items.length) {
    alert("Tu carrito está vacío.");
    return;
  }
  const total = formatCurrency(calcTotal(items));
  alert(`Gracias por tu compra. Total: ${total}`);

  setCart([]);
  renderCart();
});

// Inicializar carrito desde localStorage
renderCart();

