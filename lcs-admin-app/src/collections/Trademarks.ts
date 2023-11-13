import { CollectionConfig } from "payload/types";

const Trademarks: CollectionConfig = {
    slug: 'marcas',
    admin: {
        useAsTitle: 'Marca',
        defaultColumns: ['Marca', 'Imagen', 'Estado'],
        group: 'CONTENIDO'
    },
    labels: {
        singular: 'Marca',
        plural: 'Marcas',
    },
    fields: [
        //example text field
        {
            name: 'Marca',
            label: 'Nombre de la Marca',
            type: 'text',
        },
        {
            name: "Imagen", // required
            type: "upload", // required
            relationTo: 'imagenes',  //required eg:media
            label: "Imagen de la Marca",
            required: false,
        },
        {
            name: "Estado", // required
            type: "select", // required
            label: "Estado de la Marca",
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

export default Trademarks;