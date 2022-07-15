import { prop, getModelForClass, modelOptions, Ref, PropType } from "@typegoose/typegoose"

import { mensajeObligatorio, validarDecimal, mensajeDecimal } from "../../libs/utils/validaciones"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class Deducciones {

  @prop({ type: () => Deduccion, required: [true, mensajeObligatorio('Salud')], _id: false })
  Salud: Deduccion

  @prop({ type: () => Deduccion, required: [true, mensajeObligatorio('FondoPension')], _id: false })
  FondoPension: Deduccion

  @prop({ type: () => FondoSP, _id: false })
  FondoSP: FondoSP

  @prop({ type: () => [Deduccion], _id: false }, PropType.ARRAY)
  Sindicatos: Deduccion[]

  @prop({ type: () => [Sancion], _id: false }, PropType.ARRAY)
  Sanciones: Sancion[]

  @prop({ type: () => [Libranza], _id: false }, PropType.ARRAY)
  Libranzas: Libranza[]

  @prop({
    type: [String],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  }, PropType.ARRAY)
  PagosTerceros: string[];

  @prop({
    type: [String],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  }, PropType.ARRAY)
  Anticipos: string[];

  @prop({
    type: [String],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  }, PropType.ARRAY)
  OtrasDeducciones: string[];

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PensionVoluntaria: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  RetencionFuente: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  AFC: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Cooperativa: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  EmbargoFiscal: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PlanComplementarios: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Educacion: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Reintegro: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Deuda: string;

}

export class Deduccion {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Porcentaje')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Porcentaje: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Deduccion')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Deduccion: string;

}

export class FondoSP {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Porcentaje: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  DeduccionSP: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PorcentajeSub: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  DeduccionSub: string;

}

export class Sancion {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('SancionPublic')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  SancionPublic: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('SancionPriv')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  SancionPriv: string;

}

export class Libranza {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Descripcion')]
  })
  Descripcion: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Deduccion')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Deduccion: string;

}

