import { CollectionConfig } from "payload/types";

const Portraits: CollectionConfig = {
    slug: 'portadas',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Portada',
        defaultColumns: ['NombrePortada', 'ImagenPortada', 'EstadoPortada'],
        group: 'CONTENIDO'
    },
    labels: {
        singular: 'Portada',
        plural: 'Portadas',
    },
    fields: [
        {
            name: "NombrePortada",
            type: "text",
            label: "Nombre de la Portada",
            required: true,
            unique: true,
            admin: {
                placeholder: 'Nombre aqui'
            }
        },
        {
            name: 'ImagenPortada',
            label: 'Imagen de la Portada',
            type: 'upload',
            relationTo: 'imagenes',
            hooks: {
                beforeValidate: [
                    (req): void => {
                        const image = req.data
                        if (image && image.width < 720) {
                            throw new Error('La Imagen debe ser Igual o Mayor a 720px de Ancho')
                        }

                    }
                ]
            }
        },
        {
            name: "EstadoPortada",
            type: "select",
            label: "Estado de la Portada",
            hasMany: false,
            options: [
                {
                    label: "Publico",
                    value: "published",
                },
                {
                    label: "No Publico",
                    value: "draft",
                },
            ],
            defaultValue: 'published',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
    ],
    timestamps: true,
};

export default Portraits;