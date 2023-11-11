import { CollectionConfig } from "payload/types";


const Products: CollectionConfig = {
    slug: 'productos',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'Producto',
        defaultColumns: ['Producto', 'Modelo', 'Subcategoria', 'Codigo', 'Tamano', 'esMedidasPeso', 'UnidadMedidas', 'Alto', 'Ancho', 'UnidadPeso', 'Peso', 'Colores', 'Cantidad', 'Precio', 'Imagen', 'Estado', 'FechaIngreso', 'HoraIngreso'],
        group: 'INVENTARIO'
    },
    labels: {
        singular: 'Producto',
        plural: 'Productos',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'Producto',
                    label: 'Nombre del Producto',
                    type: 'text',
                    required: true,
                    unique: true,
                    admin: {
                        width: '50%',
                        placeholder: 'Nombre aqui'
                    }
                },
                {
                    name: 'Modelo',
                    label: 'Modelo del Producto',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                        placeholder: 'Modelo aqui'
                    }
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {

                    name: "Subcategoria", // required
                    label: "Subcategoria del Producto",
                    type: 'relationship', // required
                    relationTo: 'subcategorias', //required eg:users
                    hasMany: false,
                    required: true,
                    admin: {
                        width: '50%',
                    }
                },
                {
                    name: 'Codigo',
                    label: 'Codigo del Producto',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                        placeholder: 'SKU'

                    }
                },


            ]
        },
        {
            name: "Tamano", // required
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
            label: 'Tamaños del Producto',
            options: [
                {
                    label: "Pequeño",
                    value: "small",
                },
                {
                    label: "Mediano",
                    value: "middle",
                },
                {
                    label: "Grande",
                    value: "large",
                },
            ],
            defaultValue: 'small',
            required: false,
        },




        {
            name: "esMedidasPeso", // required
            type: "checkbox", // required
            label: "Medidas y Peso del Producto",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si desea agregar Medidas y Peso al Producto  '
            }
        },

        {
            type: 'row',
            admin:{
                condition: ({esMedidasPeso}) => esMedidasPeso === true
            },
            fields: [
                {
                    name: "UnidadMedidas", // required
                    type: "select", // required
                    hasMany: false, /// set to true if you want to select multiple
                    options: [
                        {
                            label: "m - Metros",
                            value: "meter",
                        },
                        {
                            label: "dc - Decimetros",
                            value: "decimeter",
                        },
                        {
                            label: "cm - Centimetros",
                            value: "centimeter",
                        },
                        {
                            label: "mm - Milimetros",
                            value: "millimeter",
                        },
                    ],
                    defaultValue: 'millimeter',
                    required: false,
                    admin: {
                        width:'40%'
                    }
                },
                {
                    name: "Alto", // required
                    label: "Alto del Producto",
                    type: "number", // required
                    required: false,
                    admin: {
                        step: 1,
                        width:'30%'
                    }
                },
                {
                    name: "Ancho", // required
                    label: "Ancho del Producto",
                    type: "number", // required
                    required: false,
                    admin: {
                        step: 1,
                        width:'30%'
                    }
                },


            ]
        },
        {
            type: 'row',
            admin:{
                condition: ({esMedidasPeso}) => esMedidasPeso === true
            },
            fields: [
                {
                    name: "UnidadPeso", // required
                    type: "select", // required
                    hasMany: false, /// set to true if you want to select multiple
                    options: [
                        {
                            label: "kg - Kilogramo",
                            value: "meter",
                        },
                        {
                            label: "hg - Hectogramo",
                            value: "decimeter",
                        },
                        {
                            label: "dag - Decagramo",
                            value: "centimeter",
                        },
                        {
                            label: "g - Gramo",
                            value: "millimeter",
                        },
                    ],
                    defaultValue: 'millimeter',
                    required: false,
                    admin: {
                        width:'40%'
                    }
                },
                {
                    name: "Peso", // required
                    label: "Peso del Producto",
                    type: "number", // required
                    required: false,
                    admin: {
                        step: 1,
                        width:'30%'
                    }
                },
            ]
        },
        //example text field
        {
            name: 'Colores',
            type: 'array',
            label: 'Detalles del Producto',
            minRows: 1,
            maxRows: 5,
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: "Color", // required
                            label: "Codigo Color",
                            type: "relationship", // required
                            relationTo: 'colores',
                            required: true,
                            admin: {
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
                        {
                            name: "Precio", // required
                            label: "Precio del Producto",
                            type: "number", // required
                            required: true,
                            admin: {
                                step: 1,
                                placeholder: '$ 0.00',
                                width: '50%'
                            }
                        },
                    ]
                },
            ]
        },


        {
            name: "Imagen", // required
            type: "upload", // required
            relationTo: 'imagenes',  //required eg:media
            label: "Imgen de Producto",
            required: true,
            unique: true,
            hooks: {
                beforeValidate: [
                    (req): void => {
                        const image = req.data
                        if (image && image.width < 420) {
                            throw new Error('La Imagen debe ser Igual o Mayor a 420px de Ancho')
                        }
                    }
                ]
            },
            admin: {
                description: 'Sube Imagen de Minimo 420px de ancho',
            }
        },

        {
            name: "Estado", // required
            type: "select", // required
            label: "Estado de Producto",
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
            admin: {
                position: "sidebar",
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy',
                    /*  pickerAppearance: 'timeOnly',
                     displayFormat: 'h:mm:ss a', */
                    /* pickerAppearance: 'monthOnly',
                    displayFormat: 'MMMM yyyy', */
                },
            }
        },
        {
            name: "HoraIngreso", // required
            type: "date", // required
            label: "Hora de Ingreso",
            admin: {
                position: "sidebar",
                date: {
                    pickerAppearance: 'timeOnly',
                    displayFormat: 'h:mm:ss a',
                },
            }
        }
    ],

    timestamps: true,
};

export default Products;