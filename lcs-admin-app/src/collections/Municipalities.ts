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
        {
            name: "DepartamentoMunicipio", 
            label: "Nombre del Departamento",
            index: true,
            type: 'relationship', 
            relationTo: 'departamentos',
            hasMany: false,
            required: false
        },
    ],
    timestamps: true,
}

export default Municipalities;