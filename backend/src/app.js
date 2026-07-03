require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/database');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const { criarAdminPadrao } = require('./utils/seed');
const livroRoutes = require('./routes/livroRoutes');
const leitorRoutes = require('./routes/leitorRoutes');
const emprestimoRoutes = require('./routes/emprestimoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Vamos criar este arquivo já já

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/livros', livroRoutes);
app.use('/api/leitores', leitorRoutes);
app.use('/api/emprestimos', emprestimoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Servidor funcionando com sucesso.',
    });
});

const port = process.env.PORT;

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Tabelas sincronizadas com o banco de dados.');
    
    await criarAdminPadrao();
    console.log('Seed de administrador verificado/executado.');
  })
  .catch((erro) => {
    console.error('Erro ao sincronizar tabelas:', erro);
  });

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});