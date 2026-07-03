const { Op } = require('sequelize');
const { sequelize, Emprestimo, Livro, Leitor } = require('../models');

async function realizarEmprestimo(leitor_id, livros_ids) {
    const transacao = await sequelize.transaction();

    try {
        // 1. NOVA TRAVA: Buscar o leitor e verificar o status
        const leitor = await Leitor.findByPk(leitor_id, { transaction: transacao });
        
        if (!leitor) {
            throw new Error('Leitor não encontrado.');
        }

        if (leitor.status !== 'ATIVO') {
            throw new Error('Leitor inativo não pode realizar empréstimos.');
        }

        // 2. Continua a lógica original de datas
        const dataEmprestimo = new Date();
        const dataPrevistaDevolucao = new Date(dataEmprestimo);
        dataPrevistaDevolucao.setDate(dataPrevistaDevolucao.getDate() + 7);

        // 3. Cria o empréstimo
        const emprestimo = await Emprestimo.create(
            {
                leitor_id,
                data_emprestimo: dataEmprestimo,
                data_prevista_devolucao: dataPrevistaDevolucao,
                status: 'EM_ABERTO',
            },
            { transaction: transacao }
        );

        // 4. Verifica o estoque de cada livro
        for (const livroId of livros_ids) {
            const livro = await Livro.findByPk(livroId, { transaction: transacao });

            if (!livro) {
                throw new Error(`Livro ID ${livroId} não encontrado.`);
            }

            if (livro.quantidade_disponivel <= 0) {
                throw new Error(`O livro "${livro.titulo}" está indisponível para empréstimo.`);
            }

            livro.quantidade_disponivel -= 1;
            await livro.save({ transaction: transacao });
        }

        // 5. Salva na tabela pivô
        await emprestimo.addLivros(livros_ids, { transaction: transacao });

        await transacao.commit();
        return emprestimo;
    } catch (error) {
        await transacao.rollback();
        throw error;
    }
}

async function devolverEmprestimo(emprestimo_id) {
	const transacao = await sequelize.transaction();

	try {
		const emprestimo = await Emprestimo.findByPk(emprestimo_id, {
			include: [Livro],
			transaction: transacao,
		});

		if (!emprestimo) {
			throw new Error('Empréstimo não encontrado.');
		}

		if (emprestimo.status === 'DEVOLVIDO') {
			throw new Error('Empréstimo já devolvido.');
		}

		emprestimo.status = 'DEVOLVIDO';
		emprestimo.data_real_devolucao = new Date();
		await emprestimo.save({ transaction: transacao });

		const livrosAssociados = emprestimo.Livros || [];

		for (const livro of livrosAssociados) {
			livro.quantidade_disponivel += 1;
			await livro.save({ transaction: transacao });
		}

		await transacao.commit();
		return emprestimo;
	} catch (error) {
		await transacao.rollback();
		throw error;
	}
}

async function listarEmprestimos(filtros = {}) {
    // Atualiza automaticamente para 'ATRASADO' todos os empréstimos que 
    // ainda estão abertos e cuja data prevista já ficou no passado.
    await Emprestimo.update(
        { status: 'ATRASADO' },
        {
            where: {
                status: 'EM_ABERTO',
                data_prevista_devolucao: {
                    [Op.lt]: new Date() // Se for Menor Que a data/hora atual
                }
            }
        }
    );

    const where = {};

    if (filtros.status) {
		where.status = filtros.status;
	}

	if (filtros.data_emprestimo) {
		where.data_emprestimo = filtros.data_emprestimo;
	}

	if (filtros.leitor_id) {
		where.leitor_id = filtros.leitor_id;
	}

    // 2. Retorna a lista completa já com os status corrigidos
    return await Emprestimo.findAll({
        where,
        include: [Leitor, Livro],
    });
}

module.exports = {
	realizarEmprestimo,
	devolverEmprestimo,
	listarEmprestimos,
};