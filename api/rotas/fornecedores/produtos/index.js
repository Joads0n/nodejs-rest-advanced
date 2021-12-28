const roteador = require('express').Router({ mergeParams: true }) /* Indica para acessar os parametros do roteador acima */
const Tabela = require('./TabelaProdutos')
const Produto = require('./Produto')

roteador.get('/', async (req, res) => {
    const produtos = await Tabela.listar(req.params.idFornecedor)
    res.send(JSON.stringify(produtos))
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const corpo = req.body
        const dados = Object.assign({}, corpo, {fornecedor: idFornecedor})
        const produto = new Produto(dados)
        await produto.criar()
        res.status(201)
        res.send(produto)
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:id', async (req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor: req.params.idFornecedor
    }
    const produto = new Produto(dados)
    await produto.apagar()
    res.status(204)
    res.end()
})

//Função não está retornando o produto de id especifico
roteador.get('/:id', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }
        //console.log(dados.id)
    
        const produto = new Produto(dados)
        await produto.carregar()
        res.send(JSON.stringify(produto))
    } catch (erro) {
        proximo(erro)
    }

})



module.exports = roteador