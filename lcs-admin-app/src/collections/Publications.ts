import { CollectionConfig } from "payload/types";


const Publications: CollectionConfig = {
    slug: 'publicaciones',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Titulo',
        defaultColumns: ['Titulo', 'TipoVenta', 'Producto', 'Servicio', 'Oferta', 'Descuento', 'Imagenes', 'Descripcion', 'Etiquetas', 'Estado'],
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
            label: 'Titulo de Publicacion',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                placeholder: 'Titulo de Publicacion aqui'
            }
        },
        {
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
        },
        {
            name: "Oferta", // required
            type: "checkbox", // required
            label: "Publicacion en Oferta?",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si la publicacion es una oferta y rellene el campo de Descuento'
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
                condition: ({ Oferta }) => Oferta === true,
                width: '50%',
            },
            hooks: {
                beforeChange: [
                    ({ data }) => {
                        const twoDigits = /^\d{2}$/;
                        if (twoDigits.test(data.Descuento)) {
                            return data.Descuento
                        }
                        else {
                            return 0
                        }
                    }
                ]
            }
        },
        {
            name: 'Imagenes',
            type: 'array',
            label: 'Imagenes de Publicacion',
            minRows: 1,
            maxRows: 5,
            unique: true,
            admin: {
                description: 'Sube entre 1 - 5 Imagenes con Minimo 420px de ancho '
            },
            fields: [
                {
                    name: "Imagen", // required
                    label: "Imagen de Producto",
                    type: 'upload', // required
                    relationTo: 'imagenes', //required eg:users
                    required: true,
                    hooks: {
                        beforeValidate: [
                            (req): void => {
                                const image = req.data
                                if (image && image.width < 420) {
                                    throw new Error('La Imagen debe ser Igual o Mayor a 420px de Ancho')
                                }
                            }
                        ]
                    }
                }
            ]
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