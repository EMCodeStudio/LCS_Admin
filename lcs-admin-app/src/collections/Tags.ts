import { CollectionConfig } from "payload/types";

const Tags: CollectionConfig =  {
    slug: 'etiquetas',
    access:{
         read: () => true
    },
    admin: {
        useAsTitle: 'NombreEtiqueta',
        defaultColumns:['NombreEtiqueta','EstadoEtiqutea'],
        group: 'VENTAS'
    },
   labels: {
      singular: 'Etiqueta',
      plural: 'Etiquetas',
    },
    fields: [
        //example text field
        {
            name: 'NombreEtiqueta',
            label: 'Nombre de la Etiqueta',
            type: 'text',
            required:true,
            unique: true,
            admin:{
                placeholder:'Nombre aqui'
            }
        },
        {
            name: "EstadoEtiqutea", 
            type: "select", 
            label:'Estado de la Etiqueta',
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

export default Tags;