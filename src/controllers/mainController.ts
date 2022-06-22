import { iFactory } from "../interfaces/iFactory";
import PeticionNominaModel from "../models/PeticionNomina";
import { nominaFactory } from "../factories/nominaFactory";

export default class mainController {

  public peticion: any;
  public origen: string;
  public id_peticion: number;

  public factory: iFactory;

  constructor(origen: string, id_peticion: number) {
    this.origen = origen;
    this.id_peticion = id_peticion;
  }

  async construirXml() {
    if (this.origen == 'nomina') {
      this.peticion = await PeticionNominaModel.findById(this.id_peticion).populate('Empresa')
      this.factory = new nominaFactory();
    } else if (this.origen == 'facturacion') {

    }

    if (this.peticion !== null) {
      await this.factory.crearXml(this.peticion);
    }
  }

}
