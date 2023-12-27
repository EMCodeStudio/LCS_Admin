import { CollectionConfig } from "payload/types";


const Subcategories: CollectionConfig =  {
    slug: 'subcategorias',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'NombreSubcategoria',
        defaultColumns: ['NombreSubcategoria','CategoriaSubcategoria','EstadoSubcategoria'],
        group: 'INVENTARIO'
    },
    labels: {
        singular: 'Subcategoria',
        plural: 'Subcategorias',
    },
    fields: [
        //example text field
        {
            name: 'NombreSubcategoria',
            label: 'Nombre de la Subcategoria',
            type: 'text',
            required: true,
            unique: true,
            admin:{
                placeholder: 'Nombre aqui'
            }
        },
        {
          name: "CategoriaSubcategoria", // required
          label: "Nombre de la Categoria",
          type: 'relationship', // required
          relationTo:'categorias', //required eg:users
          hasMany: true,
          required: true
        },
        {
            name: "EstadoSubcategoria", // required
            type: "select", // required
            label:"Estado de la Subcategoria",
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