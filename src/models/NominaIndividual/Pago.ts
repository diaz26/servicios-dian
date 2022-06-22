import { prop, modelOptions } from "@typegoose/typegoose"

import { validarNumeroEntero, mensajes, mensajeObligatorio, mensajeLongMin, mensajeLongMax } from "../../libs/utils/validaciones"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class Pago {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Forma')],
    minlength: [1, mensajeLongMin('1')],
    maxlength: [1, mensajeLongMax('1')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Forma: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Metodo')],
    minlength: [1, mensajeLongMin('1')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Metodo: string;

  @prop({ type: String })
  Banco: string;

  @prop({ type: String })
  TipoCuenta: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  NumeroCuenta: string;

}
