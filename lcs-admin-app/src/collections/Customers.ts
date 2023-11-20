import { CollectionConfig, FieldHook } from "payload/types";


const formatCedulaNombre: FieldHook = async ({ data }) => (
    `${data.Nombre} ${data.Apellidos} - ${data.Cedula}`
)

const Customers: CollectionConfig = {
    slug: 'clientes',
    access: {
        read: () => true,
        update: () => true
    },
    admin: {
        useAsTitle: 'CedulaNombre',
        defaultColumns: ['Cedula', 'Nombre', 'Apellidos'],
        group: 'VENTAS'
    },
    labels: {
        singular: 'Cliente',
        plural: 'Clientes',
    },
    
    fields: [
        //example text field
        {
            name: "CedulaNombre", // required
            type: "text", // required
            label: 'Cedula - Nombre y Apellidos',
            required: false,
            hooks: {
                beforeChange: [({ siblingData }) => {
                    siblingData.CedulaNombre = undefined;
                }],
                afterRead: [formatCedulaNombre,]
            },
            access: {
                create: () => false,
                update: () => false
            },
            admin: {
                hidden: true,
            }
        },

        {
            name: 'Cedula',
            label: 'Cedula del Cliente',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                placeholder: 'Cedula aqui'
            }
        },
        {
            name: 'Nombre',
            label: 'Nombre del Cliente',
            type: 'text',
            required: true,
            admin: {
                placeholder: 'Nombre aqui'
            }
        },
        {
            name: 'Apellidos',
            label: 'Apellidos del Cliente',
            type: 'text',
            required: true,
            admin: {
                placeholder: 'Apellidos aqui'
            }
        },
    ],

    timestamps: true,
};

export default Customers;