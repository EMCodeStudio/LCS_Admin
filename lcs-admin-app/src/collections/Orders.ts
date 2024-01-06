
import { CollectionBeforeChangeHook, CollectionConfig, FieldHook } from "payload/types";
import ErrorMessages from "../components/Messages/ErrorMessages";
import payload from "payload";

const getProductServicePrice: FieldHook = async ({ data }) => {
    try {
        if (data && data.ProductoServicioPedido !== undefined) {

            const fieldID = data.ProductoServicioPedido.value;
            const fieldProductServicePrice = data.PrecioProductoServicio;

            if (data.TipoVentaPedido === 'product') {
                const productResponse = await fetch(`http://localhost:3000/api/productos/${fieldID}`)
                    .then(response => response.json())
                const productPrice = productResponse.PrecioProducto;
                const comparedProductPrice = productPrice !== fieldProductServicePrice;
                const validatedProductPrice = comparedProductPrice ? productPrice : console.log('Product Price Ya Existe!');
                return validatedProductPrice;
            }
            if (data.TipoVentaPedido === 'service') {
                const serviceResponse = await fetch(`http://localhost:3000/api/servicios/${fieldID}`)
                    .then(response => response.json())
                const servicePrice = serviceResponse.PrecioServicio;
                const comparedServicePrice = servicePrice !== fieldProductServicePrice;
                const validatedServicePrice = comparedServicePrice ? servicePrice : null //console.log('Service Price Ya Existe!');
                return validatedServicePrice;
            }
        }
    } catch (error) {
        console.log('Error en la función getProductServicePrice: ', error);
    }
    //return null;
}
const getTotalPrice: FieldHook = async ({ data }) => {
    try {
        if (data && data.ProductoServicioPedido !== undefined) {
            const fieldID = data.ProductoServicioPedido.value;
            const fieldProductServiceTotalPrice = data.TotalPricioPedido;
            let PrecioProductoServicio: number = 0;
            if (data.TipoVentaPedido === 'product') {
                const productResponse = await fetch(`http://localhost:3000/api/productos/${fieldID}`)
                    .then(productResponse => {
                        if (!productResponse.ok) {
                            throw new Error(`Error al obtener el Costo del Producto. Código de estado: ${productResponse.status}`)
                        }
                        return productResponse.json()
                    })
                    .then(productData => {
                        const productPrice = productData.PrecioProducto;
                        return productPrice;
                    })
                    .catch(error => {
                        console.error('Error del Producto:', error);
                        return 'No se puede obtener el Costo del Producto.';
                    });
                const { CantidadProductoPedido } = data.DetallesPagoPedido;
                PrecioProductoServicio = productResponse;
                const calculatedProductPrice = CantidadProductoPedido > 0 ? CantidadProductoPedido * PrecioProductoServicio : CantidadProductoPedido + PrecioProductoServicio
                const validatedProductDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? calculatedProductPrice * (1 - (data.DescuentoPedido / 100)) : calculatedProductPrice
                const totalProductPrice = Math.round(validatedProductDiscount)
                const comparedProductTotalPrice = fieldProductServiceTotalPrice !== totalProductPrice;
                const checkedTotalProductPrice = comparedProductTotalPrice ? totalProductPrice : null //console.log('Total Product Price Ya Existe!');;
                return checkedTotalProductPrice;
            }
            if (data.TipoVentaPedido === 'service') {
                const serviceResponse = await fetch(`http://localhost:3000/api/servicios/${fieldID}`)
                    .then(serviceResponse => {
                        if (!serviceResponse.ok) {
                            throw new Error(`Error al obtener el Costo del Servicio. Código de estado: ${serviceResponse.status}`);
                        }
                        return serviceResponse.json()
                    })
                    .then(serviceData => {
                        const servicePrice = serviceData.PrecioServicio;
                        return servicePrice;
                    })
                    .catch(error => {
                        console.log('Error del Servicio:', error)
                        return 'No se puede obtener el Costo del Servicio.';
                    });
                PrecioProductoServicio = serviceResponse
                const calculatedServiceDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? PrecioProductoServicio * (1 - (data.DescuentoPedido / 100)) : PrecioProductoServicio
                const totalServicePrice = Math.round(calculatedServiceDiscount)
                const comparedServiceTotalPrice = fieldProductServiceTotalPrice !== totalServicePrice;
                const checkedTotalServicePrice = comparedServiceTotalPrice ? totalServicePrice : console.log('Total Service Price Ya Existe!');;
                return checkedTotalServicePrice;
            }
        }
    } catch (error) {
        console.log('Error en la función getTotalPrice: ', error);
    }
    //return null;
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
let globalProductString: string | undefined;


function setClientLocationGlobal(productServiceLocation: string): string {
    globalLocationString = globalLocationString || '';
    let LocationResult: string = '';
    if (!globalLocationString.includes(productServiceLocation)) {
        LocationResult = globalLocationString += productServiceLocation;
    }
    globalLocationString = LocationResult
    return globalLocationString;
}


function setProductStockStateGlobal(productOrderState: string): string {
    globalProductString = globalProductString || '';
    let ProductResult: string = '';
    if (!globalProductString.includes(productOrderState)) {
        ProductResult = globalProductString += productOrderState;
    }
    globalProductString = ProductResult
    return globalProductString;
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
const getProductServiceLocation: FieldHook = async ({ data }) => {
    try {

        setClientLocationGlobal('')

        if (data && data.ProductoServicioPedido !== undefined) {

            const fieldID = data.ProductoServicioPedido.value;
            const fieldProductServiceLocation = data.UbicacionProductoServicio;

            if (data.TipoVentaPedido === 'product') {
                const productResponse = await fetch(`http://localhost:3000/api/productos/${fieldID}`)
                if (!productResponse.ok) {
                    throw new Error(`Error al obtener la Ubicacion del Producto. Código de estado: ${productResponse.status}`)
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

                const resultProductLocation = locationData ? locationData.join('') : 'No se puede obtener la Ubicacion del Producto.';

                setClientLocationGlobal(resultProductLocation)

                const comparedProductLocation = fieldProductServiceLocation !== resultProductLocation
                const validatedProductLocation = comparedProductLocation ? resultProductLocation : console.log('Product Location Ya Existe!');;
                return validatedProductLocation;
            }



            if (data.TipoVentaPedido === 'service') {
                const serviceResponse = await fetch(`http://localhost:3000/api/servicios/${fieldID}`);
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
                const comparedServiceLocation = fieldProductServiceLocation !== resultServiceLocation;
                const validatedServiceLocation = comparedServiceLocation ? resultServiceLocation : console.log('Service Location Ya Existe!');;
                return validatedServiceLocation;
            }
        }
    } catch (error) {
        return 'Error en la función getProductServiceLocation.';
    }

}
const getClientLocation: FieldHook = async ({ data }) => {
    try {
        if (data && data.ClientePedido !== undefined) {
            const fieldClientId = data.ClientePedido
            //const fieldClientLocation = data.UbicacionClientePedido
            const clientResponse = await fetch(`http://localhost:3000/api/clientes/${fieldClientId}`)

            if (!clientResponse.ok) {
                throw new Error(`Error al obtener la Ubicacion del Cliente. Código de estado: ${clientResponse.status}`)
            }
            const clientData = await clientResponse.json()
            const clientLocation = clientData.UbicacionCliente;

            const formatLocationData = (ubicacionCliente: Ubicacion): string => {
                const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacionCliente
                return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`;
            }
            let locationClientDataString: LocationData = '';

            if (clientLocation) {
                const getLocationFormatString = formatLocationData(clientLocation)
                locationClientDataString = getLocationFormatString;
            } else {
                console.log('Error: clientLocation es Nulo o Indefinido.')
            }
            const ValidatedLocation = setCheckedClientLocationAtProductService(locationClientDataString)

            return ValidatedLocation
        }
    } catch (error) {
        console.log('Error de Ubicacion del Cliente:', error);
    }

}
const getProductServiceImageId: FieldHook = async ({ data }) => {
    try {
        if (data && data.ProductoServicioPedido !== undefined) {
            const fieldID = data.ProductoServicioPedido.value
            const fieldImageProductServiceId = data.ImagenServicioProductoId
            if (data.TipoVentaPedido === 'product') {
                const productResponse = await fetch(`http://localhost:3000/api/productos/${fieldID}`)
                if (!productResponse.ok) {
                    throw new Error(`Error al obtener la URL del Producto. Código de estado: ${productResponse.status}`)
                }
                const productData = await productResponse.json()
                const productImage = productData.ImagenesProducto;
                const getImageProductStringId = productImage?.[0]?.ImagenProducto || null;
                const comparedImagenProductId = fieldImageProductServiceId !== getImageProductStringId
                return comparedImagenProductId ? getImageProductStringId : console.log('Product ID Ya Existe!');
            }
            if (data.TipoVentaPedido === 'service') {
                const serviceResponse = await fetch(`http://localhost:3000/api/servicios/${fieldID}`)
                if (!serviceResponse.ok) {
                    throw new Error(`Error al obtener la URL del Serviceo. Código de estado: ${serviceResponse.status}`)
                }
                const serviceData = await serviceResponse.json();
                const serviceImage = serviceData.ImagenesServicio;
                const getImageServiceStringId = serviceImage?.[0]?.ImagenServicio || null;
                // console.log('Service ID de getProductServiceImageId!', getImageServiceStringId );
                const comparedImageServiceId = fieldImageProductServiceId !== getImageServiceStringId
                return comparedImageServiceId ? getImageServiceStringId : null //console.log('Service ID Ya Existe!');
            }
        }
    } catch (error) {
        console.log('Error en la funcion getProductServiceImageId: ', error)
    }
    // return null
}
const setProductServiceImageChecked: FieldHook = async ({ data }) => {
    try {
        if (data) {
            const fieldProductServiceId = data.ImagenServicioProductoId
            // console.log('RESULTADO DE FIELD ID IMAGE : ', fieldProductServiceId)
            const mediaProductService = await payload.find({
                collection: 'imagenes',
                where: {
                    id: {
                        equals: fieldProductServiceId,
                    }
                }
            })
            if (mediaProductService.docs && mediaProductService.docs.length > 0) {
                const imageProductService = mediaProductService.docs[0].id  // return media.docs[0].filename;
                //console.log('RESULTADO DE FIND ID IMAGE : ', imageProductService)
                return imageProductService;
            }
        }
    } catch (error) {
        console.log("Error en la funcion setProductServiceImageChecked: ", error)
    }
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
                setProductStockStateGlobal('')
                if (stateOrderApproved && isOrderApproved === 'notApproved') {
                    if (countStockNumber >= CantidadProductoPedido) {
                        const newStock = countStockNumber - CantidadProductoPedido;
                        setProductStockStateGlobal('Aprobado')
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
        console.log('ERROR AL ACTULIZAR LA CANTIDAD DEL PRODUCTO: ', error)
    }

}
const getOrderApproved: FieldHook = async ({ data }) => {
    console.log('VARIABLE GLOBAL PRODUCT STATE STOCK', globalProductString)
    // console.log('FIELD  ORDER APROBACION getOrderApproved: ', isOrderApproved)
    if (data && globalProductString === 'Aprobado' && data.AprobacionEstadoPedido === 'notApproved') {
        return 'approved'
    }
}
const getProductOrderStockState: FieldHook = async ({ data }) => {
    const isOrderApproved = data ? data.AprobacionEstadoPedido : undefined;
    //console.log('FIELD  ORDER APROBACION getProductOrderStockState: ', isOrderApproved)
    if (data && isOrderApproved === 'approved') {
        return false;
    }
}
const validateProductRequest: FieldHook = async ({ data, originalDoc }) => {
    if (data && data.AprobacionEstadoPedido === 'approved') {
        const { CantidadProductoPedido } = originalDoc.DetallesPagoPedido
        console.log('ULTIMA CANTIDAD ORDER APROBACION validateProductRequest: ', CantidadProductoPedido)
        return CantidadProductoPedido
    }
}

const getProductStockOrder: FieldHook = async ({ data }) => {
    try {
        if (data && data.TipoVentaPedido === 'product' && data.ProductoServicioPedido !== undefined) {
            const fieldProductId = data.ProductoServicioPedido.value;
            console.log('ID DEL PRODUCTO getProductStockOrder: ', fieldProductId)
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
                console.log('SIN STOCK DE PRODUCTOS!')
            }
        } else {
            console.log('DEBE SELECCIONAR UN PRODUCTO DE LA LISTA!')
        }
    } catch (error) {
        console.log('Error en la Funcion getProductStockOrder: ', error)
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
                hidden: true
            },
            access: {
                // read:() => false,
                // update: ()=> false,
            },
            hooks: {
                /*beforeChange: [({ siblingData }) => {
                    return siblingData.ImagenServicioProductoId = undefined
                }],*/
                beforeChange: [getProductServiceImageId],
                afterRead: [getProductServiceImageId]
            }
        },
        /*  { */
        /*      name: "MediaProductServiceOrder",  */
        /*      type: "text",  */
        /*      label: "Imagen de Venta", */
        /*      hooks: { */
        /*          afterRead: [setProductServiceImageChecked] */
        /*      } */
        /*  }, */
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
                        }else
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
                        update: () => false,
                    },
                    hooks: {
                        beforeChange: [({ siblingData }) => {
                            siblingData.VentaImagenOrder = undefined
                        }],
                        afterRead: [setProductServiceImageChecked]
                    }
                },
                /*  {
                      name: 'ProductImageOrder',
                      type: 'ui',
                      admin: {
                          condition: ({ TipoVentaPedido }) => {
                              console.log("Valor de TipoVentaPedido:", TipoVentaPedido);
                              return TipoVentaPedido === 'product';
                          },
                          width: '50%',
                          components: {
                              //Field:  ({ data }) => {
                              //    const urlImage =  setProductServiceImageChecked; 
                              //  return ImageProduct({ ...data, urlImage });
                              //}
                              Field: PreviewImage
                          }
                      },
                  },*/
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

                            /* validate: ({data}) => {
                                 const approvedOrderState = data.AprobacionEstadoPedido;
                                 if (approvedOrderState === 'approved') {
                                     return 'No puede Agregar el Descuento! el Pedido ya ha sido Aprobado.'
                                 }
                             },*/
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
            label: "Estado de Compra Aprobado?",
            defaultValue: false,
            admin: {
                position: 'sidebar'
            },
            hooks: {
                beforeChange: [getProductOrderStockState],
                afterRead: [getProductOrderStockState]
            }
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
            hooks: {
                beforeChange: [getOrderApproved],
                afterRead: [getOrderApproved]
            }
        },
    ],
    timestamps: true,
};

export default Orders;