import payload from "payload";
import { CollectionConfig, FieldHook } from "payload/types";


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
            label: 'Nombre y Cedula',
            type: 'relationship',
            relationTo: 'clientes',
            validate: async (val, { operation }) => {
                if (operation !== 'create') {
                    // skip validation on update
                    return true
                }
                const response = await fetch(`http://localhost:3000/api/clientes/${val}`)
                if (response.ok) {
                    return true
                }

                return 'Nombre y Cedula no Corresponde con ningun Cliente.'
            },
        },
        {
            name: "ProductoServicio", // required
            label: "Producto o Servicio",
            type: 'relationship', // required
            relationTo: ['productos', 'servicios'], //required eg:users
            hasMany: false,
            required: false,
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
            name: "CantidadProducto", // required
            label: "Cantidad Requrida",
            type: "number", // required
            min: 0,
            required: false,
            admin: {
                step: 1,
            }
        },
    ],
    timestamps: true,
};

export default Orders;