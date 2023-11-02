import { CollectionConfig } from "payload/types";


const Products: CollectionConfig = {
    slug: 'productos',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'Producto',
        defaultColumns: ['Producto', 'Modelo', 'Codigo', 'Precio', 'Cantidad', 'Imagen', 'EstadoProducto', 'FechaIngreso'],
        group: 'INVENTARIO'
    },
    labels: {
        singular: 'Producto',
        plural: 'Productos',
    },
    fields: [
        {
            name: 'Producto',
            label: 'Nombre Producto',
            type: 'text',
            required: true,
            admin: {
                width: '50%'
            }
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'Modelo',
                    label: 'Modelo Producto',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%'
                    }
                },
                {
                    name: 'Codigo',
                    label: 'Codigo Producto',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                        placeholder: 'SKU'

                    }
                },
            ]
        },
        //example text field
        {
            type: 'row',
            fields: [
                {
                    name: "Precio", // required
                    label: "Precio Producto",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '0',
                        width: '50%'
                    }
                },
                {
                    name: "Cantidad", // required
                    label: "Cantidad Disponible",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '0',
                        width: '50%'
                    }
                },
            ]
        },
        {
            name: 'Imagenes',
            type: 'array',
            minRows: 1,
            maxRows: 5,
            fields: [
                {
                    name: "Imagen", // required
                    label: "Imagen Producto",
                    type: 'upload', // required
                    relationTo: 'imagenes', //required eg:users
                    required: true,
                    hooks: {
                        beforeValidate: [
                            (req): void => {
                                const image = req.data
                                if (image && image.width < 720) {
                                    throw new Error('La Imagen debe ser Igual o Mayor a 720px de Ancho')
                                }
                            }
                        ]
                    }
                }
            ]
        },
        {
            name: "EstadoProducto", // required
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Nuevo",
                    value: "new",
                },
                {
                    label: "Reacondicionado",
                    value: "reconditioned",
                },
            ],
            defaultValue: 'new',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "FechaIngreso", // required
            type: "date", // required
            label: "Fecha de Ingreso",
            //defaultValue: '1988-11-05T8:00:00.000+05:00',
            admin: {
                date: {
                    //Options: dayAndTime, timeOnly, dayOnly
                    pickerAppearance: 'dayAndTime',
                },
                position: "sidebar"
            }
        }
    ],

    timestamps: true,
};

export default Products;