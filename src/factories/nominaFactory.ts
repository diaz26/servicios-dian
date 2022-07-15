import { iFactory } from "../interfaces/iFactory";
import { XmlModel } from "../libs/xmlModel"
import { PeticionNomina } from "../models/PeticionNomina";
import { Periodo } from "../models/NominaIndividual/Periodo";
import { NumeroSecuenciaXML } from "../models/NominaIndividual/NumeroSecuenciaXML";
import { LugarGeneracionXML } from "../models/NominaIndividual/LugarGeneracionXML";
import { InformacionGeneral } from "../models/NominaIndividual/InformacionGeneral";
import { Trabajador } from "../models/NominaIndividual/Trabajador";
import { Pago } from "../models/NominaIndividual/Pago";
import { FechasPagos } from "../models/PeticionNomina";
import { Devengados, Basico, Transporte, HoraExtra, Vacaciones, Primas, Cesantias, Incapacidad, Licencias, Bonificacion, Auxilio, HuelgaLegal, OtroConcepto, Compensacion, BonoEPCTV } from "../models/NominaIndividual/Devengados";
import { Deduccion, Deducciones, FondoSP, Libranza, Sancion } from "../models/NominaIndividual/Deducciones";


export class nominaFactory extends XmlModel implements iFactory {

    public XmlString: string = '';

    validarData(peticion: PeticionNomina): void {
    }

    async crearXml(peticion: PeticionNomina): Promise<void> {

        await this.validarData(peticion);

        // APARTADO PARA Novedad 
        await this.formarPeriodo(peticion.Json.Periodo)
        await this.formarNumeroSecuencia(peticion.Json.NumeroSecuenciaXML)
        await this.formarLugarGeneracion(peticion.Json.LugarGeneracionXML)
        // APARTADO PARA ProveedorXML 
        // APARTADO PARA CodigoQR
        await this.formarInformacionGeneral(peticion.Json.InformacionGeneral)
        await this.formarNotas(peticion.Json.Notas)
        await this.formarEmpleador(peticion.Empresa)
        await this.formarTrabajador(peticion.Json.Trabajador)
        await this.formarPago(peticion.Json.Pago)
        await this.formarFechasPagos(peticion.Json.FechasPagos)
        await this.formarDevengados(peticion.Json.Devengados)
        await this.formarDeducciones(peticion.Json.Deducciones)

        this.XmlString += await this.formarEtiquetaConValor('Redondeo', peticion.Json.Redondeo);
        this.XmlString += await this.formarEtiquetaConValor('DevengadosTotal', peticion.Json.DevengadosTotal);
        this.XmlString += await this.formarEtiquetaConValor('DeduccionesTotal', peticion.Json.DeduccionesTotal);
        this.XmlString += await this.formarEtiquetaConValor('ComprobanteTotal', peticion.Json.ComprobanteTotal);

        console.log(this.XmlString)

        await this.firmarXml();
        await this.enviarXml(null);
    }

    async firmarXml(): Promise<void> {
        await this.firmar(this.XmlString);
    }

    async enviarXml(xml: any): Promise<void> {
        await this.enviar();
    }

    formarPeriodo(PeriodoJson: Periodo): void {
        /** ABRE ETIQUETA */
        let etiquetaString = `<Periodo `

        /** INICIA CON LO REQUERIDO */
        etiquetaString += `FechaLiquidacionInicio="${PeriodoJson.FechaLiquidacionInicio}" `
        etiquetaString += `FechaLiquidacionFin="${PeriodoJson.FechaLiquidacionFin}" `
        etiquetaString += `FechaGen="${PeriodoJson.FechaGen}" `
        etiquetaString += `TiempoLaborado="${PeriodoJson.TiempoLaborado}" `

        /** OPCIONALES */
        if (PeriodoJson.FechaIngreso) etiquetaString += `FechaIngreso="${PeriodoJson.FechaIngreso}" `
        if (PeriodoJson.FechaRetiro) etiquetaString += `FechaRetiro="${PeriodoJson.FechaRetiro}" `

        /** CIERRE DE ETIQUETA */
        this.cerrarEtiqueta(etiquetaString)
    }

