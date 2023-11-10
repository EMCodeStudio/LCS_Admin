import { CollectionConfig } from "payload/types";

const Services: CollectionConfig = {
    slug: 'servicios',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Servicio',
        defaultColumns:['Servicio','Precio','Imagen','Estado'],
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
            name: "Precio", // required
            label: "Precio del Servicio",
            type: "number", // required
            required: false,
            admin: {
                step: 1,
                placeholder: '$ 0.00',
                width: '50%',
                description: 'Este Campo es Opcional'

            }
        },
        {
            name: "Imagen", // required
            label: "Imagen del Servicio",
            type: 'upload', // required
            relationTo: 'imagenes', //required eg:users
            required: false
            
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