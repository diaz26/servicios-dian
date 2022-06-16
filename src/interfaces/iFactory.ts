export interface iFactory {
    
    validarData(request: any): void;

    crearXml(request: any): void;

    firmarXml(xml: any): void;

    enviarXml(xml: any): void;
    
}
