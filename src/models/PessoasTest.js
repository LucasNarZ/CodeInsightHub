const { DataTypes } = require("sequelize");
const sequelize = require("@root/db-test")

const PessoasTest = sequelize.define('pessoas', {
    id : {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    apelido: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stack: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    searchVector: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = PessoasTest;