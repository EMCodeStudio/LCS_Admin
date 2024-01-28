import { CollectionConfig } from "payload/types";
import ClientLocationField from "../components/OrderFields/LocationOrderFields/ClientLocationField";
import { ImagePreviewOrderField } from "../components/OrderFields/ImageOrderField/PreviewImageOrderField";
import ProductServiceLocationField from "../components/OrderFields/LocationOrderFields/ProductServiceLocationField";
import ErrorMessages from "../components/Messages/ErrorMessages";
import ProductStockField from "../components/OrderFields/ProductOrderField/ProdutStockField";
import PriceProdServField from "../components/OrderFields/PriceOrderFields/PriceProdServField";
import QuantityProdField from "../components/OrderFields/QuantityProdField/QuantityProdField";
import TotalOrderField from "../components/OrderFields/PriceOrderFields/TotalOrderField";
import updateProductStock from "../Services/OrderService/UpdateProdStockService";
import { validatedPaymentApproval } from "../hooks/OrderHooks/OrderApprovalHooks";
import PriceShippingField from "../components/OrderFields/PriceOrderFields/PriceShippingField";

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
    hooks: {
        beforeChange: [updateProductStock]
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
                width: '50%'
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
                    index: true,
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
                        {
                            type: 'row',
                            fields: [
                                PriceShippingField,
                                TotalOrderField
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "EstadoPagoPedido",
            type: "select",
            label: 'Estado del Pago',
            hasMany: false,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeChange: [validatedPaymentApproval],
                afterRead: [validatedPaymentApproval]
            },
            options: [
                {
                    label: "Pendiente",
                    value: "pending",
                },
                {
                    label: "Realizado",
                    value: "paid",
                },
                {
                    label: "Cancelado",
                    value: "canceled",
                },
            ],
            defaultValue: 'pending',
            required: false,
        },
        {
            name: "EstadoPedido",
            type: "select",
            label: 'Estado del Pedido',
            hasMany: false,
            admin: {
                position: 'sidebar',
            },
            options: [
                {
                    label: "En Revision",
                    value: "checking",
                },
                {
                    label: "En Proceso",
                    value: "processing",
                },
                {
                    label: "En Envio",
                    value: "shipping",
                },
                {
                    label: "Entregado",
                    value: "delivered",
                },
                {
                    label: "Finalizado",
                    value: "done",
                },
                {
                    label: "Cancelado",
                    value: "canceled",
                },
            ],
            defaultValue: 'checking',
            required: false,
        },
        {
            name: "FechaPedido",
            type: "date",
            label: "Fecha del Pedido",
            localized: true,
            required: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy'
                }
            }
        },
        {
            name: "FechaEntregaPedido",
            type: "date",
            label: "Fecha de Entrega",
            localized: true,
            required: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy'
                }
            }
        },
        {
            name: "EstadoCompraPedido",
            type: "checkbox",
            label: "Cambiar estado de Compra en Aprobado?",
            defaultValue: false,
            admin: {
                position: 'sidebar',
                description: 'Para cambiar el estado de la compra en aprobado, el Pago debe estar Realizado y la Ubicacion debe Coincidir.'
            },
            hooks: {
                beforeChange: [(args) => {

                    if (args.data) {
                        if (args.data.EstadoPagoPedido === 'paid' && args.data.AprobacionEstadoPedido !== 'approved') {
                            return true
                        } else if (args.data.EstadoPagoPedido !== 'paid' && args.data.AprobacionEstadoPedido !== 'approved') {
                            return false
                        } else if (args.data.AprobacionEstadoPedido === 'approved') {
                            return true
                        }
                    }
                }],
            }
        },

        {
            name: "AprobacionEstadoPedido",
            label: "Aprobacion de la Compra:",
            type: 'radio',
            required: false,
            options: [
                {
                    label: 'Aprobado',
                    value: 'approved',
                },
                {
                    label: 'Sin Aprobar',
                    value: 'notApproved',
                },
            ],
            defaultValue: 'notApproved',
            admin: {
                readOnly: true,
                layout: 'horizontal',
                position: 'sidebar',
            },

            hooks: {
                beforeChange: [(args) => {
                    if (args.data && args.data.AprobacionEstadoPedido === 'notApproved') {

                        if (args.data.EstadoCompraPedido === true && args.data.EstadoPagoPedido === 'paid') {

                            const clientLocationData = args.data.UbicacionClientePedido;
                            const getCoincidence = clientLocationData && clientLocationData.includes('Coincidencia');

                            if (getCoincidence === true) {

                                return args.data.AprobacionEstadoPedido = 'approved';

                            } else {

                                return args.data.AprobacionEstadoPedido = 'notApproved';

                            }
                        } else {
                            return args.data.AprobacionEstadoPedido = 'notApproved';
                        }
                    }
                }]
            }
        },

    ],
    timestamps: true,
}

export default Orders;