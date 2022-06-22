import { prop, modelOptions } from "@typegoose/typegoose"

import { validarNumeroEntero, mensajes, mensajeObligatorio, validarAlfanumerico } from "../../libs/utils/validaciones"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class NumeroSecuenciaXML {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  CodigoTrabajador: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  Prefijo: string;

  @prop({
    type: Number, required: [true, mensajeObligatorio('Consecutivo')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Consecutivo: number;

  @prop({
    type: String, required: [true, mensajeObligatorio('Numero')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  Numero: string;

}