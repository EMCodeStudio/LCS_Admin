
import { CollectionBeforeChangeHook, CollectionConfig, FieldHook } from "payload/types";
import ErrorMessages from "../components/Messages/ErrorMessages";
import payload from "payload";

const getProductServicePrice: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {
            const prodcuctServiceFieldId = data.ProductoServicioPedido.value
            const fieldProductServicePrice = data.PrecioProductoServicio
            const fieldProductServicePriceOrigin = originalDoc.PrecioProductoServicio
            if (fieldProductServicePrice !== fieldProductServicePriceOrigin || fieldProductServicePrice === undefined) {
                if (data.TipoVentaPedido === 'product') {
                    const productResponse = await fetch(`${process.env.PAYLOAD_URL}/api/productos/${prodcuctServiceFieldId}`)
                        .then(response => response.json())
                    const productPrice = productResponse.PrecioProducto
                    return productPrice
                }
                if (data.TipoVentaPedido === 'service') {
                    const serviceResponse = await fetch(`${process.env.PAYLOAD_URL}/api/servicios/${prodcuctServiceFieldId}`)
                        .then(response => response.json())
                    const servicePrice = serviceResponse.PrecioServicio
                    return servicePrice
                }
            }
        } else {
            // console.log('NO SE A DEFINIDO VALORES EN DATA')
        }
    } catch (error) {
        // console.log('ERROR EN LA FUNCION getProductServicePrice: ', error)
    }
    return null
}
const getTotalPrice: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {
            const productServiceFieldID = data.ProductoServicioPedido.value
            const fieldProductServiceTotalPrice = data.TotalPricioPedido
            const fieldProductServiceTotalPriceOrigin = originalDoc.TotalPricioPedido

            let PrecioProductoServicio: number = 0

            //if (fieldProductServiceTotalPrice !== fieldProductServiceTotalPriceOrigin || fieldProductServiceTotalPrice === undefined) {

            if (data.TipoVentaPedido === 'product') {
                const productResponse = await fetch(`${process.env.PAYLOAD_URL}/api/productos/${productServiceFieldID}`)
                    .then(productResponse => {
                        if (!productResponse.ok) {
                            throw new Error(`Error al obtener el Costo del Producto: ${productResponse.status}`)
                        }
                        return productResponse.json()
                    })
                    .then(productData => {
                        const productPrice = productData.PrecioProducto
                        return productPrice
                    })
                    .catch(error => {
                        // console.error('Error del Servidor al optener precio del Producto:', error)
                    });
                const { CantidadProductoPedido } = data.DetallesPagoPedido;
                PrecioProductoServicio = productResponse
                const calculatedProductPrice = CantidadProductoPedido > 0 ? CantidadProductoPedido * PrecioProductoServicio : CantidadProductoPedido + PrecioProductoServicio
                const validatedProductDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? calculatedProductPrice * (1 - (data.DescuentoPedido / 100)) : calculatedProductPrice
                const totalProductPrice = Math.round(validatedProductDiscount)
                return totalProductPrice
            }

            if (data.TipoVentaPedido === 'service') {
                const serviceResponse = await fetch(`${process.env.PAYLOAD_URL}/api/servicios/${productServiceFieldID}`)
                    .then(serviceResponse => {
                        if (!serviceResponse.ok) {
                            throw new Error(`Error al obtener el Costo del Servicio: ${serviceResponse.status}`)
                        }
                        return serviceResponse.json()
                    })
                    .then(serviceData => {
                        const servicePrice = serviceData.PrecioServicio
                        return servicePrice
                    })
                    .catch(error => {
                        // console.log('Error del Servidor al optener precio del Servicio:', error)
                    })
                PrecioProductoServicio = serviceResponse
                const calculatedServiceDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? PrecioProductoServicio * (1 - (data.DescuentoPedido / 100)) : PrecioProductoServicio
                const totalServicePrice = Math.round(calculatedServiceDiscount)
                return totalServicePrice
            }
            //   }
        }
    } catch (error) {
        //console.log('ERROR EN LA FUNCION getTotalPrice: ', error)
    }
    return null
}
interface Ubicacion {
    id: string,
    PaisUbicacion: string,
    DepartamentoUbicacion: {
        id: string,
        NombreDepartamento: string,
        createdAt: string,
        updatedAt: string
    },
    MunicipioUbicacion: {
        id: string,
        NombreMunicipio: string,
        createdAt: string,
        updatedAt: string
    },
    EstadoUbicacion: string,
    createdAt: string,
    updatedAt: string,
    UbicacionDatos: string
}
/*interface Imagen {
    ImagenesProducto: {
        ImagenProducto: string;
    }[];
}*/
type LocationData = string;
let globalLocationString: string | undefined;
function setClientLocationGlobal(productServiceLocation: string): string {
    globalLocationString = globalLocationString || '';
    let LocationResult: string = '';
    if (!globalLocationString.includes(productServiceLocation)) {
        LocationResult = globalLocationString += productServiceLocation;
    }
    globalLocationString = LocationResult
    return globalLocationString;
}
function setCheckedClientLocationAtProductService(clientLocationString: string): string {
    if (clientLocationString) {
        const lowerCaseClientLocation = clientLocationString.toLowerCase()
        const lowerCaseGlobalLocation = globalLocationString ? globalLocationString.toLowerCase() : ''
        const foundClientLocation = lowerCaseGlobalLocation.includes(lowerCaseClientLocation)
        if (foundClientLocation) {
            return `Coincidencia: ${clientLocationString}`;
        }
        return 'La Ubicacion de Venta y la de Cliente No Coincide.'
    } else {
        return 'Ubicacion del Cliente No Encontrada.';
    }
}
const getProductServiceLocation: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {
            const productServiceFieldId = data.ProductoServicioPedido.value
            const fieldProductServiceLocation = data.UbicacionProductoServicio
            const fieldProductServiceLocationOrigin = originalDoc.UbicacionProductoServicio

            if (fieldProductServiceLocation !== fieldProductServiceLocationOrigin || fieldProductServiceLocation === undefined) {

                if (data.TipoVentaPedido === 'product') {
                    const productResponse = await fetch(`${process.env.PAYLOAD_URL}/api/productos/${productServiceFieldId}`)
                    if (productResponse.ok) {
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
                        const resultProductLocation = locationData.join('')
                        setClientLocationGlobal(resultProductLocation)
                        return resultProductLocation;
                    } else {
                        throw new Error(`Error al obtener la Ubicacion del Producto: ${productResponse.status}`)
                    }
                }

                if (data.TipoVentaPedido === 'service') {
                    const serviceResponse = await fetch(`${process.env.PAYLOAD_URL}/api/servicios/${productServiceFieldId}`)
                    if (serviceResponse.ok) {
                        const serviceData = await serviceResponse.json()
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
                        const resultServiceLocation = locationData.join('')
                        setClientLocationGlobal(resultServiceLocation)
                        return resultServiceLocation;
                    } else {
                        throw new Error(`Error al obtener la Ubicacion del Servicio: ${serviceResponse.status}`);
                    }
                }
            }
        }
    } catch (error) {
        return 'ERROR EN LA FUNCION getProductServiceLocation.';
    }

}
const getClientLocation: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {
            const clientFieldLocation = data.UbicacionClientePedido
            const clientFieldLocationOrigin = originalDoc.UbicacionClientePedido
            const fieldClientId = data.ClientePedido
            if (clientFieldLocation !== clientFieldLocationOrigin || clientFieldLocation === undefined) {
                const clientResponse = await fetch(`${process.env.PAYLOAD_URL}/api/clientes/${fieldClientId}`)
                const clientData = await clientResponse.json()
                if (clientResponse.ok) {
                    const clientLocation = clientData.UbicacionCliente
                    const formatLocationData = (ubicacionCliente: Ubicacion): string => {
                        const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacionCliente
                        return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`
                    }
                    let locationClientDataString: LocationData = ''
                    if (clientLocation) {
                        const getLocationFormatString = formatLocationData(clientLocation)
                        locationClientDataString = getLocationFormatString;
                    }
                    const ValidatedLocation = setCheckedClientLocationAtProductService(locationClientDataString)
                    return ValidatedLocation

                } else {
                    throw new Error(`Error al obtener la Ubicacion del Cliente: ${clientResponse.status}`)
                }
            }
        }
    } catch (error) {
        //console.log('ERROR EN LA FUNCION getClientLocation:', error)
    }
    return null
}
interface ImagenProducto {
    ImagenProducto: {
        id: string;
        // other properties...
    };
    id: string;
}
interface ImagenServicio {
    ImagenServicio: {
        id: string;
        // other properties...
    };
    id: string;
}
const getProductServiceImageId: FieldHook = async ({ data }) => {
    try {
        if (data && data.ProductoServicioPedido !== undefined) {

            const ImageProductServiceFieldId = data.ProductoServicioPedido.value

            if (data.TipoVentaPedido === 'product') {

                const responseImageProduct = await payload.find({
                    collection: 'productos',
                    where: {
                        id: ImageProductServiceFieldId
                    }
                })
                if (responseImageProduct.docs && responseImageProduct.docs.length > 0) {

                    const resultImageProductId = responseImageProduct.docs[0]?.ImagenesProducto as ImagenProducto[];
                    console.log('OBJETO DE IMAGEN PRODUCTO: ', resultImageProductId)
                    const getImageProductStringId = resultImageProductId?.[0]?.ImagenProducto.id
                    console.log('ID DE IMAGEN PRODUCTO: ', getImageProductStringId)
                    return getImageProductStringId;
                }
            }

            if (data.TipoVentaPedido === 'service') {
                const responseImageService = await payload.find({
                    collection: 'servicios',
                    where: {
                        id: ImageProductServiceFieldId
                    }
                })
                if (responseImageService.docs && responseImageService.docs.length > 0) {
                    const resultImageServiceId = responseImageService.docs[0]?.ImagenesServicio as ImagenServicio[];
                    console.log('OBJETO DE IMAGEN SERVICIO: ', resultImageServiceId)
                    const getImageServiceStringId = resultImageServiceId?.[0]?.ImagenServicio.id
                    console.log('ID DE IMAGEN SERVICIO: ', getImageServiceStringId)
                    return getImageServiceStringId;
                }
                /* 
                const imageProductData = await imageProductResponse.json()
                   const productImage = imageProductData.ImagenesProducto
                   const getImageProductStringId = productImage?.[0]?.ImagenProducto || null
                   return getImageProductStringId
                */
            }
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION getProductServiceImageId: ', error)
    }

}
const setProductServiceImageChecked: FieldHook = async ({ data }) => {
    try {

        if (data && data.ImagenServicioProductoId !== undefined) {

            const mediaProductService = await payload.find({
                collection: 'imagenes',
                where: {
                    id: data.ImagenServicioProductoId.value,
                }
            })
            console.log('ID CHECKED RESPONSE DE IMAGEN : ', mediaProductService)

            if (mediaProductService.docs && mediaProductService.docs.length > 0) {
                const imageProductService = mediaProductService.docs[0].id
                console.log('ID RELATION DE IMAGEN : ', imageProductService)
                return imageProductService;
            }
        }
    } catch (error) {
        // console.log("ERROR EN LA FUNCION setProductServiceImageChecked: ", error)
    }
    // return null
}
const updateProductStock: CollectionBeforeChangeHook = async ({ data }) => {
    try {
        const { CantidadProductoPedido } = data.DetallesPagoPedido;
        const stateOrderPayment = data.EstadoPagoPedido;
        const stateOrderApproved = data.EstadoCompraPedido;
        const isOrderApproved = data.AprobacionEstadoPedido;

        console.log('FIELD  ORDER APROBACION updateProductStock: ', isOrderApproved)

        if (CantidadProductoPedido > 0 && stateOrderPayment === 'paid') {

            const productFieldId = data.ProductoServicioPedido.value;
            const collectionName = 'productos';
            const productResponse = await payload.find({
                collection: collectionName,
                where: {
                    id: {
                        equals: productFieldId
                    }
                }
            })

            if (productResponse.docs && productResponse.docs.length > 0) {

                const resultProductId = productResponse.docs[0].id;
                const resultProductStock = productResponse.docs[0].CantidadProducto;
                const countStockNumber = resultProductStock as number;

                if (stateOrderApproved && isOrderApproved === 'notApproved') {
                    data.AprobacionEstadoPedido = 'approved';
                    if (countStockNumber >= CantidadProductoPedido) {
                        const newStock = countStockNumber - CantidadProductoPedido;

                        await payload.update({
                            collection: 'productos',
                            id: resultProductId,
                            data: {
                                CantidadProducto: newStock
                            },
                        })

                        console.log('Producto Stock Actualizado.')

                    } else {
                        console.log('CANTIDAD SOLICITADA SUPERA EL STOCK DISPONIBLE!.')
                    }
                } else {
                    console.log('DEBE MARCAR LA CASILLA DE APROBACION!.');
                }
            }
            else {
                console.log('Producto no encontrado en la funcion updateProductStock.')
            }

        } else {
            console.log('DEBE AGREGAR UNA CANTIDAD Y CAMBIAR EL ESTADO DE PAGO A REALIZADO')
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION updateProductStock: ', error)
    }
    return null

}
/*const getProductOrderStockState: FieldHook = async ({ data }) => {
    if (data && data.AprobacionEstadoPedido) {
        const changeOrderFieldState = data.EstadoCompraPedido;
        if (changeOrderFieldState && data.EstadoPagoPedido === 'paid') {
            data.AprobacionEstadoPedido = 'approved';
        }
    }
}*/
const validateProductRequest: FieldHook = async ({ data, originalDoc }) => {
    if (data && data.AprobacionEstadoPedido === 'approved') {
        const { CantidadProductoPedido } = originalDoc.DetallesPagoPedido
        return CantidadProductoPedido
    }
}
const getProductStockOrder: FieldHook = async ({ data }) => {
    try {
        if (data) {
            const fieldProductId = data.ProductoServicioPedido.value;
            //  console.log('ID DEL PRODUCTO getProductStockOrder: ', fieldProductId)
            const responseProductoStock = await payload.find({
                collection: 'productos',
                where: {
                    id: fieldProductId,
                }
            })
            if (responseProductoStock.docs && responseProductoStock.docs.length > 0) {
                const productStockData = responseProductoStock.docs[0].CantidadProducto;
                return productStockData;
            } else {
                //console.log('SIN STOCK DE PRODUCTOS!')
            }
        } else {
            // console.log('DATA UNDEFINED!')
        }
    } catch (error) {
        // console.log('Error en la Funcion getProductStockOrder: ', error)
    }
}




const Orders: CollectionConfig = {
    slug: 'pedidos',
    access: {
        read: () => true,
        create: () => true,

    },
    admin: {
        useAsTitle: 'ClientePedido',
        defaultColumns: ['ClientePedido', 'TipoVentaPedido', 'ProductoServicioPedido', 'EstadoPagoPedido', 'EstadoPedido'],
        group: 'VENTAS',
    },
    labels: {
        singular: 'Pedido',
        plural: 'Pedidos',
    },
    /*  endpoints: [
          {
            path: '/:id/tracking',
            method: 'get',
            handler: async (req, res, next) => {
              const tracking = await getTrackingInfo(req.params.id)
              if (tracking) {
                res.status(200).send({ tracking })
              } else {
                res.status(404).send({ error: 'not found' })
              }
            },
          },
        ],*/
    hooks: {
        beforeChange: [updateProductStock]
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
            name: "ImagenServicioProductoId",
            type: "text",
            label: "ID de Producto - Servicio",
            required: false,
            admin: {
                readOnly: true,
                hidden: false
            },
            hooks: {
                beforeChange: [getProductServiceImageId],
                afterRead: [getProductServiceImageId]
            }
        },
        {
            type: 'row',
            fields: [
                {
                    name: "ProductoServicioPedido",
                    label: "Productos - Servicios",
                    type: 'relationship',
                    required: true,

                    relationTo: ['productos', 'servicios'],
                    hasMany: false,
                    maxDepth: 0,
                    filterOptions: ({ data, relationTo }) => {

                        if (relationTo === 'productos') {
                            if (data.TipoVentaPedido === 'product') {
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
                                return {
                                    EstadoServicio: { equals: 'published' },
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
                    name: "VentaImagenOrder",
                    type: "upload",
                    relationTo: 'imagenes',
                    label: "Imagen de Venta",
                    required: false,
                    admin: {
                        width: '50%',
                        readOnly: true,
                        condition: ({ ImagenServicioProductoId }) => ImagenServicioProductoId !== undefined
                    },
                    access: {
                        read: () => true,
                        update: () => true,
                    },
                    hooks: {
                        beforeChange: [({ siblingData }) => {
                            delete siblingData.VentaImagenOrder
                        }],
                        afterRead: [setProductServiceImageChecked]
                    }
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
                                width: '50%'
                            },
                            hooks: {
                                beforeChange: [(args) => {
                                    if (args.data && args.data.AprobacionEstadoPedido !== args.originalDoc.AprobacionEstadoPedido) {
                                        return args.data.OfertaPedido = args.originalDoc.OfertaPedido;
                                    }
                                }],

                            }
                        },
                        {
                            name: "DescuentoPedido",
                            type: "number",
                            label: "% Descuento %",
                            required: false,
                            admin: {
                                condition: ({ OfertaPedido }) => OfertaPedido === 'apply',
                                width: '50%',
                                placeholder: '0'
                            },
                            hooks: {
                                beforeChange: [(args) => {
                                    const twoDigits = /^\d{2}$/;
                                    if (args.data && args.data.DescuentoPedido !== undefined) {
                                        const discount = args.data.DescuentoPedido;
                                        if (!twoDigits.test(discount)) {
                                            return args.data.DescuentoPedido = 0;
                                        }
                                    }
                                }]
                            }
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
                    ]
                },

                
                {
                    name: "StockProductoPedido",
                    label: "Stock Disponible:",
                    type: "number",
                    required: false,
                    admin: {
                        width: '18%',
                        readOnly: true,
                        step: 1,
                        //   condition: ({ TipoVentaPedido }) => TipoVentaPedido === 'service'
                    },
                    hooks: {
                        afterChange: [getProductStockOrder],
                        afterRead: [getProductStockOrder]
                    }
                },
            ],
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
                            /*  hooks: {
     beforeChange: [
       ({ data, value, operation }) => {
         data.PrecioProducto = typeof value === 'string' ? value.split(' ')[0] : '';
         return value;
       },
     ],
   }, */
                        },
                        {
                            name: "CantidadProductoPedido",
                            label: "Cantidad Solicitada",
                            type: "number",
                            required: true,
                            //defaultValue: 0,
                            hooks: {
                                beforeChange: [validateProductRequest],
                                afterRead: [validateProductRequest]

                                /*hooks: {
                                    beforeChange: [(args) => {
                                      // Aquí puedes restringir la actualización del campo
                                      // Por ejemplo, solo permitir la actualización una vez cada X horas
                                      const lastUpdateTime = args.previousDoc.updatedAt;
                                      const currentTime = new Date();
                                      const timeDifferenceInHours = (currentTime - lastUpdateTime) / 1000 / 60 / 60;
                                      if (timeDifferenceInHours < X) {
                                        throw new Error('No se puede actualizar el campo más de una vez cada X horas');
                                      }
                                    }],
                                  },*/
                            },


                            admin: {
                                placeholder: '0',
                                width: '50%',
                                condition: (data) => {
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
                            hooks: {
                                beforeChange: [getTotalPrice],
                                afterRead: [getTotalPrice]
                            },
                            access: {
                                update: () => true,
                                read: () => true
                            },
                            admin: {
                                readOnly: true,
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
                    label: "En Revision",
                    value: "checking",
                },
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
            defaultValue: 'checking',
            required: false,
        },
        {
            name: "FechaPedido",
            type: "date",
            label: "Fecha del Pedido",
            localized: true,
            required: true,
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
            required: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd-MM-yyyy'
                }
            }
        },
        {
            name: "EstadoCompraPedido",
            type: "checkbox",
            label: "Cambiar estado de Compra en Aprobado?",
            defaultValue: false,
            admin: {
                position: 'sidebar'
            },
            /*  hooks: {
                  beforeChange: [getProductOrderStockState],
                  afterRead: [getProductOrderStockState]
              }*/
        },
        {
            name: "AprobacionEstadoPedido",
            label: "Aprobacion de la Compra:",
            type: 'radio',
            required: false,
            options: [
                {
                    label: 'Aprobado',
                    value: 'approved',
                },
                {
                    label: 'Sin Aprobar',
                    value: 'notApproved',
                },
            ],
            defaultValue: 'notApproved',
            access: {
                //update: () => false
            },
            admin: {
                readOnly: true,
                layout: 'horizontal',
                position: 'sidebar',

            },




        },
    ],
    timestamps: true,
};

export default Orders;