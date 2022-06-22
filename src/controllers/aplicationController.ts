import { Request, Response } from "express";
import { makeErrors } from "../libs/utils/makeErrors";
import PeticionNominaModel from "../models/PeticionNomina";
import mainController from "./mainController";

export const procesarNominaElectronica = async (req: Request, res: Response) => {
  try {
    const dataRequest = req.body.data;
    // pendiente filtro por cedula y empresa
    const peticionNominaEncontrada = await PeticionNominaModel.find({
      "Empresa": dataRequest._empresaId,
      "Json.Trabajador.NumeroDocumento": dataRequest.Trabajador.NumeroDocumento,
      "Json.Periodo.FechaLiquidacionInicio": dataRequest.Periodo.FechaLiquidacionInicio,
      "Json.Periodo.FechaLiquidacionFin": dataRequest.Periodo.FechaLiquidacionFin
    })

    let PeticionNomina, message

    if (peticionNominaEncontrada.length > 0) {
      PeticionNomina = peticionNominaEncontrada[0];
      message = 'Registro encontrado!'
    } else {
      PeticionNomina = await PeticionNominaModel.create({ Json: dataRequest, Empresa: dataRequest._empresaId })
      message = 'Solicitud agregada!'
    }

    const proceso = new mainController('nomina', PeticionNomina._id)
    await proceso.construirXml();

    res.status(201).send({ data: PeticionNomina, message })

  } catch (error: any) {
    if (error.errors !== undefined) {
      let errors = makeErrors(error.errors);
      res.status(400).send({ errors: errors.errors, message: 'Información inválida!' })
    } else {
      console.error(`ERROR: [aplicationController ->> processElectronicPayroll] ->> ${error.name} :: ${error.message}`, error);
      res.status(500).send({ message: 'Error interno del sistema!', error: error.message })
    }
  }
}

export const procesarFacturacionElectronica = async (req: Request, res: Response) => {
  try {

  } catch (error: any) {

  }
}
