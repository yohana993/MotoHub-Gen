const btnCarrito = document.getElementById("btn-carrito");
const carrito = document.querySelector(".carrito");
const cerrarCarrito = document.querySelector(".cerrar-carrito");

btnCarrito.addEventListener("click", () => {
  carrito.classList.add("active");
});

cerrarCarrito.addEventListener("click", () => {
  carrito.classList.remove("active");
});