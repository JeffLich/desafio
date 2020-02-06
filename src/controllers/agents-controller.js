const {validationResult} = require('express-validator');
const repository = require('../repositories/agents-repository');
const request = require('request');

exports.listAgents = async (req, res) => {
  try {
    const data = await repository.listAgents();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os revendedores!' + e});
  }
};

exports.listAgent = async (req, res) => {
  try {
    const data = await repository.listAgent(req.params.cpf);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os revendedores!' + e});
  }
};

exports.createAgent = async (req, res) => {
  const {errors} = validationResult(req);
  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }
  try {
    await repository.createAgent({
      cpf: req.body.cpf,
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha
    });
    return res.status(201).send({message: 'Revendedor cadastrado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar o revendedor. ' + e});
  }
};

exports.deleteAgent = async (req, res) => {
   try {
    await repository.deleteAgent(req.params.cpf);
    return res.status(200).send({message: 'Revendedor apagado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao apagar o revendedor.' + e});
  }
};

exports.updateAgent = async (req, res) => {
  try {
    await repository.updateAgent(req.params.cpf, req.body);
    return res.status(200).send({message: 'Revendedor atualizado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao atualizar o revendedor.' + e});
  }
};

exports.listCashBack = async (req, res, next) => {
  try {
  await request("https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf="+ req.params.cpf, function(error, response, body) {
    var parsedListCash = JSON.parse(body);
    var cashback = (parsedListCash['body']['credit']);
    res.status(200).send('Valor de cashBack acumulado: ' + cashback);
  });
} catch (e) {
  return res.status(500).sendStatus({message: 'Falha ao recuperar o valor total de cashBack.' + e});
} 
};