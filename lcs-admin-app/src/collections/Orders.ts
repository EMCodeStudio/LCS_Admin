import { CollectionConfig } from "payload/types";

const Orders: CollectionConfig = {
    slug: 'pedidos',
    access: {
        read: () => true,
        create: () => true
    },
    admin: {
        useAsTitle: 'Cliente',
        defaultColumns: ['Cliente','ProductoServicio'],
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
            label: 'Cedula y Nombre',
            type: 'relationship',
            relationTo: 'clientes'
        },

        {
          name: "ProductoServicio", // required
          label: "Producto o Servicio",
          type: 'relationship', // required
          relationTo:['productos','servicios'], //required eg:users
          hasMany: false,
          required: false
        },
        
    ],
    timestamps: true,
};

export default Orders;