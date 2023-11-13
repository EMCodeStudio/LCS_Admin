import { CollectionConfig } from "payload/types";
import colorField from "../components/Products/SelectColor";

const Colors: CollectionConfig = {
    slug: 'colores',
    admin: {
        useAsTitle: 'Nombre',
        defaultColumns: ['Nombre','Color','Estado'],
        group: 'CONTENIDO'
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
            unique: true,
            admin: {
                placeholder: 'Color aqui',
                width:'50%'
            }
        },
        colorField,
        {
          name: "Estado", // required
          type: "select", // required
          label:'Estado del Color',
          hasMany: false, /// set to true if you want to select multiple,
          admin:{
            position: 'sidebar'
          },
          options: [
            {
              label: "Disponible",
              value: "published",
            },
            {
              label: "No Didponible",
              value: "draft",
            },
          ],
          defaultValue:'published',
          required: false,
        },
    ],

    timestamps: true,
};

export default Colors;