    formarNumeroSecuencia(NumeroSecuenciaJson: NumeroSecuenciaXML): void {
        /** ABRE ETIQUETA */
        let etiquetaString = `<NumeroSecuenciaXML `

        /** INICIA CON LO REQUERIDO */
        etiquetaString += `Consecutivo="${NumeroSecuenciaJson.Consecutivo}" `
        etiquetaString += `Numero="${NumeroSecuenciaJson.Numero}" `

        /** OPCIONALES */
        if (NumeroSecuenciaJson.CodigoTrabajador) etiquetaString += `CodigoTrabajador="${NumeroSecuenciaJson.CodigoTrabajador}" `
        if (NumeroSecuenciaJson.Prefijo) etiquetaString += `Prefijo="${NumeroSecuenciaJson.Prefijo}" `

        /** CIERRE DE ETIQUETA */
        this.cerrarEtiqueta(etiquetaString)
    }

    formarLugarGeneracion(LugarGeneracionJson: LugarGeneracionXML): void {
        /** ABRE ETIQUETA */
        let etiquetaString = `<LugarGeneracionXML `

        /** INICIA CON LO REQUERIDO */
        etiquetaString += `Pais="${LugarGeneracionJson.Pais}" `
        etiquetaString += `DepartamentoEstado="${LugarGeneracionJson.DepartamentoEstado}" `
        etiquetaString += `MunicipioCiudad="${LugarGeneracionJson.MunicipioCiudad}" `
        etiquetaString += `Idioma="${LugarGeneracionJson.Idioma}" `

        /** CIERRE DE ETIQUETA */
        this.cerrarEtiqueta(etiquetaString)
    }

    formarInformacionGeneral(InformacionGeneralJson: InformacionGeneral): void {
        /** ABRE ETIQUETA */
        let etiquetaString = `<InformacionGeneral `

        /** INICIA CON LO REQUERIDO */
        // etiquetaString += `Version="${InformacionGeneralJson.Version}" `
        // etiquetaString += `Ambiente="${InformacionGeneralJson.Ambiente}" `
        // etiquetaString += `TipoXML="${InformacionGeneralJson.TipoXML}" `
        // etiquetaString += `CUNE="${InformacionGeneralJson.CUNE}" `
        // etiquetaString += `EncripCUNE="${InformacionGeneralJson.EncripCUNE}" `
        etiquetaString += `FechaGen="${InformacionGeneralJson.FechaGen}" `
        etiquetaString += `HoraGen="${InformacionGeneralJson.HoraGen}" `
        etiquetaString += `PeriodoNomina="${InformacionGeneralJson.PeriodoNomina}" `
        etiquetaString += `TipoMoneda="${InformacionGeneralJson.TipoMoneda}" `
        etiquetaString += `TRM="${InformacionGeneralJson.TRM}" `

        /** CIERRE DE ETIQUETA */
        this.cerrarEtiqueta(etiquetaString)
    }

    formarNotas(Notas: any) {
        if (Notas && Array.isArray(Notas)) {
            let etiquetaString = `<Notas>${Notas.join(' - ')}</Notas>\n`
            this.XmlString += etiquetaString;
        }
    }

    formarEmpleador(EmpleadorJson: any): void {
        /** ABRE ETIQUETA */
        let etiquetaString = `<Empleador `

        /** INICIA CON LO REQUERIDO */
        etiquetaString += `NIT="${EmpleadorJson.Nit}" `
        etiquetaString += `DV="${EmpleadorJson.Dv}" `
        etiquetaString += `Pais="${EmpleadorJson.Pais}" `
        etiquetaString += `DepartamentoEstado="${EmpleadorJson.DepartamentoEstado}" `
        etiquetaString += `MunicipioCiudad="${EmpleadorJson.MunicipioCiudad}" `
        etiquetaString += `Direccion="${EmpleadorJson.Direccion}" `

        /** OPCIONALES */
        if (EmpleadorJson.RazonSocial) etiquetaString += `RazonSocial="${EmpleadorJson.RazonSocial}" `
        if (EmpleadorJson.PrimerApellido) etiquetaString += `PrimerApellido="${EmpleadorJson.PrimerApellido}" `
        if (EmpleadorJson.SegundoApellido) etiquetaString += `SegundoApellido="${EmpleadorJson.SegundoApellido}" `
        if (EmpleadorJson.PrimerNombre) etiquetaString += `PrimerNombre="${EmpleadorJson.PrimerNombre}" `
        if (EmpleadorJson.OtrosNombres) etiquetaString += `OtrosNombres="${EmpleadorJson.OtrosNombres}" `

        /** CIERRE DE ETIQUETA */
        this.cerrarEtiqueta(etiquetaString)
    }

