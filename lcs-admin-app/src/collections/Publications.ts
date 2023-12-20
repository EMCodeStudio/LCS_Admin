import { CollectionConfig } from "payload/types";
import ErrorMessages from "../components/Messages/ErrorMessages";

const Publications: CollectionConfig = {
    slug: 'publicaciones',

    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Titulo',
        defaultColumns: ['Titulo', 'TipoVenta', 'ProductoServicio', 'Estado'],
        group: 'VENTAS',
    },
    labels: {
        singular: 'Publicacion',
        plural: 'Publicaciones',
    },
    fields: [
        //example text field
        {
            name: 'Titulo',
            label: 'Titulo de Publicacion',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                placeholder: 'Titulo de Publicacion aqui'
            }
        },
        /*  {
             name: "TipoVenta", // required
             label: "Tipo de Venta",
             type: 'radio', // required
             required: true,
             options: [ // required
                 {
                     label: 'Producto',
                     value: 'product',
                 },
                 {
                     label: 'Servicio',
                     value: 'service',
                 },
             ],
             defaultValue: 'product',
             admin: {
                 layout: 'horizontal',
             }
         },
         {
             name: "Producto", // required
             label: "Nombre del Producto ",
             type: 'relationship', // required
             relationTo: 'productos', //required eg:users
             hasMany: false,
             admin: {
                 condition: (data, siblingData, { user }) => {
                     if (data.TipoVenta === 'product') {
                         return true
                     } else {
                         return false
                     }
                 },
 
             },
         },
         {
             name: "Servicio", // required
             label: "Nombre del Servicio",
             type: 'relationship', // required
             relationTo: 'servicios', //required eg:users
             hasMany: false,
             admin: {
                 condition: (data, siblingData, { user }) => {
                     if (data.TipoVenta === 'service') {
                         return true
                     } else {
                         return false
                     }
                 },
 
             }
         }, */
        {
            name: "TipoVenta",
            label: "Tipo de Venta",
            type: 'radio',
            required: false,
            options: [
                {
                    label: 'Producto',
                    value: 'product',
                },
                {
                    label: 'Servicio',
                    value: 'service',
                },
            ],
            defaultValue: 'product',
            admin: {
                layout: 'horizontal',
            }
        },
        {
            name: "ProductoServicio",
            label: "Producto o Servicio",
            type: 'relationship',
            relationTo: ['productos', 'servicios'],
            hasMany: false,
            required: true,
            maxDepth: 0,
            filterOptions: ({ data, relationTo, siblingData, }) => {

                if (relationTo === 'productos') {
                    if (data.TipoVenta === 'product') {

                        return {
                            Cantidad: { greater_than_equal: 1 },
                        }
                    }
                    return {
                        NombreProducto: { exists: false },
                    }
                }
                if (relationTo === 'servicios') {
                    if (data.TipoVenta === 'service') {
                        return {
                            EstadoServicio: { equals: 'published' }
                        }
                    }
                    return {
                        NombreServicio: { exists: false },
                    }
                }
            },
        },
        {
            name: "esOferta", // required
            type: "checkbox", // required
            label: "Oferta de la Publicacion",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si la publicacion estara en oferta y rellene el campo de Descuento.'
            }
        },
        {
            name: "Descuento", // required
            label: "Descuento de la Publicacion", // required
            type: "number", // required
            required: false,
            admin: {
                step: 1,
                placeholder: '% 00',
                condition: ({ esOferta }) => esOferta === true,
                width: '50%',
            },
            hooks: {
                beforeChange: [
                    ({ data }) => {
                        if (data && data.length) {
                            const twoDigits = /^\d{2}$/;
                            const discount = data.Descuento;
                            if (twoDigits.test(discount)) {
                                return discount
                            }
                            else {
                                return 0
                            }
                        }
                    }
                ]
            }
        },
        {
            name: 'ErrorMessage',
            type: 'ui',
            admin: {
                condition: ({ Descuento }) => Descuento >= 100,
                components: {
                    Field: ({ data }) => ErrorMessages({ ...data, message: 'Debe Ingresar Numeros de 0 a 99.', showError: true }),

                }
            },

        },
        {
            name: "Descripcion", // required
            type: "richText", // required
            label: "Descripcion de Publicacion",
            required: true,
        },
        {
            name: "Etiquetas", // required
            label: "Nombres de Etiquetas",
            type: 'relationship', // required
            relationTo: 'etiquetas', //required eg:users
            hasMany: true,
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "Estado", // required
            label: 'Estado de la Publicacion',
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Disponible",
                    value: "published",
                },
                {
                    label: "No Disponible",
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
export default Publications;