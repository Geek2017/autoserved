-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 30, 2019 at 01:51 PM
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
-- Table structure for table `masterlist_pms_others`
--

-- CREATE TABLE `masterlist_pms_others` (
--   `id` bigint(20) UNSIGNED NOT NULL,
--   `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `details` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `masterlist_pms_others`
--

INSERT INTO `masterlist_pms_others` (`id`, `name`, `type`, `details`) VALUES
(1, 'change oil', 'oil', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `masterlist_pms_others`
--
ALTER TABLE `masterlist_pms_others`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `masterlist_pms_others`
--
ALTER TABLE `masterlist_pms_others`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
