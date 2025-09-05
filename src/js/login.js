const form = document.getElementById("loginForm");
const mensajeDiv = document.getElementById("mensaje");

// Guardar el usuario administrador si no está presente en el localStorage
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
if (!usuarios.find(u => u.email === "admin1234@motohub.com")) {
  usuarios.push({
    email: "admin1234@motohub.com",
    password: "Generation2025"
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Buscar usuario válido
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    mensajeDiv.style.color = "green";
    mensajeDiv.innerHTML = "Inicio de sesión exitoso!";
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    // Redirigir según el dominio del correo
    if (email.endsWith('@motohub.com')) { // Valida si el correo termina en @motohub.com
      setTimeout(() => {
        window.location.href = "product-admin.html"; // Redirige a admin
      }, 1000);
    } else {
      setTimeout(() => {
        window.location.href = "home.html"; // Redirige a home
      }, 1000);
    }
  } else {
    mensajeDiv.style.color = "red";
    mensajeDiv.innerHTML = "Correo o contraseña incorrectos.";
  }
});
