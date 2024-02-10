interface UbicacionInterface {
    value: {
        id: string,
        PaisUbicacion: string,
        DepartamentoUbicacion: {
            id: string,
            NombreDepartamento: string,
            createdAt: string,
            updatedAt: string
        },
        MunicipioUbicacion: {
            id: string,
            NombreMunicipio: string,
            createdAt: string,
            updatedAt: string
        },
        PrecioEnvioUbicacion: number,
        EstadoUbicacion: string,
        createdAt: string,
        updatedAt: string,
        UbicacionDatos: string
    }
    relationTo: string
}

interface UbicacionInterfaceProdServ {
        id: string,
        PaisUbicacion: string,
        DepartamentoUbicacion: {
            id: string,
            NombreDepartamento: string,
            createdAt: string,
            updatedAt: string
        },
        MunicipioUbicacion: {
            id: string,
            NombreMunicipio: string,
            createdAt: string,
            updatedAt: string
        },
        PrecioEnvioUbicacion: number,
        EstadoUbicacion: string,
        createdAt: string,
        updatedAt: string,
        UbicacionDatos: string
}


type LocationType = string
type LocationPriceType = number 


export { UbicacionInterface,UbicacionInterfaceProdServ, LocationType, LocationPriceType }