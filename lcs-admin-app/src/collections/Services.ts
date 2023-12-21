import { CollectionConfig } from "payload/types";

const Services: CollectionConfig = {
    slug: 'servicios',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'NombreServicio',
        defaultColumns: ['NombreServicio', 'Precio', 'Subcategoria', 'EstadoServicio'],
        group: 'INVENTARIO'
    },
    labels: {
        singular: 'Servicio',
        plural: 'Servicios',
    },
    fields: [
        //example text field
        {
            name: 'NombreServicio',
            label: 'Nombre del Servicio',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: {
                placeholder: 'Nombre aqui'
            }
        },

        {
            type: 'row',
            fields: [
                {

                    name: "Subcategoria", // required
                    label: "Subcategoria del Servicio",
                    type: 'relationship', // required
                    relationTo: 'subcategorias', //required eg:users
                    hasMany: false,
                    required: true,
                    admin: {
                        width: '50%',
                    }
                },
                {
                    name: "Precio", // required
                    label: "Costo del Servicio",
                    type: "number", // required
                    required: false,
                    admin: {
                        step: 1,
                        placeholder: '$ 0.00',
                        width: '50%',
                        description: 'Este Campo es Opcional'

                    }
                },
            ]
        },

        {
            type: 'array',
            name:'ImagenServicio',
            required: true,
            maxRows: 10,
            minRows: 1,
            fields: [
                {
                    name: "Imagen", // required
                    label: "Imagen del Servicio",
                    type: 'upload', // required
                    relationTo: 'imagenes', //required eg:users
                    required: false,
                    hooks: {
                        beforeValidate: [
                            (req): void => {
                                const image = req.data
                                if (image && image.width < 420) {
                                    throw new Error('La Imagen del Servivio debe ser Igual o Mayor a 420px de Ancho')
                                }
                            }
                        ]
                    }
                },
            ]
        },
        {
            name: "EstadoServicio", // required
            label: 'Estado del Servicio',
            type: "select", // required
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Disponible",
                    value: "published",
                },
                {
                    label: "No Disponible",
                    value: "dratf",
                },
            ],
            defaultValue: 'published',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "UbicacionServicio", // required
            label: "Ubicaciones Disponibles",
            type: 'relationship', // required
            relationTo: 'ubicaciones', //required eg:users
            hasMany: true,
            required: false,
            admin: {
                position: 'sidebar'
            }
        },

    ],
    timestamps: true,
};

export default Services;