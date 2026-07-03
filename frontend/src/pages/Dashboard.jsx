import { useEffect, useState } from 'react';
import { getEmprestimos } from '../services/emprestimoService';
import { getLeitores } from '../services/leitorService';
import { getLivros } from '../services/livroService';

export default function Dashboard() {
    const [totalLivros, setTotalLivros] = useState(0);
    const [totalLeitores, setTotalLeitores] = useState(0);
    const [emprestimosAtivos, setEmprestimosAtivos] = useState(0);
    const [emprestimosAtrasados, setEmprestimosAtrasados] = useState(0);

    useEffect(() => {
        async function carregarMetricas() {
            const [livros, leitores, emprestimos] = await Promise.all([
                getLivros(),
                getLeitores(),
                getEmprestimos(),
            ]);

            setTotalLivros(livros.length);
            setTotalLeitores(leitores.length);
            setEmprestimosAtivos(emprestimos.filter((emprestimo) => emprestimo.status === 'EM_ABERTO').length);
            setEmprestimosAtrasados(emprestimos.filter((emprestimo) => emprestimo.status === 'ATRASADO').length);
        }

        carregarMetricas();
    }, []);

    const cards = [
        {
            titulo: 'Total de livros',
            valor: totalLivros,
            fundo: '#ffffff',
        },
        {
            titulo: 'Total de leitores',
            valor: totalLeitores,
            fundo: '#ffffff',
        },
        {
            titulo: 'Empréstimos ativos',
            valor: emprestimosAtivos,
            fundo: '#ffffff',
        },
        {
            titulo: 'Empréstimos atrasados',
            valor: emprestimosAtrasados,
            fundo: '#fff0f0',
            cor: '#b91c1c',
        },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h1 style={{ lineHeight: '1.2', fontSize: '2.5rem', marginBottom: '8px' }}>
                    Bem-vindo ao painel da biblioteca
                </h1>
                <p style={{ opacity: 0.8 }}>
                    Acompanhe os principais números do sistema em um só lugar.
                </p>
            </header>

            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                }}
            >
                {cards.map((card) => (
                    <div
                        key={card.titulo}
                        style={{
                            background: card.fundo,
                            padding: '20px',
                            borderRadius: '14px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                            border: '1px solid #eee',
                            color: card.cor || '#111827',
                        }}
                    >
                        <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.8 }}>{card.titulo}</p>
                        <strong style={{ display: 'block', marginTop: '10px', fontSize: '2.25rem', lineHeight: 1 }}>
                            {card.valor}
                        </strong>
                    </div>
                ))}
            </section>
        </div>
    );
}