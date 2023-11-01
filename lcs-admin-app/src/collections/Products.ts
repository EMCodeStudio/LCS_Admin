import { CollectionConfig } from "payload/types";


const Products: CollectionConfig = {
    slug: 'productos',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'Producto',
        defaultColumns: ['Producto', 'Codigo', 'Precio', 'Cantidad', 'Imagen', 'EstadoProducto'],
        group: 'INVENTARIO'
    },
    labels: {
        singular: 'Producto',
        plural: 'Productos',
    },
    fields: [

        {
            type: 'row',
            fields:[
                {
                    name: 'Producto',
                    label: 'Nombre Producto',
                    type: 'text',
                    required: true,
                    admin:{
                        width:'60%'
                    }
                },
                {
                    name: 'Codigo',
                    label: 'Codigo Producto',
                    type: 'text',
                    required: true,
                    admin:{
                        width:'40%',
                        placeholder: 'SKU'

                    }
                },
            ]
        },
        //example text field
        {
            type: 'row',
            fields: [
                {
                    name: "Precio", // required
                    label: "Precio Producto",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '0',
                        width: '60%'
                    }
                },
                {
                    name: "Cantidad", // required
                    label: "Cantidad Disponible",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '0',
                        width: '40%'
                    }
                },
            ]
        },
        {
            name: "Imagen", // required
            label: "Imagen Producto",
            type: 'upload', // required
            relationTo: 'imagenes', //required eg:users
            required: true
        },
        {
            name: "EstadoProducto", // required
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Nuevo",
                    value: "new",
                },
                {
                    label: "Reacondicionado",
                    value: "reconditioned",
                },
            ],
            defaultValue: 'new',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
    ],

    timestamps: true,
};

export default Products;