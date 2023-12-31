import { CollectionConfig } from "payload/types";
const PQR: CollectionConfig = {
    slug: 'pqrs',
    labels: {
        singular: 'PQR',
        plural: 'PQRs',
    },
    admin: {
        useAsTitle: 'AsuntoPQR',
        defaultColumns: ['AsuntoPQR', 'PreguntaCliente', 'RespuestaEmpresa', 'EstadoPQR'],
        group: 'SISTEMA'
    },
    fields: [
        {
            name: "AsuntoPQR",
            type: "select",
            hasMany: false,
            options: [
                {
                    label: "Informacion",
                    value: "information",
                },
                {
                    label: "Peticiones",
                    value: "requests",
                },
                {
                    label: "Quejas",
                    value: "complaints",
                },
                {
                    label: "Reclamos",
                    value: "claims",
                },
            ],
            defaultValue: 'Informacion',
            required: false,
        },
        {
            name: "PreguntaCliente",
            type: "text",
            label: "Titulo de la Pregunta",
            required: true,
            unique: true
        },
        {
            name: "RespuestaEmpresa",
            type: "text",
            label: "Respuesta de la Pregunta",
            required: true,

        },
        {
            name: "EstadoPQR",
            type: "select",
            hasMany: false,
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

export default PQR;