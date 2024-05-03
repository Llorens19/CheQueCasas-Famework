-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2024 a las 20:40:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chequecasas`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `like_user` (IN `user` VARCHAR(255), IN `id_build` INT, OUT `accion` VARCHAR(255))   BEGIN 
    DECLARE existe INT;
    DECLARE ref_cat VARCHAR(255);
    DECLARE id INT;

    SELECT COUNT(*) INTO existe
    FROM likes l
    WHERE user like l.username and l.id_building like id_build;


    if existe = 0 THEN

        SELECT b.ref_cat INTO ref_cat
        FROM building b  
        WHERE b.id_building = id_build;

        SELECT u.id_user INTO id
        FROM user u  
        WHERE u.username = user;

        INSERT INTO likes (id_user, id_building, ref_cat, username, `date`) 
        values (id, id_build, ref_cat, user, NOW());
		SET accion = "add";
    ELSE

        DELETE FROM likes WHERE user like username and id_building like id_build;
		SET accion = "remove";
    END IF; 




END$$

--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `like_user_function` (`user` VARCHAR(255), `id_build` INT) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN 
    DECLARE existe INT;
    DECLARE ref_cat VARCHAR(255);
    DECLARE id INT;
    DECLARE accion VARCHAR(255);

    SELECT COUNT(*) INTO existe
    FROM likes l
    WHERE user like l.username and l.id_building like id_build;

    IF existe = 0 THEN
        SELECT b.ref_cat INTO ref_cat
        FROM building b  
        WHERE b.id_building = id_build;

        SELECT u.id_user INTO id
        FROM user u  
        WHERE u.username = user;

        INSERT INTO likes (id_user, id_building, ref_cat, username, `date`) 
        VALUES (id, id_build, ref_cat, user, NOW());
        SET accion = "add";
    ELSE
        DELETE FROM likes WHERE user like username and id_building like id_build;
        SET accion = "remove";
    END IF; 
    
    RETURN accion;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `building`
--

CREATE TABLE `building` (
  `id_building` int(11) NOT NULL,
  `ref_cat` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `room_number` int(11) NOT NULL,
  `bathroom_number` int(11) NOT NULL,
  `garage` varchar(255) NOT NULL,
  `heating` varchar(255) NOT NULL,
  `publication_date` date NOT NULL,
  `m2` decimal(8,2) NOT NULL,
  `id_type` int(11) NOT NULL,
  `id_city` int(11) NOT NULL,
  `id_operations` int(11) NOT NULL,
  `id_home_automation` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `building`
--

INSERT INTO `building` (`id_building`, `ref_cat`, `price`, `room_number`, `bathroom_number`, `garage`, `heating`, `publication_date`, `m2`, `id_type`, `id_city`, `id_operations`, `id_home_automation`, `views`, `latitude`, `longitude`) VALUES
(1, 'REF123', 500001, 3, 2, 'Yes', 'Central Heating', '2024-01-26', 150.50, 1, 1, 1, 3, 150, 40.1865, -3.56637),
(2, 'REF456', 750000, 4, 3, 'Yes', 'Radiators', '2024-01-25', 200.75, 2, 2, 2, 2, 42, 41.2632, 2.05181),
(3, 'REF789', 1000000, 5, 4, 'Yes', 'Underfloor Heating', '2024-01-24', 300.00, 4, 5, 4, 1, 10, 41.7064, -1.1362),
(4, 'REFABC', 600000, 3, 2, 'Yes', 'Central Heating', '2024-03-07', 160.25, 2, 1, 2, 3, 18, 40.5084, -3.40447),
(5, 'REFDEF', 800000, 4, 3, 'Yes', 'Radiators', '2024-03-07', 180.50, 1, 2, 1, 2, 13, 41.1069, 1.98458),
(6, 'REFGHI', 1200000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-07', 250.75, 3, 3, 3, 1, 27, 39.6603, -0.357879),
(7, 'REFJKL', 900000, 4, 3, 'Yes', 'Central Heating', '2024-03-07', 200.00, 1, 1, 2, 4, 16, 40.2377, -3.75441),
(8, 'REFMNO', 1100000, 5, 4, 'Yes', 'Radiators', '2024-03-07', 220.30, 4, 2, 1, 1, 2, 41.3693, 1.9461),
(9, 'REFPQR', 950000, 4, 3, 'Yes', 'Underfloor Heating', '2024-03-07', 190.75, 2, 3, 3, 2, 10, 39.2809, -0.339576),
(10, 'REFSTU', 1300000, 6, 5, 'Yes', 'Radiators', '2024-03-07', 280.00, 3, 1, 2, 4, 5, 40.2675, -3.66033),
(129, 'REFXYZ', 620000, 3, 2, 'Yes', 'Central Heating', '2024-03-24', 155.75, 3, 1, 3, 2, 1, 40.182, -3.50832),
(130, 'REF1234', 850000, 4, 3, 'Yes', 'Radiators', '2024-03-24', 190.25, 5, 2, 1, 3, 0, 41.567, 2.19622),
(131, 'REF5678', 1100000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 225.50, 2, 3, 2, 4, 0, 39.3384, -0.20202),
(132, 'REF91011', 720000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 180.00, 1, 4, 3, 1, 0, 38.5884, -0.800768),
(133, 'REF121314', 920000, 4, 3, 'Yes', 'Radiators', '2024-03-24', 195.75, 4, 1, 1, 2, 0, 40.4492, -3.85961),
(134, 'REF151617', 1180000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 240.30, 3, 2, 2, 3, 0, 41.4088, 2.45956),
(135, 'REF181920', 780000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 170.50, 2, 5, 3, 4, 0, 41.5084, -0.949688),
(136, 'REF212223', 1020000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 215.75, 1, 6, 1, 1, 1, 38.6409, -0.433343),
(137, 'REF242526', 1320000, 6, 5, 'Yes', 'Underfloor Heating', '2024-03-24', 260.00, 5, 7, 2, 2, 0, 37.3004, -6.04323),
(138, 'REF272829', 840000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 175.25, 3, 8, 3, 3, 0, 42.395, -0.42657),
(139, 'REF303132', 970000, 4, 3, 'Yes', 'Radiators', '2024-03-24', 185.75, 4, 9, 1, 4, 0, 43.3924, -5.95046),
(140, 'REF333435', 1220000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 230.30, 2, 10, 2, 1, 0, 39.3207, 2.57897),
(141, 'REF363738', 890000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 165.50, 1, 11, 3, 2, 0, 28.2142, -15.6693),
(142, 'REF394041', 1050000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 195.75, 5, 12, 1, 3, 0, 28.1866, -16.1376),
(143, 'REF424344', 1280000, 6, 5, 'Yes', 'Underfloor Heating', '2024-03-24', 255.00, 3, 13, 2, 4, 0, 43.4449, -6.07965),
(144, 'REF454647', 860000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 170.25, 2, 1, 3, 1, 0, 40.5187, -3.4041),
(145, 'REF484950', 990000, 4, 3, 'Yes', 'Radiators', '2024-03-24', 190.75, 4, 2, 1, 2, 0, 41.6778, 2.43806),
(146, 'REF515253', 1250000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 235.30, 1, 3, 2, 3, 0, 39.6149, -0.145082),
(147, 'REF545556', 920000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 175.50, 3, 4, 3, 4, 0, 38.6436, -0.695464),
(148, 'REF575859', 1040000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 205.75, 5, 5, 1, 1, 0, 41.442, -0.756584),
(149, 'REF606162', 870000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 180.75, 2, 6, 2, 2, 0, 38.6054, -0.590011),
(150, 'REF636465', 1000000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 195.50, 3, 7, 3, 3, 0, 37.2235, -5.95785),
(151, 'REF666768', 1150000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 215.25, 1, 8, 1, 4, 0, 41.8526, -0.394448),
(152, 'REF697071', 790000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 175.00, 4, 9, 2, 1, 0, 43.3801, -6.10851),
(153, 'REF727374', 950000, 4, 3, 'Yes', 'Radiators', '2024-03-24', 185.75, 5, 10, 3, 2, 0, 39.7674, 2.88696),
(154, 'REF757677', 1200000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 240.30, 2, 11, 1, 3, 0, 28.4138, -15.595),
(155, 'REF787980', 830000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 170.25, 3, 12, 2, 4, 0, 27.959, -16.2982),
(156, 'REF808182', 970000, 4, 3, 'Yes', 'Radiators', '2024-03-24', 190.75, 1, 13, 3, 1, 0, 43.3247, -5.59915),
(157, 'REF838485', 1250000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 230.30, 4, 1, 1, 2, 0, 40.2819, -3.62948),
(158, 'REF868788', 890000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 175.50, 5, 2, 2, 3, 0, 41.2613, 2.23142),
(159, 'REF899091', 1030000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 195.75, 2, 3, 3, 4, 0, 39.2314, -0.242747),
(160, 'REF929394', 1280000, 6, 5, 'Yes', 'Underfloor Heating', '2024-03-24', 255.00, 3, 4, 1, 1, 0, 38.7058, -0.691387),
(161, 'REF959697', 920000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 170.75, 4, 5, 2, 2, 0, 41.8758, -1.00014),
(162, 'REF9899100', 1070000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 205.50, 1, 6, 3, 3, 0, 39.0865, -0.454189),
(163, 'REF101102103', 1310000, 6, 5, 'Yes', 'Underfloor Heating', '2024-03-24', 245.30, 2, 7, 1, 4, 0, 37.6595, -5.98527),
(164, 'REF104105106', 860000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 175.25, 3, 8, 2, 1, 0, 42.2075, -0.337676),
(165, 'REF107108109', 990000, 4, 3, 'Yes', 'Radiators', '2024-03-24', 185.75, 5, 9, 3, 2, 0, 43.1992, -5.98315),
(166, 'REF110111112', 1260000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 235.00, 1, 10, 1, 3, 0, 39.7368, 2.35786),
(167, 'REF113114115', 930000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 180.75, 2, 11, 2, 4, 0, 28.2601, -15.3761),
(168, 'REF116117118', 1050000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 200.25, 3, 12, 3, 1, 0, 28.3147, -16.3768),
(169, 'REF119120121', 880000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 185.50, 4, 1, 2, 2, 0, 40.1195, -3.9161),
(170, 'REF122123124', 1040000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 195.75, 5, 2, 3, 3, 0, 41.5155, 1.96242),
(171, 'REF125126127', 1180000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 215.30, 1, 3, 1, 4, 0, 39.5237, -0.374279),
(172, 'REF128129130', 800000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 170.75, 2, 4, 2, 1, 0, 38.9713, -0.769433),
(173, 'REF131132133', 980000, 4, 3, 'Yes', 'Radiators', '2024-03-24', 190.25, 3, 5, 3, 2, 0, 41.8891, -0.699214),
(174, 'REF134135136', 1260000, 6, 5, 'Yes', 'Underfloor Heating', '2024-03-24', 240.00, 4, 6, 1, 3, 0, 38.751, -0.63427),
(175, 'REF137138139', 840000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 175.25, 5, 7, 2, 4, 0, 37.1655, -6.11511),
(176, 'REF140141142', 980000, 4, 3, 'Yes', 'Radiators', '2024-03-24', 190.75, 1, 8, 3, 1, 0, 41.8404, -0.583959),
(177, 'REF143144145', 1270000, 5, 4, 'Yes', 'Underfloor Heating', '2024-03-24', 230.50, 2, 9, 1, 2, 0, 43.0693, -5.89392),
(178, 'REF146147148', 900000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 175.75, 3, 10, 2, 3, 0, 39.3727, 2.66969),
(179, 'REF149150151', 1020000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 195.25, 4, 11, 3, 4, 0, 27.9116, -15.6544),
(180, 'REF152153154', 1280000, 6, 5, 'Yes', 'Underfloor Heating', '2024-03-24', 245.30, 1, 12, 1, 1, 0, 27.9688, -16.0712),
(181, 'REF155156157', 880000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 175.50, 2, 13, 2, 2, 0, 43.2304, -5.55149),
(182, 'REF158159160', 1050000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 200.75, 3, 1, 3, 3, 0, 40.2031, -3.56688),
(183, 'REF161162163', 1300000, 6, 5, 'Yes', 'Underfloor Heating', '2024-03-24', 235.00, 4, 2, 1, 4, 0, 41.2109, 2.39178),
(184, 'REF164165166', 920000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 180.75, 5, 3, 2, 1, 0, 39.5843, -0.159403),
(185, 'REF167168169', 1030000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 195.25, 1, 4, 3, 2, 0, 38.6639, -0.551041),
(186, 'REF170171172', 1270000, 6, 5, 'Yes', 'Underfloor Heating', '2024-03-24', 240.50, 2, 5, 1, 3, 0, 41.5033, -0.883656),
(187, 'REF173174175', 910000, 4, 3, 'Yes', 'Central Heating', '2024-03-24', 185.75, 3, 6, 2, 4, 0, 38.9864, -0.704195),
(188, 'REF176177178', 1040000, 5, 4, 'Yes', 'Radiators', '2024-03-24', 205.30, 4, 7, 3, 1, 0, 37.3098, -5.7837);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `n_category` varchar(255) NOT NULL,
  `img_category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_category`, `n_category`, `img_category`) VALUES
(1, 'first_line', 'first_line_image.jpg'),
(2, 'rural', 'rural_image.jpg'),
(3, 'nature', 'nature_image.jpg'),
(4, 'pool', 'pool_image.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category_building`
--

