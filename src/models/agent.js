/**
 * Arquivo: agent.js
 * Author: Jefferson Lichtenfels
 * Description: Arquivo onde criaremos o modelo para revendedores. 
 * Definição do esquema para ser utilizado na Base de Dados (MongoDb)
 * Data: 01/02/2020
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgentSchema = new Schema({
    nome:{
        type: String,
        required: true,
        trim: true
    },
    cpf:{
        type: String,
        required: true,
        trim: true        
    },
    email:{
        type: String,
        required: true,
        trim: true        
    },
    senha: {
        type: String,
        required: true,
        trim: true        
    }
});



module.exports = mongoose.model('Agents', AgentSchema);