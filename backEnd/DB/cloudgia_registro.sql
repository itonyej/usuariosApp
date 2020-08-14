-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-08-2020 a las 16:19:55
-- Versión del servidor: 10.0.38-MariaDB-cll-lve
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cloudgia_registro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `skill` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `skills`
--

INSERT INTO `skills` (`id`, `skill`) VALUES
(1, 'PLANIFICACIÓN'),
(2, 'COMUNICACIÓN'),
(3, 'COMPROMISO'),
(4, 'ORIENTACIÓN AL CLIENTE'),
(5, 'ORGANIZACIÓN'),
(6, 'ANÁLISIS DE PROBLEMAS'),
(7, 'ESPÍRITU COMERCIAL'),
(8, 'AUTOCONFIANZA'),
(9, 'TOLERANCIA AL ESTRÉS'),
(10, 'CAPACIDAD CRÍTICA'),
(11, 'ORIENTACIÓN AL LOGRO'),
(12, 'TRABAJO EN EQUIPO'),
(13, 'DELEGACIÓN'),
(14, 'ORIENTACIÓN ESTRATÉGICA'),
(15, 'DECISIÓN'),
(16, 'PERSUASIÓN'),
(17, 'INICIATIVA'),
(18, 'GESTIÓN'),
(19, 'TENACIDAD'),
(20, 'DISCRECIÓN'),
(21, 'GESTIÓN DEL TIEMPO'),
(22, 'ASERTIVIDAD'),
(23, 'FLEXIBILIDAD'),
(24, 'LIDERAZGO'),
(25, 'NEGOCIACIÓN'),
(26, 'ADAPTABILIDAD'),
(27, 'AUTOMOTIVACIÓN'),
(28, 'AUTOCONOCIMIENTO'),
(29, 'ASUNCIÓN DE RIESGOS'),
(30, 'ESCUCHA'),
(31, 'AUTOCONTROL'),
(32, 'RESOLUCIÓN DE CONFLICTOS'),
(33, 'SOCIABILIDAD'),
(34, 'METICULOSIDAD'),
(35, 'CREATIVIDAD'),
(36, 'AUTONOMÍA'),
(37, 'NETWORKING'),
(38, 'INTEGRIDAD'),
(39, 'AMABILIDAD'),
(40, 'EMPATIA'),
(41, 'AUTOCRÍTICA'),
(42, 'PROACTIVIDAD'),
(43, 'FACILIDAD APRENDIZAJE'),
(44, 'SÍNTESIS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `direccion` varchar(1000) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `cp` varchar(100) DEFAULT NULL,
  `estudios` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `direccion`, `pais`, `cp`, `estudios`) VALUES
(1, 'Jehu Antonio', 'Reynoso Apango', 'Cordillera del Pindo Maravillas #2451 Puebla', 'México', '72220', 'Universitario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
