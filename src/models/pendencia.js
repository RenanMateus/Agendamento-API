const Sequelize = require("sequelize");
const sequelize = require("../database/database");
const Cliente = require("./clientes");

const Pendencia = sequelize.define("pendencias", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nome: {
    allowNull: false,
    type: Sequelize.STRING(100),
    validate: {
      len: [2, 100]
    }
  },
  descricao: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  situacao: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  idCliente: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'clientes',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
});

Cliente.hasMany(Pendencia, {
  as: 'pendencias'
});

Pendencia.belongsTo(Cliente, {
  foreignKey: 'idCliente',
  as: 'clientes'
});

module.exports = Pendencia;