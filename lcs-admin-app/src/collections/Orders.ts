
import { CollectionConfig, FieldHook } from "payload/types";
import ErrorMessages from "../components/Messages/ErrorMessages";
import payload from "payload";
import { ImageProduct } from "../components/Orders/ImageProduct";

const getProductServicePrice: FieldHook = async ({ data }) => {
    if (data && data.ProductoServicioPedido.value !== undefined && data.TipoVentaPedido === 'product') {
        const fieldID = data.ProductoServicioPedido.value;
        const productResponse = await fetch(`http://localhost:3001/api/productos/${fieldID}`)
            .then(productResponse => {
                if (!productResponse.ok) {
                    throw new Error(`Error al obtener el Costo del Producto. Código de estado: ${productResponse.status}`);
                }
                return productResponse.json();
            })
            .then(productData => {
                const productPrice = productData.PrecioProducto;
                return productPrice;
            })
            .catch(error => {
                console.error('Error del Producto:', error);
                return 'No se puede obtener el Costo del Producto.';
                // return '';
            });
        return productResponse ? productResponse : null;
    }
    if (data && data.ProductoServicioPedido.value !== undefined && data.TipoVentaPedido === 'service') {
        const fieldID = data.ProductoServicioPedido.value;
        const serviceResponse = await fetch(`http://localhost:3001/api/servicios/${fieldID}`)
            .then(serviceResponse => {
                if (!serviceResponse.ok) {
                    throw new Error(`Error al obtener el Costo del Servicio. Código de estado: ${serviceResponse.status}`);
                }
                return serviceResponse.json();
            })
            .then(serviceData => {
                const servicePrice = serviceData.PrecioServicio;
                return servicePrice;
            })
            .catch(error => {
                //   console.error('Error del Servicio:', error);
                return 'No se puede obtener el Costo del Servicio.';
                //return '';
            });
        return serviceResponse ? serviceResponse : null;
    }
    return null;
}
const getTotalPrice: FieldHook = async ({ data }) => {

    if (data && data.ProductoServicioPedido.value !== undefined && data.TipoVentaPedido === 'product') {
        const fieldID = data.ProductoServicioPedido.value;
        const productResponse = await fetch(`http://localhost:3001/api/productos/${fieldID}`)
            .then(productResponse => {
                if (!productResponse.ok) {
                    throw new Error(`Error al obtener el Costo del Producto. Código de estado: ${productResponse.status}`);
                }
                return productResponse.json();
            })
            .then(productData => {
                const productPrice = productData.PrecioProducto;
                return productPrice;
            })
            .catch(error => {
                console.error('Error del Producto:', error);
                return 'No se puede obtener el Costo del Producto.';
            });
        const { PrecioProductoServicio = productResponse, CantidadProductoPedido } = data.DetallesPagoPedido;
        const calculatedPrice = CantidadProductoPedido > 0 ? CantidadProductoPedido * PrecioProductoServicio : CantidadProductoPedido + PrecioProductoServicio
        const validatedDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? calculatedPrice * (1 - (data.DescuentoPedido / 100)) : calculatedPrice
        const totalProdPrice = Math.round(validatedDiscount)
        return totalProdPrice;
    }

    if (data && data.ProductoServicioPedido.value !== undefined && data.TipoVentaPedido === 'service') {
        const fieldID = data.ProductoServicioPedido.value;
        const serviceResponse = await fetch(`http://localhost:3001/api/servicios/${fieldID}`)
            .then(serviceResponse => {
                if (!serviceResponse.ok) {
                    throw new Error(`Error al obtener el Costo del Servicio. Código de estado: ${serviceResponse.status}`);
                }
                return serviceResponse.json();
            })
            .then(serviceData => {
                const servicePrice = serviceData.PrecioServicio;
                return servicePrice;
            })
            .catch(error => {
                console.error('Error del Servicio:', error);
                return 'No se puede obtener el Costo del Servicio.';
                // return '';
            });
        const PrecioProductoServicio = serviceResponse
        console.log('PRECIO: ', PrecioProductoServicio)
        const calculatedDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? PrecioProductoServicio * (1 - (data.DescuentoPedido / 100)) : PrecioProductoServicio
        const totalServPrice = Math.round(calculatedDiscount);
        console.log('TOTAL SERV: ', totalServPrice)
        return totalServPrice;
    }

    return null;

}

interface Ubicacion {
    id: string;
    PaisUbicacion: string;
    DepartamentoUbicacion: {
        NombreDepartamento: string;
    };
    MunicipioUbicacion: {
        NombreMunicipio: string;
    };
    EstadoUbicacion: string;
    createdAt: string;
    updatedAt: string;
    UbicacionDatos: string;
}

