document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const btnCuenta = document.querySelector(".botones-carrito-buscar");
  const avatarImg = btnCuenta.querySelector(".avatar");

  if (usuarioActivo) {
    // Usuario logueado
    btnCuenta.classList.add("logueado");
    avatarImg.src = "../assets/images/avatar-logueado.png"; // Cambia la imagen
  } else {
    // Usuario no logueado
    btnCuenta.classList.remove("logueado");
    avatarImg.src = "../assets/images/avatar.png"; // Imagen por defecto
  }
});


