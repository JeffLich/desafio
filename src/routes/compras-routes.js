const express = require('express');
const comprasRoutes = express.Router();

const purchaseController = require('../controllers/purchase-controller');

/* rotas para o cadastro de compras de um revendedor */
comprasRoutes.get('/compras', purchaseController.listPurchase);
comprasRoutes.get('/compras/porcpf/:cpf', purchaseController.listAgentPurchase);
comprasRoutes.get('/compras/:cpf/:codigo', purchaseController.listOnePurchase);
comprasRoutes.get('/compras/deletar/:id', purchaseController.deletePurchase);
comprasRoutes.get('/compras/edit', purchaseController.updatePurchase);
comprasRoutes.post('/compras/novo/:cpf',purchaseController.createPurchase);


module.exports = comprasRoutes;
