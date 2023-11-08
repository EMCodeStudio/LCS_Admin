import { CollectionConfig } from "payload/types";

const Services: CollectionConfig = {
    slug: 'servicios',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Servicio',
        defaultColumns:['Servicio','Imagen','Estado'],
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
            label: 'Nombre del Servicio',
            type: 'text',
            required:true,
            unique: true,
            admin:{
                placeholder:'Nombre del Servicio aqui'
            }
        },
        {
            name: "Imagen", // required
            label: "Imagen del Servicio",
            type: 'upload', // required
            relationTo: 'imagenes', //required eg:users
            required: true
        },
        {
            name: "Estado", // required
            label:'Estado del Servicio',
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