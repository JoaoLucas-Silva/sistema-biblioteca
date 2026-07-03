const leitorService = require('../services/leitorService');

async function criar(req, res) {
	try {
		const leitor = await leitorService.criarLeitor(req.body);
		return res.status(201).json(leitor);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function listar(req, res) {
	try {
		const { nome, cpf_ra } = req.query;
		const leitores = await leitorService.listarLeitores({ nome, cpf_ra });
		return res.status(200).json(leitores);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function buscarPorId(req, res) {
	try {
		const leitor = await leitorService.buscarPorId(req.params.id);
		return res.status(200).json(leitor);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
}

async function atualizar(req, res) {
	try {
		const leitor = await leitorService.atualizarLeitor(req.params.id, req.body);
		return res.status(200).json(leitor);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function deletar(req, res) {
	try {
		await leitorService.deletarLeitor(req.params.id);
		return res.status(204).send();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	criar,
	listar,
	buscarPorId,
	atualizar,
	deletar,
};
