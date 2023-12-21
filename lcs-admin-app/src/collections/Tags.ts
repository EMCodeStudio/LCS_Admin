import { CollectionConfig } from "payload/types";

const Tags: CollectionConfig =  {
    slug: 'etiquetas',
    access:{
         read: () => true
    },
    admin: {
        useAsTitle: 'Etiqueta',
        defaultColumns:['Etiqueta','Estado'],
        group: 'VENTAS'
    },
   labels: {
      singular: 'Etiqueta',
      plural: 'Etiquetas',
    },
    fields: [
        //example text field
        {
            name: 'Etiqueta',
            label: 'Nombre de la Etiqueta',
            type: 'text',
            required:true,
            unique: true,
            admin:{
                placeholder:'Nombre aqui'
            }
        },
        {
            name: "Estado", // required
            type: "select", // required
            label:'Estado de la Etiqueta',
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

export default Tags;