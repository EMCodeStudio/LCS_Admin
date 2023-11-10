import { CollectionConfig } from "payload/types";

const Orders: CollectionConfig = {
    slug: 'pedidos',
    access: {
        read: () => true,
        delete: () => false

    },
    admin: {
        useAsTitle: 'Pedido',
        defaultColumns: ['CedulaCliente', 'TipoVentaPedido', 'ProductoPedido', 'ServicioPedido', 'CantidadPedido', 'TotalPEdido', 'EstadoPago', 'EstadoPedido', 'FechaPedido', 'FechaEntrega'],
        group: 'VENTAS'
    },
    labels: {
        singular: 'Pedido',
        plural: 'Pedidos',
    },
    fields: [
        //example text field
        {
            name: "CedulaCliente", // required
            label: "Cedula del Cliente",
            type: "relationship", // required
            relationTo: "clientes",
            required: true,
        },
        {
            name: "TipoVentaPedido", // required
            label: "Tipo de Venta",
            type: 'radio', // required
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
            name: "ProductoPedido", // required
            label: "Nombre del Producto",
            type: 'relationship', // required
            relationTo: 'productos', //required eg:users
            hasMany: false,
            required: false,
            admin: {
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
            name: "ServicioPedido", // required
            label: "Nombre del Servicio",
            type: 'relationship', // required
            relationTo: 'servicios', //required eg:users
            hasMany: false,
            required: false,
            admin: {
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
            name: "CantidadPedido", // required
            label: "Cantidad Solicitada",
            type: "number", // required
            required: false,
            admin: {
                placeholder:'0',
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
            name: "TotalPedido", // required
            label: "Precio Total",
            type: "number", // required
            required: false,
            admin: {
                step: 1,
                placeholder: '$ 0.00'
            }
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
        }
    ],
    timestamps: true,
};

export default Orders;