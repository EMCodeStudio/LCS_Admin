import { CollectionConfig, FieldHook } from "payload/types";


const formatLocation: FieldHook = async ({ data }) => (
    `${data.PaisUbicacion} - ${data.MunicipioUbicacion} (${data.DepartamentoUbicacion})`
)

const Locations: CollectionConfig = {
    slug: 'ubicaciones',
    access: {
        read: () => true,
        update: () => true
    },
    admin: {
        useAsTitle: 'UbicacionDatos',
        defaultColumns: ['UbicacionDatos', 'EstadoUbicacion'],
        group: 'SISTEMA'
    },

    labels: {
        singular: 'Ubicacion',
        plural: 'Ubicaciones',
    },
    fields: [

        {
            name: "UbicacionDatos",
            type: "text",
            label: "Pais - Departamento - Municipio / Ciudad",
            required: false,
            admin: {
                hidden: true
            },
            access: {
                create: () => false,
                update: () => false
            },
            hooks: {
                beforeChange: [({ siblingData }) => {
                    siblingData.Ubicacion = undefined
                }],
                afterRead: [formatLocation]
            }
        },

        {
            name: "Pais",
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
            type: 'relationship',
            relationTo: "departamentos",
            hasMany: false,
            required: false,
            admin: {
                description: 'Seleccione un Departameto '
            }
        },
        {
            name: "MunicipioUbicacion",
            type: 'relationship',
            label: 'Municipio | Ciudad',
            hasMany: false,
            relationTo: 'municipios',
            required: false,
            admin: {
                description: 'Selecciones un Municipio o Ciudad'
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