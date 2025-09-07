const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const categoria = document.getElementById("categoria");
const talla = document.getElementById("talla");
const precio = document.getElementById("precio");
const imagen = document.getElementById("imagen");

const nombre_p = document.getElementById("nombre_p");
const descripcion_p = document.getElementById("descripcion_p");
const categoria_p = document.getElementById("categoria_p");
const talla_p = document.getElementById("talla_p");
const precio_p = document.getElementById("precio_p");
const imagen_p = document.getElementById("imagen_p");

const bt_guardar = document.getElementById("guardar");
const bt_cancelar = document.getElementById("cancelar");

// Previsualización
nombre.addEventListener("input", () => nombre_p.textContent = "Nombre: " + nombre.value);
descripcion.addEventListener("input", () => descripcion_p.textContent = "Descripción: " + descripcion.value);
categoria.addEventListener("input", () => categoria_p.textContent = "Categoría: " + categoria.value);
talla.addEventListener("input", () => talla_p.textContent = "Talla: " + talla.value);
precio.addEventListener("input", () => precio_p.textContent = "Precio: $" + precio.value);
imagen.addEventListener("input", () => imagen_p.src = imagen.value);

// Guardar en localStorage
bt_guardar.addEventListener("click", () => {
    const producto = {
        imagen: imagen.value,
        nombre: nombre.value,
        descripcion: descripcion.value,
        categoria: categoria.value,
        talla: talla.value,
        precio: precio.value,
    };

    if (!producto.nombre || !producto.precio) {
        alert("⚠️ Nombre y precio son obligatorios");
        return;
    }

    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    alert("✅ Producto guardado con éxito");
});

// Cancelar (resetear)
bt_cancelar.addEventListener("click", () => {
    document.getElementById("form-producto").reset();
    imagen_p.src = "../assets/images/Logosinfondo.png";
    nombre_p.textContent = "Nombre:";
    descripcion_p.textContent = "Descripción:";
    categoria_p.textContent = "Categoría:";
    talla_p.textContent = "Talla:";
    precio_p.textContent = "Precio:";
});
