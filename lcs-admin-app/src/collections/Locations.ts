import payload from "payload"
import { CollectionConfig, FieldHook } from "payload/types"


const formatLocation: FieldHook = async ({ data }) => {
    try {
        if (data) {
            const fieldDeparmentLocationId = data.DepartamentoUbicacion
            const fieldMunicipalityLocationId = data.MunicipioUbicacion
            //console.log('ID DE FIELD DEPARTAMENTO:', fieldDeparmentLocationId)
            //console.log('ID DE FIELD MUNICIPIO:', fieldMunicipalityLocationId)
            const municipalityResponse = payload.findByID({
                collection: "municipios",
                id: fieldMunicipalityLocationId
            })
            //console.log('DATA DE MUNICIPIO:', municipalityResponse)
            let departmentData: string | undefined;
            let municipalityData: string | undefined;
            if (municipalityResponse) {
                municipalityData = String((await municipalityResponse).NombreMunicipio)
                const departamentoAsociado = payload.findByID(
                    {
                        collection: "departamentos",
                        id: fieldDeparmentLocationId
                    })
                //console.log('DATA DE DEPARTAMENTO:', departamentoAsociado)
                if (departamentoAsociado) {
                    departmentData = String((await departamentoAsociado).NombreDepartamento)
                }
            }
            //console.log('NOMBRE DE DEPARTAMENTO:', departmentData)
            //console.log('NOMBRE DE MUNICIPIO:', municipalityData)
            if (departmentData && municipalityData) {
                const formatedLocation = `${data.PaisUbicacion} - ${municipalityData} (${departmentData})`
                return formatedLocation;
            }else{
                //console.log('No se encontro el Departamento o el Municipio!')
            }
        }
    } catch (error) {
        //console.log('Error de Consulta de la Ubicacion de la Funcion formatLocation: ', error)
    }
}


























const Locations: CollectionConfig = {
    slug: 'ubicaciones',
    access: {
        read: () => true,
        update: () => true
    },
    admin: {
        useAsTitle: 'UbicacionDatos',
        defaultColumns: ['UbicacionDatos', 'EstadoUbicacion'],
        group: 'INVENTARIO'
    },

    labels: {
        singular: 'Ubicacion',
        plural: 'Ubicaciones',
    },
    fields: [
        {
            name: "UbicacionDatos",
            type: "text",
            label: "Pais - Municipio / Ciudad (Departamento)",
            required: false,
            access: {
                create: () => false,
                update: () => false
            },
            hooks: {
                beforeChange: [({ siblingData }) => {
                    delete siblingData.UbicacionDatos
                }],

                afterRead: [formatLocation]
            },
            admin: {
                hidden: true,
                readOnly: true
            },
        },
        {
            name: "PaisUbicacion",
            type: "select",
            hasMany: false,
            options: [
                {
                    label: "Colombia",
                    value: "Colombia",
                },

            ],
            defaultValue: 'Colombia',
            required: false,
        },
        {
            name: "DepartamentoUbicacion",
            label: 'Nombre del Departamento',
            type: 'relationship',
            index: true,
            relationTo: "departamentos",
            hasMany: false,
            required: true,
            admin: {
                description: 'Seleccione un Departamento.'
            }
        },
        {
            name: "MunicipioUbicacion",
            type: 'relationship',
            label: 'Nombre de Municipio | Ciudad',
            index: true,
            hasMany: false,
            relationTo: 'municipios',
            unique: true,
            required: true,
            admin: {
                description: 'Seleccione un Municipio o Ciudad.'
            },
            maxDepth: 0,
            filterOptions: ({ data, relationTo }) => {
                if (relationTo === 'municipios') {
                    if (data.DepartamentoUbicacion) {
                        return {
                            DepartamentoMunicipio: { contains: data.DepartamentoUbicacion } //? { exists: true } : { exists: false }
                        }
                    }
                }
            }
        },
        {
            name: "PrecioEnvioUbicacion",
            label: "Costo de Envio",
            type: "number",
            required: true,
            admin: {
                description: "Ingrese el Costo de Envio a esta Ubicacion.",
                step: 1,
                placeholder: "$ 0.00",
            }
        },
        {
            name: "EstadoUbicacion",
            type: "select",
            label: 'Estado de la Ubicacion',
            hasMany: false,
            options: [
                {
                    label: "Disponible",
                    value: "published",
                },
                {
                    label: "No Disponible",
                    value: "draft",
                },
            ],
            defaultValue: 'published',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
    ],
    timestamps: true,
};

export default Locations;