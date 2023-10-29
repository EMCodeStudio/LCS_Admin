import { CollectionConfig } from "payload/types";

const Images: CollectionConfig = {
    slug: 'imagenes',
    admin: {
        useAsTitle: 'Imagen',
        defaultColumns: ['Imagen', 'EstadoImagen'],
        group: 'CONTENIDO'
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
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
        //adminThumbnail: 'Original',
        mimeTypes: ['image/*'],
        crop: true,
        focalPoint: true
    },
    labels: {
        singular: 'Imagen',
        plural: 'Imagenes',
    },
    fields: [
        //example text field
        {
            name: 'Imagen',
            label: 'Nombre Imagen',
            type: 'text',
        },
        {
            name: "EstadoImagen", // required
            type: "select", // required
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