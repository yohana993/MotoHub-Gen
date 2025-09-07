
const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

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

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  // Validación de contraseñas
  if (password !== confirmPassword) {
    mensaje.style.color = "red";
    mensaje.innerHTML = "⚠️ Las contraseñas no coinciden.";
    return;
  }

  const usuario = { nombre, telefono, email, password };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.find(u => u.email === email)) {
    mensaje.style.color = "red";
    mensaje.innerHTML = "⚠️ Este correo ya está registrado.";
    return;
  }

  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  mensaje.style.color = "green";
  mensaje.innerHTML = `✅ Usuario "${nombre}" guardado con éxito!`;

  alert(`Usuario "${nombre}" guardado con éxito!`);

  // Redirigir después de 2s
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
});
