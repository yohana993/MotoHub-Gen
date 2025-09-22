const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

// mostrar/ocultar contraseña
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const iconId = inputId === "password" ? "pass-icon" : "confirm-pass-icon";
  const passwordIcon = document.getElementById(iconId);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordIcon.src = "../assets/images/password-abierto.png";
  } else {
    passwordInput.type = "password";
    passwordIcon.src = "../assets/images/password-cerrado.png";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

  // Validación de contraseñas
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "warning",
      title: "Las contraseñas no coinciden",
      text: "Por favor verifica e inténtalo de nuevo.",
      confirmButtonText: "Aceptar",
      color: "#3b3b3b",
      confirmButtonColor: "#f25430",
      customClass: {
        popup: "swal2-popup-custom",
        title: "swal2-title-custom",
        content: "swal2-content-custom",
        confirmButton: "swal2-confirm-custom",
      },
    });
    return;
  }
  // Validación de seguridad de la contraseña con caracteres especiales.
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
  if (!passwordRegex.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Contraseña no válida",
      text: "Debe tener mínimo 8 caracteres, incluyendo mayúscula, minúscula, número y un carácter especial.",
      confirmButtonText: "Aceptar",
      color: "#3b3b3b",
      confirmButtonColor: "#f25430",
    });
    return;
  }

  // Objeto que se enviará al backend
  const usuario = {
    name: nombre,
    phone: telefono,
    email: email,
    password: password,
  };

  // Enviar datos al backend
  fetch("http://localhost:8083/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en el registro");
      }
      return response.json();
    })
    .then((data) => {
      Swal.fire({
        icon: "success",
        title: "¡Usuario creado con éxito!",
        text: "Tu cuenta fue registrada. Ahora inicia sesión.",
        confirmButtonText: "Aceptar",
      }).then(() => {
        window.location.href = "login.html";
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: "No se pudo crear el usuario. Inténtalo más tarde.",
        confirmButtonText: "Aceptar",
      });
      console.error("Error:", error);
    });
});
