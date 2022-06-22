import { prop, modelOptions } from "@typegoose/typegoose"

import { validarFecha, validarNumeroEntero, mensajes, mensajeObligatorio, validarHora, mensajeLongMin, mensajeLongMax, validarAlfanumerico, validarDecimal, mensajeDecimal } from "../../libs/utils/validaciones"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class InformacionGeneral {

  @prop({
    type: String, required: [true, mensajeObligatorio('FechaGen')],
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaGen: String;

  @prop({
    type: String, required: [true, mensajeObligatorio('HoraGen')],
    validate: {
      validator: (value: any) => { return validarHora(value) },
      message: mensajes.hora
    }
  })
  HoraGen: String;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('PeriodoNomina')],
    minlength: [1, mensajeLongMin('1')],
    maxlength: [1, mensajeLongMax('1')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  PeriodoNomina: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('TipoMoneda')],
    maxlength: [3, mensajeLongMax('3')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  TipoMoneda: string;

  @prop({
    type: String,
    default: '1.00',
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  TRM: string;

}