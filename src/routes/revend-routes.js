const express = require('express');
const revendRoutes = express.Router();
const valida = require('../mid/auth');
const agentsController = require('../controllers/agents-controller');

//Rotas com necessidade de autenticação JWT
revendRoutes.use(function autentJWT(req, res, next) {
    valida.autentJWT(res, req, next);
  });
/* rotas para o cadastro de Revendedores */
revendRoutes.get('/revendedor', agentsController.listAgents);
revendRoutes.get('/revendedor/:cpf', agentsController.listAgent);
revendRoutes.get('/revendedor/delete/:cpf', agentsController.deleteAgent);
revendRoutes.get('/revendedor/edit/:cpf', agentsController.updateAgent);
revendRoutes.get('/revendedor/totalcashback/:cpf', agentsController.listCashBack);
revendRoutes.post('/revendedor/novo', agentsController.createAgent);

module.exports = revendRoutes;
