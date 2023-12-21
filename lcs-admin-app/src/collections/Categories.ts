import { CollectionConfig } from "payload/types";

const Categories: CollectionConfig = {
  slug: 'categorias',
  access: {

    read: () => true

    /*  read: ({ req: { user } }) => user.roles.includes("admin"),
 
     create: ({ req: { user } }) => user.roles.includes("admin"),
 
     update: ({ req: { user } }) => user.roles.includes("admin"),
      */
  },
  admin: {
    useAsTitle: 'Categoria',
    defaultColumns: ['Categoria', 'Estado'],
    group: 'INVENTARIO',
    /* hidden: ({ user }) => {
      if (!user.roles.toString().includes('admin')) {
        return true;
      }
    } */
  },
  labels: {
    plural: 'Categorias',
    singular: 'Categoria'
  },
  fields: [
    {

      name: "Categoria", // required
      type: "text", // required
      label: "Nombre de la Categoria",
      required: true,
      unique: true,
      index: true,
      saveToJWT: true,

      admin: {
        placeholder: "Nombre aqui",

      },

    },
    {
      name: "Estado", // required
      label: "Estado de la Categoria",
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
  timestamps: true
}

export default Categories;