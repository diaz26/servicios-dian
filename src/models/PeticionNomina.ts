import { prop, getModelForClass, modelOptions, Ref } from "@typegoose/typegoose"
import { Empresa } from "./Empresa"

import { validarRangoFecha, validarFecha, validarNumeroEntero, validarAlfanumerico, mensajes, mensajeObligatorio, mensajeLongMin, mensajeLongMax, validarDecimal, mensajeDecimal, validarFechaHora } from "../libs/utils/validaciones"

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
class PeticionNomina {

  @prop({ ref: () => Empresa })
  Empresa: Ref<Empresa>

  @prop({ type: () => Nomina, required: [true, mensajeObligatorio('Nomina')] })
  json: Nomina

  @prop({ type: String, default: 'pendiente' })
  status: String

  @prop({ type: String, default: '' })
  response: String

  @prop({ type: String, default: 1 })
  attempts: Number

}

class Nomina {

  @prop({ type: () => Periodo, required: [true, mensajeObligatorio('Periodo')] })
  Periodo: Periodo

  @prop({ type: () => NumeroSecuenciaXML, required: [true, mensajeObligatorio('NumeroSecuenciaXML')] })
  NumeroSecuenciaXML: NumeroSecuenciaXML

  @prop({ type: () => LugarGeneracionXML, required: [true, mensajeObligatorio('LugarGeneracionXML')] })
  LugarGeneracionXML: LugarGeneracionXML

  @prop({ type: () => Trabajador, required: [true, mensajeObligatorio('Trabajador')] })
  Trabajador: Trabajador

  @prop({ type: () => Pago, required: [true, mensajeObligatorio('Pago')] })
  Pago: Pago

  @prop({ type: () => FechasPagos, required: [true, mensajeObligatorio('FechasPagos')] })
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

class Periodo {

