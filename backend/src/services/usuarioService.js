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
async function criarUsuarioStaff(dados){
    const perfisPermitidos =['ADMIN', 'BIBLIOTECARIO'];
    if(!perfisPermitidos.includes(dados.perfil)){
        throw new Error('Perfil inválido. Escolha ADMIN ou BIBLIOTECARIO');
    }
    
    const usuarioExistente = await Usuario.findOne({where:{email:dados.email}});
    if (usuarioExistente){
        throw new Error ('Já existe um usuário cadastrado com este e-mail');
    }
    const senhaDoUsuario = dados.senha || 'mudar123';
    const senhaCriptografada = await bcrypt.hash(senhaDoUsuario, 10);

    const usuario = await Usuario.create({
        email: dados.email,
        senha: senhaCriptografada,
        perfil: dados.perfil,
    });

    return{
        id: usuario.id,
        email: usuario.email,
        perfil: usuario.perfil
    };
}

async function listarUsuarios() {
    // Busca todos os usuários, mas ESCONDE a senha por segurança
    return await Usuario.findAll({
        attributes: ['id', 'email', 'perfil'],
        order: [['email', 'ASC']]
    });
}

async function atualizarUsuario(id, dados) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado.');
    if (dados.senha && dados.senha.trim() !== '') {
        dados.senha = await bcrypt.hash(dados.senha, 10);
    } else {
        delete dados.senha; 
    }

    await usuario.update(dados);
    return usuario;
}

async function deletarUsuario(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado.');
    await usuario.destroy();
}

module.exports = {
    criarUsuario,
    criarUsuarioStaff,
    listarUsuarios,
    deletarUsuario,
    atualizarUsuario
};