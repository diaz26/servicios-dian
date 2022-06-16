import { Application } from "express";

import { guardar, obtener } from "../controllers/empresaController";

export const cargarRutasEmpresa = (app: Application): void => {
    
    const nombreRuta = '/api/empresa/'

    app.post(`${nombreRuta}`, guardar);
    app.get(`${nombreRuta}:_id`, obtener);
};
