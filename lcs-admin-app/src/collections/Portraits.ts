import { CollectionConfig } from "payload/types";

const Portraits: CollectionConfig = {
    slug: 'portadas',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'Portada',
        defaultColumns: ['Portada', 'Imagen', 'Estado'],
        group: 'CONTENIDO'
    },
    labels: {
        singular: 'Portada',
        plural: 'Portadas',
    },
    fields: [
        //example text field
        {
            name: "Portada", // required
            type: "text", // required
            label: "Nombre de Portada",
            required: true,
            unique:true,
            admin: {
                placeholder: 'Nombre de Portada aqui'
            }
        },
        {
            name: 'Imagen',
            label: 'Imagen de Portada',
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
            name: "Estado", // required
            type: "select", // required
            label: "Estado de Portada",
            hasMany: false, /// set to true if you want to select multiple
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