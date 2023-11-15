import { CollectionConfig } from "payload/types";


const Products: CollectionConfig = {
    slug: 'productos',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'Producto',
        defaultColumns: ['Producto', 'Modelo', 'Subcategoria', 'Codigo', 'Tamano', 'esMarca', 'Marca', 'esMedidasPeso', 'UnidadMedidas', 'Alto', 'Ancho', 'UnidadPeso', 'Peso', 'Colores', 'Cantidad', 'Precio', 'Imagenes', 'Estado', 'FechaIngreso', 'HoraIngreso'],
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
                        width: '33%',
                    }
                },
                {
                    name: 'Codigo',
                    label: 'Codigo del Producto',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '33%',
                        placeholder: 'SKU'

                    }
                },

                {
                    name: "Tamano", // required
                    type: "select", // required
                    hasMany: false, /// set to true if you want to select multiple
                    label: 'Tamaño del Producto',
                    admin: {
                        width: '33%',
                    },
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
            ]
        },
        {
            name: "esMarca", // required
            type: "checkbox", // required
            label: "Marca del Producto",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si desea agregar la Marca del Producto.'
            }
        },
        {
            name: "Marca", // required
            type: "relationship", // required
            relationTo: 'marcas',
            label: "Marca del Producto",
            required: false,
            admin: {
                condition: ({ esMarca }) => esMarca === true,
                width: '50%'
            }
        },
        {
            name: "esMedidasPeso", // required
            type: "checkbox", // required
            label: "Medidas y Peso del Producto",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si desea agregar Medidas y Peso al Producto.'
            }
        },
        {
            type: 'row',
            admin: {
                condition: ({ esMedidasPeso }) => esMedidasPeso === true
            },
            fields: [
                {
                    name: "UnidadMedidas", // required
                    type: "select", // required
                    label: 'Unidad de Medida',
                    hasMany: false, /// set to true if you want to select multiple
                    options: [
                        {
                            label: "(m) Metros",
                            value: "meter",
                        },
                        {
                            label: "(dc) Decimetros",
                            value: "decimeter",
                        },
                        {
                            label: "(cm) Centimetros",
                            value: "centimeter",
                        },
                        {
                            label: "(mm) Milimetros",
                            value: "millimeter",
                        },
                    ],
                    defaultValue: 'millimeter',
                    required: false,
                    admin: {
                        width: '33%'
                    }
                },
                {
                    name: "Alto", // required
                    label: "Alto del Producto",
                    type: "number", // required
                    required: false,
                    admin: {
                        step: 1,
                        width: '33%',
                        placeholder: '0'
                    }
                },
                {
                    name: "Ancho", // required
                    label: "Ancho del Producto",
                    type: "number", // required
                    required: false,
                    admin: {
                        step: 1,
                        width: '33%',
                        placeholder: '0'
                    }
                },


            ]
        },
        {
            type: 'row',
            admin: {
                condition: ({ esMedidasPeso }) => esMedidasPeso === true
            },
            fields: [
                {
                    name: "UnidadPeso", // required
                    type: "select", // required
                    label: 'Unidad de Peso',
                    hasMany: false, /// set to true if you want to select multiple
                    options: [
                        {
                            label: "(kg) Kilogramo",
                            value: "meter",
                        },
                        {
                            label: "(hg) Hectogramo",
                            value: "decimeter",
                        },
                        {
                            label: "(dag) Decagramo",
                            value: "centimeter",
                        },
                        {
                            label: "(g) Gramo",
                            value: "millimeter",
                        },
                    ],
                    defaultValue: 'millimeter',
                    required: false,
                    admin: {
                        width: '50%'
                    }
                },
                {
                    name: "Peso", // required
                    label: "Peso del Producto",
                    type: "number", // required
                    required: false,
                    admin: {
                        step: 1,
                        width: '50%',
                        placeholder: '0'
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
                            label: "Color del Producto",
                            type: "relationship", // required
                            relationTo: 'colores',
                            required: true,
                            admin: {
                                width: '33%'
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
                                width: '33%'
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
                                width: '33%'
                            }
                        },


                    ],
                },
                
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'Imagenes',
                            type: 'array',
                            label: 'Imagenes del Producto',
                            minRows: 1,
                            maxRows: 5,
                            unique: true,
                            admin: {
                                description: 'Sube entre 1 - 5 Imagenes con Minimo 420px de ancho ',
                                width: '100%'
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
                    ]
                },
            ],
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