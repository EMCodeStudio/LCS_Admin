import { CollectionConfig } from "payload/types";

const Images: CollectionConfig = {
    slug: 'imagenes',
    admin: {
        useAsTitle: 'Imagen',
        defaultColumns: ['Imagen', 'Estado'],
        group: 'CONTENIDO'
    },
    labels: {
        singular: 'Imagen',
        plural: 'Imagenes',
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
            /* {
                name: 'Card',
                width: 400,
                height: 300,
                position: 'centre',
            }, */
            {
                name: 'Tablet',
                width: 1024,
                // By specifying `undefined` or leaving a height undefined,
                // the image will be sized to a certain width,
                // but it will retain its original aspect ratio
                // and calculate a height automatically.
                height: undefined,
                position: 'centre',
            },
        ],
        //adminThumbnail: 'Card',
        mimeTypes: ['image/*'],
        crop: false,
        focalPoint: true
    },
    fields: [
        //example text field
        {
            name: 'Imagen',
            label: 'Nombre de Imagen',
            type: 'text',
            required: true,
            admin: {
                placeholder: "Nombre de Imagen aqui",
            }
        },
        {
            name: "Estado", // required
            type: "select", // required
            label: 'Estado de Imagen',
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Disponible",
                    value: "published",
                },
                {
                    label: "No Disponible",
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

export default Images;