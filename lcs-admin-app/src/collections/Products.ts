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

                    name: "SubcategoriaProducto",
                    label: "Subcategoria del Producto",
                    type: 'relationship',
                    relationTo: 'subcategorias',
                    hasMany: false,
                    required: true,
                    filterOptions: ({ relationTo }) => {
                        if (relationTo === 'subcategorias') {
                            const isContainProduct = 'Product';
                            return {
                                TipoCategoriaSubcategoria: {contains: isContainProduct }
                            }
                        } else {
                            return {}
                        }
                    },
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
                    name: "TamanoProducto",
                    type: "select",
                    hasMany: false,
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
            name: "esMarcaProducto",
            type: "checkbox",
            label: "Tiene una Marca?",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si Desea agregar una Marca.'
            }
        },
        {
            name: "MarcaProducto",
            type: "relationship",
            relationTo: 'marcas',
            label: "Marca del Producto",
            required: false,
            admin: {
                condition: ({ esMarcaProducto }) => esMarcaProducto === true,
            }
        },
        {
            name: "esMedidaPesoProducto",
            type: "checkbox",
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
                    name: "UnidadMedidaProducto",
                    type: "select",
                    label: 'Unidad de Medida',
                    hasMany: false,
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
                    name: "AltoProducto",
                    label: "Altura del Producto",
                    type: "number",
                    required: false,
                    admin: {
                        step: 1,
                        width: '33%',
                        placeholder: '0'
                    }
                },
                {
                    name: "AnchoProducto",
                    label: "Ancho del Producto",
                    type: "number",
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
                    name: "UnidadPesoProducto",
                    type: "select",
                    label: 'Unidad de Peso',
                    hasMany: false,
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
                    name: "PesoProducto",
                    label: "Peso del Producto",
                    type: "number",
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
                    name: "ColorProducto",
                    label: "Color del Producto",
                    type: "relationship",
                    relationTo: 'colores',
                    required: false,
                    admin: {
                        width: '40%'
                    }
                },
                {
                    name: "CantidadProducto",
                    label: "Cantidad Disponible",
                    type: "number",
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '0',
                        width: '30%'
                    }
                },
                {
                    name: "PrecioProducto",
                    label: "Precio del Producto",
                    type: "number",
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '$ 0.00',
                        width: '30%'
                    }
                },
            ]
        },
        //example text field colors with prices
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
                              name: "Color", 
                              label: "Color del Producto",
                              type: "relationship", 
                              relationTo: 'colores',
                              required: true,
                              admin: {
                                  width: '33%'
                              }
                          },
                          {
                              name: "Cantidad", 
                              label: "Cantidad Disponible",
                              type: "number", 
                              required: true,
                              admin: {
                                  step: 1,
                                  placeholder: '0',
                                  width: '33%'
                              }
                          },
                          {
                              name: "Precio", 
                              label: "Precio del Producto",
                              type: "number", 
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
                                      name: "Imagen", 
                                      label: "Imagen de Producto",
                                      type: 'upload', 
                                      relationTo: 'imagenes', 
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
                    name: "ImagenProducto",
                    label: "Imagen del Producto",
                    type: 'upload',
                    relationTo: 'imagenes',
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
            name: "EstadoProducto",
            type: "select",
            label: "Estado del Producto",
            hasMany: false,
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
            name: "FechaIngresoProducto",
            type: "date",
            label: "Fecha Ingreso del Producto",
            required: true,
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
            name: "HoraIngresoProducto",
            type: "date",
            label: "Hora Ingreso del Producto",
            required: true,
            admin: {
                position: "sidebar",
                date: {
                    pickerAppearance: 'timeOnly',
                    displayFormat: 'h:mm:ss a',
                },
            }
        },
        {
            name: "UbicacionProducto",
            label: "Ubicaciones Disponibles",
            type: 'relationship',
            relationTo: 'ubicaciones',
            hasMany: true,
            required: true,
            admin: {
                position: 'sidebar',
                description: 'Seleccione Ubicaciones de Distrubucion'
            }
        },
    ],
    timestamps: true,
}

export default Products;