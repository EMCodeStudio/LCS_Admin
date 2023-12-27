import { CollectionConfig } from "payload/types";

const Services: CollectionConfig = {
    slug: 'servicios',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'NombreServicio',
        defaultColumns: ['NombreServicio', 'PrecioServicio', 'SubcategoriaServicio', 'EstadoServicio'],
        group: 'INVENTARIO'
    },
    labels: {
        singular: 'Servicio',
        plural: 'Servicios',
    },
    fields: [
        
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

                    name: "SubcategoriaServicio", 
                    label: "Subcategoria del Servicio",
                    type: 'relationship', 
                    relationTo: 'subcategorias', 
                    hasMany: false,
                    required: true,
                    admin: {
                        width: '50%',
                    }
                },
                {
                    name: "PrecioServicio", 
                    label: "Costo del Servicio",
                    type: "number", 
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
            name:'ImagenesServicio',
            required: true,
            maxRows: 10,
            minRows: 1,
            fields: [
                {
                    name: "ImagenServicio", 
                    label: "Imagen del Servicio",
                    type: 'upload', 
                    relationTo: 'imagenes', 
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
            name: "EstadoServicio", 
            label: 'Estado del Servicio',
            type: "select", 
            hasMany: false, 
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
            name: "UbicacionServicio", 
            label: "Ubicaciones Disponibles",
            type: 'relationship', 
            relationTo: 'ubicaciones', 
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