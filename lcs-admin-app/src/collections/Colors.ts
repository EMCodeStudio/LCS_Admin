import { CollectionConfig } from "payload/types";

const Colors: CollectionConfig = {
    slug: 'colores',
    admin: {
        useAsTitle: 'Nombre',
        defaultColumns:['Nombre','Color'],
        group:'INVENTARIO'
    },
   labels: {
      singular: 'Color',
      plural: 'Colores',
    },
    fields: [
        //example text field
        {
            name: 'Nombre',
            label: 'Nombre del Color',
            type: 'text',
            required: true,
            unique:true,
            admin:{
                placeholder: 'Nombre aqui'
              }
        },
        {
          name: "Color", // required
          type: "text", // required
          label: "Codigo del Color",
          required: true,
          admin:{
            placeholder: 'Codigo aqui'
          }
        },
        
    ],
   
    timestamps: true,
};

export default Colors;