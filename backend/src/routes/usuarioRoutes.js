const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken, verificarPerfil } = require('../middlewares/authMiddleware');

router.post('/', verificarToken, verificarPerfil(['ADMIN']), usuarioController.criar);

router.post('/staff', verificarToken, verificarPerfil(['ADMIN']), usuarioController.criarStaff);

router.get('/', verificarToken, verificarPerfil(['ADMIN']), usuarioController.listar);

router.put('/:id', verificarToken, verificarPerfil(['ADMIN']), usuarioController.atualizar);

router.delete('/:id', verificarToken, verificarPerfil(['ADMIN']), usuarioController.deletar);

module.exports = router;