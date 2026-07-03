const usuarioService = require('../services/usuarioService');

async function criar(req, res) {
    try {
        // O corpo da requisição deve conter email, senha e perfil (ADMIN ou BIBLIOTECARIO)
        const novoUsuario = await usuarioService.criarUsuario(req.body);
        return res.status(201).json(novoUsuario);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    criar
};