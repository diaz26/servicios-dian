import { prop, modelOptions } from "@typegoose/typegoose"

import { validarNumeroEntero, mensajes, mensajeObligatorio, mensajeLongMin, mensajeLongMax, validarAlfanumerico } from "../../libs/utils/validaciones"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class LugarGeneracionXML {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Pais')],
    minlength: [2, mensajeLongMin('2')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  Pais: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('DepartamentoEstado')],
    minlength: [2, mensajeLongMin('2')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  DepartamentoEstado: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('MunicipioCiudad')],
    minlength: [5, mensajeLongMin('5')],
    maxlength: [5, mensajeLongMax('5')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  MunicipioCiudad: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Idioma')],
    minlength: [2, mensajeLongMin('2')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  Idioma: string;

}