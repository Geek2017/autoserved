-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 30, 2019 at 01:49 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autoserved`
--

-- --------------------------------------------------------

--
-- Table structure for table `masterlist_car_makes`
--

-- CREATE TABLE `masterlist_car_makes` (
--   `id` bigint(20) UNSIGNED NOT NULL,
--   `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `type_id` int(11) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `masterlist_car_makes`
--

INSERT INTO `masterlist_car_makes` (`id`, `name`, `type_id`) VALUES
(1, 'AC', 1),
(2, 'Acura', 1),
(3, 'Alfa Romeo', 1),
(4, 'Alpine', 1),
(6, 'Ariel', 1),
(7, 'Aro', 1),
(8, 'Asia', 1),
(9, 'Aston Martin', 1),
(10, 'Audi', 1),
(11, 'Austin', 1),
(14, 'Beijing', 1),
(15, 'Bentley', 1),
(18, 'BMW', 1),
(21, 'Brilliance', 1),
(22, 'Bristol', 1),
(24, 'Bugatti', 1),
(25, 'Buick', 1),
(26, 'BYD', 1),
(28, 'Cadillac', 1),
(29, 'Callaway', 1),
(30, 'Carbodies', 1),
(31, 'Caterham', 1),
(32, 'Changan', 1),
(33, 'ChangFeng', 1),
(34, 'Chery', 1),
(35, 'Chevrolet', 1),
(36, 'Chrysler', 1),
(37, 'Citroen', 1),
(38, 'Cizeta', 1),
(39, 'Coggiola', 1),
(40, 'Dacia', 1),
(41, 'Dadi', 1),
(42, 'Daewoo', 1),
(44, 'Daihatsu', 1),
(45, 'Daimler', 1),
(46, 'Dallas', 1),
(47, 'Datsun', 1),
(48, 'De Tomaso', 1),
(49, 'DeLorean', 1),
(50, 'Derways', 1),
(51, 'Dodge', 1),
(52, 'DongFeng', 1),
(53, 'Doninvest', 1),
(56, 'Eagle', 1),
(59, 'FAW', 1),
(60, 'Ferrari', 1),
(61, 'Fiat', 1),
(62, 'Fisker', 1),
(63, 'Ford', 1),
(64, 'Foton', 1),
(65, 'FSO', 1),
(66, 'Fuqi', 1),
(67, 'Geely', 1),
(68, 'Geo', 1),
(69, 'GMC', 1),
(71, 'Great Wall', 1),
(72, 'Hafei', 1),
(73, 'Haima', 1),
(74, 'Hindustan', 1),
(75, 'Holden', 1),
(76, 'Honda', 1),
(77, 'HuangHai', 1),
(78, 'Hummer', 1),
(79, 'Hyundai', 1),
(80, 'Infiniti', 1),
(81, 'Innocenti', 1),
(82, 'Invicta', 1),
(83, 'Iran Khodro', 1),
(84, 'Isdera', 1),
(85, 'Isuzu', 1),
(87, 'JAC', 1),
(88, 'Jaguar', 1),
(89, 'Jeep', 1),
(91, 'JMC', 1),
(92, 'Kia', 1),
(93, 'Koenigsegg', 1),
(95, 'Lamborghini', 1),
(96, 'Lancia', 1),
(97, 'Land Rover', 1),
(98, 'Landwind', 1),
(99, 'Lexus', 1),
(101, 'Lifan', 1),
(102, 'Lincoln', 1),
(103, 'Lotus', 1),
(104, 'LTI', 1),
(105, 'Luxgen', 1),
(106, 'Mahindra', 1),
(107, 'Marcos', 1),
(108, 'Marlin', 1),
(109, 'Marussia', 1),
(110, 'Maruti', 1),
(111, 'Maserati', 1),
(112, 'Maybach', 1),
(113, 'Mazda', 1),
(114, 'McLaren', 1),
(115, 'Mega', 1),
(116, 'Mercedes-Benz', 1),
(117, 'Mercury', 1),
(118, 'Metrocab', 1),
(119, 'MG', 1),
(121, 'Minelli', 1),
(122, 'Mini', 1),
(123, 'Mitsubishi', 1),
(124, 'Mitsuoka', 1),
(125, 'Morgan', 1),
(127, 'Nissan', 1),
(128, 'Noble', 1),
(129, 'Oldsmobile', 1),
(130, 'Opel', 1),
(131, 'Osca', 1),
(132, 'Pagani', 1),
(133, 'Panoz', 1),
(134, 'Perodua', 1),
(135, 'Peugeot', 1),
(137, 'Plymouth', 1),
(138, 'Pontiac', 1),
(139, 'Porsche', 1),
(140, 'Premier', 1),
(141, 'Proton', 1),
(143, 'Puma', 1),
(144, 'Qoros', 1),
(145, 'Qvale', 1),
(146, 'Reliant', 1),
(147, 'Renault', 1),
(148, 'Samsung', 1),
(149, 'Rolls-Royce', 1),
(150, 'Ronart', 1),
(151, 'Rover', 1),
(152, 'Saab', 1),
(153, 'Saleen', 1),
(154, 'Santana', 1),
(155, 'Saturn', 1),
(156, 'Scion', 1),
(157, 'SEAT', 1),
(158, 'ShuangHuan', 1),
(159, 'Skoda', 1),
(160, 'Smart', 1),
(161, 'Soueast', 1),
(162, 'Spectre', 1),
(163, 'Spyker', 1),
(165, 'SsangYong', 1),
(166, 'Subaru', 1),
(167, 'Suzuki', 1),
(168, 'Talbot', 1),
(169, 'Tata', 1),
(170, 'Tatra', 1),
(172, 'Tesla', 1),
(173, 'Tianma', 1),
(174, 'Tianye', 1),
(175, 'Tofas', 1),
(176, 'Toyota', 1),
(177, 'Trabant', 1),
(180, 'TVR', 1),
(181, 'Vauxhall', 1),
(182, 'Vector', 1),
(183, 'Venturi', 1),
(184, 'Volkswagen', 1),
(185, 'Volvo', 1),
(186, 'Vortex', 1),
(187, 'Wartburg', 1),
(188, 'Westfield', 1),
(189, 'Wiesmann', 1),
(190, 'Xin Kai', 1),
(191, 'Zastava', 1),
(192, 'Zotye', 1),
(193, 'ZX', 1),
(215, 'VAZ (Lada)', 1),
(216, 'GAZ', 1),
(217, 'ZAZ', 1),
(218, 'ZIL', 1),
(219, 'IZH', 1),
(222, 'LuAZ', 1),
(223, 'Moskvich', 1),
(224, 'SMZ', 1),
(226, 'TagAZ', 1),
(227, 'UAZ', 1),
(282, 'Hawtai', 1),
(284, 'Renaissance Cars', 1),
(286, 'Paykan', 1),
(290, 'Haval', 1),
(291, 'Alpina', 1),
(3589, 'DS', 1),
(3620, 'Rimac', 1),
(3664, 'Adler', 1),
(3666, 'Packard', 1),
(3667, 'Willys', 1),
(3668, 'Combat', 1),
(3676, 'Borgward', 1),
(3689, 'Ravon', 1),
(3705, 'AMC', 1),
(3749, 'Austin Healey', 1),
(3753, 'Changhe', 1),
(3754, 'DFSK', 1),
(3755, 'Efini', 1),
(3756, 'Excalibur', 1),
(3757, 'Groz', 1),
(3760, 'Hurtan', 1),
(3761, 'Jiangnan', 1),
(3762, 'Jinbei', 1),
(3765, 'Monte Carlo', 1),
(3767, 'Nysa', 1),
(3771, 'Shifeng', 1),
(3772, 'SMA', 1),
(3774, 'Wuling', 1),
(3815, 'Genesis', 1),
(3821, 'Zibar', 1),
(3822, 'Other car', 1),
(4142, 'RAM', 1),
(4144, 'Aurus', 1),
(4145, 'Trumpchi', 1),
(4146, 'Abarth', 1),
(4147, 'Baic', 1),
(4148, 'DFM', 1),
(4149, 'Saipa', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `masterlist_car_makes`
--
ALTER TABLE `masterlist_car_makes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `masterlist_car_makes`
--
ALTER TABLE `masterlist_car_makes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4150;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
