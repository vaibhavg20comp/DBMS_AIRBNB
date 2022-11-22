-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: airbnb_dbms
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
INSERT INTO `address` VALUES ('ABCDEFGHIJKLMNOPQRSTUVWXYZ1111111111','D904, Elixir Towers, Aundh','Pune','Maharashtra','India');
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
INSERT INTO `book` VALUES ('2121212121ABCABCABCABCABCABCABCABCAB','ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242','111111111111111111111111111111111111'),('ad80504b-9f1a-4b16-b472-1a277d690ce2','ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242','4d3c4f79-cb03-4360-a350-cce271550b42'),('ad80504b-9f1a-4b16-b472-1a277d690ce2','ABCDEFGHIJKLMNOPQRSTUVWXYZ8484848484','ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242');
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
  `booking_date_time` datetime NOT NULL,
  `modification_date_time` datetime NOT NULL,
  `total_price` decimal(10,0) NOT NULL,
  `no_of_guests` smallint NOT NULL,
  `check_out_date` date DEFAULT NULL,
  `check_in_date` date DEFAULT NULL,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES ('111111111111111111111111111111111111','2022-11-15 10:37:17','2022-11-15 10:37:17',15000,3,'2022-11-17','2022-11-15'),('4d3c4f79-cb03-4360-a350-cce271550b42','2022-11-16 03:41:57','2022-11-16 03:41:57',60000,4,'2022-11-17','2022-11-28'),('ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242','2022-11-15 10:37:17','2022-11-15 10:37:17',15000,3,'2022-11-17','2022-11-15');
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
INSERT INTO `has_amenity` VALUES ('ABCDEFGHIJKLMNOPQRSTUVWXYZ2121212121','swimming pool','Some size swimming pool'),('ABCDEFGHIJKLMNOPQRSTUVWXYZ2121212121','tv','Some inches tb'),('ABCDEFGHIJKLMNOPQRSTUVWXYZ2121212121','wifi','24x7 facility for internet connection');
/*!40000 ALTER TABLE `has_amenity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_property`
--

DROP TABLE IF EXISTS `has_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `has_property` (
  `property_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`property_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `has_property_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`) ON DELETE CASCADE,
  CONSTRAINT `has_property_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `login` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_property`
--

LOCK TABLES `has_property` WRITE;
/*!40000 ALTER TABLE `has_property` DISABLE KEYS */;
/*!40000 ALTER TABLE `has_property` ENABLE KEYS */;
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
INSERT INTO `has_rules` VALUES ('ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242','No pets allowed','The place is not meant for pets'),('ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242','No smoking allowed','It\'s bad for your health!');
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
  PRIMARY KEY (`email`),
  UNIQUE KEY `unq` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('$2b$10$vCqawJ/o6JWhvSjFsjJrV.l/p8xI/6kdko0vULd5aE8dRabA7MEt2','9469a14d-8a63-45b5-954a-e5bdc5da4aff','1234@gmail.com'),('$2b$10$ZlXKn5tlWBzKKrVfvkHQtOHWi0CYbYEPvw6mOq4qYEa8USr1lDYwq','8e265b72-22e8-42b8-8b10-96b96df5992f','12345@gmail.com'),('$2b$10$Jy68neMUW7D0xiRNH2wCGurUAOg9bqA09WWZvoBS6zAWVwy55Iq8S','a1551ccb-ef27-4dce-9b0a-7b06973247f1','123456@gmail.com'),('$2b$10$VX8FcqhISPzCYQ5bIhsUQeF62oUQvHQ5V.o1T1EW4vyBbP3fQNNga','a2f05dcb-0966-46f7-a6ab-fa3752f0baa8','12346@gmail.com'),('$2b$10$yBaIeNPLVT6Ggw5AJCRdcO69PucaBTmjrDUOKoagvYhGFmMGTP3Oy','e905aadb-2bbe-47f5-8977-24e1e722ae71','1234a@gmail.com'),('$2b$10$dzkA8nbeb6kHxUimDZPTlOFgDV95gd7TtrKZWRRwVJTqiaarn7E8m','9e3e9b86-4d69-4288-b497-3c1433add5b8','1234a6@gmail.com'),('$2b$10$vCqawJ/o6JWhvSjFsjJrV.l/p8xI/6kdko0vULd5aE8dRabA7MEt2','2121212121ABCABCABCABCABCABCABCABCAB','abcde@gmail.com'),('$2b$10$1tDQFayYbUiGKwBH7L50C.3QDuRsbjnOrrKBl9BiZIEVEMQuEClJ2','ad80504b-9f1a-4b16-b472-1a277d690ce2','curiyash19@gmail.com'),('$2b$10$./.t8O9LGkIlHHZdWqlt.eLk/eIhiU5qRdyMWTLPBlf2w2jytmiaC','8a713ed8-1425-49fc-81ed-42f2fa7004f9','yossna19april@gmail.com');
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
  `description` varchar(5000) DEFAULT NULL,
  `max_occ` int DEFAULT NULL,
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
INSERT INTO `property` VALUES ('ABCDEFGHIJKLMNOPQRSTUVWXYZ2121212121','Enchanted Towers','ABCDEFGHIJKLMNOPQRSTUVWXYZ1111111111',5,5,5,7000,_binary '','2022-10-12','2022-11-12','Come live in the lap of luxury',4),('ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242','Elixir Towers','ABCDEFGHIJKLMNOPQRSTUVWXYZ1111111111',5,5,5,5000,_binary '','2022-08-16','2022-12-16','Come live in the lap of nature',10),('ABCDEFGHIJKLMNOPQRSTUVWXYZ8484848484','Daisy Towers','ABCDEFGHIJKLMNOPQRSTUVWXYZ1111111111',5,5,5,9800,_binary '','2022-10-10','2022-12-09','Come here',6);
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
INSERT INTO `property_has_images` VALUES ('26df1b27-6564-11ed-8883-d4548b8a2c12','ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242','https://images.unsplash.com/photo-1614649024145-7f847b1c803f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80','Home from home');
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
-- Table structure for table `temp`
--

