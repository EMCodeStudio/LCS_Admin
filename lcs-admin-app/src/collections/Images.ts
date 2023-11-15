import { CollectionConfig } from "payload/types";
//import { LinkFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

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
        staticDir: path.resolve(__dirname, '../media'),
    },

    /*  upload: {
         staticURL: '/media',
         staticDir: 'media',
         imageSizes: [
             {
                 name: 'thumbnail',
                 width: 400,
                 height: 300,
                 position: 'centre',
             },
              {
                 name: 'card',
                 width: 768,
                 height: 1024,
                 position: 'centre',
             }, 
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
         adminThumbnail: 'thumbnail',
         mimeTypes: ['image/*'],
         crop: false,
         focalPoint: false
     }, */



    fields: [
        //example text field
        {
            name: 'Imagen',
            label: 'Nombre de la Imagen',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                placeholder: "Nombre de Imagen aqui",
            }
        },
        /* {
            name: 'Descripcion',
            label: 'Descripcion de la Imagen',
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [LinkFeature({})],
            }),
            type: 'richText',
            admin:{
                description: 'Puede darle doble Click al Texto para agregarle un Link.'
            }
        }, */
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