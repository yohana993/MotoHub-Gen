-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-09-2025 a las 05:31:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `motohub_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`, `phone`, `username`) VALUES
(1, 'Laura Torres', 'admin123', '3001114455', 'laura@motohub.com'),
(2, 'Sergio Mesa', 'clave456', '3102225566', 'sergio@motohub.com'),
(3, 'Johana D?az', 'secure789', '3203336677', 'johana@motohub.com'),
(4, 'Andr?s L?pez', 'qwerty321', '3504447788', 'andres@motohub.com'),
(5, 'Camila Mart?nez', 'root999', '3015558899', 'camila@motohub.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `talla` varchar(50) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `categoria`, `talla`, `precio`, `cantidad`, `imagen_url`) VALUES
(1, 'Casco Integral LS2', 'Casco integral de alta seguridad con visor antivaho', 'Accesorios', 'M', 320000.00, 10, 'imagenes/casco_ls2.jpg'),
(2, 'Guantes Racing Pro', 'Guantes de cuero con protecci?n para nudillos', 'Accesorios', 'L', 85000.00, 25, 'imagenes/guantes_racing.jpg'),
(3, 'Chaqueta Motera Touring', 'Chaqueta impermeable con protecciones en hombros y codos', 'Ropa', 'XL', 450000.00, 15, 'imagenes/chaqueta_touring.jpg'),
(4, 'Botas Adventure X', 'Botas resistentes al agua con suela antideslizante', 'Calzado', '42', 280000.00, 12, 'imagenes/botas_adventure.jpg'),
(5, 'Aceite Motul 7100', 'Aceite sint?tico para motores de 4 tiempos', 'Repuestos', NULL, 65000.00, 30, 'imagenes/aceite_motul.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `password`, `phone`) VALUES
(1, 'angels.fernandez@example.com', 'Angels Fern?ndez', 'clave123', '3001112233'),
(2, 'sergio.mesa@example.com', 'Sergio Mesa', 'pass456', '3102223344'),
(3, 'johana.rodriguez@example.com', 'Johana Rodr?guez', 'qwerty789', '3203334455'),
(4, 'camila.garcia@example.com', 'Camila Garc?a', 'secure321', '3504445566'),
(5, 'andres.martinez@example.com', 'Andr?s Mart?nez', 'admin999', '3015556677');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
