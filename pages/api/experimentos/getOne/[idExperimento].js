import {getExperimento} from "@/controllers/experimentoController";

export default async (req, res)=> {
    if (req.method === 'GET') {
        await getExperimento(req, res);
    } else {
        res.status(405).json({ message: 'We only support GET' });
    }
}