interface Imagen {
    ImagenesProducto: {
        ImagenProducto: string;
    }[];
}

type LocationData = string;
let globalLocationString: string | undefined;

function setClientLocationGlobal(productServiceLocation: string): string {
    globalLocationString = globalLocationString || '';
    let LocationResult: string = '';
    if (!globalLocationString.includes(productServiceLocation)) {
        LocationResult = globalLocationString += productServiceLocation;
    }
    return LocationResult;
}

function setCheckedClientLocation(clientLocation: string): string {
    const lowerCaseClientLocation = clientLocation.toLowerCase();
    const lowerCasePSLocation = globalLocationString ?
        globalLocationString.toLowerCase().includes(lowerCaseClientLocation) : null;
    if (globalLocationString && lowerCasePSLocation) {
        return `Coincidencia: ${clientLocation}`;
    } else {
        return 'La Ubicación del Cliente y la del Pedido No Coincide.';
    }
}
const getProductServiceLocation: FieldHook = async ({ data }) => {
    if (data && data.ProductoServicioPedido.value !== undefined && data.TipoVentaPedido === 'product') {
        try {
            const fieldID = data.ProductoServicioPedido.value;
            const productResponse = await fetch(`http://localhost:3001/api/productos/${fieldID}`);
            if (!productResponse.ok) {
                throw new Error(`Error al obtener la Ubicacion del Producto. Código de estado: ${productResponse.status}`);
            }
            const productData = await productResponse.json()
            const productLocation = productData.UbicacionProducto;
            const formatLocationData = (ubicacion: Ubicacion): string => {
                const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacion;
                return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`;
            }
            let locationData: LocationData[] = [];
            productLocation.forEach((ubicacion: Ubicacion) => {
                const getLocationString = formatLocationData(ubicacion);
                locationData.push(getLocationString + '\n')
            })
            const resultLocationProduct = locationData ? locationData.join('') : 'No se puede obtener la Ubicacion del Producto.';
            setClientLocationGlobal(resultLocationProduct)
            return resultLocationProduct;
        } catch (error) {
            return 'No se puede obtener la Ubicacion del Producto.';
        }
    }

    if (data && data.ProductoServicioPedido.value !== undefined && data.TipoVentaPedido === 'service') {
        try {
            const fieldID = data.ProductoServicioPedido.value;
            const serviceResponse = await fetch(`http://localhost:3001/api/servicios/${fieldID}`);
            if (!serviceResponse.ok) {
                throw new Error(`Error al obtener la Ubicacion del Servicio. Código de estado: ${serviceResponse.status}`);
            }
            const serviceData = await serviceResponse.json();
            const serviceLocation = serviceData.UbicacionServicio;
            const formatLocationData = (ubicacion: Ubicacion): string => {
                const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacion;
                return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`;
            }
            let locationData: LocationData[] = [];
            serviceLocation.forEach((ubicacion: Ubicacion) => {
                const getLocationString = formatLocationData(ubicacion);
                locationData.push(getLocationString + '\n')
            })
            const resultServiceLocation = locationData ? locationData.join('') : 'No se puede obtener la Ubicacion del Servicio.';
            setClientLocationGlobal(resultServiceLocation)
            return resultServiceLocation;
        } catch (error) {
            return 'No se puede obtener la Ubicacion del Servicio.';
        }
    }
    return null;
}
const getClientLocation: FieldHook = async ({ data }) => {
    if (data && data.ClientePedido !== undefined) {
        try {
            const fieldID = data.ClientePedido
            const clientResponse = await fetch(`http://localhost:3001/api/clientes/${fieldID}`)
            if (!clientResponse.ok) {
                throw new Error(`Error al obtener la Ubicacion del Cliente. Código de estado: ${clientResponse.status}`)
            }
            const clientData = await clientResponse.json()
            const clientLocation = clientData.UbicacionCliente;

            const formatLocationData = (ubicacion: Ubicacion): string => {
                const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacion
                return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`;
            }
            let locationData: LocationData = '';
            if (clientLocation) {
                const getLocationString = formatLocationData(clientLocation)
                locationData = getLocationString;
            } else {
                console.error('Error: clientLocation es nulo o indefinido.')
            }
            const ValidatedLocation = setCheckedClientLocation(locationData)
            return ValidatedLocation;
        } catch (error) {
            console.error('Error de Ubicacion del Cliente:', error);
            return 'No se puede obtener la Ubicacion del Cliente.';
        }
    }
    return null;
}


const getProductServiceImage: FieldHook = async ({ data }) => {
    try {
        const fieldID = data ? data.ProductoServicioPedido.value : null;
        const productResponse = await fetch(`http://localhost:3001/api/productos/${fieldID}`);
        if (!productResponse.ok) {
            throw new Error(`Error al obtener la URL del Producto. Código de estado: ${productResponse.status}`);
        }
        const productData = await productResponse.json();
        const productImage = productData.ImagenesProducto;
        console.log('DATOS DEL ID DEL PRODUCTO: ', productImage);
        const getImageString = productImage?.[0]?.ImagenProducto || 'Sin ID disponible';
        console.log('ID DE LA PRIMERA IMAGEN DEL PRODUCTO: ', getImageString);
        return getImageString;

    } catch (error) {
        console.error('Error al obtener la URL del Producto:', error);
        return 'Sin ID disponible';
    }
};




const Orders: CollectionConfig = {
    slug: 'pedidos',
    access: {
        read: () => true,
        create: () => true
    },
    admin: {
        useAsTitle: 'ClientePedido',
        defaultColumns: ['ClientePedido', 'TipoVentaPedido', 'ProductoServicioPedido', 'EstadoPagoPedido', 'EstadoPedido'],
        group: 'VENTAS'
    },
    labels: {
        singular: 'Pedido',
        plural: 'Pedidos',
    },
    fields: [
        {
            name: 'ClientePedido',
            /*  label: {es: 'Nombre y Cedula' , en: 'Name and Document'}, */
            label: 'Datos del Cliente',
            type: 'relationship',
            relationTo: 'clientes',
            required: true
        },
        {
            name: "TipoVentaPedido",
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
            name: "ImagenServicioProductoId", // required
            type: "text", // required
            label: "ID de Producto - Servicio",
            required: false,
            admin: {
                readOnly: true
            },
            access: {
                // read:() => false,
                // update: ()=> false,
            },
            hooks: {
                beforeChange: [({ siblingData }) => {
                    return siblingData.ImagenServicioProductoId = undefined
                }],
                afterRead: [getProductServiceImage]
            }
        },

        {
            type: 'row',
            fields: [
                {
                    name: "ProductoServicioPedido",
                    label: "Productos - Servicios",
                    type: 'relationship',
                    /*  hooks: {
                         beforeChange: [
                           ({ data, value, operation }) => {
                             data.PrecioProducto = typeof value === 'string' ? value.split(' ')[0] : '';
                             return value;
                           },
                         ],
                       }, */
                    relationTo: ['productos', 'servicios'],
                    hasMany: false,
                    required: true,
                    maxDepth: 0,
                    filterOptions: ({ data, relationTo, siblingData, }) => {
                        if (relationTo === 'productos') {
                            if (data.TipoVentaPedido === 'product') {
                                console.log('TIPO VENTA:', data.TipoVentaPedido)
                                return {
                                    CantidadProducto: { greater_than_equal: 1 },
                                }
                            }
                            return {
                                NombreProducto: { exists: false },
                            }
                        }
                        if (relationTo === 'servicios') {
                            if (data.TipoVentaPedido === 'service') {
                                console.log('TIPO VENTA:', data.TipoVentaPedido)
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
                        description: 'Seleccione un Producto o Servicio de la Lista',
                        width: '50%',
                    }
                },


                {
                    name: 'ProductImageOrder',
                    type: 'ui',
                    admin: {
                        condition: ({ TipoVentaPedido }) => TipoVentaPedido === 'product',
                        width: '50%',
                        components: {
                            Field: ({ data }) => ImageProduct({ ...data, urlImage: 'http://localhost:3001/imagenes/porton_euro_1.jpg' }),
                        }
                    },
                },
            ]
        },






        {
            type: 'row',
            fields: [
                {
                    name: 'UbicacionProductoServicio',
                    label: 'Ubicaciones Disponibles',
                    type: 'textarea',
                    admin: {
                        readOnly: true,
                        width: '50%'
                    },
                    access: {
                        update: () => false,
                    },
                    hooks: {
                        beforeChange: [({ siblingData }) => {
                            return siblingData.UbicacionProductoServicio = undefined
                        }],
                        afterRead: [getProductServiceLocation]
                    }
                },
                {
                    name: "UbicacionClientePedido",
                    type: "textarea",
                    label: "Ubicacion del Cliente",
                    required: false,
                    admin: {
                        width: '50%',
                        readOnly: true,
                    },
                    access: {
                        update: () => false
                    },
                    hooks: {
                        beforeChange: [({ siblingData }) => {
                            return siblingData.UbicacionProductoServicio = undefined
                        }],
                        afterRead: [getClientLocation]
                    }
                },

            ]
        },
        {
            type: 'row',
            fields: [
                {
                    name: "OfertaPedido",
                    label: "Aplicar Descuento?",
                    type: 'radio',
                    required: false,
                    options: [
                        {
                            label: 'Si',
                            value: 'apply',
                        },
                        {
                            label: 'No',
                            value: 'noApply',
                        },
                    ],
                    defaultValue: 'noApply',
                    admin: {
                        layout: 'horizontal',
                        width: '30%'
                    }
                },
                {
                    name: "DescuentoPedido",
                    type: "number",
                    label: "% Descuento %",
                    required: false,
                    admin: {
                        condition: ({ OfertaPedido }) => OfertaPedido === 'apply',
                        width: '70%'
                    },
                    hooks: {
                        beforeChange: [
                            ({ data }) => {
                                if (data && data.length) {
                                    const twoDigits = /^\d{2}$/;
                                    const discount = data.DescuentoPedido;
                                    if (twoDigits.test(discount)) {
                                        return discount;
                                    }
                                    else {
                                        return data.DescuentoPedido = 0
                                    }
                                }
                            }

                        ]
                    }
                },
            ]
        },
        {
            name: 'ErrorMessage',
            type: 'ui',
            admin: {
                condition: ({ DescuentoPedido }) => DescuentoPedido >= 100,
                width: '100%',
                components: {
                    Field: ({ data }) => ErrorMessages({ ...data, message: 'Debe Ingresar Numeros de 1 a 99.', showError: true }),
                }
            },
        },
        {
            name: "DetallesPagoPedido",
            type: "group",
            label: "Detalles de Pago",
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: "PrecioProductoServicio",
                            type: "number",
                            label: "Costo de Venta",
                            required: false,
                            admin: {
                                readOnly: true,
                                width: '50%',
                                placeholder: '$ 0.00',
                            },
                            access: {
                                create: () => false,
                                update: () => false,
                            },
                            hooks: {
                                beforeChange: [({ siblingData }) => {
                                    return siblingData.PrecioProductoServicio = undefined
                                }],
                                afterRead: [getProductServicePrice]
                            },
                        },
                        {
                            name: "CantidadProductoPedido",
                            label: "Cantidad del Producto",
                            type: "number",
                            required: false,
                            defaultValue: 0,
                            admin: {
                                width: '50%',
                                condition: (data, siblingData, { user }) => {
                                    if (data.TipoVentaPedido === 'product') {
                                        return true
                                    } else {
                                        return false
                                    }

                                }
                            }
                        },
                    ],
                },

                {
                    type: 'row',
                    fields: [
                        {
                            name: "TotalPricioPedido",
                            label: "$ Total a Pagar",
                            type: "number",
                            required: false,
                            access: {
                                create: () => false,
                                update: () => false
                            },
                            hooks: {
                                beforeChange: [({ siblingData }) => {
                                    siblingData.TotalPrice = undefined
                                }],
                                afterRead: [getTotalPrice]
                            },
                            admin: {
                                width: '100%',
                                step: 1,
                                placeholder: '0.00',

                            }
                        },
                    ]
                }

            ],
        },
        {
            name: "EstadoPagoPedido",
            type: "select",
            label: 'Estado del Pago',
            hasMany: false,
            admin: {
                position: 'sidebar',
            },
            options: [
                {
                    label: "Pendiente",
                    value: "pending",
                },
                {
                    label: "Realizado",
                    value: "paid",
                },

                {
                    label: "Cancelado",
                    value: "canceled",
                },

            ],
            defaultValue: 'pending',
            required: false,
        },
        {
            name: "EstadoPedido",
            type: "select",
            label: 'Estado del Pedido',
            hasMany: false,
            admin: {
                position: 'sidebar',
            },
            options: [
                {
                    label: "En Proceso",
                    value: "processing",
                },
                {
                    label: "En Envio",
                    value: "shipping",
                },
                {
                    label: "Entregado",
                    value: "delivered",
                },
                {
                    label: "Finalizado",
                    value: "done",
                },
                {
                    label: "Cancelado",
                    value: "canceled",
                },

            ],
            defaultValue: 'processing',
            required: false,
        },
        {
            name: "FechaPedido",
            type: "date",
            label: "Fecha del Pedido",
            localized: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy'
                }
            }
        },
        {
            name: "FechaEntregaPedido",
            type: "date",
            label: "Fecha de Entrega",
            localized: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy'
                }
            }
        }
    ],
    timestamps: true,
};

export default Orders;