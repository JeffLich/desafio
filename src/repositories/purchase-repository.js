const mongoose = require('mongoose');
const Purchase = mongoose.model('Purchase');

exports.listPurchase = async () => {
  const res = await Purchase.find({});
  return res;
};
exports.listPurchaseByID = async (id) => {
  const res = await Purchase.findOne({_id:id});
  return res;
};
exports.listAgentPurchase = async data => {
  const res = await Purchase.find({cpf:data});
  return res;
};
exports.listOnePurchase = async (codigo) => {
  const res = await Purchase.findOne({codigo:codigo});
  return res;
};
exports.createPurchase = async data => {
  const purchase = new Purchase(data);
  await purchase.save();
};

exports.updatePurchase = async (id, data) => {
  var query = { _id: id };
  await Purchase.findOneAndUpdate(query, {
    $set: {valor:data.valor,
           data:data.data,
           valorCashBack:data.valorCashBack,
           percentualCashBack:data.percentualCashBack
          }
  });
};

exports.deletePurchase = async data => {
  await Purchase.findOneAndDelete({_id:data});
};