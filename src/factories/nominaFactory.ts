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
import { Devengados, Basico, Transporte, HoraExtra } from "../models/NominaIndividual/Devengados";


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

        await this.firmarXml(null);
        await this.enviarXml(null);
    }

    async firmarXml(xml: any): Promise<void> {
        await this.firmar();
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
            return etiquetaString;
        }
        return '';
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
            return etiquetaString;
        }
        return '';
    }

    cerrarEtiqueta(etiqueta: String): void {
        etiqueta += `/> \n`
        this.XmlString += etiqueta;
    }

}
