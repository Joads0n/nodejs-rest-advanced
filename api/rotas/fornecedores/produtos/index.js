const roteador = require('express').Router({ mergeParams: true }) /* Indica para acessar os parametros do roteador acima */
const Tabela = require('./TabelaProdutos')

roteador.get('/', async (req, res) => {
    const produtos = await Tabela.listar(req.params.idFornecedor)
    res.send(JSON.stringify(produtos))
})

module.exports = roteador