# Sistema de Gerenciamento de Biblioteca

Sistema full-stack desenvolvido para o gerenciamento de rotinas de uma biblioteca. A aplicacao permite o controle completo de livros, leitores e o rastreamento do ciclo de vida de emprestimos, incluindo painel de metricas e notificacoes visuais.

---

## Arquitetura do Projeto

O projeto foi estruturado utilizando o padrao **Monorepo**, isolando as responsabilidades do cliente (Frontend) e do servidor (Backend) em ambientes independentes, mas contidos no mesmo repositorio, facilitando o desenvolvimento e a orquestracao local.

- **Frontend:** Single Page Application (SPA) desenvolvida em React utilizando Vite.
- **Backend:** API RESTful desenvolvida em Node.js com Express.
- **Banco de Dados:** PostgreSQL rodando em container Docker.

---

## Funcionalidades Principais

* **Dashboard de Metricas:** Painel inicial com indicadores em tempo real de total de livros, leitores, emprestimos ativos e destaque visual para emprestimos atrasados.
* **Gestao de Livros:** CRUD completo com suporte a upload de imagem de capa e busca parametrizada por titulo ou categoria.
* **Gestao de Leitores:** CRUD completo de usuarios da biblioteca, validacao de dados e filtros de busca por nome ou documento (CPF/RA).
* **Gestao de Emprestimos:** Criacao e encerramento de emprestimos, com calculo automatico de status (Em Aberto, Devolvido, Atrasado).
* **Seguranca e Autenticacao:** Rotas da API e telas do painel protegidas por autenticacao via token (JWT).
* **Notificacoes (Toast):** Feedback visual em tempo real para acoes de sucesso ou erro (React Toastify).

---

## Tecnologias Utilizadas

### Backend
* Node.js
* Express
* Sequelize
* PostgreSQL
* JsonWebToken (JWT)
* Multer (Manipulacao de arquivos/uploads)
* Cors & Dotenv

### Frontend
* React.js
* Vite
* React Router DOM
* Axios
* React Toastify

### Infraestrutura
* Docker
* Docker Compose
