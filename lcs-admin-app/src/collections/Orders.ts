
import { CollectionConfig, FieldHook } from "payload/types";
import ErrorMessages from "../components/Messages/ErrorMessages";


const handleProductServicePrice: FieldHook = async ({ data }) => {
    if (data && data.ProductoServicio.value !== undefined && data.TipoVenta === 'product') {
        const fieldID = data.ProductoServicio.value;
        const productResponse = await fetch(`http://localhost:3000/api/productos/${fieldID}`)
            .then(productResponse => {
                if (!productResponse.ok) {
                    throw new Error(`Error al obtener el Costo del Producto. Código de estado: ${productResponse.status}`);
                }
                return productResponse.json();
            })
            .then(productData => {
                const productName = productData.Precio;
                return productName;
            })
            .catch(error => {
                console.error('Error del Producto:', error);
                return 'No se puede obtener el Costo del Producto.';
                // return '';
            });
        return productResponse ? productResponse : null;
    }
    if (data && data.ProductoServicio.value !== undefined && data.TipoVenta === 'service') {
        const fieldID = data.ProductoServicio.value;
        const serviceResponse = await fetch(`http://localhost:3000/api/servicios/${fieldID}`)
            .then(serviceResponse => {
                if (!serviceResponse.ok) {
                    throw new Error(`Error al obtener el Costo del Servicio. Código de estado: ${serviceResponse.status}`);
                }
                return serviceResponse.json();
            })
            .then(serviceData => {
                const servicePrice = serviceData.Precio;
                return servicePrice;
            })
            .catch(error => {
                console.error('Error del Servicio:', error);
                return 'No se puede obtener el Costo del Servicio.';
                //return '';
            });
        return serviceResponse ? serviceResponse : null;
    }
    return null;
}
const getTotal: FieldHook = async ({ data }) => {

    if (data && data.ProductoServicio.value !== undefined && data.TipoVenta === 'product') {
        const fieldID = data.ProductoServicio.value;
        const productResponse = await fetch(`http://localhost:3000/api/productos/${fieldID}`)
            .then(productResponse => {
                if (!productResponse.ok) {
                    throw new Error(`Error al obtener el Costo del Producto. Código de estado: ${productResponse.status}`);
                }
                return productResponse.json();
            })
            .then(productData => {
                const productPrice = productData.Precio;
                return productPrice;
            })
            .catch(error => {
                console.error('Error del Producto:', error);
                return 'No se puede obtener el Costo del Producto.';
            });
        const { PrecioPS = productResponse, CantidadProducto } = data.DetallesPago;
        console.log('PRECIO: ', PrecioPS)
        const validatePrice = CantidadProducto > 0 ? CantidadProducto * PrecioPS : CantidadProducto + PrecioPS
        const validateDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? validatePrice * (1 - (data.DescuentoPedido / 100)) : validatePrice
        const totalProdPrice = Math.round(validateDiscount);
        console.log('TOTAL PROD: ', totalProdPrice)
        return totalProdPrice;
    }

    if (data && data.ProductoServicio.value !== undefined && data.TipoVenta === 'service') {
        const fieldID = data.ProductoServicio.value;
        const serviceResponse = await fetch(`http://localhost:3000/api/servicios/${fieldID}`)
            .then(serviceResponse => {
                if (!serviceResponse.ok) {
                    throw new Error(`Error al obtener el Costo del Servicio. Código de estado: ${serviceResponse.status}`);
                }
                return serviceResponse.json();
            })
            .then(serviceData => {
                const productPrice = serviceData.Precio;
                return productPrice;
            })
            .catch(error => {
                console.error('Error del Servicio:', error);
                return 'No se puede obtener el Costo del Servicio.';
                // return '';
            });
        const PrecioPS = serviceResponse
        console.log('PRECIO: ', PrecioPS)
        const validateDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? PrecioPS * (1 - (data.DescuentoPedido / 100)) : PrecioPS
        const totalServPrice = Math.round(validateDiscount);
        console.log('TOTAL SERV: ', totalServPrice)
        return totalServPrice;
    }

    return null;

}
const Orders: CollectionConfig = {
    slug: 'pedidos',
    access: {
        read: () => true,
        create: () => true
    },
    admin: {
        useAsTitle: 'producto',
        defaultColumns: ['Cliente', 'TipoVenta', 'ProductoServicio', 'EstadoPago', 'EstadoPedido'],
        group: 'VENTAS'
    },
    labels: {
        singular: 'Pedido',
        plural: 'Pedidos',
    },
    fields: [
        {
            name: 'Cliente',
            /*  label: {es: 'Nombre y Cedula' , en: 'Name and Document'}, */
            label: 'Datos del Cliente',
            type: 'relationship',
            relationTo: 'clientes',
            required: true
        },
        {
            name: "TipoVenta",
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
            name: "ProductoServicio",
            label: "Producto o Servicio",
            type: 'relationship',
            /*  hooks: {
                 beforeChange: [
                   ({ data, value, operation }) => {
                     data.PrecioProducto = typeof value === 'string' ? value.split(' ')[0] : '';
                     return value;
                   },
                 ],
               }, */
            relationTo: ['productos', 'servicios'],
            hasMany: false,
            required: true,
            maxDepth: 0,
            filterOptions: ({ data, relationTo, siblingData, }) => {

                if (relationTo === 'productos') {
                    if (data.TipoVenta === 'product') {
                        console.log('TIPO VENTA:', data.TipoVenta)
                        return {
                            Cantidad: { greater_than_equal: 1 },
                        }
                    }
                    return {
                        NombreProducto: { exists: false },
                    }
                }
                if (relationTo === 'servicios') {
                    if (data.TipoVenta === 'service') {
                        console.log('TIPO VENTA:', data.TipoVenta)
                        return {
                            EstadoServicio: { equals: 'published' }
                        }
                    }
                    return {
                        NombreServicio: { exists: false },
                    }
                }
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: "OfertaPedido", // required
                    label: "Aplicar Descuento?",
                    type: 'radio', // required
                    required: false,
                    options: [ // required
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
                        width: '30%'
                    }
                },
                {
                    name: "DescuentoPedido", // required
                    type: "number", // required
                    label: "% Descuento",
                    required: false,
                    admin: {
                        condition: ({ OfertaPedido }) => OfertaPedido === 'apply',
                        width: '70%'
                    },
                    hooks: {
                        beforeChange: [
                            ({ data }) => {
                                if (data && data.length) {
                                    const twoDigits = /^\d{2}$/;
                                    const discount = data.DescuentoPedido;
                                    if (twoDigits.test(discount)) {
                                        return discount;
                                    }
                                    else {
                                        return 0
                                    }
                                }
                            }
                        ]
                    }
                },
            ]
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
        {
            name: "DetallesPago",
            type: "group",
            label: "Detalles de Pago",
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: "PrecioPS",
                            type: "number",
                            label: "Costo de Venta",
                            required: false,
                            admin: {
                                readOnly: true,
                                width: '50%',
                                placeholder: '$ 0.00',
                            },
                            access: {
                                create: () => false,
                                update: () => false,
                            },
                            hooks: {
                                beforeChange: [({ siblingData }) => {
                                    return siblingData.PrecioPS = undefined
                                }],
                                afterRead: [handleProductServicePrice]
                            },
                        },
                        {
                            name: "CantidadProducto",
                            label: "Cantidad del Producto",
                            type: "number",
                            required: false,
                            defaultValue: 0,
                            admin: {
                                width: '50%',
                                condition: (data, siblingData, { user }) => {
                                    if (data.TipoVenta === 'product') {
                                        return true
                                    } else {
                                        return false
                                    }

                                }
                            }
                        },
                    ],
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: "TotalPrice",
                            label: "$ Total a Pagar",
                            type: "number",
                            required: false,
                            access: {
                                create: () => false,
                                update: () => false
                            },
                            hooks: {
                                beforeChange: [({ siblingData }) => {
                                    siblingData.TotalPrice = undefined
                                }],
                                afterRead: [getTotal]
                            },
                            admin: {
                                width: '100%',
                                step: 1,
                                placeholder: '0.00',

                            }
                        },
                    ]
                }

            ],
        },
        {
            name: "EstadoPago",
            type: "select",
            label: 'Estado de Pago',
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
            defaultValue: 'processing',
            required: false,
        },
        {
            name: "FechaPedido",
            type: "date",
            label: "Fecha del Pedido",
            localized: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy'
                }
            }
        },
        {
            name: "FechaEntrega",
            type: "date",
            label: "Fecha de Entrega",
            localized: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy'
                }
            }
        }
    ],
    timestamps: true,
};

export default Orders;