module.exports = (sequelize, DataTypes) => {
	const Livro = sequelize.define(
		'Livro',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			titulo: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			autor: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			editora: {
				type: DataTypes.STRING,
			},
			ano_publicacao: {
				type: DataTypes.INTEGER,
			},
			categoria: {
				type: DataTypes.STRING,
			},
			isbn: {
				type: DataTypes.STRING,
				unique: true,
			},
			quantidade_total: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			quantidade_disponivel: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			status: {
				type: DataTypes.ENUM('DISPONIVEL', 'INDISPONIVEL'),
				defaultValue: 'DISPONIVEL',
			},
			capa_url: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: true,
			tableName: 'livros',
		}
	);

	return Livro;
};
