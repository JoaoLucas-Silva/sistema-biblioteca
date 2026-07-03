import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { criarLivro, getLivros } from '../services/livroService';

const initialFormData = {
    titulo: '',
    autor: '',
    categoria: '',
    isbn: '',
    quantidade_total: '',
};

export default function Livros() {
    const [livros, setLivros] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [capa, setCapa] = useState(null); // Novo estado para o arquivo
    const [filtrosBusca, setFiltrosBusca] = useState({
        titulo: '',
        categoria: '',
    });

    async function carregarLivros(filtrosAplicados) {
        try {
            const dados = await getLivros(filtrosAplicados);
            setLivros(dados);
        } catch (error) {
            console.error("Detalhes do erro:", error);
            toast.error('Erro ao buscar a lista de livros.');
        }
    }

    useEffect(() => {
        async function fetchInicial() {
            try {
                const dados = await getLivros({ titulo: '', categoria: '' });
                setLivros(dados);
            } catch (error) {
                console.error("Detalhes do erro:", error);
                toast.error('Erro ao conectar com o servidor.');
            }
        }
        
        fetchInicial();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    }

    function handleFiltroChange(event) {
        const { name, value } = event.target;
        setFiltrosBusca((currentFiltros) => ({
            ...currentFiltros,
            [name]: value,
        }));
    }

    async function handleCriar(event) {
        event.preventDefault();

        try {
            // Para enviar arquivos, substituímos o JSON tradicional pelo FormData
            const formDataEnvio = new FormData();
            formDataEnvio.append('titulo', formData.titulo);
            formDataEnvio.append('autor', formData.autor);
            formDataEnvio.append('categoria', formData.categoria);
            formDataEnvio.append('isbn', formData.isbn);
            formDataEnvio.append('quantidade_total', Number(formData.quantidade_total));
            
            // Se o usuário selecionou uma imagem, anexa ao envio
            if (capa) {
                formDataEnvio.append('capa', capa);
            }

            // O axios automaticamente entende o FormData e ajusta os headers da requisição
            await criarLivro(formDataEnvio);
            await carregarLivros(filtrosBusca);
            
            toast.success('Livro cadastrado com sucesso!');

            setFormData(initialFormData);
            setCapa(null); // Limpa o arquivo após o envio
            
            // Reseta o valor visual do input de arquivo
            document.getElementById('input-capa').value = '';
        } catch (error) {
            console.error("Detalhes do erro:", error);
            toast.error('Erro ao cadastrar o livro. Verifique os dados.');
        }
    }

    async function handleBuscar() {
        await carregarLivros(filtrosBusca);
    }

    async function handleLimpar() {
        setFiltrosBusca({
            titulo: '',
            categoria: '',
        });
        await carregarLivros({ titulo: '', categoria: '' });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <section>
                <h1>Livros</h1>
                <form
                    onSubmit={handleCriar}
                    style={{ display: 'grid', gap: '12px', maxWidth: '520px', marginTop: '16px' }}
                >
                    <input name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} style={{ padding: '8px' }} required />
                    <input name="autor" placeholder="Autor" value={formData.autor} onChange={handleChange} style={{ padding: '8px' }} required />
                    <input name="categoria" placeholder="Categoria" value={formData.categoria} onChange={handleChange} style={{ padding: '8px' }} required />
                    <input name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} style={{ padding: '8px' }} required />
                    <input name="quantidade_total" type="number" placeholder="Quantidade total" value={formData.quantidade_total} onChange={handleChange} style={{ padding: '8px' }} required />
                    
                    {/* Campo de Upload mantido perfeitamente */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label htmlFor="input-capa" style={{ fontSize: '0.9rem', color: '#555' }}>Capa do Livro (Opcional)</label>
                        <input 
                            id="input-capa"
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setCapa(e.target.files[0])} 
                            style={{ padding: '4px' }}
                        />
                    </div>

                    <button type="submit" style={{ padding: '10px 12px', width: 'fit-content', marginTop: '8px' }}>
                        Adicionar livro
                    </button>
                </form>
            </section>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'end', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="filtro-titulo">Título</label>
                    <input id="filtro-titulo" name="titulo" type="text" value={filtrosBusca.titulo} onChange={handleFiltroChange} style={{ padding: '8px', minWidth: '220px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="filtro-categoria">Categoria</label>
                    <input id="filtro-categoria" name="categoria" type="text" value={filtrosBusca.categoria} onChange={handleFiltroChange} style={{ padding: '8px', minWidth: '220px' }} />
                </div>
                <button type="button" onClick={handleBuscar} style={{ padding: '10px 12px' }}>Buscar</button>
                <button type="button" onClick={handleLimpar} style={{ padding: '10px 12px' }}>Limpar</button>
            </div>

            <section>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center', borderBottom: '1px solid #ddd', padding: '8px', width: '80px' }}>Capa</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Título</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Autor</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Categoria</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>ISBN</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Quantidade</th>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <tr key={livro.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                                    {livro.capa_url ? (
                                        <img 
                                            src={`http://localhost:3000/uploads/${livro.capa_url}`} 
                                            alt={`Capa de ${livro.titulo}`} 
                                            style={{ width: '50px', height: '70px', objectFit: 'cover', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                        />
                                    ) : (
                                        <div style={{ width: '50px', height: '70px', backgroundColor: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#999', margin: '0 auto' }}>
                                            Sem foto
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{livro.titulo}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{livro.autor}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{livro.categoria}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{livro.isbn}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{livro.quantidade_total}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{livro.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}