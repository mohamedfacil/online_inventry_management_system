-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2020 at 02:35 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `count` int(10) NOT NULL DEFAULT 0,
  `brand_active` int(11) NOT NULL DEFAULT 0,
  `brand_status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`, `count`, `brand_active`, `brand_status`) VALUES
(1, 'UnBrand', 0, 2, 1),
(2, 'cipla', 3, 1, 1),
(3, 'mankind', 2, 1, 1),
(4, 'glenmark', 2, 1, 1),
(5, 'divis', 0, 1, 1),
(6, 'intas', 0, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categories_id` int(11) NOT NULL,
  `categories_name` varchar(255) NOT NULL,
  `count` int(10) NOT NULL DEFAULT 0,
  `categories_active` int(11) NOT NULL DEFAULT 0,
  `categories_status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categories_id`, `categories_name`, `count`, `categories_active`, `categories_status`) VALUES
(1, 'UnCategorized', 3, 1, 1),
(2, 'discentry', 2, 1, 1),
(3, 'head ache', 0, 1, 1),
(4, 'Vomiting', 0, 1, 2),
(5, 'neck pain', 1, 1, 1),
(6, 'fever', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(20) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `wa_number` varchar(15) NOT NULL,
  `status` int(10) NOT NULL,
  `api_keys` varchar(64) NOT NULL,
  `date_of_creation` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `customer_name`, `wa_number`, `status`, `api_keys`, `date_of_creation`) VALUES
(6, 'nick', '2356', 1, '7e10e3a181496fdd1207475ca9bc9b21', '2011-11-20'),
(7, 'jones', '5564', 2, '64689e67e2b8fb740ea20c106b1f969a', '2011-11-20'),
(8, 'hickup', '9876', 3, '35e1542ea37baf5cd0d5e5e030154f63', '2011-11-20'),
(9, 'shafrom', '5912', 2, '8879448dd211ed94cbbc9d7010044511', '2011-11-20'),
(12, 'jason', '4126', 1, 'ca0bdab96eff6d4b2a0befee2f0afd54', '2020-11-12'),
(13, 'justin ', '6597', 2, '8652b3fd3bd295f4abf7ea608ebb3e6b', '2020-11-12'),
(14, 'mica', '6219', 1, '52eb6ac5ea070b5c686de7ee45616de3', '2020-11-17'),
(15, 'thunder', '9546', 3, 'a1fd5339d2000eef399a030132665420', '2020-11-17'),
(16, 'daniel', '5032', 2, 'cc074cf589d46806528e3adcf7f4ae3d', '2020-11-17'),
(17, 'baskar', '5214', 1, 'd3290e9ef2711682f41cae758152250f', '2020-11-17'),
(18, 'master', '6589', 1, '0c250ce40163202c7ec5d6f22439a0d9', '2020-11-17'),
(19, 'zampa', '5544', 1, 'd80a18d75f2bb79dd04c24f79e80924b', '2020-11-17'),
(20, 'rajan', '5286', 1, '971bc3f9f811baf83b08149768a94ae2', '2020-11-18'),
(21, 'salman', '4549', 3, '26de590604d34aa404dcf9e29ebb7b01', '2020-11-18'),
(22, 'twinkle', '0215', 2, 'd924effcf9e83dd1498d23309ae3977a', '2020-11-18');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(6) NOT NULL,
  `customer_name` varchar(64) NOT NULL,
  `status` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `customer_name`, `status`) VALUES
(1, 'mica', 1),
(2, 'thunder', 1),
(3, 'daniel', 1),
(4, 'baskar', 1),
(5, 'master', 1),
(6, 'zampa', 1),
(7, 'rajan', 1),
(8, 'salman', 1),
(9, 'twinkle', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `client_contact` varchar(255) NOT NULL,
  `sub_total` varchar(255) NOT NULL,
  `vat` varchar(255) NOT NULL,
  `total_amount` varchar(255) NOT NULL,
  `discount` varchar(255) NOT NULL,
  `grand_total` varchar(255) NOT NULL,
  `paid` varchar(255) NOT NULL,
  `due` varchar(255) NOT NULL,
  `payment_type` int(11) NOT NULL,
  `payment_status` int(11) NOT NULL,
  `payment_place` int(11) NOT NULL,
  `gstn` varchar(255) NOT NULL,
  `order_status` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL DEFAULT 0,
  `product_id` int(11) NOT NULL DEFAULT 0,
  `quantity` varchar(255) NOT NULL,
  `rate` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `order_item_status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image` text NOT NULL,
  `brand_id` int(11) NOT NULL,
  `categories_id` int(11) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `rate` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_image`, `brand_id`, `categories_id`, `quantity`, `rate`, `active`, `status`) VALUES
(1, 'cetzin', '../assests/images/stock/15196446975fa2ae0c4bbbc.jpg', 4, 2, '100', '2', 1, 1),
(2, 'amoxilin', '../assests/images/stock/5549260595fa2ae6b35fe0.jpg', 3, 5, '0', '5', 1, 1),
(3, 'calpal', '../assests/images/stock/12179532075fa2ae92b6481.jpg', 2, 1, '0', '2', 2, 1),
(4, 'dolo 650', '../assests/images/stock/12128825385fa2aeb71a976.jpg', 1, 3, '100', '3', 2, 2),
(5, 'amlokind', '../assests/images/stock/5308379225fa2aeddcdfa8.jpg', 2, 6, '50', '6', 1, 1),
(6, 'neurobin', '../assests/images/stock/12810897805fa2af083c31f.jpg', 3, 6, '60', '5', 2, 2),
(7, 'dulcolux', '../assests/images/stock/10551033505fa2af37acc00.jpg', 3, 1, '80', '3', 2, 1),
(8, 'libin', '../assests/images/stock/8280114545fa2af68b9eae.jpg', 2, 2, '50', '2', 1, 1),
(9, 'becon', '../assests/images/stock/2230210405fa2afb3b8c38.jpg', 5, 2, '50', '4', 2, 2),
(10, 'liplax', '../assests/images/stock/8338264955fa2afd872701.jpg', 4, 1, '40', '4', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', ''),
(11, 'facil', '2bca18f97f8dd221bece305903735a8f', 'facil@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categories_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `wa_no` (`wa_number`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`order_item_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categories_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
