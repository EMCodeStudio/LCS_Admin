import { CollectionConfig } from "payload/types";

const Services: CollectionConfig = {
    slug: 'servicios',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Servicio',
        defaultColumns:['Servicio','Imagen','EstadoServicio'],
        group:'INVENTARIO'
    },
    labels: {
        singular: 'Servicio',
        plural: 'Servicios',
    },
    fields: [
        //example text field
        {
            name: 'Servicio',
            label: 'Nombre Servicio',
            type: 'text',
        },
        {
            name: "Imagen", // required
            label: "Imagen Servicio",
            type: 'upload', // required
            relationTo: 'imagenes', //required eg:users
            required: true
        },
        {
            name: "EstadoServicio", // required
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Disponible",
                    value: "enable",
                },
                {
                    label: "No Disponible",
                    value: "disable",
                },
            ],
            defaultValue: 'enable',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
    ],
    timestamps: true,
};

export default Services;