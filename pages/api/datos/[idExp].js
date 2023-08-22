import { listData } from "@/controllers/datosController";

export default async (req, res) => {
    const { method } = req;
    if(method === 'GET'){
        await listData(req,res);  
    }else{
        res.status(405).json({message:'We only support GET'});

    }
}
