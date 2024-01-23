import { CollectionConfig } from "payload/types";
import ClientLocationField from "../components/OrderFields/LocationOrderFields/ClientLocationField";
import { ImagePreviewOrderField } from "../components/OrderFields/ImageOrderField/PreviewImageOrderField";
import ProductServiceLocationField from "../components/OrderFields/LocationOrderFields/ProductServiceLocationField";
import ErrorMessages from "../components/Messages/ErrorMessages";
import ProductStockField from "../components/OrderFields/ProductOrderField/ProdutStockField";
import PriceProdServField from "../components/OrderFields/PriceOrderFields/PriceProdServField";
import QuantityProdField from "../components/OrderFields/QuantityProdField/QuantityProdField";
import TotalOrderField from "../components/OrderFields/PriceOrderFields/TotalOrderField";

const Orders: CollectionConfig = {
    slug: 'pedidos',
    labels: {
        singular: 'Pedido',
        plural: 'Pedidos',
    },
    admin: {
        useAsTitle: 'ClientePedido',
        defaultColumns: ['ClienteIdPedido', 'TipoVentaPedido', 'ProductoServicioPedido', 'EstadoPagoPedido', 'EstadoPedido'],
        group: 'VENTAS',
    },
    /*endpoints: [
      {
        path: '/:id/tracking',
        method: 'get',
        handler: async (req, res, next) => {
          const tracking = await getTrackingInfo(req.params.id)
          if (tracking) {
            res.status(200).send({ tracking })
          } else {
            res.status(404).send({ error: 'not found' })
          }
        },
      },
    ],*/
    fields: [
        {
            name: 'ClienteIdPedido',
            label: 'Datos del Cliente',
            type: 'relationship',
            relationTo: 'clientes',
            required: true,
            admin: {
                description: 'Seleccion un busque un Cliente de la lista',
            }
        },
        {
            name: "TipoVentaPedido",
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
            type: 'row', fields: [
                {
                    name: "ProductoServicioPedido",
                    label: "Productos - Servicios",
                    type: 'relationship',
                    required: true,
                    relationTo: ['productos', 'servicios'],
                    hasMany: false,
                    maxDepth: 0,
                    filterOptions: ({ data, relationTo }) => {
                        if (relationTo === 'productos') {
                            if (data.TipoVentaPedido === 'product') {
                                return {
                                    CantidadProducto: { greater_than_equal: 1 },
                                }
                            }
                            return {
                                NombreProducto: { exists: false },
                            }
                        }
                        if (relationTo === 'servicios') {
                            if (data.TipoVentaPedido === 'service') {
                                return {
                                    EstadoServicio: { equals: 'published' },
                                }
                            }
                            return {
                                NombreServicio: { exists: false },
                            }
                        }
                    },
                    admin: {
                        description: 'Seleccione un Producto o Servicio de la Lista',
                        width: '50%',
                    }
                },
                ImagePreviewOrderField,
            ]
        },
        {
            type: 'row',
            fields: [
                ProductServiceLocationField,
                ClientLocationField,
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: "OfertaPedido",
                            label: "Aplicar Descuento?",
                            type: 'radio',
                            required: false,
                            options: [
                                {
                                    label: 'Si',
                                    value: 'apply',
                                },
                                {
                                    label: 'No',
                                    value: 'noApply',
                                },
                            ],
                            defaultValue: 'noApply',
                            admin: {
                                layout: 'horizontal',
                                width: '50%'
                            },
                            /*
                            hooks: {
                                beforeChange: [(args) => {
                                    if (args.data && args.data.AprobacionEstadoPedido !== args.originalDoc.AprobacionEstadoPedido) {
                                        return args.data.OfertaPedido = args.originalDoc.OfertaPedido;
                                    }
                                }],
                            }
                            */
                        },
                        {
                            name: "DescuentoPedido",
                            type: "number",
                            label: "% Descuento %",
                            required: false,
                            admin: {
                                condition: ({ OfertaPedido }) => OfertaPedido === 'apply',
                                width: '50%',
                                placeholder: '0'
                            },
                            hooks: {
                                beforeChange: [(args) => {
                                    const twoDigits = /^\d{2}$/;
                                    if (args.data && args.data.DescuentoPedido !== undefined) {
                                        const discount = args.data.DescuentoPedido;
                                        if (!twoDigits.test(discount)) {
                                            return args.data.DescuentoPedido = 0;
                                        }
                                    }
                                }]
                            }
                        },
                        {
                            name: 'ErrorMessage',
                            type: 'ui',
                            admin: {
                                condition: ({ DescuentoPedido }) => DescuentoPedido >= 100,
                                width: '100%',
                                components: {
                                    Field: ({ data }) => ErrorMessages({ ...data, message: 'Debe Ingresar Numeros de 1 a 99.', showError: true }),
                                }
                            },
                        },
                    ]
                },
                ProductStockField
            ]
        },

        {
            name: "DetallesPagoPedido",
            type: "group",
            label: "Detalles de Pago",
            fields: [
                {
                    type: 'row',
                    fields: [
                        PriceProdServField,
                        QuantityProdField
                    ]
                },
                {
                    type: 'row',
                    fields: [
                        TotalOrderField
                    ]
                }

            ]
        }
    ],
    timestamps: true,
}

export default Orders;