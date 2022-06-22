import { prop, getModelForClass, modelOptions, Ref, PropType } from "@typegoose/typegoose"
import { Empresa } from "./Empresa"
import { Periodo } from "./NominaIndividual/Periodo"

import { validarRangoFecha, validarFecha, validarNumeroEntero, validarAlfanumerico, mensajes, mensajeObligatorio, mensajeLongMin, mensajeLongMax, validarDecimal, mensajeDecimal, validarFechaHora, validarHora } from "../libs/utils/validaciones"
import { NumeroSecuenciaXML } from "./NominaIndividual/NumeroSecuenciaXML"
import { LugarGeneracionXML } from "./NominaIndividual/LugarGeneracionXML"
import { InformacionGeneral } from "./NominaIndividual/InformacionGeneral"
import { Trabajador } from "./NominaIndividual/Trabajador"
import { Pago } from "./NominaIndividual/Pago"
import { Devengados } from "./NominaIndividual/Devengados"
import { Deducciones } from "./NominaIndividual/Deducciones"

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class PeticionNomina {

  @prop({ ref: () => Empresa, required: [true, mensajeObligatorio('Id de la empresa')] })
  Empresa: Ref<Empresa>

  @prop({ type: () => NominaIndividual, required: [true, mensajeObligatorio('NominaIndividual')], _id: false })
  Json: NominaIndividual

  @prop({ type: String, default: '' })
  XmlString: String

  @prop({ type: String, default: 'pendiente' })
  Status: String

  @prop({ type: String, default: '' })
  Response: String

  @prop({ type: String, default: 1 })
  Attempts: Number

}

class NominaIndividual {

  @prop({ type: () => Periodo, required: [true, mensajeObligatorio('Periodo')] })
  Periodo: Periodo

  @prop({ type: () => NumeroSecuenciaXML, required: [true, mensajeObligatorio('NumeroSecuenciaXML')] })
  NumeroSecuenciaXML: NumeroSecuenciaXML

  @prop({ type: () => LugarGeneracionXML, required: [true, mensajeObligatorio('LugarGeneracionXML')] })
  LugarGeneracionXML: LugarGeneracionXML

  @prop({ type: () => InformacionGeneral, required: [true, mensajeObligatorio('InformacionGeneral')] })
  InformacionGeneral: InformacionGeneral

  @prop({ type: [String] }, PropType.ARRAY)
  Notas: String[]

  @prop({ type: () => Trabajador, required: [true, mensajeObligatorio('Trabajador')] })
  Trabajador: Trabajador

  @prop({ type: () => Pago, required: [true, mensajeObligatorio('Pago')] })
  Pago: Pago

  @prop({ type: () => FechasPagos, required: [true, mensajeObligatorio('FechasPagos')], _id: false })
  FechasPagos: FechasPagos

  @prop({ type: () => Devengados, required: [true, mensajeObligatorio('Devengados')] })
  Devengados: Devengados

  @prop({ type: () => Deducciones, required: [true, mensajeObligatorio('Deducciones')] })
  Deducciones: Deducciones
  
  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Redondeo: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('DevengadosTotal')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  DevengadosTotal: string

  @prop({
    type: String,
    required: [true, mensajeObligatorio('DeduccionesTotal')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  DeduccionesTotal: string

  @prop({
    type: String,
    required: [true, mensajeObligatorio('ComprobanteTotal')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  ComprobanteTotal: string

}

export class FechasPagos {

  @prop({
    type: String, required: [true, mensajeObligatorio('FechaPago')],
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaPago: String;

}

const PeticionNominaModel = getModelForClass(PeticionNomina);
export default PeticionNominaModel;

