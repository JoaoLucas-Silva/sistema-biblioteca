const express = require('express');
const leitorController = require('../controllers/leitorController');
const { verificarToken, verificarPerfil } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, verificarPerfil(['ADMIN', 'BIBLIOTECARIO']), leitorController.listar);
router.get('/:id', verificarToken, verificarPerfil(['ADMIN', 'BIBLIOTECARIO']), leitorController.buscarPorId);
router.post('/', verificarToken, verificarPerfil(['ADMIN', 'BIBLIOTECARIO']), leitorController.criar);
router.put('/:id', verificarToken, verificarPerfil(['ADMIN', 'BIBLIOTECARIO']), leitorController.atualizar);
router.delete('/:id', verificarToken, verificarPerfil(['ADMIN']), leitorController.deletar);

module.exports = router;