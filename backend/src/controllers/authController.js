const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

async function login(req, res) {
	const { email, senha } = req.body;

	const usuario = await Usuario.findOne({
		where: {
			email,
		},
	});

	if (!usuario) {
		return res.status(404).json({ message: 'Usuário não encontrado.' });
	}

	const senhaValida = await bcrypt.compare(senha, usuario.senha);

	if (!senhaValida) {
		return res.status(401).json({ message: 'Senha inválida.' });
	}

	const token = jwt.sign(
		{
			id: usuario.id,
			perfil: usuario.perfil,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '1d',
		}
	);

	return res.status(200).json({
		token,
		usuario: {
			id: usuario.id,
			email: usuario.email,
			perfil: usuario.perfil,
		},
	});
}

module.exports = {
	login,
};