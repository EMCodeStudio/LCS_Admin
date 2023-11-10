import { CollectionConfig } from "payload/types";


const Publications: CollectionConfig = {
    slug: 'publicaciones',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Titulo',
        defaultColumns: ['Titulo', 'TipoVenta', 'Producto', 'Servicio', 'Portada', 'Oferta','Imagenes', 'Descripcion', 'Etiquetas', 'Estado'],
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
            unique:true,
            admin: {
                width: '70%',
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
            label: "Nombre de Producto ",
            type: 'relationship', // required
            relationTo: 'productos', //required eg:users
            hasMany: false,
            admin: {
                condition: (data, siblingData, { user }) => {
                    if (data.Tipo === 'product') {
                        return true
                    } else {
                        return false
                    }
                },
                width: '70%'
            },
        },
        {
            name: "Servicio", // required
            label: "Nombre de Servicio",
            type: 'relationship', // required
            relationTo: 'servicios', //required eg:users
            hasMany: false,
            admin: {
                condition: (data, siblingData, { user }) => {
                    if (data.Tipo === 'service') {
                        return true
                    } else {
                        return false
                    }
                },
                width: '70%'
            }
        },
        {
            name: "Portada", // required
            type: "relationship", // required
            relationTo: 'portadas',  //required eg:media
            label: "Portada de Publicacion",
            required: false,
            admin: {
                width: '70%'
            }
        },
        {
            name: "Oferta", // required
            type: "checkbox", // required
            label: "Publicacion en Oferta?",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si la publicacion es una oferta'
            }
        },
        {
            name: 'Imagenes',
            type: 'array',
            label:'Imagenes de Publicacion',
            minRows: 1,
            maxRows: 5,
            unique:true,
            admin:{
                description:'Sube entre 1 - 5 Imagenes con Minimo 420px de ancho '
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
            label: "Nombre de Etiquetas",
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
            label: 'Estado de Publicacion',
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