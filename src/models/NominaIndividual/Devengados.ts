import { prop, modelOptions, PropType } from "@typegoose/typegoose"

import { validarFecha, validarNumeroEntero, validarAlfanumerico, mensajes, mensajeObligatorio, mensajeLongMin, mensajeLongMax, validarDecimal, mensajeDecimal, validarFechaHora } from "../../libs/utils/validaciones"

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class Devengados {

  @prop({ type: () => Basico, required: [true, mensajeObligatorio('Basico')], _id: false })
  Basico: Basico

  @prop({ type: () => [Transporte], _id: false }, PropType.ARRAY)
  Transporte: Transporte[]

  @prop({ type: () => [HoraExtra], _id: false }, PropType.ARRAY)
  HEDs: HoraExtra[]

  @prop({ type: () => [HoraExtra], _id: false }, PropType.ARRAY)
  HENs: HoraExtra[]

  @prop({ type: () => [HoraExtra], _id: false }, PropType.ARRAY)
  HRNs: HoraExtra[]

  @prop({ type: () => [HoraExtra], _id: false }, PropType.ARRAY)
  HEDDFs: HoraExtra[]

  @prop({ type: () => [HoraExtra], _id: false }, PropType.ARRAY)
  HRDDFs: HoraExtra[]

  @prop({ type: () => [HoraExtra], _id: false }, PropType.ARRAY)
  HENDFs: HoraExtra[]

  @prop({ type: () => [HoraExtra], _id: false }, PropType.ARRAY)
  HRNDFs: HoraExtra[]

  @prop({ type: () => Vacaciones, _id: false })
  Vacaciones: Vacaciones

  @prop({ type: () => Primas, _id: false })
  Primas: Primas

  @prop({ type: () => Cesantias, _id: false })
  Cesantias: Cesantias

  @prop({ type: () => [Incapacidad], _id: false }, PropType.ARRAY)
  Incapacidades: Incapacidad[]

  @prop({ type: () => Licencias, _id: false })
  Licencias: Licencias

  @prop({ type: () => [Bonificacion], _id: false }, PropType.ARRAY)
  Bonificaciones: Bonificacion[]

  @prop({ type: () => [Auxilio], _id: false }, PropType.ARRAY)
  Auxilios: Auxilio[]

  @prop({ type: () => [HuelgaLegal], _id: false }, PropType.ARRAY)
  HuelgasLegales: HuelgaLegal[]

  @prop({ type: () => [OtroConcepto], _id: false }, PropType.ARRAY)
  OtrosConceptos: OtroConcepto[]

  @prop({ type: () => [Compensaciones], _id: false }, PropType.ARRAY)
  Compensaciones: Compensaciones[]

  @prop({ type: () => [BonoEPCTV], _id: false }, PropType.ARRAY)
  BonoEPCTVs: BonoEPCTV[]

  @prop({
    type: [String],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  }, PropType.ARRAY)
  Comisiones: string[];

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
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Dotacion: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  ApoyoSost: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Teletrabajo: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  BonifRetiro: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Indemnizacion: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Reintegro: string;

}

export class Basico {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('DiasTrabajados')],
    minlength: [1, mensajeLongMin('1')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  DiasTrabajados: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('SueldoTrabajado')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  SueldoTrabajado: string;

}

export class Transporte {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  AuxilioTransporte: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  ViaticoManuAlojS: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  ViaticoManuAlojNS: string;

}

export class HoraExtra {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFechaHora(value) },
      message: mensajes.fechaHora
    }
  })
  HoraInicio: String;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFechaHora(value) },
      message: mensajes.fechaHora
    }
  })
  HoraFin: String;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Cantidad')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Cantidad: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Porcentaje')],
    maxlength: [6, mensajeLongMax('6')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Porcentaje: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Pago')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Pago: string;

}

class Vacaciones {

  @prop({ type: () => [VacacionesComunes], _id: false }, PropType.ARRAY)
  VacacionesComunes: VacacionesComunes[]

  @prop({ type: () => [VacacionesCompensadas], _id: false }, PropType.ARRAY)
  VacacionesCompensadas: VacacionesCompensadas[]

}

class VacacionesComunes {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaInicio: String;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaFin: String;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Cantidad')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Cantidad: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Pago')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Pago: string;
}

class VacacionesCompensadas {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Cantidad')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Cantidad: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Pago')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Pago: string;
}

class Primas {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Cantidad')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Cantidad: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Pago')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Pago: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PagoNS: string;

}

class Cesantias {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Pago')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Pago: string;

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
    required: [true, mensajeObligatorio('PagoIntereses')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PagoIntereses: string;

}

class Incapacidad {
  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaInicio: String;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaFin: String;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Cantidad')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Cantidad: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Tipo')],
    minlength: [1, mensajeLongMin('1')],
    maxlength: [1, mensajeLongMax('1')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Tipo: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Pago')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Pago: string;
}

class Licencias {

  @prop({ type: () => [Licencia], _id: false }, PropType.ARRAY )
  LicenciaMP: Licencia[]

  @prop({ type: () => [Licencia], _id: false }, PropType.ARRAY )
  LicenciaR: Licencia[]

  @prop({ type: () => [LicenciaNR], _id: false }, PropType.ARRAY )
  LicenciaNR: LicenciaNR[]

}

class Licencia {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaInicio: String;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaFin: String;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Cantidad')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Cantidad: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Pago')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Pago: string;
}

class LicenciaNR {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaInicio: String;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaFin: String;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Cantidad')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Cantidad: string;

}

class Bonificacion {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  BonificacionS: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  BonificacionNS: string;

}

class Auxilio {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  AuxilioS: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  AuxilioNS: string;

}

class HuelgaLegal {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaInicio: String;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaFin: String;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Cantidad')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Cantidad: string;

}

class OtroConcepto {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('DescripcionConcepto')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  DescripcionConcepto: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  ConceptoS: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  ConceptoNS: string;

}

class Compensaciones {

  @prop({ type: () => [Compensacion] })
  Compensacion: Compensacion[]

}

class Compensacion {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('CompensacionO')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  CompensacionO: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('CompensacionE')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  CompensacionE: string;

}

class BonoEPCTV {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PagoS: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PagoNS: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PagoAlimentacionS: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PagoAlimentacionNS: string;

}
