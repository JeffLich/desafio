/**
 * Arquivo: agent.js
 * Author: Jefferson Lichtenfels
 * Description: Arquivo onde criaremos o modelo para compras de um revendedor. 
 * Definição do esquema para ser utilizado na Base de Dados (MongoDb)
 * Data: 01/02/2020
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchaseSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        trim: true
    },
    valor: {
        type: String,
        required: true,
        trim: true        
    },
    data:{
        type: Date,
        required: true,
        trim: true        
    },
    cpf: {
        type: String,
        required: true,
        trim: true        
    },
    status: {
        type: String,
        required: true,
        trim: true        
    },
    valorCashBack: {
        type: String,
        required: false,
        trim: true
    },
    percentualCashBack:{
        type: String,
        required: false,
        trim: true
    }
});




module.exports = mongoose.model('Purchase', PurchaseSchema) ;