import { Application } from "express";

import { procesarFacturacionElectronica } from "../controllers/aplicationController";

export const cargarRutasFacturacion = (app: Application): void => {
    
    const apiName = '/api/facturacion/'

    app.post(`${apiName}process`, procesarFacturacionElectronica);
};

