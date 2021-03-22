const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Cliente = sequelize.define("clientes", {
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
      len: [5, 100]
    }
  },
  cpfCnpj: {
    allowNull: false,
    type: Sequelize.STRING(18),
    validate: {
      len: [14, 18]
    }
  },
  razaoSocial: {
    allowNull: false,
    type: Sequelize.STRING(150),
    validate: {
      len: [10, 150]
    }
  },
  inscricaoEstadual: {
    allowNull: true,
    type: Sequelize.STRING(20)
  },
  segmento: {
    allowNull: true,
    type: Sequelize.STRING(30)
  },
  cep: {
    allowNull: true,
    type: Sequelize.STRING(9)
  },
  logradouro: {
    allowNull: true,
    type: Sequelize.STRING(50)
  },
  numero: {
    allowNull: true,
    type: Sequelize.STRING(6)
  },
  bairro: {
    allowNull: true,
    type: Sequelize.STRING(30)
  },
  cidade: {
    allowNull: true,
    type: Sequelize.STRING(30)
  },
  uf: {
    allowNull: true,
    type: Sequelize.STRING(2)
  },
  complemento: {
    allowNull: true,
    type: Sequelize.STRING(50)
  },
  telefone1: {
    allowNull: false,
    type: Sequelize.STRING(12),
    validate: {
      len: [8, 12]
    }
  },
  telefone2: {
    allowNull: true,
    type: Sequelize.STRING(13)
  },
  responsavel: {
    allowNull: false,
    type: Sequelize.STRING(50),
    validate: {
      len: [5, 50]
    }
  },
  email: {
    allowNull: true,
    type: Sequelize.STRING(100)
  }
});

module.exports = Cliente;