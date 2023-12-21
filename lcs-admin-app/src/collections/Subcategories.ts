import { CollectionConfig } from "payload/types";


const Subcategories: CollectionConfig =  {
    slug: 'subcategorias',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Subcategoria',
        defaultColumns: ['Subcategoria','Categoria','Estado'],
        group: 'INVENTARIO'
    },
    labels: {
        singular: 'Subcategoria',
        plural: 'Subcategorias',
    },
    fields: [
        //example text field
        {
            name: 'Subcategoria',
            label: 'Nombre de la Subcategoria',
            type: 'text',
            required: true,
            unique: true,
            admin:{
                placeholder: 'Nombre aqui'
            }
        },
        {
          name: "Categoria", // required
          label: "Nombre de la Categoria",
          type: 'relationship', // required
          relationTo:'categorias', //required eg:users
          hasMany: true,
          required: true
        },
        {
            name: "Portada", // required
            type: "relationship", // required
            relationTo: 'portadas',  //required eg:media
            label: "Portada de la Subcategoria",
            required: false,
        },
        {
            name: "Estado", // required
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