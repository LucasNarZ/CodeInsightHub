const { DataTypes } = require("sequelize");
const sequelize = require("@root/db");

const Pessoas = sequelize.define('pessoas', {
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
}, {
    hooks: {
        beforeCreate: (user, options) => {
            user.searchVector = `${user.apelido} ${user.nome} ${user.stack.join(" ")}`;
        },
        beforeUpdate: (user, options) => {
            user.searchVector = `${user.apelido} ${user.nome} ${user.stack.join(" ")}`;
        }
    }
})

module.exports = Pessoas;
