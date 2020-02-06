const express = require('express');
const usuariosRoutes = express.Router();


const usuarioController = require('../controllers/usuarios-controller');


/* rotas para o cadastro de usuarios */
usuariosRoutes.post('/usuario/novo', usuarioController.createUsers);
usuariosRoutes.get('/usuario', usuarioController.listUsers);
usuariosRoutes.get('/usuario/:login', usuarioController.listOneUsers);
usuariosRoutes.get('/usuario/delete/:login', usuarioController.deleteUsers);
usuariosRoutes.post('/usuario/edit/:login', usuarioController.updateLogin);
usuariosRoutes.post('/usuario/login', usuarioController.loginUsers);
usuariosRoutes.post('/usuario/logout', usuarioController.logoutUsers);




module.exports = usuariosRoutes;

