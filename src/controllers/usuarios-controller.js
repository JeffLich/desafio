const {validationResult} = require('express-validator');
const repository = require('../repositories/usuarios-repository');
const jwt = require('jsonwebtoken');

exports.listUsers = async (req, res) => {
  try {
    const data = await repository.listAllUsers();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar usuarios!' + e});
  }
};

exports.listOneUsers = async (req, res) => {
  try {
    const data = await repository.listUsers(req.params.login);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar usuarios!' + e});
  }
};

exports.createUsers = async (req, res, next) => {
  try {
    var qtdade = await repository.listUsersCount(req.body.login);
    if(qtdade !== 0){
      return res.status(500).send({message: 'Um usuário com esse login já existe.'});
    }
    await repository.createUsers({
      login: req.body.login,
      nome: req.body.nome,
      senha: req.body.senha
    });
    return res.status(201).send({message: 'Usuario cadastrado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar usuario. ' + e});
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    await repository.deleteUsers(req.params.login);
    return res.status(200).send({message: 'Usuario apagado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao apagar usuario.' + e});
  }
};

exports.updateLogin = async (req, res) => {
  try {
    await repository.updateUsers(req.params.login, req.body);
    return res.status(200).send({message: 'Usuario atualizado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao atualizar usuario.' + e});
  }
};

exports.loginUsers = async (req, res) => {
  try {
    var qtdade = await repository.listUsersLogin(req.body.login, req.body.senha);
    if(qtdade.qtdade !== 1){
      return res.status(500).send({message: 'Login ou senha incorretos.'});
    }
    
    const id = qtdade.data; 
    var token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 30000 
    });
    res.status(200).send({ auth: true, token: token });
  } catch (e) {
    return res.status(500).send({message: 'Falha ao efetuar o login do usuario. ' + e});
  }
};

exports.logoutUsers = async (req, res) => {
  try {
    res.status(200).send({ auth: false, token: null });
  } catch (e) {
    return res.status(500).send({message: 'Falha ao deslogar usuario. ' + e});
  }
};

