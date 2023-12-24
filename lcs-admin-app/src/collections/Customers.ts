import { CollectionConfig, FieldHook } from "payload/types";

const formatCedulaNombre: FieldHook = async ({ data }) => (
   `${data.NombreCliente} ${data.ApellidosCliente} - ${data.CedulaCliente}`
)
const Customers: CollectionConfig = {

    slug: 'clientes',
    access: {
        read: () => true,
        update: () => true
    },

    auth: true,
    admin: {
        useAsTitle: 'CedulaNombre',
        defaultColumns: ['CedulaCliente', 'NombreCliente', 'ApellidosCliente'],
        group: 'VENTAS'
    },

    labels: {
        singular: 'Cliente',
        plural: 'Clientes',
    },

    fields: [
        //example text field
        {
            name: "CedulaNombre",
            type: "text",
            label: 'Cedula - Nombre y Apellidos',
            required: false,
            hooks: {
                beforeChange: [({ siblingData }) => {
                    siblingData.CedulaNombre = undefined;
                }],
                afterRead: [formatCedulaNombre]
            },
            access: {
                create: () => false,
                update: () => false
            },
            admin: {
                hidden: true,
            }
        },




        {
            type: 'row',
            fields: [
                {
                    name: "TipoID",
                    label: "Tipo de Identificacion",
                    type: 'select',
                    required: true,
                    options: [
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
                        width: '50%'
                    }
                },
                {
                    name: 'CedulaCliente',
                    label: 'Cedula del Cliente',
                    type: 'text',
                    required: true,
                    unique: true,
                    admin: {
                        placeholder: 'Cedula aqui',
                        width: '50%'
                    }
                },
            ]
        },


        {
            type: 'row',
            fields: [
                {
                    name: 'NombreCliente',
                    label: 'Nombre del Cliente',
                    type: 'text',
                    required: true,
                    admin: {
                        placeholder: 'Nombre aqui'
                    }
                },
                {
                    name: 'ApellidosCliente',
                    label: 'Apellidos del Cliente',
                    type: 'text',
                    required: true,
                    admin: {
                        placeholder: 'Apellidos aqui'
                    }
                },
            ]
        },




        {
            name: "TipoPersona",
            label: "Tipo de Persona",
            type: 'radio',
            required: false,
            options: [
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
                description: 'Si la Persona es Juridica apareceran nuevos campos.'
            }
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

                                width: '50%',
                                placeholder: 'Nombre aqui'
                            }
                        },
                        {
                            name: 'NIT',
                            label: 'NIT de la Empresa',
                            type: 'number',
                            admin: {

                                width: '50%',
                                placeholder: 'NIT aqui'
                            }
                        },
                    ]
                },




                {
                    name: 'CorreoEmpresa',
                    label: 'Correo de la Empresa',
                    type: 'email',
                    admin: {

                        width: '100%',
                        placeholder: 'Correo  aqui'
                    }
                },



                {
                    name: 'DireccionEmpresa',
                    label: 'Direccion de la Empresa',
                    type: 'textarea',
                    admin: {
                        width: '100%',
                        placeholder: 'Direccion aqui'
                    }
                },


            ]
        },











        {
            type: 'collapsible',
            label: 'Informacion Contacto del Cliente',
            fields: [
                {
                    name: "CorreoCliente",
                    type: "email",
                    label: "Correo Electronico",
                    //required: true,
                    //unique: true,
                    admin: {
                        placeholder: 'Correo aqui'
                    }
                },
                {
                    name: "NumeroCelular",
                    label: "Numero Telefonico",
                    type: "number",
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: 'Numero aqui'
                    }
                },
            ]
        },




        {
            name: 'DireccionCliente',
            label: 'Direccion del Cliente',
            type: 'textarea',
            admin: {
                width: '100%',
                placeholder: 'Direccion aqui'
            }
        },



        {
            name: "Terminos",
            type: "checkbox",
            label: "Acepta Terminos y Condiciones?",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si el cliente acepta los Terminos y Condiciones'
            }
        },



        {
            name: "UbicacionCliente", // required
            label: "Ubicacion",
            type: 'relationship', // required
            relationTo: 'ubicaciones', //required eg:users
            hasMany: false,
            required: true,
            admin: {
                position: 'sidebar'
            }
        },



        {
            name: "Estado",
            type: "select",
            label: "Estado del Cliente",
            hasMany: false,
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
            name: "FechaRegistro",
            type: "date",
            label: "Fecha de Registro",
            required: true,
            admin: {
                position: "sidebar",
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy'
                }
            }
        }
    ],

    timestamps: true,
};

export default Customers;