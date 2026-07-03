const { Op } = require('sequelize');
const { Livro } = require('../models');

async function criarLivro(dados) {
	dados.quantidade_disponivel = dados.quantidade_total;
	return Livro.create(dados);
}

async function listarLivros(filtros = {}) {
	const where = {};

	if (filtros.titulo) {
		where.titulo = { [Op.iLike]: `%${filtros.titulo}%` };
	}

	if (filtros.autor) {
		where.autor = { [Op.iLike]: `%${filtros.autor}%` };
	}

	if (filtros.categoria) {
		where.categoria = { [Op.iLike]: `%${filtros.categoria}%` };
	}

	if (filtros.isbn) {
		where.isbn = filtros.isbn;
	}

	if (filtros.status) {
		where.status = filtros.status;
	}

	return Livro.findAll({
		where,
	});
}

async function buscarPorId(id) {
	const livro = await Livro.findByPk(id);

	if (!livro) {
		throw new Error('Livro não encontrado.');
	}

	return livro;
}

async function atualizarLivro(id, dados) {
	const livro = await buscarPorId(id);
	await livro.update(dados);

	return livro;
}

async function deletarLivro(id) {
	const livro = await buscarPorId(id);
	await livro.destroy();
}

module.exports = {
	criarLivro,
	listarLivros,
	buscarPorId,
	atualizarLivro,
	deletarLivro,
};
