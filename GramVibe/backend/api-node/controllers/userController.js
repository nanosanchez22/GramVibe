const User = require('../models/User');


const getUserProfile = async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id).select('-password'); // Excluir la contraseña
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Devolver los datos del usuario
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = {
    getUserProfile,
};
