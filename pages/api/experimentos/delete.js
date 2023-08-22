import {deleteExperimento} from "@/controllers/experimentoController";

export default async (req, res)=> {
    if (req.method === 'DELETE') {
        await deleteExperimento(req, res);
    } else {
        res.status(405).json({ message: 'We only support DELETE' });
    }
}
