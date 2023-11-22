
import { CollectionConfig, FieldHook } from "payload/types";

const handleProductPrice: FieldHook = async({ data }) => {

    if (data && data.ProductoServicio) {
        
        const productId = data.ProductoServicio.value;
        const response = await fetch(`http://localhost:3000/api/productos/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener el Precio del Producto. Código de estado: ${response.status}`);
                }
                return response.json();
            })
            .then(productData => {
                const productName = productData.Precio; 
                return productName;
            })
            .catch(error => {
                console.error('Error al obtener el Ptrcio del Producto:', error);
                return 'No se puede obtener el Precio del Producto.'; 
            });

            return response;
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
            name: "PrecioProducto", // required
            type: "number", // required
            label: "Precio del Producto",
            required: false,
            admin: {
                readOnly: true
            },
            hooks: {
                beforeChange: [({ siblingData }) => {
                    return siblingData.PrecioProducto = undefined
                }],
                afterRead: [handleProductPrice]
            },
        },

    ],
    timestamps: true,
};

export default Orders;