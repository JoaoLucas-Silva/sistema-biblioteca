function apenasAdmin(req, res, next) {
    // O seu middleware de autenticação (JWT) que roda antes desse
    // provavelmente salva os dados do token dentro de req.usuario ou req.user.
    // Vamos checar se o perfil dele é de administrador:
    
    const perfilDoUsuario = req.usuario?.perfil || req.user?.perfil;

    if (perfilDoUsuario !== 'ADMIN') {
        return res.status(403).json({ 
            message: 'Acesso negado. Apenas administradores podem realizar esta ação.' 
        });
    }

    // Se ele for ADMIN, o next() libera a passagem para o Controller
    next();
}

module.exports = {
    apenasAdmin
};