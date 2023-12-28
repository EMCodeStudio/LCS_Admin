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
        useAsTitle: 'NombreEmpresa',
        defaultColumns: ['NombreEmpresa', 'NumeroEmpresa', 'CorreoEmpresa'],
        group: 'SISTEMA'
    },
    labels: {
        singular: 'Empresa',
        plural: 'Empresa',
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
                            name: "NombreEmpresa",
                            type: "text",
                            label: "Nombre de la Empresa",
                            required: true,
                            admin: {
                                placeholder: "Nombre aqui",
                            }
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: "NumeroEmpresa",
                                    type: "number",
                                    label: "Numero Celular de la Empresa",
                                    required: true,
                                    admin: {
                                        placeholder: "Numero aqui",
                                        width: '40%'
                                    }
                                },
                                {
                                    name: "CorreoEmpresa",
                                    type: "email",
                                    label: "Correo Electronico de la Empresa",
                                    required: true,
                                    admin: {
                                        placeholder: "Correo aqui",
                                        width: '60%'
                                    }
                                },
                            ]
                        },
                        {
                            name: "DireccionEmpresa",
                            type: "textarea",
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
                            name: "SloganEmpresa",
                            type: "textarea",
                            label: "Lema de la Empresa",
                            required: false,
                            admin: {
                                placeholder: "Lema aqui",
                            }
                        },
                        {
                            name: "Nosotros",
                            type: "textarea",
                            label: "Acerca la Empresa",
                            required: false,
                            admin: {
                                placeholder: "Descripcion aqui",
                            }
                        },
                        {
                            name: "FacebookEmpresa",
                            type: "text",
                            label: "Facebook de la Empresa",
                            required: false,
                            admin: {
                                placeholder: "Link de Facebook aqui",
                            }
                        },

                    ]
                }
            ]
        },
        {
            name: "UbicacionEmpresa",
            type: "relationship",
            relationTo: 'ubicaciones',
            label: "Ubicacion del Mapa",
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "MapaEmpresa",
            type: "point",
            label: "Coordenada Mapa",
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "FechaInicioEmpresa",
            type: "date",
            label: "Fecha de Inicios",
            admin: {
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy'
                    //Options: dayAndTime, timeOnly, dayOnly

                },
                position: 'sidebar'
            }
        }
    ],
    timestamps: true,
};

export default Company;