import { CollectionConfig } from "payload/types";

const Company: CollectionConfig = {
    slug: 'empresa',
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    admin: {
        useAsTitle: 'Nombre',
        group:'SISTEMA'
    },
    labels: {
        singular: 'Empresa',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Datos',
                    description: 'Informacion de la Empresa',
                    fields: [
                        {
                            name: "Nombre", // required
                            type: "text", // required
                            label: "Nombre de la Empresa",
                            required: true,
                        },
                        {
                            name: "Direccion", // required
                            type: "text", // required
                            label: "Direccion de la Empresa",
                            required: true,
                        },
                        {
                            name: "Numero", // required
                            type: "number", // required
                            label: "Numero Celular de la Empresa",
                            required: true,
                        },
                        {
                            name: "Correo", // required
                            type: "email", // required
                            label: "Correo de la Empresa",
                            required: true,
                        },
                    ]
                },
                {
                    label: 'Web',
                    description: 'Informacion de Adicional',
                    fields: [
                        {
                            name: "Slogan", // required
                            type: "text", // required
                            label: "Lema de la Empresa",
                            required: false,
                        },
                        {
                            name: "Acerca", // required
                            type: "textarea", // required
                            label: "Acerca la Empresa",
                            required: false,
                        },
                        {
                            name: "Facebook", // required
                            type: "text", // required
                            label: "Facebook de la Empresa",
                            required: false,
                        },

                    ]
                }
            ]
        }

    ],
    timestamps: true,
};

export default Company;