    formarTrabajador(TrabajadorJson: Trabajador): void {
        /** ABRE ETIQUETA */
        let etiquetaString = `<Trabajador `

        /** INICIA CON LO REQUERIDO */
        etiquetaString += `TipoTrabajador="${TrabajadorJson.TipoTrabajador}" `
        etiquetaString += `SubTipoTrabajador="${TrabajadorJson.SubTipoTrabajador}" `
        etiquetaString += `AltoRiesgoPension="${TrabajadorJson.AltoRiesgoPension}" `
        etiquetaString += `TipoDocumento="${TrabajadorJson.TipoDocumento}" `
        etiquetaString += `NumeroDocumento="${TrabajadorJson.NumeroDocumento}" `
        etiquetaString += `PrimerApellido="${TrabajadorJson.PrimerApellido}" `
        etiquetaString += `SegundoApellido="${TrabajadorJson.SegundoApellido}" `
        etiquetaString += `PrimerNombre="${TrabajadorJson.PrimerNombre}" `
        etiquetaString += `LugarTrabajoPais="${TrabajadorJson.LugarTrabajoPais}" `
        etiquetaString += `LugarTrabajoDepartamentoEstado="${TrabajadorJson.LugarTrabajoDepartamentoEstado}" `
        etiquetaString += `LugarTrabajoMunicipioCiudad="${TrabajadorJson.LugarTrabajoMunicipioCiudad}" `
        etiquetaString += `LugarTrabajoDireccion="${TrabajadorJson.LugarTrabajoDireccion}" `
        etiquetaString += `SalarioIntegral="${TrabajadorJson.SalarioIntegral}" `
        etiquetaString += `TipoContrato="${TrabajadorJson.TipoContrato}" `
        etiquetaString += `Sueldo="${TrabajadorJson.Sueldo}" `

        /** OPCIONALES */
        if (TrabajadorJson.OtrosNombres) etiquetaString += `OtrosNombres="${TrabajadorJson.OtrosNombres}" `
        if (TrabajadorJson.CodigoTrabajador) etiquetaString += `CodigoTrabajador="${TrabajadorJson.CodigoTrabajador}" `

        /** CIERRE DE ETIQUETA */
        this.cerrarEtiqueta(etiquetaString)
    }

    formarPago(PagoJson: Pago): void {
        /** ABRE ETIQUETA */
        let etiquetaString = `<Pago `

        /** INICIA CON LO REQUERIDO */
        etiquetaString += `Forma="${PagoJson.Forma}" `
        etiquetaString += `Metodo="${PagoJson.Metodo}" `

        /** OPCIONALES */
        if (PagoJson.Banco) etiquetaString += `Banco="${PagoJson.Banco}" `
        if (PagoJson.TipoCuenta) etiquetaString += `TipoCuenta="${PagoJson.TipoCuenta}" `
        if (PagoJson.NumeroCuenta) etiquetaString += `NumeroCuenta="${PagoJson.NumeroCuenta}" `

        /** CIERRE DE ETIQUETA */
        this.cerrarEtiqueta(etiquetaString)
    }

    formarFechasPagos(FechasPagosJson: FechasPagos): void {
        /** ABRE ETIQUETA */
        let etiquetaString = `<FechasPagos>\n<FechaPago>`
        etiquetaString += FechasPagosJson.FechaPago

        /** CIERRE DE ETIQUETA */
        etiquetaString += `</FechaPago>\n</FechasPagos>\n`
        this.XmlString += etiquetaString;
    }

