import { CollectionConfig, FieldHook } from "payload/types";


const formatLocation: FieldHook = async ({ data }) => (
    `${data.Pais} - ${data.Municipio} (${data.Departamento})`
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
        //example text field

        {
            name: "UbicacionDatos", // required
            type: "text", // required
            label: "Datos de Ubicacion",
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
            name: "Pais", // required
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
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
            name: "Departamento", // required
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Bolivar",
                    value: "Bolivar",
                },

            ],
            defaultValue: 'Bolivar',
            required: false,
        },
        {
            name: "Municipio", // required
            type: "select", // required
            label: "Nombre del Municiopio",
            required: false,
            options: [
                {
                    label: 'Turbaco',
                    value: 'Turbaco',
                },
                {
                    label: 'Cartagena de Indias',
                    value: 'Cartagena',
                }
            ],
            defaultValue: 'Turbaco',

        },
        {
            name: "EstadoUbicacion", // required
            type: "select", // required
            label: 'Estado de la Ubicacion',
            hasMany: false, /// set to true if you want to select multiple
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