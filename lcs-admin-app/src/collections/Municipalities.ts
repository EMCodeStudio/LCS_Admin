import { CollectionConfig } from "payload/types";

const Municipalities: CollectionConfig = {
    slug: 'municipios',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'NombreMunicipio',
        group: 'SISTEMA'
    },
    labels: {
        singular: 'Municipio',
        plural: 'Municipios',
    },
    fields: [
        {
            name: 'NombreMunicipio',
            label: 'Nombre Municipio / Ciudad',
            type: 'text',
            unique: true,
            required: true,
            admin: {
                placeholder: 'Nombre aqui'
            }
        },
    ],
    timestamps: true,
};

export default Municipalities;