    async formarDevengados(DevengadosJson: Devengados): Promise<void> {
        /** ABRE ETIQUETA */
        let etiquetaString = `<Devengados>\n`

        etiquetaString += await this.formarDevengadoBasico(DevengadosJson.Basico)
        etiquetaString += await this.formarDevengadoTransporte(DevengadosJson.Transporte)
        etiquetaString += await this.formarDevengadoHorasExtras(DevengadosJson.HEDs, 'HED')
        etiquetaString += await this.formarDevengadoHorasExtras(DevengadosJson.HENs, 'HEN')
        etiquetaString += await this.formarDevengadoHorasExtras(DevengadosJson.HRNs, 'HRN')
        etiquetaString += await this.formarDevengadoHorasExtras(DevengadosJson.HEDDFs, 'HEDDF')
        etiquetaString += await this.formarDevengadoHorasExtras(DevengadosJson.HRDDFs, 'HRDDF')
        etiquetaString += await this.formarDevengadoHorasExtras(DevengadosJson.HENDFs, 'HENDF')
        etiquetaString += await this.formarDevengadoHorasExtras(DevengadosJson.HRNDFs, 'HRNDF')
        etiquetaString += await this.formarDevengadoVacaciones(DevengadosJson.Vacaciones)
        etiquetaString += await this.formarDevengadoPrimas(DevengadosJson.Primas)
        etiquetaString += await this.formarDevengadoCesantias(DevengadosJson.Cesantias)
        etiquetaString += await this.formarDevengadoIncapacidades(DevengadosJson.Incapacidades)
        etiquetaString += await this.formarDevengadoLicencias(DevengadosJson.Licencias)
        etiquetaString += await this.formarDevengadoBonificaciones(DevengadosJson.Bonificaciones)
        etiquetaString += await this.formarDevengadoAuxilios(DevengadosJson.Auxilios)
        etiquetaString += await this.formarDevengadoHuelgas(DevengadosJson.HuelgasLegales)
        etiquetaString += await this.formarDevengadoOtrosConceptos(DevengadosJson.OtrosConceptos)
        etiquetaString += await this.formarDevengadoCompensaciones(DevengadosJson.Compensaciones)
        etiquetaString += await this.formarDevengadoBonoEPCTVs(DevengadosJson.BonoEPCTVs)
        etiquetaString += await this.formarElementosSoloValores(DevengadosJson.Comisiones, 'Comisiones', 'Comision')
        etiquetaString += await this.formarElementosSoloValores(DevengadosJson.PagosTerceros, 'PagosTerceros', 'PagosTerceros')
        etiquetaString += await this.formarElementosSoloValores(DevengadosJson.Anticipos, 'Anticipos', 'Anticipo')
        etiquetaString += await this.formarEtiquetaConValor('Dotacion', DevengadosJson.Dotacion)
        etiquetaString += await this.formarEtiquetaConValor('ApoyoSost', DevengadosJson.ApoyoSost)
        etiquetaString += await this.formarEtiquetaConValor('Teletrabajo', DevengadosJson.Teletrabajo)
        etiquetaString += await this.formarEtiquetaConValor('BonifRetiro', DevengadosJson.BonifRetiro)
        etiquetaString += await this.formarEtiquetaConValor('Indemnizacion', DevengadosJson.Indemnizacion)
        etiquetaString += await this.formarEtiquetaConValor('Reintegro', DevengadosJson.Reintegro)

        /** CIERRE DE ETIQUETA */
        etiquetaString += `</Devengados>\n`
        this.XmlString += etiquetaString;
    }

    formarDevengadoBasico(BasicoJson: Basico) {
        /** ABRE ETIQUETA */
        let etiquetaString = `<Basico `

        etiquetaString += `DiasTrabajados="${BasicoJson.DiasTrabajados}" `
        etiquetaString += `SueldoTrabajado="${BasicoJson.SueldoTrabajado}" `

        /** CIERRE DE ETIQUETA */
        etiquetaString += `/>\n`

        return etiquetaString
    }

    formarDevengadoTransporte(TransporteArray: Array<Transporte>) {
        let etiquetaString = ''
        if (TransporteArray && Array.isArray(TransporteArray)) {
            TransporteArray.forEach(element => {
                etiquetaString += '<Transporte '
                if (element.AuxilioTransporte) etiquetaString += `AuxilioTransporte="${element.AuxilioTransporte}" `
                if (element.ViaticoManuAlojS) etiquetaString += `ViaticoManuAlojS="${element.ViaticoManuAlojS}" `
                if (element.ViaticoManuAlojNS) etiquetaString += `ViaticoManuAlojNS="${element.ViaticoManuAlojNS}" `
                etiquetaString += `/> \n`
            });
        }
        return etiquetaString;
    }

