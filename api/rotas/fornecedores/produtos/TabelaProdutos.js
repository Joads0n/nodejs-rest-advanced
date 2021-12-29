const Model = require('./ModeloTabelaProduto')
const instancia = require('./../../../banco-de-dados')

// DAO
module.exports = {
    listar (idFornecedor) {
        return Model.findAll({
            where : {
                fornecedor: idFornecedor
            },
            raw: true
        })
    },
    inserir (dados){
        return Model.create(dados)
    },
    remover (idProduto, idFornecedor){
        return Model.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    },
    async pegarPorId (idProduto, idFornecedor) {
        const encontrado = await Model.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            },
            raw: true
        })

        if (!encontrado) {
            throw new Error('Produto não foi encontrado!')
        }

        return encontrado
    },
    atualizar (dadosDoProduto, dadosParaAtualizar){
        return Model.update(
            dadosParaAtualizar,
            {
                where: dadosDoProduto
            }
        )
    },
    subtrair (idProduto, idFornecedor, campo, quantidade){
        return instancia.transaction(async trasacao => {
            const produto = await Model.findOne({
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            })
            produto[campo] = quantidade
            await produto.save()
            return produto
        })

    }
}