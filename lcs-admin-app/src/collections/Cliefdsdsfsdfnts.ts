import { CollectionConfig } from "payload/types";

const lsrfdfksplf: CollectionConfig = {
    slug: 'asdasdasd',
    fields: [
        //example text field
        {
            name: "Cedula", // required
            label: "Numero de Cedula",
            type: "text", // required
            required: true,
            unique: true,
            admin: {
               // step: 1,
                placeholder: 'Numero de Cedula aqui'
            }
        },

        {
            type: 'collapsible',
            label: 'Informacion Legal',
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
                        description: 'Si la Persona es Juridica apareceran nuevos Campos'
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
                                placeholder: 'Nombre del Cliente aqui'
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
                                placeholder: 'Apellidos del Cliente aqui'
                            }
                        }
                    ]
                },
                {
                    name: "TipoID", // required
                    label: "Tipo de Identificacion",
                    type: 'select', // required
                    required: true,
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
                },
               
                {
                    type: 'collapsible',
                    label: 'Datos de la Empresa',
                    admin: {
                        condition: ({ TipoPersona }) => TipoPersona === 'juristic',
                    },
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'NombreEmpresa',
                                    label: 'Nombre de la Empresa',
                                    type: 'text',
                                    admin: {
                                        condition: ({ TipoPersona }) => TipoPersona === 'juristic',
                                        width: '50%',
                                        placeholder: 'Nombre de la Empresa aqui'
                                    }
                                },
                                {
                                    name: 'NIT',
                                    label: 'NIT de la Empresa',
                                    type: 'number',
                                    admin: {
                                        condition: ({ TipoPersona }) => TipoPersona === 'juristic',
                                        width: '50%',
                                        placeholder: 'NIT de la Empresa aqui'
                                    }
                                },
                            ]
                        },
                        {
                            name: 'CorreoEmpresa',
                            label: 'Correo de la Empresa',
                            type: 'email',
                            admin: {
                                condition: ({ TipoPersona }) => TipoPersona === 'juristic',
                                width: '100%',
                                placeholder: 'Correo de la Empresa aqui'
                            }
                        },
                        {
                            name: 'DireccionEmpresa',
                            label: 'Direccion de la Empresa',
                            type: 'textarea',
                            admin: {
                                condition: ({ TipoPersona }) => TipoPersona === 'juristic',
                                width: '100%',
                                placeholder: 'Direccion de la Empresa aqui'
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
                    label: "Correo del Cliente",
                    required: true,
                    unique: true,
                    admin: {
                        placeholder: 'Correo del Cliente aqui'
                    }
                },
                {
                    name: "Numero", // required
                    label: "Numero Telefonico",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: 'Numero Telefonico aqui'
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

export default lsrfdfksplf;