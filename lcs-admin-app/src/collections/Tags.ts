import { CollectionConfig } from "payload/types";

const Tags: CollectionConfig =  {
    slug: 'etiquetas',
    access:{
         read: () => true
    },
    admin: {
        useAsTitle: 'Etiqueta',
        defaultColumns:['Etiqueta','Estado'],
        group: 'CONTENIDO'
    },
   labels: {
      singular: 'Etiqueta',
      plural: 'Etiquetas',
    },
    fields: [
        //example text field
        {
            name: 'Etiqueta',
            label: 'Nombre de Etiqueta',
            type: 'text',
            required:true,
            unique: true,
            admin:{
                placeholder:'Nombre de Etiqueta aqui'
            }
        },
        {
            name: "Estado", // required
            type: "select", // required
            label:'Estado de Etiqueta',
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