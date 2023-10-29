import { CollectionConfig } from "payload/types";


const Subcategories: CollectionConfig =  {
    slug: 'subcategorias',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Subcategoria',
        defaultColumns: ['Subcategoria'],
        group: 'CONTENIDO'
    },
    labels: {
        singular: 'Subcategoria',
        plural: 'Subcategorias',
    },
    fields: [
        //example text field
        {
            name: 'Subcategoria',
            label: 'Nombre Subcategoria',
            type: 'text',
            required: true,
        },
        {
          name: "Categoria", // required
          label: "Selecione Categoria",
          type: 'relationship', // required
          relationTo:'categorias', //required eg:users
          hasMany: false,
          required: false
        },
        {
            name: "EstadoSubcategoria", // required
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Publica",
                    value: "published",
                },
                {
                    label: "No Publica",
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

export default Subcategories;