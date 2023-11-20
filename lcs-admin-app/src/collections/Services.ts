import { CollectionConfig } from "payload/types";

const Services: CollectionConfig = {
    slug: 'servicios',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Servicio',
        defaultColumns:['Servicio','Precio','Subcategoria','Imagen','EstadoServicio'],
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
            index: true,
            admin:{
                placeholder:'Nombre del Servicio aqui'
            }
        },

        {
            type:'row',
            fields:[
                {
        
                    name: "Subcategoria", // required
                    label: "Subcategoria del Servicio",
                    type: 'relationship', // required
                    relationTo: 'subcategorias', //required eg:users
                    hasMany: false,
                    required: true,
                    admin: {
                        width: '50%',
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
            ]
        },
        {
            name: "Imagen", // required
            label: "Imagen del Servicio",
            type: 'upload', // required
            relationTo: 'imagenes', //required eg:users
            required: false
            
        },
        {
            name: "EstadoServicio", // required
            label:'Estado del Servicio',
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Disponible",
                    value: "published",
                },
                {
                    label: "No Disponible",
                    value: "dratf",
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

export default Services;