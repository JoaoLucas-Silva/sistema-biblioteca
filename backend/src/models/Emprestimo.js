module.exports = (sequelize, DataTypes) => {
	const Emprestimo = sequelize.define(
		'Emprestimo',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			leitor_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			data_emprestimo: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			data_prevista_devolucao: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			data_real_devolucao: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM('EM_ABERTO', 'DEVOLVIDO', 'ATRASADO'),
				defaultValue: 'EM_ABERTO',
			},
		},
		{
			timestamps: true,
			tableName: 'emprestimos',
		}
	);

	return Emprestimo;
};
