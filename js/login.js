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
    passwordIcon.src = '../images/password-abierto.png'; 
  } else {
    passwordInput.type = 'password';
    passwordIcon.src = '../images/password-cerrado.png'; 
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const url = email.endsWith("@motohub.com") 
    ? "http://localhost:8083/admin/login"
    : "http://localhost:8083/user/login";

  const credenciales = { email, password };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credenciales)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }
    return response.text().then(text => {
      try {
        return JSON.parse(text); //  si backend manda JSON
      } catch (e) {
        return { message: text }; //  si backend manda texto
      }
    });
  })
  .then(data => {
    console.log("Respuesta backend:", data);

    mensaje.style.color = "green";
    mensajeDiv.style.backgroundColor = "#d1fae57d";
    mensajeDiv.style.filter = "drop-shadow(0px 4px 10px #cddad5ff)";
    mensajeDiv.style.fontSize = "25px";
    mensaje.innerHTML = "Inicio de sesión exitoso!";
    mensajeDiv.style.borderRadius = "8px";
    mensajeDiv.style.padding = "3px";

    // Guardar en localStorage (puedes almacenar datos o token)
    localStorage.setItem("usuarioActivo", JSON.stringify(data));

    // Redirección según rol
    setTimeout(() => {
      if (email.endsWith("@motohub.com")) {
        window.location.href = "dashboard_admin.html"; 
      } else {
        window.location.href = "home.html";
      }
    }, 1000);
  })
  .catch(error => {
    mensajeDiv.style.color = "red";
    mensajeDiv.style.backgroundColor = "#f8d7da7d";
    mensajeDiv.style.filter = "drop-shadow(0px 4px 10px #f1c0c6ff)";
    mensajeDiv.style.fontSize = "25px";
    mensajeDiv.style.borderRadius = "8px";
    mensajeDiv.style.padding = "3px";
    mensajeDiv.innerHTML = "Correo o contraseña incorrectos";
    console.error("Error en login:", error);
  });
});
