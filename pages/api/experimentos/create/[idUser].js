import { createExperimento } from "@/controllers/experimentoController";



export default async (req, res) => {
    if (req.method === 'POST') {
        await createExperimento(req, res);
    } else {
        res.status(405).json({ message: 'We only support POST' });
    }
}
