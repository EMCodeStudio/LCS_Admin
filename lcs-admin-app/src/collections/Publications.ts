import { CollectionConfig } from "payload/types";


const Publications: CollectionConfig = {
    slug: 'publicaciones',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Titulo',
        defaultColumns: ['Titulo', 'TipoVenta', 'Producto', 'Servicio', 'Imagenes', 'Descripcion', 'Etiquetas', 'EstadoPublicacion'],
        group: 'CONTENIDO'
    },
    labels: {
        singular: 'Publicacion',
        plural: 'Publicaciones',
    },
    fields: [

        //example text field
        {
            name: 'Titulo',
            label: 'Titulo Publicacion',
            type: 'text',
            required: true,
            admin:{
                width:'70%'
            }

        },
        {
            name: "TipoVenta", // required
            label: "Seleccione Tipo de Venta",
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
            label: "Seleccione un Producto",
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
                width:'70%'
            },
        },
        {
            name: "Servicio", // required
            label: "Seleccione un Servicio",
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
                width:'70%'
            }
        },
        {
            name: "Descripcion", // required
            type: "richText", // required
            label: "Descripcion Publicacion",
            required: true,
        },
        {
            name: "Etiquetas", // required
            label: "Agregue Etiquetas",
            type: 'relationship', // required
            relationTo: 'etiquetas', //required eg:users
            hasMany: true,
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "EstadoPublicacion", // required
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