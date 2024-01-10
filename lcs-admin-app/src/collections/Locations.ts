import { CollectionConfig, FieldHook } from "payload/types";


const formatLocation: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data && data.DepartamentoUbicacion !== undefined && data.MunicipioUbicacion !== undefined) {

            const fieldDeparmentLocationId = data.DepartamentoUbicacion;
            console.log('ID Departamento Ubicacion: ', fieldDeparmentLocationId)
            const fieldMunicipalityLocationId = data.MunicipioUbicacion;
            console.log('ID Municipio Ubicacion: ', fieldMunicipalityLocationId)
            const locationFieldData = data.UbicacionDatos;
            const locationFieldDataOrigin = originalDoc.UbicacionDatos;

            if (locationFieldData !== locationFieldDataOrigin || locationFieldData === undefined) {
                const deparmentResponse = await fetch(`http://localhost:3000/api/departamentos/${fieldDeparmentLocationId}`)
                const municipalityResponse = await fetch(`http://localhost:3000/api/municipios/${fieldMunicipalityLocationId}`)
                if (deparmentResponse.ok && municipalityResponse.ok) {
                    const departmentData = await deparmentResponse.json()
                    const departmentLocation = departmentData.NombreDepartamento;
                    console.log('DATA Departamento Ubicacion: ', departmentLocation)
                    const municipalityData = await municipalityResponse.json()
                    const municipalityName = municipalityData.NombreMunicipio;
                    console.log('DATA Municipio Ubicacion: ', municipalityName)
                    const formatedLocation = `${data.PaisUbicacion} - ${municipalityName} (${departmentLocation})`;
                    console.log('FORMAT Ubicacion: ', formatedLocation)
                    return formatedLocation;
                }
                console.log('NOT Ubicacion ENCONTRADA')
            }
        }
        
    } catch (error) {
        console.log('Error de Consulta de la Ubicacion: ', error);
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
            hasMany: false,
            relationTo: 'municipios',
            unique: true,
            required: true,
            admin: {
                description: 'Seleccione un Municipio o Ciudad.'
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