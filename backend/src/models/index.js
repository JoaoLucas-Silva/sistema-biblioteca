const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Usuario = require('./Usuario')(sequelize, DataTypes);
const Leitor = require('./Leitor')(sequelize, DataTypes);
const Livro = require('./Livro')(sequelize, DataTypes);
const Emprestimo = require('./Emprestimo')(sequelize, DataTypes);

Usuario.hasOne(Leitor, { foreignKey: 'usuario_id' });
Leitor.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Leitor.hasMany(Emprestimo, { foreignKey: 'leitor_id' });
Emprestimo.belongsTo(Leitor, { foreignKey: 'leitor_id' });

Emprestimo.belongsToMany(Livro, {
	through: 'emprestimos_livros',
	foreignKey: 'emprestimo_id',
});

Livro.belongsToMany(Emprestimo, {
	through: 'emprestimos_livros',
	foreignKey: 'livro_id',
});

module.exports = {
	sequelize,
	Usuario,
	Leitor,
	Livro,
	Emprestimo,
};
