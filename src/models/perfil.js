const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Perfil = sequelize.define("perfis", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nome: {
    allowNull: false,
    type: Sequelize.STRING(20)
  },
  permissoes: {
    allowNull: false,
    type: Sequelize.STRING(45)
  }
});

module.exports = Perfil;