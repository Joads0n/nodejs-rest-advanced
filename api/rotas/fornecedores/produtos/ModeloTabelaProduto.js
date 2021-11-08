const Sequelize = require('sequelize')
const instacia = require('../../../banco-de-dados/index')

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false    /* Indica que este campo deve ser de preenchimento obrigatório */
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0     /* Indica que caso não seja especificado recebe por padrão 0 */
    },
    fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {       /* Relaciona a chave de outra tabela por seu modelo */
            model: require('../ModeloTabelaFornecedor'),
            key: 'id'
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'produtos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instacia.define('produto', colunas, opcoes)