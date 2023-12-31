import { CollectionConfig, FieldHook } from "payload/types";

const formatCedulaNombre: FieldHook = async ({ data }) => (
   data? `${data.NombreCliente} ${data.ApellidosCliente} - ${data.CedulaCliente} (ID)`: 'Datos del Cliente No Encontrados.'
)
const Customers: CollectionConfig = {
    slug: 'clientes',
    access: {
        read: () => true,
        update: () => true
    },
    auth: true,
    admin: {
        useAsTitle: 'CedulaNombreCliente',
        defaultColumns: ['CedulaCliente', 'NombreCliente', 'ApellidosCliente'],
        group: 'VENTAS'
    },
    labels: {
        singular: 'Cliente',
        plural: 'Clientes',
    },
    fields: [
        {
            name: "CedulaNombreCliente",
            type: "text",
            label: 'Cedula - Nombre & Apellidos',
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
                    name: "TipoIdCliente",
                    label: "Tipo de Identificacion",
                    type: 'select',

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
            name: "TipoPersonaCliente",
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
                            name: 'NombreEmpresaCliente',
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
                    name: 'CorreoEmpresaCliente',
                    label: 'Correo de la Empresa',
                    type: 'email',
                    admin: {

                        width: '100%',
                        placeholder: 'Correo  aqui'
                    }
                },
                {
                    name: 'DireccionEmpresaCliente',
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
                    unique: true,
                    admin: {
                        placeholder: 'Correo aqui'
                    }
                },
                {
                    name: "CelularCliente",
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
            name: "TerminosCliente",
            type: "checkbox",
            label: "Acepta Terminos y Condiciones?",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si el cliente acepta los Terminos y Condiciones'
            }
        },
        {
            name: "UbicacionCliente", 
            label: "Ubicacion del Cliente",
            type: 'relationship', 
            relationTo: 'ubicaciones', 
            hasMany: false,
            unique: true,
            required: false,
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
            name: "FechaRegistroCliente",
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