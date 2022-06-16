import { Request, Response } from "express";
import { makeErrors } from "../libs/utils/makeErrors";
import PeticionNominaModel from "../models/PeticionNomina";
import mainController from "./mainController";

export const procesarNominaElectronica = async (req: Request, res: Response) => {
  try {
    const dataRequest = req.body.data;
    // pendiente filtro por cedula y empresa
    const peticionNominaEncontrada = await PeticionNominaModel.find(
      { 
        "json.Periodo.FechaLiquidacionInicio": new Date(dataRequest.Periodo.FechaLiquidacionInicio),
        "json.Periodo.FechaLiquidacionFin": new Date(dataRequest.Periodo.FechaLiquidacionFin)
      }
    )
    let dataResponse, message
    if (peticionNominaEncontrada.length > 0) {
      dataResponse = peticionNominaEncontrada[0];
      message = 'Registro encontrado!'
    } else {
      const PeticionNomina = await PeticionNominaModel.create({json: dataRequest, Empresa: dataRequest._empresaId})

      const proceso = new mainController('nomina', PeticionNomina._id)
      await proceso.construirXml();

      message = 'Solicitud agregada!'
    }
    res.status(201).send({ data: dataResponse, message })

    // res.status(responseFactory.status).send(responseFactory.send)
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
