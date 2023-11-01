import { CollectionConfig } from "payload/types";

const Categories: CollectionConfig = {
    slug: 'categorias',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'Categoria',
        defaultColumns: ['Categoria', 'EstadoCategoria'],
        group: 'INVENTARIO'
    },
    labels: {
        plural: 'Categorias',
        singular: 'Categoria'
    },
    fields: [
        {
            name: "Categoria", // required
            type: "text", // required
            label: "Nombre Categoria",
            required: true,
        },
        {
          name: "EstadoCategoria", // required
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
          defaultValue:'published',
          required: false,
          admin:{
            position:'sidebar'
          }
        },
    ],
    timestamps: true
}

export default Categories;