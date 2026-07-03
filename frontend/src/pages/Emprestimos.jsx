import { useEffect, useState } from 'react';
import { devolverEmprestimo, getEmprestimos, realizarEmprestimo } from '../services/emprestimoService';
import { getLeitores } from '../services/leitorService';
import { getLivros } from '../services/livroService';

export default function Emprestimos() {
	const [emprestimos, setEmprestimos] = useState([]);
	const [livros, setLivros] = useState([]);
	const [leitores, setLeitores] = useState([]);
	const [leitorSelecionado, setLeitorSelecionado] = useState('');
	const [livroSelecionado, setLivroSelecionado] = useState('');

	async function carregarDados() {
		const [emprestimosData, livrosData, leitoresData] = await Promise.all([
			getEmprestimos(),
			getLivros(),
			getLeitores(),
		]);

		setEmprestimos(emprestimosData);
		setLivros(livrosData);
		setLeitores(leitoresData);
	}

	useEffect(() => {
		carregarDados();
	}, []);

	async function handleEmprestar(event) {
		event.preventDefault();

		await realizarEmprestimo({
			leitor_id: leitorSelecionado,
			livros_ids: [livroSelecionado],
		});

		await Promise.all([getEmprestimos(), getLivros()]).then(([emprestimosData, livrosData]) => {
			setEmprestimos(emprestimosData);
			setLivros(livrosData);
		});

		setLeitorSelecionado('');
		setLivroSelecionado('');
	}

	async function handleDevolver(id) {
		await devolverEmprestimo(id);
		await Promise.all([getEmprestimos(), getLivros()]).then(([emprestimosData, livrosData]) => {
			setEmprestimos(emprestimosData);
			setLivros(livrosData);
		});
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<section>
				<h1>Empréstimos</h1>
				<form onSubmit={handleEmprestar} style={{ display: 'grid', gap: '12px', maxWidth: '520px', marginTop: '16px' }}>
					<select
						value={leitorSelecionado}
						onChange={(event) => setLeitorSelecionado(event.target.value)}
						style={{ padding: '8px' }}
					>
						<option value="">Selecione um leitor</option>
						{leitores.map((leitor) => (
							<option key={leitor.id} value={leitor.id}>
								{leitor.nome}
							</option>
						))}
					</select>

					<select
						value={livroSelecionado}
						onChange={(event) => setLivroSelecionado(event.target.value)}
						style={{ padding: '8px' }}
					>
						<option value="">Selecione um livro</option>
						{livros.map((livro) => (
							<option key={livro.id} value={livro.id}>
								{livro.titulo}
							</option>
						))}
					</select>

					<button type="submit" style={{ padding: '10px 12px', width: 'fit-content' }}>
						Realizar empréstimo
					</button>
				</form>
			</section>

			<section>
				<table style={{ width: '100%', borderCollapse: 'collapse' }}>
					<thead>
						<tr>
							<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Leitor</th>
							<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Livros</th>
							<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Data prevista</th>
							<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Status</th>
							<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{emprestimos.map((emprestimo) => {
							const livrosEmprestimo = emprestimo.Livros || [];

							return (
								<tr key={emprestimo.id}>
									<td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{emprestimo.Leitor?.nome}</td>
									<td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>
										{livrosEmprestimo.map((livro) => livro.titulo).join(', ')}
									</td>
									<td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>
										{emprestimo.data_prevista_devolucao ? new Date(emprestimo.data_prevista_devolucao).toLocaleDateString('pt-BR') : '-'}
									</td>
									<td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{emprestimo.status}</td>
									<td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>
										{(emprestimo.status === 'EM_ABERTO' || emprestimo.status === 'ATRASADO') && (
											<button type="button" onClick={() => handleDevolver(emprestimo.id)}>
												Devolver
											</button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</div>
	);
}