import { CollectionConfig, FieldHook } from "payload/types";

/* const getTotalPrice: FieldHook = async ({ data }) => {
    const { CostoProducto, CantidadProducto, PorcentajeIva, CostoEnvio } = data.DetallesPago
    const totalPrice = Math.round(CostoProducto * CantidadProducto * (1 + (PorcentajeIva / 100))) + CostoEnvio;
    return totalPrice;
} */

const Orders: CollectionConfig = {
    slug: '',
    access: {
        read: () => true,
        delete: () => true
    },
    admin: {
        useAsTitle: 'ProductoServicio',
        defaultColumns: ['Cliente', 'TipoVentaPedido', 'ProductoServicio'],
        group: 'VENTAS'
    },
    labels: {
        singular: 'Pedido',
        plural: 'Pedidos',
    },
    fields: [
        //example text field
        {
            name: "Cliente", // required
            label: "Datos del Cliente",
            type: "relationship", // required
            relationTo: "clientes",
            required: true,
        },

        {
            name: 'ProductoServicio',
            type: 'relationship',
            relationTo: ['productos', 'servicios'],
            hasMany:false,
           /*  filterOptions: ({ relationTo, siblingData }) => {
                // returns a Where query dynamically by the type of relationship
                if (relationTo === 'productos') {
                    return {
                        stock: { greater_than: siblingData.Cantidad },
                    }
                }

                if (relationTo === 'servicios') {
                    return {
                        isAvailable: { equals: true },
                    }
                }
            }, */
        },


     /*    {
            type: 'group',
            name: 'DetallesPago',
            label: 'Detalles de Pago',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: "CostoProducto", // required
                            label: "Costo del Producto",
                            type: "number", // required
                            required: false,
                            admin: {
                                width: '50%',
                                placeholder: '$ 0.00',
                                condition: (data, siblingData, { user }) => {
                                    if (data.TipoVentaPedido === 'product') {
                                        return true
                                    } else {

                                        return false
                                    }
                                },
                            }
                        },
                        {
                            name: "CostoServicio", // required
                            label: "Costo del Servicio",
                            type: "number", // required
                            required: false,
                            admin: {
                                width: '50%',
                                placeholder: '$ 0.00',
                                condition: (data, siblingData, { user }) => {
                                    if (data.TipoVentaPedido === 'service') {
                                        return true
                                    } else {
                                        return false
                                    }
                                },
                            }
                        },
                        {
                            name: "CantidadProducto", // required
                            label: "Cantidad Requerida",
                            type: "number", // required
                            required: false,
                            admin: {
                                width: '50%',
                                placeholder: '0',
                                condition: (data, siblingData, { user }) => {
                                    if (data.TipoVentaPedido === 'product') {
                                        return true
                                    } else {
                                        return false
                                    }

                                }
                            }
                        },
                    ]
                },

                {
                    type: 'row',
                    fields: [


                        {
                            name: "CostoEnvio", // required
                            label: "Costo de Envio",
                            type: "number", // required
                            required: false,
                            admin: {
                                width: '50%',
                                placeholder: '$ 0.00',
                                condition: (data, siblingData, { user }) => {
                                    if (data.TipoVentaPedido === 'product') {
                                        return true
                                    } else {
                                        return false
                                    }
                                },
                            }
                        },
                        {
                            name: "PorcentajeIva", // required
                            label: "Porcentaje de IVA",
                            type: "number", // required
                            required: false,
                            admin: {
                                width: '50%',
                                placeholder: '% 00',
                                condition: (data, siblingData, { user }) => {
                                    if (data.TipoVentaPedido === 'product') {
                                        return true
                                    } else {
                                        return false
                                    }
                                },
                            }
                        },
                    ]
                },

                {
                    type: 'row',
                    fields: [
                        {
                            name: "TotalPrice", // required
                            label: "Costo Total",
                            type: "number", // required
                            required: false,
                            access: {
                                create: () => false,
                                update: () => false
                            },
                            hooks: {
                                beforeChange: [({ siblingData }) => {
                                    siblingData.TotalPrice = undefined
                                }],
                                afterRead: [getTotalPrice]
                            },
                            admin: {
                                width: '50%',
                                step: 1,
                                placeholder: '$ 0.00',
                                condition: (data, siblingData, { user }) => {
                                    if (data.TipoVentaPedido === 'product') {
                                        return true
                                    } else {
                                        return false
                                    }
                                },
                            }
                        },
                    ]
                },

            ]
        },
        {
            name: "EstadoPago", // required
            type: "select", // required
            label: 'Estado del Pago',
            hasMany: false, /// set to true if you want to select multiple
            admin: {
                position: 'sidebar',
            },
            options: [
                {
                    label: "Pendiente",
                    value: "pending",
                },
                {
                    label: "Pagado",
                    value: "paid",
                },
                {
                    label: "No Pagado",
                    value: "noPaid",
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
            name: "EstadoPedido", // required
            type: "select", // required
            label: 'Estado del Pedido',
            hasMany: false, /// set to true if you want to select multiple
            admin: {
                position: 'sidebar',
            },
            options: [
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
                    label: "En Devolucion",
                    value: "returning",
                },
                {
                    label: "Devuelto",
                    value: "returned",
                },
                {
                    label: "Cancelado",
                    value: "canceled",
                },

            ],
            defaultValue: 'processing',
            required: false,
        },
        {
            name: "FechaPedido", // required
            type: "date", // required
            label: "Fecha del Pedido",
            localized: true,
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: "FechaEntrega", // required
            type: "date", // required
            label: "Fecha de Entrega",
            localized: true,
            admin: {
                position: 'sidebar',
            }
        } */
    ],
    timestamps: true,
};

export default Orders;