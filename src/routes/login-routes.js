const express = require('express');
const usuariosRoutes = express.Router();
const usuarioController = require('../controllers/usuarios-controller');

/* rotas para autenticação */
usuariosRoutes.post('/usuario/login', usuarioController.loginUsers);
usuariosRoutes.post('/usuario/logout', usuarioController.logoutUsers);


module.exports = usuariosRoutes;

