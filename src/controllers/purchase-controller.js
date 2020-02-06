const {validationResult} = require('express-validator');
const repository = require('../repositories/purchase-repository');
var valida = require('../models/validar');

exports.listPurchase = async (req, res) => {
  try {
    const data = await repository.listPurchase();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as compras do revendedor!' + e});
  }
};

exports.listPurchaseByID = async (req, res) => {
  try {
    const data = await repository.listPurchaseByID(req.body.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as compras do revendedor!' + e});
  }
};

exports.listAgentPurchase = async (req, res) => {
  try {
    const data = await repository.listAgentPurchase(req.params.cpf);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os representantes!' + e});
  }
};

exports.listOnePurchase = async (req, res) => {
  try {
    const data = await repository.listOnePurchase(req.params.codigo);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os representantes!' + e});
  }
};

exports.createPurchase = async (req, res) => {
  var cpf = req.params.cpf,
      codigo = req.body.codigo,
      valor = req.body.valor,
      data = Date(req.body.data),
      percentual = 0,
      valorCashBack = 0
  try {
    percentual = valida.CalcularCashBack(valor);
    valorCashBack = (valor * percentual)/100;
    status = valida.validarStatus(cpf);
    await repository.createPurchase({
      cpf: cpf,
      codigo: codigo,
      valor: valor,
      data: data,
      status: status,
      percentualCashBack: percentual,
      valorCashBack:valorCashBack
    });
    return res.status(201).send({message: 'Compra do revendedor cadastrado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar compra para o revendedor. ' + e});
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    const data = await repository.listPurchaseByID(req.params.id);
    if(valida.verificarStatus(data.status)){
      return res.status(500).send({message: 'Compra com status Aprovado, impossível alterar.'}); 
    }
  
    await repository.deletePurchase(req.params.id);
    return res.status(200).send({message: 'Compra apagada com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao apagar a compra.' + e});
  }
};

exports.updatePurchase = async (req, res) => {
  try {
      const data = await repository.listPurchaseByID(req.body._id);
      if(valida.verificarStatus(data.status)){
        return res.status(500).send({message: 'Compra com status Aprovado, impossível alterar.'}); 
      }
      var valor = req.body.valor;
      var percentual = valida.CalcularCashBack(valor) ;
      var valorCashBack = (valor * percentual)/100;    
   
      await repository.updatePurchase(req.body._id,{
      codigo: req.body.codigo, 
      valor: valor,
      data: req.body.data,
      percentualCashBack: percentual,
      valorCashBack:valorCashBack
    });
    return res.status(200).send({message: 'Compra atualizada com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao atualizar a compra.' + e});
  }
};
