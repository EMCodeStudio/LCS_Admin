import { CollectionConfig, FieldHook } from "payload/types";

/*const formatLocation: FieldHook = async ({ data }) => (
 `${data.PaisUbicacion} - ${data.MunicipioUbicacion} (${data.DepartamentoUbicacion})`
)
*/

const formatLocation: FieldHook = async ({ data }) => {
    try {
        if (data) {
            const fieldID1 = data.DepartamentoUbicacion
            const fieldID2 = data.MunicipioUbicacion
            const deparmentResponse = await fetch(`http://localhost:3001/api/departamentos/${fieldID1}`)
            const municipalityResponse = await fetch(`http://localhost:3001/api/municipios/${fieldID2}`)
            if (!deparmentResponse.ok) {
                throw new Error(`Error al obtener el Departamento y Municipio. Código de estado: ${deparmentResponse.status}`)
            }
            if (!municipalityResponse.ok) {
                throw new Error(`Error al obtener el Municipio. Código de estado: ${deparmentResponse.status}`)
            }
            const departmentData = await deparmentResponse.json()
            const departmentLocation = departmentData.NombreDepartamento;
            const municipalityData = await municipalityResponse.json()
            const municipalityName = municipalityData.NombreMunicipio;
            return `${data.PaisUbicacion} - ${municipalityName} (${departmentLocation})`;
        }
    } catch (error) {
        console.log('Error de Consulta de la Ubicacion:', error);
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
                    siblingData.UbicacionDatos = undefined
                }],
                afterRead: [formatLocation]
            },
            admin: {
                hidden: true
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
            required: false,
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
            required: false,
            admin: {
                description: 'Selecciones un Municipio o Ciudad.'
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