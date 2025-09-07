const nombre_p = document.getElementById("nombre_p");
const descripcion_p = document.getElementById("descripcion_p");
const categoria_p = document.getElementById("categoria_p");

const talla_p = document.getElementById("talla_p");
const precio_p = document.getElementById("precio_p");

const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const categoria = document.getElementById("categoria");
const talla = document.getElementById("talla");
const precio = document.getElementById("precio");

const imagen = document.getElementById("imagen_p");

const bt_guardar = document.getElementById("guardar");

nombre.addEventListener("input", () => {
<<<<<<< HEAD
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
=======
  nombre_p.textContent = nombre.value;
});

categoria.addEventListener("change", () => {
  categoria_p.textContent = categoria.value;
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
<<<<<<< HEAD

bt_guardar.addEventListener("click", () => {
  const producto = {
    imagen: imagen.value,
    nombre: nombre.value,
    descripcion: descripcion.value,
    talla: talla.value,
    precio: precio.value,
  };

  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));
  alert("Producto guardado con éxito!");
});
=======
>>>>>>> aa8f1f26da3f22b39fd4c54ff36d8a6e0f9dfadb
>>>>>>> origin
