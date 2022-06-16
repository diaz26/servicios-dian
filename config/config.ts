export const config = {
    appConfig: {
        port: process.env.APP_PORT
    },
    dbConfig: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        DBname: process.env.DB_NAME
    },
    proveedor: {
        RazonSocial: process.env.PROV_RAZON_SOCIAL,
        PrimerApellido: process.env.PROV_PRIMER_APELLIDO,
        SegundoApellido: process.env.PROV_SEGUNDO_APELLIDO,
        PrimerNombre: process.env.PROV_PRIMER_NOMBRE,
        OtrosNombres: process.env.PROV_OTROS_NOMBRES,
        NIT: process.env.PROV_NIT,
        DV: process.env.PROV_DV,
        SoftwareID: process.env.PROV_SOFTWARE_ID,
        SoftwareSC: process.env.PROV_SOFTWARE_SC
    }
}
