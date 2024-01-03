import { CollectionConfig } from "payload/types";

/*const beforeDuplicate: BeforeDuplicate<Page> = ({ data }) => {
  return {
    ...data,
    title: `${data.title} Copy`,
    uniqueField: data.uniqueField ? `${data.uniqueField}-copy` : '',
  }
}*/


const Categories: CollectionConfig = {
  slug: 'categorias',
  access: {
    read: () => true,
    /*read: ({ req: { user } }) => user.roles.includes("admin"),
     create: ({ req: { user } }) => user.roles.includes("admin"),
     update: ({ req: { user } }) => user.roles.includes("admin"),
    */

  },
  admin: {
    // admin.listSearchableFields: ['NombreCategoria', 'TipoCategoria'],
    useAsTitle: 'NombreCategoria',
    defaultColumns: ['NombreCategoria', 'TipoCategoria', 'EstadoCategoria'],
    group: 'INVENTARIO',
    hideAPIURL: true,
    /* hidden: ({ user }) => {
      if (!user.roles.toString().includes('admin')) {
        return true;
      }
    } */

    /*preview: (doc, { locale }) => {
             if (doc?.slug) {
        return `http://localhost:3000/preview/categorias/${doc.slug}?locale=${locale}`
      }
      return null
    },*/

    /*  livePreview: {
        url: 'http://localhost:3000', // LIVE PREVIEW INDIVIDUALLY
      },*/

    /*livePreview: {
      url: ({ data }) => `${process.env.PAYLOAD_URL}/${data.slug}`
    }*/

  },


  labels: {
    plural: 'Categorias',
    singular: 'Categoria'
  },
  fields: [
    {
      name: "NombreCategoria",
      type: "text",
      label: "Nombre de la Categoria",
      required: true,
      unique: true,
      //  index: true,
      //saveToJWT: true,
      admin: {
        placeholder: "Nombre aqui",
      },
    },
    {
      name: "TipoCategoria",
      label: "Que Incluira esta Categoria?",
      type: 'radio',
      required: false,
      options: [
        {
          label: 'Productos',
          value: 'products',
        },
        {
          label: 'Servicios',
          value: 'services',
        },
      ],
      defaultValue: 'products',
      admin: {
        layout: 'horizontal',
      }
    },

    {
      name: "EstadoCategoria",
      label: "Estado de la Categoria",
      type: "select",
      hasMany: false,
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