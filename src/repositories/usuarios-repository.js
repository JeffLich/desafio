const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuario');

exports.listAllUsers = async () => {
  const res = await Usuarios.find({});
  return res;
};

exports.listUsersCount = async (data) => {
  const res = parseInt(await Usuarios.find({"login":data}).count());
  return res;
};

exports.listUsersLogin = async (login, senha) => {
  const resCount = parseInt(await Usuarios.find({"login":login, "senha":senha}).count());
  const res = await Usuarios.find({"login":login, "senha":senha}, "_id");
  return {"qtdade":resCount, "data": res};
};

exports.listUsers = async data => {
  const res = await Usuarios.find({login:data});
  return res;
};

exports.createUsers = async data => {
  const user = new Usuarios(data);
  await user.save();
};

exports.updateUsers = async (login, data) => {
  var query = { login: login };
  await Usuarios.findOneAndUpdate(query, {
    $set: data
  });
};

exports.deleteUsers = async data => {
  await Usuarios.findOneAndDelete({login:data});
};