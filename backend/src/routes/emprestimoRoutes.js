const express = require('express');
const emprestimoController = require('../controllers/emprestimoController');
const { verificarToken, verificarPerfil } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verificarToken, verificarPerfil(['ADMIN', 'BIBLIOTECARIO']), emprestimoController.emprestar);
router.put('/:id/devolucao', verificarToken, verificarPerfil(['ADMIN', 'BIBLIOTECARIO']), emprestimoController.devolver);
router.get('/', verificarToken, emprestimoController.listar);

module.exports = router;