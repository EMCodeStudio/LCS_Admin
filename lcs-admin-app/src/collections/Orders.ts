import { CollectionConfig } from "payload/types";

const Orders: CollectionConfig = {
    slug: 'Pedidos',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Pedido',
        defaultColumns: ['Cedula', 'TipoVenta', 'Producto', 'Servicio', 'Cantidad', 'Total', 'EstadoPago', 'EstadoPedido', 'FechaPedido', 'FechaEntrega'],
        group: 'VENTAS'
    },
    labels: {
        singular: 'Pedido',
        plural: 'Pedidos',
    },
    fields: [
        //example text field
        {
            name: "Cedula", // required
            label: "Cedula del Cliente",
            type: "relationship", // required
            relationTo: "clientes",
            required: true,
        },
        {
            name: "Tipo", // required
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
            label: "Nombre del Producto",
            type: 'relationship', // required
            relationTo: 'productos', //required eg:users
            hasMany: false,
            required: false,
            admin: {
                condition: ({ Tipoventa }) => Tipoventa === 'product'
            }
        },
        {
            name: "Servicio", // required
            label: "Nombre del Servicio",
            type: 'relationship', // required
            relationTo: 'servicios', //required eg:users
            hasMany: false,
            required: false,
            admin: {
                condition: ({ Tipoventa }) => Tipoventa === 'service'
            }
        },
        {
            name: "Cantidad", // required
            label: "Cantidad Solicitada",
            type: "number", // required
            required: false,
            admin: {
                step: 1,
                condition: ({ Tipoventa }) => Tipoventa === 'product'
            }
        },
        {
            name: "Total", // required
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
                    label: "Devuelto",
                    value: "delivered",
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
                date: {
                    //Options: dayAndTime, timeOnly, dayOnly
                    pickerAppearance: 'dayAndTime',
                }
            }
        },
        {
            name: "FechaEntrega", // required
            type: "date", // required
            label: "Fecha de Entrega",
            localized: true,
            admin: {
                position: 'sidebar',
                date: {
                    //Options: dayAndTime, timeOnly, dayOnly
                    pickerAppearance: 'dayAndTime',


                }
            }
        }
    ],
    timestamps: true,
};

export default Orders;