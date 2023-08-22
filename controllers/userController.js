User = require('../models/User');


// obtener usuarios
const getUsers = async(req, res) => {
    try {
        const users= await User.find();
        return res.status(200).send(users);
    }catch (error) {
        return res.status(400).send({ error: 'Error al obtener usuarios' });
    }
}
// eliminar usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if(user.deleteCount ===0){
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        return res.status(200).send(user);

    }catch (error) {
        return res.status(400).send({ error: 'Error al eliminar usuario' });
    }
}
// obtener un usuario
const getUser = async (req, res) => {
    const { id } = req.params;
   try {
    const user = await User.findById(id).populate('experimentos');
    if(!user){
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    return res.status(200).send(user);

   }catch (error) {
         return res.status(400).send({ error: 'Error al obtener usuario' });
    }
}
// actualizar usuario
const updateUser = async(req, res) => {
   try {
    const { id } = req.params;
    const { nombre, apellido, rut, mail, } = req.body;
    const user = await User.findByIdAndUpdate(id, {
         nombre, apellido, rut, mail 
        }, { new: true });
    if(!user){
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    return res.status(200).send(user);

    }catch (error) {
        return res.status(400).send({ error: 'Error al actualizar usuario' });
    }
}

module.exports = {
    getUsers,
    deleteUser,
    getUser,
    updateUser
}