    formarDevengadoHorasExtras(HorasExtrasArray: Array<HoraExtra>, nombre: string) {
        let etiquetaString = ''
        if (HorasExtrasArray && Array.isArray(HorasExtrasArray) && HorasExtrasArray.length > 0) {
            etiquetaString += `<${nombre}s>\n`
            HorasExtrasArray.forEach(element => {
                etiquetaString += `<${nombre} `
                etiquetaString += `Cantidad="${element.Cantidad}" `
                etiquetaString += `Porcentaje="${element.Porcentaje}" `
                etiquetaString += `Pago="${element.Pago}" `
                if (element.HoraInicio) etiquetaString += `HoraInicio="${element.HoraInicio}" `
                if (element.HoraFin) etiquetaString += `HoraFin="${element.HoraFin}" `
                etiquetaString += `/> \n`
            });
            etiquetaString += `</${nombre}s>\n`
        }
        return etiquetaString;
    }

    formarDevengadoVacaciones(VacacionesJson: Vacaciones) {
        let etiquetaString = ''

        if (VacacionesJson) {
            etiquetaString += `<Vacaciones>\n`

            if (VacacionesJson.VacacionesComunes && Array.isArray(VacacionesJson.VacacionesComunes) && VacacionesJson.VacacionesComunes.length > 0) {

                VacacionesJson.VacacionesComunes.forEach(element => {
                    etiquetaString += `<VacacionesComunes `
                    etiquetaString += `Cantidad="${element.Cantidad}" `
                    etiquetaString += `Pago="${element.Pago}" `
                    if (element.FechaInicio) etiquetaString += `FechaInicio="${element.FechaInicio}" `
                    if (element.FechaFin) etiquetaString += `FechaFin="${element.FechaFin}" `
                    etiquetaString += `/> \n`
                });

            }

            if (VacacionesJson.VacacionesCompensadas && Array.isArray(VacacionesJson.VacacionesCompensadas) && VacacionesJson.VacacionesCompensadas.length > 0) {

                VacacionesJson.VacacionesCompensadas.forEach(element => {
                    etiquetaString += `<VacacionesCompensadas `
                    etiquetaString += `Cantidad="${element.Cantidad}" `
                    etiquetaString += `Pago="${element.Pago}" `
                    etiquetaString += `/> \n`
                });

            }

            etiquetaString += `</Vacaciones>\n`
        }
        return etiquetaString;
    }

    formarDevengadoPrimas(PrimasJson: Primas) {
        let etiquetaString = ''

        if (PrimasJson) {
            /** ABRE ETIQUETA */
            etiquetaString = `<Primas `

            etiquetaString += `Cantidad="${PrimasJson.Cantidad}" `
            etiquetaString += `Pago="${PrimasJson.Pago}" `

            if (PrimasJson.PagoNS) etiquetaString += `PagoNS="${PrimasJson.PagoNS}" `

            /** CIERRE DE ETIQUETA */
            etiquetaString += `/>\n`
        }
        return etiquetaString
    }

    formarDevengadoCesantias(CesantiasJson: Cesantias) {
        let etiquetaString = ''

        if (CesantiasJson) {
            /** ABRE ETIQUETA */
            etiquetaString = `<Cesantias `

            etiquetaString += `Pago="${CesantiasJson.Pago}" `
            etiquetaString += `Porcentaje="${CesantiasJson.Porcentaje}" `
            etiquetaString += `PagoIntereses="${CesantiasJson.PagoIntereses}" `

            /** CIERRE DE ETIQUETA */
            etiquetaString += `/>\n`
        }
        return etiquetaString
    }

    formarDevengadoIncapacidades(IncapacidadesArray: Array<Incapacidad>) {
        let etiquetaString = ''
        if (IncapacidadesArray && Array.isArray(IncapacidadesArray) && IncapacidadesArray.length > 0) {
            etiquetaString += `<Incapacidades>\n`
            IncapacidadesArray.forEach(element => {
                etiquetaString += '<Incapacidad '
                etiquetaString += `Cantidad="${element.Cantidad}" `
                etiquetaString += `Tipo="${element.Tipo}" `
                etiquetaString += `Pago="${element.Pago}" `

                if (element.FechaInicio) etiquetaString += `FechaInicio="${element.FechaInicio}" `
                if (element.FechaFin) etiquetaString += `FechaFin="${element.FechaFin}" `

                etiquetaString += `/> \n`
            });
            etiquetaString += `</Incapacidades> \n`
        }
        return etiquetaString;
    }

