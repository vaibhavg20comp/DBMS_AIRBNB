-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: airbnb2
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image_id` char(36) NOT NULL,
  `link` varchar(500) NOT NULL,
  `caption` tinytext NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property2`
--

DROP TABLE IF EXISTS `property2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property2` (
  `property_id` char(36) NOT NULL,
  PRIMARY KEY (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property2`
--

LOCK TABLES `property2` WRITE;
/*!40000 ALTER TABLE `property2` DISABLE KEYS */;
/*!40000 ALTER TABLE `property2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_guest_property`
--

DROP TABLE IF EXISTS `review_guest_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_guest_property` (
  `guest_id` char(36) NOT NULL,
  `property_id` char(36) NOT NULL,
  `value_rating` int NOT NULL,
  `cleanliness_rating` int NOT NULL,
  `amenities_rating` int NOT NULL,
  `location_rating` int NOT NULL,
  `overall_rating` int NOT NULL,
  `image_id` char(36) NOT NULL,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  `comment` mediumtext NOT NULL,
  PRIMARY KEY (`guest_id`,`property_id`,`image_id`),
  KEY `property_id` (`property_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `review_guest_property_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `review_guest_property_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property2` (`property_id`),
  CONSTRAINT `review_guest_property_ibfk_3` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_guest_property`
--

LOCK TABLES `review_guest_property` WRITE;
/*!40000 ALTER TABLE `review_guest_property` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_guest_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_host_guest`
--

DROP TABLE IF EXISTS `review_host_guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_host_guest` (
  `reviewer_user_id` char(36) NOT NULL,
  `reviewer_role` bit(1) NOT NULL,
  `reviewee_role` bit(1) NOT NULL,
  `reviewee_user_id` char(36) NOT NULL,
  `comment` mediumtext NOT NULL,
  `rating` int NOT NULL,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  PRIMARY KEY (`reviewer_user_id`,`reviewer_role`,`reviewee_user_id`,`reviewee_role`),
  KEY `reviewee_user_id` (`reviewee_user_id`,`reviewee_role`),
  CONSTRAINT `review_host_guest_ibfk_1` FOREIGN KEY (`reviewer_user_id`, `reviewer_role`) REFERENCES `user_role` (`user_id`, `role`),
  CONSTRAINT `review_host_guest_ibfk_2` FOREIGN KEY (`reviewee_user_id`, `reviewee_role`) REFERENCES `user_role` (`user_id`, `role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_host_guest`
--

LOCK TABLES `review_host_guest` WRITE;
/*!40000 ALTER TABLE `review_host_guest` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_host_guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` char(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `firstname` varchar(128) NOT NULL,
  `middlename` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` char(14) NOT NULL,
  `numOfRatings` int DEFAULT NULL,
  `avgRating` decimal(2,1) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` char(36) NOT NULL,
  `role` bit(1) NOT NULL,
  PRIMARY KEY (`user_id`,`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `name` varchar(100) NOT NULL,
  `guest_id` char(36) NOT NULL,
  `property_id` char(36) NOT NULL,
  PRIMARY KEY (`name`,`guest_id`,`property_id`),
  KEY `guest_id` (`guest_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property2` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-23 13:14:20
