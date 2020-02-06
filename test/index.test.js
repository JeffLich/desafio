const test = require('tape')
const validar = require('../src/models/validar')


test('Verificar Status', (t) => {
    t.assert(validar.verificarStatus("Aprovado") === true, "Status retornou correto para Aprovado")
    t.end()
    })

test('Verificar Status', (t) => {
    t.assert(validar.verificarStatus("Em Aprovação") === false, "Status retornou correto para Em aprovação")
    t.end()
    })    

test('Validar status', (t) => {
    t.assert(validar.validarStatus("15350946056") === "Aprovado", "Validou o status correto para o cpf 15350946056")
    t.end()
    })
    
test('Validar status', (t) => {
    t.assert(validar.validarStatus("1221234565432") === "Em aprovação", "Validou o status correto para outro cpf")
    t.end()
    })    

test('Validar calculo de cashBack até 1000', (t) => {
    t.assert(validar.CalcularCashBack(500) === 10, "Retornou o percentual correto para a faixa de valor")
    t.end()
    })

test('Validar calculo de cashBack entre 1000 e 1500', (t) => {
    t.assert(validar.CalcularCashBack(1500) === 15, "Retornou o percentual correto para a faixa de valor")
    t.end()
    })           

test('Validar calculo de cashBack maior que 1500', (t) => {
    t.assert(validar.CalcularCashBack(1501) === 20, "Retornou o percentual correto para a faixa de valor")
    t.end()
    })   
    
test('Validar calculo de cashBack passando uma string', (t) => {
    t.assert(validar.CalcularCashBack("1050") === 15, "Retornou o percentual correto para a faixa de valor")
    t.end()
    })       