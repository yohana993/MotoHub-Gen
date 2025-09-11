// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            const form = this;
            const formData = new FormData(form);
            const nombre = formData.get('nombre');
            const apellido = formData.get('apellido');
            const email = formData.get('email');
            const mensaje = formData.get('mensaje');
            
            // Validaciones básicas
            if (!nombre || nombre.length < 2) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Nombre requerido',
                    text: 'Por favor ingresa tu nombre completo.',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
            
            if (!email || !email.includes('@')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Correo inválido',
                    text: 'Por favor ingresa un correo electrónico válido.',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
            
            if (!mensaje || mensaje.length < 10) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Mensaje muy corto',
                    text: 'Por favor escribe un mensaje de al menos 10 caracteres.',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
            
            // Simular envío exitoso
            Swal.fire({
                icon: 'success',
                title: '¡Correo enviado!',
                text: 'Tu mensaje fue enviado correctamente. Pronto te contactaremos.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#6c5ce7',
                customClass: {
                    popup: 'swal2-popup-custom',
                    title: 'swal2-title-custom',
                    content: 'swal2-content-custom',
                    confirmButton: 'swal2-confirm-custom'
                }
            }).then(() => {
                // Limpiar formulario después de enviar
                form.reset();
            });
        });
    }
});
