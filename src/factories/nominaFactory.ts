import { iFactory } from "../interfaces/iFactory";
import { XmlModel } from "../libs/xmlModel"

export class nominaFactory extends XmlModel implements iFactory {

    validarData(peticion: any): void {
        console.log('validando')
    }

    async crearXml(peticion: any): Promise<void> {
        await this.validarData(peticion);
        console.log('creando')
        await this.firmarXml(null);
        await this.enviarXml(null);
    }

    async firmarXml(xml: any): Promise<void> {
        console.log('firmando')
        await this.firmar();
    }

    async enviarXml(xml: any): Promise<void> {
        console.log('enviando')
        await this.enviar();
    }

}
