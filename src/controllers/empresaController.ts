
import { Request, Response } from "express";
import { makeErrors } from "../libs/utils/makeErrors";
import Empresa from "../models/Empresa";


export const guardar = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.create(req.body)
        res.status(201).send({ data: empresa, message: 'Registration created successfully!' })
    } catch (error: any) {
        if (error.errors !== undefined) {
            let errors = makeErrors(error.errors);
            res.status(400).send({ errors: errors.errors, message: 'Información inválida!' })
        } else {
            console.error(`ERROR: [empresaController ->> guardar] ->> ${error.name} :: ${error.message}`, error);
            res.status(500).send({ message: 'Error interno del sistema!', error: error.message })
        }
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

