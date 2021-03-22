const Sequelize = require("sequelize");
const sequelize = require("../database/database");
const Cliente = require("./clientes");
const Usuario = require("./usuario");

const Agendamento = sequelize.define("agendamentos", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  inicio: {
    allowNull: false,
    type: Sequelize.DATE
  },
  situacao: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  idUsuario: {
    allowNull: false,
    foregnKey: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  idCliente: {
    allowNull: false,
    foregnKey: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'clientes',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  solicitante: {
    allowNull: false,
    type: Sequelize.STRING(20),
    validate: {
      len: [3, 20]
    }
  },
  descricao: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  motivoCancelamento: {
    allowNull: true,
    type: Sequelize.TEXT
  },
  atendimento: {
    allowNull: true,
    type: Sequelize.TEXT
  },
});

Usuario.hasMany(Agendamento, {
  as: 'agendamentos'
});

Agendamento.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  as: 'usuarios'
});


Cliente.hasMany(Agendamento, {
  as: 'agendamentos'
});

Agendamento.belongsTo(Cliente, {
  foreignKey: 'idCliente',
  as: 'clientes'
});

module.exports = Agendamento;