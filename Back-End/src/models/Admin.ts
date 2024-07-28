import { DataTypes, Model } from "sequelize";
import sequelize from "../../db";


class Admin extends Model { 
    public id!: string; 
    public email!: string;
    public password!: string;
}

Admin.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Admin', // Nome do modelo
        tableName: 'Admins', // Nome da tabela no banco de dados
        timestamps: false // Não incluir timestamps automáticos
    }
);

export default Admin;
