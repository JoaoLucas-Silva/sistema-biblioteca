const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

async function criarUsuario(dados) {
    const { email, senha, perfil } = dados;

    // Verifica se o e-mail já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
        throw new Error('Já existe um usuário cadastrado com este e-mail.');
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Cria o usuário
    const usuario = await Usuario.create({
        email,
        senha: senhaHash,
        perfil
    });

    // Remove a senha do objeto de retorno por segurança
    const usuarioRetorno = usuario.toJSON();
    delete usuarioRetorno.senha;

    return usuarioRetorno;
}

module.exports = {
    criarUsuario
};