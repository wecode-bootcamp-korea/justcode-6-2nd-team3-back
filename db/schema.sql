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
-- Table structure for table `comment_recommend`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_recommend` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `comment_id` int NOT NULL,
  `recommend_type` tinyint DEFAULT NULL,
  PRIMARY KEY (`unique_id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_recommend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`) ON UPDATE CASCADE,
  CONSTRAINT `comment_recommend_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(3000) DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`unique_id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`unique_id`) ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `introduction` varchar(1000) DEFAULT NULL,
  `Business_registration_number` varchar(50) NOT NULL,
  `contact_information` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `Business_registration_image` varchar(3000) DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`unique_id`),
  UNIQUE KEY `Business_registration_number` (`Business_registration_number`),
  UNIQUE KEY `email` (`email`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_category` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `main_category_name` varchar(100) DEFAULT NULL,
  `is_active` tinyint DEFAULT NULL,
  PRIMARY KEY (`unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_recommend`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_recommend` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `recommend_type` tinyint DEFAULT NULL,
  PRIMARY KEY (`unique_id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_recommend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`) ON UPDATE CASCADE,
  CONSTRAINT `post_recommend_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_tags` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `tage_id` int NOT NULL,
  PRIMARY KEY (`unique_id`),
  KEY `post_id` (`post_id`),
  KEY `tage_id` (`tage_id`),
  CONSTRAINT `post_tags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`unique_id`) ON UPDATE CASCADE,
  CONSTRAINT `post_tags_ibfk_2` FOREIGN KEY (`tage_id`) REFERENCES `tags` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `posts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `main_category_id` int NOT NULL,
  `sub_category_id` int NOT NULL,
  `user_id` int NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `career` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `contract_type` varchar(100) DEFAULT NULL,
  `pay` varchar(100) DEFAULT NULL,
  `manager_name` varchar(100) DEFAULT NULL,
  `manager_tel` varchar(100) DEFAULT NULL,
  `manager_email` varchar(200) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(3000) DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`unique_id`),
  KEY `main_category_id` (`main_category_id`),
  KEY `sub_category_id` (`sub_category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`main_category_id`) REFERENCES `main_category` (`unique_id`) ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`unique_id`) ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schema_migrations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scraps`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scraps` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`unique_id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `scraps_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`) ON UPDATE CASCADE,
  CONSTRAINT `scraps_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sub_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_category` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `main_category_id` int NOT NULL,
  `sub_category_name` varchar(100) DEFAULT NULL,
  `is_active` tinyint DEFAULT NULL,
  PRIMARY KEY (`unique_id`),
  KEY `main_category_id` (`main_category_id`),
  CONSTRAINT `sub_category_ibfk_1` FOREIGN KEY (`main_category_id`) REFERENCES `main_category` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_scores`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_scores` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`unique_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tags` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `tage_id` int NOT NULL,
  PRIMARY KEY (`unique_id`),
  KEY `user_id` (`user_id`),
  KEY `tage_id` (`tage_id`),
  CONSTRAINT `user_tags_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`) ON UPDATE CASCADE,
  CONSTRAINT `user_tags_ibfk_2` FOREIGN KEY (`tage_id`) REFERENCES `tags` (`unique_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `unique_id` int NOT NULL AUTO_INCREMENT,
  `id` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `profile_image` varchar(3000) DEFAULT NULL,
  `user_type` tinyint DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`unique_id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'test30'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed

--
-- Dbmate schema migrations
--

LOCK TABLES `schema_migrations` WRITE;
INSERT INTO `schema_migrations` (version) VALUES
  ('20220919072753'),
  ('20220919072824'),
  ('20220919072835'),
  ('20220919072839'),
  ('20220919072857'),
  ('20220919072908'),
  ('20220919072921'),
  ('20220919072939'),
  ('20220919072953'),
  ('20220919073007'),
  ('20220919073019'),
  ('20220919073025'),
  ('20220919073038');
UNLOCK TABLES;
