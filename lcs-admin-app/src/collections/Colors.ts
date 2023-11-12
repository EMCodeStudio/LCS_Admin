import { CollectionConfig } from "payload/types";
import colorField from "../components/Products/SelectColor";

const Colors: CollectionConfig = {
    slug: 'colores',
    admin: {
        useAsTitle: 'Nombre',
        defaultColumns: ['Nombre','Color'],
        group: 'INVENTARIO'
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
                placeholder: 'Nombre aqui'
            }
        },

        colorField,
       
    ],

    timestamps: true,
};

export default Colors;