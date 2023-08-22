import User from '../models/User';
import { connectToDatabase } from '../utils/bd';

const register = async (req, res) => {
    await connectToDatabase();
    const { nombre, apellido, rut, email, password } = req.body;
    try {
        if (!nombre || !email || !password || !apellido || !rut) {
            return res.status(400).send({ error: 'Nombre, email y contraseña requeridos' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ error: 'El usuario ya existe' });
        }
        const newUser = new User({ nombre,apellido,rut, email, password});
        const savedUser = await newUser.save();
        return res.status(200).send(savedUser);
    } catch (error) {
        return res.status(400).send({ error: 'Error al registrar usuario' });
    }
};



module.exports = {
    register,
};