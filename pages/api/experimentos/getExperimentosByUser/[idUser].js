import { getExperimentosByUser } from "@/controllers/experimentoController";


export default async (req, res) => {
    if (req.method === "GET") {
        await getExperimentosByUser(req, res);
    } else {
        return res.status(405).send({ error: "Error al hacer la peticion" });
    }
}