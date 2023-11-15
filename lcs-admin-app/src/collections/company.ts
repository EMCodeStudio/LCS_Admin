import { CollectionConfig } from "payload/types";

const Company: CollectionConfig = {
    slug: 'empresa',
    access: {
        read: () => true,
        create: () => false,
        update: () => true,
        delete: () => false,
    },
    admin: {
        useAsTitle: 'Empresa',
        defaultColumns: ['Empresa', 'Numero', 'Correo', 'Direccion', 'Slogan', 'Nosotros', 'Facebook', 'Ubicacion','FechaInicios'],
        group: 'SISTEMA'
    },
    labels: {
        singular: 'Empresa',
        plural: 'Empresas',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Datos Empresariales',
                    description: 'Rellene los siguientes Campos',
                    fields: [
                        {
                            name: "Empresa", // required
                            type: "text", // required
                            label: "Nombre de la Empresa",
                            required: true,
                            admin: {
                                placeholder: "Nombre de la Empresa aqui",
                            }
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: "Numero", // required
                                    type: "number", // required
                                    label: "Numero Celular de la Empresa",
                                    required: true,
                                    admin: {
                                        placeholder: "Numero Celular aqui",
                                        width: '40%'
                                    }
                                },
                                {
                                    name: "Correo", // required
                                    type: "email", // required
                                    label: "Correo Electronico de la Empresa",
                                    required: true,
                                    admin: {
                                        placeholder: "Correo Electronico aqui",
                                        width: '60%'
                                    }
                                },
                            ]
                        },
                        {
                            name: "Direccion", // required
                            type: "textarea", // required
                            label: "Direccion de la Empresa",
                            required: true,
                            admin: {
                                placeholder: "Datos de Direccion aqui",
                            }
                        },
                    ]
                },
                {
                    label: 'Informacion Adicional',
                    description: 'Rellene los siguientes Campos',
                    fields: [
                        {
                            name: "Slogan", // required
                            type: "text", // required
                            label: "Lema de la Empresa",
                            required: false,
                            admin: {
                                placeholder: "Correo Electronico aqui",
                            }
                        },
                        {
                            name: "Nosotros", // required
                            type: "textarea", // required
                            label: "Acerca la Empresa",
                            required: false,
                            admin: {
                                placeholder: "Descripcion de la Empresa aqui",
                            }
                        },
                        {
                            name: "Facebook", // required
                            type: "text", // required
                            label: "Facebook de la Empresa",
                            required: false,
                            admin: {
                                placeholder: "Link de Red Social aqui",
                            }
                        },

                    ]
                }
            ]
        },
        {
            name: "Ubicacion", // required
            type: "point", // required
            label: "Ubicacion Mapa",
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "FechaInicios", // required
            type: "date", // required
            label: "Fecha de Inicios",
            admin: {
                date: {
                    //Options: dayAndTime, timeOnly, dayOnly
                    pickerAppearance: 'dayOnly',
                },
                position: 'sidebar'
            }
        }
    ],
    timestamps: true,
};

export default Company;