import { useEffect, useState } from 'react';
import { criarLeitor, excluirLeitor, getLeitores } from '../services/leitorService';

const initialFormData = {
    nome: '',
    email: '',
    cpf_ra: '',
    telefone: '',
};

export default function Leitores() {
    const [leitores, setLeitores] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [filtrosBusca, setFiltrosBusca] = useState({
        nome: '',
        cpf_ra: '',
    });

    async function carregarLeitores(filtrosAplicados) {
        const dados = await getLeitores(filtrosAplicados);
        setLeitores(dados);
    }

    useEffect(() => {
        async function fetchInicial() {
            const dados = await getLeitores({ nome: '', cpf_ra: '' });
            setLeitores(dados);
        }
        fetchInicial();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    }

    function handleFiltroChange(event) {
        const { name, value } = event.target;
        setFiltrosBusca((current) => ({ ...current, [name]: value }));
    }

    async function handleCriar(event) {
        event.preventDefault();
        await criarLeitor(formData);
        await carregarLeitores(filtrosBusca);
        setFormData(initialFormData);
    }

    async function handleExcluir(id) {
        if (window.confirm('Tem certeza que deseja excluir este leitor?')) {
            await excluirLeitor(id);
            await carregarLeitores(filtrosBusca);
        }
    }

    async function handleBuscar() {
        await carregarLeitores(filtrosBusca);
    }

    async function handleLimpar() {
        setFiltrosBusca({ nome: '', cpf_ra: '' });
        await carregarLeitores({ nome: '', cpf_ra: '' });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <section>
                <h1>Leitores</h1>
                <form onSubmit={handleCriar} style={{ display: 'grid', gap: '12px', maxWidth: '520px', marginTop: '16px' }}>
                    <input name="nome" placeholder="Nome completo" value={formData.nome} onChange={handleChange} style={{ padding: '8px' }} required />
                    <input name="email" type="email" placeholder="E-mail" value={formData.email} onChange={handleChange} style={{ padding: '8px' }} required />
                    <input name="cpf_ra" placeholder="CPF ou RA" value={formData.cpf_ra} onChange={handleChange} style={{ padding: '8px' }} required />
                    <input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} style={{ padding: '8px' }} />
                    <button type="submit" style={{ padding: '10px 12px', width: 'fit-content' }}>Cadastrar leitor</button>
                </form>
            </section>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'end', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="filtro-nome">Nome</label>
                    <input id="filtro-nome" name="nome" value={filtrosBusca.nome} onChange={handleFiltroChange} style={{ padding: '8px', minWidth: '220px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="filtro-cpf">CPF/RA</label>
                    <input id="filtro-cpf" name="cpf_ra" value={filtrosBusca.cpf_ra} onChange={handleFiltroChange} style={{ padding: '8px', minWidth: '220px' }} />
                </div>
                <button type="button" onClick={handleBuscar} style={{ padding: '10px 12px' }}>Buscar</button>
                <button type="button" onClick={handleLimpar} style={{ padding: '10px 12px' }}>Limpar</button>
            </div>

            <section>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Nome</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>E-mail</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>CPF/RA</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Telefone</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leitores.map((leitor) => (
                            <tr key={leitor.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{leitor.nome}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{leitor.email}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{leitor.cpf_ra}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{leitor.telefone}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>
                                    <button onClick={() => handleExcluir(leitor.id)} style={{ color: 'red', cursor: 'pointer' }}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}