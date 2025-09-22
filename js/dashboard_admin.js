document.addEventListener("DOMContentLoaded", () => {
    const nombre = document.getElementById("nombre");
    const descripcion = document.getElementById("descripcion");
    const categoria = document.getElementById("categoria");
    const talla = document.getElementById("talla");
    const precio = document.getElementById("precio");
    const cantidad = document.getElementById("cantidad");
    const imagen = document.getElementById("imagen");

    const nombre_p = document.getElementById("nombre_p");
    const descripcion_p = document.getElementById("descripcion_p");
    const categoria_p = document.getElementById("categoria_p");
    const talla_p = document.getElementById("talla_p");
    const precio_p = document.getElementById("precio_p");
    const imagen_p = document.getElementById("imagen_p");

    const bt_guardar = document.getElementById("guardar");
    const bt_cancelar = document.getElementById("cancelar");

    const gridProductos = document.querySelector(".grid-productos");

    // Previsualización
    if (nombre) nombre.addEventListener("input", () => nombre_p.textContent = "Nombre: " + nombre.value);
    if (descripcion) descripcion.addEventListener("input", () => descripcion_p.textContent = "Descripción: " + descripcion.value);
    if (categoria) categoria.addEventListener("input", () => categoria_p.textContent = "Categoría: " + categoria.value);
    if (talla) talla.addEventListener("input", () => talla_p.textContent = "Talla: " + talla.value);
    if (precio) precio.addEventListener("input", () => precio_p.textContent = "Precio: $" + precio.value);
    if (imagen) imagen.addEventListener("input", () => imagen_p.src = imagen.value);

    // Mostrar productos en tarjetas
    function renderProducts(products) {
        gridProductos.innerHTML = "";

        if (!products.length) {
            gridProductos.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        products.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("prod");

            card.innerHTML = `
                <img class="img-prod" src="${p.imageUrl || p.image}" alt="${p.name}">
                <h2>${p.name}</h2>
                <p>${p.description}</p>
                <p class="precio">$${p.price}</p>
                <button class="ver-mas" data-id="${p.id}">Ver más</button>
                <button class="comprar" data-id="${p.id}">Comprar</button>
            `;

            gridProductos.appendChild(card);
        });
    }

    // Obtener productos del backend
    function fetchProducts() {
        fetch("http://localhost:8083/products")
            .then(res => {
                if (!res.ok) throw new Error("Error al traer productos");
                return res.json();
            })
            .then(data => {
                console.log("📦 Productos cargados:", data);
                renderProducts(data);
            })
            .catch(err => {
                console.error("❌ Error cargando productos:", err);
                gridProductos.innerHTML = "<p>Error al cargar productos.</p>";
            });
    }

    // Guardar en backend (Spring Boot)
    if (bt_guardar) {
        bt_guardar.addEventListener("click", () => {
            const producto = {
                name: nombre.value,
                description: descripcion.value,
                category: categoria.value,
                size: talla.value,
                price: parseFloat(precio.value),
                quantity: parseInt(cantidad.value) || 0,
                imageUrl: imagen.value
            };

            if (!producto.name || !producto.price) {
                alert("⚠️ Nombre y precio son obligatorios");
                return;
            }

            fetch("http://localhost:8083/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Error al guardar el producto");
                    return response.json();
                })
                .then(data => {
                    alert("✅ Producto guardado con éxito");
                    console.log("Producto registrado:", data);
                    fetchProducts(); // refrescar tarjetas
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("❌ No se pudo guardar el producto");
                });
        });
    }

    // Cancelar (resetear)
    if (bt_cancelar) {
        bt_cancelar.addEventListener("click", () => {
            document.getElementById("form-producto").reset();
            imagen_p.src = "../assets/images/Logosinfondo.png";
            nombre_p.textContent = "Nombre:";
            descripcion_p.textContent = "Descripción:";
            categoria_p.textContent = "Categoría:";
            talla_p.textContent = "Talla:";
            precio_p.textContent = "Precio:";
        });
    }

    // Al cargar la página, traer productos existentes
    fetchProducts();
});
