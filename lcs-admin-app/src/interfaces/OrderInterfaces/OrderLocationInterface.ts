interface UbicacionInterface {
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
    EstadoUbicacion: string,
    createdAt: string,
    updatedAt: string,
    UbicacionDatos: string
}

type DepartmentType = {
        id: string;
        NombreDepartamento: string;
        EstadoDepartamento: string;
        createdAt: string;
        updatedAt: string;
}

type LocationType = string

export { UbicacionInterface, DepartmentType, LocationType }