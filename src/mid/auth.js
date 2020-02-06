/*Arquivo que trata da autentição via JWT com a leitura da palavra secreta via arquivo de configuração*/

const jwt = require('jsonwebtoken');

function autentJWT(res, req, next){
    var token = req.headers['token'];
    if (!token) return res.status(401).send({ auth: false, message: 'Acesso sem token.' });
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Token inválido.' });
      req.userId = decoded.id;
      next();
    });
}

module.exports = {autentJWT : autentJWT};