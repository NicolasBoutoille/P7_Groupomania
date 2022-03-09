-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `idComments` int NOT NULL AUTO_INCREMENT,
  `content` varchar(250) NOT NULL,
  `idUsers` int NOT NULL,
  `idPosts` int NOT NULL,
  `dateOfComment` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idComments`),
  KEY `idUsers_idx` (`idUsers`),
  KEY `idPosts1_idx` (`idPosts`),
  CONSTRAINT `idPosts1` FOREIGN KEY (`idPosts`) REFERENCES `posts` (`idPosts`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsers1` FOREIGN KEY (`idUsers`) REFERENCES `users` (`idUsers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (13,'C\'est bon ça fonctionne !',75,57,'2022-02-28 16:23:25'),(26,'Cool !',77,56,'2022-02-28 17:28:09'),(35,'Bienvenue !',75,61,'2022-02-28 18:03:44'),(36,'??????',77,57,'2022-02-28 18:13:07'),(43,'Bienvenue !',75,62,'2022-03-04 10:00:22'),(55,'Salut !! ?',77,62,'2022-03-04 16:13:19'),(64,'Yes vivement ! ?',83,130,'2022-03-09 15:40:13');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `idPosts` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `imageUrl` varchar(150) DEFAULT NULL,
  `idUsers` int DEFAULT NULL,
  `dateOfPost` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPosts`),
  KEY `idUsers_idx` (`idUsers`),
  CONSTRAINT `idUsers` FOREIGN KEY (`idUsers`) REFERENCES `users` (`idUsers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (56,'Le site est en ligne !','http://localhost:3000/images/party.gif1646055873819.gif',75,'2022-02-28 14:44:33'),(57,'Les commentaires ne s\'affichent pas encore...','http://localhost:3000/images/no.gif1646056777067.gif',75,'2022-02-28 14:59:37'),(61,'Premier post sur le site !','http://localhost:3000/images/cool.gif1646067703087.gif',77,'2022-02-28 18:01:43'),(62,'Bonjour à tous !','http://localhost:3000/images/hello.gif1646298188991.gif',83,'2022-03-03 10:03:09'),(130,'Bientôt le week end !!!','http://localhost:3000/images/weekend.gif1646836409651.gif',95,'2022-03-09 15:33:29');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUsers` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilePicture` varchar(150) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idUsers`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (75,'admin@admin.com','Admin','$2b$10$bPEfgojNBjwGh.ASGKOEo.gsab8uRlzofayW7IYtboVeYjDtQoCEW','http://localhost:3000/images/admin.png1646819359105.png',1),(77,'test@gmail.com','Anna','$2b$10$R6Wn9KciOsVEzKYGowN7F.iM0qvS19M20QOz5J1tX3.Uh5sQdTFXW','http://localhost:3000/images/user.png1646068264367.png',0),(83,'test2@gmail.com','Paul','$2b$10$5rAFXhWnCzivIRsh.gFV6um3CMfnO63j.k5WkZkgXzK7WZg6bbMGi','http://localhost:3000/images/flat-face3.png1646298335536.png',0),(91,'test5@gmail.com','test5','$2b$10$4xuYx92J/q7Kw6frfij8yuK4qrq7qR0a8RJUugMgAJgEX1WL8Eon.','http://localhost:3000/images/62681-flat-icons-face-computer-design-avatar-icon.png1646663814495.png',0),(93,'test3@gmail.com','test3','$2b$10$UpqnwNjvAeF3oNKJJHvd1.gMUBr3PFF2jBrBVmpQ9h5jfzAAKSVKa','http://localhost:3000/images/62681-flat-icons-face-computer-design-avatar-icon.png1646820636219.png',0),(95,'test4@gmail.com','Zoé','$2b$10$stFoBkrTndzJ4V4wC60TtutlkragcvihN50DN9wCmmpll6fJSvFsy','http://localhost:3000/images/219989.png1646836360923.png',0),(96,'test6@gmail.com','test6','$2b$10$FtO6qr.JqAntIqeSjtCeZ.ZePc1GmHljqBgs4Q/i.ouEqH4hH2qDe',NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-09 15:45:38
