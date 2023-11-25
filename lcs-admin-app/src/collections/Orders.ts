
import { CollectionConfig, FieldHook } from "payload/types";


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
                // return '';
            });

        const { PrecioPS = productResponse, CantidadProducto, CostoEnvio } = data.DetallesPago;
        console.log('PRECIO: ', PrecioPS)
        /* const totalPrice = Math.round(CostoProducto * CantidadProducto * (1 + (PorcentajeIva / 100))) + CostoEnvio; */   
        const totalPrice = Math.round((CantidadProducto * PrecioPS) + CostoEnvio);
        console.log('TOTAL: ', totalPrice)
        return totalPrice;
    }
}

const Orders: CollectionConfig = {
    slug: 'pedidos',
    access: {
        read: () => true,
        create: () => true
    },
    admin: {
        useAsTitle: 'producto',
        defaultColumns: ['Cliente', 'ProductoServicio'],
        group: 'VENTAS'
    },
    labels: {
        singular: 'Pedido',
        plural: 'Pedidos',
    },
    fields: [
        //example text field
        {
            name: 'Cliente',
            /*  label: {es: 'Nombre y Cedula' , en: 'Name and Document'}, */
            label: 'Identificacion del Cliente',
            type: 'relationship',
            relationTo: 'clientes',
        },
        {
            name: "TipoVenta", // required
            label: "Tipo de Venta",
            type: 'radio', // required
            required: false,
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
            name: "ProductoServicio", // required
            label: "Producto o Servicio",
            type: 'relationship', // required
            /*  hooks: {
                 beforeChange: [
                   ({ data, value, operation }) => {
                     data.PrecioProducto = typeof value === 'string' ? value.split(' ')[0] : '';
                     return value;
                   },
                 ],
               }, */
            relationTo: ['productos', 'servicios'], //required eg:users
            hasMany: false,
            required: false,
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


            name: "DetallesPago", // required
            type: "group", // required
            label: "Detalles de Pago",


            fields: [ // required

                {
                    type: 'row',
                    fields: [
                        {
                            name: "PrecioPS", // required
                            type: "number", // required
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
                            name: "CantidadProducto", // required
                            label: "Cantidad del Producto",
                            type: "number", // required
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
                    admin: {
                        condition: (data, siblingData, { user }) => {
                            if (data.TipoVenta === 'product') {
                                return true
                            } else {
                                return false
                            }
                        },
                    },
                    fields: [
                        {
                            name: "CostoEnvio", // required
                            label: "Costo de Envio",
                            type: "number", // required
                            required: false,
                            admin: {
                                width: '50%',
                                placeholder: '$ 0.00',

                            }
                        },
                        {
                            name: "TotalPrice", // required
                            label: " Total a Pagar",
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
                                afterRead: [getTotal]
                            },
                            admin: {
                                width: '50%',
                                step: 1,
                                placeholder: '$ 0.00',
                                /*  condition: (data, siblingData, { user }) => {
                                     if (data.TipoVenta === 'product') {
                                         return true
                                     } else {
                                         return false
                                     }
                                 }, */
                            }
                        },
                    ]
                }
            ],
        },
    ],
    timestamps: true,
};

export default Orders;