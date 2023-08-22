
import mongoose from 'mongoose';
import { connectToDatabase } from '../utils/bd';
const User = require('../models/User');
const Experimento = require('../models/Experimento');
const Datos = require('../models/Dato');

// crear experimento y se actualiza el usuario con el experimento creado || OK
const createExperimento =  async(req, res) => {
    await connectToDatabase();
    
    const { idUser } = req.query;
    const { nombre, descripcion, fecha_inicio} = req.body;

    if (!nombre || !descripcion || !fecha_inicio) {
        return res.status(400).send({ error: 'Nombre, descripcion y usuario requeridos' });
    }
    try{
    // se crea el experimetno
    const newExperimento = new Experimento({ nombre, descripcion, fecha_inicio });
    const savedExperimento = await newExperimento.save();
    if (!savedExperimento) {
      return res.status(400).send({ error: 'Error al crear experimento' });
    }
    // se actualiza el usuario con el experimento creado
    const userUpdate = await User.findByIdAndUpdate(
      idUser,
      { $push: { experimentos: savedExperimento._id } },
      { new: true }
    ).exec();
    // se retorna el experimento creado y actualizado el usuario con el experimento creado 
    if (!userUpdate) {
      return res.status(400).send({ error: 'Error al actualizar el usuario' });
    }

    return res.status(200).send(savedExperimento);
    }catch(error){
        return res.status(400).send(error, { error: 'Error al crear experimento'});
    }
}
// obtener experimentos de un usuario || OK
const getExperimentosByUser = async(req, res) => {
    await connectToDatabase();
    const { idUser } = req.query;
    try{
        const user= await User.findById(idUser).populate('experimentos');
        if(user.experimentos.length === 0){
            return res.status(200).send(user.experimentos, { error: 'No se encontraron experimentos' });
        }
        return res.status(200).send(user.experimentos);
    }catch(error){
        return res.status(400).send({ error: 'Error al obtener experimentos' + error});
    }

}
// listar todos los experimentos || OK
const getExperimentos = async (req, res) => {
   try{
        const experimentos= await Experimento.find();
        return res.status(200).send(experimentos);
   }catch(error){
        return res.status(400).send({ error: 'Error al obtener experimentos' });
   }
}
// eliminar experimento || Ok
const deleteExperimento = async(req, res) => {
    const { expId, userId } = req.body;
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        // se elimina el experimento
        const experimento = await Experimento.findByIdAndDelete(expId).session(session);
        if (!experimento) {
        throw new Error('Experimento no encontrado');
        }

        // se elimina el experimento de la lista de experimentos del usuario
        const updatedUser = await User.findByIdAndUpdate(userId,
            { $pull: { experimentos: expId } },
            { new: true, session }
        );
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }

        // se eliminan los datos del experimento
        const deleteDatosResult = await Datos.deleteMany({ experimento: expId }).session(session);
        if (deleteDatosResult.deletedCount === 0) {
            console.log('No se encontraron datos para eliminar');
        }


        // se eliminan los experimentos compartidos con usuarios
        const usuariosActualizados= await User.updateMany({ $pull: { compartidoConmigo: expId } }).session(session);
        if (usuariosActualizados.n === 0) {
            console.log('No se encontraron usuarios para actualizar');
        }
        await session.commitTransaction();
        session.endSession();
        return res.status(200).send(experimento);
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).send({ error: 'Error al eliminar experimento' });
    }
    
}

// cambiar estado de experimento 
const cambiarEstado = async(req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try{
        const experimento = await Experimento.findByIdAndUpdate(id, {estado: estado},
            { new: true });
        if(!experimento){
            return res.status(404).send({ error: 'Experimento no encontrado' });
        }

        return res.status(200).send(experimento);
    }catch(error){
        return res.status(400).send({ error: 'Error al cambiar estado' });
    }

}
// compartir experimento 
const compartirExperimento =async (req, res) => {
    await connectToDatabase();
    const {experimentId , email} = req.body;
    try{
        //me aseguro que el experimento no se comparta con el mismo usuario
        const experimento=await Experimento.findById(experimentId);
        if(experimento.compartidoConusuarios.includes(email)){
            return res.status(400).send({ error: 'El experimento ya se encuentra compartido con este usuario' });
        }
        // me aseguro que el usuario no tenga el experimento compartido
        const listaExperimentos=await User.findOne({email:email});
        if(listaExperimentos.compartidoConmigo.includes(experimentId)){
            return res.status(400).send({ error: 'El experimento ya se encuentra compartido con este usuario' });
        }


       

        //busco el usuario al que se le va a compartir el experimento y lo agrego a la lista de compartido conmigo
       const userCompartido=await User.findOneAndUpdate({email:email}, { $push: { compartidoConmigo: experimentId } });
        if(!userCompartido){
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        const experimentoCompartido=await Experimento.findByIdAndUpdate(experimentId, { $push: { compartidoConusuarios: userCompartido._id } },
            { new: true });
        if(!experimentoCompartido){
            return res.status(404).send({ error: 'Experimento no encontrado' });
        }
        // Devuelvo el experimento actualizado
        return res.status(200).send( experimentoCompartido, { message: 'Experimento compartido' });


    }catch(error){
        return res.status(400).send({ error: 'Error al compartir experimento' + error });
    }
}
// obtener experimentos que usuarios compartieron conmigo
const getExperimentosCompartidos = async (req, res) => {
    await connectToDatabase();
    const { userId } = req.query;
    try {
    // busco los experimentos compartidos conmigo
    const user = await User.findById(userId).populate('compartidoConmigo');
    if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    return res.status(200).send(user.compartidoConmigo);
    }catch (error) {

        return res.status(400).send({ error: 'Error al obtener experimentos'+ error });
    }
}
//eliminar experimento que comparti con un usuario
const deleteExperimentoCompartido = async (req, res) => {
    
    const { userId, expId } = req.body; 
    try{
        //busco el usuario al que se le compartio el experimento y elimino el experimento de la lsita de compartido conmigo
       const userCompartido=await User.findByIdAndUpdate(userId, { $pull: { compartidoConmigo: expId } },
            { new: true });
        if(!userCompartido){
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        //busco el experimento y elimino el usuario de la lista de compartido con usuarios
        const experimentoCompartido=await Experimento.findByIdAndUpdate(expId, { $pull: { compartidoConusuarios: userId } },
            { new: true });
        if(!experimentoCompartido){
            return res.status(404).send({ error: 'Experimento no encontrado' });
        }
        return res.status(200).send({ message: 'Experimento compartido eliminado' });
    }catch(error){
        return res.status(400).send({ error: 'Error al eliminar experimento' });
    }
   
}

// obtener experimento por id \\ OK
const getExperimento = async (req, res) => {
    const { idExperimento } = req.query;
    try {
    const experimento = await Experimento.findById(idExperimento).populate('compartidoConusuarios');
    res.status(200).send(experimento);

    }catch (error) {
        return res.status(400).send({ error: 'Error al obtener experimento' });
    }
}


module.exports = {
    createExperimento,
    getExperimentosByUser,
    getExperimentos,
    deleteExperimento,
    cambiarEstado,
    compartirExperimento,
    getExperimentosCompartidos,
    deleteExperimentoCompartido,
    getExperimento
}