DROP TABLE IF EXISTS `temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp` (
  `sample` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp`
--

LOCK TABLES `temp` WRITE;
/*!40000 ALTER TABLE `temp` DISABLE KEYS */;
INSERT INTO `temp` VALUES ('abcd');
/*!40000 ALTER TABLE `temp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_booking`
--

DROP TABLE IF EXISTS `test_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_booking` (
  `id` int NOT NULL,
  `cid` int NOT NULL,
  `cod` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_booking`
--

LOCK TABLES `test_booking` WRITE;
/*!40000 ALTER TABLE `test_booking` DISABLE KEYS */;
INSERT INTO `test_booking` VALUES (1,2,3),(1,7,10),(2,21,23),(2,26,27);
/*!40000 ALTER TABLE `test_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_property`
--

DROP TABLE IF EXISTS `test_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_property` (
  `id` int NOT NULL,
  `afd` int NOT NULL,
  `atd` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_property`
--

LOCK TABLES `test_property` WRITE;
/*!40000 ALTER TABLE `test_property` DISABLE KEYS */;
INSERT INTO `test_property` VALUES (1,-5,15),(2,20,30),(3,10,24);
/*!40000 ALTER TABLE `test_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` char(36) NOT NULL,
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
INSERT INTO `user` VALUES ('04ce343b-3524-4cc5-8fed-0e707580b4f1','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0'),('0b8a1335-00a8-43ef-8fbc-0e3a1a4f60af','Yash','S','Suryawanshi','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('123456789123456789123456789123456789','yash','s','suryawanshi','2022-11-14','+91-7350087579',NULL,NULL,_binary '\0'),('2121212121ABCABCABCABCABCABCABCABCAB','Vedanshi','Jigish','Shah','2002-08-03','+917218733467',45,4.8,_binary '\0'),('24d8c575-a886-4631-8ceb-9bc0139aa292','harsh','j','kulkarni','2002-01-21','+91-7350087579',NULL,NULL,_binary ''),('298c33fc-8e3e-46c3-9f4b-bb470aa9129c','om','h','khare','2002-12-16','+91-7350087579',NULL,NULL,_binary ''),('3e4181e9-6bf1-4d74-8c8e-4f29b5f37b85','yash','s','wanshi','2002-04-19','+91-7350087579',NULL,NULL,_binary '\0'),('4c8d8164-a2f4-4e00-87e9-343e3aaf6ce7','shyam','v','randar','2002-06-16','+91-7350087579',NULL,NULL,_binary ''),('5cafa434-dec9-4a4b-b6db-c9918b7f4fb9','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0'),('7783f195-242a-4b4e-8b37-75b91ef81e76','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0'),('7da7bea8-b2c2-4310-b463-510791e11ada','Vaibhav','Z','Garje','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('8a713ed8-1425-49fc-81ed-42f2fa7004f9','Yash','S','Suryawanshi','2002-10-21','+917342244221',NULL,NULL,_binary '\0'),('8b960d52-b5ec-435d-9e17-9de7a82b5b01','Vaibhav','Z','Garje','2022-09-17','+917342244221',NULL,NULL,_binary ''),('8e265b72-22e8-42b8-8b10-96b96df5992f','Vaibhav','Z','Garje','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('9469a14d-8a63-45b5-954a-e5bdc5da4aff','Yash','S','Suryawanshi','2002-10-21','+917342244221',NULL,NULL,_binary '\0'),('961472e4-75c8-4f07-b2d4-8034112889e6','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0'),('96c60623-27de-4676-ad5e-b62427e4829b','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0'),('9e3e9b86-4d69-4288-b497-3c1433add5b8','Yash','Z','Suryawanshi','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('a1551ccb-ef27-4dce-9b0a-7b06973247f1','Vaibhav','Z','Garje','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('a2f05dcb-0966-46f7-a6ab-fa3752f0baa8','Vaibhav','Z','Garje','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('a3c7b29e-5fcd-4946-8666-d48c78e2a1dc','Vaibhav','Z','Garje','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('a7b5c96f-1497-435d-ac9a-4fc1a00e9091','vaibhav','m','garje','2002-05-05','+91-7350087579',NULL,NULL,_binary '\0'),('ad5ac0ad-4a7b-463f-8796-1e2e56aa7417','Yash','S','Suryawanshi','2002-03-01','+917342244221',NULL,NULL,_binary ''),('ad80504b-9f1a-4b16-b472-1a277d690ce2','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0'),('ad899684-5be1-43fe-a571-d802a6341c96','Yash','Z','Suryawanshi','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('af1fa747-7709-4e27-9faa-67953e64e2d2','Vaibhav','Z','Garje','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('bcf48f5e-327f-49a9-b0ed-6eadf81b9cf8','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0'),('cb933804-0638-43b0-a0a1-1de0912d0f3d','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0'),('cf87b2e1-0bfc-4557-ab4b-6bb4b9b6e811','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0'),('e68cf622-1e2c-4339-bd98-03336d2a216b','vedanshi','j','shah','2002-08-03','+91-7350087579',NULL,NULL,_binary '\0'),('e905aadb-2bbe-47f5-8977-24e1e722ae71','Yash','S','Suryawanshi','2002-10-14','+917342244221',NULL,NULL,_binary '\0'),('f4a49642-afd6-4ffd-9c78-a7366bbf09a2','Yash','S','Suryawanshi','2002-03-19','+917342244221',NULL,NULL,_binary '\0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `guest_id` char(36) NOT NULL,
  `property_id` char(36) NOT NULL,
  PRIMARY KEY (`guest_id`,`property_id`),
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
INSERT INTO `wishlist` VALUES ('2121212121ABCABCABCABCABCABCABCABCAB','ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242'),('ad80504b-9f1a-4b16-b472-1a277d690ce2','ABCDEFGHIJKLMNOPQRSTUVWXYZ4242424242');
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

-- Dump completed on 2022-11-17  2:40:30
