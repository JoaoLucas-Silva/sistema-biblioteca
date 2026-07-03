import api from './api';

export async function getEmprestimos() {
	const response = await api.get('/emprestimos');
	return response.data;
}

export async function realizarEmprestimo(dados) {
	const response = await api.post('/emprestimos', dados);
	return response.data;
}

export async function devolverEmprestimo(id) {
	const response = await api.put(`/emprestimos/${id}/devolucao`);
	return response.data;
}