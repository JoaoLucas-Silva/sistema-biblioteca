const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

async function criarAdminPadrao() {
	const adminExistente = await Usuario.findOne({
		where: {
			email: 'admin@biblioteca.com',
		},
	});

	if (adminExistente) {
		return adminExistente;
	}

	const senhaCriptografada = await bcrypt.hash('admin123', 10);

	return Usuario.create({
		email: 'admin@biblioteca.com',
		senha: senhaCriptografada,
		perfil: 'ADMIN',
	});
}

module.exports = {
	criarAdminPadrao,
};
