const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
	const authorization = req.headers.authorization;

	if (!authorization) {
		return res.status(401).json({ message: 'Token não informado.' });
	}

	const partes = authorization.split(' ');
	const token = partes[1];

	if (partes[0] !== 'Bearer' || !token) {
		return res.status(401).json({ message: 'Token inválido.' });
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.usuario = payload;
		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Token inválido ou expirado.' });
	}
}

function verificarPerfil(perfisPermitidos) {
	return (req, res, next) => {
		if (!req.usuario || !perfisPermitidos.includes(req.usuario.perfil)) {
			return res.status(403).json({ message: 'Acesso negado.' });
		}

		return next();
	};
}

module.exports = {
	verificarToken,
	verificarPerfil,
};