import { CollectionConfig } from "payload/types";

const Tags: CollectionConfig =  {
    slug: 'etiquetas',
    access:{
         read: () => true
    },
    admin: {
        useAsTitle: 'Etiqueta',
        defaultColumns:['Etiqueta','EstadoEtiqueta'],
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
            label: 'Nombre Etiqueta',
            type: 'text',
        },
        {
            name: "EstadoEtiqueta", // required
            type: "select", // required
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