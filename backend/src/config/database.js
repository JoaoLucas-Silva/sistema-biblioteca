require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres',
	}
);

async function authenticateConnection() {
	try {
		await sequelize.authenticate();
		console.log('Conexão com PostgreSQL estabelecida com sucesso.');
	} catch (error) {
		console.error('Erro ao conectar ao PostgreSQL:', error);
	}
}

authenticateConnection();

module.exports = sequelize;
