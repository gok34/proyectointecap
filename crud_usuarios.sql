/*
 Navicat Premium Data Transfer

 Source Server         : a
 Source Server Type    : MySQL
 Source Server Version : 100411
 Source Host           : localhost:3306
 Source Schema         : crud_usuarios

 Target Server Type    : MySQL
 Target Server Version : 100411
 File Encoding         : 65001

 Date: 03/08/2021 12:15:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `Rol_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Rol_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'administrador');
INSERT INTO `roles` VALUES (2, 'gerente');
INSERT INTO `roles` VALUES (3, 'usuario');

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `apellido` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telefono` int(8) NULL DEFAULT NULL,
  `direcion` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `correo` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `rol_id` int(11) NULL DEFAULT NULL,
  `contraseña` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`usuario_id`) USING BTREE,
  INDEX `id_roles`(`rol_id`) USING BTREE,
  UNIQUE INDEX `correo`(`correo`) USING BTREE,
  CONSTRAINT `id_roles` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`Rol_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (1, 'allen', 'valbert', 50180829, '5 Calle 4-40 zona 1 Boca del Monte', 'aavc34@gmail.com', 1, '$2a$08$BpGyZ4h.jLDtC37UkN1o3uXU3wyC12TEnws6RxYq9pCNvgUpJQes2');
INSERT INTO `usuarios` VALUES (2, 'Nelly', 'salazar', 54545454, '28 calle zona 14', 'nelly@gmail.com', 2, '$2a$08$xONgKHJCt/4p9OzWJbOrtO9pRcsewziO15pYt.SWa4Gyp3AY3mrQa');
INSERT INTO `usuarios` VALUES (6, 'Allen Antonio', 'Valbert Caal', 0, 'Guatemala', 'henry@gmail.com', 2, '$2a$08$EhkrH6fn.GckDW/MvOFZ5.mTPfJ7AIJD7RtlQ9.fuPnO3ByGIiMjW');

SET FOREIGN_KEY_CHECKS = 1;
