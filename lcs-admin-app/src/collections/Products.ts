
import { CollectionConfig, FieldHook } from "payload/types";

const Products: CollectionConfig = {
    slug: 'productos',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'NombreProducto',
        defaultColumns: ['NombreProducto', 'ColorProducto', 'CantidadProducto', 'PrecioProducto'],
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
                    name: 'NombreProducto',
                    label: 'Nombre del Producto',
                    type: 'text',
                    required: true,
                    unique: true,
                    index: true,
                    admin: {
                        width: '70%',
                        placeholder: 'Nombre aqui'
                    }
                },
                {
                    name: 'ModeloProducto',
                    label: 'Modelo del Producto',
                    type: 'text',
                    required: false,
                    admin: {
                        width: '30%',
                        placeholder: 'Modelo aqui'
                    }
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {

                    name: "SubcategoriaProducto", // required
                    label: "Subcategoria del Producto",
                    type: 'relationship', // required
                    relationTo: 'subcategorias', //required eg:users
                    hasMany: false,
                    required: true,
                    admin: {
                        width: '40%',
                    }
                },
                {
                    name: 'CodigoProducto',
                    label: 'Codigo del Producto',
                    type: 'text',
                    required: false,
                    admin: {
                        width: '30%',
                        placeholder: 'SKU'

                    }
                },

                {
                    name: "TamanoProducto", // required
                    type: "select", // required
                    hasMany: false, /// set to true if you want to select multiple
                    label: 'Tamaño del Producto',
                    admin: {
                        width: '30%',
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
            name: "esMarcaProducto", // required
            type: "checkbox", // required
            label: "Tiene una Marca?",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si Desea agregar una Marca.'
            }
        },
        {
            name: "MarcaProducto", // required
            type: "relationship", // required
            relationTo: 'marcas',
            label: "Marca del Producto",
            required: false,
            admin: {
                condition: ({ esMarcaProducto }) => esMarcaProducto === true,
            }
        },
        {
            name: "esMedidaPesoProducto", // required
            type: "checkbox", // required
            label: "Tiene Medidas y Peso?",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si Desea agregar Medidas y Peso.'
            }
        },
        {
            type: 'row',
            admin: {
                condition: ({ esMedidaPesoProducto }) => esMedidaPesoProducto === true
            },
            fields: [
                {
                    name: "UnidadMedidaProducto", // required
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
                    name: "AltoProducto", // required
                    label: "Altura del Producto",
                    type: "number", // required
                    required: false,
                    admin: {
                        step: 1,
                        width: '33%',
                        placeholder: '0'
                    }
                },
                {
                    name: "AnchoProducto", // required
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
                condition: ({ esMedidasPesoProducto }) => esMedidasPesoProducto === true
            },
            fields: [
                {
                    name: "UnidadPesoProducto", // required
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
                    name: "PesoProducto", // required
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

        {
            type: 'row',
            fields: [
                {
                    name: "ColorProducto", // required
                    label: "Color del Producto",
                    type: "relationship", // required
                    relationTo: 'colores',
                    required: false,
                    admin: {
                        width: '40%'
                    }
                },
                {
                    name: "CantidadProducto", // required
                    label: "Cantidad Disponible",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '0',
                        width: '30%'
                    }
                },
                {
                    name: "PrecioProducto", // required
                    label: "Precio del Producto",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '$ 0.00',
                        width: '30%'
                    }
                },
            ]
        },
        //example text field
        /*   {
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
                              label: 'Imagen del Producto',
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
          } */
        {
            type: 'array',
            name: 'ImagenesProducto',
            required: true,
            maxRows: 10,
            minRows: 1,
            fields: [
                {
                    name: "ImagenProducto", // required
                    label: "Imagen del Producto",
                    type: 'upload', // required
                    relationTo: 'imagenes', //required eg:users
                    required: true,
                    hooks: {
                        beforeValidate: [
                            (req): void => {
                                const image = req.data
                                if (image && image.width < 420) {
                                    throw new Error('La Imagen del Producto debe ser Igual o Mayor a 420px de Ancho')
                                }
                            }
                        ]
                    }
                },
            ]
        },
        {
            name: "EstadoProducto", // required
            type: "select", // required
            label: "Estado del Producto",
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
            name: "FechaIngresoProducto", // required
            type: "date", // required
            label: "Fecha Ingreso del Producto",
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
            name: "HoraIngresoProducto", // required
            type: "date", // required
            label: "Hora Ingreso del Producto",
            admin: {
                position: "sidebar",
                date: {
                    pickerAppearance: 'timeOnly',
                    displayFormat: 'h:mm:ss a',
                },
            }
        },
        {
            name: "UbicacionProducto", // required
            label: "Ubicaciones Disponibles",
            type: 'relationship', // required
            relationTo: 'ubicaciones', //required eg:users
            hasMany: true,
            required: false,
            admin: {
                position: 'sidebar',
                description: 'Seleccione Ubicaciones de Distrubucion'
            }
        },
    ],
    timestamps: true,
};

export default Products;