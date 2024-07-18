import { DataTypes, Model } from "sequelize";
import sequelize from "../../db";


class Pessoa extends Model { 
    public id!: string; 
    public apelido!: string;
    public nome!: string;
    public nascimento!: string;
    public stack!: string[];
    public searchvector!: string;
}

Pessoa.init(
    {
        id: {
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
        nascimento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stack: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        searchvector: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Pessoa', // Nome do modelo
        tableName: 'pessoas', // Nome da tabela no banco de dados
        timestamps: false // Não incluir timestamps automáticos
    }
);

export default Pessoa;
