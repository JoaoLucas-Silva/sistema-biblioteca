const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { sequelize, Usuario, Leitor } = require('../models');

async function criarLeitor(dados) { 
    const transacao = await sequelize.transaction(); 
    try { 
        const senhaDoUsuario = dados.senha || dados.cpf_ra;
        
        const senhaCriptografada = await bcrypt.hash(senhaDoUsuario, 10); 
        
        const usuario = await Usuario.create( { 
            email: dados.email, 
            senha: senhaCriptografada, 
            perfil: 'LEITOR', 
        }, { transaction: transacao } ); 
        
        const leitor = await Leitor.create( { 
            usuario_id: usuario.id, 
            nome: dados.nome, 
            cpf_ra: dados.cpf_ra, 
            telefone: dados.telefone, 
            endereco: dados.endereco || 'Não informado',
        }, { transaction: transacao } ); 
        
        await transacao.commit(); 
        return leitor; 
    } catch (error) { 
        await transacao.rollback(); 
        throw error; 
    } 
}

async function listarLeitores(filtros = {}) {
	const where = {};

	if (filtros.nome) {
		where.nome = { [Op.iLike]: `%${filtros.nome}%` };
	}

	if (filtros.cpf_ra) {
		where.cpf_ra = filtros.cpf_ra;
	}

	return Leitor.findAll({
		where,
		include: [Usuario],
	});
}

async function buscarPorId(id) {
	return Leitor.findByPk(id, {
		include: [Usuario],
	});
}

async function atualizarLeitor(id, dados) {
	const leitor = await Leitor.findByPk(id);

	if (!leitor) {
		throw new Error('Leitor não encontrado.');
	}

	await leitor.update(dados);

	return leitor;
}

async function deletarLeitor(id) {
	const transacao = await sequelize.transaction();

	try {
		const leitor = await Leitor.findByPk(id, { transaction: transacao });

		if (!leitor) {
			throw new Error('Leitor não encontrado.');
		}

		const usuario = await Usuario.findByPk(leitor.usuario_id, {
			transaction: transacao,
		});

		await leitor.destroy({ transaction: transacao });

		if (usuario) {
			await usuario.destroy({ transaction: transacao });
		}

		await transacao.commit();
	} catch (error) {
		await transacao.rollback();
		throw error;
	}
}

module.exports = {
	criarLeitor,
	listarLeitores,
	buscarPorId,
	atualizarLeitor,
	deletarLeitor,
};
