
import { CollectionConfig, FieldHook } from "payload/types";


const handleProductPrice: FieldHook = async ({ data }) => {
    if (data && data.ProductoServicio) {
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
}

const handleServicePrice: FieldHook = async ({ data }) => {
    if (data && data.ProductoServicio) {
        const fieldID = data.ProductoServicio.value;
        const serviceResponse = await fetch(`http://localhost:3000/api/servicios/${fieldID}`)
            .then(serviceResponse => {
                if (!serviceResponse.ok) {
                    throw new Error(`Error al obtener el Costo del Servicio. Código de estado: ${serviceResponse.status}`);
                }
                return serviceResponse.json();
            })
            .then(serviceData => {
                const serviceName = serviceData.Precio;
                return serviceName;
            })
            .catch(error => {
                console.error('Error del Servicio:', error);
                return 'No se puede obtener el Costo del Servicio.';
                //return '';
            });
        return serviceResponse ? serviceResponse : null;
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
            label: 'Nombre y Cedula',
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
            
            filterOptions: ({ relationTo, siblingData, }) => {
                if (relationTo === 'productos') {
                    return {
                        Cantidad: { greater_than_equal: 1 },
                    }
                }
                if (relationTo === 'servicios') {
                    return {
                        EstadoServicio: { equals: 'published' }
                    }
                }
            },
        },

        {
            name: "DetallePago", // required
            type: "group", // required
            label: "Detalles de Pago",
            fields: [ // required
                {
                    name: "PrecioProducto", // required
                    type: "number", // required
                    label: "Costo del Producto",
                    required: false,
                    admin: {
                        readOnly: true,
                        width: '50%'
                    },
                    hooks: {
                        beforeChange: [({ siblingData }) => {
                            return siblingData.PrecioProducto = undefined
                        }],
                        afterRead: [handleProductPrice]
                    },
                },
                {
                    name: "PrecioServicio", // required
                    type: "number", // required
                    label: "Costo del Servicio",
                    required: false,
                    admin: {
                        readOnly: true,
                        width: '50%'
                    },
                    hooks: {
                        beforeChange: [({ siblingData }) => {
                            return siblingData.PrecioProducto = undefined
                        }],
                        afterRead: [handleServicePrice]
                    },
                },

            ],
        },




    ],
    timestamps: true,
};

export default Orders;