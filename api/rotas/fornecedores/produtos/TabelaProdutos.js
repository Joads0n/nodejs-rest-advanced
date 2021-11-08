const Model = require('./ModeloTabelaProduto')

module.exports = {
    listar (idFornecedor) {
        return Model.findAll({
            where : {
                fornecedor: idFornecedor
            }
        })
    }
}