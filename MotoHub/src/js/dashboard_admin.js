const nombre_p = document.getElementById("nombre_p");
const descripcion_p = document.getElementById("descripcion_p");

const talla_p = document.getElementById("talla_p");
const precio_p = document.getElementById("precio_p");

const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const talla = document.getElementById("talla");
const precio = document.getElementById("precio");

const imagen = document.getElementById("imagen_p");

nombre.addEventListener("input", () => {
  nombre_p.textContent = nombre.value;
});

descripcion.addEventListener("input", () => {
  descripcion_p.textContent = descripcion.value;
});

talla.addEventListener("input", () => {
  talla_p.textContent = talla.value;
});

precio.addEventListener("input", () => {
  precio_p.textContent = precio.value;
});
nombre.addEventListener("input", () => {
  nombre_p.textContent = nombre.value;
});

descripcion.addEventListener("input", () => {
  descripcion_p.textContent = descripcion.value;
});

talla.addEventListener("input", () => {
  talla_p.textContent = talla.value;
});

precio.addEventListener("input", () => {
  precio_p.textContent = precio.value;
});
