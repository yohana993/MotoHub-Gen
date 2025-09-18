// Función para cargar el footer dinámicamente
function loadFooter() {
    // Crear el elemento footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="brand-section">
                    <div class="logo">
                        <img src="../images/Logosinfondo.png" alt="Motohub Logo">
                    </div>
                    <p></p>
                </div>
                <div class="footer-section">
                    <h6>ENLACES</h6>
                    <ul>
                        <li><a href="../pages/Home.html">Inicio</a></li>
                        <li><a href="../pages/categorias.html">Catálogo</a></li>
                        <li><a href="../pages/Contactenos.html">Contacto</a></li>
                        <li><a href="../pages/acercaNosotros.html">Acerca de</a></li>
                    </ul>
                </div>
                <div class="footer-section contact-info">
                    <h6>CONTACTO</h6>
                    <p><i class="bi bi-envelope"></i> serviciomotohub@gmail.com</p>
                    <p><i class="bi bi-geo-alt"></i> Colombia</p>
                </div>
                <div class="footer-section">
                    <h6>SÍGUENOS</h6>
                    <div class="social-links">
                        <a href="#"><i class="bi bi-facebook"></i></a>
                        <a href="#"><i class="bi bi-instagram"></i></a>
                        <a href="#"><i class="bi bi-twitter"></i></a>
                        <a href="#"><i class="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2025 MotoHub. Todos los derechos reservados.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', loadFooter);