  @prop({
    type: String, required: [true, mensajeObligatorio('FechaGen')],
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaGen: String;

  @prop({
    type: Number,
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
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaRetiro: string;

  @prop({
    type: Date,
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaIngreso: Date;
}

class NumeroSecuenciaXML {

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
    type: Number,
    required: [true, mensajeObligatorio('Consecutivo')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Consecutivo: number;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Numero')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  Numero: string;

}

class LugarGeneracionXML {

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

class Trabajador {

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

class Pago {

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
    minlength: [2, mensajeLongMin('2')],
    maxlength: [2, mensajeLongMax('2')],
    validate: {
      validator: (value: any) => { return validarNumeroEntero(value) },
      message: mensajes.numeroEntero
    }
  })
  Metodo: string;

  @prop({
    type: String,
    required: [true, mensajeObligatorio('Banco')],
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  Banco: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  TipoCuenta: string;

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarAlfanumerico(value) },
      message: mensajes.alfanumerico
    }
  })
  NumeroCuenta: string;

}

class FechasPagos {

  @prop({
    type: String, required: [true, mensajeObligatorio('FechaPago')],
    validate: {
      validator: (value: any) => { return validarFecha(value) },
      message: mensajes.fecha
    }
  })
  FechaPago: String;

}

class Devengados {

  @prop({ type: () => Basico, required: [true, mensajeObligatorio('Basico')] })
  Basico: Basico

  @prop({ type: () => Transporte })
  Transporte: Transporte

  @prop({ type: () => HEDs })
  HEDs: HEDs

  @prop({ type: () => HENs })
  HENs: HENs

  @prop({ type: () => HRNs })
  HRNs: HRNs

  @prop({ type: () => HEDDFs })
  HEDDFs: HEDDFs

  @prop({ type: () => HRDDFs })
  HRDDFs: HRDDFs

  @prop({ type: () => HENDFs })
  HENDFs: HENDFs

  @prop({ type: () => HRNDFs })
  HRNDFs: HRNDFs

  @prop({ type: () => Vacaciones })
  Vacaciones: Vacaciones

  @prop({ type: () => Cesantias })
  Cesantias: Cesantias

  @prop({ type: () => Incapacidades })
  Incapacidades: Incapacidades

  @prop({ type: () => Licencias })
  Licencias: Licencias

  @prop({ type: () => Bonificaciones })
  Bonificaciones: Bonificaciones

  @prop({ type: () => Auxilios })
  Auxilios: Auxilios

  @prop({ type: () => HuelgasLegales })
  HuelgasLegales: HuelgasLegales

  @prop({ type: () => OtrosConceptos })
  OtrosConceptos: OtrosConceptos

  @prop({ type: () => Compensaciones })
  Compensaciones: Compensaciones

  @prop({ type: () => BonoEPCTVs })
  BonoEPCTVs: BonoEPCTVs

  @prop({ type: () => Comisiones })
  Comisiones: Comisiones

  @prop({ type: () => PagosTerceros })
  PagosTerceros: PagosTerceros

  @prop({ type: () => Anticipos })
  Anticipos: Anticipos

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

class Basico {

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

class Transporte {

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

class HEDs {

  @prop({ type: () => HoraExtra })
  HED: HoraExtra

}

class HENs {

  @prop({ type: () => HoraExtra })
  HEN: HoraExtra

}

class HRNs {

  @prop({ type: () => HoraExtra })
  HRN: HoraExtra

}

class HEDDFs {

  @prop({ type: () => HoraExtra })
  HEDDF: HoraExtra

}

class HRDDFs {

  @prop({ type: () => HoraExtra })
  HRDDF: HoraExtra

}

class HENDFs {

  @prop({ type: () => HoraExtra })
  HENDF: HoraExtra

}

class HRNDFs {

  @prop({ type: () => HoraExtra })
  HRNDF: HoraExtra

}

class HoraExtra {

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

  @prop({ type: () => VacacionesComunes })
  VacacionesComunes: VacacionesComunes

  @prop({ type: () => VacacionesCompensadas })
  VacacionesCompensadas: VacacionesCompensadas

  @prop({ type: () => Primas })
  Primas: Primas

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

class Incapacidades {

  @prop({ type: () => Incapacidad })
  Incapacidad: Incapacidad

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

  @prop({ type: () => Licencia })
  LicenciaMP: Licencia

  @prop({ type: () => Licencia })
  LicenciaR: Licencia

  @prop({ type: () => LicenciaNR })
  LicenciaNR: LicenciaNR

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

class Bonificaciones {

  @prop({ type: () => Bonificacion })
  Bonificacion: Bonificacion

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

class Auxilios {

  @prop({ type: () => Auxilio })
  Auxilio: Auxilio

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

class HuelgasLegales {

  @prop({ type: () => HuelgaLegal })
  HuelgaLegal: HuelgaLegal

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

class OtrosConceptos {

  @prop({ type: () => OtroConcepto })
  OtroConcepto: OtroConcepto

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

  @prop({ type: () => Compensacion })
  Compensacion: Compensacion

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

class BonoEPCTVs {

  @prop({ type: () => BonoEPCTV })
  BonoEPCTV: BonoEPCTV

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

class Comisiones {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Comision: string;

}

class PagosTerceros {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  PagoTercero: string;

}

class Anticipos {

  @prop({
    type: String,
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  Anticipo: string;

}

class Deducciones {

  @prop({ type: () => Deduccion, required: [true, mensajeObligatorio('Salud')] })
  Salud: Deduccion

  @prop({ type: () => Deduccion, required: [true, mensajeObligatorio('FondoPension')] })
  FondoPension: Deduccion

  @prop({ type: () => FondoSP })
  FondoSP: FondoSP

  @prop({ type: () => Deduccion })
  Sindicatos: Deduccion

  @prop({ type: () => Sanciones })
  Sanciones: Sanciones

  @prop({ type: () => Libranzas })
  Libranzas: Libranzas

  @prop({ type: () => PagosTerceros })
  PagosTerceros: PagosTerceros

  @prop({ type: () => Anticipos })
  Anticipos: Anticipos

  @prop({ type: () => OtrasDeducciones })
  OtrasDeducciones: OtrasDeducciones

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

class Deduccion {

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

class FondoSP {

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

class Sanciones {

  @prop({ type: () => Sancion })
  Sancion: Sancion

}

class Sancion {

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

class Libranzas {

  @prop({ type: () => Libranza })
  Libranza: Libranza

}

class Libranza {

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

class OtrasDeducciones {

  @prop({
    type: String,
    required: [true, mensajeObligatorio('OtraDeduccion')],
    validate: {
      validator: (value: any) => { return validarDecimal(value) },
      message: mensajeDecimal('2')
    }
  })
  OtraDeduccion: string;

}



const PeticionNominaModel = getModelForClass(PeticionNomina);
export default PeticionNominaModel;

