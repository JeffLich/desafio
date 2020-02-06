const mongoose = require('mongoose');
const Agents = mongoose.model('Agents');

exports.listAgents = async () => {
  const res = await Agents.find({});
  return res;
};

exports.listAgent = async data => {
  const res = await Agents.findOne({cpf:data});
  return res;
};

exports.createAgent = async data => {
  const agent = new Agents(data);
  await agent.save();
};

exports.updateAgent = async (cpf, data) => {
  var query = { cpf: cpf };
  await Agents.findOneAndUpdate(query, {
    $set: data
  });
};

exports.deleteAgent = async data => {
  await Agents.findOneAndDelete({cpf:data});
};

