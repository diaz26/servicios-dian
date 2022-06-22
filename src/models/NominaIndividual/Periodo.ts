import { prop, modelOptions, DocumentType } from "@typegoose/typegoose"

import { validarRangoFecha, validarFecha, validarNumeroEntero, mensajes, mensajeObligatorio, fechaEntreRango, mensajeEnteroMin } from "../../libs/utils/validaciones"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class Periodo {

  @prop({
    type: String, required: [true, mensajeObligatorio('FechaGen')],
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaGen: String;

  @prop({
    type: Number, required: [true, mensajeObligatorio('TiempoLaborado')],
    min: [1, mensajeEnteroMin('1')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  TiempoLaborado: number;

  @prop({
    type: String, required: [true, mensajeObligatorio('FechaLiquidacionInicio')],
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaLiquidacionInicio: string;

  @prop({
    type: String, required: [true, mensajeObligatorio('FechaLiquidacionFin')],
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaLiquidacionFin: string;

  @prop({
    type: String,
    validate: [{
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    },
    {
      validator: function (this: DocumentType<Periodo>) {
        return validarRangoFecha(this.FechaLiquidacionInicio, this.FechaLiquidacionFin, this.FechaRetiro)
      },
      message: fechaEntreRango('FechaLiquidacion')
    }]
  })
  FechaRetiro: string;

  @prop({
    type: Date,
    validate: [{
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    },
    {
      validator: function (this: DocumentType<Periodo>) {
        return validarRangoFecha(this.FechaLiquidacionInicio, this.FechaLiquidacionFin, this.FechaIngreso)
      },
      message: fechaEntreRango('FechaLiquidacion')
    }]
  })
  FechaIngreso: Date;
}

