-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2026 at 02:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iirms_ltd_restore_`
--

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `certificate_id` int(11) NOT NULL,
  `submission_id` int(11) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `payment_status` enum('paid','pending') DEFAULT 'pending',
  `certificate_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `faculties` varchar(255) NOT NULL,
  `depertment` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `faculties`, `depertment`, `speciality`) VALUES
(1, 'Civil Engineering and Environment', 'Engineering', '0'),
(3, 'Economics and Management Sciences', 'Business', '0'),
(4, 'Health and Biomedical Sciences', 'Health', '0'),
(5, 'Law and Governance', 'Law', '0'),
(6, 'Agriculture and Rural Development', 'Agriculture', '0'),
(7, 'Energy and Sustainable Development', 'Energy', '0');

-- --------------------------------------------------------

--
-- Table structure for table `eventnews`
--

CREATE TABLE `eventnews` (
  `event_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `content` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `type` enum('event','news') DEFAULT 'news',
  `is_active` tinyint(1) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eventnews`
--

INSERT INTO `eventnews` (`event_id`, `title`, `description`, `content`, `image_url`, `event_date`, `type`, `is_active`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'application', 'nbvbvcgdfsdsdadsfcgjbvjkjggfutrxzg', 'basafdggfhgikujhgiukhb', '/uploads/event_1787062460280.jpg', '0000-00-00 00:00:00', 'news', 1, NULL, '2026-08-18 14:14:25', '2026-08-18 14:14:25');

-- --------------------------------------------------------

--
-- Table structure for table `funding_grants`
--

CREATE TABLE `funding_grants` (
  `funding_id` int(11) NOT NULL,
  `grant_amount` decimal(10,2) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `heroslides`
--

CREATE TABLE `heroslides` (
  `slide_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `heroslides`
--

INSERT INTO `heroslides` (`slide_id`, `title`, `description`, `image_url`, `link`, `active`, `created_at`) VALUES
(2, 'SOD', 'welcome', '/uploads/slide_1786807774491.jpg', 'http://localhost:5173/admin/departments', 1, '2026-08-15 15:29:35'),
(4, 'bmhjzxskchbvgsahxcxfhxs', 'xhjvhfcfgxshbv bcxzmzcxnbvgkjbxblkjxs\r\naxnbcjbvhjbcd ncd\r\ncdjbvcdbhjhbcd', '/uploads/slide_1786978608255.jpg', '', 1, '2026-08-17 14:56:48');

-- --------------------------------------------------------

--
-- Table structure for table `leadership_applications`
--

CREATE TABLE `leadership_applications` (
  `application_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `position` varchar(150) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `statement` text NOT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `reviewed_by` int(11) DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `file_url` text DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `sender_id`, `receiver_id`, `content`, `timestamp`, `file_url`, `file_name`, `file_type`) VALUES
(7, NULL, NULL, 'hi', '2026-08-15 15:12:16', NULL, NULL, NULL),
(8, NULL, NULL, 'hello student', '2026-08-15 15:13:14', NULL, NULL, NULL),
(9, 56, 54, 'hi', '2026-08-17 11:25:07', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `message`, `created_at`) VALUES
(55, 54, 'Welcome basag! Your registration was successful. Department: Energy and Sustainable Development.', '2026-08-17 10:25:37'),
(56, 55, 'Welcome radjab! Your registration was successful. Department: Energy and Sustainable Development.', '2026-08-17 10:27:11'),
(57, 56, 'Welcome amani! Your registration was successful.', '2026-08-17 10:40:33'),
(58, 57, 'Welcome PIER! Your registration was successful. Department: Economics and Management Sciences.', '2026-08-18 09:23:11');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `submission_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `method` enum('paypal','credit_card','mobile_money','bank_transfer') DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `paid_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `user_id`, `submission_id`, `amount`, `method`, `transaction_id`, `paid_at`) VALUES
(1, NULL, NULL, 3000.00, NULL, NULL, '2026-08-12 07:34:39'),
(2, NULL, NULL, 150.00, 'credit_card', 'PUB-1786954133908', '2026-08-17 08:08:53'),
(3, NULL, NULL, 150.00, 'credit_card', 'PUB-1786964293606', '2026-08-17 10:58:13'),
(4, NULL, NULL, 150.00, 'credit_card', 'PUB-1786969670889', '2026-08-17 12:27:50'),
(5, NULL, NULL, 150.00, 'credit_card', 'PUB-1786972023402', '2026-08-17 13:07:03'),
(6, 54, NULL, 155.00, 'paypal', 'PAY-1787039731832', '2026-08-18 07:55:31'),
(7, 55, NULL, 1.00, 'credit_card', 'PUB-1787064124347', '2026-08-18 14:42:04');

-- --------------------------------------------------------

--
-- Table structure for table `payment_settings`
--

CREATE TABLE `payment_settings` (
  `payment_settings_id` int(11) NOT NULL,
  `paypal_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `paypal_email` varchar(255) DEFAULT NULL,
  `card_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `card_checkout_url` varchar(500) DEFAULT NULL,
  `bank_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_account_name` varchar(255) DEFAULT NULL,
  `bank_account_number` varchar(255) DEFAULT NULL,
  `bank_branch_code` varchar(100) DEFAULT NULL,
  `bank_reference_note` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_settings`
--

INSERT INTO `payment_settings` (`payment_settings_id`, `paypal_enabled`, `paypal_email`, `card_enabled`, `card_checkout_url`, `bank_enabled`, `bank_name`, `bank_account_name`, `bank_account_number`, `bank_branch_code`, `bank_reference_note`, `created_at`, `updated_at`) VALUES
(1, 1, '', 1, NULL, 0, '', '', '', 'x      ', NULL, '2026-08-17 16:12:24', '2026-08-18 13:16:33');

-- --------------------------------------------------------

--
-- Table structure for table `peer_reviews`
--

CREATE TABLE `peer_reviews` (
  `review_id` int(11) NOT NULL,
  `submission_id` int(11) DEFAULT NULL,
  `reviewer_id` int(11) DEFAULT NULL,
  `decision` enum('accepted','minor_revisions','major_revisions','rejected') DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `reviewer_application_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `department_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `publication_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `doi` varchar(100) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `research_summary` text DEFAULT NULL,
  `document` varchar(255) DEFAULT NULL,
  `journal_title` varchar(255) DEFAULT NULL,
  `volume` varchar(50) DEFAULT NULL,
  `issue` varchar(50) DEFAULT NULL,
  `publication_year` int(11) DEFAULT NULL,
  `first_page` varchar(50) DEFAULT NULL,
  `last_page` varchar(50) DEFAULT NULL,
  `issn` varchar(32) DEFAULT NULL,
  `publication_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`publication_id`, `title`, `doi`, `department_id`, `created_at`, `research_summary`, `document`, `journal_title`, `volume`, `issue`, `publication_year`, `first_page`, `last_page`, `issn`, `publication_date`) VALUES
(1, 'ICT', NULL, NULL, '2026-08-17 13:17:43', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'djdfkkjfa', NULL, 3, '2026-08-18 14:36:55', 'nbb,,mn,mnlkjzcnhKJXZVmCX<nmCXBNM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'ml', NULL, NULL, '2026-08-18 15:22:05', 'mvhbvk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `publication_researchers`
--

CREATE TABLE `publication_researchers` (
  `publication_researcher_id` int(11) NOT NULL,
  `publication_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publication_researchers`
--

INSERT INTO `publication_researchers` (`publication_researcher_id`, `publication_id`, `user_id`) VALUES
(1, 1, 55),
(2, 2, 57),
(3, 3, 56);

-- --------------------------------------------------------

--
-- Table structure for table `research_submissions`
--

CREATE TABLE `research_submissions` (
  `submission_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `status` enum('submitted','under_review','approved','certificate_issued') DEFAULT 'submitted',
  `submitted_at` datetime NOT NULL,
  `abstract` text DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `publication_id` int(11) DEFAULT NULL,
  `research_summary` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `research_submissions`
--

INSERT INTO `research_submissions` (`submission_id`, `user_id`, `department_id`, `title`, `file_path`, `status`, `submitted_at`, `abstract`, `project_id`, `publication_id`, `research_summary`) VALUES
(1, 55, NULL, 'ICT', NULL, 'under_review', '2026-08-17 13:07:12', 'ncccccccccccc', NULL, 1, NULL),
(2, 57, 3, 'djdfkkjfa', NULL, 'approved', '2026-08-18 14:32:51', 'kjcbxkjn,cXZbvhxcnbhnxzx', NULL, 2, 'nbb,,mn,mnlkjzcnhKJXZVmCX<nmCXBNM'),
(3, 56, NULL, 'ml', '/uploads/submission_1787066367300.pdf', 'approved', '2026-08-18 15:19:27', 'vhmvm', NULL, 3, 'mvhbvk');

-- --------------------------------------------------------

--
-- Table structure for table `reviewer_applications`
--

CREATE TABLE `reviewer_applications` (
  `application_id` int(11) NOT NULL,
  `salutation` varchar(20) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `discipline_field` varchar(255) NOT NULL,
  `research_areas` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(50) NOT NULL,
  `country` varchar(100) NOT NULL,
  `state_province` varchar(100) NOT NULL,
  `city_district` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `resume_path` varchar(255) NOT NULL,
  `qualification_proof_path` varchar(255) NOT NULL,
  `identity_proof_path` varchar(255) NOT NULL,
  `status` enum('pending','accepted','minor_revisions','major_revisions','rejected') DEFAULT 'pending',
  `reviewed_by` int(11) DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `studentprofiles`
--

CREATE TABLE `studentprofiles` (
  `profile_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `trade` varchar(255) DEFAULT NULL,
  `lesson` varchar(255) DEFAULT NULL,
  `combination` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `resume_path` varchar(255) DEFAULT NULL,
  `qualification_proof_path` varchar(255) DEFAULT NULL,
  `identity_proof_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentprofiles`
--

INSERT INTO `studentprofiles` (`profile_id`, `user_id`, `university`, `trade`, `lesson`, `combination`, `profile_image`, `resume_path`, `qualification_proof_path`, `identity_proof_path`) VALUES
(46, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(47, 55, 'ULK', 'energy', 'sun', 'SDD', NULL, NULL, NULL, NULL),
(48, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(49, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('student','scientific_staff','researcher','admin') DEFAULT 'student',
  `created_at` datetime NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `can_manage_department` tinyint(1) NOT NULL DEFAULT 0,
  `verification_code` varchar(50) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `is_leader` tinyint(1) NOT NULL DEFAULT 0,
  `leadership_role` varchar(150) DEFAULT NULL,
  `approval_status` enum('pending','approved','rejected') NOT NULL DEFAULT 'approved',
  `approved_by` int(11) DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `password_reset_token_hash` char(64) DEFAULT NULL,
  `password_reset_expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password_hash`, `role`, `created_at`, `department_id`, `can_manage_department`, `verification_code`, `verified`, `is_leader`, `leadership_role`, `approval_status`, `approved_by`, `approved_at`, `password_reset_token_hash`, `password_reset_expires_at`) VALUES
(54, 'basag', 'basag@gmail.com', '$2b$10$DtCRjEUrGenB7SYb.aiOw.qCgdyCloh713Y8J3uF3Sa2PmjtU2Ple', 'scientific_staff', '2026-08-17 10:25:37', 7, 0, NULL, 0, 0, NULL, 'approved', NULL, NULL, NULL, NULL),
(55, 'radjab', 'radjab@gmail.com', '$2b$10$g44OuyED0Kc1KGBJwn1pSeuGwykzJqfr80PsNnAVHbCMN/99YhquC', 'student', '2026-08-17 10:27:11', 7, 0, NULL, 0, 0, NULL, 'approved', NULL, NULL, NULL, NULL),
(56, 'amani', 'admin@gmail.com', '$2b$10$HXFOtAgnSfH/WLsI5vbTYepMG8QS42xkKB5.Kys5Jp56RslU5JiUe', 'admin', '2026-08-17 10:40:32', NULL, 0, NULL, 0, 0, NULL, 'approved', NULL, NULL, NULL, NULL),
(57, 'PIER', 'pier@gmail.com', '$2b$10$1rqku6SgCS2ES.FTW/5UCex96P3aFlwK4DwQlP9Q9NwTM5tEe4LCa', 'scientific_staff', '2026-08-18 09:23:11', 3, 0, NULL, 0, 0, NULL, 'approved', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`certificate_id`),
  ADD KEY `submission_id` (`submission_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `eventnews`
--
ALTER TABLE `eventnews`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `funding_grants`
--
ALTER TABLE `funding_grants`
  ADD PRIMARY KEY (`funding_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `heroslides`
--
ALTER TABLE `heroslides`
  ADD PRIMARY KEY (`slide_id`);

--
-- Indexes for table `leadership_applications`
--
ALTER TABLE `leadership_applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD UNIQUE KEY `transaction_id` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_2` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_3` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_4` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_5` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_6` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_7` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_8` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_9` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_10` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_11` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_12` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_13` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_14` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_15` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_16` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_17` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_18` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_19` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_20` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_21` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_22` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_23` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_24` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_25` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_26` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_27` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_28` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_29` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_30` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_31` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_32` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_33` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_34` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_35` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_36` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_37` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_38` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_39` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_40` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_41` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_42` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_43` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_44` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_45` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_46` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_47` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_48` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_49` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_50` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_51` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_52` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_53` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_54` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_55` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_56` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_57` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_58` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_59` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_60` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_61` (`transaction_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `submission_id` (`submission_id`);

--
-- Indexes for table `payment_settings`
--
ALTER TABLE `payment_settings`
  ADD PRIMARY KEY (`payment_settings_id`);

--
-- Indexes for table `peer_reviews`
--
ALTER TABLE `peer_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `submission_id` (`submission_id`),
  ADD KEY `reviewer_id` (`reviewer_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`publication_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `publication_researchers`
--
ALTER TABLE `publication_researchers`
  ADD PRIMARY KEY (`publication_researcher_id`),
  ADD UNIQUE KEY `Publication_Researchers_user_id_publication_id_unique` (`publication_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `research_submissions`
--
ALTER TABLE `research_submissions`
  ADD PRIMARY KEY (`submission_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `publication_id` (`publication_id`);

--
-- Indexes for table `reviewer_applications`
--
ALTER TABLE `reviewer_applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `reviewed_by` (`reviewed_by`);

--
-- Indexes for table `studentprofiles`
--
ALTER TABLE `studentprofiles`
  ADD PRIMARY KEY (`profile_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `verification_code` (`verification_code`),
  ADD UNIQUE KEY `verification_code_2` (`verification_code`),
  ADD UNIQUE KEY `verification_code_3` (`verification_code`),
  ADD UNIQUE KEY `verification_code_4` (`verification_code`),
  ADD UNIQUE KEY `verification_code_5` (`verification_code`),
  ADD UNIQUE KEY `verification_code_6` (`verification_code`),
  ADD UNIQUE KEY `verification_code_7` (`verification_code`),
  ADD UNIQUE KEY `verification_code_8` (`verification_code`),
  ADD UNIQUE KEY `verification_code_9` (`verification_code`),
  ADD UNIQUE KEY `verification_code_10` (`verification_code`),
  ADD UNIQUE KEY `verification_code_11` (`verification_code`),
  ADD UNIQUE KEY `verification_code_12` (`verification_code`),
  ADD UNIQUE KEY `verification_code_13` (`verification_code`),
  ADD UNIQUE KEY `verification_code_14` (`verification_code`),
  ADD UNIQUE KEY `verification_code_15` (`verification_code`),
  ADD UNIQUE KEY `verification_code_16` (`verification_code`),
  ADD UNIQUE KEY `verification_code_17` (`verification_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `certificate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `eventnews`
--
ALTER TABLE `eventnews`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `funding_grants`
--
ALTER TABLE `funding_grants`
  MODIFY `funding_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `heroslides`
--
ALTER TABLE `heroslides`
  MODIFY `slide_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `leadership_applications`
--
ALTER TABLE `leadership_applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payment_settings`
--
ALTER TABLE `payment_settings`
  MODIFY `payment_settings_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `peer_reviews`
--
ALTER TABLE `peer_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `publications`
--
ALTER TABLE `publications`
  MODIFY `publication_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `publication_researchers`
--
ALTER TABLE `publication_researchers`
  MODIFY `publication_researcher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `research_submissions`
--
ALTER TABLE `research_submissions`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reviewer_applications`
--
ALTER TABLE `reviewer_applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `studentprofiles`
--
ALTER TABLE `studentprofiles`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`),
  ADD CONSTRAINT `certificates_ibfk_10` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_11` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_12` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_13` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_14` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_15` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_16` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_17` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_18` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_19` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_2` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_20` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_21` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_22` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_23` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_24` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_25` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_26` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_27` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_28` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_29` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_3` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_30` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_31` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_32` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_33` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_34` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_35` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_36` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_37` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_38` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_39` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_4` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_40` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_41` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_42` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_43` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_44` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_45` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_46` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_47` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_48` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_49` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_5` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_50` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_51` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_52` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_53` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_54` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_55` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_56` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_57` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_58` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_59` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_6` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_60` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_61` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_62` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_63` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_64` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_65` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_66` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_67` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_68` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_69` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_7` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_70` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_71` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_72` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_73` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_74` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_75` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_76` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_77` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_78` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_79` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_8` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_80` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_81` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_82` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_83` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_9` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `funding_grants`
--
ALTER TABLE `funding_grants`
  ADD CONSTRAINT `funding_grants_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  ADD CONSTRAINT `funding_grants_ibfk_10` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_11` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_12` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_13` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_14` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_15` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_16` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_17` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_18` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_19` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_20` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_21` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_22` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_23` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_24` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_25` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_26` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_27` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_28` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_29` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_30` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_31` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_32` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_33` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_34` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_35` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_36` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_37` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_38` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_39` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_4` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_40` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_41` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_42` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_43` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_44` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_45` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_46` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_47` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_48` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_49` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_5` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_50` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_51` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_52` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_53` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_54` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_55` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_56` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_57` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_58` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_59` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_6` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_60` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_61` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_62` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_63` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_64` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_65` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_66` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_67` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_68` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_69` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_7` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_70` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_71` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_72` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_73` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_74` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_75` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_76` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_77` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_78` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_79` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_8` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_80` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `funding_grants_ibfk_9` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `leadership_applications`
--
ALTER TABLE `leadership_applications`
  ADD CONSTRAINT `leadership_applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `leadership_applications_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `messages_ibfk_10` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_100` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_101` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_102` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_103` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_104` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_105` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_106` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_107` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_108` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_109` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_11` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_110` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_111` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_112` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_113` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_114` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_115` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_116` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_117` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_118` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_119` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_12` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_120` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_121` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_122` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_123` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_124` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_125` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_126` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_127` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_128` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_129` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_13` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_130` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_131` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_132` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_133` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_134` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_135` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_136` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_137` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_138` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_139` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_14` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_140` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_141` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_142` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_143` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_144` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_145` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_146` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_147` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_148` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_149` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_15` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_150` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_151` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_152` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_153` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_154` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_155` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_156` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_157` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_158` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_159` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_16` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_160` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_17` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_18` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_19` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `messages_ibfk_20` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_21` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_22` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_23` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_24` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_25` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_26` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_27` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_28` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_29` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_30` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_31` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_32` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_33` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_34` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_35` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_36` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_37` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_38` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_39` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_4` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_40` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_41` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_42` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_43` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_44` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_45` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_46` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_47` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_48` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_49` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_5` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_50` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_51` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_52` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_53` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_54` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_55` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_56` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_57` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_58` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_59` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_6` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_60` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_61` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_62` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_63` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_64` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_65` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_66` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_67` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_68` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_69` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_7` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_70` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_71` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_72` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_73` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_74` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_75` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_76` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_77` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_78` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_79` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_8` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_80` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_81` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_82` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_83` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_84` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_85` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_86` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_87` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_88` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_89` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_9` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_90` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_91` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_92` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_93` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_94` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_95` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_96` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_97` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_98` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_99` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `notifications_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_11` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_12` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_14` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_15` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_17` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_18` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_21` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_23` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_24` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_26` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_27` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_28` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_29` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_30` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_31` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_32` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_33` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_34` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_35` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_36` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_37` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_38` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_39` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_40` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_41` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_42` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_43` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_44` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_45` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_46` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_47` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_48` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_49` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_50` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_51` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_52` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_53` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_54` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_55` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_56` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_57` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_58` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_59` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_60` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_61` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_62` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_63` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_64` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_65` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_66` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_67` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_68` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_69` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_70` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_71` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_72` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_73` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_74` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_75` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_76` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_77` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_78` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_79` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_80` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `payments_ibfk_10` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_100` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_101` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_102` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_103` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_104` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_105` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_106` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_107` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_108` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_109` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_11` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_110` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_111` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_112` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_113` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_114` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_115` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_116` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_117` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_118` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_119` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_12` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_120` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_121` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_122` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_123` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_124` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_125` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_126` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_127` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_128` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_129` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_130` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_131` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_132` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_133` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_134` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_135` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_136` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_137` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_138` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_139` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_14` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_140` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_141` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_142` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_143` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_144` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_145` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_146` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_147` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_148` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_149` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_15` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_150` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_151` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_152` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_153` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_154` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_155` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_156` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_157` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_158` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_159` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_160` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_161` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_162` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_163` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_164` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_165` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_17` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_18` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`),
  ADD CONSTRAINT `payments_ibfk_20` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_21` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_22` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_23` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_24` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_26` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_27` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_28` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_29` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_30` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_31` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_32` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_33` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_34` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_35` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_36` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_37` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_38` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_39` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_4` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_40` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_41` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_42` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_43` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_44` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_45` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_46` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_47` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_48` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_49` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_50` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_51` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_52` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_53` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_54` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_55` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_56` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_57` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_58` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_59` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_6` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_60` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_61` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_62` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_63` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_64` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_65` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_66` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_67` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_68` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_69` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_70` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_71` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_72` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_73` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_74` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_75` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_76` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_77` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_78` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_79` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_8` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_80` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_81` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_82` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_83` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_84` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_85` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_86` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_87` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_88` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_89` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_90` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_91` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_92` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_93` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_94` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_95` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_96` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_97` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_98` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_99` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `peer_reviews`
--
ALTER TABLE `peer_reviews`
  ADD CONSTRAINT `peer_reviews_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`),
  ADD CONSTRAINT `peer_reviews_ibfk_10` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_100` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_101` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_102` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_103` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_104` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_105` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_106` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_107` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_108` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_109` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_11` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_110` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_111` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_112` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_113` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_114` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_115` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_116` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_117` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_118` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_119` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_12` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_120` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_121` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_122` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_123` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_124` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_125` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_126` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_127` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_128` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_129` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_13` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_130` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_131` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_132` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_133` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_134` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_135` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_136` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_137` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_138` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_139` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_14` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_140` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_141` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_142` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_143` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_144` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_145` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_146` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_147` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_148` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_149` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_15` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_150` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_151` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_152` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_153` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_154` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_155` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_156` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_157` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_158` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_159` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_16` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_160` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_17` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_18` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_19` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_2` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `peer_reviews_ibfk_20` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_21` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_22` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_23` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_24` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_25` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_26` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_27` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_28` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_29` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_3` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_30` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_31` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_32` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_33` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_34` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_35` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_36` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_37` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_38` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_39` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_4` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_40` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_41` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_42` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_43` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_44` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_45` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_46` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_47` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_48` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_49` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_5` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_50` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_51` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_52` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_53` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_54` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_55` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_56` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_57` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_58` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_59` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_6` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_60` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_61` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_62` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_63` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_64` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_65` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_66` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_67` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_68` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_69` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_7` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_70` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_71` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_72` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_73` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_74` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_75` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_76` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_77` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_78` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_79` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_8` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_80` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_81` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_82` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_83` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_84` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_85` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_86` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_87` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_88` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_89` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_9` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_90` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_91` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_92` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_93` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_94` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_95` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_96` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_97` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_98` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_99` FOREIGN KEY (`submission_id`) REFERENCES `research_submissions` (`submission_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `projects_ibfk_10` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_11` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_12` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_13` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_14` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_15` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_16` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_17` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_18` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_19` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_20` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_21` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_22` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_23` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_24` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_25` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_26` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_27` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_28` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_29` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_30` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_31` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_32` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_33` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_34` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_35` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_36` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_37` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_38` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_39` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_4` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_40` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_41` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_42` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_43` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_44` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_45` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_46` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_47` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_48` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_49` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_5` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_50` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_51` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_52` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_53` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_54` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_55` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_56` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_57` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_58` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_59` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_6` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_60` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_61` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_62` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_63` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_64` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_65` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_66` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_67` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_68` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_69` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_7` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_70` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_71` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_72` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_73` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_74` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_75` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_76` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_77` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_78` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_79` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_8` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_80` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_81` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_82` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_9` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `publications_ibfk_10` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_11` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_12` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_13` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_14` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_15` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_16` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_17` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_18` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_19` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_20` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_21` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_22` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_23` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_24` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_25` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_26` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_27` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_28` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_29` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_30` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_31` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_32` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_33` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_34` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_35` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_36` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_37` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_38` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_39` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_4` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_40` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_41` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_42` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_43` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_44` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_45` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_46` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_47` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_48` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_49` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_5` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_50` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_51` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_52` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_53` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_54` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_55` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_56` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_57` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_58` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_59` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_6` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_60` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_61` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_62` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_63` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_64` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_65` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_66` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_67` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_68` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_69` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_7` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_70` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_71` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_72` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_73` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_74` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_75` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_76` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_77` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_78` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_79` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_8` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_80` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_81` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_82` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_ibfk_9` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `publication_researchers`
--
ALTER TABLE `publication_researchers`
  ADD CONSTRAINT `publication_researchers_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_11` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_12` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_13` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_14` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_15` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_17` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_18` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_19` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_21` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_23` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_24` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_25` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_26` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_27` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_28` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_29` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_3` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_30` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_31` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_32` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_33` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_34` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_35` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_36` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_37` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_38` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_39` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_40` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_41` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_42` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_43` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_44` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_45` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_46` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_47` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_48` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_49` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_5` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_50` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_51` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_52` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_7` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_researchers_ibfk_9` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `research_submissions`
--
ALTER TABLE `research_submissions`
  ADD CONSTRAINT `Research_Submissions_project_id_foreign_idx` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Research_Submissions_publication_id_foreign_idx` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `research_submissions_ibfk_10` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_100` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_101` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_102` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_103` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_104` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_105` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_106` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_107` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_108` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_109` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_11` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_110` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_111` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_112` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_113` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_114` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_115` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_116` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_117` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_118` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_119` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_12` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_120` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_121` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_122` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_123` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_124` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_125` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_126` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_127` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_128` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_129` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_130` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_131` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_132` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_133` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_134` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_135` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_136` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_137` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_138` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_139` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_14` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_140` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_141` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_142` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_143` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_144` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_145` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_146` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_147` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_148` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_149` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_15` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_150` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_151` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_152` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_153` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_154` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_155` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_156` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_157` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_158` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_159` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_160` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_161` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_162` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_163` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_164` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_165` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_166` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_167` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_168` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_169` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_17` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_170` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_171` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_172` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_173` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_174` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_175` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_176` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_177` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_178` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_179` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_18` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_180` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_181` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_182` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_183` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_184` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_185` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_186` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_187` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_188` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_189` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_190` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_191` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_192` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_193` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_194` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_195` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_196` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_197` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_198` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_199` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `research_submissions_ibfk_20` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_200` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_201` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_202` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_203` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_204` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_205` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_206` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_207` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_208` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_209` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_21` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_210` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_211` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_212` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_213` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_214` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_215` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_216` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_217` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_218` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_219` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_22` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_220` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_221` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_23` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_24` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_26` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_27` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_28` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_29` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_30` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_31` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_32` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_33` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_34` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_35` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_36` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_37` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_38` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_39` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_4` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_40` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_41` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_42` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_43` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_44` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_45` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_46` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_47` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_48` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_49` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_50` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_51` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_52` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_53` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_54` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_55` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_56` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_57` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_58` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_59` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_6` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_60` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_61` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_62` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_63` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_64` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_65` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_66` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_67` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_68` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_69` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_70` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_71` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_72` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_73` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_74` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_75` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_76` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_77` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_78` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_79` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_8` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_80` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_81` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_82` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_83` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_84` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_85` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_86` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_87` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_88` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_89` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_90` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_91` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_92` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_93` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_94` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_95` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_96` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_97` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_98` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `research_submissions_ibfk_99` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `reviewer_applications`
--
ALTER TABLE `reviewer_applications`
  ADD CONSTRAINT `reviewer_applications_ibfk_1` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `studentprofiles`
--
ALTER TABLE `studentprofiles`
  ADD CONSTRAINT `studentprofiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_11` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_12` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_14` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_15` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_17` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_18` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_21` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_23` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_24` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_26` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_27` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_28` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_29` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_30` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_31` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_32` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_33` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_34` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_35` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_36` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_37` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_38` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_39` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_40` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_41` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_42` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_43` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_44` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_45` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_46` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_47` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_48` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_49` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_50` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_51` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_52` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_53` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_54` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_55` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_56` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_57` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_58` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_59` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_60` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_61` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_62` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_63` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_64` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_65` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_66` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_67` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_68` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_69` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_70` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_71` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_72` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_73` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_74` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_75` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_76` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_77` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_78` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_79` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_80` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_81` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_82` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_83` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_84` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_85` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentprofiles_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
