var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    nome:{
        type: String,
        required: false,
        trim: true
    },
    login:{
        type: String,
        required: false,
        trim: true
    },
    senha:{
        type: String,
        required: false,
        trim: true
    }

});


module.exports = mongoose.model('Usuario', UsuarioSchema);