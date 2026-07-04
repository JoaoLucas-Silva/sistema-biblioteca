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
async function criarStaff(req, res) {
    try {
        const novoUsuario = await usuarioService.criarUsuarioStaff(req.body);
        return res.status(201).json({
            message: 'Membro da equipe criado com sucesso!',
            usuario: novoUsuario
        });
    } catch (error) {
        // Retorna status 400 (Bad Request) se der erro de validação
        return res.status(400).json({ message: error.message });
    }
}
async function listar(req, res) {
    try {
        const usuarios = await usuarioService.listarUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar a equipe.' });
    }
}

async function atualizar(req, res) {
    try {
        const id = req.params.id;
        const usuarioAtualizado = await usuarioService.atualizarUsuario(id, req.body);
        return res.status(200).json({ message: 'Usuário atualizado com sucesso!', usuario: usuarioAtualizado });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

async function deletar(req, res) {
    try {
        const id = req.params.id;
        await usuarioService.deletarUsuario(id);
        return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    criar,
    criarStaff,
    listar,
    atualizar,
    deletar
};