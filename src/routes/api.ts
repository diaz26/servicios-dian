import { Application } from "express";

import { cargarRutasEmpresa } from "./empresa";
import { cargarRutasFacturacion } from "./facturacion";
import { cargarRutasNomina } from "./nomina";

export const loadApiEndpoints = (app: Application): void => {

    // company
    cargarRutasEmpresa(app)

    // nomina
    cargarRutasNomina(app)

    // facturacion
    cargarRutasFacturacion(app)

};
