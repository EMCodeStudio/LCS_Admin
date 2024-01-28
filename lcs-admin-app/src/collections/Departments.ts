import { CollectionConfig } from "payload/types";
const Departments: CollectionConfig = {
    slug: 'departamentos',
    access: {
        read: () => true,
        update: () => true
    },
    admin: {
        useAsTitle: 'NombreDepartamento',
        group: 'SISTEMA'
    },

    labels: {
        singular: 'Departamento',
        plural: 'Departamentos',
    },
    fields: [
        {
            name: 'NombreDepartamento',
            label: 'Nombre del Departamento',
            type: 'text',
            unique: true,
            required: true,
            admin: {
                placeholder: 'Nombre aqui'
            },
        },
        {
            name: "EstadoDepartamento",
            type: "select",
            label: 'Estado del Departamento',
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
}

export default Departments;