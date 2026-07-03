import api from './api';

export async function getLivros(filtros = {}) {
	const response = await api.get('/livros', { params: filtros });
	return response.data;
}

export async function criarLivro(dados) {
	const response = await api.post('/livros', dados);
	return response.data;
}

export async function atualizarLivro(id, dados) {
	const response = await api.put(`/livros/${id}`, dados);
	return response.data;
}

export async function excluirLivro(id) {
	const response = await api.delete(`/livros/${id}`);
	return response.data;
}