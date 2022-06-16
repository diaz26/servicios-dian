
import { Request, Response } from "express";
import Empresa from "../models/Empresa";


export const guardar = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.create(req.body)
        res.status(201).send({ data: empresa, message: 'Registration created successfully!' })
    } catch (e: any) {
        console.log(e)
        res.status(500).send({ message: e.message })
    }
}

export const obtener = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.findById(req.params._id)
        res.status(201).send({ data: empresa, message: 'Registro encontrado!' })
    } catch (e: any) {
        console.log(e)
        res.status(500).send({ message: e.message })
    }
}

