const emprestimoService = require('../services/emprestimoService');

async function emprestar(req, res) {
	try {
		const { leitor_id, livros_ids } = req.body;
		const emprestimo = await emprestimoService.realizarEmprestimo(leitor_id, livros_ids);
		return res.status(201).json(emprestimo);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function devolver(req, res) {
	try {
		const emprestimo = await emprestimoService.devolverEmprestimo(req.params.id);
		return res.status(200).json({
			message: 'Empréstimo devolvido com sucesso.',
			emprestimo,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function listar(req, res) {
	try {
		const { status, data_emprestimo, leitor_id } = req.query;
		const emprestimos = await emprestimoService.listarEmprestimos({
			status,
			data_emprestimo,
			leitor_id,
		});
		return res.status(200).json(emprestimos);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	emprestar,
	devolver,
	listar,
};