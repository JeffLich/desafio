
function verificarStatus(status){
  if("Aprovado" === status){
    return  true;
  }else{
    return  false;
  }
}

function validarStatus(cpf){
  if(cpf === '15350946056'){
    return  "Aprovado";
  }
  else{
    return "Em aprovação";
  } 
}

function CalcularCashBack(valorCompra){
  if(valorCompra<=1000){
    return 10;
  }else if(valorCompra >1000 && valorCompra <= 1500){
    return 15;
  }else{
    return 20;
  }
}


module.exports = {
  verificarStatus : verificarStatus,
  validarStatus : validarStatus,
  CalcularCashBack : CalcularCashBack
};