import { CollectionConfig } from "payload/types";
import ErrorMessages from "../components/Messages/ErrorMessages";

const Publications: CollectionConfig = {
    slug: 'publicaciones',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'TituloPublicacion',
        defaultColumns: ['TituloPublicacion', 'TipoVentaPublicacion', 'ProductoServicioPublicacion', 'DescuentoPublicacion', 'EstadoPublicacion'],
        group: 'VENTAS',
    },
    labels: {
        singular: 'Publicacion',
        plural: 'Publicaciones',
    },
    fields: [
        {
            name: 'TituloPublicacion',
            label: 'Titulo de la Publicacion',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                placeholder: 'Titulo aqui'
            }
        },
        {
            name: "TipoVentaPublicacion",
            label: "Tipo de Venta",
            type: 'radio',
            required: false,
            options: [
                {
                    label: 'Producto',
                    value: 'product',
                },
                {
                    label: 'Servicio',
                    value: 'service',
                },
            ],
            defaultValue: 'product',
            admin: {
                layout: 'horizontal',
            }
        },
        {
            name: "ProductoServicioPublicacion",
            label: "Productos - Servicios",
            type: 'relationship',
            relationTo: ['productos', 'servicios'],
            hasMany: false,
            required: true,
            maxDepth: 0,
            filterOptions: ({ data, relationTo, siblingData, }) => {

                if (relationTo === 'productos') {
                    if (data.TipoVentaPublicacion === 'product') {
                        return {
                            CantidadProducto: { greater_than_equal: 1 },
                        }
                    }
                    return {
                        NombreProducto: { exists: false },
                    }
                }
                if (relationTo === 'servicios') {
                    if (data.TipoVentaPublicacion === 'service') {
                        return {
                            EstadoServicio: { equals: 'published' }
                        }
                    }
                    return {
                        NombreServicio: { exists: false },
                    }
                }
            },
            admin: {
                description: 'Seleccione un Producto o Servicio de la Lista.'
            }
        },
        {
            name: "esOfertaPublicacion",
            type: "checkbox",
            label: "Publicacion en Oferta?",
            defaultValue: false,
            admin: {
                description: 'Marque esta casilla si la publicacion esta oferta, rellenar campo de Descuento.'
            }
        },
        {
            name: "DescuentoPublicacion",
            label: "% Descuento de la Publicacion %",
            type: "number",
            required: false,
            admin: {
                step: 1,
                placeholder: '% 00',
                condition: ({ esOfertaPublicacion }) => esOfertaPublicacion === true,
                width: '50%',
            },
            hooks: {
                beforeChange: [
                    ({ data }) => {
                        if (data && data.length) {
                            const twoDigits = /^\d{2}$/;
                            const discount = data.DescuentoPublicacion;
                            if (twoDigits.test(discount)) {
                                return discount
                            }
                            return 0
                        }
                    }
                ]
            }
        },
        {
            name: 'ErrorMessage',
            type: 'ui',
            admin: {
                condition: ({ DescuentoPublicacion }) => DescuentoPublicacion >= 100,
                components: {
                    Field: ({ data }) => ErrorMessages({ ...data, message: 'Debe Ingresar Numeros entre 1 - 99.', showError: true }),

                }
            },

        },
        {
            name: "DescripcionPublicacion",
            type: "richText",
            label: "Descripcion de la Publicacion",
            required: false,
        },
        {
            name: "EtiquetasPublicacion",
            label: "Nombre de las Etiquetas",
            type: 'relationship',
            relationTo: 'etiquetas', 
            hasMany: true,
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "EstadoPublicacion",
            label: 'Estado de la Publicacion',
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
export default Publications;