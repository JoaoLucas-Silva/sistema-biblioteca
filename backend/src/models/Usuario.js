module.exports = (sequelize, DataTypes) => {
	const Usuario = sequelize.define(
		'Usuario',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			senha: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			perfil: {
				type: DataTypes.ENUM('ADMIN', 'BIBLIOTECARIO', 'LEITOR'),
				allowNull: false,
			},
		},
		{
			timestamps: true,
			tableName: 'usuarios',
		}
	);

	return Usuario;
};
