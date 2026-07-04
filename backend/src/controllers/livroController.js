const livroService = require('../services/livroService');

async function criar(req, res) {
	try {
		const dadosLivro = {
			...req.body,
			capa_url: req.file ? req.file.filename : req.body.capa_url,
		};

		const livro = await livroService.criarLivro(dadosLivro);
		return res.status(201).json(livro);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function listar(req, res) {
	try {
		const { titulo, autor, categoria, isbn, status } = req.query;
		const livros = await livroService.listarLivros({ titulo, autor, categoria, isbn, status });
		return res.status(200).json(livros);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function buscarPorId(req, res) {
	try {
		const livro = await livroService.buscarPorId(req.params.id);
		return res.status(200).json(livro);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
}

async function atualizar(req, res) {
	try {
		const livro = await livroService.atualizarLivro(req.params.id, req.body);
		return res.status(200).json(livro);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function deletar(req, res) {
	try {
    	const id = req.params.id; // Pega o ID que vem na URL
        await livroService.deletarLivro(id); // Chama aquele serviço que já existe
        
        return res.status(200).json({ message: 'Livro excluído com sucesso.' });
    }catch (error) {
        return res.status(500).json({ message: error.message || 'Erro ao excluir o livro.' });
    }
}

module.exports = {
	criar,
	listar,
	buscarPorId,
	atualizar,
	deletar,
};
