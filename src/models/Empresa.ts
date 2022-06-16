import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose"
import { mensajeLongMax, mensajeLongMin, mensajeObligatorio, mensajes, validarAlfanumerico, validarNumeroEntero } from "../libs/utils/validaciones";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Empresa {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Nit')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Nit: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Dv')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Dv: string;

  @prop({ type: String })
  RazonSocial: string;

  @prop({
    type: String,
    maxlength: [60, mensajeLongMax('60')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  PrimerApellido: string;

  @prop({
    type: String,
    maxlength: [60, mensajeLongMax('60')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  SegundoApellido: string;

  @prop({
    type: String,
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
    required: [true, mensajeObligatorio('Direccion')],
  })
  Direccion: string

}
const EmpresaModel = getModelForClass(Empresa);
export default EmpresaModel;
