module.exports = (sequelize, DataTypes) => {
	const Leitor = sequelize.define(
		'Leitor',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			usuario_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			nome: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			cpf_ra: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			telefone: {
				type: DataTypes.STRING,
			},
			endereco: {
				type: DataTypes.STRING,
			},
			status: {
				type: DataTypes.ENUM('ATIVO', 'INATIVO'),
				defaultValue: 'ATIVO',
			},
		},
		{
			timestamps: true,
			tableName: 'leitores',
		}
	);

	return Leitor;
};
