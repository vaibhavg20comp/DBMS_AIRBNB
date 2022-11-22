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
  `zip` varchar(10) NOT NULL,
  PRIMARY KEY (`addr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES ('2cb76ec3-1a56-4663-b110-1d903d7b35f4','4BHK Pool Villa Areca by The Rentalgram','Lonavla','Maharashtra','India','410401'),('8b967cc3-f6ad-4f6d-a410-2326626dad4','3 BR Lake view, Pet friendly, Pool Villa','Pimplad  Nasik','Maharashtra','India','422304'),('8b967cc3-f6ad-4f6d-a410-2326626dad4a','SunnySide cottage with Lake View','Pune','Maharashtra','India','411015'),('afa8461b-84c7-4c46-8be0-8fa586f40d08','NEW Abidal Resort, Colomb bay, Patnem beach','Canacona','Goa','India','403702'),('efe8cc26-b403-4466-8203-49e4a7204a68','Whispering Pines Cottages|Treehouse|Tandi','Jibhi','Himachal Pradesh','India','175123');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `amenity_id` bigint NOT NULL AUTO_INCREMENT,
  `amenity_type` varchar(50) NOT NULL,
  `amenity` varchar(50) NOT NULL,
  `description` varchar(400) DEFAULT '',
  `icon_path` varchar(100) NOT NULL,
  PRIMARY KEY (`amenity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (1,'Bathroom','Hair dryer','','/icons/hairdryer.png'),(2,'Bathroom','Shampoo','','/icons/shampoo.png');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blob_demo`
--

DROP TABLE IF EXISTS `blob_demo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blob_demo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Picture` blob,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blob_demo`
--

LOCK TABLES `blob_demo` WRITE;
/*!40000 ALTER TABLE `blob_demo` DISABLE KEYS */;
/*!40000 ALTER TABLE `blob_demo` ENABLE KEYS */;
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
  `amenity_id` bigint NOT NULL,
  PRIMARY KEY (`property_id`,`amenity_id`),
  KEY `amenity_id` (`amenity_id`),
  CONSTRAINT `has_amenity_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`) ON DELETE CASCADE,
  CONSTRAINT `has_amenity_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`amenity_id`)
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
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `property_id` char(36) NOT NULL,
  `property_name` varchar(20) NOT NULL,
  `description` varchar(600) DEFAULT NULL,
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
INSERT INTO `property` VALUES ('222af398-104b-458f-940b-4fe226bc95b4','Whispering Pines','One of the most successful Airbnbs in India situated in Tandi, a village above Jibhi.It has a tree inside. A balcony, double bed, and a remarkably clean, modern bathroom.Nearby Wheat and maize fields , apple and pear orchards you will see flying squirrels in the night.','efe8cc26-b403-4466-8203-49e4a7204a68',1,1,1,5999,_binary '','2023-01-01','2023-01-08'),('5589f1cc-e39c-4166-bb4e-af3ba487d8a3','SunnySide Cottage','This is a single room luxurious cottage with an amazing view of Pawana Lake  in the premises of Vibhati  Resort . The stay in this cottage includes all the amenities available in resort on sharing basis. It has the in room dinning services for meals .','8b967cc3-f6ad-4f6d-a410-2326626dad4a',1,1,1,6660,_binary '','2022-11-08','2022-11-13'),('74f7ade6-5527-4323-97be-138b9ff26edf','3BR LakeView','This 3Bed pool villa in Nashik is a hidden paradise waiting to dazzle you with its tranquil charm.Surrounded by nature as far as the eyes can see,the open lawns within the premises give you all the space you need to take a refreshing walk,practice your morning asanas or indulge your kids in a fun game of catch&cook.','8b967cc3-f6ad-4f6d-a410-2326626dad4',3,3,3,26266,_binary '','2022-11-14','2022-11-19'),('9315baac-ede2-440c-b79b-b54f9311c856','Abidal Resort','Abidal house is beautifully situated new resort on the rocks of tranquil Colomb Bay in South Goa, between the hustle and bustle of Palolem and the relaxed hippie vibe of Patnem Beach.We have 11 luxury cottages,newly built and lovingly furnished with private terraces,hammocks and a stunning view','afa8461b-84c7-4c46-8be0-8fa586f40d08',1,1,1,6500,_binary '','2022-12-09','2022-12-14');
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
INSERT INTO `property_has_images` VALUES ('0a85e9fe-d9d5-41e7-89cb-6ceaaf4a79da','222af398-104b-458f-940b-4fe226bc95b4','https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/2fd911ac-1015-4f51-9ed2-42228956ad8d.jpeg?im_w=720',''),('1d41354d-3a4b-4e53-b2e3-2d1049e9b673','5589f1cc-e39c-4166-bb4e-af3ba487d8a3','https://a0.muscache.com/im/pictures/d4b60d36-832b-42b9-9285-c462307dabc5.jpg?im_w=1200',''),('2cb4bf3d-7b1d-4111-af88-79eefc0df358','74f7ade6-5527-4323-97be-138b9ff26edf','https://a0.muscache.com/im/pictures/miso/Hosting-605371928419351152/original/4e31601b-f3e6-470e-82eb-76b29d5edcfe.jpeg?im_w=720',''),('2f9211f7-5435-4ae0-ad18-ba8d0f60c226','74f7ade6-5527-4323-97be-138b9ff26edf','https://a0.muscache.com/im/pictures/miso/Hosting-605371928419351152/original/59af5e61-037e-440c-92b5-429edc8baafe.jpeg?im_w=720',''),('4cde2697-f71d-430b-b76e-cb7dcc3367d8','5589f1cc-e39c-4166-bb4e-af3ba487d8a3','https://a0.muscache.com/im/pictures/73ea43e4-f1b4-48c4-866f-e769528fdb75.jpg?im_w=1200',''),('68fa42ce-0b89-4209-ac46-48659cbac321','74f7ade6-5527-4323-97be-138b9ff26edf','https://a0.muscache.com/im/pictures/miso/Hosting-605371928419351152/original/82bfaad5-f4ba-4a34-8ef7-fcff61a57e17.jpeg?im_w=720',''),('75eb19aa-11fa-4575-aad2-cc3fb9ba4425','74f7ade6-5527-4323-97be-138b9ff26edf','https://a0.muscache.com/im/pictures/miso/Hosting-605371928419351152/original/ca080024-4408-4808-aecc-83e411bc7ff9.jpeg?im_w=720',''),('85ad4d37-846e-4882-9918-a9206f8972f4','74f7ade6-5527-4323-97be-138b9ff26edf','https://a0.muscache.com/im/pictures/miso/Hosting-605371928419351152/original/c8f48e8b-091d-47ea-85ac-b31bc2604bbb.jpeg?im_w=1200',''),('8617431b-1630-449d-ad68-6f22ae6dd982','222af398-104b-458f-940b-4fe226bc95b4','https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/19642a01-9946-4480-a2f7-373f3a32d24c.jpeg?im_w=720',''),('86363d49-ea57-4388-9678-bf1b0df37a11','74f7ade6-5527-4323-97be-138b9ff26edf','https://a0.muscache.com/im/pictures/miso/Hosting-605371928419351152/original/5a75eb0e-59bf-4c85-bf4b-0c379663c7b8.jpeg?im_w=720',''),('8868d11c-0dcc-4aea-9fc5-d2b133e51806','222af398-104b-458f-940b-4fe226bc95b4','https://a0.muscache.com/im/pictures/99a353d0-ebb6-4740-8bc5-136382a7f405.jpg?im_w=1200',''),('90b8e6f4-3dce-4843-82d7-d919dca7718d','74f7ade6-5527-4323-97be-138b9ff26edf','https://a0.muscache.com/im/pictures/miso/Hosting-605371928419351152/original/5fae54d7-9455-4c79-b077-02222ed699dd.jpeg?im_w=1200',''),('95b6da84-4650-4567-a00d-757a4583d086','222af398-104b-458f-940b-4fe226bc95b4','https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/70770e3f-3e7c-4fb7-8680-0e4de91ee37d.jpeg?im_w=720',''),('96eb6e9f-1359-4f02-854f-8f0ce5b1dc28','222af398-104b-458f-940b-4fe226bc95b4','https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/87d16d1e-4b25-4541-a127-e00cd4f6487e.jpeg?im_w=1200',''),('9b44c695-71a5-47d7-b388-f2bb1146deea','5589f1cc-e39c-4166-bb4e-af3ba487d8a3','https://a0.muscache.com/im/pictures/8ad9469d-c9fc-4039-8efd-314987c14a50.jpg?im_w=720',''),('bdab2ba1-2802-4af3-8ff2-357e5fc65b42','5589f1cc-e39c-4166-bb4e-af3ba487d8a3','https://a0.muscache.com/im/pictures/960cbd39-b1a8-4c1f-902c-bb9e8c71439a.jpg?im_w=1200',''),('df937793-d905-4ca6-b8b3-4c63d017dc72','222af398-104b-458f-940b-4fe226bc95b4','https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/9da40e3c-5846-4359-bb41-05c27b09a8f5.jpeg?im_w=720','');
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
  `email` varchar(255) NOT NULL,
  `phone` char(14) NOT NULL,
  `numOfRatings` int DEFAULT NULL,
  `avgRating` decimal(2,1) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `isHost` bit(1) NOT NULL,
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

-- Dump completed on 2022-11-17  1:42:15
