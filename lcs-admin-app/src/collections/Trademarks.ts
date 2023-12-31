import { CollectionConfig } from "payload/types";

const Trademarks: CollectionConfig = {
    slug: 'marcas',
    admin: {
        useAsTitle: 'Marca',
        defaultColumns: ['NombreMarca', 'EstadoMarca'],
        group: 'CONTENIDO'
    },
    labels: {
        singular: 'Marca',
        plural: 'Marcas',
    },
    fields: [
       
        {
            name: 'Marca',
            label: 'Nombre de la Marca',
            type: 'text',
        },
        {
            name: "ImagenMarca", 
            type: "upload", 
            relationTo: 'imagenes', 
            label: "Imagen de la Marca",
            required: false,
        },
        {
            name: "EstadoMarca", 
            type: "select", 
            label: "Estado de la Marca",
            hasMany: false, 
            options: [
                {
                    label: "Publica",
                    value: "published",
                },
                {
                    label: "No Publica",
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