import { CollectionConfig } from "payload/types";
import colorField from "../components/Products/SelectColor";

const Colors: CollectionConfig = {
  slug: 'colores',
  admin: {
    useAsTitle: 'NombreColor',
    defaultColumns: ['NombreClor','SeleccionColor', 'EstadoColor'],
    group: 'CONTENIDO'
  },
  labels: {
    singular: 'Color',
    plural: 'Colores',
  },
  fields: [
    {
      name: 'NombreColor',
      label: 'Nombre del Color',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: 'Color aqui',
        width: '50%'
      }
    },
    colorField,
    {
      name: "EstadoColor",
      type: "select",
      label: 'Estado del Color',
      hasMany: false,
      admin: {
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
      defaultValue: 'published',
      required: false,
    },
  ],

  timestamps: true,
};

export default Colors;