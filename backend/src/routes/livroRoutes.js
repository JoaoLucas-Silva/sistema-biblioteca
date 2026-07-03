const express = require('express');
const livroController = require('../controllers/livroController');
const { verificarToken, verificarPerfil } = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/', verificarToken, livroController.listar);
router.get('/:id', verificarToken, livroController.buscarPorId);
router.post('/', verificarToken, verificarPerfil(['ADMIN', 'BIBLIOTECARIO']), uploadMiddleware.single('capa'), livroController.criar);
router.put('/:id', verificarToken, verificarPerfil(['ADMIN', 'BIBLIOTECARIO']), livroController.atualizar);
router.delete('/:id', verificarToken, verificarPerfil(['ADMIN']), livroController.deletar);

module.exports = router;