    formarDevengadoLicencias(LicenciasJson: Licencias) {
        let etiquetaString = ''

        if (LicenciasJson) {
            etiquetaString += `<Licencias>\n`

            if (LicenciasJson.LicenciaMP && Array.isArray(LicenciasJson.LicenciaMP) && LicenciasJson.LicenciaMP.length > 0) {
                LicenciasJson.LicenciaMP.forEach(element => {
                    etiquetaString += `<LicenciaMP `
                    etiquetaString += `Cantidad="${element.Cantidad}" `
                    etiquetaString += `Pago="${element.Pago}" `
                    if (element.FechaInicio) etiquetaString += `FechaInicio="${element.FechaInicio}" `
                    if (element.FechaFin) etiquetaString += `FechaFin="${element.FechaFin}" `
                    etiquetaString += `/> \n`
                });
            }

            if (LicenciasJson.LicenciaR && Array.isArray(LicenciasJson.LicenciaR) && LicenciasJson.LicenciaR.length > 0) {
                LicenciasJson.LicenciaR.forEach(element => {
                    etiquetaString += `<LicenciaR `
                    etiquetaString += `Cantidad="${element.Cantidad}" `
                    etiquetaString += `Pago="${element.Pago}" `
                    if (element.FechaInicio) etiquetaString += `FechaInicio="${element.FechaInicio}" `
                    if (element.FechaFin) etiquetaString += `FechaFin="${element.FechaFin}" `
                    etiquetaString += `/> \n`
                });
            }

            if (LicenciasJson.LicenciaNR && Array.isArray(LicenciasJson.LicenciaNR) && LicenciasJson.LicenciaNR.length > 0) {
                LicenciasJson.LicenciaNR.forEach(element => {
                    etiquetaString += `<LicenciaNR `
                    etiquetaString += `Cantidad="${element.Cantidad}" `
                    if (element.FechaInicio) etiquetaString += `FechaInicio="${element.FechaInicio}" `
                    if (element.FechaFin) etiquetaString += `FechaFin="${element.FechaFin}" `
                    etiquetaString += `/> \n`
                });
            }

            etiquetaString += `</Licencias>\n`
        }
        return etiquetaString;
    }

    formarDevengadoBonificaciones(BonificacionesArray: Array<Bonificacion>) {
        let etiquetaString = ''
        if (BonificacionesArray && Array.isArray(BonificacionesArray) && BonificacionesArray.length > 0) {
            etiquetaString += `<Bonificaciones>\n`
            BonificacionesArray.forEach(element => {
                etiquetaString += '<Bonificacion '
                if (element.BonificacionS) etiquetaString += `BonificacionS="${element.BonificacionS}" `
                if (element.BonificacionNS) etiquetaString += `BonificacionNS="${element.BonificacionNS}" `
                etiquetaString += `/> \n`
            });
            etiquetaString += `</Bonificaciones> \n`
        }
        return etiquetaString;
    }

    formarDevengadoAuxilios(AuxiliosArray: Array<Auxilio>) {
        let etiquetaString = ''
        if (AuxiliosArray && Array.isArray(AuxiliosArray) && AuxiliosArray.length > 0) {
            etiquetaString += `<Auxilios>\n`
            AuxiliosArray.forEach(element => {
                etiquetaString += '<Auxilio '
                if (element.AuxilioS) etiquetaString += `AuxilioS="${element.AuxilioS}" `
                if (element.AuxilioNS) etiquetaString += `AuxilioNS="${element.AuxilioNS}" `
                etiquetaString += `/> \n`
            });
            etiquetaString += `</Auxilios> \n`
        }
        return etiquetaString;
    }

    formarDevengadoHuelgas(HuelgasArray: Array<HuelgaLegal>) {
        let etiquetaString = ''
        if (HuelgasArray && Array.isArray(HuelgasArray) && HuelgasArray.length > 0) {
            etiquetaString += `<HuelgasLegales>\n`
            HuelgasArray.forEach(element => {
                etiquetaString += '<HuelgaLegal '
                etiquetaString += `Cantidad="${element.Cantidad}" `
                if (element.FechaInicio) etiquetaString += `FechaInicio="${element.FechaInicio}" `
                if (element.FechaFin) etiquetaString += `FechaFin="${element.FechaFin}" `
                etiquetaString += `/> \n`
            });
            etiquetaString += `</HuelgasLegales> \n`
        }
        return etiquetaString;
    }

