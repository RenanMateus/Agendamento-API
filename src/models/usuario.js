const Sequelize = require("sequelize");
const sequelize = require("../database/database");
const Perfil = require("./perfil");

const Usuario = sequelize.define("usuarios", {
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
  email: {
    allowNull: false,
    type: Sequelize.STRING(100),
    validate: {
      len: [5, 100]
    }
  },
  senha: {
    allowNull: false,
    type: Sequelize.STRING(32)
  },
  idPerfil: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: 'perfis',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
});

Perfil.hasMany(Usuario, {
  as: "usuarios"
});

Usuario.belongsTo(Perfil, {
  foreignKey: "idPerfil",
  as: "perfis",
});


module.exports = Usuario;