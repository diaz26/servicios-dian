import { prop, modelOptions } from "@typegoose/typegoose"

import { validarRangoFecha, validarFecha, validarNumeroEntero, mensajes, mensajeObligatorio, mensajeLongMin, mensajeLongMax, validarAlfanumerico, validarDecimal, mensajeDecimal } from "../../libs/utils/validaciones"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class Trabajador {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('TipoTrabajador')],
    minlength: [2, mensajeLongMin('2')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  TipoTrabajador: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('SubTipoTrabajador')],
    minlength: [2, mensajeLongMin('2')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  SubTipoTrabajador: string;

  @prop({ type: Boolean, required: [true, mensajeObligatorio('AltoRiesgoPension')] })
  AltoRiesgoPension: boolean;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('TipoDocumento')],
    minlength: [2, mensajeLongMin('2')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  TipoDocumento: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('NumeroDocumento')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  NumeroDocumento: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('PrimerApellido')],
    maxlength: [60, mensajeLongMax('60')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  PrimerApellido: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('SegundoApellido')],
    maxlength: [60, mensajeLongMax('60')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  SegundoApellido: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('PrimerNombre')],
    maxlength: [60, mensajeLongMax('60')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  PrimerNombre: string;

  @prop({
    type: String,
    maxlength: [60, mensajeLongMax('60')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  OtrosNombres: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('LugarTrabajoPais')],
    minlength: [2, mensajeLongMin('2')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  LugarTrabajoPais: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('LugarTrabajoDepartamentoEstado')],
    minlength: [2, mensajeLongMin('2')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  LugarTrabajoDepartamentoEstado: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('LugarTrabajoMunicipioCiudad')],
    minlength: [5, mensajeLongMin('5')],
    maxlength: [5, mensajeLongMax('5')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  LugarTrabajoMunicipioCiudad: string;

  @prop({ type: String, required: [true, mensajeObligatorio('LugarTrabajoDireccion')] })
  LugarTrabajoDireccion: string;

  @prop({ type: Boolean, required: [true, mensajeObligatorio('SalarioIntegral')] })
  SalarioIntegral: boolean;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('TipoContrato')],
    minlength: [1, mensajeLongMin('1')],
    maxlength: [1, mensajeLongMax('1')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  TipoContrato: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Sueldo')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Sueldo: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  CodigoTrabajador: string;

}