CREATE TABLE `category_building` (
  `id_category` int(11) NOT NULL,
  `id_building` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category_building`
--

INSERT INTO `category_building` (`id_category`, `id_building`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1),
(4, 2),
(4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `id_city` int(11) NOT NULL,
  `n_city` varchar(255) NOT NULL,
  `img_city` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id_city`, `n_city`, `img_city`) VALUES
(1, 'Madrid', 'madrid.jpg'),
(2, 'Barcelona', 'barcelona.jpg'),
(3, 'Valencia', 'valencia.jpg'),
(4, 'Ontinyent', 'ontinyent.jpg'),
(5, 'Zaragoza', 'zaragoza.jpg'),
(6, 'Aielo (Segons Alex)', 'aielo.jpg'),
(7, 'Sevilla', 'sevilla.jpg'),
(8, 'Huesca', 'huesca.jpg'),
(9, 'Oviedo', 'oviedo.jpg'),
(10, 'Palma de Mallorca', 'mallorca.jpg'),
(11, 'Las Palmas', 'las_palmas.jpg'),
(12, 'Tenerife', 'tenerife.jpg'),
(13, 'Santander', 'santander.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `filters_table`
--

CREATE TABLE `filters_table` (
  `id_filter` int(11) NOT NULL,
  `n_table` varchar(255) DEFAULT NULL,
  `id_type_filter` int(11) DEFAULT NULL,
  `text_filter` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `filters_table`
--

INSERT INTO `filters_table` (`id_filter`, `n_table`, `id_type_filter`, `text_filter`) VALUES
(1, 'type', 3, 'Tipo inmueble'),
(2, 'operations', 3, 'Operación'),
(3, 'city', 3, 'Ciudades'),
(4, 'home_automation', 2, 'Domótica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `home_automation`
--

CREATE TABLE `home_automation` (
  `id_home_automation` int(11) NOT NULL,
  `n_home_automation` varchar(255) DEFAULT NULL,
  `img_home_automation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `home_automation`
--

INSERT INTO `home_automation` (`id_home_automation`, `n_home_automation`, `img_home_automation`) VALUES
(1, 'Sistema de Iluminación Inteligente', 'iluminacion_inteligente.jpg'),
(2, 'Termostato Inteligente', 'termostato_inteligente.jpg'),
(3, 'Sistema de Seguridad', 'sistema_seguridad.jpg'),
(4, 'Control de Persianas Automatizado', 'persianas_automatizadas.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image`
--

CREATE TABLE `image` (
  `id_image` int(11) NOT NULL,
  `id_building` int(11) NOT NULL,
  `url_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `image`
--

INSERT INTO `image` (`id_image`, `id_building`, `url_image`) VALUES
(23, 1, '94752ba0-57f6-4a95-ba97-97a672ee4d63.jpeg'),
(24, 1, '[www.fotocasa.es][520]655399022.jpg'),
(25, 1, '[www.fotocasa.es][48672].jpg'),
(26, 1, '[www.fotocasa.es][23817].jpg'),
(27, 2, '[www.fotocasa.es][717]2809659.jpg'),
(28, 2, 'd88ff92e-709b-4ce4-b588-722778d2cbc5.jpeg'),
(29, 2, '[www.fotocasa.es][39558].jpg'),
(30, 2, '[www.fotocasa.es][28905].jpg'),
(31, 2, '6950abd2-cbda-477e-a90b-8aaf90626079.jpeg'),
(32, 3, '[www.fotocasa.es][120]647017240.jpg'),
(33, 3, '3f4db88e-3edc-4f78-a0c7-396cad9cfa8f.jpeg'),
(34, 3, '[www.fotocasa.es][22551].jpg'),
(35, 3, '[www.fotocasa.es][292]647017235.jpg'),
(36, 3, '[www.fotocasa.es][50683].jpg'),
(37, 4, '[www.fotocasa.es][89661].jpg'),
(38, 4, '[www.fotocasa.es][36718].jpg'),
(39, 4, '[www.fotocasa.es][25207].jpg'),
(40, 5, 'b0b766ed-4e06-42b2-a3bd-c3e45197e6c8.jpeg'),
(41, 5, '[www.fotocasa.es][57299].jpg'),
(42, 5, '[www.fotocasa.es][22634].jpg'),
(43, 5, '[www.fotocasa.es][812]2809651.jpg'),
(44, 5, '[www.fotocasa.es][99]655129450.jpg'),
(45, 5, '[www.fotocasa.es][44881].jpg'),
(46, 5, '[www.fotocasa.es][14779].jpg'),
(47, 5, '[www.fotocasa.es][880]655129420.jpg'),
(48, 6, '[www.fotocasa.es][120]647017240.jpg'),
(49, 6, '[www.fotocasa.es][35917].jpg'),
(50, 6, '[www.fotocasa.es][22634].jpg'),
(51, 6, '[www.fotocasa.es][94979].jpg'),
(52, 6, '54fd0c9b-9357-40fb-ab38-16424f6ea164.jpeg'),
(53, 6, '[www.fotocasa.es][57]647017318.jpg'),
(54, 6, '[www.fotocasa.es][57349].jpg'),
(55, 6, '[www.fotocasa.es][968]655129433.jpg'),
(56, 6, '[www.fotocasa.es][363]655129433.jpg'),
(57, 6, '[www.fotocasa.es][1335].jpg'),
(58, 7, '[www.fotocasa.es][21244].jpg'),
(59, 7, '[www.fotocasa.es][86120].jpg'),
(60, 7, '9bf4369e-2abe-4407-a808-4eeb48b536b1.jpeg'),
(61, 7, '00bb1a7f-736e-4345-b2a5-01dca498c7a3.jpeg'),
(62, 7, '[www.fotocasa.es][1372].jpg'),
(63, 7, '[www.fotocasa.es][94979].jpg'),
(64, 7, '[www.fotocasa.es][95960].jpg'),
(65, 7, '[www.fotocasa.es][96412].jpg'),
(66, 7, '[www.fotocasa.es][18510].jpg'),
(67, 8, '[www.fotocasa.es][814]online_appraisal_why_D_desktop.jpg'),
(68, 8, '8bd61680-9429-4cc1-a151-d73c2b6b8cdd.jpeg'),
(69, 8, '[www.fotocasa.es][45500].jpg'),
(70, 8, '[www.fotocasa.es][21244].jpg'),
(71, 8, '[www.fotocasa.es][18809].jpg'),
(72, 8, 'e53779a2-bcb7-4c74-8ccd-557f7d66fe81.jpeg'),
(73, 8, '[www.fotocasa.es][33044].jpg'),
(74, 8, '[www.fotocasa.es][88390].jpg'),
(75, 8, '[www.fotocasa.es][88092].jpg'),
(76, 9, '[www.fotocasa.es][92032].jpg'),
(77, 9, '[www.fotocasa.es][723]647017360.jpg'),
(78, 9, '[www.fotocasa.es][42735].jpg'),
(79, 9, '[www.fotocasa.es][54115].jpg'),
(80, 9, '93d6895e-f934-4762-b817-9361fef9b46a.jpeg'),
(81, 9, '[www.fotocasa.es][88390].jpg'),
(82, 9, '[www.fotocasa.es][95222].jpg'),
(83, 9, '[www.fotocasa.es][962]655129424.jpg'),
(84, 10, '[www.fotocasa.es][34119].jpg'),
(85, 10, '76a26ffc-4256-4821-b142-50f56a97cc6f.jpeg'),
(86, 10, '[www.fotocasa.es][50165].jpg'),
(87, 10, '[www.fotocasa.es][64047].jpg'),
(88, 10, 'b0e1215d-32e8-4fe3-8d7c-ea4e115fd6e2.jpeg'),
(89, 10, '14e2c611-fd33-48fd-ae0c-135740a88131.jpeg'),
(90, 129, '[www.fotocasa.es][24680].png'),
(91, 129, 'b0e1215d-32e8-4fe3-8d7c-ea4e115fd6e2.jpeg'),
(92, 129, '[www.fotocasa.es][13508].jpg'),
(93, 129, '[www.fotocasa.es][57349].jpg'),
(94, 130, '[www.fotocasa.es][57]647017318.jpg'),
(95, 130, '[www.fotocasa.es][39558].jpg'),
(96, 130, '[www.fotocasa.es][175]647017235.jpg'),
(97, 130, '9a605d53-0601-40c6-8985-f5bcb5a583a6.jpeg'),
(98, 130, '[www.fotocasa.es][80931].jpg'),
(99, 130, '[www.fotocasa.es][12382].jpg'),
(100, 130, '[www.fotocasa.es][99]655129450.jpg'),
(101, 130, '[www.fotocasa.es][24247].jpg'),
(102, 131, '[www.fotocasa.es][363]655129464.jpg'),
(103, 131, '[www.fotocasa.es][250]647017244.jpg'),
(104, 131, '8825ad65-338e-4777-97fb-a1778af3b1ee.jpeg'),
(105, 131, '[www.fotocasa.es][50955].jpg'),
(106, 131, '7006f58b-e499-427d-a284-257714e41d4c.jpeg'),
(107, 131, '[www.fotocasa.es][63600].jpg'),
(108, 131, '[www.fotocasa.es][51952].jpg'),
(109, 131, '[www.fotocasa.es][39558].jpg'),
(110, 131, '[www.fotocasa.es][33544].jpg'),
(111, 132, '[www.fotocasa.es][453]655129429.jpg'),
(112, 132, '[www.fotocasa.es][109]2809654.jpg'),
(113, 132, '[www.fotocasa.es][818]647017245.jpg'),
(114, 133, '8a1be253-6182-4fe8-81b6-6d190366b103.jpeg'),
(115, 133, '9a605d53-0601-40c6-8985-f5bcb5a583a6.jpeg'),
(116, 133, '[www.fotocasa.es][65435].jpg'),
(117, 133, '[www.fotocasa.es][62442].jpg'),
(118, 133, '444738934.jpg'),
(119, 133, '2275088d-de37-4728-8611-47a9918d6917.jpeg'),
(120, 133, '[www.fotocasa.es][250]647017244.jpg'),
(121, 133, '[www.fotocasa.es][54]647017254.jpg'),
(122, 134, '[www.fotocasa.es][36718].jpg'),
(123, 134, '[www.fotocasa.es][88092].jpg'),
(124, 134, 'fa2fa207-b33e-4094-956e-658b1cf88fb3.jpeg'),
(125, 134, '[www.fotocasa.es][47529].jpg'),
(126, 134, '[www.fotocasa.es][977]655129472.jpg'),
(127, 134, '[www.fotocasa.es][624]647017259.jpg'),
(128, 134, '[www.fotocasa.es][1745].jpg'),
(129, 134, '[www.fotocasa.es][51952].jpg'),
(130, 135, '297a5d11-8706-4be1-83af-1377f60882c2.jpeg'),
(131, 135, '[www.fotocasa.es][3035].jpg'),
(132, 135, '00bb1a7f-736e-4345-b2a5-01dca498c7a3.jpeg'),
(133, 135, '[www.fotocasa.es][45948].jpg'),
(134, 135, '69331adc-0cc2-4f71-8240-419b83061319.jpeg'),
(135, 135, '[www.fotocasa.es][88032].jpg'),
(136, 135, '[www.fotocasa.es][23817].jpg'),
(137, 135, '[www.fotocasa.es][50165].jpg'),
(138, 135, '[www.fotocasa.es][73056].jpg'),
(139, 136, 'b0ac14d6-3601-4645-a3ec-63a96b282e55.jpeg'),
(140, 136, '[www.fotocasa.es][78499].jpg'),
(141, 136, '[www.fotocasa.es][56082].jpg'),
(142, 136, '[www.fotocasa.es][21248].jpg'),
(143, 136, '94752ba0-57f6-4a95-ba97-97a672ee4d63.jpeg'),
(144, 136, '[www.fotocasa.es][1335].jpg'),
(145, 136, '[www.fotocasa.es][33044].jpg'),
(146, 136, '[www.fotocasa.es][529]647017233.jpg'),
(147, 137, 'b540e6b0-9983-45bb-840b-a0e42de09d81.jpeg'),
(148, 137, '[www.fotocasa.es][890]647017319.jpg'),
(149, 137, '7006f58b-e499-427d-a284-257714e41d4c.jpeg'),
(150, 137, '4638a094-80c2-4393-b94f-f4c3b988a5d4.jpeg'),
(151, 137, '[www.fotocasa.es][1372].jpg'),
(152, 137, '[www.fotocasa.es][71572].jpg'),
(153, 137, '[www.fotocasa.es][74031].jpg'),
(154, 138, '[www.fotocasa.es][723]647017360.jpg'),
(155, 138, '[www.fotocasa.es][21244].jpg'),
(156, 138, '[www.fotocasa.es][51084].jpg'),
(157, 138, '[www.fotocasa.es][13508].jpg'),
(158, 138, '[www.fotocasa.es][916]647017238.jpg'),
(159, 138, '[www.fotocasa.es][80]647017246.jpg'),
(160, 138, '[www.fotocasa.es][71549].jpg'),
(161, 138, '[www.fotocasa.es][54]647017254.jpg'),
(162, 139, '[www.fotocasa.es][82421].jpg'),
(163, 139, '[www.fotocasa.es][96730].jpg'),
(164, 139, '[www.fotocasa.es][177]online_appraisal_why_A_desktop.jpg'),
(165, 139, '[www.fotocasa.es][50165].jpg'),
(166, 139, '[www.fotocasa.es][95960].jpg'),
(167, 139, '15b43bab-9a9f-4baa-aa84-025d28f12fa8.jpeg'),
(168, 139, '[www.fotocasa.es][74578].jpg'),
(169, 139, '[www.fotocasa.es][607]2809649.jpg'),
(170, 139, '[www.fotocasa.es][890]647017319.jpg'),
(171, 139, '[www.fotocasa.es][22551].jpg'),
(172, 140, '[www.fotocasa.es][78499].jpg'),
(173, 140, '[www.fotocasa.es][50955].jpg'),
(174, 140, 'c5dd432f-1aef-4731-a8b3-e6ff06f4fa89.jpeg'),
(175, 140, '428dacc4-7a81-4066-8ffb-acfc19920717.jpeg'),
(176, 140, '[www.fotocasa.es][51220].jpg'),
(177, 140, '4638a094-80c2-4393-b94f-f4c3b988a5d4.jpeg'),
(178, 140, '[www.fotocasa.es][7410].jpg'),
(179, 140, '[www.fotocasa.es][21248].jpg'),
(180, 140, '[www.fotocasa.es][641]655129441.jpg'),
(181, 140, '[www.fotocasa.es][55872].jpg'),
(182, 141, '[www.fotocasa.es][818]647017245.jpg'),
(183, 141, '[www.fotocasa.es][79062].jpg'),
(184, 141, '[www.fotocasa.es][67]online_appraisal_why_A_mobile.jpg'),
(185, 141, '936ed598-9bd7-409a-b031-6b665c44673f.jpeg'),
(186, 141, '[www.fotocasa.es][65]2809652.jpg'),
(187, 141, '220dbefc-0815-44cc-8084-fb1981ae42ac.jpeg'),
(188, 141, '[www.fotocasa.es][120]647017240.jpg'),
(189, 141, '49e985aa-8903-444f-b813-030599b318cf.jpeg'),
(190, 141, '[www.fotocasa.es][54]655129466.jpg'),
(191, 142, '[www.fotocasa.es][11841].jpg'),
(192, 142, '[www.fotocasa.es][704]647017356.jpg'),
(193, 142, '[www.fotocasa.es][57349].jpg'),
(194, 142, '[www.fotocasa.es][4668].jpg'),
(195, 142, '[www.fotocasa.es][35804].jpg'),
(196, 142, '[www.fotocasa.es][68282].jpg'),
(197, 143, '2275088d-de37-4728-8611-47a9918d6917.jpeg'),
(198, 143, '[www.fotocasa.es][4668].jpg'),
(199, 143, '[www.fotocasa.es][44881].jpg'),
(200, 143, '00bb1a7f-736e-4345-b2a5-01dca498c7a3.jpeg'),
(201, 143, '[www.fotocasa.es][363]647017248.jpg'),
(202, 143, '[www.fotocasa.es][704]647017234.jpg'),
(203, 143, '[www.fotocasa.es][82421].jpg'),
(204, 143, '444738940.jpg'),
(205, 144, '[www.fotocasa.es][486]2809648.jpg'),
(206, 144, '[www.fotocasa.es][85216].jpg'),
(207, 144, '045bab7e-6ec5-45dd-a682-633df44214a6.jpeg'),
(208, 144, '[www.fotocasa.es][22551].jpg'),
(209, 144, '[www.fotocasa.es][53011].jpg'),
(210, 144, '15b43bab-9a9f-4baa-aa84-025d28f12fa8.jpeg'),
(211, 145, '[www.fotocasa.es][854].jpg'),
(212, 145, '[www.fotocasa.es][24332].jpg'),
(213, 145, '[www.fotocasa.es][17]655129446.jpg'),
(214, 145, '444738941.jpg'),
(215, 146, '[www.fotocasa.es][818]647017245.jpg'),
(216, 146, '[www.fotocasa.es][6233].jpg'),
(217, 146, '[www.fotocasa.es][52355].jpg'),
(218, 146, '00bb1a7f-736e-4345-b2a5-01dca498c7a3.jpeg'),
(219, 146, '[www.fotocasa.es][39558].jpg'),
(220, 147, '[www.fotocasa.es][10]2809653.jpg'),
(221, 147, '[www.fotocasa.es][92032].jpg'),
(222, 147, '[www.fotocasa.es][898]647017256.jpg'),
(223, 147, '[www.fotocasa.es][62442].jpg'),
(224, 147, '[www.fotocasa.es][19132].jpg'),
(225, 148, '[www.fotocasa.es][57]647017318.jpg'),
(226, 148, '[www.fotocasa.es][45725].jpg'),
(227, 148, '[www.fotocasa.es][880]655129420.jpg'),
(228, 148, '[www.fotocasa.es][3035].jpg'),
(229, 149, '[www.fotocasa.es][24247].jpg'),
(230, 149, '[www.fotocasa.es][57344].jpg'),
(231, 149, '[www.fotocasa.es][12382].jpg'),
(232, 149, '[www.fotocasa.es][95222].jpg'),
(233, 150, '[www.fotocasa.es][52355].jpg'),
(234, 150, '[www.fotocasa.es][1226].jpg'),
(235, 150, '[www.fotocasa.es][163]647017349.jpg'),
(236, 150, '936ed598-9bd7-409a-b031-6b665c44673f.jpeg'),
(237, 150, '1c7cea14-f125-41df-8cb1-66798ac05324.jpeg'),
(238, 150, '[www.fotocasa.es][812]2809651.jpg'),
(239, 150, '[www.fotocasa.es][8161].jpg'),
(240, 150, '[www.fotocasa.es][45500].jpg'),
(241, 151, '[www.fotocasa.es][99]655129450.jpg'),
(242, 151, '[www.fotocasa.es][74031].jpg'),
(243, 151, '[www.fotocasa.es][813]655129458.jpg'),
(244, 151, '[www.fotocasa.es][23774].jpg'),
(245, 151, '9bf4369e-2abe-4407-a808-4eeb48b536b1.jpeg'),
(246, 151, '[www.fotocasa.es][65]2809652.jpg'),
(247, 151, '[www.fotocasa.es][86120].jpg'),
(248, 151, '7006f58b-e499-427d-a284-257714e41d4c.jpeg'),
(249, 151, '00bb1a7f-736e-4345-b2a5-01dca498c7a3.jpeg'),
(250, 152, '4340f0e9-fd83-4386-a447-3a421c62f746.jpeg'),
(251, 152, '[www.fotocasa.es][977]655129472.jpg'),
(252, 152, '936ed598-9bd7-409a-b031-6b665c44673f.jpeg'),
(253, 152, '[www.fotocasa.es][55625].jpg'),
(254, 152, '[www.fotocasa.es][814]online_appraisal_why_D_desktop.jpg'),
(255, 152, '33c65ce9-63b5-47a6-bb82-a389b4ac1647.jpeg'),
(256, 152, '[www.fotocasa.es][30265].jpg'),
(257, 152, '87fc7576-fd5f-4341-8837-54f3536fc1cf.jpeg'),
(258, 153, '93d6895e-f934-4762-b817-9361fef9b46a.jpeg'),
(259, 153, '1b6b946f-462d-4762-8701-eba47016c3df.jpeg'),
(260, 153, '8825ad65-338e-4777-97fb-a1778af3b1ee.jpeg'),
(261, 153, '[www.fotocasa.es][342]655129424.jpg'),
(262, 153, '[www.fotocasa.es][39558].jpg'),
(263, 153, '[www.fotocasa.es][92478].jpg'),
(264, 154, '[www.fotocasa.es][7410].jpg'),
(265, 154, '[www.fotocasa.es][387]655129457.jpg'),
(266, 154, '[www.fotocasa.es][292]647017235.jpg'),
(267, 154, '[www.fotocasa.es][563]2809648.jpg'),
(268, 154, '[www.fotocasa.es][40]2809646.jpg'),
(269, 154, '[www.fotocasa.es][55625].jpg'),
(270, 154, '[www.fotocasa.es][54]647017254.jpg'),
(271, 154, '[www.fotocasa.es][82421].jpg'),
(272, 154, '[www.fotocasa.es][19833].jpg'),
(273, 154, '[www.fotocasa.es][985]647017252.jpg'),
(274, 155, '[www.fotocasa.es][64800].jpg'),
(275, 155, '[www.fotocasa.es][962]655129424.jpg'),
(276, 155, '[www.fotocasa.es][19132].jpg'),
(277, 155, '428dacc4-7a81-4066-8ffb-acfc19920717.jpeg'),
(278, 155, '220dbefc-0815-44cc-8084-fb1981ae42ac.jpeg'),
(279, 155, '[www.fotocasa.es][29884].jpg'),
(280, 156, '[www.fotocasa.es][854].jpg'),
(281, 156, '[www.fotocasa.es][92478].jpg'),
(282, 156, '[www.fotocasa.es][44881].jpg'),
(283, 156, '[www.fotocasa.es][88092].jpg'),
(284, 157, '62affc90-b1f2-433e-bf9d-2d7096127fe2.jpeg'),
(285, 157, '[www.fotocasa.es][68282].jpg'),
(286, 157, '[www.fotocasa.es][622]655129429.jpg'),
(287, 157, '[www.fotocasa.es][776]655129461.jpg'),
(288, 158, '[www.fotocasa.es][33000].jpg'),
(289, 158, '428dacc4-7a81-4066-8ffb-acfc19920717.jpeg'),
(290, 158, '[www.fotocasa.es][51220].jpg'),
(291, 158, '[www.fotocasa.es][250]647017244.jpg'),
(292, 158, '[www.fotocasa.es][814]online_appraisal_why_D_desktop.jpg'),
(293, 158, '[www.fotocasa.es][776]655129461.jpg'),
(294, 159, '[www.fotocasa.es][76577].jpg'),
(295, 159, '[www.fotocasa.es][740]647017242.jpg'),
(296, 159, '[www.fotocasa.es][63600].jpg'),
(297, 159, '[www.fotocasa.es][25207].jpg'),
(298, 159, '936ed598-9bd7-409a-b031-6b665c44673f.jpeg'),
(299, 159, '[www.fotocasa.es][67060].jpg'),
(300, 160, '[www.fotocasa.es][30631].jpg'),
(301, 160, 'd88ff92e-709b-4ce4-b588-722778d2cbc5.jpeg'),
(302, 160, '1509353a-e1c1-4281-8b2a-06a772969dc1.jpeg'),
(303, 160, '[www.fotocasa.es][985]647017252.jpg'),
(304, 160, '15b43bab-9a9f-4baa-aa84-025d28f12fa8.jpeg'),
(305, 160, '[www.fotocasa.es][812]2809651.jpg'),
(306, 160, '[www.fotocasa.es][50]655129477.jpg'),
(307, 161, '00bb1a7f-736e-4345-b2a5-01dca498c7a3.jpeg'),
(308, 161, '[www.fotocasa.es][76233].jpg'),
(309, 161, '[www.fotocasa.es][50165].jpg'),
(310, 161, '[www.fotocasa.es][17]655129446.jpg'),
(311, 161, '[www.fotocasa.es][717]2809659.jpg'),
(312, 161, '[www.fotocasa.es][453]655129429.jpg'),
(313, 162, '[www.fotocasa.es][363]655129464.jpg'),
(314, 162, '[www.fotocasa.es][18809].jpg'),
(315, 162, '[www.fotocasa.es][68103].jpg'),
(316, 162, '[www.fotocasa.es][95539].jpg'),
(317, 162, '[www.fotocasa.es][89661].jpg'),
(318, 162, '297a5d11-8706-4be1-83af-1377f60882c2.jpeg'),
(319, 162, '[www.fotocasa.es][33044].jpg'),
(320, 162, '[www.fotocasa.es][968]655129433.jpg'),
(321, 162, '[www.fotocasa.es][641]655129441.jpg'),
(322, 163, '[www.fotocasa.es][737]2809657.jpg'),
(323, 163, '[www.fotocasa.es][723]647017360.jpg'),
(324, 163, '[www.fotocasa.es][91454].jpg'),
(325, 163, '3558e1e1-8809-4d9f-aef9-4d9deeba7c58.jpeg'),
(326, 163, '[www.fotocasa.es][99]655129450.jpg'),
(327, 163, '444738940.jpg'),
(328, 163, '[www.fotocasa.es][776]655129461.jpg'),
(329, 164, '[www.fotocasa.es][80496].jpg'),
(330, 164, '4638a094-80c2-4393-b94f-f4c3b988a5d4.jpeg'),
(331, 164, '9a605d53-0601-40c6-8985-f5bcb5a583a6.jpeg'),
(332, 165, '[www.fotocasa.es][23080].jpg'),
(333, 165, '[www.fotocasa.es][51220].jpg'),
(334, 165, '[www.fotocasa.es][95539].jpg'),
(335, 165, '[www.fotocasa.es][63623].jpg'),
(336, 165, 'c576a47e-350c-4b28-b3bf-c5553da4d3d3.jpeg'),
(337, 165, '[www.fotocasa.es][53]647017355.jpg'),
(338, 165, '[www.fotocasa.es][704]647017356.jpg'),
(339, 166, '[www.fotocasa.es][977]655129472.jpg'),
(340, 166, '428dacc4-7a81-4066-8ffb-acfc19920717.jpeg'),
(341, 166, '[www.fotocasa.es][25207].jpg'),
(342, 166, '76a26ffc-4256-4821-b142-50f56a97cc6f.jpeg'),
(343, 166, '[www.fotocasa.es][36]655129437.jpg'),
(344, 166, '[www.fotocasa.es][462]2809660.jpg'),
(345, 166, '[www.fotocasa.es][77814].jpg'),
(346, 166, '[www.fotocasa.es][67]online_appraisal_why_A_mobile.jpg'),
(347, 167, '[www.fotocasa.es][55872].jpg'),
(348, 167, '[www.fotocasa.es][7852].jpg'),
(349, 167, '[www.fotocasa.es][607]2809649.jpg'),
(350, 167, '[www.fotocasa.es][45948].jpg'),
(351, 167, '[www.fotocasa.es][57076].jpg'),
(352, 167, '[www.fotocasa.es][39251].jpg'),
(353, 167, '[www.fotocasa.es][74578].jpg'),
(354, 167, '[www.fotocasa.es][379]647017359.jpg'),
(355, 168, '1c7cea14-f125-41df-8cb1-66798ac05324.jpeg'),
(356, 168, '[www.fotocasa.es][23817].jpg'),
(357, 168, '[www.fotocasa.es][4668].jpg'),
(358, 168, '[www.fotocasa.es][977]655129472.jpg'),
(359, 168, '[www.fotocasa.es][80496].jpg'),
(360, 168, '444738940.jpg'),
(361, 169, '[www.fotocasa.es][12382].jpg'),
(362, 169, '[www.fotocasa.es][65]2809652.jpg'),
(363, 169, '[www.fotocasa.es][22551].jpg'),
(364, 169, '2275088d-de37-4728-8611-47a9918d6917.jpeg'),
(365, 169, '87fc7576-fd5f-4341-8837-54f3536fc1cf.jpeg'),
(366, 169, '[www.fotocasa.es][68282].jpg'),
(367, 169, '[www.fotocasa.es][24247].jpg'),
(368, 170, '87fc7576-fd5f-4341-8837-54f3536fc1cf.jpeg'),
(369, 170, '[www.fotocasa.es][33544].jpg'),
(370, 170, '[www.fotocasa.es][90001].jpg'),
(371, 170, '[www.fotocasa.es][99]655129450.jpg'),
(372, 170, '93d6895e-f934-4762-b817-9361fef9b46a.jpeg'),
(373, 170, '[www.fotocasa.es][109]2809654.jpg'),
(374, 170, '[www.fotocasa.es][80418].jpg'),
(375, 170, '7006f58b-e499-427d-a284-257714e41d4c.jpeg'),
(376, 170, '[www.fotocasa.es][63600].jpg'),
(377, 170, '[www.fotocasa.es][11597].jpg'),
(378, 171, '444738939.jpg'),
(379, 171, '[www.fotocasa.es][76233].jpg'),
(380, 171, '[www.fotocasa.es][36718].jpg'),
(381, 171, '[www.fotocasa.es][28990].jpg'),
(382, 171, '[www.fotocasa.es][63600].jpg'),
(383, 171, '[www.fotocasa.es][622]655129429.jpg'),
(384, 171, '[www.fotocasa.es][607]2809649.jpg'),
(385, 171, '[www.fotocasa.es][968]655129433.jpg'),
(386, 172, '[www.fotocasa.es][80931].jpg'),
(387, 172, '[www.fotocasa.es][785]2809656.jpg'),
(388, 172, '62affc90-b1f2-433e-bf9d-2d7096127fe2.jpeg'),
(389, 172, '[www.fotocasa.es][78499].jpg'),
(390, 172, '6e470d6d-57e5-4d87-8108-775ee2a5c6f3.jpeg'),
(391, 172, '[www.fotocasa.es][55907].jpg'),
(392, 173, '[www.fotocasa.es][99]655129450.jpg'),
(393, 173, '[www.fotocasa.es][363]647017248.jpg'),
(394, 173, '444738934.jpg'),
(395, 173, '[www.fotocasa.es][63623].jpg'),
(396, 173, '444738939.jpg'),
(397, 173, '54fd0c9b-9357-40fb-ab38-16424f6ea164.jpeg'),
(398, 173, '[www.fotocasa.es][45725].jpg'),
(399, 173, 'b0b766ed-4e06-42b2-a3bd-c3e45197e6c8.jpeg'),
(400, 173, '[www.fotocasa.es][21364].jpg'),
(401, 174, '62affc90-b1f2-433e-bf9d-2d7096127fe2.jpeg'),
(402, 174, '[www.fotocasa.es][802]655129420.jpg'),
(403, 174, '5a24627d-e556-4316-879c-8e3f18b983ce.jpeg'),
(404, 174, '[www.fotocasa.es][94979].jpg'),
(405, 174, 'da94966a-beaa-4121-a173-12e2bafb8ed9.jpeg'),
(406, 174, 'fa2fa207-b33e-4094-956e-658b1cf88fb3.jpeg'),
(407, 174, '[www.fotocasa.es][98819].jpg'),
(408, 174, '[www.fotocasa.es][363]655129433.jpg'),
(409, 174, '[www.fotocasa.es][56082].jpg'),
(410, 174, '00bb1a7f-736e-4345-b2a5-01dca498c7a3.jpeg'),
(411, 175, '[www.fotocasa.es][622]655129429.jpg'),
(412, 175, '[www.fotocasa.es][185]655129452.jpg'),
(413, 175, '[www.fotocasa.es][57349].jpg'),
(414, 175, '[www.fotocasa.es][1372].jpg'),
(415, 175, '444738940.jpg'),
(416, 176, '93d6895e-f934-4762-b817-9361fef9b46a.jpeg'),
(417, 176, '9bf4369e-2abe-4407-a808-4eeb48b536b1.jpeg'),
(418, 176, '[www.fotocasa.es][813]655129458.jpg'),
(419, 176, '[www.fotocasa.es][50165].jpg'),
(420, 176, '[www.fotocasa.es][47529].jpg'),
(421, 176, '[www.fotocasa.es][10]2809653.jpg'),
(422, 176, '[www.fotocasa.es][33000].jpg'),
(423, 176, '[www.fotocasa.es][32359].jpg'),
(424, 177, '[www.fotocasa.es][99]655129450.jpg'),
(425, 177, '[www.fotocasa.es][53011].jpg'),
(426, 177, '[www.fotocasa.es][27806].jpg'),
(427, 177, '[www.fotocasa.es][80]647017246.jpg'),
(428, 177, '[www.fotocasa.es][163]647017349.jpg'),
(429, 177, '[www.fotocasa.es][50]655129477.jpg'),
(430, 177, '045bab7e-6ec5-45dd-a682-633df44214a6.jpeg'),
(431, 177, '[www.fotocasa.es][607]2809649.jpg'),
(432, 178, '2275088d-de37-4728-8611-47a9918d6917.jpeg'),
(433, 178, '[www.fotocasa.es][21364].jpg'),
(434, 178, '[www.fotocasa.es][662]2809647.jpg'),
(435, 178, '[www.fotocasa.es][51952].jpg'),
(436, 178, '87fc7576-fd5f-4341-8837-54f3536fc1cf.jpeg'),
(437, 179, '[www.fotocasa.es][80]647017246.jpg'),
(438, 179, '[www.fotocasa.es][53]647017355.jpg'),
(439, 179, '[www.fotocasa.es][119]647017253.jpg'),
(440, 179, '[www.fotocasa.es][22634].jpg'),
(441, 179, '[www.fotocasa.es][723]647017360.jpg'),
(442, 179, '[www.fotocasa.es][704]647017234.jpg'),
(443, 179, 'b4468452-002d-47c9-acfd-fc2b570114f6.jpeg'),
(444, 180, '[www.fotocasa.es][30265].jpg'),
(445, 180, '49e985aa-8903-444f-b813-030599b318cf.jpeg'),
(446, 180, '[www.fotocasa.es][21248].jpg'),
(447, 180, 'e4082e91-ebb3-4e9e-9f92-b4bc258c5cbd.jpeg'),
(448, 180, '[www.fotocasa.es][21244].jpg'),
(449, 180, '[www.fotocasa.es][96205].jpg'),
(450, 181, '[www.fotocasa.es][35917].jpg'),
(451, 181, '[www.fotocasa.es][57344].jpg'),
(452, 181, '[www.fotocasa.es][1226].jpg'),
(453, 181, '[www.fotocasa.es][64800].jpg'),
(454, 181, '[www.fotocasa.es][50683].jpg'),
(455, 181, '[www.fotocasa.es][662]2809647.jpg'),
(456, 181, '444738940.jpg'),
(457, 181, '[www.fotocasa.es][33544].jpg'),
(458, 181, 'b0e1215d-32e8-4fe3-8d7c-ea4e115fd6e2.jpeg'),
(459, 182, '[www.fotocasa.es][8161].jpg'),
(460, 182, '8bd61680-9429-4cc1-a151-d73c2b6b8cdd.jpeg'),
(461, 182, '4638a094-80c2-4393-b94f-f4c3b988a5d4.jpeg'),
(462, 183, '444738934.jpg'),
(463, 183, 'cc78c1db-5333-4610-b67e-cc4004bf5003.jpeg'),
(464, 183, '87fc7576-fd5f-4341-8837-54f3536fc1cf.jpeg'),
(465, 183, '[www.fotocasa.es][23817].jpg'),
(466, 183, '[www.fotocasa.es][622]655129429.jpg'),
(467, 184, '[www.fotocasa.es][1669].jpg'),
(468, 184, '[www.fotocasa.es][8161].jpg'),
(469, 184, '[www.fotocasa.es][96412].jpg'),
(470, 184, '[www.fotocasa.es][22634].jpg'),
(471, 184, '[www.fotocasa.es][39558].jpg'),
(472, 184, '[www.fotocasa.es][96150].jpg'),
(473, 184, '[www.fotocasa.es][30265].jpg'),
(474, 184, '[www.fotocasa.es][45725].jpg'),
(475, 184, '[www.fotocasa.es][13508].jpg'),
(476, 185, '[www.fotocasa.es][71570].jpg'),
(477, 185, '[www.fotocasa.es][67060].jpg'),
(478, 185, '1b6b946f-462d-4762-8701-eba47016c3df.jpeg'),
(479, 185, '[www.fotocasa.es][14779].jpg'),
(480, 186, 'c5dd432f-1aef-4731-a8b3-e6ff06f4fa89.jpeg'),
(481, 186, '[www.fotocasa.es][120]647017240.jpg'),
(482, 186, '[www.fotocasa.es][387]655129457.jpg'),
(483, 186, '[www.fotocasa.es][30265].jpg'),
(484, 186, '[www.fotocasa.es][662]2809647.jpg'),
(485, 186, '15b43bab-9a9f-4baa-aa84-025d28f12fa8.jpeg'),
(486, 186, '[www.fotocasa.es][30226].jpg'),
(487, 187, '[www.fotocasa.es][52355].jpg'),
(488, 187, '[www.fotocasa.es][7410].jpg'),
(489, 187, 'af5e6eee-99e0-47c9-ae76-75c7509478b3.jpeg'),
(490, 187, '[www.fotocasa.es][119]647017253.jpg'),
(491, 188, '[www.fotocasa.es][890]647017319.jpg'),
(492, 188, '[www.fotocasa.es][211]647017241.jpg'),
(493, 188, '[www.fotocasa.es][67]online_appraisal_why_A_mobile.jpg'),
(494, 188, '[www.fotocasa.es][28905].jpg'),
(495, 188, '[www.fotocasa.es][47]647017250.jpg'),
(496, 188, '[www.fotocasa.es][21248].jpg'),
(497, 188, '15b43bab-9a9f-4baa-aa84-025d28f12fa8.jpeg'),
(498, 188, '[www.fotocasa.es][96479].jpg'),
(499, 188, 'b0ac14d6-3601-4645-a3ec-63a96b282e55.jpeg'),
(500, 188, 'e3e0a5ef-6c87-427d-ad5f-ac969ea7ad65.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_like` int(11) NOT NULL,
  `id_building` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `ref_cat` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id_like`, `id_building`, `id_user`, `ref_cat`, `username`, `date`) VALUES
(4, 3, 29, 'REF789', 'Llorens19', '2024-04-21 16:35:53'),
(32, 2, 29, 'REF456', 'Llorens19', '2024-04-21 20:28:50'),
(33, 4, 29, 'REFABC', 'Llorens19', '2024-04-21 20:28:51'),
(36, 9, 29, 'REFPQR', 'Llorens19', '2024-04-21 20:29:13'),
(37, 1, 7, 'REF123', 'Llorens21', '2024-04-21 20:29:44'),
(38, 5, 7, 'REFDEF', 'Llorens21', '2024-04-21 20:29:47'),
(39, 7, 7, 'REFJKL', 'Llorens21', '2024-04-21 20:29:48'),
(40, 136, 7, 'REF212223', 'Llorens21', '2024-04-21 20:29:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operations`
--

CREATE TABLE `operations` (
  `id_operations` int(11) NOT NULL,
  `n_operations` varchar(255) NOT NULL,
  `img_operations` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `operations`
--

INSERT INTO `operations` (`id_operations`, `n_operations`, `img_operations`) VALUES
(1, 'Comprar', 'view/img/home/BUY.png'),
(2, 'Alquilar', 'view/img/home/RENT.png'),
(3, 'Alquiler-Venta', 'view/img/home/RENT-TO-OWN.png'),
(4, 'Compartido', 'view/img/home/SHARE.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type`
--

CREATE TABLE `type` (
  `id_type` int(11) NOT NULL,
  `n_type` varchar(255) NOT NULL,
  `img_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type`
--

INSERT INTO `type` (`id_type`, `n_type`, `img_type`) VALUES
(1, 'Oficina', 'view/img/home/office.jpg'),
(2, 'Casa', 'view/img/home/house.jpg'),
(3, 'Casa de campo', 'view/img/home/country_house.jpg'),
(4, 'Garage', 'view/img/home/garage.jpg'),
(5, 'Piso', 'view/img/home/flat.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `tlf` varchar(20) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_user`, `name`, `surname`, `tlf`, `username`, `password`, `email`, `type_user`, `avatar`) VALUES
(7, 'Diego', 'Llorens Soriano', '658311725', 'Llorens21', '$2y$12$kvyzlvMpoqYwX0b7uJMy9ulirOzjIH5j4a1dHGGWe62AtIq.cMGLe', 'diegollorenssoriano2001@gmail.com', 'client', 'https://i.pravatar.cc/500?u=dad77be30c8d0fc60d337434639f61f2'),
(29, 'Diego', 'Llorens Soriano', '658311725', 'Llorens19', '$2y$12$p6aqbVaGMKxTyl0C59qS3eyc8hxOAi201iyn3X3IsXr47Th8OcU.u', 'dllorens21@gmail.com', 'admin', 'https://i.pravatar.cc/500?u=b684c9f159a1bdb8c2ffd7e69ee70faf'),
(30, 'Diego', 'Llorens Soriano', '658311725', 'Llorens18', '$2y$12$ZmxtFITASdTnjJ5XVilLaOGK4RPIcEfopATBQOkSvzIQLLAN/kOzW', 'diegollorenssoriano@gmail.com', 'client', 'https://i.pravatar.cc/500?u=f5ab0cc9395033698e513ed91f92d4a1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `building`
--
ALTER TABLE `building`
  ADD PRIMARY KEY (`id_building`),
  ADD UNIQUE KEY `ref_cat` (`ref_cat`),
  ADD KEY `id_type` (`id_type`),
  ADD KEY `id_city` (`id_city`),
  ADD KEY `id_operation` (`id_operations`),
  ADD KEY `id_home_automation` (`id_home_automation`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `category_building`
--
ALTER TABLE `category_building`
  ADD PRIMARY KEY (`id_category`,`id_building`),
  ADD KEY `id_building` (`id_building`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id_city`);

--
-- Indices de la tabla `filters_table`
--
ALTER TABLE `filters_table`
  ADD PRIMARY KEY (`id_filter`);

--
-- Indices de la tabla `home_automation`
--
ALTER TABLE `home_automation`
  ADD PRIMARY KEY (`id_home_automation`);

--
-- Indices de la tabla `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id_image`),
  ADD KEY `id_building` (`id_building`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `id_building` (`id_building`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `username` (`username`),
  ADD KEY `ref_cat` (`ref_cat`);

--
-- Indices de la tabla `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`id_operations`);

--
-- Indices de la tabla `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id_type`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `building`
--
ALTER TABLE `building`
  MODIFY `id_building` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `id_city` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `filters_table`
--
ALTER TABLE `filters_table`
  MODIFY `id_filter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `image`
--
ALTER TABLE `image`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=501;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `operations`
--
ALTER TABLE `operations`
  MODIFY `id_operations` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `type`
--
ALTER TABLE `type`
  MODIFY `id_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `building`
--
ALTER TABLE `building`
  ADD CONSTRAINT `building_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`),
  ADD CONSTRAINT `building_ibfk_2` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`),
  ADD CONSTRAINT `building_ibfk_3` FOREIGN KEY (`id_operations`) REFERENCES `operations` (`id_operations`),
  ADD CONSTRAINT `building_ibfk_4` FOREIGN KEY (`id_home_automation`) REFERENCES `home_automation` (`id_home_automation`);

--
-- Filtros para la tabla `category_building`
--
ALTER TABLE `category_building`
  ADD CONSTRAINT `category_building_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`),
  ADD CONSTRAINT `category_building_ibfk_2` FOREIGN KEY (`id_building`) REFERENCES `building` (`id_building`);

--
-- Filtros para la tabla `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_building`) REFERENCES `building` (`id_building`);

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_building`) REFERENCES `building` (`id_building`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `likes_ibfk_4` FOREIGN KEY (`ref_cat`) REFERENCES `building` (`ref_cat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
