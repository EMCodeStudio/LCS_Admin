import { CollectionConfig, FieldHook } from "payload/types";

/*const formatLocation: FieldHook = async ({ data }) => (
 `${data.PaisUbicacion} - ${data.MunicipioUbicacion} (${data.DepartamentoUbicacion})`
)
*/

const formatLocation: FieldHook = async ({ data }) => {

    // `${data.PaisUbicacion} - ${data.MunicipioUbicacion} (${data.DepartamentoUbicacion})`

    if (data && data.DepartamentoUbicacion !== undefined || data && data.DepartamentoUbicacion !== undefined) {
        try {

            const fieldID1 = data.DepartamentoUbicacion
            const deparmentResponse = await fetch(`http://localhost:3001/api/departamentos/${fieldID1}`)

            const fieldID2 = data.MunicipioUbicacion
            const municipalityResponse = await fetch(`http://localhost:3001/api/municipios/${fieldID2}`)

            if (!deparmentResponse.ok) {
                throw new Error(`Error al obtener el Departamento. Código de estado: ${deparmentResponse.status}`)
            }
            if (!municipalityResponse.ok) {
                throw new Error(`Error al obtener el Municipio. Código de estado: ${municipalityResponse.status}`)
            }

            const departmentData = await deparmentResponse.json()
            const departmentName = departmentData.NombreDepartamento;

            const municipalityData = await municipalityResponse.json()
            const municipalityName = municipalityData.NombreMunicipio;

            return `${data.PaisUbicacion} - ${municipalityName} (${departmentName})`;

        } catch (error) {
            console.error('Error de Consulta de la Ubicacion:', error);
            return 'No se puede obtener la Ubicacion.';
        }
    }

    return null;

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