    formarDevengadoOtrosConceptos(OtrosConceptosArray: Array<OtroConcepto>) {
        let etiquetaString = ''
        if (OtrosConceptosArray && Array.isArray(OtrosConceptosArray) && OtrosConceptosArray.length > 0) {
            etiquetaString += `<OtrosConceptos>\n`
            OtrosConceptosArray.forEach(element => {
                etiquetaString += '<OtroConcepto '
                etiquetaString += `DescripcionConcepto="${element.DescripcionConcepto}" `
                if (element.ConceptoS) etiquetaString += `ConceptoS="${element.ConceptoS}" `
                if (element.ConceptoNS) etiquetaString += `ConceptoNS="${element.ConceptoNS}" `
                etiquetaString += `/> \n`
            });
            etiquetaString += `</OtrosConceptos> \n`
        }
        return etiquetaString;
    }

    formarDevengadoCompensaciones(CompensacionesArray: Array<Compensacion>) {
        let etiquetaString = ''
        if (CompensacionesArray && Array.isArray(CompensacionesArray) && CompensacionesArray.length > 0) {
            etiquetaString += `<Compensaciones>\n`
            CompensacionesArray.forEach(element => {
                etiquetaString += '<Compensacion '
                etiquetaString += `CompensacionO="${element.CompensacionO}" `
                etiquetaString += `CompensacionE="${element.CompensacionE}" `
                etiquetaString += `/> \n`
            });
            etiquetaString += `</Compensaciones> \n`
        }
        return etiquetaString;
    }

    formarDevengadoBonoEPCTVs(BonosArray: Array<BonoEPCTV>) {
        let etiquetaString = ''
        if (BonosArray && Array.isArray(BonosArray) && BonosArray.length > 0) {
            etiquetaString += `<BonoEPCTVs>\n`
            BonosArray.forEach(element => {
                etiquetaString += '<BonoEPCTV '
                if (element.PagoS) etiquetaString += `PagoS="${element.PagoS}" `
                if (element.PagoNS) etiquetaString += `PagoNS="${element.PagoNS}" `
                if (element.PagoAlimentacionS) etiquetaString += `PagoAlimentacionS="${element.PagoAlimentacionS}" `
                if (element.PagoAlimentacionNS) etiquetaString += `PagoAlimentacionNS="${element.PagoAlimentacionNS}" `
                etiquetaString += `/> \n`
            });
            etiquetaString += `</BonoEPCTVs> \n`
        }
        return etiquetaString;
    }

    formarElementosSoloValores(ElementosArray: Array<any>, ElementoPlural: string, ElementoSingular: string) {
        let etiquetaString = ''
        if (ElementosArray && Array.isArray(ElementosArray) && ElementosArray.length > 0) {
            etiquetaString += `<${ElementoPlural}>\n`
            ElementosArray.forEach(async (Valor) => {
                etiquetaString += await this.formarEtiquetaConValor(ElementoSingular, Valor)
            });
            etiquetaString += `</${ElementoPlural}> \n`
        }
        return etiquetaString;
    }

    formarEtiquetaConValor(Nombre: string, Valor: string) {
        let etiquetaString = ''
        if (Valor) {
            etiquetaString += `<${Nombre}>${Valor}</${Nombre}> \n`
        }
        return etiquetaString;
    }

    async formarDeducciones(DeduccionesJson: Deducciones): Promise<void> {
        /** ABRE ETIQUETA */
        let etiquetaString = `<Deducciones>\n`

        etiquetaString += await this.formarDeduccion(DeduccionesJson.Salud, 'Salud')
        etiquetaString += await this.formarDeduccion(DeduccionesJson.FondoPension, 'FondoPension')
        etiquetaString += await this.formarDeduccionFondoSP(DeduccionesJson.FondoSP)
        etiquetaString += await this.formarDeduccionSindicatos(DeduccionesJson.Sindicatos)
        etiquetaString += await this.formarDeduccionSanciones(DeduccionesJson.Sanciones)
        etiquetaString += await this.formarDeduccionLibranzas(DeduccionesJson.Libranzas)
        etiquetaString += await this.formarElementosSoloValores(DeduccionesJson.PagosTerceros, 'PagosTerceros', 'PagosTerceros')
        etiquetaString += await this.formarElementosSoloValores(DeduccionesJson.Anticipos, 'Anticipos', 'Anticipo')
        etiquetaString += await this.formarElementosSoloValores(DeduccionesJson.OtrasDeducciones, 'OtrasDeducciones', 'OtraDeduccion')
        etiquetaString += await this.formarEtiquetaConValor('PensionVoluntaria', DeduccionesJson.PensionVoluntaria)
        etiquetaString += await this.formarEtiquetaConValor('RetencionFuente', DeduccionesJson.RetencionFuente)
        etiquetaString += await this.formarEtiquetaConValor('AFC', DeduccionesJson.AFC)
        etiquetaString += await this.formarEtiquetaConValor('Cooperativa', DeduccionesJson.Cooperativa)
        etiquetaString += await this.formarEtiquetaConValor('EmbargoFiscal', DeduccionesJson.EmbargoFiscal)
        etiquetaString += await this.formarEtiquetaConValor('PlanComplementarios', DeduccionesJson.PlanComplementarios)
        etiquetaString += await this.formarEtiquetaConValor('Educacion', DeduccionesJson.Educacion)
        etiquetaString += await this.formarEtiquetaConValor('Reintegro', DeduccionesJson.Reintegro)
        etiquetaString += await this.formarEtiquetaConValor('Deuda', DeduccionesJson.Deuda)

        /** CIERRE DE ETIQUETA */
        etiquetaString += `</Deducciones>\n`
        this.XmlString += etiquetaString;
    }

