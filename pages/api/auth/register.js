import { register } from "@/controllers/authController";

export default async function handler(req, res) {
 if (req.method === 'POST') {
    await register(req, res);
    }
    else {
    res.status(405).json({message: 'We only support POST'});
    }
}