const Experimento = require ('../models/Experimento');
const Datos = require ('../models/Dato');


const listData = async(req,res)=>{
    const {idExp}= req.query;
    // buscar los datos por el id del experimento
    try{
        // se obtienen los datos del experimento (valor,fecha_hora,type)
        const datos = await Datos.find({experimento:idExp});
       // se agrupan los datos por la variable type
        const datosAgrupados = datos.reduce((acc,curr)=>{
            if(acc[curr.type]){
                acc[curr.type].push(curr);
            }else{
                acc[curr.type] = [curr];
            }
            return acc;
        },{});
        // se ordenan los datos por fecha
        for (const key in datosAgrupados) {
            datosAgrupados[key].sort((a,b)=>a.fecha_hora-b.fecha_hora);
        }
        return res.status(200).send({datos:datosAgrupados});
    }catch(error){
        return res.status(400).send({ error: 'Error al obtener datos' });
    }


}

module.exports = {
    listData
}