    formarDeduccion(DeduccionJson: Deduccion, Nombre: string) {
        /** ABRE ETIQUETA */
        let etiquetaString = `<${Nombre} `

        etiquetaString += `Porcentaje="${DeduccionJson.Porcentaje}" `
        etiquetaString += `Deduccion="${DeduccionJson.Deduccion}" `

        /** CIERRE DE ETIQUETA */
        etiquetaString += `/>\n`

        return etiquetaString
    }

    formarDeduccionFondoSP(FondoSpJson: FondoSP) {
        let etiquetaString = '';
        if (FondoSpJson) {
            /** ABRE ETIQUETA */
            etiquetaString = `<FondoSP `

            if (FondoSpJson.Porcentaje) etiquetaString += `Porcentaje="${FondoSpJson.Porcentaje}" `
            if (FondoSpJson.DeduccionSP) etiquetaString += `DeduccionSP="${FondoSpJson.DeduccionSP}" `
            if (FondoSpJson.PorcentajeSub) etiquetaString += `PorcentajeSub="${FondoSpJson.PorcentajeSub}" `
            if (FondoSpJson.DeduccionSub) etiquetaString += `DeduccionSub="${FondoSpJson.DeduccionSub}" `

            /** CIERRE DE ETIQUETA */
            etiquetaString += `/>\n`
        }
        return etiquetaString
    }

    formarDeduccionSindicatos(SindicatosArray: Array<Deduccion>) {
        let etiquetaString = ''
        if (SindicatosArray && Array.isArray(SindicatosArray) && SindicatosArray.length > 0) {
            etiquetaString += `<Sindicatos>\n`
            SindicatosArray.forEach(async (element) => {
                etiquetaString += await this.formarDeduccion(element, 'Auxilio');
            });
            etiquetaString += `</Sindicatos>\n`
        }
        return etiquetaString;
    }

    formarDeduccionSanciones(SancionesArray: Array<Sancion>) {
        let etiquetaString = ''
        if (SancionesArray && Array.isArray(SancionesArray) && SancionesArray.length > 0) {
            etiquetaString += `<Sanciones>\n`
            SancionesArray.forEach(element => {
                etiquetaString += `<Sancion `
                etiquetaString += `SancionPublic="${element.SancionPublic}" `
                etiquetaString += `SancionPriv="${element.SancionPriv}" `
                etiquetaString += `/>\n`
            });
            etiquetaString += `</Sanciones>\n`
        }
        return etiquetaString;
    }

    formarDeduccionLibranzas(LibranzasArray: Array<Libranza>) {
        let etiquetaString = ''
        if (LibranzasArray && Array.isArray(LibranzasArray) && LibranzasArray.length > 0) {
            etiquetaString += `<Libranzas>\n`
            LibranzasArray.forEach(element => {
                etiquetaString += `<Libranza `
                etiquetaString += `Descripcion="${element.Descripcion}" `
                etiquetaString += `Deduccion="${element.Deduccion}" `
                etiquetaString += `/>\n`
            });
            etiquetaString += `</Libranzas>\n`
        }
        return etiquetaString;
    }

    cerrarEtiqueta(etiqueta: String): void {
        etiqueta += `/> \n`
        this.XmlString += etiqueta;
    }

}
