-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: airbnb_dbms
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addr_id` char(36) NOT NULL,
  `addr_line` varchar(200) DEFAULT NULL,
  `city` varchar(36) DEFAULT NULL,
  `state` varchar(36) DEFAULT NULL,
  `country` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`addr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `guest_id` char(36) NOT NULL,
  `property_id` char(36) NOT NULL,
  `booking_id` char(36) NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `guest_id` (`guest_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `book_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`) ON DELETE CASCADE,
  CONSTRAINT `book_ibfk_3` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` char(36) NOT NULL,
  `check_in_time` time NOT NULL,
  `check_out_time` time NOT NULL,
  `booking_date_time` datetime NOT NULL,
  `modification_date_time` datetime NOT NULL,
  `total_price` decimal(10,0) NOT NULL,
  `no_of_guests` smallint NOT NULL,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_amenity`
--

DROP TABLE IF EXISTS `has_amenity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `has_amenity` (
  `property_id` char(36) NOT NULL,
  `amenity` varchar(20) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`property_id`,`amenity`),
  CONSTRAINT `has_amenity_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_amenity`
--

LOCK TABLES `has_amenity` WRITE;
/*!40000 ALTER TABLE `has_amenity` DISABLE KEYS */;
/*!40000 ALTER TABLE `has_amenity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_rules`
--

DROP TABLE IF EXISTS `has_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `has_rules` (
  `property_id` char(36) NOT NULL,
  `rule` varchar(20) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`property_id`,`rule`),
  CONSTRAINT `has_rules_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_rules`
--

LOCK TABLES `has_rules` WRITE;
/*!40000 ALTER TABLE `has_rules` DISABLE KEYS */;
/*!40000 ALTER TABLE `has_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `password` varchar(100) DEFAULT NULL,
  `user_id` char(36) NOT NULL,
  `email` varchar(256) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `property_id` char(36) NOT NULL,
  `property_name` varchar(20) NOT NULL,
  `addr_id` char(36) DEFAULT NULL,
  `num_bedrooms` decimal(4,0) DEFAULT NULL,
  `num_beds` decimal(4,0) DEFAULT NULL,
  `num_bathroom` decimal(4,0) DEFAULT NULL,
  `price_per_night` decimal(8,0) DEFAULT NULL,
  `listed` bit(1) NOT NULL,
  `av_from_date` date NOT NULL,
  `av_to_date` date NOT NULL,
  PRIMARY KEY (`property_id`),
  KEY `addr_id` (`addr_id`),
  CONSTRAINT `property_ibfk_1` FOREIGN KEY (`addr_id`) REFERENCES `address` (`addr_id`) ON DELETE SET NULL,
  CONSTRAINT `property_chk_1` CHECK (((`num_bedrooms` >= 0) and (`num_beds` >= 0) and (`num_bathroom` >= 0) and (`price_per_night` >= 0)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_has_images`
--

DROP TABLE IF EXISTS `property_has_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_has_images` (
  `image_id` varchar(36) NOT NULL,
  `property_id` char(36) DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `caption` tinytext NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_has_images_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_has_images`
--

LOCK TABLES `property_has_images` WRITE;
/*!40000 ALTER TABLE `property_has_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `property_has_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_guest_property`
--

DROP TABLE IF EXISTS `review_guest_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_guest_property` (
  `review_id` char(36) NOT NULL,
  `guest_id` char(36) NOT NULL,
  `property_id` char(36) NOT NULL,
  `value_rating` int NOT NULL,
  `cleanliness_rating` int NOT NULL,
  `amenities_rating` int NOT NULL,
  `location_rating` int NOT NULL,
  `overall_rating` int NOT NULL,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  `comment` mediumtext NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `property_id` (`property_id`),
  KEY `review_guest_property_ibfk_2` (`guest_id`),
  CONSTRAINT `review_guest_property_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  CONSTRAINT `review_guest_property_ibfk_2` FOREIGN KEY (`guest_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `rating_chk_1` CHECK (((`value_rating` >= 1) and (`value_rating` <= 5))),
  CONSTRAINT `rating_chk_2` CHECK (((`cleanliness_rating` >= 1) and (`cleanliness_rating` <= 5))),
  CONSTRAINT `rating_chk_3` CHECK (((`amenities_rating` >= 1) and (`amenities_rating` <= 5))),
  CONSTRAINT `rating_chk_4` CHECK (((`location_rating` >= 1) and (`location_rating` <= 5))),
  CONSTRAINT `rating_chk_5` CHECK (((`overall_rating` >= 1) and (`overall_rating` <= 5)))
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
-- Table structure for table `review_has_images`
--

DROP TABLE IF EXISTS `review_has_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_has_images` (
  `image_id` varchar(36) NOT NULL,
  `review_id` char(36) DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `caption` tinytext NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `review_id` (`review_id`),
  CONSTRAINT `review_has_images_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `review_guest_property` (`review_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_has_images`
--

LOCK TABLES `review_has_images` WRITE;
/*!40000 ALTER TABLE `review_has_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_has_images` ENABLE KEYS */;
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
  `review_id` char(36) NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `reviewee_user_id` (`reviewee_user_id`,`reviewee_role`),
  KEY `reviewer_user_id` (`reviewer_user_id`),
  CONSTRAINT `review_host_guest_ibfk_1` FOREIGN KEY (`reviewer_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `review_host_guest_ibfk_2` FOREIGN KEY (`reviewee_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `guest_guest_chk` CHECK (((`reviewer_role` <> 0x00) and (`reviewee_role` <> 0x00))),
  CONSTRAINT `host_host_chk` CHECK (((`reviewer_role` <> 0x01) or (`reviewee_role` <> 0x01)))
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
  `phone` char(14) NOT NULL,
  `numOfRatings` int DEFAULT NULL,
  `avgRating` decimal(2,1) DEFAULT NULL,
  `isHost` bit(1) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('24d8c575-a886-4631-8ceb-9bc0139aa292','hm','harsh','j','kulkarni','2002-01-21','+91-7350087579',NULL,NULL,_binary ''),('298c33fc-8e3e-46c3-9f4b-bb470aa9129c','om','om','h','khare','2002-12-16','+91-7350087579',NULL,NULL,_binary ''),('3e4181e9-6bf1-4d74-8c8e-4f29b5f37b85','curiyash','yash','s','wanshi','2002-04-19','+91-7350087579',NULL,NULL,_binary '\0'),('4c8d8164-a2f4-4e00-87e9-343e3aaf6ce7','shyam','shyam','v','randar','2002-06-16','+91-7350087579',NULL,NULL,_binary ''),('8b960d52-b5ec-435d-9e17-9de7a82b5b01','vaibhav','Vaibhav','Z','Garje','2022-09-17','+917342244221',NULL,NULL,_binary ''),('a7b5c96f-1497-435d-ac9a-4fc1a00e9091','vaibhav','vaibhav','m','garje','2002-05-05','+91-7350087579',NULL,NULL,_binary '\0'),('ad5ac0ad-4a7b-463f-8796-1e2e56aa7417','curiyash','Yash','S','Suryawanshi','2002-03-01','+917342244221',NULL,NULL,_binary ''),('e68cf622-1e2c-4339-bd98-03336d2a216b','brinjal','vedanshi','j','shah','2002-08-03','+91-7350087579',NULL,NULL,_binary '\0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `guest_id` char(36) NOT NULL,
  `property_id` char(36) NOT NULL,
  PRIMARY KEY (`wishlist_id`,`guest_id`,`property_id`),
  KEY `guest_id` (`guest_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`) ON DELETE CASCADE,
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`guest_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `wishlist_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
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

-- Dump completed on 2022-11-09 11:27:40
