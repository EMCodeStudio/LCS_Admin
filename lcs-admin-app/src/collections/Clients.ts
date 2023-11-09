import { CollectionConfig } from "payload/types";

const Clients: CollectionConfig = {
    slug: 'clientes',
    auth: true,
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'Nombre',
        defaultColumns: ['TipoPersona', 'Nombre', 'Apellidos', 'TipoID', 'Cedula', 'NombreEmpresa', 'NIT','CorreoEmpresa', 'DireccionEmpresa', 'Correo', 'Numero', 'Terminos', 'Estado', 'FechaRegistro'],
        group: 'VENTAS'

    },
    labels: {
        singular: 'Cliente',
        plural: 'Clientes',
    },
    fields: [
        //example text field

        {
            type: 'collapsible',
            label: 'Informacion Personal',
            fields: [
                {

                    name: "TipoPersona", // required
                    label: "Tipo de Persona",
                    type: 'radio', // required
                    required: false,
                    options: [ // required
                        {
                            label: 'Natural',
                            value: 'nature',
                        },
                        {
                            label: 'Juridica',
                            value: 'juristic',
                        },
                    ],
                    defaultValue: 'nature',
                    admin: {
                        layout: 'horizontal',
                    }
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'Nombre',
                            label: 'Nombre del Cliente',
                            type: 'text',
                            unique: true,
                            required: true,
                            admin: {
                                width: '50%',
                            }
                        },
                        {
                            name: 'Apellidos',
                            label: 'Apellidos del Cliente',
                            type: 'text',
                            unique: true,
                            required: true,
                            admin: {
                                width: '50%',
                            }
                        }
                    ]
                },
                {
                    name: "TipoID", // required
                    label: "Tipo de IDentificacion",
                    type: 'radio', // required
                    required: false,
                    options: [ // required
                        {
                            label: 'Cedula de Ciudadania',
                            value: 'zitizen',
                        },
                        {
                            label: 'Cedula de Extranjeria',
                            value: 'foreign',
                        },
                    ],
                    defaultValue: 'zitizen',
                    admin: {
                        layout: 'horizontal',
                    }
                },
                {
                    name: "Cedula", // required
                    label: "Numero de Cedula",
                    type: "number", // required
                    required: true,
                    unique: true,
                    admin: {
                        step: 1,
                    }
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'NombreEmpresa',
                            label: 'Nombre de la Empresa',
                            type: 'text',
                            admin: {
                                condition: ({ TipoPersona }) => TipoPersona === 'juristic',
                                width: '50%'
                            }
                        },
                        {
                            name: 'NIT',
                            label: 'NIT de la Empresa',
                            type: 'number',
                            unique: true,
                            admin: {
                                condition: ({ TipoPersona }) => TipoPersona === 'juristic',
                                width: '50%'
                            }
                        },
                        {
                            name: 'CorreoEmpresa',
                            label: 'Correo de la Empresa',
                            type: 'email',
                            unique: true,
                            admin: {
                                condition: ({ TipoPersona }) => TipoPersona === 'juristic',
                                width: '100%'
                            }
                        },
                        {
                            name: 'DireccionEmpresa',
                            label: 'Direccion de la Empresa',
                            type: 'textarea',
                            unique: true,
                            admin: {
                                condition: ({ TipoPersona }) => TipoPersona === 'juristic',
                                width: '100%'
                            }
                        },
                    ]
                },
            ]
        },
        {
            type: 'collapsible',
            label: 'Informacion de Contacto',
            fields: [
                {
                    name: "Correo", // required
                    type: "email", // required
                    label: "Correo Electronico Personal",
                    required: true,
                    unique: true
                },
                {
                    name: "Numero", // required
                    label: "Numero Telefonico",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                    }
                },
            ]
        },
        {
            name: "Terminos", // required
            type: "checkbox", // required
            label: "Acepta Terminos y Condiciones?",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si el cliente acepta los Terminos y Condiciones'
            }
        },
        {
            name: "Estado", // required
            type: "select", // required
            label: "Estado del Cliente",
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Habilitado",
                    value: "published",
                },
                {
                    label: "Inhabilitado",
                    value: "draft",
                },
            ],
            defaultValue: 'draft',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "FechaRegistro", // required
            type: "date", // required
            label: "Fecha de Registro",
            //defaultValue: '1988-11-05T8:00:00.000+05:00',
            admin: {
                position: "sidebar"
            }
        }
    ],
    timestamps: true,
};

export default Clients;