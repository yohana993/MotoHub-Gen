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
    overlay.style.zIndex = "0"; // debajo del panel
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