import { Application } from "express";

import { procesarNominaElectronica } from "../controllers/aplicationController";

export const cargarRutasNomina = (app: Application): void => {
    
    const nombreRuta = '/api/nomina/'

    app.post(`${nombreRuta}procesar`, procesarNominaElectronica);
};
