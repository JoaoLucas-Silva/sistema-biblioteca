const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken, verificarPerfil } = require('../middlewares/authMiddleware');

// Rota protegida: Apenas o Administrador pode cadastrar funcionários
router.post('/', verificarToken, verificarPerfil(['ADMIN']), usuarioController.criar);

module.exports = router;