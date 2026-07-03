import api from './api';

export async function getLeitores(filtros = {}) {
	const response = await api.get('/leitores', { params: filtros });
	return response.data;
}

export async function criarLeitor(dados) {
	const response = await api.post('/leitores', dados);
	return response.data;
}

export async function atualizarLeitor(id, dados) {
	const response = await api.put(`/leitores/${id}`, dados);
	return response.data;
}

export async function excluirLeitor(id) {
	const response = await api.delete(`/leitores/${id}`);
	return response.data;
}