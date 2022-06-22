
export const validarRangoFecha = (fechaInicio: any, fechaFin: any, fechaComparar: any) => {
  if (fechaInicio != null && fechaFin != null && fechaComparar != null) {
    fechaInicio = new Date(fechaInicio);
    fechaFin = new Date(fechaFin);
    fechaComparar = new Date(fechaComparar);
    return(fechaInicio.getTime() <= fechaComparar.getTime() && fechaComparar.getTime() <= fechaFin.getTime());
  } else {
    return true;
  } 
}

export const validarFecha = (fecha: string) => {
  let fecha_regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
  if (fecha !== null) {
    return fecha_regex.test(fecha)
  } else {
    return true;
  }
}

export const validarFechaHora = (fecha: string) => {
  let fecha_regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
  if (fecha !== null) {
    return fecha_regex.test(fecha)
  } else {
    return true;
  }
}

export const validarHora = (hora: string) => {
  let hora_regex = /^\d{2}:\d{2}:\d{2}$/;
  if (hora !== null) {
    return hora_regex.test(hora)
  } else {
    return true;
  }
}

export const validarNumeroEntero = (numero: Number) => {
  return numero == null || !isNaN(Number(numero)) || Number.isInteger(numero);
}

export const validarAlfanumerico = (valor: string) => {
  let caracteres = /[a-zA-Z0-9]/;
  if (valor !== null) {
    return caracteres.test(valor)
  } else {
    return true;
  }
}

export const validarDecimal = (decimal: string) => {
  let exp = /^\d*(\.\d{1})?\d{0,1}$/;
  if (decimal !== null) {
    return exp.test(decimal)
  } else {
    return true;
  }
}

export const mensajes = {
  obligatorio: ' es obligatorio',
  alfanumerico: 'Formato inválido, se espera un valor alfanumérico',
  numeroEntero: 'Formato inválido, se espera un número entero',
  fecha: 'Formato inválido, se espera YYYY-MM-DD',
  fechaHora: 'Formato inválido, se espera YYYY-MM-DDTHH:MM:SS',
  hora: 'Formato inválido, se espera HH:MM:SS',
  longitudMin: 'Longitud inválida, se esperan mínimo | caracteres',
  longitudMax: 'Longitud inválida, se esperan máximo | caracteres',
  enteroMin: 'Cantidad inválida, se espera mínimo | unidad(es)',
  enteroMax: 'Cantidad inválida, se esperan máximo | unidad(es)',
  decimal: 'Longitud inválida, se espera máximo x decimales',
  fecheEntreRango: 'Fecha inválida, debe estar entre el rango de |',
}

export const mensajeObligatorio = (campo: string) => {
  return campo + mensajes.obligatorio
}

export const mensajeLongMin = (long: string) => {
  return mensajes.longitudMin.replace('|', long)
}

export const mensajeLongMax = (long: string) => {
  return mensajes.longitudMax.replace('|', long)
}

export const mensajeDecimal = (dec: string) => {
  return mensajes.decimal.replace('|', dec)
}

export const fechaEntreRango = (rango: string) => {
  return mensajes.fecheEntreRango.replace('|', rango)
}

export const mensajeEnteroMin = (num: string) => {
  return mensajes.enteroMin.replace('|', num)
}

export const mensajeEnteroMax = (num: string) => {
  return mensajes.enteroMax.replace('|', num)
}
