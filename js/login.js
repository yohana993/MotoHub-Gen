
const form = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");
const mensajeDiv = document.getElementById("mensajeDiv");


// mostrar/ocultar contraseña con imagen
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const iconId = inputId === 'password' ? 'pass-icon' : 'confirm-pass-icon';
  const passwordIcon = document.getElementById(iconId);
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordIcon.src = '../assets/images/password-abierto.png'; 
  } else {
    passwordInput.type = 'password';
    passwordIcon.src = '../assets/images/password-cerrado.png'; 
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Obtener usuarios del localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar usuario válido
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    mensaje.style.color = "green";
    mensajeDiv.style.backgroundColor = "#d1fae57d";
    mensajeDiv.style.filter = "drop-shadow(0px 4px 10px #cddad5ff)";
    mensajeDiv.style.fontSize = "25px";
    mensaje.innerHTML = "Inicio de sesión exitoso!";
    mensajeDiv.style.borderRadius = "8px";
    mensajeDiv.style.padding = "3px";
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  } else {
    mensajeDiv.style.color = "red";
    mensajeDiv.style.backgroundColor = "#f8d7da7d";
    mensajeDiv.style.filter = "drop-shadow(0px 4px 10px #f1c0c6ff)";
    mensajeDiv.style.fontSize = "25px";
    mensajeDiv.style.borderRadius = "8px";
    mensajeDiv.style.padding = "3px";
    mensajeDiv.innerHTML = "Correo o contraseña incorrectos";
  }
});
